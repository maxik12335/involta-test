export default {
  data() {
    return {
      scrollTop: 0,
      loaderMessageText: "",
    }
  },

  watch: {
    messageList() {            
      setTimeout(() => {          
        this.$refs.messagesListItem.forEach(item => {
          item.classList.add("messages__list__item-show")
        })

        if(this.methodUpdateMessageList === "added") {
          this.$refs.messagesList.scrollTop = 2
        } else if(this.methodUpdateMessageList === "update") {
          document.querySelectorAll(".messages__list__item")[this.lengthResponseDate].scrollIntoView({
            block: "start"
          })
        }

        this.$emit("removeMessageLoader")
      }, 500);
    },

    messageLoading() {
      this.loaderMessageText = ""
      setTimeout(() => {
        this.loaderMessageText = "Возможно, стоит перезагрузить интернет"
      }, 3000);
    }
  },
  
  mounted() {
    this.$refs.messagesList.addEventListener("scroll", (event) => {        
      this.scrollTop = event.target.scrollTop
      if(this.scrollTop === 0) {
        this.$emit("updateOffset", 20)
      }
    })

    this.$refs.messagesListItem.forEach(item => item.classList.add("messages__list__item-show"))
  }
}