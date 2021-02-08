// Benno Stäbler, Benedikt Groß
// additional dependencies
// pathseg.js https://github.com/progers/pathseg
// decomp.js https://github.com/schteppe/poly-decomp.js/
Matter.use('matter-attractors');

const Body = Matter.Body
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

let engine;

let ball;
let ball2

let ballImg;
let magnetImg1;
let magnetImg2;
let switchButtonImg;
let blockBlueImg;
let blockRedImg;
let blockPassiveImg;
let trapDoorImg;
let redTrapDoorImg1;
let redTrapDoorImg2;
let blueTrapDoorImg1;
let blueTrapDoorImg2;
let bahnImg;

let path;
let switchState = true;
let trapDoorState1 = true;
let trapDoorState2 = true;

let blocks = []

let flute1;
let flute2;
let flute3;
let flute4;

let hitSound = []
let min = 0
let max = 3
let x;

let song;

let redBlocks = []
let blueBlocks = []
let redTrapDoors = []
let blueTrapDoors = []
let walls = []
let trapDoors = []
let grounds = []

let switchButton
let button1
let button2

let magnet;
let constraint1;
let direction = 1.5;
let move = {x: 620, y: 460 };
let on_off = 0.0

let defaultCategory = 0x0001,
    redCategory = 0x0002,
    greenCategory = 0x0004,
    blueCategory = 0x0008;
    yellowCategory = 0x0016;


function preload() {
  //createCanvas (1350, 1750);
  httpGet("./path.svg", "text", false, function(response) {
  // when the HTTP request completes ...
  // 1. parse the svg and get the path
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(response, "image/svg+xml");
  const svgPathElement = svgDoc.querySelector("path");
  // 2. setup all matter.js related things

  setupMatter(svgPathElement);
  });

  song = loadSound("./sounds/Synthwave2.mp3");

}


function setup() {

  createCanvas (1350, 2202);
  ballImg = loadImage('images/ball.png');
  magnetImg1 = loadImage('images/tile024.png');
  magnetImg2 = loadImage('images/tile025.png');
  switchButtonImg1 = loadImage('images/tile046.jpg');
  switchButtonImg2 = loadImage('images/tile047.jpg');
  blockBlueImg = loadImage('images/tile038.png');
  blockRedImg = loadImage('images/tile039.png');
  trapDoorImg = loadImage('images/tile040.png');
  bahnImg = loadImage('images/bahn.png');
  blockPassiveImg = loadImage('images/tile037.png');
  redTrapDoorImg1 = loadImage('images/tile041.png');
  redTrapDoorImg2 = loadImage('images/tile043.png');
  blueTrapDoorImg1 = loadImage('images/tile042.png');
  blueTrapDoorImg2 = loadImage('images/tile044.png');

  flute1 = loadSound("./sounds/Flute1.mp3");
  flute2 = loadSound("./sounds/Flute2.mp3");
  flute3 = loadSound("./sounds/Flute3.mp3");
  flute4 = loadSound("./sounds/Flute4.mp3");

  hitSound.push(flute1, flute2, flute3, flute4);

//Background Music
  song.play();

}

