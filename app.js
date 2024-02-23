const openModal = document.querySelector(".btn");
const getModelElement = document.querySelector(".modal");
const mainContainer = document.querySelector(".main");
const closeModal = document.querySelector(".modal-close");
let scoreNum = document.querySelector(".score-num b");

//now select options to play game
const getGameBoard = document.querySelector(".game");
const getOption = document.querySelectorAll(".circle");
const gameContainer = getGameBoard.querySelector(".gameContainer");

console.log(getOption, "images");
var userSelectedOption;
var houseSelectedOption;
let turn = true;
let scoreCount = 1;
console.log(turn, "t");
openModal.addEventListener("click", () => {
  console.log(openModal);
  getModelElement.classList.add("open");
  mainContainer.classList.add("active");
});

closeModal.addEventListener("click", () => {
  getModelElement.classList.remove("open");
  mainContainer.classList.remove("active");
});

function getBorderColor(curentOption) {
  let setBorderColor;
  switch (curentOption) {
    case "scissor":
      setBorderColor = "hsl(40, 84%, 53%)";
      break;
    case "rock":
      setBorderColor = "hsl(349, 71%, 52%)";
      break;
    case "lizard":
      setBorderColor = "hsl(261, 73%, 60%)";
      break;
    case "spock":
      setBorderColor = "hsl(189, 59%, 53%)";
      break;
    default:
      setBorderColor = "hsl(230, 89%, 62%)";
  }
  return setBorderColor;
}

getGameBoard.addEventListener("click", (e) => {
  var getUserPickedbackBorderColor = "";
  var getHousePickedbackBorderColor = "";
  userSelectedOption = e.target;
  mainContainer.removeChild(getGameBoard);
  const nextStepContainer = document.createElement("div");
  mainContainer.appendChild(nextStepContainer);
  nextStepContainer.classList.add("selectedOption");
  const curentOption = userSelectedOption.alt;
  console.log(curentOption, "user");
  if (turn) {
    if (userSelectedOption.alt === "scissor") {
      houseSelectedOption = `<img src="/images/icon-rock.svg" alt="rock" />`;
      getUserPickedbackBorderColor = "hsla(40, 100%, 50%, 0.822)";
      getHousePickedbackBorderColor = "hsla(349, 71%, 52%, 0.795)";
    } else if (userSelectedOption.alt === "paper") {
      houseSelectedOption = `<img src="/images/icon-scissors.svg" alt="scissor" />`;
      getUserPickedbackBorderColor = "hsla(230, 89%, 62%, 0.836)";
      getHousePickedbackBorderColor = "hsla(40, 100%, 50%, 0.822)";
    } else if (userSelectedOption.alt === "rock") {
      houseSelectedOption = `<img src="/images/icon-paper.svg" alt="paper" />`;
      getUserPickedbackBorderColor = "hsla(349, 79%, 53%, 0.87)";
      getHousePickedbackBorderColor = "hsla(230, 89%, 62%, 0.836)";
    } else if (userSelectedOption.alt === "spock") {
      houseSelectedOption = `<img src="/images/icon-paper.svg" alt="paper" />`;
      getUserPickedbackBorderColor = "hsla(189, 69%, 51%, 0.822)";
      getHousePickedbackBorderColor = "hsla(230, 89%, 62%, 0.795)";
    } else {
      houseSelectedOption = `<img src="/images/icon-scissors.svg" alt="scissor" />`;
      getUserPickedbackBorderColor = "hsla(261, 73%, 60%, 0.877)";
      getHousePickedbackBorderColor = "hsla(40, 100%, 50%, 0.822)";
    }
  } else {
    if (userSelectedOption.alt === "scissor") {
      houseSelectedOption = `<img src="/images/icon-paper.svg" alt="paper" />`;
    } else if (userSelectedOption.alt === "paper") {
      houseSelectedOption = `<img src="/images/icon-rock.svg" alt="rock" />`;
    } else if (userSelectedOption.alt === "rock") {
      houseSelectedOption = `<img src="/images/icon-scissors.svg" alt="scissor" />`;
    } else {
      houseSelectedOption = `<img src="/images/icon-spock.svg" alt="spock" />`;
    }
  }

  console.log(houseSelectedOption.alt, "ho");

  let newContent = `
  <div class='userPick-container'>
  <h3>YOU PICKED</h3>
  <div class="userPicked" style=" border: 15px solid ${getBorderColor(
    curentOption
  )};">
  <img src=${userSelectedOption.src} alt=${userSelectedOption.alt}/>
  </div>
  </div>
 <div class='housePick-container'>
 <h3>THE HOUSE PICKED</h3>
 <div class="no-image"></div>
 </div>
  `;
  const ele = document.createElement("div");
  ele.classList.add("housePicked");
  nextStepContainer.innerHTML = newContent;
  const getUserPicked = document.querySelector(".userPicked");

  getUserPicked.style.setProperty(
    "--userBack-border",
    getUserPickedbackBorderColor
  );
  console.log(getHousePickedbackBorderColor, "color");

  function inserContent(housePickedElement) {
    housePickedElement.innerHTML = houseSelectedOption;
    const housePickedOption = document.querySelector(".housePicked img");
    housePickedElement.style.border = ` 15px solid ${getBorderColor(
      housePickedOption.alt
    )}`;
    housePickedElement.style.setProperty(
      "--houseBack-border",
      getHousePickedbackBorderColor
    );
  }

  setTimeout(() => {
    document.querySelector(".no-image").remove();
    document.querySelector(".housePick-container").appendChild(ele);
    const housePickedElement = document.querySelector(".housePicked");
    inserContent(housePickedElement);
    housePickedElement.style.opacity = 0;
  }, [500]);

  setTimeout(() => {
    const housePickedElement = document.querySelector(".housePicked");
    housePickedElement.style.opacity = 1;
    housePickedElement.classList.add("visible");
  }, [800]);
  setTimeout(() => {
    const result = document.createElement("div");
    const isWin = document.createElement("h1");
    isWin.appendChild(document.createTextNode(!turn ? "YOU WIN" : "You Lose"));
    result.appendChild(isWin);
    var num = scoreNum.innerHTML;
    console.log(num, "num");
    scoreNum.innerHTML = !turn
      ? +num + scoreCount
      : num > 0
      ? +num - scoreCount
      : 0;
    var buttonEle = document.createElement("Button");
    buttonEle.innerHTML = "PLAY AGAIN";
    result.appendChild(buttonEle);
    isWin.classList.add("result-heading");
    buttonEle.classList.add("play-now");
    result.classList.add("result-div");
    mainContainer.appendChild(result);
    const playAgain = document.querySelector(".play-now");
    playAgain.addEventListener("click", () => {
      const currentContainer = document.querySelector(".selectedOption");
      mainContainer.removeChild(currentContainer);
      mainContainer.appendChild(getGameBoard);
      mainContainer.removeChild(result);
      turn = !turn;
    });
    console.log(result);
  }, [2000]);
});
