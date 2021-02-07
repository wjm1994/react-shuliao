import Taro from '@tarojs/taro'

export const request = ({
  url, data, method = 'get', cache = false, timeout = false, useStore = false,
  contentType, showLoading = true, showErrMsg = true
}) => new Promise(resolve => {

  showLoading && Taro.showLoading({ title: '加载中' })
  
  Taro.request({
    header: handleHeader(contentType),
    url, data, method, cache, timeout, useStore,
    success(res) {
      const response = res.data.result
      if (response.success) {
        resolve(res.data.result)
      } else {
        let msg = response.msg || response.errMsg || response.message
        showErrMsg && Taro.showToast({ title: msg })
      }
    },
    fail(err) {
      let msg = err.data.msg || err.data.errMsg || err.data.message
      showErrMsg && Taro.showToast({ title: msg })
      resolve(err)
    },
    complete() {
      showLoading && Taro.hideLoading()
    }
  })
})

export const axios = request
export const fetch = request

function handleHeader (contentType) {
  const BASE_HEADER = { 
    'Content-Type': 'application/json'
  }
  if (contentType.toLowerCase() === 'formdata') {
    return {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
  return BASE_HEADER
}
