<template>
  <div class="app"> 

    <div v-if="!loading" class="chat">
      <h1 class="chat__title">Chat</h1>

      <message-list 
        :messageList="messageList"
        :fetchMessageListLength="fetchMessageListLength"
        :addedMessage="addedMessage"
        :messageLoading="messageLoading"        
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
        fetchMessageListLength: Number,
        loading: true,
        messageLoading: false,
        offset: 0,
        stopFetch: true,
        addedMessage: ""
      }
    },

    methods: {
      addMessage(messageListItem) {
        this.addedMessage = messageListItem.title
        this.messageList = [messageListItem, ...this.messageList]
      },

      updateOffset(newOffset) {
        if(this.stopFetch) {
          this.offset += newOffset
          this.fetchMessages(this.offset)
        }
      },

      removeMessageLoader(value) {
        this.messageLoading = value
      },  

      async fetchMessages(offset) { 
        this.messageLoading = true
        const response = await axios.get("https://numia.ru/api/getMessages?offset=" + offset)        

        if(response.data.result && this.offset > 60) {
          this.stopFetch = false
          this.messageLoading = false
          return
        }

        if(response.data === "OOPS! TRY AGAIN!") {
          this.messageLoading = true
          if(this.offset === 0) {            
            this.fetchMessages(offset)
            return
          } else {
            this.offset -= 20
            return
          }          
        }

        if(response.data.result && response.data.result.length === 0) {
          this.stopFetch = false
        }

        if(response.data.result === undefined) {
          this.loading = true
          this.fetchMessages(offset)
        } else {
          this.loading = false
          const data = []  
            
          response.data.result.map((item) => {
            data.push({id: (Math.random() * 100), title: item})
          })

          this.fetchMessageListLength = data.length

          this.messageList = [...data.reverse(), ...this.messageList]
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