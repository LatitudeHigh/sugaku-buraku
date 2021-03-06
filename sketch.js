// TETRIS CLONE IN P5.JS
// https://github.com/nnxa/tetris
//
// Credits:
// Font: Copyright (c) 2011, Cody "CodeMan38" Boisclair (cody@zone38.net), with Reserved Font Name "Press Start".
// modifed by michael sexton

// how many diffrent frames the game shows per second

const FRAME_RATE = 15;

const PANEL_WIDTH = 200;
const PANEL_HEIGHT = 300;

const CELLSIZE = 11;
const GRID_WIDTH = 10;
const GRID_HEIGHT = 40;
const VISIBLE_GRID_HEIGHT = 20;

const BOARD_X = PANEL_WIDTH / 2 - CELLSIZE * GRID_WIDTH / 2;
const BOARD_Y = PANEL_HEIGHT / 2 - CELLSIZE * VISIBLE_GRID_HEIGHT / 2;
const INVISIBLE_GRID_HEIGHT = GRID_HEIGHT - VISIBLE_GRID_HEIGHT;

const ANIMATION_SPEED = FRAME_RATE / 20;

const MATH_SYMBOLS = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "0", "0", "+", "-", "*", "/",];

// Array containing the state of the playing area
// An empty cell is represented by -1, otherwise the value corresponds to the
// colour of the block it contains.
// The grid is 10x40, where the top 20 rows (rows 0 to 19) are above the
// "skyline" and invisible to the player.
let grid = [];
// Array containing the math symbols on the tetrominos
let mathGrid = [];

let sound0;
let sound1;
let sound2;
let sound3;
let sound4;
let sound5;
let sound6;
let sound7;
let sound8;

let background1;
// variables for the state of the current falling tetrimino
let tetriminoX;
let tetriminoY;
let lowestTetriminoY;
let tetriminoRot;
let timeToDrop = 1; // number of frames until the tetrimino drops another block
let currentTetrimino;
let nextTetrimino = -1;
let sack = []; // next Tetrimino is drawn from the sack
let lastMoveRotation = false;
let nextSymbols = [];

// player score
let lines = 0;
let level = 1;
let score = 0;
let equation = 0;

// scale factor required to fullscreen the playing area
let scaleFactor;

// controls state
let softDrop = false;
let holdLeft = false;
let holdRight = false;

// font
let myFont;

let displayGrid = true;

// when an animation is playing, stores the current frame
let animationFrame;

let linesComplete = [];

let message;
let messageX;
let messageY;
let messageTTL = 0;

// game states
let state; // current state
const STATE_FALLING = 1; // Tetrimino is falling
const STATE_LOCK_ON = 2; // Tetrimino is touching the ground but hasn't locked in place
const STATE_LINE_CLEAR_ANIMATION = 3;
const STATE_GAME_OVER_ANIMATION = 4;
const STATE_GAME_OVER_PLAY_AGAIN = 5;


function preload() {
    myFont = loadFont('fonts/press-start-2p/PressStart2P.ttf');
    soundFormats('mp3', 'ogg', 'wav');
    sound0 = loadSound('sounds/background-music/main-theme.mp3');
    sound1 = loadSound('sounds/hard-drop/real.wav');
    sound2 = loadSound('sounds/game-over/real.wav');
    sound3 = loadSound('sounds/single/real.wav');
    sound4 = loadSound('sounds/triple/real.wav');
    sound5 = loadSound('sounds/rotate/real.wav');
    sound6 = loadSound('sounds/move/real.wav');
    sound7 = loadSound('sounds/double/real.wav');
    sound8 = loadSound('sounds/tetris/real.wav');
}

// sets the game up for play
function setup() {
    sound0.play();
    createCanvas(720, 400);
    for(var block = 0; block < TETRIMINO.length; block++) {
      TETRIMINO[block]["image"] = loadImage('assets/blocks/block' + (block + 1) + '.jpg'); 
        background1 = loadImage('assets/backgrounds/moon1.jpg');
    }
    frameRate(FRAME_RATE);
    scaleFactor = min(windowHeight / PANEL_HEIGHT, windowWidth / PANEL_WIDTH) * 1.0;
    textFont(myFont);
    let canvas = createCanvas(windowWidth, windowHeight);
    resetGame();
    
}

