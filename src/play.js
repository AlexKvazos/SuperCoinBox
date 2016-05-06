// We create our only state
var PlayState = {

  create: function() {

    // Initialize player and set physics properties
    this.player = game.add.sprite(game.width/2, game.height/2, 'player');
    this.player.anchor.setTo(0.5);
    game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 1000;
    this.player.animations.add('right', [1, 2], 8, true);
    this.player.animations.add('left', [3, 4], 8, true);

    // Create cursor keys
    this.cursor = game.input.keyboard.createCursorKeys();

    // Initialize coin spanwer
    this.coin = game.add.sprite(60, 140, 'coin');
    game.physics.arcade.enable(this.coin);
    this.coin.anchor.setTo(0.5);

    // Initialize score text
    this.scoreLabel = game.add.text(30, 30, 'Score: 0', {
      font: '20px Geo', fill: '#ffffff', fontWeight: 300
    });
    game.global.score = 0;

    // Initialize enemies
    this.enemies = game.add.group();
    this.enemies.enableBody = true;
    this.enemies.createMultiple(10, 'enemy');
    game.time.events.loop(2200, this.addEnemy, this);

    // Particle emitter
    this.emitter = game.add.emitter(0, 0, 15);
    this.emitter.makeParticles('pixel');
    this.emitter.setYSpeed(-150, 150);
    this.emitter.setXSpeed(-150, 150);
    this.emitter.setScale(2, 0, 2, 0, 800);
    this.emitter.gravity = 0;

    // Initialize sounds
    this.jumpSound = game.add.audio('jump');
    this.coinSound = game.add.audio('coin');
    this.deadSound = game.add.audio('dead');

    // Create world
    this.createWorld();

    if (!game.device.desktop) {
      this.addMobileInputs();
    }
  },

  update: function() {
    game.physics.arcade.collide(this.player, this.layer);
    game.physics.arcade.collide(this.enemies, this.layer);
    game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
    game.physics.arcade.overlap(this.player, this.enemies, this.playerDead, null, this);

    if (!this.player.alive) {
      return;
    }

    this.movePlayer();

    if (!this.player.inWorld) {
      this.playerDead();
    }
  },

  playerDead: function() {
    game.camera.shake(0.02, 300);

    this.player.kill();
    this.deadSound.play();
    this.emitter.x = this.player.x;
    this.emitter.y = this.player.y;
    this.emitter.start(true, 800, null, 15);

    game.time.events.add(1000, this.startMenu, this);
  },

  startMenu: function() {
    game.state.start('menu');
  },

  addEnemy: function() {
    var enemy = this.enemies.getFirstDead();
    if (!enemy) return;

    enemy.anchor.setTo(0.5, 1);
    enemy.reset(game.width/2, 0);
    enemy.body.gravity.y = 500;
    enemy.body.velocity.x = 100 * game.rnd.pick([-1, 1]);
    enemy.body.bounce.x = 1;
    enemy.checkWorldBounds = true;
    enemy.outOfBoundsKill = true;

  },

  takeCoin: function(player, coin) {
    game.global.score += 5;
    this.scoreLabel.text = 'Score: ' + game.global.score;

    this.coinSound.play();
    this.updateCoinPosition();
    this.coin.scale.setTo(0, 0);
    game.add.tween(this.coin.scale).to({ x: 1, y: 1 }, 300).start();

    game.add.tween(this.player.scale).to({ x: 1.3, y: 1.3 }, 100)
    .yoyo(true)
    .start();
  },

  updateCoinPosition: function() {
    // Store all the possible coin positions in an array
    var coinPosition = [
      {x: 140, y: 60}, {x: 360, y: 60}, // Top row
      {x: 60, y: 140}, {x: 440, y: 140}, // Middle row
      {x: 130, y: 300}, {x: 370, y: 300} // Bottom row
    ];

    for (var i = 0; i < coinPosition.length; i++) {
      if (coinPosition[i].x == this.coin.x) {
        coinPosition.splice(i, 1);
      }
    }

    var newPosition = game.rnd.pick(coinPosition);
    this.coin.reset(newPosition.x, newPosition.y);
  },

  movePlayer: function() {
    if (game.input.totalActivePointers == 0) {
      this.moveLeft = false;
      this.moveRight = false;
    }

    if (this.cursor.left.isDown || this.moveLeft) {
      this.player.animations.play('left');
      this.player.body.velocity.x = -200;
    } else if (this.cursor.right.isDown || this.moveRight) {
      this.player.animations.play('right');
      this.player.body.velocity.x = 200;
    } else {
      this.player.animations.stop();
      this.player.frame = 0;
      this.player.body.velocity.x = 0;
    }

    if (this.cursor.up.isDown) {
      this.jumpPlayer();
    }
  },

  createWorld: function() {
    this.map = game.add.tilemap('map');
    this.map.addTilesetImage('tileset');

    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();
    this.map.setCollision(1);
  },

  addMobileInputs: function() {
    var jumpButton = game.add.sprite(350, 240, 'jumpButton');
    jumpButton.inputEnabled = true;
    jumpButton.alpha = 0.5;
    jumpButton.events.onInputDown.add(this.jumpPlayer, this);

    this.moveLeft = false;
    this.moveRight = false;

    var leftButton = game.add.sprite(50, 240, 'leftButton');
    leftButton.inputEnabled = true;
    leftButton.alpha = 0.5;
    leftButton.events.onInputOver.add(this.setLeftTrue, this);
    leftButton.events.onInputOut.add(this.setLeftFalse, this);
    leftButton.events.onInputDown.add(this.setLeftTrue, this);
    leftButton.events.onInputUp.add(this.setLeftFalse, this);

    var rightButton = game.add.sprite(130, 240, 'rightButton');
    rightButton.inputEnabled = true;
    rightButton.alpha = 0.5;
    rightButton.events.onInputOver.add(this.setRightTrue, this);
    rightButton.events.onInputOut.add(this.setRightFalse, this);
    rightButton.events.onInputDown.add(this.setRightTrue, this);
    rightButton.events.onInputUp.add(this.setRightFalse, this);
  },

  setLeftTrue: function() {
    this.moveLeft = true;
  },

  setLeftFalse: function() {
    this.moveLeft = false;
  },

  setRightTrue: function() {
    this.moveRight = true;
  },

  setRightFalse: function() {
    this.moveRight = false;
  },

  jumpPlayer: function() {
    if (this.player.body.onFloor()) {
      this.player.body.velocity.y = -450;
      this.jumpSound.play();
    }
  },

};
