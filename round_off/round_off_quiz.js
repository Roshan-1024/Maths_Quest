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
const speed = 50; // Speed in milliseconds
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
          if(answerField.value.trim().toUpperCase() === correctAnswer.toString()){
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


//generate a random number to choose between:
//1. Addition and round round off
//2. Subtraction and round off
//3. Only round off
//do these to the nearest 10, 100 or 1000.
function generateQuestion(){
  let min = 1;
  let max = 3;
  let choice = Math.floor(Math.random() * (max - min + 1) + min);

  switch(choice){
    case 1:
      var num1 = 1, num2 = 1; //by default for the loop
      while( (num1+num2).toString().length == 1 ){
        min = 1;
        max = 9999;
        num1 = Math.floor(Math.random() * (max - min + 1) + min);
        num2 = Math.floor(Math.random() * (max - min + 1) + min);
      }

      var numOfDigitsOfSum = (num1+num2).toString().length; //let 3 digits
      var num3 = "1"; //zeroes to be concatenated

      min = 1;
      max = numOfDigitsOfSum - 1;
      numOfZeroes = Math.floor(Math.random() * (max - min + 1) + min);

      while(numOfZeroes != 0){
        num3 += '0';
        numOfZeroes--;
      }

      correctAnswer = Math.round((num1+num2)/parseInt(num3))*parseInt(num3);
      return "Estimate the sum of " + num1.toString() + " and " + num2.toString() + " to the nearest " + num3 + ".";
    case 2:
      var num1 = 1, num2 = 1; //by default for the loop
      while( Math.abs((num1-num2)).toString().length == 1 ){
        min = 1;
        max = 9999;
        num1 = Math.floor(Math.random() * (max - min + 1) + min);
        num2 = Math.floor(Math.random() * (max - min + 1) + min);
      }

      var numOfDigitsOfSum = Math.abs((num1-num2)).toString().length; //let 3 digits
      var num3 = "1"; //zeroes to be concatenated

      min = 1;
      max = numOfDigitsOfSum - 1;
      numOfZeroes = Math.floor(Math.random() * (max - min + 1) + min);

      while(numOfZeroes != 0){
        num3 += '0';
        numOfZeroes--;
      }

      if(num2 > num1){
        var temp = num2;
        num2 = num1;
        num1 = temp;
      }
      correctAnswer = Math.round((num1-num2)/parseInt(num3))*parseInt(num3);
      return "Estimate the difference of " + num1.toString() + " and " + num2.toString() + " to the nearest " + num3 + ".";
    case 3:
      min = 11;
      max = 9999;
      var num1 = Math.floor(Math.random() * (max - min + 1) + min);

      var numOfDigitsOfSum = Math.abs(num1).toString().length; //let 3 digits
      var num3 = "1"; //zeroes to be concatenated

      min = 1;
      max = numOfDigitsOfSum - 1;
      numOfZeroes = Math.floor(Math.random() * (max - min + 1) + min);

      while(numOfZeroes != 0){
        num3 += '0';
        numOfZeroes--;
      }
      correctAnswer = Math.round(num1/parseInt(num3))*parseInt(num3);
      return "Round off " + num1.toString() + " to the nearest " + num3 + ".";
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
