class Character {
  constructor(name) {
    this.energy = 100;
    this.hungry = false;
    this.poop = false;
    this.asleep = false;
    this.name = name;
    this.needToPoop = 0;
    this.needToEat = 0;
    this.needToDrink = 0;
    this.x = 50;
    this.y = 50;
  }

  init() {
    if (this.asleep) {
      animation(sleepingAnimation, this.x, this.y);
    } else {
      animation(characterAnimation, this.x, this.y);
    }
  }

  getName() {
    return this.name;
  }

  checkStatus() {
    if (this.asleep && this.energy < 100) {
      this.energy += 1;
    }
    return { energy: this.energy };
  }

  move(x, y) {
    this.x = x;
    this.y = y;
    return { x: this.x, y: this.y };
  }

  sleep() {
    this.asleep = true;
    return this.asleep;
  }

  awake() {
    this.asleep = false;
    return this.asleep;
  }
}
