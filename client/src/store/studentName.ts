import { makeAutoObservable } from 'mobx';

class StudenName {
  name: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setName(name: string) {
    this.name = name;
  }
}

export default new StudenName();
