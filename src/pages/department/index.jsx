import React from 'react';
import { View } from '@tarojs/components'
import { AtIndexes } from 'taro-ui'


class Department extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			list: [{
				title: 'A',
				key: 'A',
				items: [
					{
						'name': '阿坝'
						// 此处可加其他业务字段
					},
					{
						'name': '阿拉善'
					}]
				},
				{
					title: 'B',
					key: 'B',
					items: [
						{
							'name': '北京'
						},
						{
							'name': '保定'
						}]
				}
			]
		}
	}

  componentDidShow() {

  }

	onClick() {}

  render() {
		const { list } = this.state
    return (
			<View style={{height: '100vh'}} >
				<AtIndexes list={list}
          onClick={this.onClick.bind(this)}>

				</AtIndexes>
			</View>
		)
  }
}

export default Department
