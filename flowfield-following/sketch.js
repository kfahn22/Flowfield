/* Created for WCC Resistance

I have made a couple of small changes to Daniel's flowfield sketch
https://editor.p5js.org/natureofcode/sketches/egribz8WV

1.  I have altered the way the flowfield is calculated.
2.  I have substituted fish for the triangles he uses as the boids.
3.  I have added one extra fish (red) that swims against the flowfield.

You can find a excellant explanation of this sketch in   The Nature of Code by Daniel Shiffman 
http://natureofcode.com
https://natureofcode.com/autonomous-agents/#flow-fields
or in the Nature of Code track on the website
https://thecodingtrain.com/tracks/the-nature-of-code-2
*/

// Flow Field Following
// Via Reynolds: http://www.red3d.com/cwr/steer/FlowFollow.html

// Using this variable to decide whether to draw all the stuff
let debug = true;

// Flowfield object
let flowfield;
// An ArrayList of vehicles
let vehicles = [];
let rebel;
let sqrt2, sqrt3;
let img, spacing;

// https://www.nasa.gov/wp-content/uploads/2024/12/ngc602-5ddbfb.jpg
function preload() {
  img = loadImage("assets/sky2.jpg");
  //img = loadImage("assets/delta.png")
}
function setup() {
  let text = createP(
    "Hit space bar to toggle debugging lines.<br>Click the mouse to generate a new flow field."
  );
  cols = img.width;
  rows = img.height;
  spacing = 10;

  createCanvas(spacing * cols, spacing * rows);

  sqrt2 = sqrt(2);
  sqrt3 = sqrt(3);

  // Make a new flow field with "resolution" of 10
  flowfield = new FlowField(spacing, img);
  // flowfield.gridArray()
  // Make a whole bunch of vehicles with random maxspeed and maxforce values
  for (let i = 0; i < 120; i++) {
    vehicles.push(
      new Vehicle(
        random(width),
        random(height),
        random(2, 5),
        random(0.1, 0.5),
        color("#F89E4F"),
        false
      )
    );
  }

  rebel = new Vehicle(
    random(width),
    random(height),
    random(2, 5),
    random(0.1, 0.5),
    color("#EC015A"),
    true
  );
}

function draw() {
  background("#2DC5F4");

  // Display the flowfield in "debug" mode
  if (debug) flowfield.show();
  // Tell all the vehicles to follow the flow field
  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].follow(flowfield);
    vehicles[i].run();
  }
  push();
  rebel.follow(flowfield);
  rebel.run();
  pop();
}

function keyPressed() {
  if (key == " ") {
    debug = !debug;
  }
}

// Make a new flowfield
function mousePressed() {
  flowfield.gridArray();
}
