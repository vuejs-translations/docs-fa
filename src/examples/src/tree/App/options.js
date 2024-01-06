import TreeItem from './TreeItem.vue'

const treeData = {
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
}

export default {
  components: {
    TreeItem
  },
  data() {
    return {
      treeData
    }
  }
}
