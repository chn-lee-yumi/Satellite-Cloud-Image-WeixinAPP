/*
TODO: 目前视频播放较卡，怀疑码率太高。打算使用node.js服务器压缩视频，优化观看效果。

<video style="width: 750rpx;" src="http://hk.gcc.ac.cn/CLOUDIMAGE/FY4A.china.72h.mp4?v={{time}}"></video>
<video style="width: 750rpx;" src="http://img.nsmc.org.cn/CLOUDIMAGE/FY4A/MTCC/VIDEO/FY4A.disk.72h.mp4?v={{time}}"></video>

http://hk.gcc.ac.cn/CLOUDIMAGE/FY4A.china.72h.mp4?v={{time}}
http://img.nsmc.org.cn/CLOUDIMAGE/FY4A/MTCC/VIDEO/FY4A.china.72h.mp4?v={{time}}
*/
const CACHE_TIME = 600000 //缓存时间，单位毫秒。600000ms=10分钟
Page({

    /**
     * 页面的初始数据
     */
    data: {
        img_src: "", //图片url
        img_load_complete: true, //图片是否加载完成。false会转圈圈，true则圈圈消失
        img_name: "“一带一路”区域72小时（约11M）", //图片名字（标题）
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //加载（刷新）图片
        this.refresh()
    },

    openList: function (event) { //查看区域图
        //根据button的data-type来决定显示哪个列表
        var itemList
        switch (event.target.dataset.type) {
            case 'all':
                itemList = ['“一带一路”区域72小时（约11M）', '72小时中国区（约35M）', '72小时全圆盘（约30M）', '72小时闪电云图（约26M）', "72小时静止卫星全球云图（约16M）"]
                break
            default:
                itemList = []
                break
        }
        var that = this
        //点击对应标签后，修改标题，然后刷新
        wx.showActionSheet({
            itemList: itemList,
            success: function (res) {
                if (!res.cancel) {
                    that.setData({
                        img_name: itemList[res.tapIndex] //设置标题
                    })
                    that.refresh() //刷新图片。refresh函数会根据标题来更新图片。
                }
            }
        });
    },

    refresh: function (event) { //刷新图片
        const FY2H = 'http://img.nsmc.org.cn/CLOUDIMAGE/FY2H/VIDEO/FY2H.br.72h.mp4' //“一带一路”区域72小时
        const FY4A = 'http://img.nsmc.org.cn/CLOUDIMAGE/FY4A/MTCC/VIDEO/FY4A.china.72h.mp4' //72小时中国区
        const FY4A_circle = 'http://img.nsmc.org.cn/CLOUDIMAGE/FY4A/MTCC/VIDEO/FY4A.disk.72h.mp4' //72小时全圆盘
        const FY4A_LMI = 'http://img.nsmc.org.cn/CLOUDIMAGE/FY4A/MTCC/VIDEO/FY4A.LMI.72h.mp4' //72小时闪电云图
        const GEO = 'https://img.nsmc.org.cn/CLOUDIMAGE/GEOS/MOS/IRX/VIDEO/GEOS.MOS.IRX.GBAL.72h.mp4' //72小时静止卫星全球云图

        //准备变量
        //var old_img_src = this.data.img_src //旧url，后面会和新url做判断，如果相同，则图片算直接加载完毕
        var new_img_src = '' //新url
        var cache_time = Math.round(new Date().getTime() / CACHE_TIME) //与时间相关的参数，每过CACHE_TIME增加1。作为参数附带在访问图片后面（?t=xxxxxx），以防止缓存

        //显示加载中
        // this.setData({
        //     img_load_complete: false
        // })

        //根据标题来显示图片（“云图适配器”）
        var that = this
        switch (this.data.img_name) {

            case "“一带一路”区域72小时（约11M）":
                new_img_src = FY2H + "?t=" + cache_time //图片末尾都加时间，为了防止缓存。时间5分钟变一次，防止浪费流量。
                break;

            case "72小时中国区（约35M）":
                new_img_src = FY4A + "?t=" + cache_time
                break;

            case "72小时全圆盘（约30M）":
                new_img_src = FY4A_circle + "?t=" + cache_time
                break;

            case "72小时闪电云图（约26M）":
                new_img_src = FY4A_LMI + "?t=" + cache_time
                break;

            case "72小时静止卫星全球云图（约16M）":
                new_img_src = GEO + "?t=" + cache_time
                break;
        }

        //检查新的图片url，判断是否和旧url一样
        // if (old_img_src == new_img_src) {
        //     //如果url相同，图片不会加载，不会触发imageLoad，所以需要手动把“加载中”去掉
        //     setTimeout(function() { //等0.25s再取消圈圈，免得用户以为按钮无效
        //         that.setData({
        //             img_load_complete: true
        //         })
        //     }, 250);
        // } else {
        //     //图片url不同，则更新图片url，图片加载完成后会自动触发imageLoad，把“加载中”去掉
        //     this.setData({
        //         img_src: new_img_src
        //     })
        // }
        this.setData({
            img_src: new_img_src
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            cache_time: Math.round(new Date().getTime() / 600000) //每次打开页面都刷新一下缓存时间
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: '台风来了吗？看看云图吧！',
            path: '/index/index'
        }
    }
})