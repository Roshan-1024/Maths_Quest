var currentLevel = 1;

function userClicks(element) {
  // Play the sound effect
  const soundEffect = document.getElementById('click_audio');
  soundEffect.play().catch(error => {
    console.error('Error playing the sound:', error);
  });
  // Remove the GIF and stop the sound after 3 seconds
  setTimeout(() => {
    soundEffect.pause();
    soundEffect.currentTime = 0; // Reset the audio
  }, 800); // 3000 milliseconds = 3 seconds


  // Get the class name of the element
  const className = element.className;

  // Get all sibling elements with the same class
  const siblings = document.getElementsByClassName(className);

  // Determine the index of the clicked element among its siblings
  const index = Array.prototype.indexOf.call(siblings, element);

  const level = parseInt(index, 10) + 1;

  if(currentLevel == level){
    //open that quiz
    switch (level) {
      case 1:
        var url = "../roman_numerals/roman_numerals_quiz.html";
        break;
      case 2:
        var url = "../round_off/round_off_quiz.html";
        break;
      case 3:
        var url = "../hcf/hcf_quiz.html";
        break;
      case 4:
        var url = "../lcm/lcm_quiz.html";
        break;
      case 5:
        var url = "../3d_shapes/3d_shapes_quiz.html"; //check url
        break;
      case 6:
        var url = "../projections/projections_quiz.html";
        break;
    }

    window.open(url, '_self');
    return;
  }

  document.getElementsByClassName("levelsNumber")[level-1].style.display = "none";
  document.getElementsByClassName("numbers")[level-1].style.display = "none";
  document.getElementsByClassName("numbers")[currentLevel-1].style.display = "block";
  document.getElementsByClassName("levelsNumber")[currentLevel-1].style.display = "block";

  switch (level) {
    case 1:

      document.getElementById("titleBar").innerHTML = "Roman Numerals";
      document.getElementById("character").style.bottom = "25%";
      document.getElementById("character").style.left = "1.5%";
      break;
    case 2:
      document.getElementById("titleBar").innerHTML = "Round off";
      document.getElementById("character").style.bottom = "35%";
      document.getElementById("character").style.left = "20.5%";
      break;
    case 3:
      document.getElementById("titleBar").innerHTML = "HCF";
      document.getElementById("character").style.bottom = "27%";
      document.getElementById("character").style.left = "37.3%";
      break;
    case 4:
      document.getElementById("titleBar").innerHTML = "LCM";
      document.getElementById("character").style.bottom = "47%";
      document.getElementById("character").style.left = "47%";
      break;
    case 5:
      document.getElementById("titleBar").innerHTML = "3D Shapes";
      document.getElementById("character").style.bottom = "40%";
      document.getElementById("character").style.left = "67%";
      break;
    case 6:
      document.getElementById("titleBar").innerHTML = "Projections";
      document.getElementById("character").style.bottom = "52%";
      document.getElementById("character").style.left = "82%";
      break;
  }
  currentLevel = level;
}


function openSelectedLevel(){
  //open that quiz
  switch (currentLevel) {
    case 1:
      var url = "../roman_numerals/roman_numerals_quiz.html";
      break;
    case 2:
      var url = "../round_off/round_off_quiz.html";
      break;
    case 3:
      var url = "../hcf/hcf_quiz.html";
      break;
    case 4:
      var url = "../lcm/lcm_quiz.html";
      break;
    case 5:
      var url = "../3d_shapes/3d_shapes_quiz.html"; //check url
      break;
    case 6:
      var url = "../projections/projections_quiz.html";
      break;
      }
    window.open(url, '_self');
}


function homeButton(){
  var url = "../opening_page/frontPage.html";
  window.open(url, "_self");
}
