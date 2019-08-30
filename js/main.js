let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  scene: [Boot, Preloader, Prototyping],
  pixelArt: true,
  antialias: false,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
};

let game = new Phaser.Game(config);
