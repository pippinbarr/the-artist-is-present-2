<<<<<<< HEAD
const START_SCENE = 'bedroom';
=======
const START_SCENE = 'car';
>>>>>>> e910d495e5d545fb59d188dccc7e11e4cfe5d5f8

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