// restarts the game for a new round
function resetGame() {
    for (x = 0; x < GRID_WIDTH; x++) {
        grid[x] = [];
        mathGrid[x] = [];
        for (y = 0; y < GRID_HEIGHT; y++) {
            grid[x][y] = -1;
            mathGrid[x][y] = "";
        }
    }

    lines = 0;
    nextTetrimino = -1;
    state = STATE_FALLING;
    softDrop = false;
    holdLeft = false;
    holdRight = false;
    level = 1;
    timeToDrop = dropTime();
    score = 0;
    generateTetrimino();
}

function fall() {
    // decrease timer for when falling tetrimino next moves down a cell
    if (softDrop) {
        timeToDrop -= 20;
    } else {
        timeToDrop--;
    }
    // if timer hits 0 move tetrimino down one
    while (timeToDrop <= 0) {
        timeToDrop += dropTime();
        moveDown();
    }

    // checks to see if a player is holding left or right
    checkForHold();

    checkLevel();


    if (clashDetect(currentTetrimino, tetriminoX, tetriminoY + 1, tetriminoRot)) {
        switchState(STATE_LOCK_ON);
    }
}

function stateLock() {
    timeToDrop--;
    checkForHold();

    if (timeToDrop <= 0) {
        // check for T-spin:
        let tSpin = false;
        if (
            currentTetrimino == 2 && lastMoveRotation
            && clashDetect(currentTetrimino, tetriminoX, tetriminoY - 1, tetriminoRot) 
            && clashDetect(currentTetrimino, tetriminoX - 1, tetriminoY, tetriminoRot) 
            && clashDetect(currentTetrimino, tetriminoX + 1, tetriminoY, tetriminoRot)
        ) {
            tSpin = true;
        }

        // paint tetrimino onto the grid
        let tetriminoSize = TETRIMINO[currentTetrimino].size;
        let i = 0;
        // checks if tetromino is past the top of the screen
        let lockedOnBelowSkyline = false;

        let mathIdx = 0;
        for (y = 0; y < tetriminoSize; y++) {
            for (x = 0; x < tetriminoSize; x++) {
                if (TETRIMINO[currentTetrimino].rotation[tetriminoRot].shape[i] == 1) {
                    grid[x + tetriminoX][y + tetriminoY] = currentTetrimino;
                    mathGrid[x + tetriminoX][y + tetriminoY] = nextSymbols[mathIdx++];
                    if (y + tetriminoY > 19) lockedOnBelowSkyline = true;
                }
                i++;
            }
        }

        if (lockedOnBelowSkyline) {
            // generate an array containing the y co-ordinate of every
            // completed row
            linesComplete = [];
            for (y = GRID_HEIGHT - 1; y >= 0; y--) {
                let lineComplete = true;
                for (x = 0; x < GRID_WIDTH; x++) {
                    if (grid[x][y] == -1) {
                        lineComplete = false;
                        break;
                    }
                }
                if (lineComplete) linesComplete.push(y);
            }

            if (linesComplete.length > 0) {
                // increase player's score
                lines += linesComplete.length;
                            updateEquation();
                switch (linesComplete.length) {
                    case 1:
                        if (tSpin) {
                            message = 'T-SPIN\NSINGLE!';
                            score += equation * 4 * level;
                        } else {
                            message = '';
                            score += equation * 1  * level;
                            sound3.play();
                        }
                        break;
                    case 2:
                        if (tSpin) {
                            message = 'T-SPIN\NDOUBLE!';
                            score += equation * 5 * level;
                        } else {
                            message = 'DOUBLE!';
                            score += equation * 2 * level;
                            sound7.play();
                        }
                        break
                    case 3:
                        if (tSpin) {
                            message = 'T-SPIN\NTRIPLE!';
                            score += equation * 6 * level;
                        } else {
                            message = 'TRIPLE!';
                            score += equation * 3 * level;
                            sound4.play();
                        }
                        break;
                    case 4:
                        message = 'TETRIS!';
                        score += equation * 4 * level;
                        sound8.play();
                        break;
                }

                messageTTL = FRAME_RATE;
                messageX = (tetriminoX + (TETRIMINO[currentTetrimino].size / 2)) * CELLSIZE + BOARD_X;
                messageY = (tetriminoY + (TETRIMINO[currentTetrimino].size / 2) - INVISIBLE_GRID_HEIGHT) * CELLSIZE + BOARD_Y
                // if at least one completed row, play the row clear animation
                switchState(STATE_LINE_CLEAR_ANIMATION);
            } else {
                if (tSpin) {
                    message = 'T-SPIN!';
                    messageTTL = FRAME_RATE;
                    messageX = (tetriminoX + (TETRIMINO[currentTetrimino].size / 2)) * CELLSIZE + BOARD_X;
                    messageY = (tetriminoY + (TETRIMINO[currentTetrimino].size / 2) - INVISIBLE_GRID_HEIGHT) * CELLSIZE + BOARD_Y
                    score += 400 * level;
                }
                // otherwise try to drop another tetrimino
                if (generateTetrimino()) {
                    timeToDrop = 1;
                    switchState(STATE_FALLING);
                } else {
                    // if it failed, game over!
                    switchState(STATE_GAME_OVER_ANIMATION);
                    sound8.play();
                }
            }
        } else {
            // if tetrimino locked on entirely above the skyline - game over!
            sound2.play();
            switchState(STATE_GAME_OVER_ANIMATION);
        }
    } else if (!clashDetect(currentTetrimino, tetriminoX, tetriminoY + 1, tetriminoRot)) {
        // the player has moved to a position the tetrimino can drop further from,
        // so end lock on mode and continue dropping.
        timeToDrop = dropTime();
        switchState(STATE_FALLING);
    }
}

