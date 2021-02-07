export default {
  pages: ['pages/account/index', 'pages/course/index', 'pages/department/index', 'pages/index/index', 'pages/pdaLogin/index', 'pages/mine/index', 'pages/patient/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },

  tabBar: {
    borderStyle: 'white',
    color: '#000',
    selectedColor: '#2b7bf5',
    list: [{
        iconPath: './assets/images/worktab.png',
        selectedIconPath: './assets/images/worktab-selected.png',
        pagePath: 'pages/index/index',
        text: '工作站'
      },

      {
        iconPath: './assets/images/mine.png',
        selectedIconPath: './assets/images/mine-selected.png',
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
}
