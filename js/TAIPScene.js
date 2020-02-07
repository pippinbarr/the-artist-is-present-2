const TRANSITION_OFFSET = 7 * 4;


class TAIPScene extends Phaser.Scene {

  constructor(config) {
    super(config);
  }

  create() {
    this.cameras.main.setBackgroundColor('#fff');
    this.colliders = this.add.group();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.marks = this.add.group();

    // Marina Abramovic
    this.marina = new Marina(this, this.game.canvas.width / 2, this.game.canvas.height / 2, 'marina');
    this.marina.anims.play('idle-d-marina');

    this.dialog = new Dialog(this, this.marina);
  }

  update(time, delta) {
    this.checkExits();
    if (this.queue) {
      this.physics.collide(this.marina, this.queue, (marina, visitor) => {
        this.marina.stop();
        this.personSay(visitor, randomElement(QUEUE_TALK));
      });
    }
  }

  handleEntrances() {
    if (this.leftTransition && this.leftTransition.key === last.scene) {
      this.handleEntrance(this.leftTransition, 1, 0);
    }
    else if (this.rightTransition && this.rightTransition.key === last.scene) {
      this.handleEntrance(this.rightTransition, -1, 0);
    }
    else if (this.upTransition && this.upTransition.key === last.scene) {
      this.handleEntrance(this.upTransition, 0, 1);
    }
    else if (this.downTransition && this.downTransition.key === last.scene) {
      this.handleEntrance(this.downTransition, 0, -1);
    }
  }

  handleEntrance(transition, xDir, yDir) {
    this.marina.x = transition.x - xDir * TRANSITION_OFFSET;
    this.marina.y = transition.keepY ? last.y : transition.y - yDir * TRANSITION_OFFSET;

    if (xDir > 0) this.marina.right();
    if (xDir < 0) this.marina.left();
    if (yDir > 0) this.marina.down();
    if (yDir < 0) this.marina.up();
    if (transition.stop === true) this.marina.stop();

    let targetX = transition.x + xDir * TRANSITION_OFFSET;
    let targetY = transition.keepY ? last.y : transition.y + yDir * TRANSITION_OFFSET;

    console.log(this.tweens, this.marina, targetX, targetY)

    // let marinaTweenIn = this.tweens.add({
    //   targets: this.marina,
    //   x: targetX,
    //   y: targetY,
    //   duration: TRANSITION_OFFSET / this.marina.speed * 1000 * 2,
    //   repeat: 0,
    //   onComplete: () => {
    //     // this.marina.inputEnabled = true;
    //     // this.marina.stop();
    //   },
    // });
  }


  checkExits() {
    if (this.leftTransition && this.marina.x < this.leftTransition.x) {
      // this.marina.inputEnabled = false;
    }
    else if (this.rightTransition && this.marina.x > this.rightTransition.x) {
      // this.marina.inputEnabled = false;
    }
    else if (this.upTransition && this.marina.y < this.upTransition.y) {
      // this.marina.inputEnabled = false;
    }
    else if (this.downTransition && this.marina.y > this.downTransition.y) {
      // this.marina.inputEnabled = false;
    }

    if (this.leftTransition && this.marina.x < this.leftTransition.x - TRANSITION_OFFSET) {
      last.scene = this.scene.key;
      last.x = this.marina.x;
      last.y = this.marina.y;
      this.scene.start(this.leftTransition.key);
    }
    else if (this.rightTransition && this.marina.x > this.rightTransition.x + TRANSITION_OFFSET) {
      last.scene = this.scene.key;
      last.x = this.marina.x;
      last.y = this.marina.y;
      this.scene.start(this.rightTransition.key);
    }
    else if (this.upTransition && this.marina.y < this.upTransition.y - TRANSITION_OFFSET) {
      last.scene = this.scene.key;
      last.x = this.marina.x;
      last.y = this.marina.y;
      this.scene.start(this.upTransition.key);
    }
    else if (this.downTransition && this.marina.y > this.downTransition.y + TRANSITION_OFFSET) {
      last.scene = this.scene.key;
      last.x = this.marina.x;
      last.y = this.marina.y;
      this.scene.start(this.downTransition.key);
    }
  }

