class BlockRed {
  constructor(attrs, options) {
    options = {
      isStatic: true,
      density: 0.4,
      collisionFilter: {category: redCategory}
    }
    this.category = redCategory
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
    fill('red')
    drawBody(this.body)
  }
  bodyInactive() {
    strokeWeight(4)
    stroke('red')
    noFill()
    drawBody(this.body)
  }
}
