let Prototyping = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function Prototyping () {
        Phaser.Scene.call(this, { key: 'prototyping' });
    },

    create: function () {
      this.cameras.main.setBackgroundColor('#000');

      this.avatar = this.physics.add.sprite(this.game.canvas.width/2,this.game.canvas.height/2,'atlas','walkcycle').setScale(4);

      this.cursors = this.input.keyboard.createCursorKeys();

      this.avatar.anims.play('idle-d');
    },

    update: function () {
      this.handleInput();
    },

    handleInput() {
      if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
        if (this.avatar.body.velocity.x < 0) {
          this.avatar.setVelocityX(0);
          this.avatar.anims.play('idle-h');
        }
        else {
          this.avatar.flipX = true;
          this.avatar.setVelocityX(-100);
          this.avatar.setVelocityY(0);
          this.avatar.anims.play('walking-h');
        }
      }
      if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
        if (this.avatar.body.velocity.x > 0) {
          this.avatar.setVelocityX(0);
          this.avatar.anims.play('idle-h');
        }
        else {
          this.avatar.flipX = false;
          this.avatar.setVelocityX(100);
          this.avatar.setVelocityY(0);
          this.avatar.anims.play('walking-h');
        }
      }
      if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
        if (this.avatar.body.velocity.y < 0) {
          this.avatar.setVelocityY(0);
          this.avatar.anims.play('idle-u');
        }
        else {
          this.avatar.setVelocityX(0);
          this.avatar.setVelocityY(-100);
          this.avatar.anims.play('walking-u');
        }
      }
      if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
        if (this.avatar.body.velocity.y > 0) {
          this.avatar.setVelocityY(0);
          this.avatar.anims.play('idle-d');
        }
        else {
          this.avatar.setVelocityX(0);
          this.avatar.setVelocityY(100);
          this.avatar.anims.play('walking-d');
        }
      }
    },
});
