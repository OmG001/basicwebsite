var buttonColour = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenPattern = [];
var started = false;
var level = 0;

// Call for sequence 
$(document).keypress(function () {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true
  }

})

// Sequence Generator

function nextSequence() {
 userChosenPattern=[];

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColour[randomNumber];
  gamePattern.push(randomChosenColour);

  // console.log(gamePattern);

  $("." + randomChosenColour).fadeOut(240).fadeIn(240);

  playSound(randomChosenColour);
}

// Click listner by user 

$(".key").click(function () {

  var userChosenColour = $(this).attr("id");

  userChosenPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // console.log(userChosenPattern);
  checkAnswer(userChosenPattern.length - 1);

});

// plays sound on sequence and clk 
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// provide animation in user's clk
function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
      $("#" + currentColour).removeClass("pressed");
    }, 100);

}

// checckin ansrs 

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userChosenPattern[currentLevel]) {
    console.log("success");
    if (userChosenPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 700);
    }

  }
  else {
    var wrong =new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press any key to ")
    startOver();
  }

}

// startOver

function startOver() {
  level=0;
  gamePattern=[];
  started= false;
}