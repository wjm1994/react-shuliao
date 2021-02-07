import { handleNotWeappEnv } from './taro-api'

/**
 * 该方法为wx登录方法
 * 
 */


export const wxLogin = () => {
  if (!handleNotWeappEnv()) return false

  return new Promise(resolve => {
    wx.login({
      success(res) {
        if (res.code) {
          resolve(res)
        } else {
          console.error(res.errMsg)
          resolve({})
        }
      }
    })
  })
  
}


/**
 * wx获取设置
 */
export const getSetting = () => {
  if (!handleNotWeappEnv()) return false
  
  return new Promise(resolve => {
    wx.getSetting({
      success: e => {
        resolve(e)
      },
      fail: err => {
        resolve(false)
      }
    })
  })
}


// 检查更新
export const checkAppUpdate = () => {
  if (!handleNotWeappEnv()) return false

  const updateManager = Taro.getUpdateManager()
  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    console.log('[应用有新的版本]', res.hasUpdate)
    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      Taro.showModal({
        title: '发现新版本',
        content: '请删除当前小程序，重新搜索打开...',
      })
    })
  })

}

/**
 * 获取用户信息
 */


export const getUserInfo = () => {
  
  if (!handleNotWeappEnv()) return false

  return new Promise((resolve, reject) => {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              resolve(res)
            },
            fail: err => reject(err)
          })
        } else {
          reject()
        }
      }
    })
  })
}