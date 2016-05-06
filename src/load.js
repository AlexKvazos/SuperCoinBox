var LoadState = {

  preload: function() {

    // Progress bar
    var loadingLabel = game.add.text(game.width/2, 150, 'Loading', {
      font: '30px Helvetica', fill: '#ffffff'
    });
    loadingLabel.anchor.setTo(0.5);

    var progressBar = game.add.sprite(game.width/2, 200, 'progressBar');
    progressBar.anchor.setTo(0.5);
    game.load.setPreloadSprite(progressBar);

    // Images
    game.load.spritesheet('player', 'assets/player2.png', 20, 20);
    game.load.image('enemy', 'assets/enemy.png');
    game.load.image('coin', 'assets/coin.png');
    game.load.image('background', 'assets/background.png');
    game.load.image('pixel', 'assets/pixel.png');
    game.load.image('tileset', 'assets/tileset.png');
    game.load.image('jumpButton', 'assets/jumpButton.png');
    game.load.image('rightButton', 'assets/rightButton.png');
    game.load.image('leftButton', 'assets/leftButton.png');

    // Tilemaps
    game.load.tilemap('map', 'assets/map2.json', null, Phaser.Tilemap.TILED_JSON);

    // Sound
    game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
    game.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3']);
    game.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);
  },

  create: function() {
    game.state.start('menu');
  }

}
