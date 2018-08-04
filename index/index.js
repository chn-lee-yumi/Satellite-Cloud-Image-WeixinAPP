const app = getApp()
const hotapp = require('../utils/hotapp.js')

/*TODO:
 */

Page({
  data: {
    imgsrc: "",
    img_load_complete: false,
    img_name: "FY4A中国区",
    time: 0
  },

  onLoad: function() {
    this.setData({
      time: Math.round(new Date().getTime() / 300000) //5min
    })
    this.refresh()
  },

  imageLoad: function(event) {
    this.setData({
      img_load_complete: true
    })
    //console.log(event)
  },

  openList: function() {
    var that = this
    //var itemList = ['FY4A真彩色', 'FY2E彩色云图', 'FY4A中国区高清', 'FY4A圆盘图高清', '更多卫星云图适配中……']
    var itemList = ['FY4A中国区', 'Himawari8东亚', 'FY4A圆盘图', 'Himawari8圆盘图', 'GOES16（GOES-WEST）圆盘图']
    wx.showActionSheet({
      itemList: itemList,
      success: function(res) {
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





  imageTap: function(event) { //大图链接
    switch (this.data.img_name) {
      case "FY4A中国区":
      case "FY4A圆盘图":
        wx.previewImage({
          current: this.data.imgsrc,
          urls: [this.data.imgsrc]
        })
        break;
      case "Himawari8东亚":
      case "Himawari8圆盘图":
        var full_imgurl = this.data.imgsrc.replace(/_1000/, "").replace(/_1000/, "")
        wx.previewImage({
          current: full_imgurl,
          urls: [full_imgurl]
        })
        break;
      case "GOES16（GOES-WEST）圆盘图":
        var full_imgurl = this.data.imgsrc.replace(/678/, "1808").replace(/678/, "1808")
        wx.previewImage({
          current: full_imgurl,
          urls: [full_imgurl]
        })
        break;

    }

  },

  refresh: function(event) { //小图链接
    //云图列表接口
    const FY4A_big = 'http://img.nsmc.org.cn/CLOUDIMAGE/FY4A/MTCC/FY4A_CHINA.JPG'
    const FY4A_circle_big = 'http://img.nsmc.org.cn/CLOUDIMAGE/FY4A/MTCC/FY4A_DISK.JPG'
    const Himawari8_circle = 'https://www.cwb.gov.tw/V7/js/ts0p_1000.js'
    const Himawari8_east_asia = 'https://www.cwb.gov.tw/V7/js/ts1p_1000.js'
    const GOES16_circle = 'https://cdn.star.nesdis.noaa.gov/GOES16/ABI/FD/GEOCOLOR/678x678.jpg'
    var that = this
    this.setData({ //显示加载中
      img_load_complete: false
    })
    //*****云图适配器*****
    switch (this.data.img_name) {
      case "FY4A中国区":
        that.setData({
          imgsrc: FY4A_big + "?v=" + this.data.time
        })
        break;
      case "FY4A圆盘图":
        that.setData({
          imgsrc: FY4A_circle_big + "?v=" + this.data.time
        })
        break;
      case "Himawari8圆盘图":
        hotapp.request({
          useProxy: true,
          url: Himawari8_circle,
          success: function(res) {
            var imgurl = "https://www.cwb.gov.tw" + res.data.slice(19, 86)
            that.setData({
              imgsrc: imgurl
            })
          }
        })
        break;
      case "Himawari8东亚":
        hotapp.request({
          useProxy: true,
          url: Himawari8_east_asia,
          success: function(res) {
            var imgurl = "https://www.cwb.gov.tw" + res.data.slice(19, 86)
            that.setData({
              imgsrc: imgurl
            })
          }
        })
        break;
      case "GOES16（GOES-WEST）圆盘图":
        that.setData({
          imgsrc: GOES16_circle + "?v=" + this.data.time
        })
        break;

    }
  }
})