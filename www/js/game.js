// GLOBAL VARIABLES FOR AUDIO

var AUDIO;
var MEDIA;


// FUNCTION THAT CHECKS IF PLAYER HITS THE ENEMY
function checkInteraction(pg, player, enemy) {
    console.log("checkInteraction().player.measureUnit: " + player.measureUnit);
    console.log("checkInteraction().enemy.measureUnit: " + enemy.measureUnit);
    // CHECKS THAT MEASURE UNITS ARE CORRECT
    if(player.measureUnit === "Pixel" && enemy.measureUnit === "Tile") {
        // DEFINE ENEMY'S BORDERLINES
        var minX = (enemy.positionX - 0.5) * pg.tileWidth;
        var minY = (enemy.positionY - 0.5) * pg.tileHeight;
        var maxX = (enemy.positionX + 1) * pg.tileWidth;
        var maxY = (enemy.positionY + 1) * pg.tileHeight;
        // IF PLAYER IS AT SAME POSITION THAN ENEMY
        if(player.positionX > minX && player.positionX < maxX && player.positionY > minY && player.positionY < maxY) {
            return true;
        } else {
            return false;
        }
    // IF MEASURE UNIT'S AREN'T CORRECT, ERROR IS GIVEN AND FUNCTION RETURNS FALSE
    } else {
        alert("Measure unit check failure!");
        return false;
    }
}

// GIVES RANDOM NUMBER WITHIN GIVEN RANGE
function getRandomPlace(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// STOPS MUSIC PLAYING
function stopMusic() {
    AUDIO.stop('music', MEDIA['music']);
}

// INITIALIZING AUDIO
function initSound() {
    if(window.plugins && window.plugins.LowLatencyAudio) {
        AUDIO = window.plugins.LowLatencyAudio;
        AUDIO.preloadFX('hit', MEDIA['hit']);
        AUDIO.preloadFX('wallhit', MEDIA['wallhit']);
        AUDIO.preloadAudio('music', MEDIA['music'], 3, 1);
    // IF PLUGIN ISN'T LOADED GIVES ERROR
    } else {
        alert("Audio initializing error!");
    }
}

// TODO Get object functions to use


// Playground OBJECT CONSTRUCTOR, DEFINES CANVAS AND OTHER PLAYGROUND SETTINGS
function Playground(width, height) {
    this.element = document.getElementById("playground");
    this.ctx = this.element.getContext("2d");
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.element.width = this.screenWidth;
    this.element.height = this.screenHeight;
    this.w = width;
    this.h = height;
    this.tileWidth = this.screenWidth / this.w;
    this.tileHeight = this.screenHeight / this.h;
}
// PLAYGROUND'S FUNCTION PROTOTYPE
Playground.prototype.drawClean = function(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.screenWidth ,this.screenHeight);
};

// Timer OBJECT CONSTRUCTOR
function Timer() {
    this.start = 0;
    this.end = 0;
    this.total = 0;
}
// Timer FUNCTION PROTOTYPES
Timer.prototype.reset = function() {
    this.start = 0;
    this.end = 0;
    this.total = 0;
};
Timer.prototype.startTime = function() {
    this.start = new Date().getTime();
};
Timer.prototype.endTime = function() {
    this.end = new Date().getTime();
};
Timer.prototype.totalTime = function() {
    this.total = this.total + (this.end - this.start);
};

// Creature OBJECT CONSTRUCTOR
function Creature(positionX, positionY, type, measureUnit) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.type = type;
    this.measureUnit = measureUnit;
    this.image = null;
}
// Creature FUNCTION PROTOTYPES
Creature.prototype.draw = function(pg) {
    console.log("Creature.draw() started!");
    if(this.type === "Player") {
        console.log("Creature type is Player");
        console.log("pg.tileWidth: " + pg.tileWidth);
        console.log("pg.tileHeight: " + pg.tileHeight);
        pg.ctx.fillStyle = "red";
        pg.ctx.fillRect(this.positionX, this.positionY, pg.tileWidth / 2, pg.tileHeight / 2);
    } else if(this.type === "Enemy") {
        console.log("Creature type is Enemy");
        pg.ctx.drawImage(this.image, this.positionX * pg.tileWidth, this.positionY * pg.tileHeight, pg.tileWidth, pg.tileHeight);
    } else {
        alert("Creature drawing error!");
    }
};
Creature.prototype.drawClean = function(pg) {
    if(this.type === "Enemy") {
        pg.ctx.fillRect(this.positionX * pg.tileWidth, this.positionY * pg.tileHeight, pg.tileWidth, pg.tileHeight);
    } else {
        alert("Object clearing error!");
    }
};

