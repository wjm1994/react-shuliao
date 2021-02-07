import React, { Component } from 'react'
import './app.scss'
import "taro-ui/dist/style/components/index.scss"
import { checkAppUpdate } from './utils/wx-api'

class App extends Component {

  componentDidMount () {
    checkAppUpdate()
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
