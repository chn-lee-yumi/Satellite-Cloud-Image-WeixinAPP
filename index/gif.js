const app = getApp()
const hotapp = require('../utils/hotapp.js')

//TODO: 播放功能按云图时间间隔来设定间隔（FY4A的图片拍照间隔不是相同的……不懂为啥）

/*
其它数据：（因为有FY4A，所以我觉得这个没必要做进小程序里）
风云二号72小时动图（包括各种图）：http://www.nsmc.org.cn/NSMC/Channels/100028.html
（彩色云图接口）http://www.nsmc.org.cn/NSMC/datalist/fy2_color.txt
（URL例子）http://img.nsmc.org.cn/CLOUDIMAGE/FY2/WXCL/SEVP_NSMC_WXCL_ASC_E99_ACHN_LNO_PY_20180721071500000.JPG
*/

Page({
  data: {
    imgsrc: "",
    img_load_complete: false,
    img_name: "FY4A真彩色",
    img_num: 0,
    img_json: '',
    img_num_max: 11,
    is_playing: false
  },

  onLoad: function() {
    const FY4A = "http://www.nmc.cn/rest/category/d3236549863e453aab0ccc4027105bad" //图像列表接口
    var that = this
    hotapp.request({
      useProxy: true,
      url: FY4A,
      success: function(res) {
        that.setData({
          img_json: res.data,
          img_num_max: res.data.dataList.length,
          img_num: res.data.dataList.length
        })
        that.refresh()
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
    }, 500 * i);
  },

  playFY4A: function(event) {
    console.log("Play FY4A")
    for (var i = 1; i <= this.data.img_num_max; ++i)
      this.doSetTimeout(i);
    this.setData({
      is_playing: true
    })
  },

  changeFY4A: function(event) {
    console.log(event.detail.value)
    this.setData({
      img_num: event.detail.value
    })
    this.refresh()
  },

  imageTap: function(event) {
    var full_imgurl = []
    for (var i = this.data.img_num_max - 1; i >= 0; i--) {
      full_imgurl.push("http://image.nmc.cn" + this.data.img_json.dataList[i].imgPath.replace(/\/medium/, ""))
    }
    //console.log(full_imgurl)
    //console.log(this.data.img_num)
    wx.previewImage({
      current: full_imgurl[this.data.img_num - 1],
      urls: full_imgurl
    })
  },

  refresh: function(event) {
    //console.log(this.data.img_json.dataList)
    //console.log(this.data.img_num)
    var imgurl = this.data.img_json.dataList[this.data.img_num_max - this.data.img_num].imgPath
    this.setData({
      imgsrc: "http://image.nmc.cn" + imgurl
    })
  },
})