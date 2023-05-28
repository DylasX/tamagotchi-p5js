// preload
let room,
  bed,
  fridge,
  cursor,
  sink,
  tv,
  toilet,
  poop,
  poopNeedBadly,
  poopNoNeed,
  hungerHungry,
  hungerVeryHungry,
  hungerNotHungry,
  thristNotThirsty,
  thristThristy,
  thristVeryThristy,
  cursorPressed;
let font;
let backgroundSound;

//classes
let tamagotchi;
let statusTamagotchiText;

//animator
let characterAnimation;
let sleepingAnimation;

//env vars
const host = 'https://dylasx.github.io/tamagotchi-p5js/';
const width = 130;
const height = 120;
const interactivityThreshold = 30;

const elementPositions = {
  bed: {
    x: 1,
    y: 70,
  },
  fridge: {
    x: 73,
    y: -1,
  },
  sink: {
    x: 30,
    y: 16,
  },
  toilet: {
    x: 0,
    y: 16,
  },
  tv: {
    x: 95,
    y: 65,
  },
  necessities: {
    container: {
      x: 90,
      y: 106,
    },
    poop: {
      x: 112,
      y: 106,
      size: 10,
    },
    hungry: {
      x: 101,
      y: 106,
      size: 10,
    },
    thirsty: {
      x: 91,
      y: 107,
      size: 9,
    },
  },
};

function preload() {
  room = loadImage(`${host}assets/images/bedroom.png`);
  fridge = loadImage(`${host}assets/images/fridge.png`);
  sink = loadImage(`${host}assets/images/sink.png`);
  toilet = loadImage(`${host}assets/images/toilet.png`);
  tv = loadImage(`${host}assets/images/tv.png`);
  bed = loadImage(`${host}assets/images/bed.png`);
  cursor = loadImage(`${host}assets/images/cursor.png`);
  cursorPressed = loadImage(`${host}assets/images/cursorw_down.png`);
  //font
  font = loadFont(`${host}assets/fonts/PressStart2P.ttf`);

  //neccesities
  poop = loadImage(`${host}assets/images/poop_needtogo.png`);
  poopNeedBadly = loadImage(`${host}assets/images/poop_needtogobadly.png`);
  poopNoNeed = loadImage(`${host}assets/images/poop_noneed.png`);

  hungerHungry = loadImage(`${host}assets/images/hunger_hungry.png`);
  hungerVeryHungry = loadImage(`${host}assets/images/hunger_veryhungry.png`);
  hungerNotHungry = loadImage(`${host}assets/images/hunger_nothungry.png`);

  thristThristy = loadImage(`${host}assets/images/thirst_thirsty.png`);
  thristVeryThristy = loadImage(`${host}assets/images/thirst_verythirsty.png`);
  thristNotThirsty = loadImage(`${host}assets/images/thirst_notthirsty.png`);

  //sound
  song = loadSound(`${host}assets/sounds/background.mp3`);
}

function setup() {
  frameRate(20);
  noCursor();
  const canvas = createCanvas(width, height);
  canvas.parent('screenWrapper');
  characterAnimation = loadAnimation(
    `${host}assets/images/idle.png`,
    `${host}assets/images/sit.png`
  );
  sleepingAnimation = loadAnimation(`${host}assets/images/sleeping.png`);
  characterAnimation.frameDelay = 15;
  statusTamagotchiText = new MessageSystem();
  tamagotchi = new Character('Kikitchi');
  document.oncontextmenu = function () {
    return false;
  };
  song.play();
}

function draw() {
  background(100);
  background(room);
  rotate(0);
  image(bed, elementPositions.bed.x, elementPositions.bed.y);
  image(fridge, elementPositions.fridge.x, elementPositions.fridge.y);
  image(sink, elementPositions.sink.x, elementPositions.sink.y);
  image(toilet, elementPositions.toilet.x, elementPositions.toilet.y);
  image(tv, elementPositions.tv.x, elementPositions.tv.y);

  tamagotchi.init();

  // health status
  // A rectangle
  fill(112, 128, 144, 150);
  stroke(100);
  rect(
    elementPositions.necessities.container.x,
    elementPositions.necessities.container.y,
    35,
    12,
    2,
    2
  );
  needToPoop();
  needToEat();
  needToDrink();
  //status message text
  if (statusTamagotchiText.shouldDisplay && statusTamagotchiText.message) {
    textSize(5);
    textFont(font);
    fill(255);
    stroke(100);
    text(statusTamagotchiText.message, mouseX, mouseY);
  }

  //cursor logic
  if (mouseIsPressed) {
    image(cursorPressed, mouseX, mouseY);
  } else {
    image(cursor, mouseX, mouseY);
  }

  //tamagotchiStatusCheck
  //if it's asleep
  tamagotchi.checkStatus();
  if (tamagotchi.energy <= 20) {
    textSize(3);
    textFont(font);
    fill(255);
    stroke(100);
    text('Zzz...', tamagotchi.x + 5, tamagotchi.y - 10);
  }
}

