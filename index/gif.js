const app = getApp()
const hotapp = require('../utils/hotapp.js')

//图片接口
//const FY2_api = "http://www.nsmc.org.cn/NSMC/datalist/fy2_color.txt" //图像列表接口
//const FY2_url = "http://img.nsmc.org.cn/CLOUDIMAGE/FY2/WXCL/" //URL前缀
const FY2_api = "http://www.nsmc.org.cn/NSMC/datalist/fy2g/fy2g_lan.txt" //图像列表接口
const FY2_url = "http://img.nsmc.org.cn/CLOUDIMAGE/FY2G/lan/" //URL前缀
const FY2_txt = "FY2G_LAN_CLC_GRA_" //图片名称前缀
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
（中国区域云图接口）http://www.nsmc.org.cn/NSMC/datalist/fy2g/fy2g_lan.txt
（URL例子）http://img.nsmc.org.cn/CLOUDIMAGE/FY2G/lan/FY2G_LAN_IR1_GRA_20180913_2100.jpg
          红外一彩色：FY2G_LAN_CLC_GRA_

Himawari8图片列表：https://www.cwb.gov.tw/V7/observe/satellite/Sat_TrueEA.htm
（东亚彩色云图接口接口）https://www.cwb.gov.tw/V7/js/ts1p_1000.js
（URL例子）https://www.cwb.gov.tw/V7/observe/satellite/Data/ts1p/ts1p-2018-08-04-23-40.jpg
*/

Page({
  data: {
    imgsrc: "",
    img_load_complete: false,
    img_name: "风云二号 红外一（彩色）云图",
    img_num: 1,
    img_num_max: 1,
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
        /*var list = res.data.split(/,\s\s/, 72)
        var list2 = [] //隔一张抽一张
        for (var i = 0; i < that.data.img_num_max; i++) {
          list2.push(list[i * 2])
        }*/
        var list = res.data.split(/,\s\s/)
        var list2 = [] //筛选出需要的图片
        var img_num=0
        for (var tmp_url in list) {
          if (list[tmp_url].indexOf(FY2_txt) != -1) {
            list2.push(list[tmp_url])
            img_num++
            //console.log(list[tmp_url])
          }
        }
        console.log(img_num)
        that.setData({
          //img_num: img_num,
          //img_num_max: img_num,
          img_num: 48, //图片数量太多会导致切换时闪烁
          img_num_max: 48,
          img_list: list2
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
    }, 200 * i);
  },

  playPic: function(event) {
    //TODO: 解决图片播放闪烁的问题（可能需要先下载图片，再播放）
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