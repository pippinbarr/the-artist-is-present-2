const START_SCENE = 'hallway3';

let lastScene = undefined;
let last = {
  scene: 'hallway2',
  x: undefined,
  y: undefined
}

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  scene: [Boot, Preloader, TAIPScene, Bedroom, Kitchen, Living, Dining, Exterior, Car, MOMAExterior, Tickets, Hallway1, Hallway2, Hallway3, Atrium],
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