function  updateEquation() {
    linesComplete.forEach(function (y) {
        var lineText = "";
        for(var x = 0; x < mathGrid.length; x++) {
            lineText += mathGrid[x][y];
        }
        //
        try {
            equation = eval(lineText);
        } catch (err) {
            messageTTL = FRAME_RATE;
            message = 'DUD :(';
            equation = 0;
        }
    });
}

// removes lines players clear, and moves the above line down one
function clearLines() {
    timeToDrop--;
    if (timeToDrop <= 0) {
        if (animationFrame == 10) {
            removeClearedLines();
            generateTetrimino();
            switchState(STATE_FALLING);
        } else {
            linesComplete.forEach(function (y) {
                if (animationFrame % 2 == 0) {
                    grid[4 - animationFrame / 2][y] = -1;
                    grid[5 + animationFrame / 2][y] = -1;
                }
            });
            animationFrame++;
            timeToDrop += ANIMATION_SPEED;
        }
    }
}

// runs when a player trys to place a tetromino fully abobe the skyline
function gameOver() {
    timeToDrop--;
    if (timeToDrop <= 0) {

        if (animationFrame <= 20) {
            // First 20 frames: fill grid with blocks
            for (x = 0; x < 10; x++) {
                grid[x][39 - animationFrame] = 7;
            }
        } else if (animationFrame <= 40) {
            // Last 20 frames: empty grid of blocks
            for (x = 0; x < 10; x++) {
                grid[x][60 - animationFrame] = -1;
            }
        } else {
            switchState(STATE_GAME_OVER_PLAY_AGAIN);
        }
        timeToDrop += FRAME_RATE / 20;
        animationFrame++;
    }
}

function playAgain() {
    timeToDrop--;
    if (timeToDrop <= 0) {
        // flash the "PLAY AGAIN"
        if (animationFrame == 1) {
            timeToDrop = FRAME_RATE;
            animationFrame = 0;
        } else {
            timeToDrop = FRAME_RATE * 25 / 60;
            animationFrame = 1;
        }
    }
}

