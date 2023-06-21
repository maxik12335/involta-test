<template>
  <div class="loader">
    <div class="loader__round"></div>
    <div class="loader__text">Идёт загрузка...</div>
  </div>  
</template>

<script>

</script>

<style>
  .loader {
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .loader__round {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 7px dashed white;
    animation: loader 3s linear infinite;
  }

  .loader__text {
    position: absolute;
    color: white;
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