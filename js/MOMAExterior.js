class MOMAExterior extends TAIPScene {
  constructor(config) {
    super({
      key: "moma-exterior"
    });
  }

  create() {
    super.create();
    this.cameras.main.setBackgroundColor("#5F6061");

    // BG
    this.add
      .sprite(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2,
        "atlas",
        "moma-exterior/moma-exterior-bg.png"
      )
      .setScale(4);

    // FG
    this.add
      .sprite(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2,
        "atlas",
        "moma-exterior/moma-exterior-fg.png"
      )
      .setScale(4)
      .setDepth(10000);

    this.LEFT_DOOR_X = this.game.canvas.width / 2 - 10.5 * 4;
    this.RIGHT_DOOR_X = this.game.canvas.width / 2 + 10.5 * 4;
    this.DOOR_OPEN_AMOUNT = 15 * 4;

    this.doorsOpen = false;
    this.leftDoor = this.physics.add
      .sprite(
        this.LEFT_DOOR_X,
        this.game.canvas.height / 2 - 2.5 * 4,
        "atlas",
        "moma-exterior/moma-door.png"
      )
      .setScale(4)
      .setDepth(-10);
    this.rightDoor = this.physics.add
      .sprite(
        this.RIGHT_DOOR_X,
        this.game.canvas.height / 2 - 2.5 * 4,
        "atlas",
        "moma-exterior/moma-door.png"
      )
      .setScale(4)
      .setDepth(-10);
    this.leftDoor.body.immovable = true;
    this.rightDoor.body.immovable = true;
    this.colliders.add(this.leftDoor);
    this.colliders.add(this.rightDoor);
    this.sensor = this.physics.add
      .sprite(this.game.canvas.width / 2, 65 * 4, "atlas", "red-pixel.png")
      .setScale(40 * 4, 30 * 4);
    this.sensor.visible = false;
    this.sensor.activated = false;
    // Building colliders
    // Either side of the door
    createColliderRect(this, 54 * 4, 0 * 4, 26 * 4, 65 * 4, this.colliders);
    createColliderRect(this, 120 * 4, 0 * 4, 26 * 4, 65 * 4, this.colliders);
    // Outside walls
    createColliderRect(this, 0 * 4, 0 * 4, 32 * 4, 85 * 4, this.colliders);
    createColliderRect(this, 168 * 4, 0 * 4, 32 * 4, 85 * 4, this.colliders);
    // Diagonal walls
    createColliderLine(
      this,
      32 * 4,
      84 * 4,
      20 * 4,
      20 * 4,
      5,
      -5,
      this.colliders
    );
    createColliderLine(
      this,
      147 * 4,
      64 * 4,
      20 * 4,
      20 * 4,
      5,
      5,
      this.colliders
    );
    // Bottom wall
    createColliderRect(this, 0 * 4, 98 * 4, 200 * 4, 2 * 4, this.colliders);

    // Marina Abramovic
    this.marina = new Marina(this, 280, 320, "marina");
    this.marina.anims.play("idle-d");

    const transitionData = [{
      key: "tickets",
      type: "up",
      x: 100 * 4,
      y: 40 * 4
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
    this.handleWrap();
    this.handleSensor();
    this.marina.depth = this.marina.body.y;
  }

  handleWrap() {
    if (this.marina.x < 0 - this.marina.width) {
      this.marina.x = this.game.canvas.width + this.marina.width;
    }
    else if (this.marina.x > this.game.canvas.width + this.marina.width) {
      this.marina.x = 0 - this.marina.width;
    }
  }

  handleSensor() {
    if (this.physics.overlap(this.sensor, this.marina)) {
      if (!this.sensor.activated) {
        this.sensor.activated = true;
        const leftDoorTween = this.tweens.add({
          targets: this.leftDoor,
          x: this.LEFT_DOOR_X - this.DOOR_OPEN_AMOUNT,
          duration: 750,
          repeat: 0,
          onComplete: () => {}
        });
        const rightDoorTween = this.tweens.add({
          targets: this.rightDoor,
          x: this.RIGHT_DOOR_X + this.DOOR_OPEN_AMOUNT,
          duration: 750,
          repeat: 0,
          onComplete: () => {
            this.doorsOpen = true;
          }
        });
      }
    }
    else if (this.sensor.activated && this.doorsOpen) {
      this.sensor.activated = false;
      const leftDoorTween = this.tweens.add({
        targets: this.leftDoor,
        x: this.LEFT_DOOR_X,
        duration: 750,
        repeat: 0,
        onComplete: () => {}
      });
      const rightDoorTween = this.tweens.add({
        targets: this.rightDoor,
        x: this.RIGHT_DOOR_X,
        duration: 750,
        repeat: 0,
        onComplete: () => {
          this.doorsOpen = false;
        }
      });
    }
  }

  handleEntrances() {
    super.handleEntrances();

    if (last.scene === "tickets") {
      this.leftDoor.x -= this.DOOR_OPEN_AMOUNT;
      this.rightDoor.x += this.DOOR_OPEN_AMOUNT;
      this.doorsOpen = true;
    }
  }
}