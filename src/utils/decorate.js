import Taro from '@tarojs/taro'
import { handleNotWeappEnv } from './taro-api';

/**
 *  该文件可以尝试自定义一些装饰器
 */

export function shareAppMessage(opts) {

  return function(Component) {

    if (!handleNotWeappEnv()) return false

    class shareAppMessage extends Component {
      async componentWillMount() {
        Taro.showShareMenu({
          withShareTicket: true
        });

        if (super.componentWillMount) {
          super.componentWillMount();
        }
      }
      createShareOpts (res) {
        // 写相应的路径进行处理，给出type值做出判断，最好是 key-value值 
      }

      onShareAppMessage(res) {
        // 判断分享按钮来自哪里
        if (res.from === 'menu') {
        }
        return this.createShareOpts(res)
      }

      render() {
        return super.render();
      }
    }

    return shareAppMessage
  }
}