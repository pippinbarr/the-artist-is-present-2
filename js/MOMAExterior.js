class MOMAExterior extends TAIPScene {
  constructor(config) {
    super({
      key: 'moma-exterior'
    });
  }

  create() {
    super.create();

    // BG
    this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'moma-exterior/moma-exterior-bg.png').setScale(4);

    // FG
    this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'moma-exterior/moma-exterior-fg.png').setScale(4).setDepth(10000);

    // Marina Abramovic
    this.marina = new Marina(this, 280, 320, 'marina');
    this.marina.anims.play('idle-d');

    let transitionData = [{
      key: 'tickets',
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