let gameSeq = []
let userSeq = []
// storing color value 
let colorBtns = ['red', 'green', 'blue', 'yellow']
let started = false;
let level = 0;
let hg = 0

// ! restart game
let restartGame = document.querySelector('#restartGame')
restartGame.classList.add('none')
// ! restartgame code end
// document.body.addEventListener('keypress',(e)=>{
//     if (e.key === 'r' || e.key === 'R') {
//         location.reload();
//     }
//     // !reload page
// })
let timeLine;
let countDown;
function timer() {
    countDown = 4
    timeLine = document.querySelector("#timer")
    let timer = setInterval(() => {
        countDown--;
        timeLine.classList.add("timestyle")
        timeLine.innerText = `  ${countDown}`
   
        if (countDown === 0) {
            clearInterval(timer);
            timeLine.classList.remove("timestyle")
            timeLine.innerText = ''

        }
    }, 1000)
 
}
let levelHeading = document.querySelector('p')
// ! selecting button
let startGame = document.querySelector('#startGame')
 
// ! selecting button end
function run() {
    // ! run function for starting game....
    levelHeading.innerHTML = ''

    if (started == false) {
        timer()
        
    }
     setTimeout(function () {
        if (started == false) {
            console.log('game is started')
            started = true
            levelUp()
            restartGame.classList.add('dbl')
            
        }
    }, 5000)
    
     
   
}
// ! code for start game 
startGame.addEventListener('click',()=>{
    startGame.classList.add('anim')
    let audio = new Audio('start_w.wav');
    audio.play();
    setTimeout(() => {
        startGame.remove()
    }, 500);
    run();
})
//! code of startgame is end end

// !    restart game code           
restartGame.addEventListener('click', function () {
    let audio = new Audio('restart_w.wav');
    audio.play();
    reset()
    restartGame.classList.add('rotate')
     setTimeout(() => {
        restartGame.classList.remove('rotate')
     }, 500);
      timeLine.style.zIndex = '5'
    run()
})
// !  restart game code end             
function btnFlash(btn) {
    let audio = new Audio('flashcard_w.wav')
    audio.play()
    btn.classList.add('flash')
    // removing flash button color 
    setTimeout(() => {
        btn.classList.remove('flash')
    }, 350);

}

function levelUp() {
    userSeq = []
    level++
    levelHeading.innerText = `Level ${level} your highscore is ${hg}`

    // levelHeading.style.fontSize = '1.75rem'
    // taking a random color between index 0-3
    let randomIndex = Math.floor(Math.random() * 3)
    // now by randomColorIndex we get over random Color
    let randomColor = colorBtns[randomIndex]
    // now by randomcolor we get ,we can get random color of our game
    let randomBtn = document.querySelector(`.${randomColor}`)
    //let store sequence in gameSeq
    gameSeq.push(randomColor)

    // code: for showing hint
    // let hint = document.createElement('p')
    // levelHeading.append(hint)
    // let gameHint =  gameSeq.map((e)=>{
    //     return e
    // })
    // hint.innerText = gameHint
    btnFlash(randomBtn)
    // console.log(gameSeq)
    highScore()
}

// checking user color correct or not
function checkAns(index) {
    if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {


        let container = document.querySelector('.container')
        container.classList.toggle('shake')
        let audio = new Audio('gameend_w.wav');
    
        // Play the audio
        levelHeading.innerHTML = `GAME OVER... YOU SCORE WAS ${level} , HIGH SCORE IS ${hg}`
        audio.play();
        // reset()
    }
}

// now adding event on over divsbutton
function cliButtons() {
    let thisButton = this
    // console.log(thisButton)
    // calling flashbtn function
    btnFlash(thisButton)
    userColor = thisButton.getAttribute('id')
    userSeq.push(userColor)
    checkAns(userSeq.length - 1)
}
//selecting all divButtons
let divBtns = document.querySelectorAll(".item")
for (a of divBtns) {
    a.addEventListener('click', cliButtons)
}

// reset game
function reset() {
    console.log('Reset function called');
    started = false
    gameSeq = []
    userSeq = []
    level = 0
    hg += level
}


//! for highScore
function highScore() {
    if (level > hg) {
        hg = level
    }
}