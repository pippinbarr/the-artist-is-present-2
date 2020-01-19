let personIndex = 0;

const SHORT_HAIR_COLOR = 0xFFFBEEBA;
const MID_HAIR_COLOR = 0xFFA2F3B1;
const LONG_HAIR_COLOR = 0xFF58502C;
const NECK_COLOR = 0xFFA7B7F5;
const SHIRT_HAIR_COLOR = 0xFFF5F264;
const EYE_COLOR = 0xFF000000;
const MOUTH_COLOR = 0xFFFA2500;
const SKIN_COLOR = 0xFFFA604E;
const BODY_COLOR = 0xFF1E92EA;
const T_COLOR = 0xFF8AEF5F;
const SLEEVE_COLOR = 0xFF25A344;
const BELT_COLOR = 0xFF585858;
const SHORTS_COLOR = 0xFFF7EA5D;
const PANT_COLOR = 0xFF3AEEA5;
const BOOT_COLOR = 0xFFEDC4EB;
const SHOE_COLOR = 0xFF3CF8FB;
const PALETTE = [
  EYE_COLOR, MOUTH_COLOR, SKIN_COLOR,
  BODY_COLOR, T_COLOR, SLEEVE_COLOR,
  SHORT_HAIR_COLOR, MID_HAIR_COLOR, LONG_HAIR_COLOR, SHIRT_HAIR_COLOR, NECK_COLOR,
  BELT_COLOR, PANT_COLOR, SHORTS_COLOR,
  SHOE_COLOR, BOOT_COLOR
];

const EYE_COLORS = [0xff637c62, 0xff4e8b9a, 0xff403226, 0xff0e779e];
const MOUTH_COLORS = [0xffc96c69, 0xffc96c69];
const HAIR_COLORS = [0xFF000000, 0xff583b3b, 0xff9d9b67, 0xff9d9c9c, 0xff757060, 0xff5e4b11, 0xff5b1515];
const SKIN_COLORS = [0xffc69a55, 0xffd2a7b6, 0xffd2a9cb, 0xff65331f, 0xff7e5f36];
const SHIRT_COLORS = [0xff232323, 0xff292929, 0xff361a1a, 0xff14223e, 0xff000000];
const BELT_COLORS = [0xFF000000, 0xff4a210b];
const PANT_COLORS = [0xff444342, 0xff401c09, 0xff385473, 0xff628790, 0xff434a3b];
const SHOE_COLORS = [0xFF000000, 0xff4b370c, 0xff474237];

function createPersonSprite(game) {
  personIndex++;

  let spritesheet = {
    frameWidth: 14,
    frameHeight: 35,
  }

  // Create sheets and animations from base sheet.
  let sheet = game.textures.get('person-spritesheet').getSourceImage();
  let atlasKey, anim, animKey;
  let canvasTexture, canvas, context, imageData, pixelArray;

  atlasKey = 'person-spritesheet-' + personIndex;

  // Create a canvas to draw new image data onto.
  canvasTexture = game.textures.createCanvas('person-spritesheet-temp', sheet.width, sheet.height);
  canvas = canvasTexture.getSourceImage();
  context = canvas.getContext('2d');

  // Copy the sheet.
  context.drawImage(sheet, 0, 0);

  // Get image data from the new sheet.
  imageData = context.getImageData(0, 0, sheet.width, sheet.height);
  pixelArray = imageData.data;

  // Construct our replacement palette
  const REPLACEMENTS = getReplacementPalette();

  // Iterate through every pixel in the image.
  for (var p = 0; p < pixelArray.length / 4; p++) {
    var index = 4 * p;

    var r = pixelArray[index];
    var g = pixelArray[++index];
    var b = pixelArray[++index];
    var alpha = pixelArray[++index];

    // If this is a transparent pixel, ignore, move on.
    if (alpha === 0) {
      continue;
    }

    // Iterate through the colors in the palette.
    for (let c = 0; c < PALETTE.length; c++) {
      let oldColor = Phaser.Display.Color.IntegerToColor(PALETTE[c]);
      let newColor = REPLACEMENTS[c];

      // console.log(r, g, b);

      // If the color matches, replace the color.
      if (r === oldColor.r && g === oldColor.g && b === oldColor.b && alpha === 255) {
        pixelArray[index] = newColor.a;
        pixelArray[--index] = newColor.b;
        pixelArray[--index] = newColor.g;
        pixelArray[--index] = newColor.r;
      }
    }
  }

  // Put our modified pixel data back into the context.
  context.putImageData(imageData, 0, 0);

  // Add the canvas as a sprite sheet to the game.
  game.textures.addSpriteSheet(atlasKey, canvasTexture.getSourceImage(), {
    frameWidth: spritesheet.frameWidth,
    frameHeight: spritesheet.frameHeight,
  });

  // Create animations
  createPersonAnimation(game, atlasKey, 'idle-h', personIndex, 23, 23, 10, 0);
  createPersonAnimation(game, atlasKey, 'walking-h', personIndex, 1, 8, 10, -1);
  createPersonAnimation(game, atlasKey, 'idle-u', personIndex, 22, 22, 10, 0);
  createPersonAnimation(game, atlasKey, 'walking-u', personIndex, 16, 21, 10, -1);
  createPersonAnimation(game, atlasKey, 'idle-d', personIndex, 15, 15, 10, 0);
  createPersonAnimation(game, atlasKey, 'walking-d', personIndex, 9, 14, 10, -1);

  // Destroy temp texture.
  game.textures.get('person-spritesheet-temp').destroy();

  // Destroy textures that are not longer needed.
  // NOTE: This doesn't remove the textures from TextureManager.list.
  //       However, it does destroy source image data.
  // game.textures.get('person-spritesheet').destroy();

  let sprite = new Phaser.GameObjects.Sprite(game, 0, 0, 'person-spritesheet-' + personIndex);
  sprite.id = personIndex;
  return sprite;
}

