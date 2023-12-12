import { ref } from 'vue'
import TreeItem from './TreeItem.vue'

export default {
  components: {
    TreeItem
  },
  setup() {
    const treeData = ref({
      name: 'درخت من',
      children: [
        { name: 'سلام' },
        { name: 'دنیا' },
        {
          name: 'پوشه فرزند',
          children: [
            {
              name: 'پوشه فرزند',
              children: [{ name: 'سلام' }, { name: 'دنیا' }]
            },
            { name: 'سلام' },
            { name: 'دنیا' },
            {
              name: 'پوشه فرزند',
              children: [{ name: 'سلام' }, { name: 'دنیا' }]
            }
          ]
        }
      ]
    })

    return {
      treeData
    }
  }
}
