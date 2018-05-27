var snake, snakeBody, winText, snakeTail, food, cursors, pointers, score = 0;
var gameWidth = 720
var gameHeight = 1280
var snakePoop = [];
var gameOver = false;
var velocitySpeed = 400;
var tapSquare = 200;
var tapAction;


function customRestart() {
    snake = {};
    snakeBody = {};
    winText = {};
    snakeTail = {};
    snakePoop = [];
    velocitySpeed = 400;
    tapAction = {};
    food = {};
    cursors = {};
    pointers = {};
    score = 0;
    game.state.restart('GameState');
}

function addTail(context) {
    this.score++

    var spawnOffsetX = 0;
    var spawnOffsetY = 0;

    if (snake.body.velocity.x > 0) {
        spawnOffsetX = -50
    }

    if (snake.body.velocity.x < 0) {
        spawnOffsetX = 50
    }

    if (snake.body.velocity.Y > 0) {
        spawnOffsetY = -50
    }

    if (snake.body.velocity.y < 0) {
        spawnOffsetY = 50
    }

    poop = context.add.sprite(snake.x + spawnOffsetX, snake.y + spawnOffsetY, 'snakePoop');
    poop.scale.setTo(0.1)
    poop.enableBody = true;

    snakePoop.push(poop);
    this.snakeTail = snakePoop[snakePoop.length - 1]
    context.add.tween(this.snakeTail.scale).to({x: 0.1, y: 0.1}, 50, Phaser.Easing.Linear.None, true);
    context.physics.arcade.enable(this.snakeTail);
}

function foodCollisionHandler() {
    var y = GameState.world.randomY;
    var x = GameState.world.randomX;
    if (x < 40) {
        x = 40
    } else if (x > this.gameWidth - 40) {
        x = this.gameWidth - 40
    }

    if (y < 40) {
        y = 40
    } else if (y > this.gameHeight - 40) {
        y = this.gameHeight - 40
    }
    food.reset(x, y);
    this.velocitySpeed = this.velocitySpeed + 50;
    addTail(this);
}


function poopCollisionHandler() {
    stateText.visible = true;
    food.destroy();
    button = game.add.button(game.world.centerX -250, 850, 'play_again', customRestart, this, 2, 1, 0);
}

var GameState = {
    preload: function(){
    },
    create: function () {

        this.physics.startSystem(Phaser.Physics.ARCADE);

        snakeTail = this.make.sprite(-2000, 0, 'snake_tail');
        snakeTail.anchor.setTo(0.5)
        snakeBody = this.make.sprite(-850,  0, 'snake_body');
        snake = this.add.sprite(140, 40, customParams.snake);
        snake.scale.setTo(0.08, 0.08);
        snake.addChild(snakeTail);
        snake.anchor.setTo(0.5);
        snake.enableBody = true;
        food = this.add.sprite(x, y, 'food');
        food.enableBody = true;
        food.scale.setTo(0.06, 0.06);

        stateText = this.add.sprite(this.world.centerX ,this.world.centerY, 'game_over');
        stateText.anchor.setTo(0.5);
        stateText.scale.setTo(0.6, 0.6);
        stateText.visible = false;

        winText = this.add.sprite(this.world.centerX ,this.world.centerY, 'you_win');
        winText.anchor.setTo(0.5);
        winText.scale.setTo(0.6, 0.6);
        winText.visible = false;

        scoreText = this.add.text(this.world.centerX,this.world.centerY,'Score: ' + score, { font: '36px Arial', fill: '#fff' });
        scoreText.x = 0;
        scoreText.y = 0;

        var y = this.world.randomY;
        var x = this.world.randomX;
        if (x < 40) {
            x = 40
        } else if ( x > gameWidth - 40 ){
            x = gameWidth - 40
        }

        if (y < 40) {
            y = 40
        } else if ( y > gameHeight - 40 ){
            y = gameHeight - 40
        }

        this.physics.arcade.sortDirection = Phaser.Physics.Arcade.BOTTOM_TOP;
        this.physics.arcade.enable(snake);
        this.physics.arcade.enable(food);
        this.physics.arcade.enable(snakePoop);

        cursors = this.input.keyboard.createCursorKeys();

        this.input.onTap.add(translateTap, this);

        function translateTap(pointer, doubleTap){
            if (pointer.x < gameWidth/2 && pointer.y > tapSquare && pointer.y < gameHeight - tapSquare ){
                tapAction = "LEFT";
                console.log("We are going left");
            }
            if (pointer.x >= gameWidth/2 && pointer.y > tapSquare && pointer.y < gameHeight - tapSquare){
                tapAction = "RIGHT";
                console.log("We are going right");
            }
            if (pointer.y < gameHeight/2 && pointer.x > tapSquare && pointer.x < gameWidth - tapSquare){
                tapAction = "UP";
                console.log("We are going up");
            }
            if (pointer.y >= gameHeight/2 && pointer.x > tapSquare && pointer.x < gameWidth - tapSquare){
                tapAction = "DOWN";
                console.log("We are going down");
            }
        }


        function snakeOut(snake) {
            if (snake.x > gameWidth) {
                snake.reset(0, snake.y);
                snake.body.velocity.x = velocitySpeed;
            }
            if (snake.x < 0) {
                snake.reset(gameWidth, snake.y);
                snake.body.velocity.x = -velocitySpeed;
            }

            if (snake.y > gameHeight) {
                snake.reset(snake.x, 0);
                snake.body.velocity.y = velocitySpeed;
            }

            if (snake.y < 0) {
                snake.reset(snake.x, gameHeight);
                snake.body.velocity.y = -velocitySpeed;
            }

        }

        snake.checkWorldBounds = true;
        snake.events.onOutOfBounds.add(snakeOut, this);

    },
    update: function () {

        scoreText.text = 'Score: ' + score
        this.physics.arcade.collide(snake, food, foodCollisionHandler, null, this);

        if( score > 5){
            winText.visible = true;
            game.paused = true;
        }

        if (!this.gameOver) {
            if (cursors.left.isDown || tapAction == "LEFT") {
                snake.body.velocity.x = -velocitySpeed;
                snake.body.velocity.y = 0;
                snake.angle = -180
            }
            else if (cursors.right.isDown || tapAction == "RIGHT") {
                snake.body.velocity.x = velocitySpeed;
                snake.body.velocity.y = 0;
                snake.angle = 0
            }
            if (cursors.up.isDown || tapAction == "UP") {
                snake.body.velocity.x = 0;
                snake.body.velocity.y = -velocitySpeed;
                snake.angle = -90
            }
            else if (cursors.down.isDown || tapAction == "DOWN") {
                snake.body.velocity.x = 0;
                snake.body.velocity.y = velocitySpeed;
                snake.anchor.setTo(0.5);
                snake.angle = 90
            }
        }

        for (var i = 0; i < snakePoop.length; i++) {
            this.physics.arcade.collide(snake, snakePoop[i], poopCollisionHandler, null, this)
        }
    }
};