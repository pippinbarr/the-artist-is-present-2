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
        y: 60 * 4,
        keepY: true
      },
      {
        key: "atrium",
        type: "right",
        x: 199 * 4,
        y: 60 * 4,
        keepY: true
      }
    ];
    this.addTransitions(transitionData);

    this.dancersSensor = this.physics.add.sprite(59 * 4, 52 * 4, 'atlas', 'red-pixel.png').setScale(4 * 4, 4 * 4).setVisible(false);
    this.dancersSensor.text = DANCERS;

    // To store all the whisper triggers
    this.whispers = this.add.group();

    // Add queue
    for (let i = 0; i < QUEUE.length; i++) {
      QUEUE[i].x = QUEUE_X - i * QUEUE_SPACING + this.game.canvas.width;
      QUEUE[i].y = QUEUE_Y;
      this.add.existing(QUEUE[i]);
      this.physics.add.existing(QUEUE[i]);
      if (i === QUEUE.length - 1 || i % 3 === 0 || Math.random() < EXTRA_WHISPER_CHANCE) {
        let trigger = this.physics.add.sprite(QUEUE[i].x, this.game.canvas.height / 2, 'atlas', 'red-pixel.png').setScale(4, this.game.canvas.height);
        trigger.visitor = QUEUE[i];
        // this.whispers.add(trigger);
      }
    }

    this.handleEntrances();
  }

  update(time, delta) {
    super.update();

    this.physics.collide(this.marina, this.colliders, () => {
      this.marina.stop();
    });

    handleSensor(this, this.dancersSensor);

    // Handle whisperers
    this.physics.overlap(this.marina, this.whispers, (marina, whisper) => {
      this.whispers.remove(whisper);
      if (this.marina.y > whisper.visitor.y) {
        whisper.visitor.faceDown();
      }
      else {
        whisper.visitor.faceUp();
      }
      setTimeout(() => {
        this.dialog.showMessage("Fee fi fo fum", () => {
          setTimeout(() => {
            whisper.visitor.faceRight();
          }, 1000);
        });
      }, 250 + Math.random() * 250);
    });

    this.marina.depth = this.marina.body.y;
  }
}