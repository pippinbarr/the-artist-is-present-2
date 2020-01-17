let Preloader = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Preloader() {
    Phaser.Scene.call(this, {
      key: 'preloader'
    });
  },

  preload: function() {
    this.load.multiatlas('atlas', 'assets/atlas/atlas.json', 'assets/atlas');
    this.load.spritesheet('marina', 'assets/spritesheets/marina-dress-spritesheet.png', {
      frameWidth: 14,
      frameHeight: 35,
      endFrame: 25
    });
    this.load.spritesheet('marina-sitting', 'assets/spritesheets/marina-sitting-spritesheet.png', {
      frameWidth: 20,
      frameHeight: 30,
      endFrame: 4
    });
  },

  create: function() {
    this.createSpritesheetAnimation('marina', 'idle-h', 23, 23, 10, 0);
    this.createSpritesheetAnimation('marina', 'walking-h', 1, 8, 10, -1);
    this.createSpritesheetAnimation('marina', 'idle-u', 22, 22, 10, 0);
    this.createSpritesheetAnimation('marina', 'walking-u', 16, 21, 10, -1);
    this.createSpritesheetAnimation('marina', 'idle-d', 15, 15, 10, 0);
    this.createSpritesheetAnimation('marina', 'walking-d', 9, 14, 10, -1);

    this.createSpritesheetAnimation('marina-sitting', 'sitting', 1, 1, 3, -1);
    this.createSpritesheetAnimation('marina-sitting', 'look-down', 1, 4, 3, 0);
    this.createSpritesheetAnimation('marina-sitting', 'look-up', 4, 1, 3, 0);

    this.scene.start(START_SCENE);
  },

  createSpritesheetAnimation: function(parent, name, start, end, framerate, repeat) {
    if (this.anims.get(name) !== undefined) return;

    let frames = this.anims.generateFrameNames(parent, {
      start: start - 1,
      end: end - 1,
    });

    let config = {
      key: name,
      frames: frames,
      frameRate: framerate,
      repeat: repeat,
    };
    this.anims.create(config);
  }
});