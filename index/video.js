// index/video.js
/*
TODO: 压缩视频，优化观看效果。

<video style="width: 750rpx;" src="http://hk.gcc.ac.cn/CLOUDIMAGE/FY4A.china.72h.mp4?v={{time}}"></video>
<video style="width: 750rpx;" src="http://img.nsmc.org.cn/CLOUDIMAGE/FY4A/MTCC/VIDEO/FY4A.disk.72h.mp4?v={{time}}"></video>

http://hk.gcc.ac.cn/CLOUDIMAGE/FY4A.china.72h.mp4?v={{time}}
http://img.nsmc.org.cn/CLOUDIMAGE/FY4A/MTCC/VIDEO/FY4A.china.72h.mp4?v={{time}}
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      time: Math.round(new Date().getTime() / 600000)
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})