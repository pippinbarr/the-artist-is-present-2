const DIALOG_TEXT_WIDTH = 640;
const DIALOG_PADDING = 16;
const DIALOG_BORDER_WIDTH = 8;
const DIALOG_FONT_SIZE = 20;

class Dialog extends Phaser.GameObjects.Container {

  constructor(scene, marina) {
    super(scene);

    this.scene = scene;
    this.marina = marina;

    this.whiteBorder = new Phaser.GameObjects.Sprite(
      this.scene,
      this.scene.game.canvas.width / 2,
      this.scene.game.canvas.height / 2,
      'atlas',
      'white-pixel.png');
    this.whiteBorder.setScale(100, 100);
    this.whiteBorder.tint = 0xffffff;

    this.redBorder = new Phaser.GameObjects.Sprite(
      this.scene,
      this.scene.game.canvas.width / 2,
      this.scene.game.canvas.height / 2,
      'atlas',
      'white-pixel.png');
    this.redBorder.setScale(96, 96);
    this.redBorder.tint = 0xcc0000;

    this.whiteBackground = new Phaser.GameObjects.Sprite(
      this.scene,
      this.scene.game.canvas.width / 2,
      this.scene.game.canvas.height / 2,
      'atlas',
      'white-pixel.png');
    this.whiteBackground.setScale(92, 92);
    this.whiteBackground.tint = 0xffffff;

    this.text = new Phaser.GameObjects.Text(
      this.scene,
      this.scene.game.canvas.width / 2,
      this.scene.game.canvas.height / 2,
      '<DIALOG TEXT>', {
        fontFamily: 'Commodore',
        fontSize: `${DIALOG_FONT_SIZE}px`,
        fill: '#000000',
        wordWrap: true
      }
    );
    this.text.setWordWrapWidth(DIALOG_TEXT_WIDTH, true);

    this.add(this.whiteBorder);
    this.add(this.redBorder);
    this.add(this.whiteBackground);
    this.add(this.text);

    this.scene.add.existing(this);

    this.setDepth(100000000);
    this.setVisible(false);
  }

  update() {
    super.update();
  }

  showMessage(text, callback) {
    this.marina.stop();
    this.marina.inputEnabled = false;

    this.text.text = text;

    this.whiteBorder.setScale(
      DIALOG_TEXT_WIDTH + DIALOG_PADDING + DIALOG_BORDER_WIDTH * 2,
      this.text.height + DIALOG_PADDING + DIALOG_BORDER_WIDTH * 2
    );
    this.redBorder.setScale(
      DIALOG_TEXT_WIDTH + DIALOG_PADDING + DIALOG_BORDER_WIDTH,
      this.text.height + DIALOG_PADDING + DIALOG_BORDER_WIDTH,
    );
    this.whiteBackground.setScale(
      DIALOG_TEXT_WIDTH + DIALOG_PADDING,
      this.text.height + DIALOG_PADDING
    );

    this.text.x = this.whiteBackground.x - this.whiteBackground.displayWidth / 2 + DIALOG_PADDING;
    this.text.y = this.scene.game.canvas.height / 2 + 2;

    this.text.setOrigin(0, 0.5);

    this.scene.input.keyboard.once('keydown', () => {
      this.marina.inputEnabled = true;
      this.setVisible(false);
      if (callback) callback();
    });

    this.setVisible(true);
  }

  // handleInput() {
  //   if (this.visible) {
  //     this.setVisible(false);
  //   }
  // }

}