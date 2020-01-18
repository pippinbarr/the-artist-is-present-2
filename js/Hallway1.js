class Hallway1 extends TAIPScene {
  constructor(config) {
    super({
      key: "hallway1"
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
        "hallways/hallway1-bg.png"
      )
      .setScale(4);

    this.colliders = this.add.group();

    this.marina = new Marina(this, 200, this.game.canvas.height / 2, "marina");
    this.marina.anims.play("idle-d");

    // Back wall
    createColliderRect(this, 200, 200, 600, 5, this.colliders);
    // Bottom wall
    createColliderRect(this, 0, 392, 800, 8, this.colliders);
    // Door top
    createColliderRect(this, 0, 268, 130, 8, this.colliders);
    // Door bottom
    createColliderRect(this, 0, 330, 72, 2, this.colliders);
    // Left wall diagonals
    // Upper
    createColliderLine(this, 130, 270, 75, 80, 5, -5, this.colliders);
    // Lower
    createColliderLine(this, 70, 330, 75, 80, -5, 5, this.colliders);

    this.add
      .sprite(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2,
        "atlas",
        "hallways/hallway1-fg.png"
      )
      .setScale(4)
      .setDepth(100000);

    const transitionData = [{
        key: "tickets",
        type: "left",
        x: 10 * 4,
        y: 60 * 4
      },
      {
        key: "hallway2",
        type: "right",
        x: 199 * 4,
        y: 60 * 4
      }
    ];
    this.addTransitions(transitionData);

    this.handleEntrances();
  }

  update(time, delta) {
    super.update();

    this.marina.update(time, delta);
    this.physics.collide(this.marina, this.colliders, () => {
      this.marina.stop();
    });
    this.marina.depth = this.marina.body.y;
  }
}