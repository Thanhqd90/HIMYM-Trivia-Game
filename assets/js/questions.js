  // Global variables
  var roundNumber = 0;
  var playerGuess = [];
  var scoreCount = 0;

  var random1 = Math.floor(Math.random() * 5) + 1;
  var random2 = Math.floor(Math.random() * 5) + 1;

  randomCelebrate = random1.toString();
  randomSad = random2.toString();
  
  // Sounds
  
  var mall = new Audio('./assets/sounds/mall.mp3');
  var suitup = new Audio('./assets/sounds/suitup.mp3');
  var timesup = new Audio('./assets/sounds/timeup.mp3');
  var challenge = new Audio('./assets/sounds/challenge.mp3');
  var diamondsuit = new Audio('./assets/sounds/diamondsuit.mp3');
  var awwman = new Audio('./assets/sounds/awwman.mp3');
  var legendary = new Audio('./assets/sounds/legendary.mp3');
  var forfeit = new Audio('./assets/sounds/forfeit.mp3');
  var awesome = new Audio('./assets/sounds/awesome.mp3');
  var highsix = new Audio('./assets/sounds/highsix.mp3');
  
    
  // Update question counter 
  
    function roundCounter(){
      $('.roundCounter span').html(roundNumber + 1);
    }

    
    
  // Questions array
  
    var questions = [
      'What is the name of the bar the main characters hang out at?',
      'What was Robin\'s stage name in Canada?',
      'What are Marshall and Lily\'s nicknames for each other?',
      'What was Victora\'s fake name used at Claudia and Stuart\'s wedding?',
      'What is the name of the musical Marshall and Brad go see?',
      'What is the name of the company Barney works for?',
      'What college did Ted, Marshall and Lily attend?',
      'What is the name of the movie directed by Tony Grafanello that portrayed Ted and Stella\'s relationship?',
      'What item did Ted take that belonged to the mother on St. Patrick\'s Day?',
      'Where did Barney meet Ted for the first time?',
      'What is the name of Barney\'s play?',
      'What tattoo did Ted need to have removed?',
      'What is Marshall\'s dream job?',
      'What state did Ted and Barney pretend to be from when trying to pick up girls?',
      'What is Barney\'s catch phrase?'
    ];
    
  // Possible answers array
    var possibleAnswers = [
      ['The Hoser Hut','MacLaren\'s Pub', 'Puzzles','Central Perk'],
      ['Robin Rainbow', 'Batman and Robin', 'Robin Sparkles', 'Red Robin'],
      ['Salt and Sugar', 'Luke and Lea', 'Big Fudge and Little Vanilla', 'Marshmellow and Lilypad'],
      ['Buttercup', 'Cupcake', 'Vanilla', 'Canolli'],
      ['Wicked', 'Mamma Mia', 'West Side Story', 'The Sound of Music'],
      ['Goliath National Bank', 'Shinjitsu', 'Nicholson and Hewitt', 'Total Rip Fitness'],
      ['Columbia', 'New York University', 'Syracuse', 'Wesleyan'],
      ['Forgtting Sarah Marshall', 'The Wedding Bride', 'I Love you Man', 'American Pie'],
      ['Yellow Umbrella', 'Blue French Horn', 'Pink Saxophone', 'Red Cowboy Boots'],
      ['St. Patrick\'s Day Festival', 'Canada', 'The Arcadian', 'At a urinal'],
      ['Happy Lily Day', 'Suck it Lily', 'The Pineapple Incident', 'Exploding Meatball Sub'],
      ['Butterfly', 'Dolphin', 'Pineapple', 'Cupcake'],
      ['Breakdancer', 'Basketball player', 'Architech', 'Environmental Lawyer'],
      ['Missouri', 'New Jersey', 'Michigan', 'Vermont']
      ['I only have one rule', 'We were on a break', 'Suit up', 'Come again for Big Fudge?']
    ];
    
    // Correct answers array
    
    var correctAnswers = [
            'MacLaren\'s Pub',
            'Robin Sparkles',
            'Marshmellow and Lilypad',
            'Buttercup',
            'Mamma Mia',
            'Goliath National Bank',
            'Wesleyan',
            'The Wedding Bride',
            'Yellow Umbrella',
            'At a urinal',
            'Suck it Lily',
            'Butterfly',
            'Environmenal Lawyer',
            'Missouri',
            'Suit up'
            ];