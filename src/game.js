var game = new Phaser.Game(500, 340, Phaser.AUTO, 'game');

game.global = {
  score: 0
};

game.state.add('boot', BootState);
game.state.add('load', LoadState);
game.state.add('menu', MenuState);
game.state.add('play', PlayState);

game.state.start('boot');
