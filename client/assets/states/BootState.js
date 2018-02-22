var BootState = {
   init: function(){
           this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
           this.scale.maxHeight = 640;
           this.scale.maxWidth = 360;
           this.scale.pageAlignHorizontally = true;
           this.scale.pageAlignVertically = true;
       },
   preload: function(){
       this.load.image('logo_no_background', 'images/cover_no_background.png');
       this.load.image('logo', 'images/cover_360_640.png');
       this.load.audio('intro_loop', ['assets/audio/intro_loop_arab.ogg','assets/audio/intro_loop_arab.mp3']);
       this.load.image('snake', 'images/head.png');
       this.load.image('snake_body', 'images/snake_body.png');
       this.load.image('snake_tail', 'images/snake_tail.png');
       this.load.image('snakePoop', 'images/poison.png');
       this.load.image('food', 'images/coin_front.png');
       this.load.image('game_over', 'images/game_over.png');
       this.load.image('you_win', 'images/you_win.png');
   },
   create: function(){
       this.state.start('PreloadState');
   }
};