$(document).ready(function () { // document.ready start

  //Music control
  $("#mall").on("click", function () {
    mall.play();
  });
    
  $("#pause").on("click", function () {
    mall.pause();
  });

  // Timer variables

  var intervalRoundTimer = undefined;
  var intervalTimeup = undefined;
  var timeoutNextQuestion = undefined;


  // Round timer stop and start
  function stopRoundTimer () {
    if (intervalRoundTimer != undefined) {
      clearInterval(intervalRoundTimer);
      intervalRoundTimer = undefined;
    }
  }

  function startRoundTimer() {
    if (intervalRoundTimer != undefined) {
      throw new Error("A round timer start interval already exists, did you clear it yet?");
    }
    time = 11;
    intervalRoundTimer = setInterval(function () {
      time--;
      $('#timer').html(time + " seconds");
      if (time === 0) {
        timeup();
        timesup.play();
        playerGuess.push("");
        stopRoundTimer();
      }
    }, 1000);
  }

  // End question when timer hits zero and submit as unanswered
  function stopTimeup() {
    if (intervalTimeup != undefined) {
      clearInterval(intervalTimeup);
      intervalTimeup = undefined;
    }
  }

  function timeup() {
    if (intervalTimeup != undefined) {
      throw new Error("A time up interval already exists, did you clear it yet?");
    }
    time = 3;
      $('.quizGameplay #quizGameArea').html(`<div class="question-feedback">
      <p>Time's up!!</p>
      <img src="./assets/images/bored.gif">`);

    intervalTimeup = setInterval(function () {
      time--;
      if (time === 0) {
        nextQuestion();
        stopTimeup();
      }
    }, 1000);
  }

  // Feedback timer stop
  function stopNextQuestion () {
    if (timeoutNextQuestion != undefined) {
      clearInterval(timeoutNextQuestion);
      timeoutNextQuestion = undefined;
    }
  }

  //Click to start game
  $('.start20').on('click', function () {
    startQuiz();
    diamondsuit.play();
  });

  function hideStartScreen() {
    $('.outerStartContainer').hide();
  }

  function startQuiz() {
    $('.roundCounter span').html(`${roundNumber + 1}`);
    $('.scoreCounter span').html(`${scoreCount}`);
    hideStartScreen();
    generateQuestions();
  }

  // Generate questions and answers after user clicks start
  function generateQuestions() {
    startRoundTimer();
    if (roundNumber < questions.length) {
      $('.quizGameplay').html(`<form id="quizGameArea">
        <fieldset>
          <legend><h3>${questions[roundNumber]}</h3></legend>
            
            <label for="choice1">
              <input type="radio" name="choice" value="${possibleAnswers[roundNumber][0]}" id="choice1" class="answer"><span>${possibleAnswers[roundNumber][0]}</span><br>
            </label>
            
            <label for="choice2">
              <input type="radio" name="choice" value="${possibleAnswers[roundNumber][1]}" id="choice2" class="answer"><span>${possibleAnswers[roundNumber][1]}</span><br>
            </label>
            
            <label for="choice3">
              <input type="radio" name="choice" value="${possibleAnswers[roundNumber][2]}" id="choice3" class="answer"><span>${possibleAnswers[roundNumber][2]}</span><br>
            </label>
            
            <label for="choice4">
              <input type="radio" name="choice" value="${possibleAnswers[roundNumber][3]}" id="choice4" class="answer"><span>${possibleAnswers[roundNumber][3]}</span><br>
            </label>
        </fieldset>`);

      $('input[type=radio]').on('change', function () {
        $(this).closest("form").submit();
      });
    }

    // Check answers against choice upon clicking submit
    function feedback() {
      var choiceVal = $('input[name=choice]:checked').val();
      playerGuess.push(choiceVal);
      stopRoundTimer();
      stopTimeup();
      stopNextQuestion();

      var randomNumber = Math.floor(Math.random() * 5) + 1;
    
      randomCelebrate = randomNumber;
      randomSad = (randomNumber + 5);

      if (choiceVal === correctAnswers[roundNumber]) {
        $('.quizGameplay #quizGameArea').html(`<div class="question-feedback">
            <p>You chose <strong>${choiceVal}</strong> and that is correct!!</p>
            <img src="./assets/images/${randomCelebrate}.gif">`);
      } else {
        $('.quizGameplay #quizGameArea').html(`<div class="question-feedback">
            <p>You chose <strong>${choiceVal}</strong> and that is not the correct answer.</strong></p>
            <img src="./assets/images/${randomSad}.gif">`);
      }
    }

    // Click event listener
    $('#quizGameArea').submit(function (e) {
      e.preventDefault();
      var choiceVal = $('input[name=choice]:checked').val();

      if (choiceVal === correctAnswers[roundNumber]) {
        updateScore();
        feedback();
        nextQuestion();
        awesome.play();
      }

      if (choiceVal !== correctAnswers[roundNumber]) {
        feedback();
        nextQuestion();
        awwman.play();
      }
    });
  }

  // Score update
  function updateScore() {
    var choiceVal = $('input[name=choice]:checked').val();

    if (choiceVal === correctAnswers[roundNumber]) {
      scoreCount += 1;
      $('.scoreCounter span').html(scoreCount);
    } else {
      scoreCount = scoreCount;
      }
  }

  // Question number update
  function updateQuestion() {
    roundNumber += 1;
    $('.roundCounter span').html(`${roundNumber}`);
  }

  // Move to next question in array regardless of answer being correct or incorrect
  function nextQuestion() {
    if (timeoutNextQuestion != undefined) {
      throw new Error("A next question timer already exists, did you clear it yet?");
    }
    timeoutNextQuestion = setTimeout(function () {
      if ((roundNumber + 1) < questions.length) {
        updateQuestion();
        generateQuestions();
        roundCounter();
        stopNextQuestion();
      } else {
        results();
        stopNextQuestion();
      }
    }, 3000);
  }

  //End game based on number correct + Create modal with answers
  function results() {

    for (var i = 0; i < questions.length; i++) {
      $('.showAnswers').append(`
        <div class="quizSummary"><h4 class="results">${i + 1}. ${questions[i]}</h4> 
        <p class="results">You selected <strong>${possibleAnswers[i]}</p></strong>
        <p class="results">The correct answer was <strong>${correctAnswers[i]}</strong></p></div>`);
    }
    if (scoreCount < 6) {
      const restartURL = '<br><br><button type="button" class="restart btn btn-warning">Play again<br><img height="200px" width="200px"  src="./assets/images/accepted.png"></button>';
      forfeit.play();
      $('#quizGameArea').html(`<p class="final-feedback">You scored ${scoreCount} out of ${roundNumber + 1}!!<br> I'm not angry, just disappointed</p>`);
      $('#quizGameArea').append('<br><img src="./assets/images/dis.gif">');
      $('#quizGameArea').append(restartURL);
      $('#quizGameArea').append(`<br><br><button type="button" class="btn btn-info" data-toggle="modal" data-target="#answers">Display answers</button>`);
      restartQuiz();
    } 
    if (scoreCount >= 6 && scoreCount < 9) {
        const restartURL = '<br><br><button type="button" class="restart btn btn-warning">Play again<br><img height="200px" width="200px"  src="./assets/images/accepted.png"></button>';
        marshall.play();
        $('#quizGameArea').html(`<p class="final-feedback">You scored ${scoreCount} out of ${roundNumber + 1}!! Damnit Marshall!!</p>`);
        $('#quizGameArea').append('<br><img src="./assets/images/bear.gif">');
        $('#quizGameArea').append(restartURL);
        $('#quizGameArea').append('<br><br><button type="button" class="btn btn-info" data-toggle="modal" data-target="#answers">Display answers</button>');
        restartQuiz();
    }
    if (scoreCount >= 9 && scoreCount < 12) {
        const restartURL = '<br><br><button type="button" class="restart btn btn-warning">Play again<br><img height="200px" width="200px"  src="./assets/images/accepted.png"></button>';
        teach.play();
        $('#quizGameArea').html(`<p class="final-feedback">You scored ${scoreCount} out of ${roundNumber + 1}!!You changed the course of Blitzory`);
        $('#quizGameArea').append('<br><img src="./assets/images/friendship.gif">');
        $('#quizGameArea').append(restartURL);
        $('#quizGameArea').append('<br><br><button type="button" class="btn btn-info" data-toggle="modal" data-target="#answers">Display answers</button>');
        restartQuiz();
    }
    if (scoreCount >= 12 && scoreCount < 15) {
        const restartURL = '<br><br><button type="button" class="restart btn btn-warning">Play again<br><img height="200px" width="200px"  src="./assets/images/accepted.png"></button>';
        blitzory.play();
        $('#quizGameArea').html(`<p class="final-feedback">You scored ${scoreCount} out of ${roundNumber + 1}!!  I'm going to teach you how to live`);
        $('#quizGameArea').append('<br><img src="./assets/images/self.gif">');
        $('#quizGameArea').append(restartURL);
        $('#quizGameArea').append('<br><br><button type="button" class="btn btn-info" data-toggle="modal" data-target="#answers">Display answers</button>');
        restartQuiz();
    }
    if (scoreCount >= 15 && scoreCount < 18) {
        const restartURL = '<br><br><button type="button" class="restart btn btn-warning">Play again<br><img height="200px" width="200px"  src="./assets/images/accepted.png"></button>';
        legendary.play();
        $('#quizGameArea').html(`<p class="final-feedback">You scored ${scoreCount} out of ${roundNumber + 1}!! Its going to be Legendary`);
        $('#quizGameArea').append('<br><img src="./assets/images/redTape.gif">');
        $('#quizGameArea').append(restartURL);
        $('#quizGameArea').append('<br><br><button type="button" class="btn btn-info" data-toggle="modal" data-target="#answers">Display answers</button>');
        restartQuiz();
    } else {
      const restartURL = '<br><br><button type="button" class="restart btn btn-warning">Play again<br><img height="200px" width="200px"  src="./assets/images/accepted.png"></button>';
      highsix.play();
      $('#quizGameArea').html(`<p class="final-feedback">You scored ${scoreCount} out of ${roundNumber + 1}!! A high 5 isn't going to cut it</p>`);
      $('#quizGameArea').append('<br><img src="./assets/images/highsix.gif"><br>');
      $('#quizGameArea').append(restartURL);
      $('#quizGameArea').append('<br><br><button type="button" class="btn btn-info" data-toggle="modal" data-target="#answers">Display answers</button>');
      restartQuiz();
    }
  }

// Reset game stats
  function restartQuiz() {
    $('.restart').on('click', function () {
      scoreCount = 0;
      $('.scoreCounter span').html(`${scoreCount}`);
      $('.roundCounter span').html(`${roundNumber + 1}`);
      $('.outerStartContainer').show();
      $('#quizGameArea').hide();
      roundNumber = 0;
      playerGuess.length = 0;
      challenge.play();
    });
  }
});



// document.Ready end