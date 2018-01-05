/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
let routerMode = 'hash';
let baseUrl= 'http://192.168.41.67:7080/Car/';
let imgServer = "https://img12.360buyimg.com/n5/";
let appID = 'wx498f837e2e28f748';
let publicKey = 'A30D-634C-0A4F';
let redirectUrl = 'http://baoyanghui.com/wx/redirect.php';
let accessArr = [
  'login'
]

if (process.env.NODE_ENV == 'development') {
  baseUrl= '/apis/';
}else if(process.env.NODE_ENV == 'production'){
  baseUrl= 'http://baoyanghui.com/Car_2_0/';
  // baseUrl= 'http://192.168.41.67:7080/Car/';
  // baseUrl= 'http://www.vic-info.com:7080/Car/';
}

export {
  baseUrl,
  imgServer,
  publicKey,
  routerMode,
  appID,
  redirectUrl,
  accessArr
}
