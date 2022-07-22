const showToggler = document.querySelector(".showtoggler"),
  answerHider = document.querySelector(".answerHider"),
  nextBtn = document.querySelector(".next"),
  prevBtn = document.querySelector(".prev"),
  answerForm = document.querySelector("form"),
  rightBtn = document.querySelector(".rightAns"),
  wrongBtn = document.querySelector(".wrongAns"),
  currentPages = document.querySelector(".current"),
  currentScore = document.querySelector(".score");

function toggleAnswerVisibility() {
  !answerHider.classList.contains("showen") ? showAnswer() : hideAnswer();
}

showToggler.addEventListener("click", toggleAnswerVisibility);

/* --------------------------------------------------------------------------- */

const xhttp = new XMLHttpRequest();
const qsContainer = document.querySelector(".qsContainer");
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let responses = JSON.parse(this.response),
      questionTitle = document.querySelector(".question"),
      answerInput = document.querySelector(".answerInput"),
      rAnswerContent = document.querySelector(".rAnswerContent");
    /* -------------------------------------------------------------- */
    qsContainer.innerHTML = "";
    responses.forEach((response) => {
      qsContainer.innerHTML += `<div class="qContainer"><p class="qText">Question ${response.id}</p><div class="status"></div></div>`;
    });
    /* ----------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------------- */
    let qContainers = Array.from(document.querySelectorAll(".qContainer"));
    qContainers[0].classList.add("active");
    questionTitle.textContent = responses[0].question;
    rAnswerContent.innerHTML = responses[0].answer;
    rAnswerSanitization(Array.from(rAnswerContent.children));
    addAttch(rAnswerContent, currentQuestion(qContainers, responses));
    updateCurrent();
    updateScore();

    qContainers.forEach((qContainer) => {
      qContainer.addEventListener("click", () => {
        removeActive(qContainers);
        qContainer.classList.add("active");
        let currentQ = currentQuestion(qContainers, responses);
        answerInput.value = "";
        questionTitle.textContent = currentQ.question;
        rAnswerContent.innerHTML = currentQ.answer;
        rAnswerSanitization(Array.from(rAnswerContent.children));
        addAttch(rAnswerContent, currentQ);
        hideAnswer();
        updateCurrent();
      });
    });
    /* -------------------------------------------------------------------------------------- */

    nextBtn.addEventListener("click", () => {
      let currentQ = currentQuestion(qContainers, responses);
      removeActive(qContainers);
      if (currentQ.id === qContainers.length) {
        qContainers[0].classList.add("active");
        currentQ = responses[0];
      } else {
        qContainers[currentQ.id].classList.add("active");
        currentQ = responses[currentQ.id];
      }
      answerInput.value = "";
      questionTitle.textContent = currentQ.question;
      rAnswerContent.innerHTML = currentQ.answer;
      rAnswerSanitization(Array.from(rAnswerContent.children));
      addAttch(rAnswerContent, currentQ);
      let currentDivStatus =
        qContainers[currentQ.id - 1].querySelector(".status");
      window.getComputedStyle(currentDivStatus).backgroundColor ===
      "rgb(45, 198, 83)"
        ? showAnswer()
        : hideAnswer();
      updateCurrent();
    });

    prevBtn.addEventListener("click", () => {
      let currentQ = currentQuestion(qContainers, responses);
      removeActive(qContainers);
      if (currentQ.id === 1) {
        qContainers[qContainers.length - 1].classList.add("active");
        currentQ = responses[responses.length - 1];
      } else {
        qContainers[currentQ.id - 2].classList.add("active");
        currentQ = responses[currentQ.id - 2];
      }
      answerInput.value = "";
      questionTitle.textContent = currentQ.question;
      rAnswerContent.innerHTML = currentQ.answer;
      rAnswerSanitization(Array.from(rAnswerContent.children));
      addAttch(rAnswerContent, currentQ);
      let currentDivStatus =
        qContainers[currentQ.id - 1].querySelector(".status");
      window.getComputedStyle(currentDivStatus).backgroundColor ===
      "rgb(45, 198, 83)"
        ? showAnswer()
        : hideAnswer();
      updateCurrent();
    });

    answerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showAnswer();
    });

    rightBtn.addEventListener("click", () => {
      currentQContainer(qContainers);
      let status = currentQContainer(qContainers).querySelector(".status");
      status.style.backgroundColor = "#2dc653";
      nextBtn.click();
      updateCurrent();
      updateScore();
    });

    wrongBtn.addEventListener("click", () => {
      currentQContainer(qContainers);
      let status = currentQContainer(qContainers).querySelector(".status");
      status.style.backgroundColor = "#ba181b";
      nextBtn.click();
      updateCurrent();
      updateScore();
    });

    function updateCurrent() {
      for (i = 0; i < qContainers.length; i++) {
        if (qContainers[i].classList.contains("active")) {
          var x = i + 1;
          break;
        }
      }
      let total = qContainers.length;
      let current = x;
      currentPages.textContent = `${current} / ${total}`;
    }

    function updateScore() {
      let x = 0;
      qContainers.forEach((q) => {
        let status = q.querySelector(".status");
        if (
          window.getComputedStyle(status).backgroundColor === "rgb(45, 198, 83)"
        ) {
          x++;
        }
      });

      let mark = x * 10;
      let total = qContainers.length * 10;

      currentScore.textContent = `SCORE: ${mark} / ${total}`;
    }
  }
};
xhttp.open("GET", "./assets/php/DB.php");
xhttp.send();

/* ------------------------------------------------------------------------------ */

function removeActive(itretable) {
  itretable.forEach((itro) => itro.classList.remove("active"));
}

function currentQuestion(itretable, responses) {
  for (let i = 0; i < itretable.length; i++) {
    if (itretable[i].classList.contains("active")) {
      return responses[i];
    }
  }
}

function rAnswerSanitization(answerParts) {
  answerParts.forEach((part) => {
    if (part.tagName === "DIV") {
      part.classList.add("ansPart");
    }

    if (part.innerHTML === "&nbsp;") {
      part.remove();
    }
  });
}

function addAttch(rAnswerContent, currentQ) {
  let imgs = currentQ.attachments.imgs;
  let vids = currentQ.attachments.vids;
  if (imgs.length > 0) {
    imgs.forEach((img) => {
      let imgTag = `<img src='./assets/db/db_att/${img}' alt='Details'>`;
      rAnswerContent.insertAdjacentHTML("beforeend", imgTag);
    });
  }

  if (vids.length > 0) {
    vids.forEach((vid) => {
      let vidTag = `<video src='./assets/db/db_att/${vid}' controls></video>`;
      rAnswerContent.insertAdjacentHTML("beforeend", vidTag);
    });
  }
}

function hideAnswer() {
  togglerImg = showToggler.querySelector("img");
  togglerImg.src = "./assets/imgs/view.png";
  togglerImg.alt = "visible";
  if (answerHider.classList.contains("showen")) {
    answerHider.classList.remove("showen");
  }
}

function showAnswer() {
  togglerImg = showToggler.querySelector("img");
  togglerImg.src = "./assets/imgs/hidden.png";
  togglerImg.alt = "hidden";
  if (!answerHider.classList.contains("showen")) {
    answerHider.classList.add("showen");
  }
}

function currentQContainer(qs) {
  for (i = 0; i < qs.length; i++) {
    if (qs[i].classList.contains("active")) {
      return qs[i];
    }
  }
}
