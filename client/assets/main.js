var game = new Phaser.Game(720, 1280, Phaser.AUTO)
var customParams = {
    snakeList:['yellow_head', 'coral_head', 'purple_head'],
    snake:""
};
game.state.add('GameState', GameState);
game.state.add('SelectorState', SelectorState);
game.state.add('HomeState', HomeState);
game.state.add('PreloadState', PreloadState);
game.state.add('BootState', BootState);
game.state.start('BootState');