// draws the grid the game in played on
function drawGrid() {
    for (x = 0; x < GRID_WIDTH; x++) { 
        for (y = 0; y < VISIBLE_GRID_HEIGHT; y++) {
            t = grid[x][y + INVISIBLE_GRID_HEIGHT];
            if (t != -1) {
                image(TETRIMINO[t].image, x * CELLSIZE + BOARD_X, y * CELLSIZE + BOARD_Y, CELLSIZE - 1, CELLSIZE - 1);
                fill(0, 0, 0);
                textSize(8);
                textAlign(LEFT, BOTTOM);
                text(mathGrid[x][y+INVISIBLE_GRID_HEIGHT], x * CELLSIZE + BOARD_X, (y + 1) * CELLSIZE + BOARD_Y);
            }
        }
    }
}

//show the next tetromino coming up
function drawNextTetromino() {
    text('NEXT', 6, BOARD_Y + 8);
    noStroke();
    if (state != STATE_GAME_OVER_ANIMATION && state != STATE_GAME_OVER_PLAY_AGAIN) {
        let nextTetriminoSize = TETRIMINO[nextTetrimino].size;
        let nextTetriminoXpos;
        let nextTetriminoYpos;
        let nextTetriminoRot;

        if (nextTetriminoSize == 3) {
            if (nextTetrimino == 0) {
                nextTetriminoXpos = 0;
            } else {
                nextTetriminoXpos = 5;
            }
            nextTetriminoYpos = 15;
            nextTetriminoRot = 0;
        } else {
            nextTetriminoXpos = -5;
            nextTetriminoYpos = 15;
            nextTetriminoRot = 1;
        }

        let i = 0;
        for (y = 0; y < nextTetriminoSize; y++) {
            for (x = 0; x < nextTetriminoSize; x++) {
                if (TETRIMINO[nextTetrimino].rotation[nextTetriminoRot].shape[i] == 1) {
                    image(
                      TETRIMINO[nextTetrimino].image,
                      nextTetriminoXpos + x * CELLSIZE,
                      nextTetriminoYpos + y * CELLSIZE + BOARD_Y,
                      CELLSIZE - 1,
                      CELLSIZE - 1
                    );
                }
                i++;
            }
        }
    }
}

// show the falling tetromino
function drawFallingTetromino() {
    let ghostOffset = 0;
    while (!clashDetect(currentTetrimino, tetriminoX, tetriminoY + ghostOffset + 1, tetriminoRot)) {
        ghostOffset++;
    }
    let tetriminoSize = TETRIMINO[currentTetrimino].size;
    let currentTetriminoImage = TETRIMINO[currentTetrimino].image;
    let currentTetriminoColor = color(TETRIMINO[currentTetrimino].color[0], TETRIMINO[currentTetrimino].color[1], TETRIMINO[currentTetrimino].color[2])
    if (state == STATE_FALLING || state == STATE_LOCK_ON) {
        let i = 0;
        let mathIdx = 0;
        for (y = 0; y < tetriminoSize; y++) {
            for (x = 0; x < tetriminoSize; x++) {
                if (TETRIMINO[currentTetrimino].rotation[tetriminoRot].shape[i] == 1) {
                    if (tetriminoY + (y) >= VISIBLE_GRID_HEIGHT) { // don't draw any parts above the skyline
                        noStroke();
                        fill(currentTetriminoColor);
                        // replace with image
                        image(
                            currentTetriminoImage,
                            (tetriminoX + x) * CELLSIZE + BOARD_X,
                            (tetriminoY + (y) - INVISIBLE_GRID_HEIGHT) * CELLSIZE + BOARD_Y,
                            CELLSIZE - 1,
                            CELLSIZE - 1
                        );
                        fill(0);
                        textSize(8);
                        textAlign(LEFT, BOTTOM);
                        var val = nextSymbols[mathIdx++];
                        text(val, (tetriminoX + x) * CELLSIZE + BOARD_X, (tetriminoY + y - INVISIBLE_GRID_HEIGHT + 1) * CELLSIZE + BOARD_Y);
                    }

                    if (ghostOffset > 0 && tetriminoY + (y + ghostOffset) >= VISIBLE_GRID_HEIGHT) {
                        stroke(currentTetriminoColor);
                        strokeWeight(1);
                        fill(0);
                        rect((tetriminoX + x) * CELLSIZE + BOARD_X, (tetriminoY + (y + ghostOffset) - INVISIBLE_GRID_HEIGHT) * CELLSIZE + BOARD_Y, CELLSIZE - 2, CELLSIZE - 2);
                    }
                }
                i++;
            }
        }
    }
}

