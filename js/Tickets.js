class Tickets extends TAIPScene {
  constructor(config) {
    super({
      key: "tickets"
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
        "tickets/tickets-bg.png"
      )
      .setScale(4);

    this.barrier = this.physics.add
      .sprite(80 * 4, 49 * 4, "atlas", "tickets/tickets-barrier.png")
      .setScale(4);
    this.barrier.body.setOffset(6, 34);
    this.barrier.body.setSize(90, 3, false);
    this.barrier.body.immovable = true;
    this.barrier.depth = 60 * 4;
    this.colliders.add(this.barrier);

    createColliderRect(this, 0, 200, 600, 5, this.colliders);
    createColliderRect(this, 0, 392, 320, 8, this.colliders);
    createColliderRect(this, 480, 392, 320, 8, this.colliders);
    createColliderRect(this, 674, 268, 130, 8, this.colliders);
    createColliderRect(this, 734, 330, 100, 2, this.colliders);
    createColliderRect(this, 1, 200, 1, 200, this.colliders);
    createColliderLine(this, 600, 200, 75, 80, 5, 5, this.colliders);
    createColliderLine(this, 730, 330, 75, 80, 5, 5, this.colliders);

    let ticketFG = this.add
      .sprite(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2,
        "atlas",
        "tickets/tickets-fg.png"
      )
      .setScale(4);
    ticketFG.depth = 100000;

    const transitionData = [{
        key: "moma-exterior",
        type: "down",
        x: 100 * 4,
        y: 90 * 4
      },
      {
        key: "hallway1",
        type: "right",
        x: 190 * 4,
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