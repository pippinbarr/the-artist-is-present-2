class Atrium extends TAIPScene {
  constructor(config) {
    super({
      key: "atrium"
    });
  }

  create() {
    super.create();

    // Atrium BG
    this.add
      .sprite(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2,
        "atlas",
        "atrium/atrium-bg.png"
      )
      .setScale(4);

    // Table and chairs
    this.tableAndChairs = this.physics.add.sprite(130 * 4 + 30 * 4, 40 * 4 + 15 * 4, 'atlas', 'atrium/atrium-table-and-chairs.png').setScale(4);
    this.tableAndChairs.body.setOffset(2, this.tableAndChairs.body.height - 10);
    this.tableAndChairs.body.setSize(this.tableAndChairs.width - 4, 6, false);
    this.tableAndChairs.body.immovable = true;
    this.tableAndChairs.setDepth(240);
    this.colliders.add(this.tableAndChairs);

    this.marinaChairSensor = this.physics.add.sprite(730, 250, 'atlas', 'red-pixel.png').setScale(50, 60);
    this.marinaChairSensor.visible = false;

    // Back wall left
    createColliderRect(this, 0, 0, 312, 202, this.colliders);
    // Back wall right
    createColliderRect(this, 312, 0, 490, 60, this.colliders);
    // Bottom wall
    createColliderRect(this, 0, 392, 800, 8, this.colliders);
    // Right wall
    createColliderRect(this, 799, 0, 2, 400, this.colliders);

    // Add queue
    this.queue = this.add.group();
    for (let i = 0; i < QUEUE.length; i++) {
      QUEUE[i].x = QUEUE_X - i * QUEUE_SPACING;
      QUEUE[i].y = QUEUE_Y;
      QUEUE[i].scene = this;
      // this.add.existing(QUEUE[i]);
      this.physics.add.existing(QUEUE[i]);
      this.queue.add(QUEUE[i], true);
    }

    // Add guards
    this.guards = this.add.group();
    this.guard1 = new Guard(this, 115 * 4, 39 * 4 + 2);
    this.guard2 = new Guard(this, 118 * 4, 50 * 4 + 2);
    this.guards.add(this.guard1, true);
    this.guards.add(this.guard2, true);

    const transitionData = [{
      key: "hallway3",
      type: "left",
      x: 10 * 4,
      y: 60 * 4
    }, ];
    this.addTransitions(transitionData);

    this.handleEntrances();

    this.input.keyboard.on('keyup', (e) => {
      this.handleGazeInput(e)
    });
  }

  update(time, delta) {
    super.update();

    this.marina.update(time, delta);
    this.physics.collide(this.marina, this.colliders, () => {
      this.marina.stop();
    });
    if (!this.marina.sitting) {
      this.physics.overlap(this.marina, this.marinaChairSensor, () => {
        this.marina.sit();
        this.marina.x = 696;
        this.marina.y = 212;
      });
    }
    this.marina.depth = this.marina.body.y;
    this.queue.getChildren().forEach((visitor) => {
      visitor.depth = visitor.body.y;
    });
    this.guards.getChildren().forEach((guard) => {
      guard.depth = guard.body.y;
    });
  }

  handleGazeInput(e) {
    if (!this.marina.sitting) return;

    if (this.marina.lookingUp) {
      this.marina.lookDown();
    }
    else if (!this.marina.lookingUp) {
      this.marina.lookUp();
    }
  }
}