function mouseClicked() {
  if (mouseX < width && mouseY < height) {
    statusTamagotchiText.clear();
    bedCollider() ||
      fridgeCollider() ||
      toiletCollider() ||
      sinkCollider() ||
      defaultPosition();
  }
}

//necessities
const needToPoop = () => {
  if (tamagotchi.needToPoop === 1) {
    image(
      poop,
      elementPositions.necessities.poop.x,
      elementPositions.necessities.poop.y,
      elementPositions.necessities.poop.size,
      elementPositions.necessities.poop.size
    );
  } else if (tamagotchi.needToPoop === 2) {
    image(
      poopNeedBadly,
      elementPositions.necessities.poop.x,
      elementPositions.necessities.poop.y,
      elementPositions.necessities.poop.size,
      elementPositions.necessities.poop.size
    );
  } else {
    image(
      poopNoNeed,
      elementPositions.necessities.poop.x,
      elementPositions.necessities.poop.y,
      elementPositions.necessities.poop.size,
      elementPositions.necessities.poop.size
    );
  }
};

const needToEat = () => {
  if (tamagotchi.needToEat === 1) {
    image(
      hungerHungry,
      elementPositions.necessities.hungry.x,
      elementPositions.necessities.hungry.y,
      elementPositions.necessities.hungry.size,
      elementPositions.necessities.hungry.size
    );
  } else if (tamagotchi.needToEat === 2) {
    image(
      hungerVeryHungry,
      elementPositions.necessities.hungry.x,
      elementPositions.necessities.hungry.y,
      elementPositions.necessities.hungry.size,
      elementPositions.necessities.hungry.size
    );
  } else {
    image(
      hungerNotHungry,
      elementPositions.necessities.hungry.x,
      elementPositions.necessities.hungry.y,
      elementPositions.necessities.hungry.size,
      elementPositions.necessities.hungry.size
    );
  }
};

const needToDrink = () => {
  if (tamagotchi.needToDrink === 1) {
    image(
      thristThristy,
      elementPositions.necessities.thirsty.x,
      elementPositions.necessities.thirsty.y,
      elementPositions.necessities.thirsty.size,
      elementPositions.necessities.thirsty.size
    );
  } else if (tamagotchi.needToDrink === 2) {
    image(
      thristVeryThristy,
      elementPositions.necessities.thirsty.x,
      elementPositions.necessities.thirsty.y,
      elementPositions.necessities.thirsty.size,
      elementPositions.necessities.thirsty.size
    );
  } else {
    image(
      thristNotThirsty,
      elementPositions.necessities.thirsty.x,
      elementPositions.necessities.thirsty.y,
      elementPositions.necessities.thirsty.size,
      elementPositions.necessities.thirsty.size
    );
  }
};

//colliders
const defaultPosition = () => {
  tamagotchi.move(mouseX, mouseY);
  characterAnimation.play(0);
};

const bedCollider = () => {
  if (
    dist(mouseX, mouseY, elementPositions.bed.x, elementPositions.bed.y) <=
    interactivityThreshold
  ) {
    tamagotchi.move(elementPositions.bed.x + 15, elementPositions.bed.y + 10);
    tamagotchi.sleep(true);
    statusTamagotchiText.setMessage('Sleeping...');
    characterAnimation.stop(1);
    sleepingAnimation.play();
    return true;
  }
  tamagotchi.sleep(false);
  sleepingAnimation.stop();
  return false;
};

const fridgeCollider = () => {
  if (
    dist(
      mouseX,
      mouseY,
      elementPositions.fridge.x,
      elementPositions.fridge.y
    ) <= interactivityThreshold
  ) {
    tamagotchi.eat(true);
    tamagotchi.move(
      elementPositions.fridge.x + 15,
      elementPositions.fridge.y + 40
    );
    statusTamagotchiText.setMessage('Eating...');
    return true;
  }
  tamagotchi.eat(false);
  return false;
};

const sinkCollider = () => {
  if (
    dist(mouseX, mouseY, elementPositions.sink.x, elementPositions.sink.y) <=
    interactivityThreshold - 10
  ) {
    tamagotchi.drink(true);
    tamagotchi.move(elementPositions.sink.x + 10, elementPositions.sink.y + 10);
    statusTamagotchiText.setMessage('Drinking...');
    return true;
  }
  tamagotchi.drink(false);
  return false;
};

const toiletCollider = () => {
  if (
    dist(
      mouseX,
      mouseY,
      elementPositions.toilet.x,
      elementPositions.toilet.y
    ) <=
    interactivityThreshold - 10
  ) {
    tamagotchi.poop(true);
    tamagotchi.move(
      elementPositions.toilet.x + 8,
      elementPositions.toilet.y + 14
    );
    statusTamagotchiText.setMessage('Pooping...');
    characterAnimation.stop(1);
    return true;
  }
  characterAnimation.play();
  tamagotchi.poop(false);
  return false;
};
