// https://thecodingtrain.com/challenges/186-wfc-overlapping-model
// Adapted from https://editor.p5js.org/codingtrain/sketches/_7Pa8986g

// I asked chatGPT for help eliminating an error I was getting from p5.js due to the filter: texture needs an image and received an object. 

let sourceImage;
let DIM = 1;
let w, h;
let buffer;

function preload() {
  sourceImage = loadImage("sky.jpg");
}

function setup() {
  // Force 2D context to avoid WebGL issues
  createCanvas(sourceImage.width * DIM, sourceImage.height * DIM, P2D);

  // 2D graphics buffer (default)
  buffer = createGraphics(width, height);

  renderToBuffer(sourceImage, buffer, DIM);

  // Draw to canvas as p5.Graphics
  image(buffer, 0, 0);
  filter(GRAY);
}

function renderToBuffer(img, pg, dim) {
  img.loadPixels();
  pg.push();
  pg.noStroke();
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let idx = 4 * (i + j * img.width);
      let r = img.pixels[idx];
      let g = img.pixels[idx + 1];
      let b = img.pixels[idx + 2];
      pg.fill(r, g, b);
      //pg.stroke(50);
      pg.noStroke(5);
      pg.square(i * dim, j * dim, dim);
    }
  }
  pg.pop();
}

function mousePressed() {
  save("grid.jpg");
}
