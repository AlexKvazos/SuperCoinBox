
var MenuState = {

  create: function() {
    game.add.image(0, 0, 'background');
    localStorage.bestScore = localStorage.bestScore || 0;

    // Game name label
    var nameLabel = game.add.text(game.width/2, -50, 'Super Coin Box', {
      font: '60px Geo', fill: '#ffffff'
    });
    nameLabel.anchor.setTo(0.5);

    game.add.tween(nameLabel)
      .to({y: 80}, 1000)
      .easing(Phaser.Easing.Bounce.Out)
      .start();

    // Score label
    var scoreLabel = game.add.text(game.width/2, game.height/2, 'Score: ' + game.global.score + '\nBest Score: ' + localStorage.bestScore, {
      font: '30px Geo', fill: '#ffffff', align: 'center'
    });
    scoreLabel.anchor.setTo(0.5);

    // Start game label
    var text;
    if (game.device.desktop) {
      text = 'Press the UP arrow key to start';
    } else {
      text = 'Touch the screen to start';
    }
    var startLabel = game.add.text(game.width/2, game.height-80, text, {
      font: '30px Geo', fill: '#ffffff'
    });
    startLabel.anchor.setTo(0.5);
    var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(this.start, this);

    game.add.tween(startLabel)
      .to({ angle: -2}, 500)
      .to({ angle: 2 }, 1000)
      .to({ angle: 0 }, 500)
      .loop()
      .start();

    // Disclaimer
    var disclaimer = game.add.text(game.width/2, game.height-3,
      'Developed by Alex Cavazos', {
        font: '18px Geo', fill: '#ffffff'
      });
    disclaimer.anchor.setTo(0.5, 1);

    if (!game.device.desktop) {
      game.input.onDown.add(this.start, this);
    }
  },

  start: function() {
    game.state.start('play');
  }

};
