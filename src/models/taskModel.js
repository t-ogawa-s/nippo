export const STATUSES = { paused: 'paused', running: 'running' };

export class taskModel {
  _id;
  _name;
  _counted;
  _status;
  _startTime;

  /**
   * @param {string} name タスク名
   * @param {string} countedTime 累計時間
   */
  constructor(name, countedTime = 0) {
    this._id = this.makeId();
    this._name = name;
    this._countedTime = countedTime;
    this._status = STATUSES.paused;
    this._startTime = this.getCurrentTime();
    this._intervalID;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get status() {
    return this._status;
  }

  get countedTime() {
    return this.makeTimeObj(this._countedTime);
  }

  get startTime() {
    return this._startTime;
  }

  makeId() {
    const length = 8;
    // 生成する文字列に含める文字セット
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters[Math.floor(Math.random() * charactersLength)];
    }
    return result;
  }

  getCurrentTime() {
    return new Date().getTime();
  }

  getElapsedTime() {
    // 開始時間 - 現在時刻
    // https://qiita.com/chokunari/items/9642741c6ce84ab5e133
    const diff = this.getCurrentTime() - this._startTime;
    return this.makeTimeObj(diff);
  }

  makeTimeObj(time) {
    const hour = time / (1000 * 60 * 60);
    const minute = (hour - Math.floor(hour)) * 60;
    const second = (minute - Math.floor(minute)) * 60;
    const text =
      ('00' + Math.floor(hour)).slice(-2) +
      ':' +
      ('00' + Math.floor(minute)).slice(-2) +
      ':' +
      ('00' + Math.round(second)).slice(-2);
    const roundedHour = Math.round(hour * 4) / 4;
    return {
      src: time,
      hour: hour,
      minute: minute,
      second: second,
      text: text,
      roundedHour: roundedHour < 0.25 ? '' : roundedHour
    };
  }

  run() {
    this._startTime = this.getCurrentTime();
    this._status = STATUSES.running;
    const temp = this._countedTime;
    this._intervalID = setInterval(() => {
      //累積時間 = スタート時の累積時間 + 増加時間
      this._countedTime = temp + this.getElapsedTime().src;
    }, 100);
  }

  stop() {
    this._status = STATUSES.paused;
    clearInterval(this._intervalID);
  }
}
