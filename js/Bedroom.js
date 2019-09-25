let Bedroom = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Bedroom() {
    Phaser.Scene.call(this, {
      key: 'bedroom'
    });
  },

  create: function() {
    this.cameras.main.setBackgroundColor('#000');

    this.colliders = this.add.group();

    // Room
    this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'bedroom/bedroom-bg.png').setScale(4);
    // Wall colliders
    createColliderRect(this, 57 * 4, 56 * 4, (140 - 57) * 4, 5, this.colliders);
    createColliderRect(this, 0 * 4, 92 * 4, 200 * 4, 5, this.colliders);
    createColliderRect(this, 151 * 4, 66 * 4, 200 * 4, 5, this.colliders);
    createColliderLine(this, 140 * 4, 56 * 4, 10 * 4, 11 * 4, 5, 5, this.colliders);
    createColliderLine(this, 164 * 4, 82 * 4, 10 * 4, 11 * 4, 5, 5, this.colliders);
    createColliderLine(this, 57 * 4, 57 * 4, 35 * 4, 35 * 4, -5, 5, this.colliders);

    // Bed
    this.bed = this.physics.add.sprite(67 * 4, 62 * 4, 'atlas', 'bedroom/bed.png').setScale(4);
    this.bed.body.setOffset(0, this.bed.body.height - 16);
    this.bed.body.setSize(this.bed.width, 16, false);
    this.bed.body.immovable = true;
    // Bed colliders
    createColliderRect(this, 32 * 4, 68 * 4, 70 * 4, 5, this.colliders);
    createColliderRect(this, 31 * 4, 83 * 4, 57 * 4, 5, this.colliders);
    createColliderLine(this, 102 * 4, 69 * 4, 16 * 4, 16 * 4, -5, 5, this.colliders);

    // Bedside table
    this.sideTable = this.physics.add.sprite(40 * 4, 84 * 4, 'atlas', 'bedroom/side-table.png').setScale(4);
    this.sideTable.body.setOffset(0, this.sideTable.body.height - 16);
    this.sideTable.body.setSize(this.sideTable.width, 16, false);
    this.sideTable.body.immovable = true;
    this.sideTable.depth = this.sideTable.body.y;
    // Bedside table collider
    createColliderRect(this, this.sideTable.x - this.sideTable.width * 4 / 2, this.sideTable.y - this.sideTable.height * 4 / 2, this.sideTable.width * 4, this.sideTable.height * 4, this.colliders);

    // Bedside table
    this.sideTable = this.physics.add.sprite(40 * 4, 84 * 4, 'atlas', 'bedroom/side-table.png').setScale(4);
    this.sideTable.body.setOffset(0, this.sideTable.body.height - 16);
    this.sideTable.body.setSize(this.sideTable.width, 16, false);
    this.sideTable.body.immovable = true;
    this.sideTable.depth = this.sideTable.body.y;
    // Bedside table collider
    createColliderRect(this, this.sideTable.x - this.sideTable.width * 4 / 2, this.sideTable.y - this.sideTable.height * 4 / 2, this.sideTable.width * 4, this.sideTable.height * 4, this.colliders);

    // Dresser
    this.dresser = this.physics.add.sprite(132.5 * 4, 46 * 4, 'atlas', 'bedroom/dresser.png').setScale(4);
    this.dresser.body.setOffset(0, this.dresser.body.height - 16);
    this.dresser.body.setSize(this.dresser.width, 16, false);
    this.dresser.body.immovable = true;
    this.dresser.depth = this.dresser.body.y;
    // Dresser collider
    createColliderRect(this, this.dresser.x - this.dresser.width * 4 / 2, this.dresser.y - this.dresser.height * 4 / 2, this.dresser.width * 4, this.dresser.height * 4, this.colliders);

    // Marina Abramovic
    this.marina = new Marina(this, 280, 290, 'marina');
    this.marina.anims.play('idle-d');


    this.colliders.toggleVisible();

    this.cursors = this.input.keyboard.createCursorKeys();

    let bedroomFG = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'atlas', 'bedroom/bedroom-fg.png').setScale(4);
    bedroomFG.depth = bedroomFG.y + bedroomFG.height + 4 * 4;

    this.depthGroup = this.add.group();
    this.depthGroup.add(this.marina);
    this.depthGroup.add(this.bed);
    this.depthGroup.add(bedroomFG);
  },

  update: function(time, delta) {
    this.marina.update(time, delta);
    this.physics.collide(this.marina, this.colliders, () => {
      this.marina.stop();
    });
    this.marina.depth = this.marina.body.y;
    this.bed.depth = this.bed.body.y;
    this.sideTable.depth = this.sideTable.body.y;
  },

  // stopAvatar() {
  //   let key = this.avatar.anims.currentAnim.key;
  //   key = key.replace('walking','idle');
  //   this.marina.anims.play(key);
  //   this.avatar.setVelocity(0,0);
  // },
  //
  // handleInput() {
  //   if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
  //     if (this.avatar.body.velocity.x < 0) {
  //       this.avatar.setVelocityX(0);
  //       this.avatar.anims.play('idle-h');
  //     }
  //     else {
  //       this.avatar.flipX = true;
  //       this.avatar.setVelocityX(-100);
  //       this.avatar.setVelocityY(0);
  //       this.avatar.anims.play('walking-h');
  //     }
  //   }
  //   if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
  //     if (this.avatar.body.velocity.x > 0) {
  //       this.avatar.setVelocityX(0);
  //       this.avatar.anims.play('idle-h');
  //     }
  //     else {
  //       this.avatar.flipX = false;
  //       this.avatar.setVelocityX(100);
  //       this.avatar.setVelocityY(0);
  //       this.avatar.anims.play('walking-h');
  //     }
  //   }
  //   if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
  //     if (this.avatar.body.velocity.y < 0) {
  //       this.avatar.setVelocityY(0);
  //       this.avatar.anims.play('idle-u');
  //     }
  //     else {
  //       this.avatar.setVelocityX(0);
  //       this.avatar.setVelocityY(-100);
  //       this.avatar.anims.play('walking-u');
  //     }
  //   }
  //   if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
  //     if (this.avatar.body.velocity.y > 0) {
  //       this.avatar.setVelocityY(0);
  //       this.avatar.anims.play('idle-d');
  //     }
  //     else {
  //       this.avatar.setVelocityX(0);
  //       this.avatar.setVelocityY(100);
  //       this.avatar.anims.play('walking-d');
  //     }
  //   }
  // },
});