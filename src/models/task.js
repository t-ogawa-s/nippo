const STATUS = { paused: "paused", running: "running" };

export class taskModel {
  _id;
  _name;
  _counted;
  _status;
  _startTime;

  /**
   * @param {string} name タスク名
   * @param {string} counted 累計時間
   */
  constructor(name, counted = 0) {
    this._id = this.makeId();
    this._name = name;
    this._counted = counted;
    this._status = STATUS.running;
    this._startTime = this.getCurrentTime();
  }

  makeId = () => {
    const length = 8;
    // 生成する文字列に含める文字セット
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters[Math.floor(Math.random() * charactersLength)];
    }
    return result;
  };

  getCurrentTime = () => {
    const currentTime = new Date();
    return currentTime.toUTCString();
  };
}
