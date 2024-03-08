export default {
  data() {
    return {
      message: 'سلام دنیا!'
    }
  },
  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    },
    notify() {
      alert('جلوگیری از ناوبری صورت گرفت')
    }
  }
}
