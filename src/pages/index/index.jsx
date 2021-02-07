import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtIcon, AtTag } from 'taro-ui'

import ProgresCanvas from "../../components/ProgressCircle/index";//页面引入
const progData = {
  stepone: 2,//底层圆进度，默认满圆
  steptwo: 1,//上层圆进度
  size: 1.2,//大小
  width: 8,//宽度
  colorone: "#E7E7E7",//底层圆颜色
  colortwo: "#FFB17D",//上层圆颜色
  idone: "bigdata_pro0101",//底层圆id(可用随机数)
  idtwo: "bigdata_pro0102",//上层圆id
  start: 1,//开始位置（不需要可屏蔽，相对应progress里面做相应屏蔽）
  end: 1//控制整圆or半圆
};
 

 // 按需引入
import './index.scss'

export default class Index extends Component {

  state = {
    tags: [{
      id: 1,
      active: true,
      name: '所有'
    }, {
      id: 2,
      active: false,
      name: '未绑定'
    }, {
      id: 3,
      active: false,
      name: '未读完'
    }, {
      id: 4,
      active: false,
      name: '今日入院'
    }],
    personList:[
      {
        admitDate: "2021-02-05 14:14:36",
        age: 75,
        bedNo: "1",
        idCard: "330719194612244026",
        inhospNo: "10099231",
        isToday: 1,
        mobileNo: "13706895589",
        patName: "唐永凤",
        readNum: 0,
        readPercent: "0.00%",
        sendNum: 11,
        serialNo: "421702",
        sexCode: "2",
        sexName: "女",
        disparity: '1',
        id:'111111',
        bindFlag:0
      },
      {
        admitDate: "2021-01-27 14:14:36",
        age: 75,
        bedNo: "1",
        idCard: "330719194612244026",
        inhospNo: "10099231",
        isToday: 0,
        mobileNo: "13706895589",
        patName: "陈正洪",
        readNum: 0,
        readPercent: "0.00%",
        sendNum: 0,
        serialNo: "421702",
        sexCode: "2",
        sexName: "女",
        disparity: '6',
        id:'22222',
        bindFlag:1
      }
    ],
  }

  // componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // 标签筛选
  chooseTags(id) {
    let { tags,showElem } = this.state
    let index = tags.findIndex(item => item.id == id)
    tags[index].active = !tags[index].active
    if(index == 0){
      tags.forEach((item1,index1)=>{
        tags[index1].active = index1 == 0? 1:0
      })
    }else{
      if(tags[index].active){
        tags[0].active = 0
      }
        if(!tags[1].active && !tags[2].active && !tags[3].active){
          tags[0].active = true
        }
    }
    this.setState({
      tags
    })
  }

  render () {
    const { tags,personList } = this.state
    return (
      <View className='container tabbar'>
        <View className="fixed-top align-center justify-center" onClick={() => Taro.navigateTo({ url: '/pages/department/index' })} >
          <View>新生儿科-滨江</View>
          <AtIcon value="chevron-down" />
        </View>

        <View className="tags align-center">
          {
            tags.map(item => (
              <View className="tag" key={item.id}>
                <AtTag active={item.active} circle onClick={() => this.chooseTags(item.id)}>
                  {item.name}
                </AtTag>
              </View>
            ))
          }
        </View>

        <View className="patient-list flex">
        { 
            personList.map(item => (
              <View key={item.id} style={{display:tags[1].active ==1 && item.bindFlag == 1?'none': tags[2].active ==1&&(item.sendNum - item.readNum==0)?'none':tags[3].active ==1&&item.isToday == 0?'none':''}} className="patient-item align-center" onClick={() => Taro.navigateTo({ url: '/pages/patient/index?sexName='+item.sexName+'&age='+item.age+'&serialNo='+item.serialNo+'&admitDate='+item.admitDate+'&mobileNo='+item.mobileNo+'&deptCode='+'212'+'&patName='+item.patName+'&bedNo='+item.bedNo})}>
              {item.bindFlag == 0 &&
                <View className="icon-stop">
                  <View className="stop-p">待</View>
                </View>
              }
            <View className="patient-circle"></View>
            <View className="patient-info">
              <View className="align-center">
                <View className="patient-name" >{item.patName}</View>
              </View>
              <View className="patient-no">{item.mobileNo}</View>
              <view className="substr patient-inhosp display-flexcenter">
                    <text className="color-FA6400">{ item.readNum }</text>
                    <text
                      className="pd-5rl">/
                    </text>
                    { item.sendNum }
              </view>
            </View>
            <View className={`patient-days ${item.disparity === '1' ? 'bg-7DCE7F' : 'bg-bbb'}`} >{item.disparity}天</View>
            </View>
            ))
          } 
        </View>
      </View>
    )
  }
}
