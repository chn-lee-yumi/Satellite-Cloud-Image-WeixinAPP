const app = getApp()
const hotapp = require('../utils/hotapp.js');

/*TODO:
1. 实现图像列表播放
2. 实现更多图像列表（基于图片命名规律）
3. 接入中央气象台其它云图（不要求能播放了）
4. 接入葵花8云图
*/

//云图列表接口
//从这里找到的：http://wx.nmc.cn/f/page/5fa5e41b6552474b91f95475fb5ad893/weatherMonitor/satellite
const FY4A = "http://www.nmc.cn/rest/category/d3236549863e453aab0ccc4027105bad"
const FY2E = 'http://www.nmc.cn/f/rest/relevant/52'
Page({
  data: {
    imgsrc: "",
    img_load_complete: false,
    img_name: "FY4A真彩色"
  },
  onLoad: function() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    this.refresh()
  },

  refresh: function(event) {
    var that = this
    hotapp.request({ //中央气象台网站不支持https，只能用hotapp代理了
      useProxy: true,
      url: FY4A, // 需要代理请求的网址
      success: function(res) {
        console.log(res.data)
        var imgurl = res.data.dataList[0].imgPath
        console.log(imgurl)
        that.setData({ //官方文档指出必须使用setData()方法才能将数据传走
          imgsrc: "http://image.nmc.cn" + imgurl
        })
      }
    })
  },

  imageLoad: function(event) {
    console.log(event)
    this.setData({
      img_load_complete: true
    })
  },

  imageTap: function (event) {
    console.log(event)
    var full_imgurl = this.data.imgsrc.replace(/\/medium/, "")
    console.log(full_imgurl)
    wx.previewImage({
      current: full_imgurl, // 当前显示图片的http链接
      urls: [full_imgurl] // 需要预览的图片http链接列表
    })
  },

  openList: function() {
    wx.showActionSheet({
      itemList: ['FY4A真彩色', '开发中……', '开发中……'],
      success: function(res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
        }
      }
    });
  }



})