//show the game board
function drawGameBoard() {
    // border colour
    background(75, 75, 75);

    // full screen & centre
    scale(scaleFactor);
    translate(windowWidth / scaleFactor / 2 - PANEL_WIDTH / 2, windowHeight / scaleFactor / 2 - PANEL_HEIGHT / 2);

    // background area
    noStroke();
    fill(75, 75, 75);
    rect(0, 0, PANEL_WIDTH, PANEL_HEIGHT);

    // grid border
    stroke(255);
    strokeWeight(2);
    rect(BOARD_X - 2, BOARD_Y - 2, GRID_WIDTH * CELLSIZE + 3, VISIBLE_GRID_HEIGHT * CELLSIZE + 3);

    // HUD
    noStroke();
    fill(255);
    textSize(8);
    textAlign(LEFT, BOTTOM);
    text('LINES', GRID_WIDTH * CELLSIZE + 4 + BOARD_X, BOARD_Y + 8);
    text(lines, GRID_WIDTH * CELLSIZE + 4 + BOARD_X, BOARD_Y + 18);
    text('LEVEL', GRID_WIDTH * CELLSIZE + 4 + BOARD_X, BOARD_Y + 32);
    text(level, GRID_WIDTH * CELLSIZE + 4 + BOARD_X, BOARD_Y + 42);
    text('SCORE', GRID_WIDTH * CELLSIZE + 4 + BOARD_X, BOARD_Y + 56);
    text(score, GRID_WIDTH * CELLSIZE + 4 + BOARD_X, BOARD_Y + 66);
    image(background1, BOARD_X, BOARD_Y,  GRID_WIDTH * CELLSIZE, VISIBLE_GRID_HEIGHT * CELLSIZE);
}

//a bunch of checks constintly running
function draw() {
    // run the game logic
    switch (state) {
        // the tetrimino is dropping
        case STATE_FALLING:
            fall();
            break;
            // the tetrimino has touched down but not yet locked in place
        case STATE_LOCK_ON:
            stateLock();
            break;
            // clear lines
        case STATE_LINE_CLEAR_ANIMATION:
            clearLines();
            break;
            // game over animation
        case STATE_GAME_OVER_ANIMATION:
            gameOver();
            break;
            sound2.play();
            // prompt to play again
        case STATE_GAME_OVER_PLAY_AGAIN:
            playAgain();
            break;
    }
    drawGameBoard();

    // draw "next" tetrimino
    drawNextTetromino();

    // draw grid
    if (state != STATE_GAME_OVER_PLAY_AGAIN) {
        drawGrid();
    } else {
        fill(255);
        textSize(12);
        text('GAME OVER', PANEL_WIDTH / 2 - 12 * 4.5, BOARD_Y + 40);
        textSize(8);
        if (animationFrame == 0) {
            text('PLAY AGAIN', PANEL_WIDTH / 2 - 40, PANEL_HEIGHT / 2 + 8);
        }
    }

    // draw current falling tetrimino and its "ghost"
    drawFallingTetromino();

    // display the "TRIPLE!", "TETRIS!" etc,
    if (messageTTL > 0) {
        messageTTL--;
        messageY -= 60 / FRAME_RATE; // make it rise up
        stroke(0);
        strokeWeight(2);
        fill(255);
        textSize(12);
        textAlign(CENTER, CENTER);
        text(message, messageX, messageY);
    }
}

// Number of frames between each downward movement of the tetrimino
function dropTime() {
    return FRAME_RATE * pow((0.8 - ((level - 1) * 0.007)), (level - 1));
}

// moves the tetromino down 1 on the grid
function moveDown() {
    if (!clashDetect(currentTetrimino, tetriminoX, tetriminoY + 1, tetriminoRot)) {
        tetriminoY++;
        lastMoveRotation = false;
        if (tetriminoY > lowestTetriminoY) {
            // If the tetrimino is touching down, the player is only allowed 15
            // movements before it locks down automatically, but if the player
            // slides the tetrimino so it can drop further, the counter is reset.
            lowestTetriminoY = tetriminoY;
            lockOnMovements = 0;
        }
    }
}

