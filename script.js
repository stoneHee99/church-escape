document.addEventListener("DOMContentLoaded", function () {
  password1_1.addEventListener("input", function () {
    if (password1_1.value.length === 1) {
      password1_2.focus();
    }
  });

  password1_2.addEventListener("input", function () {
    if (password1_2.value.length === 1) {
      password1_3.focus();
    }
  });

  password1_3.addEventListener("input", function () {
    if (password1_3.value.length === 1) {
      password1_4.focus();
    }
  });

  password2_1.addEventListener("input", function () {
    if (password2_1.value.length === 1) {
      password2_2.focus();
    }
  });

  password2_2.addEventListener("input", function () {
    if (password2_2.value.length === 1) {
      password2_3.focus();
    }
  });

  const submitButton1 = document.querySelector(".quiz1__submit");
  submitButton1.addEventListener("click", checkPassword1);

  const submitButton2 = document.querySelector(".quiz2__submit");
  submitButton2.addEventListener("click", checkPassword2);
});

function checkPassword1() {
  const password1_1 = document.querySelector("#password1_1").value;
  const password1_2 = document.querySelector("#password1_2").value;
  const password1_3 = document.querySelector("#password1_3").value;
  const password1_4 = document.querySelector("#password1_4").value;

  const desiredPassword = "0315";

  if (
    password1_1 + password1_2 + password1_3 + password1_4 ===
    desiredPassword
  ) {
    const quiz1 = document.querySelector(".quiz1");
    const quiz2 = document.querySelector(".quiz2");

    // apply display: none to quiz1 and display: flex to quiz2
    quiz1.style.display = "none";
    quiz2.style.display = "flex";
  } else {
    alert("비밀번호가 틀렸습니다. 다시 입력해주세요");
    document.querySelector("#password1_1").value = "";
    document.querySelector("#password1_2").value = "";
    document.querySelector("#password1_3").value = "";
    document.querySelector("#password1_4").value = "";
    password1_1.focus();
  }
}

function checkPassword2() {
  const password2_1 = document.querySelector("#password2_1").value;
  const password2_2 = document.querySelector("#password2_2").value;
  const password2_3 = document.querySelector("#password2_3").value;

  const desiredPassword = "724";

  if (password2_1 + password2_2 + password2_3 === desiredPassword) {
    const quiz2 = document.querySelector(".quiz2");
    const quiz3 = document.querySelector(".quiz3");

    quiz2.style.display = "none";
    quiz3.style.display = "flex";

    setTimeout(3000);
    newGame();
  } else {
    alert("정답이 아닙니다. 다시 입력해주세요");
    document.querySelector("#password2_1").value = "";
    document.querySelector("#password2_2").value = "";
    document.querySelector("#password2_3").value = "";
    password2_1.focus();
  }
}

let size = 4;
let numberOfTiles = size ** 2;
let highlighted = numberOfTiles;
let shuffled = false;

let buttonContainer = document.getElementById('tiles');

function newGame() {
  loadTiles(size);
  setTimeout(() => {
      shuffle();
  }, 500);
}

// Create buttons
function loadTiles(n) {
  for (let b = 1; b <= numberOfTiles; b++) {
      var newTile = document.createElement('button');
  newTile.id = `btn${b}`;
  newTile.classList.add(`btn${b}`);
  newTile.setAttribute('index', b);
  newTile.setAttribute('back', b);
  newTile.innerHTML = b;
      newTile.classList.add('btn');
      newTile.addEventListener('click', function () {
          swap(parseInt(this.getAttribute('index')));
      });
      buttonContainer.append(newTile);
  }
  selectedTileId = 'btn' + highlighted;
  selectedTile = document.getElementById(selectedTileId);
  selectedTile.classList.add("selected");
}

function shuffle() {
  let minShuffles = 100;
  let totalShuffles = minShuffles + Math.floor(Math.random() * (200 - 100) + 100);

  for (let i = minShuffles; i <= totalShuffles; i++) {
      setTimeout(function timer() {
          let x = Math.floor(Math.random() * 4);
          let direction = 0;
          if (x == 0) {
              direction = highlighted + 1;
          } else if (x == 1) {
              direction = highlighted - 1;
          } else if (x == 2) {
              direction = highlighted + size;
          } else if (x == 3) {
              direction = highlighted - size;
          }
          swap(direction);
          if (i >= totalShuffles - 1) {
              shuffled = true;
          }
      }, i * 10);
  }
}

// Swap tiles 
function swap(clicked) {
  if (clicked < 1 || clicked > (numberOfTiles)) {
      return;
  }

  // Check if we are trying to swap right
  if (clicked == highlighted + 1) {
      if (clicked % size != 1) {
          setSelected(clicked);
      }
      // Check if we are trying to swap left
  } else if (clicked == highlighted - 1) {
      if (clicked % size != 0) {
          setSelected(clicked);
      }
      // Check if we are trying to swap up
  } else if (clicked == highlighted + size) {
      setSelected(clicked);
      // Check if we are trying to swap down 
  } else if (clicked == highlighted - size) {
      setSelected(clicked);
  }

  if (shuffled) {
  if (checkHasWon()) {
    showFanfare();
          alert("Winner!")
      }
  }
}

function checkHasWon() {
  for (let b = 1; b <= numberOfTiles; b++) {
      currentTile = document.getElementById(`btn${b}`);
      currentTileIndex = currentTile.getAttribute('index');
      currentTileValue = currentTile.innerHTML;
      if (parseInt(currentTileIndex) != parseInt(currentTileValue)) {
          return false;
      }
  }
  return true;
}

// Applies stylings to the selected tile

function setSelected(index) {
  currentTile = document.getElementById(`btn${highlighted}`);
  currentTileText = currentTile.innerHTML;
  currentTile.classList.remove('selected');
  newTile = document.getElementById(`btn${index}`);
currentTile.innerHTML = newTile.innerHTML;
currentTile.setAttribute("back", newTile.innerHTML);
newTile.innerHTML = currentTileText;
newTile.setAttribute("back", currentTileText);
newTile.classList.add("selected");
  highlighted = index;
}
