import { ref, watchEffect } from 'vue'

const API_URL = `https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=`
const branches = ['main', 'v2-compat']

export default {
  setup() {
    const currentBranch = ref(branches[0])
    const commits = ref(null)

    watchEffect(async () => {
      // این  effect بلافاصله اجرا می‌شود و سپس...
      // هر زمان که مقدار currentBranch تغییر کند، مجددا اجرا می شود
      const url = `${API_URL}${currentBranch.value}`
      commits.value = await (await fetch(url)).json()
    })

    function truncate(v) {
      const newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    }

    function formatDate(v) {
      return v.replace(/T|Z/g, ' ')
    }

    return {
      branches,
      currentBranch,
      commits,
      truncate,
      formatDate
    }
  }
}
