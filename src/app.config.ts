export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/ranking/index',
    'pages/history/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#f97316',
    navigationBarTitleText: '100块钱做首富',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#9ca3af',
    selectedColor: '#f97316',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/tabbar/home.png',
        selectedIconPath: './assets/tabbar/home-active.png'
      },
      {
        pagePath: 'pages/ranking/index',
        text: '排行',
        iconPath: './assets/tabbar/trophy.png',
        selectedIconPath: './assets/tabbar/trophy-active.png'
      },
      {
        pagePath: 'pages/history/index',
        text: '历史',
        iconPath: './assets/tabbar/history.png',
        selectedIconPath: './assets/tabbar/history-active.png'
      }
    ]
  }
})
