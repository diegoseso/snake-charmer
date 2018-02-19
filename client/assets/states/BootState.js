var BootState = {
   init: function(){
           this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
           this.scale.pageAlignHorizontally = true
           this.scale.pageAlignVertically = true
       },
   preload: function(){
       this.load.image('logo', 'images/cover_360_640.png');
       this.load.audio('intro_loop', ['assets/audio/intro_loop_arab.ogg','assets/audio/intro_loop_arab.mp3']);
       this.load.image('snake', 'images/head.png');
       this.load.image('snakePoop', 'images/poison.png');
       this.load.image('food', 'images/coin_front.png');
       //this.load.audio('coin', './coin.mp3');
       this.load.audio('cheering', './cheering.mp3');
   },
   create: function(){
       this.state.start('PreloadState');
   }
};