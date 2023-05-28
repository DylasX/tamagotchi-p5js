class MessageSystem {
  constructor() {
    this.shouldDisplay = false;
    this.message = '';
  }

  setMessage(str) {
    this.shouldDisplay = true;
    this.message = str;
  }

  clear() {
    this.shouldDisplay = false;
    this.message = '';
  }
}