// GAME LOADER, STARTS AFTER WHOLE GAMEPAGE IS LOADED
function loader() {
    // LOCK SCREEN ORIENTATION TO PORTRAIT
    window.plugins.orientationLock.lock("portrait");
    // INITIALIZE AUDIO PLUGIN AND SET MEDIA FILES
    hotjs.Audio.init();
    // MEDIA.onload = function () {initSound()};
    MEDIA = {
        'hit': 'sound/hit.mp3',
        'wallhit': 'sound/wallhit.mp3',
        // TODO Test if original music.mp3 is working
        'music': 'sound/musictwo.mp3'
    };
    initSound();
    // START PLAYING MUSIC
    AUDIO.loop('music');
    // DEFINE LOCAL OBJECTS AND VARIABLES
    var pg = new Playground (4,8);
    var player = new Creature (pg.screenWidth / 2, pg.screenHeight / 2, "Player", "Pixel");
    var enemy = new Creature (getRandomPlace(0, pg.w), getRandomPlace(0, pg.h), "Enemy", "Tile");
    var timer = new Timer();
    var points = 0;
    var loopNumber = 0;
    var watch;

    console.log("player.positionX: " + player.positionX);
    console.log("player.positionY: " + player.positionY);
    console.log("enemy.positionX: " + enemy.positionX);
    console.log("enemy.positionY: " + enemy.positionY);
    // DRAW BLACK BACKGROUND, PLAYER AND ENEMY
    pg.drawClean("Black");
    player.draw(pg);
    enemy.image = new Image();
    enemy.image.onload = function() {enemy.draw(pg)};
    enemy.image.src = "img/Enemy.jpg";
    //enemy.draw(pg);
    console.log("enemy.image.src: "+ enemy.image.src);

    // INITIALIZE ACCELEROMETER'S ACCELERATION WATCHING, WATCH FREQUENCY 25 MS
    watch = navigator.accelerometer.watchAcceleration(success, failure, {frequency: 25});


    // IF ACCELEROMETER MEASUREMENT IS SUCCESSFUL
    function success(acceleration) {

        //TODO REMOVE! RESET TIMER
        //timer.reset();
        if(loopNumber < 20) {
            // TAKE CURRENT TIME
            timer.startTime();
            // DRAW EMPTY BLACK BLACKGROUND
            pg.drawClean("Black");
            // DRAW ENEMY
            enemy.draw(pg);
            // TODO Move player.positionX and positionY inside if statement
            // GIVE NEW COORDINATES TO player ACCORDING TO ACCELEROMETER RATE
            player.positionX += -1 * (acceleration.x * 1.5);
            player.positionY += (acceleration.y * 1.5);
            // TODO Borders right!
            if (player.positionX < (pg.screenWidth - (pg.tileWidth / 2)) && player.positionX > 0 && player.positionY < (pg.screenHeight - (pg.tileHeight / 2)) && player.positionY > 0) {
                // IF player IS WITHIN CANVAS/GAME AREA, DRAW player TO THE NEW POSITION
                player.draw(pg);
            } else {
                // IF player ISNT WITHIN CANVAS/GAME AREA
                // PLAY SOUND EFFECT
                AUDIO.play('wallhit');
                // STOP MUSIC
                stopMusic();
                // REMOVE EVENT LISTENER FOR deviceready
                document.removeEventListener("deviceready", loader, false);
                // MOVE TO THE wallhit.html -PAGE
                window.location.href = "wallhit.html";
            }
            // IF PLAYER IS WITHIN ENEMY AREA
            if (checkInteraction(pg, player, enemy) === true) {
                // VIBRATE PHONE FOR 100 MS
                navigator.vibrate(100);
                // PLAY SOUND EFFECT
                AUDIO.play('hit');
                // ADD points BY 1
                points++;
                // MOVE ENEMY TO RANDOM PLACE
                enemy.positionX = getRandomPlace(0, pg.w);
                enemy.positionY = getRandomPlace(0, pg.h);
                // ADD loopNumber BY 1
                loopNumber++;
                // RESET timer.total
                timer.total = 0;
            // IF timer.total IS OVER 400
            } else if (timer.total > 400) {
                // MOVE ENEMY TO A RANDOM PLACE
                enemy.positionX = getRandomPlace(0, pg.w);
                enemy.positionY = getRandomPlace(0, pg.h);
                // ADD loopNumber BY 1
                loopNumber++;
                // RESET TIMERS
                timer.reset();
            } else {
                // GET CURRENT TIME

                timer.endTime();
                console.log("timer.end:" + timer.end);
                // COUNT TOTAL TIME
                // TODO: Config Timer shorter
                timer.totalTime();
                console.log("timer.total:" + timer.total);
            }
        } else {
            // IF
            stopMusic();
            sessionStorage.setItem("totalScore", points);
            document.removeEventListener("deviceready", loader, false);
            window.location.href = "points.html";
            timer.reset();
            loopNumber = 0;
        }
    }
    function failure() {
        alert("Acceleration reading error!");
    }

}

// loader();
document.addEventListener("deviceready", loader, false);

