<template>
  <ul class="messages__list" ref="list">
    <li
      class="messages__list__item"
      v-for="messageListItem in messageList"
      :key="messageListItem.id"
    >
      <span>{{ messageListItem.title }}</span>
    </li>
    <div ref="observer" class="observer"></div>
  </ul>
</template>

<script>
  export default {
    props: {
      messageList: {
        type: Array,
        require: true
      },
      offset: {
        type: Number
      },
      addMessageCount: {
        type: Number
      }
    },

    watch: {
      addMessageCount: function () {
        this.$refs.list.scrollTop = 9999999
      }
    },

    mounted() {
      const options = {
        rootMargin: "0px",
        threshold: 1.0
      }

      const callback = (entries) => {
        if(entries[0].isIntersecting) { 
          this.$emit("updateOffset", this.offset + 20)
        }
      }

      const observer = new IntersectionObserver(callback, options)
      observer.observe(this.$refs.observer)
    }
  }
</script>

<style scoped>
  .messages__list {
    width: 450px;
    height: 400px;
    padding: 30px;
    border-radius: 8px;
    background-color: white;
    margin-bottom: 30px;
    overflow-y: scroll;
    position: relative;
  }

  .messages__list::-webkit-scrollbar {
    width: 0px;
  }

  .messages__list__item {
    text-align: center;
    padding: 15px 10px;
    background-color: #3f3f3f;
    color: white;
    border-radius: 8px;
  }

  .messages__list__item:not(:last-child) {
    margin-bottom: 20px;
  }

  .observer {
    position: absolute;
    top: 0;
    left: 0;
    height: 50px;
    background: #ff000000;
    width: 100%;
  }
</style>