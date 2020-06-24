<template>
  <div id="app">
    <main class="wrapper">
      <div class="addTask">
        <h1 class="heading1">タスクを始める</h1>
        <p>入力済みタスクは後ほど編集できます。</p>
        <input type="text" v-model="inputText" />
        <button @click="onClickAddTask">追加</button>
        <button @click="onClickRemoveAll">クリア</button>
      </div>
      <div
        class="taskList"
        v-for="taskItem in taskModels.list"
        :key="taskItem.id"
      >
        <div class="taskCard" v-bind:class="statusClasses[taskItem.status]">
          <div class="taskCard__controller">
            <button class="taskCard__run" @click="onClickRun(taskItem)">
              ▶︎
            </button>
            <button class="taskCard__pause" @click="onClickPause(taskItem)">
              ■
            </button>
          </div>
          <div class="taskCard__text">
            <div class="taskCard__name">{{ taskItem.name }}</div>
            <div class="taskCard__time">{{ taskItem.countedTime.text }}</div>
          </div>
          <button class="taskCard__delete" @click="onClickRemove(taskItem)">
            -
          </button>
        </div>
      </div>
    </main>
    <transition name="fade">
      <confirmDialog
        v-if="showConfirmDialogRemove"
        :task-item="currentTaskItemForConfirm"
        :confirm-text="confirmTextRemove"
        @confirmed="onConfirmedRemove"
        @cancelled="onCancelledRemove"
      ></confirmDialog>
    </transition>
    <transition name="fade">
      <confirmDialog
        v-if="showConfirmDialogAllRemove"
        :confirm-text="confirmTextAllRemove"
        @confirmed="onConfirmedAllRemove"
        @cancelled="onCancelledAllRemove"
      ></confirmDialog>
    </transition>
  </div>
</template>

<script>
import { taskModel } from "./models/taskModel";
import { taskModels } from "./models/taskModels";
import confirmDialog from "./confirm";
import { confirmTextRemove, confirmTextAllRemove } from "./definitions";

export default {
  name: "app",
  components: {
    confirmDialog
  },
  data: () => {
    return {
      inputText: "",
      taskModels: new taskModels(),
      statusClasses: {
        paused: "is-paused",
        running: "is-running"
      },
      showConfirmDialogRemove: false,
      showConfirmDialogAllRemove: false,
      currentTaskItemForConfirm: undefined,
      confirmTextRemove: confirmTextRemove,
      confirmTextAllRemove: confirmTextAllRemove
    };
  },
  methods: {
    onClickAddTask: function() {
      if (!this.inputText) {
        console.log("nameが未入力です");
        return;
      }
      const currentTaskItem = new taskModel(this.inputText);
      this.taskModels.stopAll();
      this.taskModels = this.taskModels.add(currentTaskItem);
      currentTaskItem.run();
      this.inputText = undefined;
      console.log("taskModels.list", this.taskModels.list);
    },
    onClickRun: function(taskItem) {
      this.taskModels.stopAll();
      taskItem.run();
    },
    onClickPause: function(taskItem) {
      taskItem.stop();
    },
    onClickRemove: function(taskItem) {
      this.currentTaskItemForConfirm = taskItem;
      this.showConfirmDialogRemove = true;
    },
    onClickRemoveAll: function() {
      this.showConfirmDialogAllRemove = true;
    },
    onConfirmedRemove: function(taskItem) {
      this.showConfirmDialogRemove = false;
      this.taskModels = this.taskModels.remove(taskItem);
    },
    onCancelledRemove: function() {
      this.showConfirmDialogRemove = false;
    },
    onConfirmedAllRemove: function() {
      this.showConfirmDialogAllRemove = false;
      this.taskModels = this.taskModels.removeAll();
    },
    onCancelledAllRemove: function() {
      this.showConfirmDialogAllRemove = false;
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
  &.is-running {
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
