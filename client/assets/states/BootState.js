var BootState = {
   init: function(){
           this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
           this.scale.pageAlignHorizontally = true
           this.scale.pageAlignVertically = true
       },
   preload: function(){
       this.load.image('logo', 'images/cover_360_640.png');
       this.load.audio('intro_loop', ['assets/audio/intro_loop_arab.ogg','assets/audio/intro_loop_arab.mp3']);
   },
   create: function(){
       this.state.start('PreloadState');
   }
};