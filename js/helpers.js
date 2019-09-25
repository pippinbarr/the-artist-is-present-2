function createColliderRect(self, x, y, width, height, group) {
  let p = self.physics.add.sprite(x, y, 'atlas', 'red-pixel.png');
  p.setOrigin(0, 0);
  p.visible = false;
  p.setScale(width, height);
  p.body.immovable = true;
  group.add(p);
}

function createColliderLine(self, fromX, fromY, distX, distY, dX, dY, group) {
  // we need a diagonal, so we'll make it out of dots
  let x = 0;
  let y = 0;
  while (Math.abs(x) <= distX && Math.abs(y) <= distY) {
    let p = self.physics.add.sprite(fromX + x, fromY + y, 'atlas', 'red-pixel.png');
    p.setOrigin(0, 0);
    p.setScale(1, 1);
    p.body.immovable = true;
    group.add(p);
    x += dX;
    y += dY;
  }
}