// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flow Field Following

class FlowField {
  constructor(r, img) {
    this.resolution = r;
    this.img = img;
    this.cols = this.img.width;
    this.rows = this.img.height;

    // Initialize the field array with all vectors in the same direction
    this.field = Array(this.cols)
      .fill()
      .map(() => Array(this.rows).fill(createVector(1, 0)));
    this.gridArray();
  }

  // This function assigns an angle from [0, TWO_PI] to each position in the field array based on the value of r.
  gridArray() {
    this.img.loadPixels();
    for (let i = 0; i < this.img.width; i++) {
      for (let j = 0; j < this.img.height; j++) {
        let index = (i + j * this.img.width) * 4;
        let r = this.img.pixels[index + 0];
        if (r < 16) {
          this.field[i][j] = createVector(1, 0);
        } else if (r >= 16 && r < 32) {
          this.field[i][j] = createVector(sqrt3 / 2, 0.5);
        } else if (r >= 32 && r < 48) {
          this.field[i][j] = createVector(sqrt2 / 2, sqrt2 / 2);
        } else if (r >= 48 && r < 64) {
          this.field[i][j] = createVector(0.5, sqrt3 / 2);
        } else if (r >= 64 && r < 80) {
          this.field[i][j] = createVector(0, 1);
        } else if (r >= 80 && r < 96) {
          this.field[i][j] = createVector(-0.5, sqrt3 / 2);
        } else if (r >= 96 && r < 112) {
          this.field[i][j] = createVector(-sqrt2 / 2, sqrt2 / 2);
        } else if (r >= 112 && r < 128) {
          this.field[i][j] = createVector(-sqrt3 / 2, 1 / 2);
        } else if (r >= 128 && r < 144) {
          this.field[i][j] = createVector(-1, 0);
        } else if (r >= 144 && r < 160) {
          this.field[i][j] = createVector(-sqrt3 / 2, -1 / 2);
        } else if (r >= 160 && r < 176) {
          this.field[i][j] = createVector(-sqrt2 / 2, -sqrt2 / 2);
        } else if (r >= 176 && r < 192) {
          this.field[i][j] = createVector(-1 / 2, -sqrt3 / 2);
        } else if (r >= 192 && r < 208) {
          this.field[i][j] = createVector(0, -1);
        } else if (r >= 208 && r < 224) {
          this.field[i][j] = createVector(1 / 2, -sqrt3 / 2);
        } else if (r >= 2224 && r < 240) {
          this.field[i][j] = createVector(sqrt2 / 2, -sqrt2 / 2);
        } else if (r >= 240) {
          this.field[i][j] = createVector(sqrt3 / 2, -1 / 2);
        }
      }
    }
  }

  // Optional for debugging - draw every vector
  show() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        let w = width / this.cols;
        let h = height / this.rows;
        let v = this.field[i][j].copy();
        v.setMag(w * 0.5);
        let x = i * w + w / 2;
        let y = j * h + h / 2;
        stroke(0);
        strokeWeight(0.8);
        line(x, y, x + v.x, y + v.y);
      }
    }
  }

  //A function to return a p5.Vector based on a position
  lookup(position) {
    let column = constrain(
      floor(position.x / this.resolution),
      0,
      this.cols - 1
    );
    let row = constrain(floor(position.y / this.resolution), 0, this.rows - 1);
    return this.field[column][row].copy();
  }
}
