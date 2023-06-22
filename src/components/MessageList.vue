<template>
  <div class="messages__list__box">
    <ul class="messages__list" ref="list">
      <ui-message-loader v-if="messageLoading" :message="loaderMessageText"/>
      <li
        class="messages__list__item"
        v-for="messageListItem in messageList"
        :key="messageListItem.id"
      >
        <span>{{ messageListItem.title }}</span>
      </li>
      <div ref="observer" class="observer"></div>
    </ul>
  </div>
</template>

<script>
import UiMessageLoader from './ui/UiMessageLoader.vue';
  export default {
  components: {  UiMessageLoader },
    props: {
      messageList: {
        type: Array,
        require: true
      },
      fetchMessageListLength: {
        type: Number,
      },
      addedMessage: {
        type: String
      },
      messageLoading: {
        type: Boolean
      }
    },

    data() {
      return {
        scrollTop: 0,
        loaderMessageText: ""
      }
    },

    watch: {
      addedMessage() {
        setTimeout(() => {
          document.querySelector(".messages__list").scrollTop = 2
          this.$emit("removeMessageLoader", false)
        }, 501);
      },

      messageList() {                
        setTimeout(() => {          
          document.querySelectorAll(".messages__list__item").forEach(item => {
            item.classList.add("messages__list__item-show")
          })

          if(this.fetchMessageListLength === 13) {
            document.querySelectorAll(".messages__list__item")[13].scrollIntoView({
              block: "start"
            })
          } else if(this.fetchMessageListLength === 20) {
            document.querySelectorAll(".messages__list__item")[20].scrollIntoView({
              block: "start"
            })
          } else {
            document.querySelectorAll(".messages__list__item")[0].scrollIntoView({
              block: "start"
            })
          }

          this.$emit("removeMessageLoader", false)
        }, 500);
      },

      messageLoading() {
        let time = 5      
        this.loaderMessageText = ""
        const timer = () => {
          time -= 1
          setTimeout(() => {
            if(time === 0) {
              this.loaderMessageText = "Возможно, стоит перезагрузить интернет"
            } else {
              timer()
            }
          }, 1000);
        }

        timer()

      }
    },
  
    mounted() {
      document.querySelector(".messages__list").addEventListener("scroll", (event) => {        
        this.scrollTop = event.target.scrollTop
        if(this.scrollTop === 0) {
          this.$emit("updateOffset", 20)
        }
      })      

      setTimeout(() => {
          document.querySelectorAll(".messages__list__item")[19].scrollIntoView({
            block: "start"
          })
  
          document.querySelectorAll(".messages__list__item").forEach(item => {
            item.classList.add("messages__list__item-show")
          })

          this.$emit("removeMessageLoader", false)
        }, 500);
    }
  }
</script>

<style scoped>
  .messages__list__box {
    width: 450px;
    height: 400px;
    padding: 30px;
    border-radius: 8px;
    background-color: white;
    margin-bottom: 30px;
  }
  .messages__list {
    width: 100%;
    height: 100%;
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
    opacity: 0;
    position: absolute;
    transition: 0.5s;
  }

  .messages__list__item-show {
    opacity: 1;
    position: relative;
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