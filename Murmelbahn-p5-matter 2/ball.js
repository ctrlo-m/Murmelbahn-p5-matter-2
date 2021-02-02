class Ball {
  constructor(attrs, options) {
    // options = {
    //   isStatic: false,
    //   restitution: 0.3,
    //   density: 0.2,
    //   friction: 0,
    //   frictionAir: 0,
    //   frictionStatic: 0,
    //   collisionFilter: {
    //     category: defaultCategory,
    //     mask: defaultCategory  | redCategory | greenCategory | yellowCategory
    //   },
    //   label: "Ball"
    // }
    this.category = defaultCategory
    this.x = attrs.x
    this.y = attrs.y
    this.color = attrs.color
    this.size = attrs.size
    this.body = Bodies.circle(this.x, this.y, this.size, options)
    World.add(engine.world, [this.body])
  }

  removeBody() {
    Matter.World.remove(engine.world, this.body)
  }

  show() {
    noStroke()
    fill(this.color)
    drawBody(this.body)
  }
}
