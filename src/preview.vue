<template>
  <div class="preview">
    <h2 class="heading">投稿用テキスト</h2>
    <div class="textContainer"></div>
    <div class="buttons">
      <button class="buttons__back" @click="onClickClose">戻る</button>
      <button class="button__copy">クリップボードにコピー</button>
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
.preview {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
}
</style>