function setupMatter(svgPathElement) {
  console.log("setupMatter")
  // createCanvas (1350, 1750);
  engine = Engine.create();
  // use the path from the svg file to create the corresponding matter object
  path = bodyFromPath(svgPathElement,670,1038, { isStatic: true, friction: 0.0 });
  // createCanvas(500, 500);

  // 1. Abschnitt ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
  switchButton = new Wall({ x: 622, y: 14, w: 30, h: 30, color: 'white'}, {isStatic: true})
  walls.push(new Wall({ x: 587, y: 0, w: 100, h: 60, color: 'pink'}, {isStatic: true}))

  redBlocks.push(new BlockRed({ x: 150, y: 95, w: 30, h: 30, color: 'red' }, {isStatic: true,
  density: 0.4,
  collisionFilter: {category: redCategory}, angle: 0.15}))

  blueBlocks.push(new BlockBlue({ x: 300, y: 118, w: 30, h: 30, color: 'blue' }, {isStatic: true,
  density: 0.4,
  collisionFilter: {category: blueCategory}, angle: 0.15}))

  blueTrapDoors.push(new BlockBlue({ x: 480, y: 171, w: 80, h: 15, color: 'blue' }, {isStatic: true,
  density: 0.4,
  collisionFilter: {category: blueCategory}}))

  redTrapDoors.push(new BlockRed({ x: 710, y: 171, w: 80, h: 15, color: 'blue' }, {isStatic: true,
  density: 0.4,
  collisionFilter: {category: redCategory},}))

  trapDoors.push(new TrapDoor({ x: 910, y: 170, w: 200, h: 15, color: 'yellow' }))


  blueBlocks.push(new BlockBlue({ x: 1250, y: 479, w: 30, h: 30, color: 'blue' }, {isStatic: true,
  density: 0.4,
  collisionFilter: {category: blueCategory}, angle: -0.12}))
  blueBlocks.push(new BlockBlue({ x: 1220, y: 483, w: 30, h: 30, color: 'blue' }, {isStatic: true,
  density: 0.4,
  collisionFilter: {category: blueCategory}, angle: -0.12}))
  blueBlocks.push(new BlockBlue({ x: 1238, y: 450, w: 30, h: 30, color: 'blue' }, {isStatic: true,
  density: 0.4,
  collisionFilter: {category: blueCategory}, angle: -0.12}))

  redBlocks.push(new BlockRed({ x: 1060, y: 385, w: 30, h: 30, color: 'red' }, {isStatic: true,
  density: 0.4,
  collisionFilter: {category: redCategory}, angle: 0.17}))

  redBlocks.push(new BlockRed({ x: 1050, y: 502, w: 30, h: 30, color: 'red' }, {isStatic: true,
  density: 0.4,
  collisionFilter: {category: redCategory}, angle: -0.12}))

  blueBlocks.push(new BlockBlue({ x: 870, y: 523, w: 30, h: 30, color: 'blue' }, {isStatic: true,
  density: 0.4,
  collisionFilter: {category: blueCategory}, angle: -0.1}))
  blueBlocks.push(new BlockBlue({ x: 900, y: 520, w: 30, h: 30, color: 'blue' }, {isStatic: true,
  density: 0.4,
  collisionFilter: {category: blueCategory}, angle: -0.1}))

  blueBlocks.push(new BlockBlue({ x: 250, y: 752, w: 30, h: 30, color: 'red' }, {isStatic: true,
  density: 0.4,
  collisionFilter: {category: blueCategory}, angle: -0.75}))
  blueBlocks.push(new BlockBlue({ x: 215, y: 745, w: 30, h: 30, color: 'red' }, {isStatic: true,
  density: 0.4,
  collisionFilter: {category: blueCategory}}))
  blueBlocks.push(new BlockBlue({ x: 215, y: 775, w: 30, h: 30, color: 'red' }, {isStatic: true,
  density: 0.4,
  collisionFilter: {category: blueCategory}}))


  for (let i = 0; i < 10; i ++) {
    walls.push(new Wall({ x: 1060 + 20*i, y: 100, w: 5, h: 30, color: 'darkOrchid' }, { isStatic: false, label: "Domino", density: 0.6, friction: 0.5, frictionStatic: 1}))
  }

  // 2. Abschnitt ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### ##### #####
  trapDoors.push(new TrapDoor({ x: 0, y: 480, w: 177, h: 15, color: 'yellow' }))
  blueBlocks.push(new BlockBlue({ x: 607, y: 1094, w: 30, h: 42, color: 'red' }, {isStatic: true,
  density: 0.4,
  collisionFilter: {category: blueCategory}}))
  redTrapDoors.push(new BlockRed({ x: 637, y: 1129, w: 46, h: 15, color: 'blue' }, {isStatic: true,
  density: 0.4,
  collisionFilter: {category: redCategory}}))

  grounds.push(new Ground({ x: 470, y: 240, w: 95, h: 15, color: 'yellow'}, {isStatic: true, label: "Spike"}))
  grounds.push(new Ground({ x: 700, y: 240, w: 95, h: 15, color: 'yellow'}, {isStatic: true, label: "Spike"}))
  grounds.push(new Ground({ x: 500, y: 790, w: 250, h: 15, color: 'yellow'}, {isStatic: true, label: "Spike"}))

  walls.push(new Wall({ x: 1288, y: 80, w: 1600, h: 95, color: 'white'}, {isStatic: true}))
  walls.push(new Wall({ x: -28, y: 420, w: 80, h: 600, color: 'white'}, {isStatic: true}))


  button1 = new Button({ x: 1268, y: 120, w: 20, h: 40, color: 'green'}, {isStatic: true, label: "Button1"})
  button2 = new Button({ x: 185, y: 747, w: 20, h: 40, color: 'green'}, {isStatic: true, label: "Button2"})

  ball2 = new Ball({ x: 50, y: 380, color: '255', size: 20 }, {
    isStatic: false,
    restitution: 0.3,
    density: 0.2,
    friction: 0,
    frictionAir: 0,
    frictionStatic: 0,
    collisionFilter: {
      category: defaultCategory,
      mask: defaultCategory | yellowCategory
    },
    label: "Ball"
  })


  for (let a = 2; a < 8; a ++) {
    for (let i = 0; i < a; i ++) {
      blocks.push(new Galton({ x: 740 -a*75 + i*150, y: 1350 + a*70, color: 'blue', size: 60 }, { isStatic: true, label: "Galton" }))
    }
  }


  function collision(event) {
    let pairs = event.pairs[0];
      let labelA = pairs.bodyA.label;
      let labelB = pairs.bodyB.label;
      if (labelA == 'Button1' && labelB == 'Domino') {
        trapDoors[0].removeBody()
        trapDoorState1 = false;
      }
      if (labelA == 'Domino' && labelB == 'Button1') {
        trapDoors[0].removeBody()
        trapDoorState1 = false;
      }
      if (labelA == 'Button2' && labelB == 'Ball') {
        trapDoors[1].removeBody()
        trapDoorState2 = false;
      }
      if (labelA == 'Ball' && labelB == 'Button2') {
        trapDoors[1].removeBody()
        trapDoorState2 = false;
      }
      if (labelA == 'Ball' && labelB == 'Spike') {
        ball.removeBody()
        ball = new Ball({ x: 100, y: 50, color: '255', size: 20 }, {
          isStatic: false,
          restitution: 0.3,
          density: 0.2,
          friction: 0,
          frictionAir: 0,
          frictionStatic: 0,
          collisionFilter: {
            category: defaultCategory,
            mask: defaultCategory  | redCategory | greenCategory | yellowCategory
          },
          label: "Ball"
        })
      }
      if (labelA == 'Spike' && labelB == 'Ball') {
        ball.removeBody()
        ball = new Ball({ x: 100, y: 50, color: '255', size: 20 }, {
          isStatic: false,
          restitution: 0.3,
          density: 0.2,
          friction: 0,
          frictionAir: 0,
          frictionStatic: 0,
          collisionFilter: {
            category: defaultCategory,
            mask: defaultCategory  | redCategory | greenCategory | yellowCategory
          },
          label: "Ball"
        })
      }
      if (labelA == 'Galton' && labelB == 'Ball') {
        hitSound[x].play();
      }
      if (labelA == 'Ball' && labelB == 'Galton') {
        hitSound[x].play();
      }
  }

  Matter.Events.on(engine, 'collisionStart', collision)

  magnet = new Magnet({x: move.x, y: move.y, w: 50, h: 50, color: 'green'}, {
    isStatic: true,
    collisionFilter: {
      category: defaultCategory,
      mask: defaultCategory
    },
    plugin: {
      attractors: [
        function(body1, body2) {
          return {
            x: (magnet.body.position.x - ball.body.position.x) * 1e-3 * on_off,
            y: (magnet.body.position.y - ball.body.position.y) * 2e-3 * on_off,
          };
          console.log(x)
        }
      ]
    }
  }
);
constraint1 = Constraint.create({
  pointA: { x: 0, y: 300 }, bodyB: magnet.body, pointB: { x: 0, y: 0 }
});


World.add(engine.world, [magnet, constraint1]);

ball = new Ball({ x: 100, y: 50, color: '255', size: 20 }, {
  isStatic: false,
  restitution: 0.3,
  density: 0.2,
  friction: 0,
  frictionAir: 0,
  frictionStatic: 0,
  collisionFilter: {
    category: defaultCategory,
    mask: defaultCategory | redCategory | greenCategory | yellowCategory
  },
  label: "Ball"
})


  World.add(engine.world, [path]);
  Engine.run(engine);
}

