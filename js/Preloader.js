let Preloader = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Preloader () {
    Phaser.Scene.call(this, { key: 'preloader' });
  },

  preload: function () {
    this.load.multiatlas('atlas', 'assets/atlas/atlas.json', 'assets/atlas');
  },

  create: function () {
    this.createAnimation('idle-h','walkcycle',23,23,10,0);
    this.createAnimation('walking-h','walkcycle',1,8,10,-1);
    this.createAnimation('idle-u','walkcycle',22,22,10,0);
    this.createAnimation('walking-u','walkcycle',16,21,10,-1);
    this.createAnimation('idle-d','walkcycle',15,15,10,0);
    this.createAnimation('walking-d','walkcycle',9,14,10,-1);

    this.scene.start('prototyping');
  },

  createAnimation: function (name,path,start,end,framerate,repeat) {
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
  }
});
