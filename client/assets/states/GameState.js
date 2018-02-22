var snake, snakeBody, winText, snakeTail, food, cursors, score = 0;
var gameWidth = 360
var gameHeight = 640
var snakePoop = [];
var gameOver = false;
var velocitySpeed = 200;

function addTail(context) {
    this.score++
    console.log("x:" + snake.body.velocity.x);
    console.log("y:" + snake.body.velocity.y);

    var spawnOffsetX = 0;
    var spawnOffsetY = 0;

    if (snake.body.velocity.x > 0) {
        spawnOffsetX = -20
    }

    if (snake.body.velocity.x < 0) {
        spawnOffsetX = 20
    }

    if (snake.body.velocity.Y > 0) {
        spawnOffsetY = -20
    }

    if (snake.body.velocity.y < 0) {
        spawnOffsetY = 20
    }

    scaledPoop = context.add.sprite()

    poop = context.add.sprite(snake.x + spawnOffsetX, snake.y + spawnOffsetY, 'snakePoop');
    poop.enableBody = true;
    poop.scale.setTo(0.03, 0.03);

    snakePoop.push(poop);
    this.snakeTail = snakePoop[snakePoop.length - 1]
    this.snakeTail.scale.x = 0
    this.snakeTail.scale.y = 0
    context.add.tween(this.snakeTail.scale).to({x: 0.03, y: 0.03}, 50, Phaser.Easing.Linear.None, true);
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
}

var GameState = {
    preload: function(){
    },
    create: function () {

        this.physics.startSystem(Phaser.Physics.ARCADE);
        snake = this.add.sprite(140, 40, 'snake');
        snake.scale.setTo(0.03, 0.03);

        snakeBody = this.make.sprite(-850,  0, 'snake_body');

        snakeTail = this.make.sprite(-2000, 0, 'snake_tail');
        snakeTail.anchor.setTo(0.5)

        snake.addChild(snakeTail);
        snake.anchor.setTo(0.5);
        snake.enableBody = true;

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
        food = this.add.sprite(x, y, 'food');
        food.enableBody = true;
        food.scale.setTo(0.03, 0.03);
        this.physics.arcade.sortDirection = Phaser.Physics.Arcade.BOTTOM_TOP;
        this.physics.arcade.enable(snake);
        this.physics.arcade.enable(food);
        this.physics.arcade.enable(snakePoop);
        cursors = this.input.keyboard.createCursorKeys();

        function snakeOut(snake) {
            if (snake.x > 360) {
                snake.reset(0, snake.y);
                snake.body.velocity.x = velocitySpeed;
            }
            if (snake.x < 0) {
                snake.reset(360, snake.y);
                snake.body.velocity.x = -velocitySpeed;
            }

            if (snake.y > 640) {
                snake.reset(snake.x, 0);
                snake.body.velocity.y = velocitySpeed;
            }

            if (snake.y < 0) {
                snake.reset(snake.x, 640);
                snake.body.velocity.y = -velocitySpeed;
            }

        }

        snake.checkWorldBounds = true;
        snake.events.onOutOfBounds.add(snakeOut, this);

        stateText = this.add.sprite(this.world.centerX ,this.world.centerY, 'game_over');
        stateText.anchor.setTo(0.5);
        stateText.scale.setTo(0.3, 0.3);
        stateText.visible = false;

        winText = this.add.sprite(this.world.centerX ,this.world.centerY, 'you_win');
        winText.anchor.setTo(0.5);
        winText.scale.setTo(0.3, 0.3);
        winText.visible = false;

        scoreText = this.add.text(this.world.centerX,this.world.centerY,'Score: ' + score, { font: '22px Arial', fill: '#fff' });
        scoreText.x = 0;
        scoreText.y = 0;
    },
    update: function () {

        scoreText.text = 'Score: ' + score
        this.physics.arcade.collide(snake, food, foodCollisionHandler, null, this);

        if( score > 5){
            winText.visible = true;
            game.paused = true;
        }

        if (!this.gameOver) {
            if (cursors.left.isDown) {
                snake.body.velocity.x = -velocitySpeed;
                snake.body.velocity.y = 0;
                snake.angle = -180
            }
            else if (cursors.right.isDown) {
                snake.body.velocity.x = velocitySpeed;
                snake.body.velocity.y = 0;
                snake.angle = 0
            }
            if (cursors.up.isDown) {
                snake.body.velocity.x = 0;
                snake.body.velocity.y = -velocitySpeed;
                snake.angle = -90
            }
            else if (cursors.down.isDown) {
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