/*
#quiz_container the div to contain the q&a section

  QUESTION - 1
  .questionAndAnswerContainer to contain the specific question and answer
    .questionFolder to contain the specific question and the robot Image
      .questionField to contain the specific question
      .robotImg which is the image not a div
    .answerFolder to contain the specific input field and character Image
      .answerField to contain the input field
      .characterImg which is the image not a div

  QUESTION - 2
  .questionAndAnswerContainer to contain the specific question and answer

    .questionFolder to contain the specific question and the robot Image
      .questionField to contain the specific question
      .robotImg which is the image not a div

    .answerFolder to contain the specific input field and character Image
      .answerField to contain the input field
      .characterImg which is the image not a div
*/
var correctAnswer = "";
var question_number = 0;
var score = 0;
let index;
const speed = 100; // Speed in milliseconds
var question;
const fullScore = 30;
var lives = 3;
var gameOver = false; //currently no use...
document.getElementById("scoreBoard").innerHTML = "Score: 0 / " + fullScore.toString();

//displays question and checks if input is correct.
function displayQuestion(){
  if(question_number == fullScore){
    gameOver = true;
    gameOverAudio();
  }
  question_number++;
  if(gameOver){
    question_number--;
    return;
  }

  const questionAndAnswerContainer = document.createElement('div');
  questionAndAnswerContainer.className = "questionAndAnswerContainer";
  document.getElementById("quiz_container").appendChild(questionAndAnswerContainer);

  const questionFolder = document.createElement('div');
  questionFolder.className = "questionFolder";
  document.getElementsByClassName('questionAndAnswerContainer')[question_number-1].appendChild(questionFolder);

  const questionField = document.createElement('div');
  questionField.className = "questionField";
  document.getElementsByClassName('questionFolder')[question_number-1].appendChild(questionField);

  const robotImg = document.createElement('img');
  robotImg.className = "robotImg";
  robotImg.src = "../Images/robot.png";
  document.getElementsByClassName('questionFolder')[question_number-1].appendChild(robotImg);

  const answerFolder = document.createElement('div');
  answerFolder.className = "answerFolder";
  document.getElementsByClassName('questionAndAnswerContainer')[question_number-1].appendChild(answerFolder);

  const characterImg = document.createElement('img');
  characterImg.className = "characterImg";
  characterImg.src = "../Images/character_head.png";  //change this img
  document.getElementsByClassName('answerFolder')[question_number-1].appendChild(characterImg);

  const answerField = document.createElement('input');
  answerField.className = "answerField";
  document.getElementsByClassName('answerFolder')[question_number-1].appendChild(answerField);




  //keypress enter shows next question
  const input = document.getElementsByClassName("answerField")[question_number - 1];
  if (input) { // Check if input exists
    // Add event listener for keypress
    input.addEventListener("keypress", function(event) {
      // Check if the key pressed is Enter
      if (event.key === "Enter") {
        // Prevent the default action if needed
        event.preventDefault();
        // Call the desired function
        if(index == question.length && answerField.value.trim() !== ""){
          if(answerField.value.trim().toUpperCase() === correctAnswer){
            console.log("Correct");
            score++;
            if(score == fullScore){
              // Play the sound effect
              const soundEffect = document.getElementById('game_won_audio');
              soundEffect.play().catch(error => {
                console.error('Error playing the sound:', error);
              });
              // Remove the GIF and stop the sound after 3 seconds
              setTimeout(() => {
                gif_elem.style.display = 'none';
                soundEffect.pause();
                soundEffect.currentTime = 0; // Reset the audio
              }, 3000); // 3000 milliseconds = 3 seconds
              document.getElementById("scoreBoard").innerHTML = "Score: " + score.toString() + " / " + fullScore.toString();
              answerField.style.boxShadow = "0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.6), 0 0 60px rgba(0, 255, 0, 0.4), 0 0 80px rgba(0, 255, 0, 0.2)";
              document.getElementById("anweshaPhoto").style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 80px rgba(255, 255, 255, 0.2)";
              return;
            }
            showGifAndPlaySoundOnCorrectAns();
            document.getElementById("scoreBoard").innerHTML = "Score: " + score.toString() + " / " + fullScore.toString();
            answerField.style.boxShadow = "0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.6), 0 0 60px rgba(0, 255, 0, 0.4), 0 0 80px rgba(0, 255, 0, 0.2)";
            document.getElementById("anweshaPhoto").style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 80px rgba(255, 255, 255, 0.2)";
          }
          else{
            console.log("Incorrect");
            lives--;
            if(lives == 2){
              document.getElementById("hearts").src = "../Images/2_hearts.png";
              document.getElementById("hearts").style.height = "70px";
              document.getElementById("hearts").style.width = "230px";
            }
            else if(lives == 1){
              document.getElementById("hearts").src = "../Images/1_heart.png";
            }
            else if(lives == 0){
              document.getElementById("hearts").src = "../Images/0_heart.png";
              gameOver = true;
              displayGameOver();
            }
            document.getElementById("anweshaPhoto").style.boxShadow = "0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 0, 0, 0.4), 0 0 80px rgba(255, 0, 0, 0.2)";
            answerField.style.boxShadow = "0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 0, 0, 0.4), 0 0 80px rgba(255, 0, 0, 0.2)";
            if(lives != 0){
              showGifAndPlaySoundOnIncorrectAns();
            }
            else{
              gameOver = true;
            }
          }
          //Lock the input field after clicking Enter
          document.getElementsByClassName("answerField")[question_number-1].disabled = true;
          displayQuestion();  //to display the next question.
          //when pressing enter the last time, don't focus on the next input field as it doesn't exist.
          if(!gameOver){
            document.getElementsByClassName("answerField")[question_number-1].focus();
          }

        }

      }
    });
  }


  //typewriter effect
  index = 0;
  question = generateQuestion();

  function typeWriter() {
    if (index < question.length) {
      document.getElementsByClassName('questionField')[question_number-1].innerHTML += question.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter();
}



//Logic to convert the given number to roman number:
function number_to_roman(n){
  var number = n;
  var ans = "";

  while(n > 0){
    if(n >= 100){
      n -= 100;
      ans += "C";
    }
    else if(n >= 90){
      n -= 90;
      ans += "XC";
    }
    else if(n >= 50){
      n -= 50;
      ans += "L";
    }
    else if(n >= 40){
      n -= 40;
      ans += "XL";
    }
    else if(n >= 10){
      n -= 10;
      ans += "X";
    }
    else if(n == 9){
      n -= 9;
      ans += "IX";
    }
    else if(n >= 5){
      n -= 5;
      ans += "V";
    }
    else if(n == 4){
      n -= 4;
      ans += "IV";
    }
    else if(n < 4){
      n--;
      ans += "I";
    }
  }
  return ans;
}



//generate a random number to choose between:
//1. Convert XIX to number.
//2. Convert 34 to roman number.
//3. What comes beetween XI and XIII?
//4. What comes before X?
//5. What comes after XC?
function generateQuestion(){
  let min = 1;
  let max = 5;
  let choice = Math.floor(Math.random() * (max - min + 1) + min);

  min = 1;
  max = 100;
  var num1 = Math.floor(Math.random() * (max - min + 1) + min);
  switch(choice){
    case 1:
      correctAnswer = num1.toString();
      return "Convert " + number_to_roman(num1) + " to number.";
    case 2:
      correctAnswer = number_to_roman(num1);
      return "Convert " + num1.toString() + " to Roman Numeral.";
    case 3:
      correctAnswer = number_to_roman(num1+1).toString();
      return "What comes between " + number_to_roman(num1) + " and " + number_to_roman(num1+2) + "?";
    case 4:
      //To not ask what comes before I
      while(num1 == 1){
        num1 = Math.floor(Math.random() * (max - min) + min);
      }
      correctAnswer = number_to_roman(num1-1).toString();
      return "What comes before " + number_to_roman(num1) + "?";
    case 5:
      //To not ask what comes after C
      while(num1 == 100){
        num1 = Math.floor(Math.random() * (max - min) + min);
      }
      correctAnswer = number_to_roman(num1+1).toString();
      return "What comes after " + number_to_roman(num1) + "?";
  }
}


//Mocking on losing
function showGifAndPlaySoundOnIncorrectAns() {
  // Get the GIF container and audio element
  const gif_elem = document.createElement('img');
  gif_elem.id = "mockery_gif";
  gif_elem.src = "../Images/mocking_on_losing.gif";
  document.getElementById('gif_container').appendChild(gif_elem);
  // Display the GIF
  gif_elem.style.display = 'block';


  // Play the sound effect
  const soundEffect = document.getElementById('mockery_audio');
  soundEffect.play().catch(error => {
    console.error('Error playing the sound:', error);
  });

  // Remove the GIF and stop the sound after 3 seconds
  setTimeout(() => {
    gif_elem.style.display = 'none';
    soundEffect.pause();
    soundEffect.currentTime = 0; // Reset the audio
  }, 2500); // 3000 milliseconds = 3 seconds
}

function showGifAndPlaySoundOnCorrectAns() {
  // Get the GIF container and audio element
  const gif_elem = document.createElement('img');
  gif_elem.id = "yay_gif";
  gif_elem.src = "../Images/yay.gif";
  gif_elem.style.width = "200px";
  gif_elem.style.height = "250px";
  document.getElementById('gif_container').appendChild(gif_elem);
  const soundEffect = document.getElementById('yay_audio');

  // Display the GIF
  gif_elem.style.display = 'block';

  // Play the sound effect
  soundEffect.play().catch(error => {
    console.error('Error playing the sound:', error);
  });

  // Remove the GIF and stop the sound after 3 seconds
  setTimeout(() => {
    gif_elem.style.display = 'none';
    soundEffect.pause();
    soundEffect.currentTime = 0; // Reset the audio
  }, 2000); // 3000 milliseconds = 3 seconds
}

function backButton(){
  var url = "../level_selection_page/level_selection_page.html";
  window.open(url, '_self');
}

function displayGameOver(){
  document.getElementById("game_over_cover_screen").style.display = "block";
  gameOverAudio();
}

function gameOverBackButton(){
  document.getElementById("game_over_cover_screen").style.display = "none";
}

function gameOverRetryButton(){
  gameOver = false;
  lives = 3;
  score = 0;
  while(question_number != 0){
    document.getElementsByClassName("questionAndAnswerContainer")[question_number-1].remove();
    question_number--;
  }
  document.getElementById("game_over_cover_screen").style.display = "none";
  document.getElementById("hearts").src = "../Images/3_hearts.png";
  document.getElementById("scoreBoard").innerHTML = "Score: 0 / " + fullScore.toString();
  question_number = 0;
  displayQuestion();

}

function gameOverAudio(){
  const soundEffect = document.getElementById('game_over_audio');
  soundEffect.play().catch(error => {
    console.error('Error playing the sound:', error);
  });

  // Remove the GIF and stop the sound after 3 seconds
  setTimeout(() => {
    soundEffect.pause();
    soundEffect.currentTime = 0; // Reset the audio
  }, 1500); // 3000 milliseconds = 3 seconds
}


document.addEventListener("DOMContentLoaded", function() {
  displayQuestion();
});
