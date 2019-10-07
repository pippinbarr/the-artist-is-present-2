let Bedroom = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Bedroom() {
    Phaser.Scene.call(this, {
      key: 'bedroom'
    });
  },

  create: function() {
    this.cameras.main.setBackgroundColor('#000');

    this.colliders = this.add.group();

    // Room
    this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'bedroom/bedroom-bg.png').setScale(4);
    // Wall colliders
    createColliderRect(this, 57 * 4, 56 * 4, (140 - 57) * 4, 5, this.colliders);
    createColliderRect(this, 0 * 4, 92 * 4, 200 * 4, 5, this.colliders);
    createColliderRect(this, 151 * 4, 66 * 4, 200 * 4, 5, this.colliders);
    createColliderLine(this, 140 * 4, 56 * 4, 10 * 4, 11 * 4, 5, 5, this.colliders);
    createColliderLine(this, 164 * 4, 82 * 4, 10 * 4, 11 * 4, 5, 5, this.colliders);
    createColliderLine(this, 57 * 4, 57 * 4, 35 * 4, 35 * 4, -5, 5, this.colliders);

    // Bed
    this.bed = this.physics.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'bedroom/bedroom-bed.png').setScale(4);
    // Bed colliders
    createColliderRect(this, 32 * 4, 68 * 4, 69 * 4, 5, this.colliders);
    createColliderRect(this, 31 * 4, 83 * 4, 55 * 4, 5, this.colliders);
    createColliderLine(this, 101 * 4, 69 * 4, 16 * 4, 16 * 4, -5, 5, this.colliders);

    // Bedside table
    this.sideTable = this.physics.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'bedroom/bedroom-side-table.png').setScale(4);
    this.sideTable.body.setOffset(31, 76);
    this.sideTable.body.setSize(17, 13, false);
    this.sideTable.body.immovable = true;
    this.sideTable.depth = 76 * 4;

    // Dresser
    this.dresser = this.physics.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'bedroom/bedroom-dresser.png').setScale(4);
    createColliderRect(this, 122 * 4, 56 * 4, 23 * 4, 5 * 4, this.colliders);
    this.dresser.depth = 31 * 4;

    // Marina Abramovic
    this.marina = new Marina(this, 280, 290, 'marina');
    this.marina.anims.play('idle-d');

    this.cursors = this.input.keyboard.createCursorKeys();

    let bedroomFG = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'bedroom/bedroom-fg.png').setScale(4);
    bedroomFG.depth = bedroomFG.y + bedroomFG.height + 4 * 4;
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
    if (this.marina.x > 164 * 4) {
      this.scene.start('kitchen');
    }
  },

});