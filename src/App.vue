<template>
  <div id="app">
    <main class="wrapper">
      <h1 class="heading1">タスクを始める</h1>
      <p>入力済みタスクは後ほど編集できます。</p>
      <input type="text" v-model="inputText" />
      <button @click="onClickAddTask">追加</button>
      <button>クリア</button>
    </main>
  </div>
</template>

<script>
import { taskModel } from "./models/task";

export default {
  name: "app",
  data: () => {
    return {
      inputText: ""
    };
  },
  methods: {
    onClickAddTask: function() {
      console.log(new taskModel(this.inputText));
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
</style>
