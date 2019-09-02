let Tickets = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Tickets () {
    Phaser.Scene.call(this, { key: 'tickets' });
  },

  create: function () {
    this.cameras.main.setBackgroundColor('#000');

    // Ticket area BG
    this.add.sprite(this.game.canvas.width/2,this.game.canvas.height/2,'atlas','tickets/tickets-bg.png').setScale(4);

    // Avatar (should be a class)
    this.avatar = this.physics.add.sprite(this.game.canvas.width/2,this.game.canvas.height/2,'marina').setScale(4);
    this.avatar.body.onWorldBounds = true;
    this.avatar.body.setOffset(1,this.avatar.height-4);
    this.avatar.body.setSize(this.avatar.width-2,4,false);

    this.colliders = this.add.group();
    createColliderRect(this,0,200,600,5,this.colliders);
    createColliderRect(this,0,392,320,8,this.colliders);
    createColliderRect(this,480,392,320,8,this.colliders);
    createColliderRect(this,674,268,130,8,this.colliders);
    createColliderRect(this,734,330,100,2,this.colliders);
    createColliderRect(this,1,200,1,200,this.colliders);
    createColliderLine(this,600,200,75,80,5,5,this.colliders);
    createColliderLine(this,730,330,75,80,5,5,this.colliders);

    this.colliders.toggleVisible();

    this.cursors = this.input.keyboard.createCursorKeys();

    this.avatar.anims.play('idle-d');

    this.physics.world.on('worldbounds', () => {
      this.stopAvatar();
    },this);

    let ticketFG = this.add.sprite(this.game.canvas.width/2,this.game.canvas.height/2,'atlas','tickets/tickets-fg.png').setScale(4);
    ticketFG.depth = 100000;
  },

  update: function () {
    this.handleInput();

    this.physics.collide(this.avatar,this.colliders,() => {
      this.stopAvatar();
    });
    this.avatar.depth = this.avatar.body.y;
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
