$(document).ready(function () { // document.ready start

  $("#mall").on("click", function(){
    mall.play();
  });

  $("pause").on("click", function(){
    mall.pause();
  });

  function hideStartScreen(){
    $('.outerStartContainer').hide();
  }

  function startQuiz(){
        $('.roundCounter span').html(`${roundNumber + 1}`);
        $('.scoreCounter span').html(`${scoreCount}`);
        hideStartScreen();
        generateQuestions();
    }

    // $("button").click(function() {
    //   var time = 6;
    //   var timer = setInterval(function() {
    //     time--;
    //     $('#timer').html(time);
    //     console.log(time);
    //     if (time === 0) {
    //       timeup();
    //       timesup.play();
    //       clearInterval(timer);
    //     }
    //   }, 1000);
    // });

    // function timeup() {
    //   $('.quizGameplay #quizGameArea').html(`<div class="question-feedback">
    //   <p>Time's up!!</p>
    //   <img src="https://i.pinimg.com/originals/cd/7a/c1/cd7ac1dc76a4ee83ea4a186e3a16e1e1.gif">`);
    //   setInterval(nextQuestion, 5000);
    // }

  //Click to start game
    $('.start20').on('click', function(){
    startQuiz();
    diamondsuit.play();
    });


// Generate random questions and answers after user clicks start
  function generateQuestions (){
    clearInterval(nextQuestion)
    if(roundNumber < questions.length){
       $('.quizGameplay').html(`<form id="quizGameArea">

          <fieldset>
          
          <legend><h3>${questions[roundNumber]}</h3></legend>
            
            <label for="choice1">
              <input required type="radio" name="choice" value="${possibleAnswers[roundNumber][0]}" id="choice1" class="answer"><span>${possibleAnswers[roundNumber][0]}</span><br>
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
          $('input[type=radio]').on('change', function() {
            $(this).closest("form").submit();
        });

        }
        // Check answers against choice upon clicking submit
        
        function feedback(){
          var choiceVal = $('input[name=choice]:checked').val();
          playerGuess.push(choiceVal);
          if (choiceVal === correctAnswers[roundNumber]){
          $('.quizGameplay #quizGameArea').html(`<div class="question-feedback">
          <p>You chose <strong>${choiceVal}</strong> and that is correct!!</p>

          <img src="https://i.pinimg.com/originals/cd/7a/c1/cd7ac1dc76a4ee83ea4a186e3a16e1e1.gif">
          <br>
          <button class="nextButton">Next Question</button>`);
        } else {
          $('.quizGameplay #quizGameArea').html(`<div class="question-feedback">
          <p>You chose <strong>${choiceVal}</strong> and that is not the correct answer.</strong></p>
        
          <img src="https://i.pinimg.com/originals/f3/f9/f9/f3f9f929b48a70e404c2faaa560b154c.gif">
          <br>
          <button class="nextButton">Next</button>`);
        } 
  }
  
// Click event listener
  $('#quizGameArea').submit(function(e){
    e.preventDefault();
    var choiceVal = $('input[name=choice]:checked').val();

    if (choiceVal === correctAnswers[roundNumber]){
      updateScore();
      feedback();
      nextQuestion();
      awesome.play();
      
      
    } 
    if (choiceVal !== correctAnswers[roundNumber]){
      feedback();
      nextQuestion();
      awwman.play();
    }
  });
}

  
// Score update
  function updateScore(){
    var choiceVal = $('input[name=choice]:checked').val();

    if (choiceVal === correctAnswers[roundNumber]){
      scoreCount += 1;
      $('.scoreCounter span').html(scoreCount);
    } else {
      scoreCount = scoreCount;
    }
  }

  // Question number update
  function updateQuestion(){
    roundNumber += 1;
    $('.roundCounter span').html(`${roundNumber}`);
  }
  

// Move to next question in array regardless of answer being correct or incorrect
  function nextQuestion(){
      if ((roundNumber + 1) < questions.length){
        updateQuestion();
        generateQuestions();
        roundCounter();
      } else {
        results();
      }
  }

  function results(){
    
    if (scoreCount < 6){
      const restartURL = '<button type="button" class="restart btn btn-danger">Play again<br><img height="200px" width="200px"  src="./assets/images/accepted.png"></button>';
      forfeit.play();
      $('#quizGameArea').html('<p class="final-feedback">I\'m not mad, just disappointed</p>');
      $('#quizGameArea').append('<br><img src="https://78.media.tumblr.com/f59a31fbe5137bc1372240186c76d846/tumblr_nr2vni88ue1u55i54o1_400.gif">');
      $('#quizGameArea').append(restartURL);
      $('#quizGameArea').append(`<button type="button" class="btn btn-info" data-toggle="modal" data-target="#answers">Display answers</button>`);
 
      restartQuiz();
    } else if (scoreCount >= 6 && scoreCount < 9) {
      legendary.play();
      const restartURL = '<button type="button" class="restart btn btn-danger">Play again<br><img height="200px" width="200px"  src="./assets/images/accepted.png"></button>';
      $('#quizGameArea').html(`<p class="final-feedback">It\'s going to be -waitforit- Legendary</p>`);
      $('#quizGameArea').append('<br><img src="http://78.media.tumblr.com/tumblr_lxxfexRoNp1qageydo1_500.gif">');
      $('#quizGameArea').append(restartURL);
      $('#quizGameArea').append('<button type="button" class="btn btn-info" data-toggle="modal" data-target="#answers">Display answers</button>');

      restartQuiz();
    } else {
      const restartURL = '<button type="button" class="restart btn btn-danger">Play again<br><img height="200px" width="200px"  src="./assets/images/accepted.png"></button>';
      highsix.play();
      $('#quizGameArea').html('<p class="final-feedback">The highest of 5\'s!</p>');
      $('#quizGameArea').append('<br><img src="https://media1.tenor.com/images/33ec8a1a310411d87c49c8cf7a8b16eb/tenor.gif"><br>');
      $('#quizGameArea').append(restartURL);
      $('#quizGameArea').append('<button type="button" class="btn btn-info" data-toggle="modal" data-target="#answers">Display answers</button>');
      restartQuiz();
    }
  }
  
  function restartQuiz(){
    $('.restart').on('click', function(){
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