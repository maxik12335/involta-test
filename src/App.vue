<template>
  <div class="app"> 

    <div v-if="!loading" class="chat">
      <h1 class="chat__title">Chat</h1>

      <message-list 
        :messageList="messageList"
        :offset="offset"
        :addMessageCount="addMessageCount"
        @updateOffset="updateOffset"
      />

      <chat-form 
        @createMessage="addMessage"
      />
    </div>

    <ui-loader v-else/>

  </div>
</template>

<script>
  import MessageList from "@/components/MessageList.vue?offset=0"
  import ChatForm from "@/components/ChatForm.vue"
  import UiLoader from "@/components/ui/UiLoader.vue"
  import axios from "axios"

  export default {
    components: {
      MessageList,
      ChatForm,
      UiLoader
    },

    data() {
      return {
        messageList: [],
        loading: true,
        offset: 0,
        stopFetch: false,
        addMessageCount: 0
      }
    },

    methods: {
      addMessage(messageListItem) {
        this.messageList = [...this.messageList, messageListItem]
        setTimeout(() => {
          this.addMessageCount += 1 
        }, 10);
      },

      updateOffset(newOffset) {
        if(this.stopFetch) {
          return
        } else {
          this.offset = newOffset
          this.fetchMessages(newOffset)        
        }
      },

      async fetchMessages(offset) {
        try {
          const response = await axios.get("https://numia.ru/api/getMessages?offset=" + offset)
          response ? this.loading = false : ""

          if(response.data.result.length === 0) {
            this.stopFetch = true
          }

          if(response.data.result) {
            const data = []          
            response.data.result.map((item) => {
              data.push({id: (Math.random() * 100), title: item})
            })
            this.messageList = [...data.reverse(), ...this.messageList]
          }
          
          if(this.offset < 20) {
            setTimeout(() => {
              this.addMessageCount += 1 
            }, 10);
          }
          
        } catch(e) {
          alert(e)
        }
      }
    },

    mounted() {
      this.fetchMessages(this.offset)
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto";
  }

  textarea:focus {
    outline: none;
  }

  .app {
    background-color: gray;
    height: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 0;
  }

  .chat__title {
    color: white;
    text-align: center;
    margin-bottom: 20px;
  }

  .chat {
    width: 450px;
  }
</style>