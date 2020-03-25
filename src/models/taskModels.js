export class taskModels {
  list_;

  constructor(list = []) {
    this.list_ = list;
  }

  reset() {
    return new taskModels();
  }

  add(taskModel) {
    const list = this.list_.map(v => v); //clone;
    const updatedList = list
      .filter(v => v.id !== taskModel.id)
      .concat(taskModel);

    console.log("updatedList", updatedList);
    console.log(
      "filterd",
      list.filter(v => v.id !== taskModel.id)
    );

    return new taskModels(updatedList);
  }
}
