let $start = document.querySelector("#start");
let $game = document.querySelector("#game");
let $time = document.querySelector("#time");
let $result = document.querySelector("#result");
let $timeHeader = document.querySelector("#time-header");
let $resultHeader = document.querySelector("#result-header");
let $gameTime = document.querySelector("#game-time");

let score = 0;
let isGameStarted = false;

$start.addEventListener("click", startGame);
$game.addEventListener("click", handleBoxClick);
$gameTime.addEventListener("input", setGameTime);

let show = ($el) => {
  $el.classList.remove("hide");
};

let hide = ($el) => {
  $el.classList.add("hide");
};

//start and end the game
function startGame() {
  score = 0;
  setGameTime();
  $gameTime.setAttribute("disabled", true);
  isGameStarted = true;

  $game.style.backgroundColor = "#fff";
  hide($start);

  let interval = setInterval(function () {
    let time = parseFloat($time.textContent);

    if (time <= 0) {
      clearInterval(interval); // for stop interval
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}

// for score result
function setGameScore() {
  $result.textContent = score.toString();
}

//time from value
function setGameTime() {
  let time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
  show($timeHeader);
  hide($resultHeader);
}

//for end game
function endGame() {
  isGameStarted = false;
  setGameScore();
  $gameTime.removeAttribute("disabled");
  show($start);
  $game.style.backgroundColor = "#ccc";
  $game.innerHTML = "";

  hide($timeHeader);
  show($resultHeader);
}

//click on box score++, new square
function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }
  if (event.target.dataset.box) {
    renderBox();
    score++;
  }
}

//create random color square
function renderBox() {
  $game.innerHTML = ""; // clearing field
  let box = document.createElement("div");
  let boxSize = getRandom(30, 100);
  let gameSize = $game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;

  box.style.height = box.style.width = boxSize + "px";
  box.style.position = "absolute";
  box.style.backgroundColor = getRandomColor();
  box.style.top = getRandom(0, maxTop) + "px";
  box.style.left = getRandom(0, maxLeft) + "px";
  box.style.cursor = "pointer";
  box.setAttribute("data-box", "true");

  $game.insertAdjacentElement("afterbegin", box);
}

//random values
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//random color
function getRandomColor() {
  const colorScheme = [
    "#FFBE40",
    "#866FD7",
    "#4573D5",
    "#FC3F4D",
    "#52E93A",
    "#009E8E",
    "#FFE100",
    "#008B8B",
    "#DC143C",
    "#FFE4B5",
    "#2c5364",
    "#ec2F4B",
  ];

  let randomIndex = getRandom(0, colorScheme.length);
  return colorScheme[randomIndex];
}
