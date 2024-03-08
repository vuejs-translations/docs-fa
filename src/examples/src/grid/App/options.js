import DemoGrid from './Grid.vue'

export default {
  components: {
    DemoGrid
  },
  data: () => ({
    searchQuery: '',
    gridColumns: ['name', 'power'],
    gridData: [
      { name: 'چاک نوریس', power: Infinity },
      { name: 'بروس لی', power: 9000 },
      { name: 'جکی جان', power: 7000 },
      { name: 'جت لی', power: 8000 }
    ]
  })
}
