<template>
  <div id="app">
    <main class="wrapper">
      <div class="addTask">
        <h1 class="heading1">タスクを始める</h1>
        <p>入力済みタスクは後ほど編集できます。</p>
        <input type="text" v-model="inputText" />
        <button @click="onClickAddTask">追加</button>
        <button>クリア</button>
      </div>
      <div class="tasks">
        <div class="taskCard">
          <div class="taskCard__controller">
            <button class="taskCard__run">▶︎</button>
            <button class="taskCard__pause">■</button>
          </div>
          <div class="taskCard__text">
            <div class="taskCard__name">タスク管理機能の作成</div>
            <div class="taskCard__time">15:00</div>
          </div>
          <button class="taskCard__delete">-</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { taskModel } from "./models/taskModel";
import { taskModels } from "./models/taskModels";

export default {
  name: "app",
  data: () => {
    return {
      inputText: "",
      taskModels: new taskModels()
    };
  },
  methods: {
    onClickAddTask: function() {
      if (!this.inputText) {
        console.log("nameが未入力です");
        return;
      }
      this.taskModels = this.taskModels.add(new taskModel(this.inputText));
      console.log("taskModels.list", this.taskModels.list);
    }
  }
};
</script>

<style scoped lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.wrapper {
  max-width: 1000px;
  margin: 0 auto;
}
.tasks {
  margin-top: 15px;
}
.taskCard {
  display: flex;
  background-color: #eee;
  color: #000;
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  border-radius: 5px;
  &__text {
    display: flex;
  }
}
</style>