  addTransitions(data) {

    data.forEach((transition) => {
      switch (transition.type) {
        case 'left':
          this.marks.create(transition.x, transition.y, 'atlas', 'red-pixel.png').setScale(4).setDepth(100000);
          this.marks.create(transition.x - TRANSITION_OFFSET, transition.y, 'atlas', 'red-pixel.png').setScale(4).setDepth(100000);
          this.marks.create(transition.x + TRANSITION_OFFSET, transition.y, 'atlas', 'red-pixel.png').setScale(4).setDepth(100000);
          this.leftTransition = transition;
          break;

        case 'right':
          this.marks.create(transition.x, transition.y, 'atlas', 'red-pixel.png').setScale(4).setDepth(100000);
          this.marks.create(transition.x + TRANSITION_OFFSET, transition.y, 'atlas', 'red-pixel.png').setScale(4).setDepth(100000);
          this.marks.create(transition.x - TRANSITION_OFFSET, transition.y, 'atlas', 'red-pixel.png').setScale(4).setDepth(100000);
          this.rightTransition = transition;
          break;

        case 'up':
          this.marks.create(transition.x, transition.y, 'atlas', 'red-pixel.png').setScale(4).setDepth(100000);
          this.marks.create(transition.x, transition.y - TRANSITION_OFFSET, 'atlas', 'red-pixel.png').setScale(4).setDepth(100000);
          this.marks.create(transition.x, transition.y + TRANSITION_OFFSET, 'atlas', 'red-pixel.png').setScale(4).setDepth(100000);
          this.upTransition = transition;
          break;

        case 'down':
          this.marks.create(transition.x, transition.y, 'atlas', 'red-pixel.png').setScale(4).setDepth(100000);
          this.marks.create(transition.x, transition.y + TRANSITION_OFFSET, 'atlas', 'red-pixel.png').setScale(4).setDepth(100000);
          this.marks.create(transition.x, transition.y - TRANSITION_OFFSET, 'atlas', 'red-pixel.png').setScale(4).setDepth(100000);
          this.downTransition = transition;
          break;
      }

    });

    // this.marks.toggleVisible();
  }

  addQueue(xOffset) {
    // To store all the whisper triggers
    this.whispers = this.add.group();
    this.queue = this.add.group();

    // Add queue
    for (let i = 0; i < QUEUE.length; i++) {
      QUEUE[i].x = QUEUE_X - i * QUEUE_SPACING + xOffset
      QUEUE[i].y = QUEUE_Y;
      this.add.existing(QUEUE[i]);
      this.physics.add.existing(QUEUE[i]);
      this.queue.add(QUEUE[i]);

      if (Atrium.seen) continue;

      if (i === QUEUE.length - 1 || i % 3 === 0 || Math.random() < EXTRA_WHISPER_CHANCE) {
        let trigger = this.physics.add.sprite(QUEUE[i].x, this.game.canvas.height / 2, 'atlas', 'red-pixel.png').setScale(4, this.game.canvas.height);
        trigger.visitor = QUEUE[i];
        trigger.setVisible(false);
        this.whispers.add(trigger);
      }
    }
  }

  handleWhispers() {
    // Handle whisperers
    this.physics.overlap(this.marina, this.whispers, (marina, whisper) => {
      this.personSay(whisper.visitor, getRandom(WHISPERS));
      this.whispers.remove(whisper);
    });
  }

  personSay(person, message) {
    if (this.dialog.visible) return;
    if (person.revertTimer) {
      clearTimeout(person.revertTimer);
    }

    if (person.x - this.marina.x > 10 * 4) {
      person.faceLeft();
    }
    else if (person.x - this.marina.x < -10 * 4) {
      person.faceRight();
    }
    else if (this.marina.y > person.y) {
      person.faceDown();
    }
    else {
      person.faceUp();
    }

    setTimeout(() => {
      this.dialog.y = -150;
      this.dialog.showMessage(message, () => {
        person.revertTimer = setTimeout(() => {
          if (person instanceof Guard) {
            person.faceLeft();
          }
          else {
            person.faceRight();
          }
        }, 1000);
      });
    }, 250 + Math.random() * 250);
  }

}