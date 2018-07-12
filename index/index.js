const app = getApp()
const hotapp = require('../utils/hotapp.js')



/*TODO:
1. 接入葵花8云图
*/

Page({
  data: {
    imgsrc: "",
    img_load_complete: false,
    img_name: "FY4A中国区高清",
    time: 0
  },

  onLoad: function () {
    this.setData({
      time: Math.round(new Date().getTime() / 600000)//10min
    })
    this.refresh()
  },

  imageLoad: function (event) {
    this.setData({
      img_load_complete: true
    })
    //console.log(event)
  },

  openList: function () {
    var that = this
    //var itemList = ['FY4A真彩色', 'FY2E彩色云图', 'FY4A中国区高清', 'FY4A圆盘图高清', '更多卫星云图适配中……']
    var itemList = ['FY4A中国区高清', 'FY4A圆盘图高清', 'FY2E彩色云图', '更多卫星云图适配中……']
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        if (!res.cancel) {
          that.setData({
            img_name: itemList[res.tapIndex],
            img_num: 0
          })
          that.refresh()
        }
      }
    });
  },

  onShareAppMessage(options) {
    return {
      title: '台风来了吗？看看云图吧！',
      path: '/index/index'
    }
  },





  imageTap: function (event) {
    switch (this.data.img_name) {
      case "FY4A真彩色":
      case "FY2E彩色云图":
        var full_imgurl = this.data.imgsrc.replace(/\/medium/, "")
        wx.previewImage({
          current: full_imgurl, // 当前显示图片的http链接
          urls: [full_imgurl] // 需要预览的图片http链接列表
        })
        break;
      case "FY4A中国区高清":
      case "FY4A圆盘图高清":
        wx.previewImage({
          current: this.data.imgsrc + "?v=" + this.data.time, // 当前显示图片的http链接
          urls: [this.data.imgsrc + "?v=" + this.data.time] // 需要预览的图片http链接列表
        })
      default:

    }

  },

  refresh: function (event) {
    //云图列表接口
    const FY4A = "http://www.nmc.cn/rest/category/d3236549863e453aab0ccc4027105bad" //从这里找到的：http://wx.nmc.cn/f/page/5fa5e41b6552474b91f95475fb5ad893/weatherMonitor/satellite
    const FY2E = 'http://www.nmc.cn/f/rest/relevant/52' //从这里找到的：http://www.nmc.gov.cn/publish/satellite/fy2.htm
    const FY4A_big = 'http://img.nsmc.org.cn/CLOUDIMAGE/FY4A/MTCC/FY4A_CHINA.JPG'
    const FY4A_circle_big = 'http://img.nsmc.org.cn/CLOUDIMAGE/FY4A/MTCC/FY4A_DISK.JPG'
    var that = this
    this.setData({ //显示加载中
      img_load_complete: false
    })
    //*****云图适配器*****
    switch (this.data.img_name) {
      case "FY4A真彩色":
        hotapp.request({ //中央气象台网站不支持https，只能用hotapp代理了
          useProxy: true,
          url: FY4A, // 需要代理请求的网址
          success: function (res) {
            //console.log(res.data)
            var imgurl = res.data.dataList[0].imgPath
            that.setData({ //官方文档指出必须使用setData()方法才能将数据传走
              imgsrc: "http://image.nmc.cn" + imgurl
            })
          }
        })
        break;
      case "FY2E彩色云图":
        hotapp.request({
          useProxy: true,
          url: FY2E,
          success: function (res) {
            //console.log(res.data)
            var imgurl = res.data[0].imgPath
            that.setData({
              imgsrc: "http://image.nmc.cn" + imgurl
            })
          }
        })
        break;
      case "FY4A中国区高清":
        that.setData({
          imgsrc: FY4A_big + "?v=" + this.data.time
        })
        break;
      case "FY4A圆盘图高清":
        that.setData({
          imgsrc: FY4A_circle_big + "?v=" + this.data.time
        })
        break;
      default:

    }
  }
})