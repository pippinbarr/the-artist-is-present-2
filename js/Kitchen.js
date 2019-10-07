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

    this.checkExits();
  },

  checkExits: function() {
    if (this.marina.x < 43 * 4) {
      this.scene.start('bedroom');
    }
    else if (this.marina.x > 182 * 4) {
      this.scene.start('living');
    }
  },

});