let Prototyping = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Prototyping () {
    Phaser.Scene.call(this, { key: 'prototyping' });
  },

  create: function () {
    this.cameras.main.setBackgroundColor('#000');

    // Atrium
    this.add.sprite(this.game.canvas.width/2,this.game.canvas.height/2,'atlas','atrium/atrium.png').setScale(4);

    this.tableAndChairs = this.physics.add.sprite(130*4+30*4,40*4+15*4,'atlas','atrium/table-and-chairs.png').setScale(4);
    this.tableAndChairs.body.setOffset(2,this.tableAndChairs.body.height-10);
    this.tableAndChairs.body.setSize(this.tableAndChairs.width-4,6,false);
    this.tableAndChairs.body.immovable = true;

    this.avatar = this.physics.add.sprite(this.game.canvas.width/2,this.game.canvas.height/2,'atlas','walkcycle/walkcycle-01.png').setScale(4);
    this.avatar.setCollideWorldBounds(true);
    this.avatar.body.onWorldBounds = true;
    this.avatar.body.setOffset(1,this.avatar.height-4);
    this.avatar.body.setSize(this.avatar.width-2,4,false);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.avatar.anims.play('idle-d');

    this.physics.world.on('worldbounds', () => {
      this.stopAvatar();
    },this);

    this.depthGroup = this.add.group();
    this.depthGroup.add(this.avatar);
    this.depthGroup.add(this.tableAndChairs);

  },

  update: function () {
    this.handleInput();
    this.physics.collide(this.avatar,this.tableAndChairs,() => {
      this.stopAvatar();
    });

    this.avatar.depth = this.avatar.body.y;
    this.tableAndChairs.depth = this.tableAndChairs.body.y;
  },

  stopAvatar() {
    let key = this.avatar.anims.currentAnim.key;
    key = key.replace('walking','idle');
    this.avatar.anims.play(key);
    this.avatar.setVelocity(0,0);
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