// change the state the game is in
function switchState(newState) {

    switch (newState) {
        case STATE_FALLING:
            break;
        case STATE_LOCK_ON:
            timeToDrop = FRAME_RATE / 2;
            break;
        case STATE_LINE_CLEAR_ANIMATION:
            animationFrame = 0;
            timeToDrop = 0;
        case STATE_GAME_OVER_ANIMATION:
            animationFrame = 0;
            timeToDrop = 0;
    }

    state = newState;

}

// Removes all the rows in the "linesComplete" array and slides all the blocks
// above down to fill the space.
function removeClearedLines() {
    let yOffs = 0;

    linesComplete.forEach(function (y) {
        for (y2 = y; y2 > 0; y2--) {
            for (x = 0; x < GRID_WIDTH; x++) {
                grid[x][y2 + yOffs] = grid[x][y2 - 1 + yOffs];
                mathGrid[x][y2 + yOffs] = mathGrid[x][y2 - 1 + yOffs];
            }
        }

        // ensure top row remains blank
        for (x = 0; x < GRID_WIDTH; x++) {
            grid[x][0] = -1;
            mathGrid[x][0] = "";
        }

        // loop needs to check the same row again now it contains
        // the row above
        yOffs++;
        level = floor(lines / 10) + 1;
    });
}

function sack_pop() {
    if (sack.length <= 0) sack = shuffle([0, 1, 2, 3, 4, 5, 6]);
    return sack.pop();
}

// show the tetrominos that have landed
function generateTetrimino() {

    tetriminoX = 3;
    tetriminoY = 18;
    lowestTetriminoY = 18;
    lockOnMovements = 0;
    tetriminoRot = 0;
    timeToDrop = 1;

    if (nextTetrimino == -1) {
        currentTetrimino = sack_pop();
    } else {
        currentTetrimino = nextTetrimino;
    }
    nextSymbols = [random(MATH_SYMBOLS), random(MATH_SYMBOLS), random(MATH_SYMBOLS), random(MATH_SYMBOLS),]

    nextTetrimino = sack_pop();

    if (clashDetect(currentTetrimino, tetriminoX, tetriminoY, tetriminoRot)) {
        // if the new tetrimino spawned over existing blocks then the game is over
        return false;
    } else {
        return true;
    }

    lastMoveRotation = false;

}

// Detects whether the specified tetrimino in the given position and
// orientation would clash with blocks already in the grid or the walls of the
// grid.
function clashDetect(tetrimino, tetriminoX, tetriminoY, tetriminoRot) {
    let tetriminoSize = TETRIMINO[tetrimino].size;

    if (tetriminoRot < 0) tetriminoRot += 4;
    let i = 0;
    for (y = 0; y < tetriminoSize; y++) {
        for (x = 0; x < tetriminoSize; x++) {
            if (TETRIMINO[tetrimino].rotation[tetriminoRot].shape[i] == 1) {

                // Check if tetrimino is out of bounds
                if ((y) + tetriminoY >= GRID_HEIGHT) return true;
                if (x + tetriminoX < 0) return true;
                if (x + tetriminoX >= GRID_WIDTH) return true;

                // Check if tetrimino clashes with existing block in grid
                if (grid[x + tetriminoX][(y) + tetriminoY] != -1) return true;

            }
            i++;
        }
    }

    // No clashes detected
    return false;
}

// set the soft drop variable to true
function startSoftDrop() {
    softDrop = true;
}

// set the soft drop variable to false
function endSoftDrop() {
    softDrop = false;
}


// set the hold left variable to true
function startHoldLeft() {
    holdLeft = true;
}

// set the hold left variable to false
function endHoldLeft() {
    holdLeft = false;
}

// set the hold right variable to true
function startHoldRight() {
    holdRight = true;
}

// set the hold right variable to false
function endHoldRight() {
    holdRight = false;
}

