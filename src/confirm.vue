<template>
  <div class="dialog">
    <div class="dialog__inner">
      <div class="dialog__body">
        <p class="dialog__text">削除してよろしいですか？</p>
      </div>
      <div class="dialog__footer">
        <button class="dialog__button" @click="onClickConfirm">削除する</button>
        <button class="dialog__button" @click="onClickConfirm">
          キャンセル
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "confirmDialog",
  methods: {
    onClickCancel: function() {
      this.$emit("cancelled");
    },
    onClickConfirm: function() {
      this.$emit("confirmed");
    }
  }
};
</script>
<style lang="scss" scoped>
.dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.dialog__inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 276px;
  padding: 30px 0 0;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #fff;
}
.dialog__body {
  padding: 0 30px 30px 30px;
  text-align: center;
}
.dialog__footer {
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: center;
  border-radius: 0 0 5px 5px;
  background-color: #f7f7f7;
}
.dialog__text {
  font-weight: 700;
  font-size: 15px;
  text-align: left;
}
.dialog__button {
  width: 100%;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  color: #0088c3;
  font-weight: 700;
  font-size: 14px;
  background-color: #f7f7f7;
  border: none;
}
</style>
