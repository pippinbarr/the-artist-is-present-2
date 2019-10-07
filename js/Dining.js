let Dining = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Dining() {
    Phaser.Scene.call(this, {
      key: 'dining'
    });
  },

  create: function() {
    this.cameras.main.setBackgroundColor('#fff');

    this.colliders = this.add.group();

    // BG
    this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'dining/dining-bg.png').setScale(4);
    // Upper and lower wall colliders
    createColliderRect(this, 0 * 4, 56 * 4, 200 * 4, 1 * 4, this.colliders);
    createColliderRect(this, 0 * 4, 99 * 4, 200 * 4, 1 * 4, this.colliders);

    // Right wall/door colliders
    createColliderRect(this, 175 * 4, 71 * 4, 25 * 4, 3 * 4, this.colliders);
    createColliderRect(this, 185 * 4, 87 * 4, 15 * 4, 1, this.colliders);
    createColliderLine(this, 157 * 4, 56 * 4, 16 * 4, 16 * 4, 5, 5, this.colliders);
    createColliderLine(this, 185 * 4, 87 * 4, 16 * 4, 16 * 4, 5, 5, this.colliders);

    // FG
    fg = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'dining/dining-fg.png').setScale(4);
    fg.depth = 87 * 4;

    // Table
    this.table = this.physics.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'dining/dining-table.png').setScale(4);
    this.table.body.setOffset(41, 70);
    this.table.body.setSize(72, 13, false);
    this.table.body.immovable = true;
    this.table.depth = 70 * 4;
    this.colliders.add(this.table);

    // Side chairs
    this.sideChairs = this.physics.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'dining/dining-side-chairs.png').setScale(4);
    this.sideChairs.body.setOffset(33, 74);
    this.sideChairs.body.setSize(89, 6, false);
    this.sideChairs.body.immovable = true;
    this.sideChairs.depth = 74 * 4;
    this.colliders.add(this.sideChairs);

    // Back chairs
    this.backChairs = this.physics.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'dining/dining-back-chairs.png').setScale(4);
    this.backChairs.body.setOffset(56, 65);
    this.backChairs.body.setSize(44, 7, false);
    this.backChairs.body.immovable = true;
    this.backChairs.depth = 65 * 4;
    this.colliders.add(this.backChairs);

    // Front chairs
    this.frontChairs = this.physics.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'dining/dining-front-chairs.png').setScale(4);
    this.frontChairs.body.setOffset(55, 80);
    this.frontChairs.body.setSize(44, 7, false);
    this.frontChairs.body.immovable = true;
    this.frontChairs.depth = 80 * 4;
    this.colliders.add(this.frontChairs);

    // Marina Abramovic
    this.marina = new Marina(this, 280, 320, 'marina');
    this.marina.anims.play('idle-d');
  },

  update: function(time, delta) {
    this.marina.update(time, delta);
    this.physics.collide(this.marina, this.colliders, () => {
      this.marina.stop();
    });
    this.marina.depth = this.marina.body.y;

    this.checkExits();
  },

  checkExits: function() {
    if (this.marina.x < 0) {
      this.scene.start('living');
    }
    else if (this.marina.x > 185 * 4) {
      this.scene.start('exterior');
    }
  },

});