//runs commands if certian keys are pressed
function keyPressed() {
    if (keyCode == 49)
        background1 = loadImage('assets/backgrounds/moon1.jpg');
    if (keyCode == 50)
        background1 = loadImage('assets/backgrounds/moon2.jpg');
    if (keyCode == 51)
        background1 = loadImage('assets/backgrounds/moon3.jpg');
    if (keyCode == 52)
        background1 = loadImage('assets/backgrounds/moon4.jpg');
    if (keyCode == 53)
        background1 = loadImage('assets/backgrounds/moon5.jpg');
     if (keyCode == 54)
        background1 = loadImage('assets/backgrounds/moon6.jpg');
    if (keyCode == UP_ARROW || keyCode == 88) rotateClockwise();
    if (keyCode == 17 || keyCode == 90) rotateAnticlockwise();
    if (keyCode == LEFT_ARROW) startHoldLeft();
    if (keyCode == RIGHT_ARROW) startHoldRight();
    if (keyCode == DOWN_ARROW) startSoftDrop();
    if (keyCode == 32) hardDrop();
    if (state == STATE_GAME_OVER_PLAY_AGAIN) resetGame();
    
}
//runs commands if certian keys are released
function keyReleased() {
    if (keyCode == DOWN_ARROW) endSoftDrop();
    if (keyCode == LEFT_ARROW) endHoldLeft();
    if (keyCode == RIGHT_ARROW) endHoldRight();
}

//rotates the tetromino 90 degres clockwise
function rotateClockwise() {
    doRotation(TETRIMINO[currentTetrimino].rotation[tetriminoRot].clockwise_centres, 1);
sound5.play();
}

//rotates the tetromino 90 degres counter clockwise
function rotateAnticlockwise() {
    doRotation(TETRIMINO[currentTetrimino].rotation[tetriminoRot].anticlockwise_centres, 3);
sound5.play();
}

function doRotation(rot, dir) {
    for (i = 0; i < rot.length; i++) {
        if (!clashDetect(currentTetrimino,
                tetriminoX + rot[i].x,
                tetriminoY + rot[i].y,
                (tetriminoRot + dir) % 4)) {
            tetriminoX += rot[i].x;
            tetriminoY += rot[i].y;
            tetriminoRot = (tetriminoRot + dir) % 4;
            lastMoveRotation = true;
            checkLockOnMove();
            break;

        }
    }
}

// places the tetromino where its ghost currently is
function hardDrop() {
    while (!clashDetect(currentTetrimino, tetriminoX, tetriminoY + 1, tetriminoRot)) {
        tetriminoY++;
        lastMoveRotation = false;
        checkLockOnMove();
    }
    state = STATE_LOCK_ON;
    timeToDrop = 0;
    holdLeft = false;
    holdRight = false;
    sound1.play();
}

//moves the tetromino 1 square to to left
function moveLeft() {
    if (!clashDetect(currentTetrimino, tetriminoX - 1, tetriminoY, tetriminoRot)) {
        sound6.play();
        tetriminoX -= 1;
        lastMoveRotation = false;
        if (tetriminoY > lowestTetriminoY) {
            lowestTetriminoY = tetriminoY;
            lockOnMovements = 0;
        }
    }
}

//moves the tetromino 1 square to to left
function moveRight() {
    if (!clashDetect(currentTetrimino, tetriminoX + 1, tetriminoY, tetriminoRot)) {
        sound6.play();
        tetriminoX += 1;
        lastMoveRotation = false;
        if (tetriminoY > lowestTetriminoY) {
            lowestTetriminoY = tetriminoY;
            lockOnMovements = 0;
        }
    }
}

// if certian derections are being held, move the tetromino that way
function checkForHold() {
    if (timeToDrop % 2 == 0) {
        return;
    }
    if (holdLeft == true) {
        moveLeft();
    }
    if (holdRight == true) {
        moveRight();
    }
}

function checkLevel(){
    if (level > 1){
    ;
    }
}

function checkLockOnMove() {
    if (state == STATE_LOCK_ON) {
        lockOnMovements++;
        if (lockOnMovements < 15) {
            timeToDrop = FRAME_RATE / 2;
        } else {
            hardDrop();
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    scaleFactor = min(windowHeight / PANEL_HEIGHT, windowWidth / PANEL_WIDTH) * 1.0;
}