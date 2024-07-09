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
const speed = 10; // Speed in milliseconds
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


// Function to find the HCF of an array of numbers
function findHCF(arr) {
    // Helper function to find the HCF of two numbers using the Euclidean algorithm
    const gcd = (a, b) => {
      while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
      }
      return a;
    };
  
    // Reduce the array to the HCF of its elements
    return arr.reduce((hcf, num) => gcd(hcf, num));
  }




function generateQuestion(){
  let questionsAndAnswers = [
    ["What is the HCF of 63 and 84?", "21"],
    ["What is the HCF of 632 and 842?", "2"],
    ["What is the HCF of 60, 34 and 84?", "2"],
    ["What is the HCF of 72 and 96?", "24"],
    ["What is the HCF of 99 and 121?", "11"],
    ["What is the HCF of 126 and 189?", "63"],
    ["What is the HCF of 150 and 225?", "75"],
    ["What is the HCF of 180 and 240?", "60"],
    ["What is the HCF of 210 and 315?", "105"],
    ["What is the HCF of 240 and 360?", "120"],
    ["What is the HCF of 280 and 420?", "140"],
    ["What is the HCF of 308 and 462?", "154"],
    ["What is the HCF of 336 and 504?", "168"],
    ["What is the HCF of 360 and 540?", "180"],
    ["What is the HCF of 396 and 594?", "198"],
    ["What is the HCF of 432 and 648?", "216"],
    ["What is the HCF of 468 and 702?", "234"],
    ["What is the HCF of 504 and 756?", "252"],
    ["What is the HCF of 540 and 810?", "270"],
    ["What is the HCF of 576 and 864?", "288"],
    ["What is the HCF of 612 and 918?", "306"],
    ["What is the HCF of 648 and 972?", "324"],
    ["What is the HCF of 684 and 1026?", "342"],
    ["What is the HCF of 720 and 1080?", "360"],
    ["What is the HCF of 756 and 1134?", "378"],
    ["What is the HCF of 792 and 1188?", "396"],
    ["What is the HCF of 828 and 1242?", "414"],
    ["What is the HCF of 864 and 1296?", "432"],
    ["What is the HCF of 900 and 1350?", "450"],
    ["What is the HCF of 936 and 1404?", "468"],
    ["What is the HCF of 972 and 1458?", "486"],
    ["What is the HCF of 1008 and 1512?", "504"],
    ["What is the HCF of 1044 and 1566?", "522"],
    ["What is the HCF of 1080 and 1620?", "540"],
    ["What is the HCF of 1116 and 1674?", "558"],
    ["What is the HCF of 1152 and 1728?", "576"],
    ["What is the HCF of 1188 and 1782?", "594"],
    ["What is the HCF of 1224 and 1836?", "612"],
    ["What is the HCF of 1260 and 1890?", "630"],
    ["What is the HCF of 1296 and 1944?", "648"],
    ["What is the HCF of 1332 and 1998?", "666"],
    ["What is the HCF of 1368 and 2052?", "684"],
    ["What is the HCF of 1404 and 2106?", "702"],
    ["What is the HCF of 1440 and 2160?", "720"],
    ["What is the HCF of 1476 and 2214?", "738"],
    ["What is the HCF of 1512 and 2268?", "756"],
    ["What is the HCF of 1548 and 2322?", "774"],
    ["What is the HCF of 1584 and 2376?", "792"],
    ["What is the HCF of 1620 and 2430?", "810"],
    ["What is the HCF of 1656 and 2484?", "828"],
    ["What is the HCF of 1692 and 2538?", "846"],
    ["What is the HCF of 1728 and 2592?", "864"],
    ["What is the HCF of 1764 and 2646?", "882"],
    ["What is the HCF of 1800 and 2700?", "900"],
    ["What is the HCF of 1836 and 2754?", "918"],
    ["What is the HCF of 1872 and 2808?", "936"],
    ["What is the HCF of 1908 and 2862?", "954"],
    ["What is the HCF of 1944 and 2916?", "972"],
    ["What is the HCF of 1980 and 2970?", "990"],
    ["What is the HCF of 2016 and 3024?", "1008"],
    ["What is the HCF of 2052 and 3078?", "1026"],
    ["What is the HCF of 2088 and 3132?", "1044"],
    ["What is the HCF of 2124 and 3186?", "1062"],
    ["What is the HCF of 2160 and 3240?", "1080"],
    ["What is the HCF of 2196 and 3294?", "1098"],
    ["What is the HCF of 2232 and 3348?", "1116"],
    ["What is the HCF of 2268 and 3402?", "1134"],
    ["What is the HCF of 2304 and 3456?", "1152"],
    ["What is the HCF of 2340 and 3510?", "1170"],
    ["What is the HCF of 2376 and 3564?", "1188"],
    ["What is the HCF of 2412 and 3618?", "1206"],
    ["What is the HCF of 2448 and 3672?", "1224"],
    ["What is the HCF of 2484 and 3726?", "1242"],
    ["What is the HCF of 2520 and 3780?", "1260"],
    ["What is the HCF of 2556 and 3834?", "1278"],
    ["What is the HCF of 2592 and 3888?", "1296"],
    ["What is the HCF of 2628 and 3942?", "1314"],
    ["What is the HCF of 2664 and 3996?", "1332"],
    ["What is the HCF of 2700 and 4050?", "1350"],
    ["What is the HCF of 2736 and 4104?", "1368"],
    ["What is the HCF of 2772 and 4158?", "1386"],
    ["What is the HCF of 2808 and 4212?", "1404"],
    ["What is the HCF of 2844 and 4266?", "1422"],
    ["What is the HCF of 2880 and 4320?", "1440"],
    ["What is the HCF of 2916 and 4374?", "1458"],
    ["What is the HCF of 2952 and 4428?", "1476"],
    ["What is the HCF of 2988 and 4482?", "1494"],
    ["What is the HCF of 3024 and 4536?", "1512"],
    ["What is the HCF of 3060 and 4590?", "1530"],
    ["What is the HCF of 3096 and 4644?", "1548"],
    ["What is the HCF of 3132 and 4698?", "1566"],
    ["What is the HCF of 3168 and 4752?", "1584"],
    ["What is the HCF of 3204 and 4806?", "1602"],
    ["What is the HCF of 3240 and 4860?", "1620"],
    ["What is the HCF of 3276 and 4914?", "1638"],
    ["What is the HCF of 3312 and 4968?", "1656"],
    ["What is the HCF of 3348 and 5022?", "1674"],
    ["What is the HCF of 3384 and 5076?", "1692"],
    ["What is the HCF of 3420 and 5130?", "1710"],
    ["What is the HCF of 3456 and 5184?", "1728"],
    ["What is the HCF of 3492 and 5238?", "1746"],
    ["What is the HCF of 3528 and 5292?", "1764"],
    ["What is the HCF of 3564 and 5346?", "1782"],
    ["What is the HCF of 3600 and 5400?", "1800"]
    // Add more questions and answers as needed
  ];
  min = 1;
  max = 104
  var choice = Math.floor(Math.random() * (max - min + 1) + min);
  correctAnswer = questionsAndAnswers[choice-1][1];
  return questionsAndAnswers[choice-1][0];
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

//Saves game progress of associated user to local storage.
function saveButton(){
  //Do nothing if no data actually exists.
  if(question_number == 0){
    return;
  }

  var questionList = [], answerList = [];
  for (let index = 1; index < question_number; index++) {
    questionList.push(document.getElementsByClassName("questionField")[index-1].innerHTML);
    answerList.push(document.getElementsByClassName("answerField")[index-1].value);
  }

  var username = localStorage.getItem("Recent User");
  let gameProgress = {
    user: username,
    page: "Roman Numerals",
    "question Number": question_number-1,
    "Question List": questionList,
    "Answer List": answerList
  }

  
  localStorage.setItem(username+"'s Game Progress", JSON.stringify(gameProgress));
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