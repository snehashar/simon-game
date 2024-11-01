let gameseq = [];
let userseq = [];
let started = false;
let level = 0;
let levels = document.querySelector(".levels");
let btns = ["red", "blue", "green", "orange"];

// Mapping color names to button classes
let colorToClassMap = {
    red: "box1",
    blue: "box2",
    green: "box3",
    orange: "box4"
};

// Start the game on any key press
document.addEventListener("keypress", () => {
    if (!started) {
        console.log("Game started");
        started = true;
        level = 0;
        gameseq = [];
        levelup();
    }
});

// Button flash function
function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

// Level up function
function levelup() {
    userseq = []; // Clear the user sequence for the new level
    level++;
    levels.innerHTML = `Level ${level}`;

    // Choose a random color and add it to the game sequence
    let randomidx = Math.floor(Math.random() * 4);
    let randomcolor = btns[randomidx];
    gameseq.push(randomcolor);

    // Flash the sequence so far
    flashSequence();
}

// Flash the full game sequence
function flashSequence() {
    gameseq.forEach((color, index) => {
        setTimeout(() => {
            let btnClass = colorToClassMap[color];
            let btn = document.querySelector(`.${btnClass}`);
            btnflash(btn);
        }, index * 600); // Add delay between flashes
    });
}

// Button press function
function btnpress() {
    let btn = this;
    let colorClicked = btns[Array.from(allbox).indexOf(btn)];
    userseq.push(colorClicked);
    btnflash(btn);

    // Check the user's answer
    checkans();
}

// Select all boxes and add the event listener to each
let allbox = document.querySelectorAll(".box1, .box2, .box3, .box4");
for (let box of allbox) {
    box.addEventListener("click", btnpress);
}

// Check the user's answer against the game sequence
function checkans() {
    let currentIdx = userseq.length - 1;
    if (userseq[currentIdx] === gameseq[currentIdx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000); // Level up after a short delay
        }
    } else {
        levels.innerText = `Game Over! Press any key to start`;
        resetGame();
    }
}

// Reset game variables
function resetGame() {
    started = false;
    level = 0;
    gameseq = [];
    userseq = [];
}
