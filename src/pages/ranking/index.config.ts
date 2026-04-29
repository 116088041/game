export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '财富排行榜' })
  : { navigationBarTitleText: '财富排行榜' }
