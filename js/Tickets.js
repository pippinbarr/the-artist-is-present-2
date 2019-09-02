let Tickets = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Tickets () {
    Phaser.Scene.call(this, { key: 'tickets' });
  },

  create: function () {
    this.cameras.main.setBackgroundColor('#000');

    // Ticket area BG
    this.add.sprite(this.game.canvas.width/2,this.game.canvas.height/2,'atlas','tickets/tickets-bg.png').setScale(4);

    this.marina = new Marina(this,100,this.game.canvas.height/2,'marina');
    this.marina.anims.play('idle-d');

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

    let ticketFG = this.add.sprite(this.game.canvas.width/2,this.game.canvas.height/2,'atlas','tickets/tickets-fg.png').setScale(4);
    ticketFG.depth = 100000;
  },

  update: function (time,delta) {
    this.marina.update(time,delta);
    this.physics.collide(this.marina,this.colliders,() => {
      this.stopAvatar();
    });
    this.marina.depth = this.marina.body.y;
  },

  stopAvatar() {
    let key = this.marina.anims.currentAnim.key;
    key = key.replace('walking','idle');
    this.marina.anims.play(key);
    this.marina.setVelocity(0,0);
  }
});
