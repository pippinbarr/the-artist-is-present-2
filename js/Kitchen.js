let Kitchen = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Kitchen() {
    Phaser.Scene.call(this, {
      key: 'kitchen'
    });
  },

  create: function() {
    this.cameras.main.setBackgroundColor('#fff');

    this.colliders = this.add.group();

    // Room
    this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'kitchen/kitchen-bg.png').setScale(4);
    // Wall colliders
    createColliderRect(this, 0 * 4, 92 * 4, 200 * 4, 1 * 4, this.colliders);
    createColliderRect(this, 0 * 4, 63 * 4, 200 * 4, 1 * 4, this.colliders);

    // Kitchen Unit BG
    this.unitBG = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'kitchen/kitchen-unit-bg.png').setScale(4);

    // Kitchen Unit FG
    let unitFG = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'kitchen/kitchen-unit-fg.png').setScale(4);
    unitFG.depth = 100000;

    let doors = this.physics.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'kitchen/kitchen-doors.png').setScale(4);
    doors.depth = 100000;

    // Marina Abramovic
    this.marina = new Marina(this, 280, 250, 'marina');
    this.marina.anims.play('idle-d');

    this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'kitchen/kitchen-fg.png').setScale(4);

    this.setupMarks();

    // this.marina.inputEnabled = false;

    if (last.scene === 'bedroom') {
      this.marina.x = this.leftExitMark.x;
      this.marina.y = this.leftExitMark.y - this.marina.height * 4 / 2;
      this.marina.right();
      let marinaTweenIn = this.tweens.add({
        targets: this.marina,
        x: this.leftEnterMark.x,
        duration: (this.leftEnterMark.x - this.leftExitMark.x) / this.marina.speed * 1000,
        repeat: 0,
        onComplete: () => {
          this.marina.inputEnabled = true;
          this.marina.stop();
        },
      });
    }
    else if (last.scene === 'living') {
      this.marina.x = this.rightExitMark.x;
      this.marina.y = this.rightExitMark.y - this.marina.height * 4 / 2;
      this.marina.left();
      let marinaTweenIn = this.tweens.add({
        targets: this.marina,
        x: this.rightEnterMark.x,
        duration: Math.abs(this.rightEnterMark.x - this.rightExitMark.x) / this.marina.speed * 1000,
        repeat: 0,
        onComplete: () => {
          this.marina.inputEnabled = true;
          this.marina.stop();
        },
      });
    }

    // this.colliders.toggleVisible();

    this.cursors = this.input.keyboard.createCursorKeys();

    let kitchenFG = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'kitchen/kitchen-fg.png').setScale(4);
    kitchenFG.depth = 10000;
  },

  update: function(time, delta) {
    this.marina.update(time, delta);
    this.physics.collide(this.marina, this.colliders, () => {
      this.marina.stop();
    });
    this.marina.depth = this.marina.body.y;

    this.checkEntrances();
    this.checkExits();
  },

  checkEntrances: function() {

  },

  checkExits: function() {
    if (this.marina.x < this.leftControlMark.x) {
      this.marina.inputEnabled = false;
    }
    else if (this.marina.x > this.rightControlMark.x) {
      this.marina.inputEnabled = false;
    }

    if (this.marina.x < this.leftExitMark.x) {
      last.scene = 'kitchen';
      last.x = this.marina.x;
      last.y = this.marina.y;
      this.scene.start('bedroom');
    }
    else if (this.marina.x > this.rightExitMark.x) {
      last.scene = 'kitchen';
      last.x = this.marina.x;
      last.y = this.marina.y;
      this.scene.start('living');
    }
  },

  setupMarks: function() {
    this.marks = this.add.group();
    this.leftEnterMark = this.add.sprite(57 * 4, 74 * 4, 'atlas', 'red-pixel.png').setScale(4);
    this.leftEnterMark.depth = 100000;
    this.marks.add(this.leftEnterMark);
    this.leftExitMark = this.add.sprite(32 * 4, 74 * 4, 'atlas', 'red-pixel.png').setScale(4);
    this.leftExitMark.depth = 100000;
    this.marks.add(this.leftExitMark);
    this.leftControlMark = this.add.sprite(46 * 4, 74 * 4, 'atlas', 'red-pixel.png').setScale(4);
    this.leftControlMark.depth = 100000;
    this.marks.add(this.leftControlMark);

    this.rightEnterMark = this.add.sprite(140 * 4, 74 * 4, 'atlas', 'red-pixel.png').setScale(4);
    this.rightEnterMark.depth = 100000;
    this.marks.add(this.rightEnterMark);
    this.rightExitMark = this.add.sprite(160 * 4, 74 * 4, 'atlas', 'red-pixel.png').setScale(4);
    this.rightExitMark.depth = 100000;
    this.marks.add(this.rightExitMark);
    this.rightControlMark = this.add.sprite(150 * 4, 74 * 4, 'atlas', 'red-pixel.png').setScale(4);
    this.rightControlMark.depth = 100000;
    this.marks.add(this.rightControlMark);

    // this.marks.toggleVisible();
  },

});