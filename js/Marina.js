class Marina extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setScale(4);
    this.body.setOffset(1, this.height - 4);
    this.body.setSize(this.width - 2, 4, false);
    this.cursors = scene.input.keyboard.createCursorKeys();
    scene.input.keyboard.on('keydown', () => this.handleInput());
    this.inputEnabled = true;
    this.speed = 100;
    this.sitting = false;
    this.lookingUp = true;
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

  right() {
    this.flipX = false;
    this.setVelocityX(this.speed);
    this.setVelocityY(0);
    this.anims.play('walking-h');
  }

  left() {
    this.flipX = true;
    this.setVelocityX(-this.speed);
    this.setVelocityY(0);
    this.anims.play('walking-h');
  }

  up() {
    this.setVelocityX(0);
    this.setVelocityY(-this.speed);
    this.anims.play('walking-u');
  }

  down() {
    this.setVelocityX(0);
    this.setVelocityY(this.speed);
    this.anims.play('walking-d');
  }

  stop() {
    let key = this.anims.currentAnim.key;
    key = key.replace('walking', 'idle');
    this.anims.play(key);
    this.setVelocity(0, 0);
  }

  sit() {
    this.anims.play('sitting');
    this.setVelocity(0, 0);
    this.inputEnabled = false;
    this.sitting = true;
    this.flipX = false;
  }

  lookDown() {
    if (!this.lookingUp) return;
    this.lookingUp = false;
    this.anims.play('look-down');
  }

  lookUp() {
    if (this.lookingUp) return;
    this.lookingUp = true;
    this.anims.play('look-up');
  }
}