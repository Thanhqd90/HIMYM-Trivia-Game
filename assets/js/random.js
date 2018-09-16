$(document).ready(function () { // document.ready start

    var len = questions.length;
      var chosen = [];
      var chosen2 = [];
      var chosen3 = [];
      
      for (var i = 0; i<=4; i++) {
      var number = Math.floor(Math.random() * len);  
      chosen[i] = questions[number];
      chosen2[i] = possibleAnswers[number];
      chosen3[i] = correctAnswers[number];
      
      for (k=0; k<=i-1; k++) {
      if (chosen[k] == chosen[i]) {
      i--;  // duplicate found so decrement i
      }
      }
      }
      
      console.log(chosen);
      console.log(chosen[0]);
      console.log(chosen[1]);
      console.log(chosen[2]);
      console.log(chosen[3]);
      console.log(chosen[4]);
  
      console.log(chosen2);
      console.log(chosen2[0]);
      console.log(chosen2[1]);
      console.log(chosen2[2]);
      console.log(chosen2[3]);
      console.log(chosen2[4]);
  
      console.log(chosen3);
      console.log(chosen3[0]);
      console.log(chosen3[1]);
      console.log(chosen3[2]);
      console.log(chosen3[3]);
      console.log(chosen3[4]);

      function roundTimerStart(){
        time = 6;
        var roundTimer = setInterval(function() {
          time--;
          $('#timer').html(time + " seconds");
          if (time === 0) {
            timeup();
            timesup.play();
            setTimeout(roundTimer);
            clearInterval(roundTimer);
          }
        }, 1000);
      }
  
      function timeup() {
        var time = 3;
        setInterval(function() {
          time--;
          if (time === 0) {
            nextQuestion();
            feedbackTimer = 0;
          }
        }, 1000);
  
        $('.quizGameplay #quizGameArea').html(`<div class="question-feedback">
        <p>Time's up!!</p>
        <img src="https://i.pinimg.com/originals/cd/7a/c1/cd7ac1dc76a4ee83ea4a186e3a16e1e1.gif">`);
      }
  
  
    function hideStartScreen(){
      $('.outerStartContainer').hide();
    }
    
    function startQuiz(){
          $('.roundCounter span').html(`${roundNumber + 1}`);
          $('.scoreCounter span').html(`${scoreCount}`);
          hideStartScreen();
          generateQuestions();
      }
  
    //Click to start game
      $('.start10').on('click', function(){
      startQuiz();
      suitup.play();
      
      });
  
  
    // Generate random questions and answers after user clicks start
    function generateQuestions (){
      clearInterval(roundTimerStart);
      roundTimerStart();
      if(roundNumber < chosen.length){
         $('.quizGameplay').html(`<form id="quizGameArea">
  
            <fieldset>
            
            <legend><h3>${chosen[roundNumber]}</h3></legend>
              
              <label for="choice1">
                <input required type="radio" name="choice" value="${chosen2[roundNumber][0]}" id="choice1" class="answer"><span>${chosen2[roundNumber][0]}</span><br>
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
            $('input[type=radio]').on('change', function() {
              $(this).closest("form").submit();
          });
  
          }
          // Check answers against choice upon clicking submit
          
          function feedback(){
            var choiceVal = $('input[name=choice]:checked').val();
            playerGuess.push(choiceVal);
            clearInterval(roundTimerStart);
            clearInterval(timeup);
            setTimeout(nextQuestion);
            if (choiceVal === chosen3[roundNumber]){
            $('.quizGameplay #quizGameArea').html(`<div class="question-feedback">
            <p>You selected <strong>${choiceVal}</strong> and that is correct!!</p>
            <img src="https://i.pinimg.com/originals/cd/7a/c1/cd7ac1dc76a4ee83ea4a186e3a16e1e1.gif">`);
          } else {
            $('.quizGameplay #quizGameArea').html(`<div class="question-feedback">
            <p>You selected <strong>${choiceVal}</strong> and that is not correct.</strong></p>
            <img src="https://i.pinimg.com/originals/f3/f9/f9/f3f9f929b48a70e404c2faaa560b154c.gif">`);
          } 
    }
    
  // Click event listener
    $('#quizGameArea').submit(function(e){
      e.preventDefault();
      var choiceVal = $('input[name=choice]:checked').val();
  
      if (choiceVal === chosen3[roundNumber]){
        updateScore();
        feedback();
        nextQuestion();
        awesome.play();
        
        
      } 
      if (choiceVal !== chosen3[roundNumber]){
        feedback();
        nextQuestion();
        awwman.play();
      }
    });
  }
  
    
  // Score update
    function updateScore(){
      var choiceVal = $('input[name=choice]:checked').val();
  
      if (choiceVal === chosen3[roundNumber]){
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
      setTimeout(function(){
        if ((roundNumber + 1) < chosen.length){
          updateQuestion();
          generateQuestions();
          roundCounter();
        } else {
          results();
        }
      }, 3000);
    }
  
    function results(){
      
      if (scoreCount < 6){
        const restartURL = '<button type="button" class="restart btn btn-danger">Play again<br><img height="200px" width="200px"  src="./assets/images/accepted.png"></button>';
        forfeit.play();
        $('#quizGameArea').html('<p class="resultsFeedback">I\'m not mad, just disappointed</p>');
        $('#quizGameArea').append('<br><img src="https://78.media.tumblr.com/f59a31fbe5137bc1372240186c76d846/tumblr_nr2vni88ue1u55i54o1_400.gif">');
        $('#quizGameArea').append(restartURL);
        $('#quizGameArea').append('<button type="button" class="btn btn-info" data-toggle="modal" data-target="#answers">Display answers</button>');
        
        for(var i = 0; i < chosen.length; i++){
          $('.showAnswers').append(`
          <div class="quizSummary"><h4 class="results">${i + 1}. ${chosen[i]}</h4> 
          <p class="results">You selected <strong>${playerGuess[i]}</p></strong>
          <p class="results">The correct answer was <strong>${chosen3[i]}</strong></p></div>`);
      }
      
   
        restartQuiz();
      } else if (scoreCount >= 6 && scoreCount < 9) {
        legendary.play();
        const restartURL = '<button type="button" class="restart btn btn-danger">Play again<br><img height="200px" width="200px"  src="./assets/images/accepted.png"></button>';
        $('#quizGameArea').html(`<p class="resultsFeedback">It\'s going to be -waitforit- Legendary</p>`);
        $('#quizGameArea').append('<br><img src="http://78.media.tumblr.com/tumblr_lxxfexRoNp1qageydo1_500.gif">');
        $('#quizGameArea').append(restartURL);
        $('#quizGameArea').append('<button type="button" class="btn btn-info" data-toggle="modal" data-target="#answers">Display answers</button>');
  
        for(var i = 0; i < chosen.length; i++){
          $('.showAnswers').append(`
          <div class="quizSummary"><h4 class="results">${i + 1}. ${chosen[i]}</h4> 
          <p class="results">You selected <strong>${playerGuess[i]}</p></strong>
          <p class="results">The correct answer was <strong>${chosen3[i]}</strong></p></div>`);
      }
      
  
        restartQuiz();
      } else {
        const restartURL = '<button type="button" class="restart btn btn-danger">Play again<br><img height="200px" width="200px"  src="./assets/images/accepted.png"></button>';
        highsix.play();
        $('#quizGameArea').html('<p class="resultsFeedback">The highest of 5\'s!</p>');
        $('#quizGameArea').append('<br><img src="https://media1.tenor.com/images/33ec8a1a310411d87c49c8cf7a8b16eb/tenor.gif"><br>');
        $('#quizGameArea').append(restartURL);
        $('#quizGameArea').append('<button type="button" class="btn btn-info" data-toggle="modal" data-target="#answers">Display answers</button>');
  
        for(var i = 0; i < chosen.length; i++){
          $('.showAnswers').append(`
          <div class="quizSummary"><h4 class="results">${i + 1}. ${chosen[i]}</h4> 
          <p class="results">You selected <strong>${playerGuess[i]}</p></strong>
          <p class="results">The correct answer was <strong>${chosen3[i]}</strong></p></div>`);
      }
  
  
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