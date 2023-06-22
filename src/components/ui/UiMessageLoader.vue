<template>
  <div :class="classesLoader">
    <div class="loader__round"></div>
    <div class="loader__text">{{ message }}</div>
  </div>  
</template>

<script>
  export default {
    props: {
      message: {
        type: String
      }
    },

    data() {
      return {
        classesLoader: "loader"
      }
    },

    watch: {
      message() {
        this.classesLoader = this.message.length ? "loader loader-active" : "loader"
      }
    }
  }

</script>

<style scoped>
  .loader {
    width: 15px;
    height: 15px;
    position: relative;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  .loader-active {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }

  .loader__round {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px dashed rgb(0, 0, 0);
    animation: loader 2s linear infinite;
  }

  .loader__text {
    color: rgb(0, 0, 0);
    margin-left: 15px;
  }

  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>