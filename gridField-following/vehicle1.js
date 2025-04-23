// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The "Vehicle" class

class Vehicle {
  constructor(x, y, r, ms, mf, col, rebel) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.r = r;
    this.maxspeed = ms;
    this.maxforce = mf;
    this.col = col;
    this.rebel = rebel;
  }

  run() {
    this.update();
    this.borders();
    this.show();
  }

  // Implementing Reynolds' flow field following algorithm
  // http://www.red3d.com/cwr/steer/FlowFollow.html
  // follow(flow) {
  //   // What is the vector at that spot in the flow field?
  //   let desired = flow.lookup(this.position);
  //   // Scale it up by maxspeed
  //   desired.mult(this.maxspeed);
  //   // Steering is desired minus velocity
  //   let steer = p5.Vector.sub(desired, this.velocity);
  //   steer.limit(this.maxforce); // Limit to maximum steering force
  //   this.applyForce(steer);
  // }
  follow(flow) {
    // What is the vector at that spot in the flow field?
    let desired = flow.lookup(this.position);
    // Scale it up by maxspeed
    desired.mult(this.maxspeed);
    // Steering is desired minus velocity
    let steer = p5.Vector.sub(desired, this.velocity);

    steer.limit(this.maxforce); // Limit to maximum steering force
    if (this.rebel == false) {
      push();
      this.applyForce(steer);
      pop();
    } else {
      push();
      this.repelForce(steer);
      pop();
    }
    //this.applyForce(steer);
  }

  // applyForce(force) {
  //   // We could add mass here if we want A = F / M
  //   if ((this.rebel = false)) {
  //     this.acceleration.add(force);
  //   } else {
  //     this.acceleration.sub(force);
  //   }
  // }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    // if ((this.rebel = false)) {
    this.acceleration.sub(force);
    // } else {
    //   this.acceleration.sub(force);
    // }
  }

  repelForce(force) {
    // We could add mass here if we want A = F / M
    // if ((this.rebel = false)) {
    this.acceleration.add(force);
    // } else {
    //   this.acceleration.sub(force);
    // }
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    //this.position.sub(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  // Wraparound
  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  //https://mathcurve.com/courbes2d.gb/poisson/poisson.shtml
  // https://mathcurve.com/courbes2d.gb/poisson/poisson.shtml
  fish(r) {
    fill(this.col);
    noStroke();
    beginShape();
    for (let theta = -TWO_PI; theta < TWO_PI; theta += 0.05) {
      let v0 = r * 0.75 * (cos(theta) + 2 * 2 * cos(theta / 2));
      let v1 = r * 1.0 * sin(theta);
      vertex(v0, v1);
    }
    endShape(CLOSE);

    fill(255);
    circle(2.5 * r, 0, r * 0.8);
    fill(0);
    circle(2.6 * r, 0, r * 0.5);
  }

  show() {
    // Draw a triangle rotated in the direction of velocity
    let theta = this.velocity.heading();
    //let theta = PI + this.velocity.heading();
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    this.fish(this.r);
    pop();
  }
}
