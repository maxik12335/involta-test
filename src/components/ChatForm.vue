<template>
  <form class="message__add" @submit.prevent>
    <textarea
      v-model="input"
      class="message__add__input"
    ></textarea>

    <button 
      type="submit" 
      @click="createPost" 
      class="messages__add__button"
    >отправить</button>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        input: ""
      }
    },

    methods: {
      createPost() {
        if(this.input.length < 1) {
          return
        } else {
          const messageListItem = {
            id: Date.now(),
            title: this.input
          }

          this.$emit("createMessage", messageListItem)        
          this.input = ""
        }
      }
    }
  }
</script>

<style scoped>
  .message__add__input::-webkit-scrollbar {
    width: 0;
  }

  .message__add__input {
    resize: none;
    display: block;
    width: 100%;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 10px;
  }

  .messages__add__button {
    display: block;
    width: 150px;
    height: 40px;
    font-size: 16px;
    background-color: transparent;
    border: none;
    color: white;
    box-shadow: 0px 0px 3px 0px rgb(0 0 0 / 20%);
    cursor: pointer;
    transition: 0.3s;
    border-radius: 3px;
    margin-left: auto;
  }

  .messages__add__button:hover {
    box-shadow: 0px 0px 3px 0px rgb(0 0 0 / 40%);
    color: #c7c7c7;
  }
</style>