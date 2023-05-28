class Character {
  constructor(name) {
    this.energy = 100;
    this.eating = false;
    this.drinking = false;
    this.pooping = false;
    this.asleep = false;
    this.isAlive = true;
    this.name = name;
    this.needToPoop = 0;
    this.needToEat = 0;
    this.needToDrink = 0;
    this.x = 50;
    this.y = 50;
  }

  init() {
    if (this.asleep || !this.isAlive) {
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
    if (this.eating) {
      if (this.needToEat) {
        this.needToEat -= 1;
        if (this.needToPoop < 2) {
          this.needToPoop += 1;
        }
      }
      if (this.energy < 100) {
        this.energy += 1;
      }
      this.eating = false;
    }
    if (this.drinking) {
      if (this.needToDrink) {
        this.needToDrink -= 1;
      }
      if (this.energy < 100) {
        this.energy += 1;
      }
    }

    if (this.pooping) {
      if (this.needToPoop) {
        this.needToPoop -= 1;
      }
      if (this.energy < 100) {
        this.energy += 1;
      }
    }
    return this.energy;
  }

  move(x, y) {
    this.x = x;
    this.y = y;
    return { x: this.x, y: this.y };
  }

  sleep(status) {
    this.asleep = status;
    return this.asleep;
  }

  eat(status) {
    this.eating = status;
    return this.eating;
  }

  drink(status) {
    this.drinking = status;
    return this.drinking;
  }

  poop(status) {
    this.pooping = status;
    return this.pooping;
  }
}
