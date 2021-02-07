import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View ,Button } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import { AtIcon,AtButton,AtModal, AtModalHeader, AtModalContent, AtModalAction ,AtInput ,AtToast } from 'taro-ui'
import './index.scss'
class Patient extends Component {
  current = getCurrentInstance()
  state = {
    historyList: [{"date":"02月04日","eduRecordList":[{"eduRecordList":[{"date":"02月04日","educationId":"51856ca9b60d483fb34a300d93c9ac4c","educationTitle":"废弃口罩的处理方法","formReadNum":0,"formSendNum":0,"id":"fa071117e45b40a883020359c1fd423c","referStatus":1,"relationType":25,"sendTime":"2021-02-04 18:49:45","sendWhom":0,"senderId":"16d452d908414ba38dd1c3fc49bc8aa5","senderName":"zl","serialNo":"493025","time":"18:49","xjReadNum":0,"xjSendNum":0}],"formReadNum":0,"formSendNum":0,"sendWhom":0,"time":"18:49","xjReadNum":0,"xjSendNum":0},{"eduRecordList":[{"date":"02月04日","educationId":"a02a44a8fb3c46bd9052b4710b3bed78","educationTitle":"公众如何做好个人预防","formReadNum":0,"formSendNum":0,"id":"a57a15149d594b7d8b5b545bcecac7b0","referStatus":1,"relationType":25,"sendTime":"2021-02-04 18:46:53","sendWhom":0,"senderId":"16d452d908414ba38dd1c3fc49bc8aa5","senderName":"zl","serialNo":"493025","time":"18:46","xjReadNum":0,"xjSendNum":0},{"date":"02月04日","educationId":"f35ec1c4ac874643a2f1d01ed0421af8","educationTitle":"入院流程","formReadNum":0,"formSendNum":0,"id":"a8794195eeb74cd08eeb5e5cc327b430","referStatus":1,"relationType":25,"sendTime":"2021-02-04 18:46:53","sendWhom":0,"senderId":"16d452d908414ba38dd1c3fc49bc8aa5","senderName":"zl","serialNo":"493025","time":"18:46","xjReadNum":0,"xjSendNum":0}],"formReadNum":0,"formSendNum":0,"sendWhom":0,"time":"18:46","xjReadNum":0,"xjSendNum":0}],"formReadNum":0,"formSendNum":0,"sendTime":"2021-02-04 18:49:45","sendWhom":0,"xjReadNum":0,"xjSendNum":0}],
    isRefresh: false,
    personalInfo:{
      sexName:'',
      age:'',
      serialNo:'',
      mobileNo:'',
      admitDate:''
    },
    isShowPhone:false,
    valuePhone:'',
    errorMessage:'',
    businessCode:['906052_S','20005_S','906056_S','900004_S'],
    hugId:'',
    allItem:'',
    deptCode:'',
    isModalOpened:false,
    phoneVal:''
  }
  componentWillMount () {
    this.setTitle(this.current.router.params)
    let { personalInfo } = this.state
    const url = this.current.router.params;
    personalInfo = {
      sexName:url.sexName,
      age:url.age,
      serialNo:url.serialNo,
      mobileNo:url.mobileNo,
      admitDate:url.admitDate.substring(0,10)
    }
    this.setState({
      personalInfo
    })
  }
  setTitle(params) {
    Taro.setNavigationBarTitle({
      title:  params.bedNo+'床'+params.patName
    })
  }
  changePhone(){
    console.log(this.state)
    let { isModalOpened } = this.state
    isModalOpened = true
    this.setState({
      isModalOpened
    })
  }
  closeModal (type) {
    console.log(type)
    console.log(this.state)
    let { isModalOpened,phoneVal,personalInfo } = this.state
    if(type == 1){
      phoneVal = '';
      isModalOpened = false;
      this.setState({
        phoneVal,
        isModalOpened
      })
    }else if(type == 2){
      let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      console.log(personalInfo.mobileNo +','+ phoneVal)
      if(!phoneVal){
        phoneVal = '';
        this.setState({
          phoneVal,
        })
        this.showToast('手机号不能为空')
        return
      }else if(personalInfo.mobileNo == phoneVal){
        phoneVal = '';
        this.setState({
          phoneVal,
        })
        this.showToast('与当前默认号码一致')
        return
      }else if(!myreg.test(phoneVal)){
        phoneVal = '';
        this.setState({
          phoneVal,
        })
        this.showToast('手机号错误')
        return
      }
      isModalOpened = false;
      this.setState({
        isModalOpened
      })
      console.log('点击确定',phoneVal)
    }
  }
  showToast (name) {
    Taro.showToast({
      icon: 'none',
      title: name
    })
  }
  handlePhoneChange (value) {
    console.log('value-----',value)
    let { phoneVal } = this.state
    phoneVal = value
    this.setState({
      phoneVal
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
  }
  render() {
    const { personalInfo,historyList,isOpened } = this.state
    return (
      <View className="container">
        <View className="info-head">
          <View className="at-row at-row--wrap">
            <View className="set-col at-col at-col-2">{personalInfo.sexName}</View>
            <View className="set-col at-col at-col-2">{personalInfo.age}</View>
            <View className="set-col at-col at-col-5"><text className="width-100 substr">{personalInfo.serialNo}</text></View>
          </View>
          <View className="at-row at-row__justify--between at-row--wrap">
            <View className="set-col at-col at-col-5"><text class="width-100 substr">入院时间:{personalInfo.admitDate}</text></View>
            <View className="set-col at-col at-col-5"><text class="width-100 substr">手机号:{personalInfo.mobileNo}</text></View>
            <View className="set-col at-col at-col-2" onClick={() => this.changePhone()}>
              <View className='at-icon at-icon-edit color-4A90E2'></View>
            </View>
          </View>
        <View className="content">
        {
          historyList.map(item => (
            <View className="timeline-item">
            <View className="timeline-icon"></View>
            <View className="timeline-content">
              <View className="timeline-title">
                <View className="timeline-title-data">{item.date}<View class="pd-10l">{item.chaDate ? '第'+item.chaDate+'天':''}</View></View>
              </View>
            </View>
            <View className="timeline-content">
            {
              item.eduRecordList.map(item1 => (
                <View className="form-item">
                  {
                    item1.eduRecordList.map((item2,index2) => (
                      <View>
                        {
                          index2 == 0 && 
                          <View className="input-block color-666 margin-0l">
                        <View>
                          {item2.time}
                          {index2==0?( item2.planId ? '自动推送':item2.senderName):''}
                        </View>
                      </View>
                        }
                      <View className="change-listcss">
                        <View className="input-block margin-0l detail-part">
                          <View className="float-left substr display-flex width-80">
                            <View className="pd-10r color-666">{item2.relationType == '1'?'PC/APP宣教任务':item2.relationType=='2'?'APP在院':item2.relationType=='3'?'PC在院':item2.relationType=='4'?'VIP':item2.relationType=='5'?'宣教记录':item2.relationType=='6'?'专科':item2.relationType=='7'?'场景配置':item2.relationType=='8'?'规则接管':item2.relationType=='9'?'第三方发送内容':item2.relationType=='10'?'日间手术':item2.relationType=='11'?'预约住院':item2.relationType=='12'?'病程管理':item2.relationType=='13'?'新版专科':item2.relationType=='14'?'门诊检查':item2.relationType=='15'?'门诊检验宣教':item2.relationType=='16'?'门诊疾病':item2.relationType=='17'?'门诊流程':item2.relationType=='18'?'预检分诊':item2.relationType=='19'?'公共':item2.relationType=='20'?'住院检查':item2.relationType=='21'?'住院检验':item2.relationType=='22'?'住院疾病':item2.relationType=='23'?'住院手术':item2.relationType=='24'?'住院流程':item2.relationType=='25'?'住院点对点':item2.relationType=='26'?'入院流程':item2.relationType=='27'?'点对点':''}</View>
                            <View className="education-title color-4A90E2">{item2.educationTitle}</View>
                          </View>
                          <View className="{item2.referStatus=='-1'?'color-warning float-right pd-10r':'color-666 float-right pd-10r'}">{item2.referStatus == 0?'未发送':item2.referStatus== -1 ?'未读':'已读'}</View>
                        </View>
                      </View>
                    </View>
                    ))
                  }
              </View>
              ))
            }
            </View>
          </View>    
          ))
        }
        </View>
      </View>
        <View className="btn-fixed">
          <AtButton className="push-course" block onClick={() => Taro.navigateTo({ url: '/pages/course/index' })}>推送课程</AtButton>
        </View>
        <AtModal isOpened={this.state.isModalOpened}>
          <AtModalHeader>请输入接收宣教手机号</AtModalHeader>
          <AtModalContent>
          <AtInput
        name='value'
        title=''
        type='text'
        placeholder='请输入手机号'
        value={this.state.phoneVal}
        onChange={this.handlePhoneChange.bind(this)}
      />
          </AtModalContent>
          <AtModalAction> 
          <Button onClick={this.closeModal.bind(this,1)}>
              取消
            </Button>
            <Button onClick={this.closeModal.bind(this,2)}>
              确定
            </Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}

export default Patient
