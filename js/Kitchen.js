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
    // createColliderRect(this, 57 * 4, 56 * 4, (140 - 57) * 4, 5, this.colliders);
    // createColliderRect(this, 0 * 4, 92 * 4, 200 * 4, 5, this.colliders);
    // createColliderRect(this, 151 * 4, 66 * 4, 200 * 4, 5, this.colliders);
    // createColliderLine(this, 140 * 4, 56 * 4, 10 * 4, 11 * 4, 5, 5, this.colliders);
    // createColliderLine(this, 164 * 4, 82 * 4, 10 * 4, 11 * 4, 5, 5, this.colliders);
    // createColliderLine(this, 57 * 4, 57 * 4, 35 * 4, 35 * 4, -5, 5, this.colliders);

    // Kitchen Island
    this.kitchenIslandBG = this.physics.add.sprite(129 * 4, 36 * 4, 'atlas', 'kitchen/kitchen-island-bg.png').setScale(4);
    this.kitchenIslandBG.body.setOffset(0, this.kitchenIslandBG.body.height - 16);
    this.kitchenIslandBG.body.setSize(this.kitchenIslandBG.width, 16, false);
    this.kitchenIslandBG.body.immovable = true;

    this.kitchenIslandFG = this.physics.add.sprite(this.game.canvas.width / 2, 41 * 4, 'atlas', 'kitchen/kitchen-island-fg.png').setScale(4);
    this.kitchenIslandFG.body.setOffset(0, this.kitchenIslandFG.body.height - 16);
    this.kitchenIslandFG.body.setSize(this.kitchenIslandFG.width, 16, false);
    this.kitchenIslandFG.body.immovable = true;

    // Bed colliders
    // createColliderRect(this, 32 * 4, 68 * 4, 70 * 4, 5, this.colliders);
    // createColliderRect(this, 31 * 4, 83 * 4, 57 * 4, 5, this.colliders);
    // createColliderLine(this, 102 * 4, 69 * 4, 16 * 4, 16 * 4, -5, 5, this.colliders);

    // Marina Abramovic
    this.marina = new Marina(this, 280, 290, 'marina');
    this.marina.anims.play('idle-d');

    this.colliders.toggleVisible();

    this.cursors = this.input.keyboard.createCursorKeys();

    let kitchenFG = this.physics.add.sprite(35 * 4, 48 * 4, 'atlas', 'kitchen/kitchen-fg.png').setScale(4);
    kitchenFG.depth = kitchenFG.y + kitchenFG.height + 10 * 4;

    this.depthGroup = this.add.group();
    this.depthGroup.add(this.marina);
    this.depthGroup.add(this.kitchenIslandBG);
    this.depthGroup.add(this.kitchenIslandFG);
    this.depthGroup.add(kitchenFG);
  },

  update: function(time, delta) {
    this.marina.update(time, delta);
    this.physics.collide(this.marina, this.colliders, () => {
      this.marina.stop();
    });
    this.marina.depth = this.marina.body.y;
    this.kitchenIslandBG.depth = this.kitchenIslandBG.body.y;
    this.kitchenIslandFG.depth = this.kitchenIslandFG.body.y;
  },

});