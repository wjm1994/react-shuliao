
/**
 * @name ProgresCanvas
 * @desc 进度条
 * @taro 3.07
 * @date 2020/08/06
 */
 
import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Canvas, Image, CoverView } from "@tarojs/components";
 
import styles from "./index.scss";
import { getEnv } from '../../utils/taro-api' 

let clientHeight = Taro.$navBarWindowHeight; //可使用窗口高
let clientWidth = Taro.$navBarWindowWidth; //可使用窗口宽
 
let ratio; //根据尺寸动态计算 1px换算成多少rpx
 
export default class ProgresCanvas extends Component {
  static defaultProps = {
    data: "lalalal",
    color: "#7d79f3",
    progress: 0
  };
 
  state = { imageUrl: "", nowdata: "" };
 
  componentDidUpdate() {
    this.drawProgressbg();
  }
 
  //绘制背景
  drawProgressbg = async () => {
    //stepone, steptwo, size, width, colorone, colortwo
    const { data } = this.props;
    const { nowdata } = this.state;
 
    if (JSON.stringify(data) === JSON.stringify(nowdata)) {
      return;
    } else if (data) {
      // console.log("progressData====", data, nowdata);
      this.setState({ nowdata: data });
      Taro.getSystemInfo({
        success: (res) => {
          clientWidth = res.windowWidth;
          clientHeight = res.windowHeight;
          //屏幕宽度 375px = 750rpx, 1px = rpx
          // 1px = （750 / 屏幕宽度）rpx；
          // 1rpx = （屏幕宽度 / 750）px;
          ratio = 550 / clientWidth;
        }
      });
 
      // 使用 .createContext 获取绘图上下文 context
      const { canvas, ctx } = await this.getCanvasCtx(data.idone);
      ctx.lineWidth = Number(data.width);
      ctx.strokeStyle = `${data.colorone}`;
      // ctx.lineCap = "butt";
      ctx.beginPath(); //开始一个新的路径
      ctx.arc(69 / ratio, 69 / ratio, 60 / ratio, -Math.PI / data.start, data.end === 1 ? -2 * Math.PI : Math.PI + Math.PI / 2, false); //x,y,半径,开始,结束
      // ctx.closePath();
      ctx.stroke(); //对当前路径进行描边
 
      ctx.strokeStyle = `${data.colortwo}`;
      ctx.beginPath();
      if (data.end === 1) {
        ctx.arc(69 / ratio, 69 / ratio, 60 / ratio, -Math.PI / data.start, Number(data.steptwo) * Math.PI - Math.PI, false); //x,y,半径,开始,结束
      } else {
        ctx.arc(69 / ratio, 69 / ratio, 60 / ratio, -Math.PI / data.start, Number(data.steptwo) * Math.PI - Math.PI / 2, false); //x,y,半径,开始,结束
      }
 
      ctx.stroke();
 
      setTimeout(() => {
        const base64 = canvas.toDataURL("jpg", 0.6);
        this.setState({ imageUrl: base64 });
      }, 500);
    }
  };
 
  getCanvasCtx = async (eleId = "", delay = 200) => {
    return new Promise((resolve, reject) => {
      const t = setTimeout(() => {
        clearTimeout(t);
        Taro.createSelectorQuery()
          .select(`#${eleId}`)
          .fields({ node: true })
          .exec((res) => {
            if (res && res[0] && res[0].node) {
              const canvas = res[0].node;
              const ctx = canvas.getContext("2d");
              resolve({ canvas, ctx });
            } else {
              reject({});
            }
          });
      }, delay);
    });
  };
 
  render() {
    const { data } = this.props;
    const env = getEnv()

    if (env === 'web') {
      return (
        <View className={styles.progress_box} style={{ zIndex: 1 }}>
          <Image src={this.state.imageUrl} className={styles.img} />
  
          <Canvas className={styles.progress_bg} type="2d" id={data.idone} canvas-id={data.idone}></Canvas>
        </View>
      ) 
    } else {
      return (
        <CoverView className={styles.progress_box} style={{ zIndex: 1 }}>
          <Image src={this.state.imageUrl} className={styles.img} />
   
          <Canvas className={styles.progress_bg} type="2d" id={data.idone} canvas-id={data.idone}></Canvas>
        </CoverView>
      )
    }
    
  }
}
