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
      .filter(v => v.id !== taskModel.id)
      .concat(taskModel);

    return new taskModels(updatedList);
  }

  get list() {
    return this._list;
  }
}
