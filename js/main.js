const START_SCENE = 'atrium';
let QUEUE = [];
const QUEUE_LENGTH = 15;
const QUEUE_X = 440;
const QUEUE_Y = 182;
const QUEUE_SPACING = 56;

let lastScene = undefined;
let last = {
  scene: 'hallway3',
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