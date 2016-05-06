
var BootState = {

  preload: function() {
    game.load.image('progressBar', 'assets/progressBar.png');
  },

  create: function() {
    game.stage.backgroundColor = '#3498db';
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    Phaser.Canvas.setImageRenderingCrisp(game.canvas);
    game.renderer.renderSession.roundPixels = true;

    game.state.start('load');
  }

};
