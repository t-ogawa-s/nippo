import { taskModel } from './taskModel';

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
      .concat(taskModel)
      .sort((a, b) => (a.startTime < b.startTime ? 1 : -1));

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

  sortByNew() {
    const list = this._list.map(v => v); //clone;
    const updatedList = list.sort((a, b) =>
      a.startTime < b.startTime ? 1 : -1
    );

    return new taskModels(updatedList);
  }

  sortByOld() {
    const list = this._list.map(v => v); //clone;
    const updatedList = list.sort((a, b) =>
      a.startTime > b.startTime ? 1 : -1
    );

    return new taskModels(updatedList);
  }

  saveList() {
    const list = this._list.map(v => v); //clone
    localStorage.setItem('taskList', JSON.stringify(list));
  }

  loadList() {
    const listStrings = localStorage.getItem('taskList');
    if (!listStrings) {
      return false;
    }
    const list = JSON.parse(listStrings);
    const taskModelArray = list.map(taskItem => {
      return new taskModel(taskItem._name, taskItem._countedTime);
    });
    return new taskModels(taskModelArray);
  }

  get list() {
    return this._list;
  }
}