function getReplacementPalette() {

  const NEW_EYE_COLOR = Phaser.Display.Color.IntegerToColor(getRandom(EYE_COLORS));
  const NEW_MOUTH_COLOR = Phaser.Display.Color.IntegerToColor(getRandom(MOUTH_COLORS));
  const NEW_SKIN_COLOR = Phaser.Display.Color.IntegerToColor(getRandom(SKIN_COLORS));

  // THE SHIRT

  let shirtColor = Phaser.Display.Color.IntegerToColor(getRandom(SHIRT_COLORS));
  let sleeveColor = shirtColor.clone().brighten(10);

  let shirtRandom = Math.random();

  let NEW_BODY_COLOR = shirtColor;
  let NEW_T_COLOR = sleeveColor;
  let NEW_SLEEVE_COLOR = sleeveColor;

  if (shirtRandom < 0.4) {
    NEW_SLEEVE_COLOR = NEW_SKIN_COLOR;
  }
  else if (shirtRandom < 0.6) {
    NEW_T_COLOR = NEW_SKIN_COLOR;
    NEW_SLEEVE_COLOR = NEW_SKIN_COLOR;
  }

  // The hair
  let hairRandom = Math.random();

  const TRANSPARENT = Phaser.Display.Color.IntegerToColor(0x00000000).transparent();

  // Default: short hair
  const MAIN_HAIR_COLOR = Phaser.Display.Color.IntegerToColor(getRandom(HAIR_COLORS));
  const NEW_SHORT_HAIR_COLOR = MAIN_HAIR_COLOR;
  let NEW_MID_HAIR_COLOR = TRANSPARENT;
  let NEW_LONG_HAIR_COLOR = TRANSPARENT;
  // console.log(TRANSPARENT);
  let NEW_SHIRT_HAIR_COLOR = NEW_BODY_COLOR;
  let NEW_NECK_COLOR = NEW_SKIN_COLOR;

  if (hairRandom < 0.3) {
    // Medium hair
    NEW_MID_HAIR_COLOR = MAIN_HAIR_COLOR;
  }
  else if (hairRandom < 0.6) {
    // Long hair
    NEW_MID_HAIR_COLOR = MAIN_HAIR_COLOR;
    NEW_LONG_HAIR_COLOR = MAIN_HAIR_COLOR;
    NEW_NECK_COLOR = MAIN_HAIR_COLOR;
    NEW_SHIRT_HAIR_COLOR = MAIN_HAIR_COLOR;
  }

  // Belt
  let beltRandom = Math.random();

  let NEW_BELT_COLOR = Phaser.Display.Color.IntegerToColor(getRandom(BELT_COLORS));

  // 70% change of no belt
  if (beltRandom < 0.7) {
    NEW_BELT_COLOR = shirtColor;
  }

  // Everyone wears pants in this world
  const NEW_PANT_COLOR = Phaser.Display.Color.IntegerToColor(getRandom(PANT_COLORS));;
  const NEW_SHORTS_COLOR = NEW_PANT_COLOR;

  // Shoes/boots

  let shoeRandom = Math.random();

  let NEW_SHOE_COLOR = Phaser.Display.Color.IntegerToColor(getRandom(SHOE_COLORS));
  let NEW_BOOT_COLOR = NEW_SHOE_COLOR;

  if (shoeRandom < 0.3) {
    NEW_BOOT_COLOR = NEW_PANT_COLOR;
  }

  return [
    NEW_EYE_COLOR,
    NEW_MOUTH_COLOR,
    NEW_SKIN_COLOR,
    NEW_BODY_COLOR,
    NEW_T_COLOR,
    NEW_SLEEVE_COLOR,
    NEW_SHORT_HAIR_COLOR,
    NEW_MID_HAIR_COLOR,
    NEW_LONG_HAIR_COLOR,
    NEW_SHIRT_HAIR_COLOR,
    NEW_NECK_COLOR,
    NEW_BELT_COLOR,
    NEW_PANT_COLOR,
    NEW_SHORTS_COLOR,
    NEW_SHOE_COLOR,
    NEW_BOOT_COLOR,
  ];
}

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function createPersonAnimation(game, spritesheet, name, index, start, end, framerate, repeat) {
  if (game.anims.get(name + '-' + index) !== undefined) return;

  let frames = game.anims.generateFrameNames(spritesheet, {
    start: start - 1,
    end: end - 1,
  });

  let config = {
    key: name + '-' + index,
    frames: frames,
    frameRate: framerate,
    repeat: repeat,
  };

  game.anims.create(config);
}