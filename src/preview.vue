<template>
  <div class="preview">
    <h2 class="heading">投稿用テキスト</h2>
    <div class="textContainer">
      #今日やったこと
      <br />
      <span v-for="taskItem in taskModels.list" :key="taskItem.id">
        - {{ taskItem.name }} {{ taskItem.countedTime.roundedHour }}
        <br />
      </span>
    </div>
    <div class="buttons">
      <button class="buttons__back" @click="onClickClose">戻る</button>
      <button class="buttons__copy">クリップボードに<br>コピー</button>
    </div>
  </div>
</template>

<script>
import { taskModels } from "./models/taskModels";

export default {
  name: "previewModal",
  props: {
    taskModels: taskModels
  },
  mounted: function() {
    console.log("taskmodels on preview", this.taskModels);
  },
  methods: {
    onClickClose: function() {
      this.$emit("closed");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./scss/_variables.scss";

.preview {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  padding: $marginL $marginM;
  box-sizing: border-box;
}
.textContainer {
  text-align: left;
  font-size: $fontM;
}
.heading {
  font-size: $fontL;
}
.buttons {
  margin-top: $marginL;
  display: flex;
  &__back,
  &__copy {
    display: block;
    margin-top: $marginS;
    border: 0;
    background: $accentColor;
    color: $mainColor;
    border-radius: 21px;
    width: calc(50% - 10px);
    padding: 5px;
    font-size: $fontM;
    font-weight: bold;
    margin-left: auto;
    cursor: pointer;
  }
}
</style>
