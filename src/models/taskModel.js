export const STATUS = { paused: "paused", running: "running" };

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
    this._status = STATUS.running;
    this._startTime = this.getCurrentTime();
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

  makeId() {
    const length = 8;
    // 生成する文字列に含める文字セット
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters[Math.floor(Math.random() * charactersLength)];
    }
    return result;
  }

  getCurrentTime() {
    return new Date();
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
      ("00" + Math.floor(hour)).slice(-2) +
      ":" +
      ("00" + Math.floor(minute)).slice(-2) +
      ":" +
      ("00" + Math.round(second)).slice(-2);
    return {
      src: time,
      hour: hour,
      minute: minute,
      second: second,
      text: text
    };
  }

  run() {
    this._startTime = this.getCurrentTime();
    this._status = STATUS.running;
    console.log("this._status", this._status);
  }

  stop() {
    console.log("経過時間", this.getElapsedTime());
    this._countedTime = this._countedTime + this.getElapsedTime().src;
    console.log("累計時間", this.makeTimeObj(this._countedTime));
    this._status = STATUS.paused;
    console.log("this._status", this._status);
  }
}