function showState() {
  if (switchState == true) {
    redBlocks.forEach((blockRed, i) => {
      drawSprite(blockRed.body, blockRedImg, 0, 0, 30, 30);
    });
    redTrapDoors.forEach((redTrapDoor, i) => {
      drawSprite(redTrapDoor.body, redTrapDoorImg1, 0, 0, 90, 15);
    });
    blueBlocks.forEach((blockBlue, i) => {
      drawSprite(blockBlue.body, blockPassiveImg, 0, 0, 30, 30);
    });
    blueTrapDoors.forEach((blueTrapDoor, i) => {
      drawSprite(blueTrapDoor.body, blueTrapDoorImg2, 0, 0, 90, 15);
    });
    ball.body.collisionFilter.mask = defaultCategory | redCategory | greenCategory | yellowCategory
    ball2.body.collisionFilter.mask = defaultCategory | redCategory | greenCategory | yellowCategory
  }

  if (switchState == false) {
    redBlocks.forEach((blockRed, i) => {
      drawSprite(blockRed.body, blockPassiveImg, 0, 0, 30, 30);
    });
    redTrapDoors.forEach((redTrapDoor, i) => {
      drawSprite(redTrapDoor.body, redTrapDoorImg2, 0, 0, 90, 15);
    });
    blueBlocks.forEach((blockBlue, i) => {
      drawSprite(blockBlue.body, blockBlueImg, 0, 0, 30, 30);
    });
    blueTrapDoors.forEach((blueTrapDoor, i) => {
      drawSprite(blueTrapDoor.body, blueTrapDoorImg1, 0, 0, 90, 15);
    });

    ball.body.collisionFilter.mask = defaultCategory | blueCategory | greenCategory
    ball2.body.collisionFilter.mask = defaultCategory | blueCategory | greenCategory
  }
}

