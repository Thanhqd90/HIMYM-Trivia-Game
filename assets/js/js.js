$(document).ready(function () { // document.ready start

// var timer;


// function myTimer(sec) {
//     if (timer) clearInterval(timer);
//     timer = setInterval(function() { 
//         $('.timer').text(sec--);
//         if (sec == -1) {
//             clearInterval(timer);
//             feedback();
//             nextQuestion();
//             alert('done');
//         } 
//     }, 1000);
// }

// $(".timerStart").on("click", function() {
//     myTimer(3);
// });

// // Global variables
// var roundNumber = 0;
// // var randomQuestions = [];
// // var randomChoices = [];
// // var randomAnswer =[];
// var playerGuess = [];
// var scoreCount = 0;

// // Sounds

// // var suitup = new Audio('./assets/sounds/suitup.mp3');
// var diamondsuit = new Audio('./assets/sounds/diamondsuit.mp3');
// var awwman = new Audio('./assets/sounds/awwman.mp3');
// var legendary = new Audio('./assets/sounds/legendary.mp3');
// var forfeit = new Audio('./assets/sounds/forfeit.mp3');
// var awesome = new Audio('./assets/sounds/awesome.mp3');
// var highsix = new Audio('./assets/sounds/highsix.mp3');

  
// // Update question counter 

//   function roundCounter(){
//     $('.roundCounter span').html(roundNumber + 1);
//   }
  
// // Questions array

//   var questions = [
//     'What is the name of the bar the main characters hang out at?',
//     'What was Robin\'s stage name in Canada?',
//     'What are Marshall and Lily\s nicknames for each other?',
//     'What was Victora\'s fake name used at Claudia and Stuart\'s wedding?',
//     'What is the name of the musical Marshall and Brad go see?',
//     'What is the name of the company Barney works for?',
//     'What college did Ted, Marshall and Lily attend?',
//     'What is the name of the movie directed by Tony Grafanello that portrayed Ted and Stella\'s relationship?',
//     'What item did Ted take that belonged to the mother on St. Patrick\'s Day?',
//     'What question do I put here?'
//   ];
  
// // Possible answers array
//   var possibleAnswers = [
//     ['The Hoser Hut','MacLaren\'s Pub', 'Puzzles','Central Perk'],
//     ['Robin Rainbow', 'Batman and Robin', 'Robin Sparkles', 'Red Robin'],
//     ['Salt and Sugar', 'Luke and Lea', 'Big Fudge and Little Vanilla', 'Marshmellow and Lilypad'],
//     ['Buttercup', 'Cupcake', 'Vanilla', 'Canolli'],
//     ['Wicked', 'Mamma Mia', 'West Side Story', 'The Sound of Music'],
//     ['Goliath National Bank', 'Shinjitsu', 'Nicholson and Hewitt', 'Total Rip Fitness'],
//     ['Columbia', 'New York University', 'Syracuse', 'Wesleyan'],
//     ['Forgtting Sarah Marshall', 'The Wedding Bride', 'I Love you Man', 'American Pie'],
//     ['Yellow Umbrella', 'Blue French Horn', 'Pink Saxophone', 'Red Cowboy Boots'],
//     ['1', '2', '3', '4']
//   ];
  
//   // Correct answers array
  
//   var correctAnswers = [
//           'MacLaren\'s Pub',
//           'Robin Sparkles',
//           'Marshmellow and Lilypad',
//           'Buttercup',
//           'Mamma Mia',
//           'Goliath National Bank',
//           'Wesleyan',
//           'The Wedding Bride',
//           'Yellow Umbrella',
//           '1'
//           ];

  // for (i = 0; i < 5; i++) {
  //   var randomIndexNumber = Math.floor((Math.random() * questions.length));

  //   randomQuestions.push([randomIndexNumber]);
  //   randomChoices.push([randomIndexNumber]);
  //   randomAnswer.push([randomIndexNumber]);

  //   questions.remove[randomIndexNumber];
  //   possibleAnswers.remove[randomIndexNumber];
  //   correctAnswers.remove[randomIndexNumber];
     
  //    console.log(randomQuestions);
  //    console.log(randomChoices);
  //    console.log(randomAnswer);

  //     }   

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
    $('.start20').on('click', function(){
    startQuiz();
    diamondsuit.play();
    });


// Generate random questions and answers after user clicks start
  function generateQuestions (){
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
    $('.nextButton').on('click', function(){
      if ((roundNumber + 1) < questions.length){
        updateQuestion();
        generateQuestions();
        roundCounter();
      } else {
        results();
      }
    });
  }

  function results(){
    
    if (scoreCount < 6){
      const restartURL = '<a href="#" class="restart"><p>Play Again</p></a>';
      forfeit.play();
      $('#quizGameArea').html('<p class="final-feedback">I\'m not mad, just disappointed</p>');
      $('#quizGameArea').append('<br><img src="https://78.media.tumblr.com/f59a31fbe5137bc1372240186c76d846/tumblr_nr2vni88ue1u55i54o1_400.gif">');
      $('#quizGameArea').append(restartURL);
      $('#quizGameArea').append(`<button type="button" class="btn btn-info" data-toggle="modal" data-target="#answers">Display answers</button>`);
 
      restartQuiz();
    } else if (scoreCount >= 6 && scoreCount < 9) {
      legendary.play();
      const restartURL = '<a href="#" class="restart"><p>Play Again</p></a>';
      $('#quizGameArea').html(`<p class="final-feedback">It\'s going to be -waitforit- Legendary</p>`);
      $('#quizGameArea').append('<br><img src="http://78.media.tumblr.com/tumblr_lxxfexRoNp1qageydo1_500.gif">');
      $('#quizGameArea').append(restartURL);
      $('#quizGameArea').append('<button type="button" class="btn btn-info" data-toggle="modal" data-target="#answers">Display answers</button>');

      restartQuiz();
    } else {
      const restartURL = '<a href="#" class="restart"><p>Play again</p></a>';
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
      window.location.reload(true);
      });
    }
  });

    

  // document.Ready end