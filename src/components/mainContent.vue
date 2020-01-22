<template>
  <main class="wrapper">
    <h1 class="heading1">タスクを始める</h1>
    <p>入力済みタスクは後ほど編集できます。</p>
    <input type="text" />
    <button>追加</button>
    <button>クリア</button>
  </main>
</template>

<script>
export default {
  name: "mainContent",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
