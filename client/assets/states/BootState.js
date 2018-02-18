var BootState = {
   init: function(){
           this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
           this.scale.pageAlignHorizontally = true
           this.scale.pageAlignVertically = true
       },
   preload: function(){
       this.load.image('logo', 'images/cover_360_640.png');
   },
   create: function(){
       this.state.start('PreloadState');
   }
};