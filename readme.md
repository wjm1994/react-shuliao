# Taro-shuliao-react

是一个基于Taro + Taro UI开发的跨端项目

# 关于Taro-shuliao-react

目前主要兼容平台为h5和微信小程序，并且包括医院的PDA

> PDA在最初开发版本会正常开发，之后会锁定版本，并且在gitlab打tag

# 安装
需要安装 `Taro` 开发工具 `@tarojs/cli`，`Taro` 版本为 `👽 Taro v3.0.25`

```javascript
  npm install -g @tarojs/cli
```
然后在项目中安装 `Taro UI`

```javascript
  npm install taro-ui
```

# 温馨提示

- 初期开发者提供了`plop`指令，可以简化新建页面、组件的操作，只需执行`npm run plop`，按照流程走即可

- 开发时要避开使用 `componentDidMount`

# 打包
打包时按照要求进行 `npm run build:weapp`， `npm run build:h5`

