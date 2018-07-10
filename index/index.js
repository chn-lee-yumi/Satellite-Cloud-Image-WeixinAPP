const app = getApp()
const hotapp = require('../utils/hotapp.js')



/*TODO:
3. 接入中央气象台其它云图（不要求能播放了）
1. 实现图像列表播放
2. 实现更多图像列表（基于图片命名规律）
4. 接入葵花8云图
*/

Page({
  data: {
    imgsrc: "",
    img_load_complete: false,
    img_name: "FY4A真彩色"
  },

  onLoad: function() {
    this.refresh()
  },

  imageLoad: function(event) {
    this.setData({
      img_load_complete: true
    })
    console.log(event)
  },

  openList: function() {
    var that = this
    wx.showActionSheet({
      itemList: ['FY4A真彩色', 'FY2E彩色云图', '开发中……'],
      success: function(res) {
        if (!res.cancel) {
          switch (res.tapIndex) {
            case 0:
              that.setData({
                img_name: "FY4A真彩色"
              })
              break;
            case 1:
              that.setData({
                img_name: "FY2E彩色云图"
              })
              break;
            default:
              that.setData({
                img_name: "FY4A真彩色"
              })
          }
          that.refresh()
        }
      }
    });
  },




  imageTap: function(event) {
    switch (this.data.img_name) {
      case "FY4A真彩色":
      case "FY2E彩色云图":
        var full_imgurl = this.data.imgsrc.replace(/\/medium/, "")
        wx.previewImage({
          current: full_imgurl, // 当前显示图片的http链接
          urls: [full_imgurl] // 需要预览的图片http链接列表
        })
        break;
      default:

    }
    
  },

  refresh: function(event) {
    //云图列表接口
    const FY4A = "http://www.nmc.cn/rest/category/d3236549863e453aab0ccc4027105bad"//从这里找到的：http://wx.nmc.cn/f/page/5fa5e41b6552474b91f95475fb5ad893/weatherMonitor/satellite
    const FY2E = 'http://www.nmc.cn/f/rest/relevant/52'//从这里找到的：http://www.nmc.gov.cn/publish/satellite/fy2.htm
    var that = this
    this.setData({//显示加载中
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
            console.log(res.data)
            var imgurl = res.data[0].imgPath
            that.setData({ 
              imgsrc: "http://image.nmc.cn" + imgurl
            })
          }
        })
        break;
      default:
        
    }
  }
})