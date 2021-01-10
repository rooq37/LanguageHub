// FlashState.js
class FlashState {
    constructor() {
      this.state = {};
    }
    get(key) {
      const value = this.state[key];
      this.state[key] = null;
      return value;
    }
    set(key, value) {
      this.state[key] = value;
    }
  }
export default new FlashState();