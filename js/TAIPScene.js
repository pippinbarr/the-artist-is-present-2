const TRANSITION_OFFSET = 10 * 4;


class TAIPScene extends Phaser.Scene {

  constructor(config) {
    super(config);
  }

  create() {
    this.cameras.main.setBackgroundColor('#fff');
    this.colliders = this.add.group();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.marks = this.add.group();
  }

  update(time, delta) {
    this.checkExits();
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
    this.marina.y = transition.y - yDir * TRANSITION_OFFSET;
    if (xDir > 0) this.marina.right();
    if (xDir < 0) this.marina.left();
    if (yDir > 0) this.marina.down();
    if (yDir < 0) this.marina.up();

    let marinaTweenIn = this.tweens.add({
      targets: this.marina,
      x: transition.x + xDir * TRANSITION_OFFSET,
      y: transition.y + yDir * TRANSITION_OFFSET,
      duration: TRANSITION_OFFSET / this.marina.speed * 1000 * 2,
      repeat: 0,
      onComplete: () => {
        this.marina.inputEnabled = true;
        // this.marina.stop();
      },
    });
  }


  checkExits() {
    if (this.leftTransition && this.marina.x < this.leftTransition.x) {
      this.marina.inputEnabled = false;
    }
    else if (this.rightTransition && this.marina.x > this.rightTransition.x) {
      this.marina.inputEnabled = false;
    }
    else if (this.upTransition && this.marina.y < this.upTransition.y) {
      this.marina.inputEnabled = false;
    }
    else if (this.downTransition && this.marina.y > this.downTransition.y) {
      this.marina.inputEnabled = false;
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

}