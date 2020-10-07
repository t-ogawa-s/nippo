<template>
  <div id="app">
    <main class="wrapper">
      <div class="addTask">
        <h1 class="addTask__heading">タスクを始める</h1>
        <p>入力済みタスクは後ほど編集できます。</p>
        <input
          class="addTask__input"
          type="text"
          v-model="inputText"
          @keydown.enter="onClickEnter"
        />
        <button class="addTask__addButton" @click="onClickAddTask">追加</button>
      </div>
      <transition-group name="fade">
        <div
          class="taskList"
          v-for="taskItem in taskModels.list"
          :key="taskItem.id"
        >
          <div class="taskCard" v-bind:class="statusClasses[taskItem.status]">
            <div class="taskCard__controller">
              <div
                class="taskCard__run"
                v-if="taskItem.status === statuses.paused"
                @click="onClickRun(taskItem)"
              >
                ▶︎
              </div>
              <div
                class="taskCard__pause"
                v-if="taskItem.status === statuses.running"
                @click="onClickPause(taskItem)"
              >
                ■
              </div>
            </div>
            <div class="taskCard__text">
              <div class="taskCard__name">{{ taskItem.name }}</div>
              <div class="taskCard__time">{{ taskItem.countedTime.text }}</div>
            </div>
            <div
              class="taskCard__delete"
              @click="onClickRemove(taskItem)"
            ></div>
          </div>
        </div>
      </transition-group>
      <transition name="fade">
        <button
          class="clearButton"
          @click="onClickRemoveAll"
          v-if="isTaskAvalable"
        >
          全て削除
        </button>
      </transition>
      <div class="export">
        <button
          class="export__preview"
          @click="onClickPreview"
          v-if="isTaskAvalable"
        >
          確認
        </button>
        <button class="export__copy" @click="onClickCopy" v-if="isTaskAvalable">
          クリップボードにコピー
        </button>
      </div>
      <div class="notion">
        <ul class="notion__group">
          <li class="notion__item">15分 = 0.25刻みで時間を表示します。</li>
          <li class="notion__item">0.25未満の場合、時間は表示されません。</li>
          <li class="notion__item">
            きっちり15分経過でカウントアップするのではなく、多少15分に満たなくても超過してもおおよそ15分と見做してカウントします。
          </li>
          <li class="notion__item">
            上記仕様のため、実際の稼働と多少差が出る可能性があります。
          </li>
        </ul>
      </div>
    </main>
    <textarea
      class="textContainer"
      ref="textContainer"
      v-model="outputText"
    ></textarea>
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
    <transition name="fade">
      <confirmDialog
        v-if="showAlertDialogNoInput"
        :confirm-text="alertNoInput"
        :is-single-button="true"
        @confirmed="onConfirmedAlertNoInput"
      ></confirmDialog>
    </transition>
    <transition name="fade">
      <previewModal
        v-if="showPreview"
        :task-models="taskModels"
        @closed="onClosePreview"
        @copied="onCopiedInPreview"
      ></previewModal>
    </transition>
    <transition name="fade">
      <confirmDialog
        v-if="copied"
        :confirm-text="textOnCopied"
        :is-single-button="true"
        @confirmed="onCopiedClose"
      ></confirmDialog>
    </transition>
  </div>
</template>

<script>
import { STATUSES, taskModel } from './models/taskModel';
import { taskModels } from './models/taskModels';
import confirmDialog from './confirm';
import previewModal from './preview';
import {
  confirmTextRemove,
  confirmTextAllRemove,
  alertNoInput,
  textOnCopied
} from './definitions';
import 'normalize.css';

