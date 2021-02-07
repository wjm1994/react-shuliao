import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { log } from '../../utils/pretty-log'
export default class Course extends Component {
  state = {
    deptCode: '',
    hugId: '',
    serialNo: '',

    active: 0,
    activeKey: 0,
    categoryList: [],
    courseList: [],
    selectList: [],
    pageNum: 0,
    pageSize: 10,
    isLastPage: false,
    isLoading: true,
    isSelectAll: false
  }

  onLoad({ deptCode = '', serialNo = '' }) {
    log.pretty('onload', `${deptCode}  ${serialNo}`)
    this.getHugId()
    this.setState({
      deptCode,
      serialNo
    })
  }


  render() {
    const tabList = [{
      id: 0,
      title: '病区热门'
    }, {
      id: 1,
      title: '本院课程'
    }]
    let { active, activeKey } = this.state
    return (
      <View className="container">
        <AtTabs current={active} tabList={tabList} onClick={ index => this.getCourseListByDept(index)}></AtTabs>
        <View className="content">
          <View className="category-list">

          </View>
          <View className="course-list">

          </View>
        </View>
        <View className="fixed-btn">
          
        </View>
      </View>
    )
  }


  initPageParams() {
    this.setState({
      pageNum: 0,
      pageSize: 10,
      isLastPage: false,
      isLoading: true,
      isSelectAll: false
    })
  }

  //todo
  getHugId() {

  }

  //todo
  getCourseCategory() {
    const { hugId } = this.data
    return getCourseCategory({
      hugId
    }).then(res => {
      if (res.res === 0) {
        this.setData({
          categoryList: res.data
        })
      }
    }).catch(err => {
      console.log(err)
      this.setData({
        isLoading: false
      })
    })
  }

  //todo
  getCourseList() {
    let { 
      deptCode,
      pageNum,
      pageSize ,
      serialNo,
      activeKey,
      isLastPage,
      active,
      categoryList,
      courseList,
      selectList,
      hugId
    } = this.data
    
    if (!isLastPage) {
      pageNum += 1
      let extraParams = active === 0 ? { deptCode, deptHotFlag: 1 } : {}
      this.setData({
        isLoading: true
      })
      getCourseList({
        ...extraParams,
        hugId,
        categoryId: categoryList[activeKey].categoryId,
        pageNum,
        pageSize,
        serialNo
      }).then(res => {
        if (res.res === 0) {
          let { isLastPage, list, pageNum } = JSON.parse(res.data)
          courseList = pageNum == 1 ? list : [...courseList, ...list]
          this.setData({
            isLastPage, 
            courseList,
            pageNum
          }, () => {
            this.setData({
              isSelectAll: checkIsAllSelect(courseList, selectList)
            })
          })
        }
        this.setData({
          isLoading: false
        })
      }).catch(err => {
        this.setData({
          isLoading: false
        })
      })
    }
  }

  getCourseListByDept(index) {
    this.setState({
      active: index,
      activeKey: 0,
      courseList: []
    }, () => {
      this.initPageParams()
      // this.getCourseList()
      log.pretty('getCourseListByDept', index)
    })
  }

  getCourseListByCategory(e) {
    let index = e.detail
    this.setData({
      activeKey: index,
      courseList: []
    }, () => {
      this.initPageParams()
      this.getCourseList()
    })
  }
  
  selectCourse(e) {
    let { id, isSend } = e.currentTarget.dataset
    let { selectList: list } = this.data
    if (!id || isSend) return
    let selectList = handleCourseList(id, list)
    this.setData({
      selectList
    })
  }

  selectAllCourse(e) {
    const isSelectAll = e.detail
    let { selectList, courseList } = this.data

    if (checkIsAllSend(courseList)) {
      wx.showToast({
        title: '当前列表暂无可选宣教',
        icon: 'none'
      })
      return
    }

    for (let i = 0; i < courseList.length; i++) {
      let item = courseList[i]
      let index = selectList.indexOf(item.id)
      if (item.isSend) continue
      if (index <= -1 && isSelectAll) {
        selectList.push(item.id)
      }
      if (index > -1 && !isSelectAll) {
        selectList.splice(index, 1)
      }
    }
    this.setData({
      isSelectAll,
      selectList
    })
  }

  sendCourse() {
    let { serialNo, selectList, hugId } = this.data
    
    sendCourse({
      hugId,
      serialNo,
      educationId: selectList.join(',')
    }).then(res => {
      if (res.res === 0) {
        wx.showToast({
          title: '推送成功'
        })
      } else {
        wx.showToast({
          title: '推送失败',
          icon: 'none'
        })
      }
      this.setData({
        selectList: [],
        isSelectAll: false
      }, () => {
        this.initPageParams()
        this.getCourseList()
      })
    })
  }
}


function checkIsAllSelect(courseList, selectList) {
  let isSelectAll = true, isSend = true
  if (selectList.length == 0 || courseList.length == 0) return false
  for (let i = 0; i < courseList.length; i++) {
    let item = courseList[i]
    let index = selectList.indexOf(item.id)
    if (item.isSend) {
      continue
    } else {
      isSend = false
    }
    if (index <= -1) {
      isSelectAll = false
      break;
    }
  }
  if (isSend) {
    return false
  }
  return isSelectAll
}

function checkIsAllSend (courseList) {
  let isSend = true
  if (courseList.length == 0) return true
  for (let i = 0; i < courseList.length; i++) {
    let item = courseList[i]
    if (!item.isSend) {
      isSend = false
      break
    }
  }
  return isSend
}

function handleCourseList(id, selectList) {
  selectList = selectList ? selectList : this.data.selectList
  let index = selectList.indexOf(id)
  if (index > -1) {
    selectList.splice(index, 1)
  } else {
    selectList.push(id)
  }
  return selectList
}