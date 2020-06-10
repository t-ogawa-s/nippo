export class taskModels {
  _list;

  constructor(list = []) {
    this._list = list;
  }

  reset() {
    return new taskModels();
  }

  add(taskModel) {
    const list = this._list.map(v => v); //clone;
    const updatedList = list
      .filter(item => item.id !== taskModel.id)
      .concat(taskModel);

    return new taskModels(updatedList);
  }

  remove(taskModel) {
    const list = this._list.map(v => v); //clone;
    const updatedList = list.filter(item => item.id !== taskModel.id);

    return new taskModels(updatedList);
  }

  removeAll() {
    return new taskModels([]);
  }

  stopAll() {
    this.list.forEach(v => {
      v.stop();
    });
  }

  get list() {
    return this._list;
  }
}