export default {
  name: 'app',
  components: {
    confirmDialog,
    previewModal
  },
  data: () => {
    return {
      inputText: '',
      taskModels: new taskModels(),
      statusClasses: {
        paused: 'is-paused',
        running: 'is-running'
      },
      showConfirmDialogRemove: false,
      showConfirmDialogAllRemove: false,
      currentTaskItemForConfirm: undefined,
      confirmTextRemove: confirmTextRemove,
      confirmTextAllRemove: confirmTextAllRemove,
      statuses: STATUSES,
      alertNoInput: alertNoInput,
      textOnCopied: textOnCopied,
      showPreview: false,
      showAlertDialogNoInput: false,
      outputText: undefined,
      copied: false
    };
  },
  computed: {
    isTaskAvalable: function() {
      if (this.taskModels.list.length) {
        return true;
      }
      return false;
    }
  },
  methods: {
    onClickAddTask: function() {
      if (!this.inputText) {
        this.showAlertDialogNoInput = true;
        return;
      }
      const currentTaskItem = new taskModel(this.inputText);
      this.taskModels.stopAll();
      this.taskModels = this.taskModels.add(currentTaskItem);
      currentTaskItem.run();
      this.inputText = undefined;
      console.log('taskModels.list', this.taskModels.list);
    },
    onClickEnter: function(event) {
      if (event.keyCode !== 13) {
        return;
      }
      this.onClickAddTask();
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
    },
    onConfirmedAlertNoInput: function() {
      this.showAlertDialogNoInput = false;
    },
    onClickPreview: function() {
      if (!this.isTaskAvalable) {
        console.log('タスクがありません');
        return;
      }
      this.showPreview = true;
    },
    onClosePreview: function() {
      this.showPreview = false;
    },
    onCopiedInPreview: function() {
      this.copied = true;
    },
    onCopiedClose: function() {
      this.copied = false;
    },
    makeOutputText: function() {
      return (
        '#今日やったこと\n' +
        this.taskModels.list
          .map(taskItem => {
            return `- ${taskItem.name} ${taskItem.countedTime.roundedHour}`;
          })
          .join('\n')
      );
    },
    onClickCopy: function() {
      this.outputText = this.makeOutputText();
      this.$refs.textContainer.select();
      document.execCommand('copy');
      this.copied = true;
    }
  }
};
</script>

<style scoped lang="scss">
@import './scss/_variables.scss';

$shadow: 5px 5px 6px 0px rgba($textdark, 0.25);

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $textdark;
  padding: 32px 16px;
  min-height: 100vh;
  box-sizing: border-box;
  button,
  input {
    outline: none;
  }
}
.wrapper {
  max-width: 640px;
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
    font-weight: bold;
    text-align: left;
    padding-bottom: 5px;
    border-bottom: 1px solid #000;
    margin: 0 0 $marginM 0;
  }
  &__input {
    width: 100%;
    border: 1px solid $textdark;
    border-radius: 3px;
    padding: $marginS;
    box-sizing: border-box;
    font-size: $fontM;
  }
  &__addButton {
    display: block;
    margin-top: $marginS;
    border: 0;
    background: $positive;
    color: $white;
    border-radius: 16px;
    width: 120px;
    padding: 8px;
    font-size: $fontM;
    font-weight: bold;
    margin-left: auto;
    cursor: pointer;
    transition: opacity 150ms;
    &:hover {
      opacity: 0.6;
    }
  }
}
.taskList {
  margin-top: $marginM;
}
.taskCard {
  $block: &;
  display: flex;
  align-items: center;
  color: $textdark;
  width: 100%;
  border-radius: 5px;
  padding: 5px;
  background: $white;
  box-sizing: border-box;
  transition: background-color 150ms;
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
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $white;
    flex-grow: 0;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid $textmidtone;
    color: $textdark;
    cursor: pointer;
    transition: opacity 150ms;
    &:hover {
      opacity: 0.6;
    }
  }
  &__delete {
    &::before {
      display: block;
      content: url('./assets/delete.svg');
      width: 14px;
      height: 14px;
    }
  }
  &.is-running {
    background-color: $accent;
    box-shadow: $shadow;
    transition: box-shadow 100ms;
    #{$block}__text {
      font-weight: bold;
    }
    #{$block}__run,
    #{$block}__pause,
    #{$block}__delete {
      border: 1px solid $accent;
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
    background: $positive;
    color: $white;
    border-radius: 16px;
    width: 100%;
    padding: 8px;
    font-size: $fontM;
    font-weight: bold;
    margin-left: auto;
    cursor: pointer;
    transition: opacity 150ms;
    &:hover {
      opacity: 0.6;
    }
  }
}
.clearButton {
  display: block;
  margin-top: $marginM;
  border: 0;
  background: $textdark;
  color: $white;
  border-radius: 16px;
  width: 120px;
  padding: 8px;
  font-size: $fontM;
  font-weight: bold;
  margin-left: auto;
  cursor: pointer;
  transition: opacity 150ms;
  &:hover {
    opacity: 0.6;
  }
}
.notion {
  $block: &;
  text-align: left;
  margin-top: $margin2L;
  &__group {
    padding-left: $marginM;
  }
  &__item {
    font-size: 12px;
    color: $textmidtone;
    line-height: 1.6em;
    & + #{$block}__item {
      margin-top: $marginS;
    }
  }
}
.textContainer {
  opacity: 0;
  height: 0;
  max-height: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
