import { makeAutoObservable } from 'mobx';

class ExamCode {
  code: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setCode(code: string) {
    this.code = code;
  }
}

export default new ExamCode();
