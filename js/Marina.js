class Marina extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setScale(4);
    this.body.setOffset(1,this.height-4);
    this.body.setSize(this.width-2,4,false);
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  create () {

  }

  update () {
    this.handleInput();
  }

  handleInput () {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      if (this.body.velocity.x < 0) {
        this.setVelocityX(0);
        this.anims.play('idle-h');
      }
      else {
        this.flipX = true;
        this.setVelocityX(-100);
        this.setVelocityY(0);
        this.anims.play('walking-h');
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      if (this.body.velocity.x > 0) {
        this.setVelocityX(0);
        this.anims.play('idle-h');
      }
      else {
        this.flipX = false;
        this.setVelocityX(100);
        this.setVelocityY(0);
        this.anims.play('walking-h');
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      if (this.body.velocity.y < 0) {
        this.setVelocityY(0);
        this.anims.play('idle-u');
      }
      else {
        this.setVelocityX(0);
        this.setVelocityY(-100);
        this.anims.play('walking-u');
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      if (this.body.velocity.y > 0) {
        this.setVelocityY(0);
        this.anims.play('idle-d');
      }
      else {
        this.setVelocityX(0);
        this.setVelocityY(100);
        this.anims.play('walking-d');
      }
    }
  }

  stop() {
    let key = this.anims.currentAnim.key;
    key = key.replace('walking','idle');
    this.anims.play(key);
    this.setVelocity(0,0);
  }
}
