import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton, AtInput } from 'taro-ui'
import Taro from '@tarojs/taro'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'

export default class Index extends Component {

  // componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick() {
    Taro.switchTab({
      url: '/pages/index/index'
    })
  }
  render () {
    return (
      <View className='container'>
        <View className="mine">
          <AtInput
            className ="account"
            name='value'
            title='当前绑定账户'
            type='text'
            border={false}
            placeholder='mis_tnlou'
            disabled
          />

          <View className="">
            <AtButton type="primary" onClick={() => this.handleClick()} circle>解除绑定</AtButton>
          </View>
        </View>
      </View>
    )
  }
}
