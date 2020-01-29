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
    this.tableAndChairs.body.setOffset(2, this.tableAndChairs.body.height - 8);
    this.tableAndChairs.body.setSize(this.tableAndChairs.width - 4, 4, false);
    this.tableAndChairs.body.immovable = true;
    this.tableAndChairs.setDepth(250);
    this.colliders.add(this.tableAndChairs);

    this.marinaChairSensor = this.physics.add.sprite(730, 250, 'atlas', 'red-pixel.png').setScale(50, 60);
    this.marinaChairSensor.visible = false;

    this.visitorChairSensor = this.physics.add.sprite(580, 250, 'atlas', 'red-pixel.png').setScale(50, 60);
    this.visitorChairSensor.visible = false;

    // Back wall left
    createColliderRect(this, 0, 0, 312, 202, this.colliders);
    // Back wall right
    createColliderRect(this, 312, 0, 490, 60, this.colliders);
    // Bottom wall
    createColliderRect(this, 0, 392, 800, 8, this.colliders);
    // Right wall
    createColliderRect(this, 799, 0, 2, 400, this.colliders);

    this.addQueue();

    this.addGuards();

    const transitionData = [{
      key: "hallway3",
      type: "left",
      x: 10 * 4,
      y: 60 * 4
    }, ];
    this.addTransitions(transitionData);

    this.handleEntrances();

    // To get into the chair easily for testing
    this.marina.x = 700;
    this.marina.y = 300;

    this.faceBG = this.add.sprite(0, 0, 'atlas', 'white-pixel.png');
    this.faceBG.tint = 0xFFEEEEEE;
    this.faceBG.x = this.game.canvas.width / 2;
    this.faceBG.y = this.game.canvas.height / 2;
    this.faceBG.setScale(this.game.canvas.width, this.game.canvas.height);
    this.faceBG.setDepth(1000);
    this.faceBG.setVisible(false);
  }

  addQueue() {
    // Add queue
    this.queue = this.add.group();
    for (let i = 0; i < QUEUE.length; i++) {
      QUEUE[i].x = QUEUE_X - i * QUEUE_SPACING;
      QUEUE[i].y = QUEUE_Y;
      QUEUE[i].scene = this;
      QUEUE[i].dialog = this.dialog;
      // this.add.existing(QUEUE[i]);
      this.physics.add.existing(QUEUE[i]);
      this.queue.add(QUEUE[i], true);
    }
  }

  addGuards() {
    // Add guards
    this.guards = this.add.group();
    this.guard1 = new Guard(this, 115 * 4, 39 * 4 + 2, this.dialog);
    this.guard2 = new Guard(this, 118 * 4, 50 * 4 + 2, this.dialog);
    this.guards.add(this.guard1, true);
    this.guards.add(this.guard2, true);
  }

  update(time, delta) {
    super.update();

    this.handleCollisions();
    this.checkMarinaSitting();
    this.checkVisitorSitting();

    if (this.movingUp && this.movingUp.x >= QUEUE_X) {
      this.movingUp.stop();
      this.movingUp = undefined;
      for (let i = 1; i < QUEUE.length; i++) {
        setTimeout(() => {
          QUEUE[i].right();
        }, i * 300 + Math.random() * 250);
      }
    }

    this.setDepths();
  }

  checkMarinaSitting() {
    if (!this.marina.sitting) {
      this.physics.overlap(this.marina, this.marinaChairSensor, () => {
        this.marina.sit();
        this.marina.x = 695.5;
        this.marina.y = 210;
        setTimeout(() => {
          this.startHeadDownSequence();
        }, 1000);
      });
    }
  }

  startHeadDownSequence() {
    this.dialog.showMessage(HEAD_DOWN_INSTRUCTIONS, () => {
      setTimeout(() => {
        this.marina.lookDown(() => {
          setTimeout(() => {
            this.nextSitter();
          }, 1000);
        }, this);
      }, 1000);
    });
  }

  checkVisitorSitting() {
    if (this.sitter && !this.sitter.sitting) {
      this.physics.overlap(this.sitter, this.visitorChairSensor, () => {
        this.sitter.stop();
        console.log(this.sitter.x, this.sitter.y);
        this.sitter.sit();
        this.sitter.x = 560;
        this.sitter.y = 190;

        setTimeout(() => {
          this.startHeadUpSequence();
        }, 1000);

        this.movingUp = QUEUE[0];
        this.movingUp.right(); // Make the front person walk
      });
    }
  }

  startHeadUpSequence() {
    this.dialog.showMessage(HEAD_UP_INSTRUCTIONS, () => {
      setTimeout(() => {
        this.marina.lookUp(() => {
          setTimeout(() => {
            const SIT_TIME = SIT_TIMES[Math.floor(Math.random() * SIT_TIMES.length)];
            setTimeout(() => {
              this.sitterFinished()
            }, SIT_TIME * 60 * 1000);
            this.showSitter();
          }, 1000);
        }, this);
      }, 1000);
    });
  }

  showSitter() {
    this.faceBG.setVisible(true);
    this.face = this.add.sprite(0, 0, `person-spritesheet${this.sitter.suffix}`, 14);
    this.face.x = this.game.canvas.width / 2;
    this.face.y = this.game.canvas.height / 2 + 280;
    this.face.setScale(32, 32);
    this.face.setDepth(10000);
  }

  sitterFinished() {
    this.faceBG.setVisible(false);
    this.face.setVisible(false);
    this.face.destroy();
    this.sitter.body.y = 180;
    // this.sitter.setDepth(1);
    this.sitter.right();
    setTimeout(() => {
      this.startHeadDownSequence();
    }, 2000);
  }

  handleCollisions() {
    this.physics.collide(this.marina, this.colliders, () => {
      this.marina.stop();
    });
    this.physics.collide(this.marina, this.queue, () => {
      this.marina.stop();
      this.dialog.showMessage('Oh, hello!');
    });
    this.physics.collide(this.marina, this.guards, () => {
      this.marina.stop();
    });
    this.physics.collide(this.queue, this.queue, (person1, person2) => {
      person1.stop();
      person2.stop();
    });
  }

  setDepths() {
    this.marina.depth = this.marina.body.y;
    this.queue.getChildren().forEach((visitor) => {
      visitor.depth = visitor.body.y;
    });
    this.guards.getChildren().forEach((guard) => {
      guard.depth = guard.body.y;
    });
    if (this.sitter) {
      this.sitter.depth = this.sitter.sitting ? this.sitter.body.y + 100 : this.sitter.body.y;
    }
  }

  // handleGazeInput(e) {
  //   if (!this.marina.sitting) return;
  //
  //   if (this.marina.lookingUp) {
  //     this.marina.lookDown();
  //   }
  //   else if (!this.marina.lookingUp) {
  //     this.marina.lookUp();
  //   }
  // }

  nextSitter() {
    if (this.sitter) {
      this.sitter.sitting = false;
      this.sitter.depth = this.sitter.body.y;
      this.sitter.right();
    }

    // Make the next person in the queue the sitter and make them walk to the chair
    this.sitter = QUEUE.shift();
    this.queue.remove(this.sitter);
    this.sitter.right();

    // Add a new person to the back of the queue
    let last = new Visitor(this, QUEUE[QUEUE.length - 1].x - QUEUE_SPACING, QUEUE[QUEUE.length - 1].y);
    last.ignoreDestroy = true;
    last.scene = this;
    this.physics.add.existing(last);
    this.queue.add(last, true);
    QUEUE.push(last);
  }

  advanceQueue() {

  }
}