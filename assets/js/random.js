$(document).ready(function () { // document.ready start

  var len = questions.length;
  var chosen = [];
  var chosen2 = [];
  var chosen3 = [];
  var intervalRoundTimer = undefined;
  var intervalTimeup = undefined;
  var timeoutNextQuestion = undefined;

  for (var i = 0; i <= 9; i++) {
    var number = Math.floor(Math.random() * len);
    chosen[i] = questions[number];
    chosen2[i] = possibleAnswers[number];
    chosen3[i] = correctAnswers[number];

    console.log(chosen[i]);
    console.log(chosen2[i]);
    console.log(chosen3[i]);

    for (k = 0; k <= i - 1; k++) {
      if (chosen[k] == chosen[i]) {
        i--; // duplicate found so decrement i
      }
    }
  }

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
    time = 6;
    intervalRoundTimer = setInterval(function () {
      time--;
      $('#timer').html(time + " seconds");
      if (time === 0) {
        timeup();
        timesup.play();
        stopRoundTimer();
      }
    }, 1000);
  }

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

  function stopNextQuestion () {
    if (timeoutNextQuestion != undefined) {
      clearInterval(timeoutNextQuestion);
      timeoutNextQuestion = undefined;
    }
  }

  function hideStartScreen() {
    $('.outerStartContainer').hide();
  }

  function startQuiz() {
    $('.roundCounter span').html(`${roundNumber + 1}`);
    $('.scoreCounter span').html(`${scoreCount}`);
    hideStartScreen();
    generateQuestions();
  }

  //Click to start game
  $('.start10').on('click', function () {
    startQuiz();
    suitup.play();
  });


  // Generate random questions and answers after user clicks start
  function generateQuestions() {
    startRoundTimer();
    if (roundNumber < chosen.length) {
      $('.quizGameplay').html(`<form id="quizGameArea">
        <fieldset>
          <legend><h3>${chosen[roundNumber]}</h3></legend>
            <label for="choice1">
              <input type="radio" name="choice" value="${chosen2[roundNumber][0]}" id="choice1" class="answer"><span>${chosen2[roundNumber][0]}</span><br>
            </label>

            <label for="choice2">
              <input type="radio" name="choice" value="${chosen2[roundNumber][1]}" id="choice2" class="answer"><span>${chosen2[roundNumber][1]}</span><br>
            </label>

            <label for="choice3">
              <input type="radio" name="choice" value="${chosen2[roundNumber][2]}" id="choice3" class="answer"><span>${chosen2[roundNumber][2]}</span><br>
            </label>

            <label for="choice4">
              <input type="radio" name="choice" value="${chosen2[roundNumber][3]}" id="choice4" class="answer"><span>${chosen2[roundNumber][3]}</span><br>
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
     

      if (choiceVal === chosen3[roundNumber]) {
        $('.quizGameplay #quizGameArea').html(`<div class="question-feedback">
            <p>You selected <strong>${choiceVal}</strong> and that is correct!!</p>
            <img src="./assets/images/${randomCelebrate}.gif">`);
      } else {
        $('.quizGameplay #quizGameArea').html(`<div class="question-feedback">
            <p>You selected <strong>${choiceVal}</strong> and that is not correct.</strong></p>
            <img src="./assets/images/${randomSad}.gif">`);
      }
    }

    // Click event listener
    $('#quizGameArea').submit(function (e) {
      e.preventDefault();
      var choiceVal = $('input[name=choice]:checked').val();

      if (choiceVal === chosen3[roundNumber]) {
        updateScore();
        feedback();
        nextQuestion();
        awesome.play();

      }
      if (choiceVal !== chosen3[roundNumber]) {
        feedback();
        nextQuestion();
        awwman.play();
      }
    });
  }


  // Score update
  function updateScore() {
    var choiceVal = $('input[name=choice]:checked').val();

    if (choiceVal === chosen3[roundNumber]) {
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

      if ((roundNumber + 1) < chosen.length) {
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

  function results() {
    for (var i = 0; i < chosen.length; i++) {
      $('.showAnswers').append(`
        <div class="quizSummary"><h4 class="results">${i + 1}. ${chosen[i]}</h4> 
        <p class="results">You selected <strong>${playerGuess[i]}</p></strong>
        <p class="results">The correct answer was <strong>${chosen3[i]}</strong></p></div>`);
    }

    if (scoreCount < 6) {
      const restartURL = '<button type="button" class="restart btn btn-warning">Play again<br><img height="200px" width="200px"  src="./assets/images/accepted.png"></button>';
      forfeit.play();
      $('#quizGameArea').html(`<p class="final-feedback">You scored ${scoreCount} out of ${roundNumber + 1}!! I'm not mad, just disappointed</p>`);
      $('#quizGameArea').append('<br><img src="https://78.media.tumblr.com/f59a31fbe5137bc1372240186c76d846/tumblr_nr2vni88ue1u55i54o1_400.gif">');
      $('#quizGameArea').append(restartURL);
      $('#quizGameArea').append('<button type="button" class="btn btn-info" data-toggle="modal" data-target="#answers">Display answers</button>');

      restartQuiz();
    } else if (scoreCount >= 6 && scoreCount < 9) {
      legendary.play();
      const restartURL = '<button type="button" class="restart btn btn-warning">Play again<br><img height="200px" width="200px"  src="./assets/images/accepted.png"></button>';
      $('#quizGameArea').html(`<p class="final-feedback">You scored ${scoreCount} out of ${roundNumber + 1}!! It\'s going to be -waitforit- Legendary</p>`);
      $('#quizGameArea').append('<br><img src="http://78.media.tumblr.com/tumblr_lxxfexRoNp1qageydo1_500.gif">');
      $('#quizGameArea').append(restartURL);
      $('#quizGameArea').append('<button type="button" class="btn btn-info" data-toggle="modal" data-target="#answers">Display answers</button>');

      restartQuiz();
    } else {
      const restartURL = '<button type="button" class="restart btn btn-warning">Play again<br><img height="200px" width="200px"  src="./assets/images/accepted.png"></button>';
      highsix.play();
      $('#quizGameArea').html(`<p class="final-feedback">You scored ${scoreCount} out of ${roundNumber + 1}!! A high 5 isn't going to cut it</p>`);
      $('#quizGameArea').append('<br><img src="https://media1.tenor.com/images/33ec8a1a310411d87c49c8cf7a8b16eb/tenor.gif"><br>');
      $('#quizGameArea').append(restartURL);
      $('#quizGameArea').append('<button type="button" class="btn btn-info" data-toggle="modal" data-target="#answers">Display answers</button>');

      restartQuiz();
    }
  }

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