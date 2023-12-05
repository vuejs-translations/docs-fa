import { ref } from 'vue'

export default {
  setup() {
    const message = ref('سلام دنیا!')

    function reverseMessage() {
      // مقدار ref رااز طریق .value به آن دسترسی پیدا کنید یا تغییر دهید.
      message.value = message.value.split('').reverse().join('')
    }

    function notify() {
      alert('جلوگیری از ناوبری صورت گرفت.')
    }

    return {
      message,
      reverseMessage,
      notify
    }
  }
}
