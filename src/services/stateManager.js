export class StateManager {
  constructor(initialState) {
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
  }

  is(state) {
    return this.state === state;
  }
}
