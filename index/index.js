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
    //this.refresh()
  },

  onShow: function() {
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
    var itemList = ['FY4A中国区', 'FY4A圆盘图', 'Himawari8东亚', 'Himawari8圆盘图', 'GOES-WEST圆盘图'] //GOES16也称为GOES-WEST，这个就只写在注释里了
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
      case "FY4A中国区": //无大图
      case "FY4A圆盘图": //无大图
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
      case "GOES-WEST圆盘图":
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
    /*
    FY4A图像时间列表接口 http://fy4.nsmc.org.cn/nsmc/v1/nsmc/image/animation/datatime/mongodb?dataCode=FY4A-_AGRI--_N_REGI_1047E_L1C_TCC-_MULT_GLL_YYYYMMDDHHmm_1000M_V0001.JPG&hourRange=3&isHaveNight=0
    FY4A大图链接接口 http://fy4.nsmc.org.cn/nsmc/v1/nsmc/image/animation/url?filenameCode=FY4A-_AGRI--_N_REGI_1047E_L1C_MTCC_MULT_GLL_YYYYMMDDhhmmss_YYYYMMDDhhmmss_4000M_V0001.JPG&dateString=20180804134500_
    注：FY4A大图接口有延迟，暂不使用。
    */
    const FY4A = 'http://img.nsmc.org.cn/CLOUDIMAGE/FY4A/MTCC/FY4A_CHINA.JPG'
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
          imgsrc: FY4A + "?v=" + this.data.time //图片末尾都加时间，为了防止缓存。时间5分钟变一次，防止浪费流量。
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
      case "GOES-WEST圆盘图":
        that.setData({
          imgsrc: GOES16_circle + "?v=" + this.data.time
        })
        break;
    }
  }
})