export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '游戏历史' })
  : { navigationBarTitleText: '游戏历史' }
