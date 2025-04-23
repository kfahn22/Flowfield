// Created for #WCCChallenge "Filter"

// Dead simple sketch -- I am using the awesome p5.FIP library to add two filters to an image sequentially.
// Thanks for creating this library prontopablo!
// https://prontopablo.github.io/p5.FIP/

let img0, pixelate, ripple, grayscale;
let canvas, canvasSize;

let images = [];

function preload() {
  images.push(loadImage("sky2.jpg"));
}
function setup() {
  let index = floor(random(images.length));
  img0 = images[index];

  if (img0.height * 2 < windowHeight) {
    canvas = createCanvas(img0.width * 2, img0.height * 2, WEBGL);
  } else {
    canvas = createCanvas(img0.width * 1.25, img0.height * 1.25, WEBGL);
  }

  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  pixelate = createFilterShader(fip.pixelate); // Load the pixelate shader
  ripple = createFilterShader(fip.ripple); // Load the pixelate shader
  grayscale = createFilterShader(fip.grayscale);

  background(0);
  imageMode(CENTER);
  image(img0, 0, 0, width, height);

  // Set the shader uniforms. There are different shader effects that you can add and you can obviously play around with the parameters to get different effects
  pixelate.setUniform("pixelSize", 0.01); // Set the pixel size
  // ripple.setUniform("rippleFrequency", 50); // Set the ripple frequency
  // ripple.setUniform("rippleAmplitude", 0.01); // Set the ripple amplitude

  // Apply the shaders
  filter(pixelate);
  filter(grayscale);
  // filter(ripple);
}

// function mousePressed() {
// 	setup();
// }

function mousePressed() {
  save("grid.jpg");
}
