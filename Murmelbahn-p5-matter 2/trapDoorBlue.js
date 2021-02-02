class BlockBlue {
  constructor(attrs, options) {
    options = {
      isStatic: true,
      density: 0.4,
      collisionFilter: {category: blueCategory}
    }
    this.category = blueCategory
    this.x = attrs.x
    this.y = attrs.y
    this.w = attrs.w
    this.h = attrs.h
    this.color = attrs.color
    this.body = Matter.Bodies.rectangle(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h, options)
    Matter.World.add(engine.world, [this.body])
  }

  bodyActive() {
    noStroke()
    fill(this.color)
    drawBody(this.body)
  }
  bodyInactive() {
    strokeWeight(4)
    stroke(this.color)
    noFill()
    drawBody(this.body)
  }
}
