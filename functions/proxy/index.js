//云函数作为http代理 https://developers.weixin.qq.com/community/develop/doc/000c82801a45e8ca18c7e8fba51800
const cloud = require('wx-server-sdk')
const request = require('sync-request');
cloud.init()
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  var res = request('GET', event.url);
  var txt = res.getBody().toString()
  console.log(txt);
  return {
    // event,
    body: txt,
    // openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
  }
}