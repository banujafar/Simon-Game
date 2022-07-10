var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$(document).on("keypress", function () {
  if (!started) {
    // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
//Function restart game
function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  var chosenId = $("#" + `${randomChosenColour}`);
  chosenId.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("Level " + `${level}`);
}

//Function play sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Function animate Press
function animatePress(currentColour) {
  $("#" + `${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $("#" + `${currentColour}`).removeClass("pressed");
  }, 100);
}
