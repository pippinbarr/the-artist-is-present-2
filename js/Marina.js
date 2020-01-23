class Marina extends Person {

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture, '-marina');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.cursors = scene.input.keyboard.createCursorKeys();
    scene.input.keyboard.on('keydown', () => this.handleInput());
    this.inputEnabled = true;
    this.lookingUp = true;
    this.suffix = '-marina';
  }

  create() {

  }

  update() {

  }

  handleInput(e) {
    if (!this.inputEnabled) return;

    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      if (this.body.velocity.x < 0) {
        this.stop();
      }
      else {
        this.left();
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      if (this.body.velocity.x > 0) {
        this.stop();
      }
      else {
        this.right();
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      if (this.body.velocity.y < 0) {
        this.stop();
      }
      else {
        this.up();
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      if (this.body.velocity.y > 0) {
        this.stop();
      }
      else {
        this.down();
      }
    }
  }

  lookDown() {
    if (!this.lookingUp) return;
    this.lookingUp = false;
    this.anims.play('look-down-marina');
  }

  lookUp() {
    if (this.lookingUp) return;
    this.lookingUp = true;
    this.anims.play('look-up-marina');
  }
}