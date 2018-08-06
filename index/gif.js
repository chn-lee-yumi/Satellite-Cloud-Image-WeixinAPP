const app = getApp()
const hotapp = require('../utils/hotapp.js')

//图片接口
const FY2_api = "http://www.nsmc.org.cn/NSMC/datalist/fy2_color.txt" //图像列表接口
const FY2_url = "http://img.nsmc.org.cn/CLOUDIMAGE/FY2/WXCL/" //URL前缀

/*
Himawari8的图片质量更好，加载速度较慢。
风云二号图片质量较差，加载速度较快。
考虑到用户体验，且Himawari8云图已在实时云图界面出现，这里选择风云二号。
*/

/*
其它数据：
风云二号72小时动图（包括各种图）：http://www.nsmc.org.cn/NSMC/Channels/100028.html
（彩色云图接口）http://www.nsmc.org.cn/NSMC/datalist/fy2_color.txt
（URL例子）http://img.nsmc.org.cn/CLOUDIMAGE/FY2/WXCL/SEVP_NSMC_WXCL_ASC_E99_ACHN_LNO_PY_20180721071500000.JPG
Himawari8图片列表：https://www.cwb.gov.tw/V7/observe/satellite/Sat_TrueEA.htm
（东亚彩色云图接口接口）https://www.cwb.gov.tw/V7/js/ts1p_1000.js
（URL例子）https://www.cwb.gov.tw/V7/observe/satellite/Data/ts1p/ts1p-2018-08-04-23-40.jpg
*/

Page({
  data: {
    imgsrc: "",
    img_load_complete: false,
    img_name: "风云二号彩色云图",
    img_num: 48,
    img_num_max: 48,
    img_list: [],
    is_playing: false
  },

  onLoad: function() {
    var that = this
    hotapp.request({
      useProxy: true,
      url: FY2_api,
      success: function(res) {
        //console.log(res.data)
        //console.log(res.data.split(/,\s\s/,48))
        that.setData({
          img_list: res.data.split(/,\s\s/, 48)
          //imgsrc: FY2_url + res.data.split(/,\s\s/, 48)[0]
        })
        that.refresh() //刷新图片
      }
    })
  },

  onShareAppMessage(options) {
    return {
      title: '台风来了吗？看看云图吧！',
      path: '/index/index'
    }
  },

  imageLoad: function(event) {
    this.setData({
      img_load_complete: true
    })
    //console.log(event)
  },

  doSetTimeout: function(i) {
    var that = this
    setTimeout(function() {
      console.log(i);
      that.setData({
        img_num: i
      })
      that.refresh()
      if (i == that.data.img_num_max) {
        that.setData({
          is_playing: false
        })
      }
    }, 250 * i);
  },

  playPic: function(event) {
    //console.log("playPic")
    for (var i = 1; i <= this.data.img_num_max; ++i)
      this.doSetTimeout(i);
    this.setData({
      is_playing: true
    })
  },

  changePic: function(event) {
    //console.log(event.detail.value)
    this.setData({
      img_num: event.detail.value
    })
    this.refresh()
  },

  imageTap: function(event) {
    /*//不再采用大图显示所有图片的方式，因为微信会重新下载所有图片，这样很消耗流量。
    var full_imgurl = []
    for (var i = this.data.img_num_max - 1; i >= 0; i--) {
      var imgurl = this.data.img_list[i]
      full_imgurl.push(FY2_url + imgurl) //没有小图，原本显示的就是大图
    }
    //console.log(full_imgurl)
    wx.previewImage({
      current: full_imgurl[this.data.img_num - 1],
      urls: full_imgurl
    })*/
    //TODO: 解决图片播放闪烁的问题（可能需要先下载图片，再播放）
    wx.previewImage({
      current: this.data.imgsrc,
      urls: [this.data.imgsrc]
    })
  },

  refresh: function(event) {
    //console.log(this.data.img_json.dataList)
    //console.log(this.data.img_num)
    var imgurl = this.data.img_list[this.data.img_num_max - this.data.img_num]
    this.setData({
      imgsrc: FY2_url + imgurl
    })
  },
})