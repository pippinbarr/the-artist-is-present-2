let Car = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Car() {
    Phaser.Scene.call(this, {
      key: 'car'
    });
  },

  create: function() {
    this.cameras.main.setBackgroundColor('#fff');

    this.SCROLL_SPEED = 4;

    // Buildings
    this.buildings = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2 - 13 * 4, 'atlas', 'car/car-buildings.png').setScale(4 * 4);
    this.buildings2 = this.add.sprite(this.buildings.x + this.buildings.width * 4 * 4, this.buildings.y, 'atlas', 'car/car-buildings.png').setScale(4 * 4);

    // Car BG
    this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'car/car-bg.png').setScale(5 * 4);

    // Marina
    this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'car/car-marina.png').setScale(5 * 4);

    // Driver
    this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'car/car-driver.png').setScale(5 * 4);
  },

  update: function(time, delta) {
    this.buildings.x -= this.SCROLL_SPEED;
    this.buildings2.x -= this.SCROLL_SPEED;

    if (this.buildings.x + this.buildings.width * 4 * 4 / 2 < 0) {
      this.buildings.x = this.buildings2.x + this.buildings2.width * 4 * 4;
    }
    if (this.buildings2.x + this.buildings2.width * 4 * 4 / 2 < 0) {
      this.buildings2.x = this.buildings.x + this.buildings.width * 4 * 4;
    }
  },
});