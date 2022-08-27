<?php

echo $_SERVER['DOCUMENT_ROOT'] . "/assets/db/db.accdb";

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./assets/css/style.css" />
    <script src="./assets/js/logic.js" defer></script>
    <title>Test</title>
  </head>
  <body>
    <div class="titleContainer">
        <p class="title">Hi i am Book Test -- Full Test</p>
        <p class="score">SCORE: /</p>
    </div>

    <div class="mainContent">

    <div class="c_qContainer">
        <div class="cContainer">
            <div class="prev">&#8593 Prev</div>
            <div class="current"> / </div>
            <div class="next">Next &#8595</div>
        </div>

        <div class="qsContainer">
            <!-- Many of these through Javascript -->
            <!-- <div class="qContainer">
                <p class="qText">qText 1</p>
                <div class="status"></div>
            </div> -->
        </div>
    </div>

    <div class="questionContainer">
        <div class="question"><!-- Title Goes Here --></div>
        <div class="answerContainer">
            <form>
                <textarea class="answerInput" placeholder="Your Answer" required></textarea>
                <button class="answerSubmitBtn">Submit</button>
            </form>
        </div>
    </div>

    <div class="rAnswerContainer">
    
        <div class="rAnswerTitleContainer">
            <p class="answerTitle">Answer & Details</p>
            <div class="showtoggler"><img src="./assets/imgs/view.png" alt="visible"></div>
        </div>
        <div class="rAnswer">
            <div class="answerHider">
                <div class="lockImgContainer"><img src="./assets/imgs/lock.png" alt="lock" class="lockImg"></div>
            </div>

            <div class="rAnswerContent"></div>

            <div class="result">
                <div class="wrongAns">Wrong</div>
                <div class="rightAns">Right</div>
            </div>
            
</div>
        
    </div>
</div>
  </body>
</html>
