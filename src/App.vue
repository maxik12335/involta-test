<template>
  <div class="app"> 

    <div v-if="!loading" class="chat">
      <h1 class="chat__title">Chat</h1>
      <message-list 
        :messageList="messageList"
        :lengthResponseDate="lengthResponseDate"
        :messageLoading="messageLoading"     
        :methodUpdateMessageList="methodUpdateMessageList"   
        @updateOffset="updateOffset"
        @removeMessageLoader="removeMessageLoader"
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
        offset: 0,
        lengthResponseDate: Number,
        loading: true,
        messageLoading: false,
        stopFetch: true,
        methodUpdateMessageList: ""
      }
    },

    mounted() {
      this.fetchMessages(this.offset)
    },

    methods: {
      addMessage(messageListItem) {
        this.methodUpdateMessageList = "added"
        this.messageList = [messageListItem, ...this.messageList]
      },

      updateOffset(newOffset) {
        if(this.stopFetch) {
          this.offset += newOffset
          this.fetchMessages(this.offset)
        }
      },

      removeMessageLoader() {
        this.messageLoading = false
      },  

      async fetchMessages(offset) { 
        if(this.offset > 60) {
          this.stopFetch = false
          this.messageLoading = false
          return
        }

        this.messageLoading = true

        const response = await axios.get("https://numia.ru/api/getMessages?offset=" + offset)     
                
        if(response.data === "OOPS! TRY AGAIN!") {
          this.messageLoading = true
          this.offset === 0 ? this.fetchMessages(offset) : this.offset -= 20
          return        
        } else {
          this.loading = false
          this.messageLoading = false

          const data = response.data.result.map((item) => ({id: (Math.random() * 100), title: item})).reverse()
          this.messageList = [...data, ...this.messageList]

          this.lengthResponseDate = data.length
          this.methodUpdateMessageList = "update"
        }
      }         
    },
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