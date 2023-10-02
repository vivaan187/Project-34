class PlayerBullets {
  constructor(x, y, width, height) {
    var options = {
      isStatic: false,
      density: 0.1
    };
    this.width = width;
    this.height = height;

    this.body = Bodies.rectangle(x, y, this.width, this.height, options);
    
    this.image = loadImage("./assets/Bullet1.png");
    World.add(world, this.body);
  }

  shoot() {
    Matter.Body.setVelocity(this.body, { x: 10, y: -0.5 });
  }

  display() {
    var pos = this.body.position;

    push();
    translate(pos.x, pos.y);
    imageMode(CENTER);
    rect(0, 0, this.width, this.height);
    pop();
  }
}
