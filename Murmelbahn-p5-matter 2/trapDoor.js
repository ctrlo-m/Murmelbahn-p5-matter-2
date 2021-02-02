class TrapDoor {
  constructor(attrs, options) {
    options = {
      isStatic: true,
      density: 0.4,
      collisionFilter: {category: yellowCategory}
    }
    this.category = yellowCategory
    this.x = attrs.x
    this.y = attrs.y
    this.w = attrs.w
    this.h = attrs.h
    this.color = attrs.color
    this.body = Matter.Bodies.rectangle(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h, options)
    Matter.World.add(engine.world, [this.body])
  }

  removeBody() {
    Matter.World.remove(engine.world, this.body)
  }

  bodyActive() {
    noStroke()
    fill('yellow')
    drawBody(this.body)
  }
  bodyInactive() {
    strokeWeight(4)
    stroke('yellow')
    noFill()
    drawBody(this.body)
  }
}
