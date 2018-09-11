$(document).ready(function () { // document.ready start


  // Timer test.  Does not work as intended
  //   function c(){
  //     var n=$('.timer').attr('id');
  //     var c=n;
  //     $('.timer').text(c);
  //     setInterval(function(){
  //         c--;
  //         if(c>=0){
  //             $('.timer').text(c);
  //         }
  //         if(c==0){
  //           feedback();
  //           nextQuestion();
  //           alert("timer has ended");
  //             $('.timer').text(n);
  //         }
  //     },1000);
  // }
  
  // $(".timerStart").on("click", function() {
  // c();
  // });

// Global variables
var questionIndex = 0;
var userChoices = [];
var scoreCount = 0;
  
// Update question counter 

  function roundCounter(){
    $('.roundCounter span').html(questionIndex + 1);
  }
  
// Questions array

  var questions = [
    'What is the name of the bar the main characters of HIMYM hang out at?',
    'What was Robin\'s stage name in Canada?',
    'Question 3',
    'Question 4?',
    'Question 5?',
    'Question 6',
    'Question 7',
    'Question 8',
    'Question 9',
    'Question 10'
  ];
  
// Possible answers array
  var possibleAnswers = [
    ['Maclarens','Banana', 'Okay','Lame'],
    ['Apples', 'Oranges', 'Robin Sparkles', 'Kiwi'],
    ['1', '2', '3', '4'],
    ['1', '2', '3', '4'],
    ['1', '2', '3', '4'],
    ['1', '2', '3', '4'],
    ['1', '2', '3', '4'],
    ['1', '2', '3', '4'],
    ['1', '2', '3', '4'],
    ['1', '2', '3', '4']
  ];
  
  // Correct answers array
  
  var correctAnswers = [
          'Maclarens',
          'Robin Sparkles',
          '1',
          '1',
          '1',
          '1',
          '1',
          '1',
          '1',
          '1'
          ];
          
  // Math.floor(Math.random() * (questions.length)); Will use later to choice 10 random questions

  function hideStartScreen(){
    $('.outerStartContainer').hide();
  }
  
  function startQuiz(){
        $('.roundCounter span').html(`${questionIndex + 1}`);
        $('.scoreCounter span').html(`${scoreCount}`);
        hideStartScreen();
        generateQuestions();
    }

  //Click to start game
    $('.start').on('click', function(){
    startQuiz();
    });


// Generate random questions and answers after user clicks start
  function generateQuestions (){
    if(questionIndex < questions.length){
       $('.quizGameplay').html(`<form id="quizGameArea">

          <fieldset>
          
          <legend><h3>${questions[questionIndex]}</h3></legend>
            
            <label for="choice1">
              <input required type="radio" name="choice" value="${possibleAnswers[questionIndex][0]}" id="choice1" class="answer"><span>${possibleAnswers[questionIndex][0]}</span><br>
            </label>
            
            <label for="choice2">
              <input type="radio" name="choice" value="${possibleAnswers[questionIndex][1]}" id="choice2" class="answer"><span>${possibleAnswers[questionIndex][1]}</span><br>
            </label>
            
            <label for="choice3">
              <input type="radio" name="choice" value="${possibleAnswers[questionIndex][2]}" id="choice3" class="answer"><span>${possibleAnswers[questionIndex][2]}</span><br>
            </label>
            
            <label for="choice4">
              <input type="radio" name="choice" value="${possibleAnswers[questionIndex][3]}" id="choice4" class="answer"><span>${possibleAnswers[questionIndex][3]}</span><br>
            </label>
          </fieldset>
     
        <div class="form-submit">
          <button id="submitButton" type="submit">Submit</button>
        </div
      </form>`);
    }
// Check answers against choice upon clicking submit

  function feedback(){
    var choiceVal = $('input[name=choice]:checked').val();
    userChoices.push(choiceVal);
    if (choiceVal === correctAnswers[questionIndex]){
          $('.quizGameplay #quizGameArea').html(`<div class="question-feedback"><h2>Correct!!</h2>
          <p>You chose <strong>${choiceVal}</strong> and that is correct!!</p>
          <button class="nextButton">Next Question</button>`);
        } else {
          $('.quizGameplay #quizGameArea').html(`<div class="question-feedback"><h2>Wrong!!</h2>
          <p>You chose <strong>${choiceVal}</strong>, but the correct answer was <strong>${correctAnswers[questionIndex]}.</strong></p>
          <button class="nextButton">Next Question</button>`);
        }
  }

// Click event listener
  $('#quizGameArea').submit(function(){

    var choiceVal = $('input[name=choice]:checked').val();

    if (choiceVal === correctAnswers[questionIndex]){
      updateScore();
      feedback();
      nextQuestion();
    } 
    if (choiceVal !== correctAnswers[questionIndex]){
      feedback();
      nextQuestion();
    }
  });
}

  
// Score update
  function updateScore(){
    var choiceVal = $('input[name=choice]:checked').val();
    if (choiceVal === correctAnswers[questionIndex]){
      scoreCount += 1;
      $('.scoreCounter span').html(scoreCount);
    } else {
      scoreCount = scoreCount;
    }
  }

  // Question number update
  function updateQuestion(){
    questionIndex += 1;
    $('.roundCounter span').html(`${questionIndex}`);
  }
  

// Move to next question in array regardless of answer being correct or incorrect
  function nextQuestion(){
    $('.nextButton').on('click', function(){
      if ((questionIndex + 1) < questions.length){
        updateQuestion();
        generateQuestions();
        roundCounter();
      } else {
        endGame();
      }
    });
  }

  function endGame(){
    $('div').hide();
  }
  

  }); // document.Ready end
  