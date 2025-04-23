// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flow Field Following

class FlowField {
  constructor(r) {
    this.resolution = r;
    //{!2} Determine the number of columns and rows.
    this.cols = width / this.resolution;
    this.rows = height / this.resolution;
    //{!4} A flow field is a two-dimensional array of vectors. The example includes as separate function to create that array
    this.field = new Array(this.cols);
    for (let i = 0; i < this.cols; i++) {
      this.field[i] = new Array(this.rows);
    }
    this.init();
  }

  // The init() function fills the 2D array with vectors
  init() {
    // Reseed noise for a new flow field each time
    noiseSeed(random(10000));
    let xoff = 0;
    let maxD = dist(width / 2, height / 2, 0, 0);

    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {
        //{.code-wide} In this example, use Perlin noise to create the vectors.

        let d = dist(
          width / 2,
          height / 2,
          i * this.resolution,
          j * this.resolution
        );
        //let angle = map(d, 0, maxD, -TWO_PI, TWO_PI);
        let angle = map(d, 0, maxD, radians(10), 4 * PI);
        //let angle = map(noise(xoff, yoff), 0, 1, 0, 4*PI);

        let dir = 1;

        let r = dir * pow(angle, 1); // spiral

        //let r = 1;
        let x = cos(angle);
        let y = sin(angle);

        this.field[i][j] = createVector(x, y);
        //this.field[i][j].normalize();
        //this.field[i][j] = p5.Vector.fromAngle(angle);
        //}

        yoff += 0.1;
      }
      xoff += 0.1;
    }
  }

  // https://mathcurve.com/courbes2d.gb/archimede/archimede.shtml
  // https://mathcurve.com/courbes2d.gb/spirale/spirale.shtml
  // this.n = 1 Archimedian Spiral
  // this.n = -1 Hyperbolic Spiral
  // this.n = 1/2 Fermat spiral
  // this.n = -1/2 Lituus spiral
  // this.n = 2 Galilean spiral
  spiral() {
    //let a = 0.1;
    let dir = -1;
    for (let theta = 0; theta < 4 * PI; theta += 0.05) {
      let r = dir * this.a * pow(theta, this.n);
      //let r = this.a * pow(theta, this.n);
      let x = this.r * r * cos(theta);
      let y = this.r * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  //   // The init() function fills the 2D array with vectors
  //   init() {
  //     // Reseed noise for a new flow field each time
  //     noiseSeed(random(10000));
  //     let xoff = 0;
  //     for (let i = 0; i < this.cols; i++) {
  //       let yoff = 0;
  //       for (let j = 0; j < this.rows; j++) {
  //         //{.code-wide} In this example, use Perlin noise to create the vectors.
  //         //let angle = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
  //         let r = 0.1
  //         for (let k = 0; k < TWO_PI; k+=1) {
  //           let x = i/this.cols * cos(k);
  //           let y = j/this.rows * sin(k);
  //           this.field[i][j] = createVector(x, y);
  //           this.field[i][j].normalize()
  //           // this.field[i][j] = p5.Vector.fromAngle(angle);
  //         }

  //         // yoff += 0.1;
  //       }
  //       // xoff += 0.1;
  //     }
  //   }

  // Draw every vector
  show() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        let w = width / this.cols;
        let h = height / this.rows;
        let v = this.field[i][j].copy();
        v.setMag(w * 0.5);
        let x = i * w + w / 2;
        let y = j * h + h / 2;
        let c = color("#66D334");

        c[3] = 150;
        stroke(0);
        strokeWeight(0.8);
        line(x, y, x + v.x, y + v.y);
        // line(x, y, x + 2 * v.x, y + 2 * v.y);
      }
    }
  }

  //{.code-wide} A function to return a p5.Vector based on a position
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
