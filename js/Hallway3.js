class Hallway3 extends TAIPScene {
  constructor(config) {
    super({
      key: "hallway3"
    });
  }

  create() {
    super.create();

    // Ticket area BG
    this.add
      .sprite(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2,
        "atlas",
        "hallways/hallway3-bg.png"
      )
      .setScale(4);

    // Back wall
    createColliderRect(this, 0, 200, 800, 5, this.colliders);
    // Bottom wall
    createColliderRect(this, 0, 392, 800, 8, this.colliders);

    const transitionData = [{
        key: "hallway2",
        type: "left",
        x: 1 * 4,
        y: 60 * 4
      },
      {
        key: "atrium",
        type: "right",
        x: 199 * 4,
        y: 60 * 4
      }
    ];
    this.addTransitions(transitionData);

    this.dancersSensor = this.physics.add.sprite(59 * 4, 52 * 4, 'atlas', 'red-pixel.png').setScale(4 * 4, 4 * 4).setVisible(false);
    this.dancersSensor.text = DANCERS;

    // Add queue
    for (let i = 0; i < QUEUE.length; i++) {
      QUEUE[i].x = QUEUE_X - i * QUEUE_SPACING + this.game.canvas.width;
      QUEUE[i].y = QUEUE_Y;
      this.add.existing(QUEUE[i]);
      this.physics.add.existing(QUEUE[i]);
    }

    this.handleEntrances();
  }

  update(time, delta) {
    super.update();

    this.marina.update(time, delta);
    this.physics.collide(this.marina, this.colliders, () => {
      this.marina.stop();
    });
    handleSensor(this, this.dancersSensor);

    this.marina.depth = this.marina.body.y;
  }
}