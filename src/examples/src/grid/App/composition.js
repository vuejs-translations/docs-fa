import DemoGrid from './Grid.vue'
import { ref } from 'vue'

export default {
  components: {
    DemoGrid
  },
  setup() {
    const searchQuery = ref('')
    const gridColumns = ['name', 'power']
    const gridData = [
      { name: 'چاک نوریس', power: Infinity },
      { name: 'بروس لی', power: 9000 },
      { name: 'جکی جان', power: 7000 },
      { name: 'جت لی', power: 8000 }
    ]

    return {
      searchQuery,
      gridColumns,
      gridData
    }
  }
}
