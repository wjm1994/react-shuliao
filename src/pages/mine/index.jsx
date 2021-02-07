import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton, AtInput } from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'

export default class Index extends Component {

  // componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='container tabbar'>
        <View className="mine">
          <View onClick={() => Taro.navigateTo({ url: '/pages/account/index' })}>
            <AtInput
              className ="account"
              name='value'
              title='当前绑定账户'
              type='text'
              border={false}
              placeholder='mis_tnlou'
              disabled
            />
          </View>
        </View>
      </View>
    )
  }
}
