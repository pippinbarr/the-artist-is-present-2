const START_SCENE = 'hallway1';
let lastScene = undefined;
let last = {
  scene: undefined,
  x: undefined,
  y: undefined
}

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  scene: [Boot, Preloader, TAIPScene, Bedroom, Kitchen, Living, Dining, Exterior, Car, MOMAExterior, Tickets, Hallway1, Hallway2, Prototyping],
  pixelArt: true,
  antialias: false,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
};

let game = new Phaser.Game(config);