import { ref } from 'vue'

export default {
  setup() {
    const message = ref('سلام دنیا!')

    function reverseMessage() {
      // تغییر دهید یا به آن دسترسی پیدا کنید .value را از طریق ref مقدار
      message.value = message.value.split('').reverse().join('')
    }

    function notify() {
      alert('جلوگیری از ناوبری صورت گرفت')
    }

    return {
      message,
      reverseMessage,
      notify
    }
  }
}
