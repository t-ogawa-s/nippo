<template>
  <div id="app">
    <main class="wrapper">
      <div class="addTask">
        <h1 class="addTask__heading">タスクを始める</h1>
        <p>入力済みタスクは後ほど編集できます。</p>
        <input class="addTask__input" type="text" v-model="inputText" />
        <button class="addTask__addButton" @click="onClickAddTask">追加</button>
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
      <button class="clearButton" @click="onClickRemoveAll">クリア</button>
      <div class="export">
        <button class="export__preview">確認</button>
        <button class="export__copy">クリップボードに貼り付け</button>
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
import "normalize.css";

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
//color
$mainColor: #f5f1ef;
$darkColor: #373432;
$accentColor: #849ca8;
$baseColor: #a89084;

//margin
$marginS: 8px;
$marginM: 16px;
$marginL: 24px;

//font
$fontS: 10px;
$fontM: 14px;
$fontL: 16px;
$fontXL: 18px;

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $darkColor;
  padding: 32px 16px;
  min-height: 100vh;
  box-sizing: border-box;
}
.wrapper {
  max-width: 1000px;
  margin: 0 auto;
}
p {
  font-size: $fontM;
  text-align: left;
  margin: $marginS 0;
}
.addTask {
  &__heading {
    font-size: $fontXL;
    font-weight: normal;
    text-align: left;
    padding-bottom: 5px;
    border-bottom: 1px solid #000;
    margin: 0 0 $marginM 0;
  }
  &__input {
    width: 100%;
    border: 1px solid $darkColor;
    border-radius: 3px;
    padding: $marginS;
    box-sizing: border-box;
    font-size: $fontM;
  }
  &__addButton {
    display: block;
    margin-top: $marginS;
    border: 0;
    background: $accentColor;
    color: $mainColor;
    border-radius: 15px;
    width: 120px;
    padding: 5px;
    font-size: $fontM;
    font-weight: bold;
    margin-left: auto;
  }
}
.taskList {
  margin-top: $marginM;
}
.taskCard {
  $block: &;
  display: flex;
  align-items: center;
  color: $darkColor;
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  border-radius: 5px;
  padding: 5px;
  background: $mainColor;
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
    margin-left: 5px;
  }
  &__run,
  &__pause,
  &__delete {
    flex-grow: 0;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid $baseColor;
    color: $darkColor;
  }
  &__pause {
    display: none;
  }
  &.is-running {
    background-color: $baseColor;
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
.export {
  margin-top: $marginL;
  &__preview,
  &__copy {
    display: block;
    margin-top: $marginS;
    border: 0;
    background: $accentColor;
    color: $mainColor;
    border-radius: 15px;
    width: 100%;
    padding: 5px;
    font-size: $fontM;
    font-weight: bold;
    margin-left: auto;
  }
}
.clearButton {
  display: block;
  margin-top: $marginS;
  border: 0;
  background: $accentColor;
  color: $mainColor;
  border-radius: 15px;
  width: 120px;
  padding: 5px;
  font-size: $fontM;
  font-weight: bold;
  margin-left: auto;
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
