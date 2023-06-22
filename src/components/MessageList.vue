<template>
  <div class="messages__list__box">
    <ul class="messages__list" ref="messagesList">
      <ui-message-loader v-if="messageLoading" :message="loaderMessageText"/>
      <li
        ref="messagesListItem"
        class="messages__list__item"
        v-for="messageListItem in messageList"
        :key="messageListItem.id"
      >
        <span>{{ messageListItem.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import UiMessageLoader from './ui/UiMessageLoader.vue';
  import messageListMixin from "@/mixins/messageListMixin.js"

  export default {
    components: {  UiMessageLoader },
    props: {
      messageList: {
        type: Array,
        require: true
      },
      lengthResponseDate: {
        type: Number,
      },
      messageLoading: {
        type: Boolean
      },
      methodUpdateMessageList: {
        type: String
      }
    },    
    mixins: [messageListMixin]
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