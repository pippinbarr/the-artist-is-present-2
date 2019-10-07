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
    createColliderLine(this, 43 * 4, 76 * 4, 22 * 4, 22 * 4, -5, 5, this.colliders);
    createColliderLine(this, 57 * 4, 60 * 4, 4 * 4, 4 * 4, 5, -5, this.colliders);
    createColliderRect(this, 61 * 4, 56 * 4, 122 * 4, 1 * 4, this.colliders);
    createColliderRect(this, 0 * 4, 60 * 4, 58 * 4, 1 * 4, this.colliders);
    createColliderRect(this, 0 * 4, 76 * 4, 44 * 4, 1 * 4, this.colliders);
    createColliderRect(this, 0 * 4, 99 * 4, 200 * 4, 1 * 4, this.colliders);
    // createColliderRect(this, 164 * 4, 56 * 4, 1 * 4, 27 * 4, this.colliders);

    // Kitchen Unit BG
    this.unitBG = this.physics.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'kitchen/kitchen-unit-bg.png').setScale(4);
    this.unitBG.body.setOffset(76, 54);
    this.unitBG.body.setSize(106, 6, false);
    this.unitBG.body.immovable = true;
    this.colliders.add(this.unitBG)

    // Kitchen Unit FG
    this.unitFG = this.physics.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'kitchen/kitchen-unit-fg.png').setScale(4);
    this.unitFG.body.setOffset(76, 76);
    this.unitFG.body.setSize(106, 6, false);
    this.unitFG.body.immovable = true;
    this.unitFG.depth = 76 * 4;
    this.colliders.add(this.unitFG);

    // Marina Abramovic
    this.marina = new Marina(this, 280, 290, 'marina');
    this.marina.anims.play('idle-d');

    this.setupMarks();

    this.marina.inputEnabled = false;

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
    kitchenFG.depth = 72 * 4;
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

    this.rightEnterMark = this.add.sprite(170 * 4, 74 * 4, 'atlas', 'red-pixel.png').setScale(4);
    this.rightEnterMark.depth = 100000;
    this.marks.add(this.rightEnterMark);
    this.rightExitMark = this.add.sprite(200 * 4, 74 * 4, 'atlas', 'red-pixel.png').setScale(4);
    this.rightExitMark.depth = 100000;
    this.marks.add(this.rightExitMark);
    this.rightControlMark = this.add.sprite(179 * 4, 74 * 4, 'atlas', 'red-pixel.png').setScale(4);
    this.rightControlMark.depth = 100000;
    this.marks.add(this.rightControlMark);

    // this.marks.toggleVisible();
  },

});