let Preloader = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Preloader () {
    Phaser.Scene.call(this, { key: 'preloader' });
  },

  preload: function () {
    this.load.multiatlas('atlas', 'assets/atlas/atlas.json', 'assets/atlas');
    this.load.spritesheet('marina', 'assets/spritesheets/marina-spritesheet.png', { frameWidth: 14, frameHeight: 35, endFrame: 25 });
  },

  create: function () {
    // this.createAnimation('idle-h','walkcycle/walkcycle',23,23,10,0);
    // this.createAnimation('walking-h','walkcycle/walkcycle',1,8,10,-1);
    // this.createAnimation('idle-u','walkcycle/walkcycle',22,22,10,0);
    // this.createAnimation('walking-u','walkcycle/walkcycle',16,21,10,-1);
    // this.createAnimation('idle-d','walkcycle/walkcycle',15,15,10,0);
    // this.createAnimation('walking-d','walkcycle/walkcycle',9,14,10,-1);

    this.createSpritesheetAnimation('idle-h',23,23,10,0);
    this.createSpritesheetAnimation('walking-h',1,8,10,-1);
    this.createSpritesheetAnimation('idle-u',22,22,10,0);
    this.createSpritesheetAnimation('walking-u',16,21,10,-1);
    this.createSpritesheetAnimation('idle-d',15,15,10,0);
    this.createSpritesheetAnimation('walking-d',9,14,10,-1);


    this.scene.start('prototyping');
  },

  createAtlasAnimation: function (name,path,start,end,framerate,repeat) {
    if (this.anims.get(name) !== undefined) return;

    let frames = this.anims.generateFrameNames('atlas', {
      start: start,
      end: end,
      zeroPad: 2,
      prefix: path + '-',
      suffix: '.png'
    });

    let config = {
      key: name,
      frames: frames,
      frameRate: framerate,
      repeat: repeat,
    };
    this.anims.create(config);
  },

  createSpritesheetAnimation: function (name,start,end,framerate,repeat) {
    if (this.anims.get(name) !== undefined) return;

    let frames = this.anims.generateFrameNames('marina', {
      start: start-1,
      end: end-1,
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