function showSwitch() {
  if (switchState == true) {
    drawSprite(switchButton.body, switchButtonImg1, 0, 0, 30, 30);
  }

  if (switchState == false) {
    drawSprite(switchButton.body, switchButtonImg2, 0, 0, 30, 30);
  }
}

function draw() {
  // do nothing if variable path is empty
  if (!path) return;
  // background(0);
  clear();

  //Random Sound
  x = round(random(min, max));



  //Bewegung Magnet
  move.x = magnet.body.position.x + direction
  if(move.x > 800){
  direction = -1.5
  }
  if(move.x < 460){
    direction = 1.5
  }
  Body.setPosition(magnet.body, {x: move.x, y: move.y});

  stroke(128);
  strokeWeight(2);
  drawConstraint(constraint1);

  magnet.show();

  //On Off Magnet
  if (keyIsDown(66) && ball.body.position.y > 500) {
    on_off = 1
    drawSprite(magnet.body, magnetImg2, 0, 0, 106, 106)
    console.log("Magnet AN")
  }
  else{
    on_off = 0
    drawSprite(magnet.body, magnetImg1, 0, 0, 106, 106)
  }

  fill(255);
  noStroke();
  // drawVertices(ball);

  scrollFollow(ball2.body);

  if (trapDoorState1 == true) {
    drawSprite(trapDoors[0].body, trapDoorImg, 0, 0, 200, 15)
  }
  if (trapDoorState2 == true) {
    drawSprite(trapDoors[1].body, trapDoorImg, 0, 0, 190, 15)
  }


  blocks.forEach((block, i) => {
    block.show()
  });

  walls.forEach((wall, i) => {
    wall.show()
  });
  button1.show()
  button2.show()
  // ball.show()
  // ball2.show()

  // fill(10, 0, 20)

  strokeWeight(0.5);
  noStroke();


  // drawBody(path);
  showState()

  drawSprite(ball.body, ballImg, 0, 0, 47, 47);
  drawSprite(ball2.body, ballImg, 0, 0, 47, 47);
  //drawSprite(path, bahnImg, 210, 151, 1350, 2202);
  drawSprite(path, bahnImg, 4, 63, 1350, 2202);

  showSwitch()
}



function keyPressed() {
  switch (keyCode) {
    case 66:
      console.log('B')
      switchState = !switchState
    break;
    case 86 :
      console.log('V')
      trapDoors[1].removeBody()
      trapDoorState2 = false;
    break;
    default:
      console.log("KeyCode ist: " + keyCode)
  }
}

function scrollFollow(matterObj) {
  if (insideViewport(matterObj) == false) {
    const $element = $('html, body');
    if ($element.is(':animated') == false) {
      $element.animate({
        scrollLeft: ball2.body.position.x,
        scrollTop: ball2.body.position.y
      }, 1000);
    }
  }
}

function insideViewport(matterObj) {
  const x = matterObj.position.x;
  const y = matterObj.position.y;
  const pageXOffset = window.pageXOffset || document.documentElement.scrollLeft;
  const pageYOffset  = window.pageYOffset || document.documentElement.scrollTop;
  if (x >= pageXOffset && x <= pageXOffset + windowWidth &&
      y >= pageYOffset && y <= pageYOffset + windowHeight) {
    return true;
  } else {
    return false;
  }
}

function drawConstraint(constraint) {
  const offsetA = constraint.pointA;
  // move.x = move.x + 1

  let posA = {
    x: move.x,
    y: 0
  };
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  const offsetB = constraint.pointB;
  //move.x = move.x + 1
  let posB = {
    x: move.x,
    y: 0
  };
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
}

function drawVertices(vertices) {
  beginShape();
  for (let i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}

function bodyFromPath(path, x, y, options) {
  const body = Matter.Bodies.fromVertices(
    x,
    y,
    Matter.Svg.pathToVertices(path, 20),
    options
  );
  return body;
}

function drawBody(body) {
  if (body.parts && body.parts.length > 1) {
    for (let p = 1; p < body.parts.length; p++) {
      drawVertices(body.parts[p].vertices)
    }
  } else {
    drawVertices(body.vertices);
  }
}

function drawSprite(body, img, x, y, w, h) {
  const pos = body.position;
  const angle = body.angle;
  push();
  translate(pos.x, pos.y);
  rotate(angle);
  imageMode(CENTER);
  image(img, x, y, w, h);
  pop();
}
