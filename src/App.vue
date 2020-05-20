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
      <div class="taskList">
        <div class="taskCard">
          <div class="taskCard__controller">
            <button class="taskCard__run" @click="onClickRun">▶︎</button>
            <button class="taskCard__pause">■</button>
          </div>
          <div class="taskCard__text">
            <div class="taskCard__name">タスク管理機能の作成</div>
            <div class="taskCard__time">15:00</div>
          </div>
          <button class="taskCard__delete">-</button>
        </div>
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
      const currentTask = new taskModel(this.inputText);
      this.taskModels = this.taskModels.add(currentTask);
      console.log("taskModels.list", this.taskModels.list);
      console.log("run", currentTask.run());
    },
    onClickRun: function() {
      // クリックされたタスクを特定する方法
      // 要素にdata属性で持たせる
      console.log("this.taskModels.list[0]", this.taskModels.list[0]);
      this.taskModels.list[0].run();
    }
  }
};
</script>

<style scoped lang="scss">
$backgroundColor: #eee;
$fontColor: #2c3e50;
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $fontColor;
  margin-top: 60px;
}
.wrapper {
  max-width: 1000px;
  margin: 0 auto;
}
.taskList {
  margin-top: 15px;
}
.taskCard {
  $block: &;
  display: flex;
  align-items: center;
  background-color: $backgroundColor;
  color: $fontColor;
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  border-radius: 5px;
  padding: 5px;
  border: 2px solid $backgroundColor;
  box-sizing: border-box;
  &__text {
    display: flex;
    flex-grow: 1;
    align-items: center;
    padding: 0 10px;
  }
  &__name {
    flex-grow: 1;
    text-align: left;
  }
  &__time {
    flex-grow: 0;
  }
  &__run,
  &__pause,
  &__delete {
    flex-grow: 0;
    width: 30px;
    height: 30px;
    border-radius: 5px;
  }
  &__pause {
    display: none;
  }
  &.is-run {
    border-color: $fontColor;
    background-color: $fontColor;
    color: #fff;
    #{$block}__run {
      display: none;
    }
    #{$block}__pause {
      display: block;
    }
  }
  & + & {
    margin-top: 10px;
  }
}
</style>
