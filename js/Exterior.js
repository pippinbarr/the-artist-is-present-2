class Exterior extends TAIPScene {
  constructor(config) {
    super({
      key: 'exterior'
    });
  }

  create() {
    super.create();

    // BG
    this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'exterior/exterior-bg.png').setScale(4);

    // FG
    let fg = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'exterior/exterior-fg.png').setScale(4);
    fg.depth = 50 * 4;

    // Main wall colliders
    createColliderRect(this, 0 * 4, 66 * 4, 28 * 4, 1 * 4, this.colliders);
    createColliderRect(this, 61 * 4, 66 * 4, 140 * 4, 1 * 4, this.colliders);
    createColliderRect(this, 29 * 4, 0 * 4, 4 * 4, 59 * 4, this.colliders);
    createColliderRect(this, 56 * 4, 0 * 4, 4 * 4, 59 * 4, this.colliders);
    createColliderRect(this, 28 * 4, 59 * 4, 1 * 4, 4 * 4, this.colliders);
    createColliderRect(this, 60 * 4, 59 * 4, 1 * 4, 4 * 4, this.colliders);

    // Box thing
    this.boxThing = this.physics.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'exterior/exterior-box.png').setScale(4);
    this.boxThing.body.setOffset(70, 43);
    this.boxThing.body.setSize(19, 28, false);
    this.boxThing.body.immovable = true;
    this.colliders.add(this.boxThing);

    // Hydrant
    this.hydrant = this.physics.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'exterior/exterior-hydrant.png').setScale(4);
    this.hydrant.body.setOffset(8, 81);
    this.hydrant.body.setSize(9, 4, false);
    this.hydrant.body.immovable = true;
    this.hydrant.depth = 81 * 4;
    this.colliders.add(this.hydrant);

    // Cone
    this.cone = this.physics.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'exterior/exterior-cone.png').setScale(4);
    this.cone.body.setOffset(157, 80);
    this.cone.body.setSize(9, 3, false);
    this.cone.body.immovable = true;
    this.cone.depth = 80 * 4;
    this.colliders.add(this.cone);

    // Marina Abramovic
    this.marina = new Marina(this, 280, 320, 'marina');
    this.marina.anims.play('idle-d');

    let transitionData = [{
      key: 'dining',
      type: 'up',
      x: 46 * 4,
      y: 20 * 4,
    }];
    this.addTransitions(transitionData);

    this.handleEntrances();

  }

  update(time, delta) {
    super.update(time, delta);

    this.marina.update(time, delta);
    this.physics.collide(this.marina, this.colliders, () => {
      this.marina.stop();
    });
    this.marina.depth = this.marina.body.y;
  }
}