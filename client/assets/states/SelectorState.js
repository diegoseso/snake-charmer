var SelectorState = {
    preload: function(){
    },
    create: function () {
        this.snakes = this.game.add.group();
        var self = this;

        customParams.snakeList.forEach(function(element){
            self.snakes.create(-1000, self.game.world.centerY+1100 , element);
        });
        self.snakes.scale.setTo(0.3, 0.3);

        this.leftArrow = this.game.add.sprite(100, this.game.world.centerY, 'arrow');
        this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.scale.x = -1;
        this.leftArrow.customParams = {direction: -1};

        //left arrow user input
        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.pixelPerfectClick = true;
        this.leftArrow.events.onInputDown.add(this.switchSnake, this);

        //right arrow
        this.rightArrow = this.game.add.sprite(620, this.game.world.centerY, 'arrow');
        this.rightArrow.anchor.setTo(0.5);
        this.rightArrow.customParams = {direction: 1};

        //right arrow user input
        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.pixelPerfectClick = true;
        this.rightArrow.events.onInputDown.add(this.switchSnake, this);


        this.currentSnake = this.snakes.next();

        console.log(this.currentSnake);
        this.currentSnake.position.set(this.game.world.centerX+400, this.game.world.centerY+1100);
    },
    update: function() {
    },
    switchSnake: function(sprite, event) {
        console.log('move snake');

        //if an animation is taking place don't do anything
        if(this.isMoving) {
            return false;
        }

        this.isMoving = true;

        var newSnake, endX;
        //according to the arrow they pressed, which animal comes in
        if(sprite.customParams.direction > 0) {
            newSnake = this.snakes.next();
            newSnake.x = -newSnake.width/2;
            endX = 2300 + this.currentSnake.width/2;
        }
        else {
            newSnake = this.snakes.previous();
            newSnake.x = 2000 + newSnake.width/2;
            endX = -this.currentSnake.width/2;
        }

        newSnake.inputEnabled = true;
        newSnake.events.onInputDown.add(function(){
            console.log("Selecting snake");
            customParams.snake = newSnake.key;
            console.log(newSnake.key)
            this.state.start('GameState');
        }, this);

        //tween animations, moving on x
        var newAnimalMovement = this.game.add.tween(newSnake);
        newAnimalMovement.to({ x: this.game.world.centerX + 360 }, 2000);
        newAnimalMovement.onComplete.add(function(){this.isMoving = false;}, this);
        newAnimalMovement.start();

        var currentAnimalMovement = this.game.add.tween(this.currentSnake);
        currentAnimalMovement.to({ x: endX }, 2000);
        currentAnimalMovement.start();

        this.currentSnake = newSnake;
    }
};