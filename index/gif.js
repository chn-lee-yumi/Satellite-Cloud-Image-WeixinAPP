/* 云图动画
Himawari8的图片质量更好，加载速度较慢。
风云二号图片质量较差，加载速度较快。
考虑到用户体验，且Himawari8云图已在实时云图界面出现，这里选择风云二号。
*/
const app = getApp()
var request = require('../utils/request.js')
/* TODO
解决频闪的问题
*/

//图片接口
//const FY2_api = "http://www.nsmc.org.cn/NSMC/datalist/fy2_color.txt" //彩色图像列表接口（图片太大，暂不使用）
//const FY2_url = "http://img.nsmc.org.cn/CLOUDIMAGE/FY2/WXCL/" //URL前缀
const FY2_api = "http://www.nsmc.org.cn/NSMC/datalist/fy2g/fy2g_lan.txt" //图像列表接口
const FY2_url = "http://img.nsmc.org.cn/CLOUDIMAGE/FY2G/lan/" //URL前缀
const FY2_txt = "FY2G_LAN_CLC_GRA_" //图片名称前缀
const IMG_NUM = 48 //图片最大数量
const PLAY_INTERVAL = 125 //播放图片的切换间隔


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
        imgsrc: "", //图片url
        img_load_complete: true, //图片是否加载完成。false会转圈圈，true则圈圈消失
        img_display: "none", //是否显示图片。图片加载完成前为none，加载完成后为flex。
        loading_tips: "正在获取图片列表……", //图片加载的提示
        img_name: "风云二号 红外一（彩色）云图", //云图类别
        img_num: 1, //当前图片序号
        img_num_max: IMG_NUM, //图片最大序号
        img_list: [], //图片url列表
        is_playing: false, //是否正在播放，true则播放按钮会被disable
        last_cache_time: 0 //上一次的缓存时间，全局变量
    },

    onShow: function() { //判断是否超过缓存时间，如果超过，则请求图片列表，然后加载图片
        var cache_time = Math.round(new Date().getTime() / 300000) //与时间相关的参数，每5分钟+1，以防止缓存
        console.log(this.data.last_cache_time, cache_time)
        //没超过缓存时间或正在刷新则返回
        if (cache_time <= this.data.last_cache_time || this.data.img_load_complete == false) {
            return
        }
        //加载图片前隐藏图片
        this.setData({
            img_load_complete: false,
            img_display: "none",
            img_num: 1
        })
        //调用云函数获取图片列表
        var that = this
        request.callCloudFunction({
            // 云函数名称
            name: 'proxy',
            // 传给云函数的参数
            data: {
                url: FY2_api,
            }
        }).then(res => {
            console.log(res.result)
            that.data.last_cache_time = cache_time // 更新缓存时间
            var list_source = res.result.body.split(/,\s\s/) //所有图片的列表
            var list_seleted = [] //需要的图片的列表
            var img_num = 0
            //筛选出需要的图片
            for (var tmp_url in list_source) {
                if (list_source[tmp_url].indexOf(FY2_txt) != -1) {
                    list_seleted.push(list_source[tmp_url])
                    img_num++
                }
            }
            console.log(img_num) //打印图片数量
            that.setData({
                img_num: 1,
                img_num_max: IMG_NUM, //图片数量太多会导致切换时闪烁，24比较正常。如果改为img_num则为最大数量。
                img_list: list_seleted,
                loading_tips: "正在下载图片……"
            })
            //预播放一次，相当于预加载
            that.playPic()
            setTimeout(function() {
                that.setData({
                    img_load_complete: true,
                    img_display: "flex"
                })
            }, IMG_NUM * PLAY_INTERVAL + 100)
        }).catch(err => {
            console.log(err)
            wx.showToast({
                title: '获取图片列表失败，请重新打开动图页面',
                icon: 'none',
                duration: 3000
            })
        })
    },

    onShareAppMessage(options) {
        return {
            title: '台风来了吗？看看云图吧！',
            path: '/index/index'
        }
    },

    doSetTimeout: function(i) { //使用定时器播放图片，i为图片序号 TODO:允许停止
        var that = this
        setTimeout(function() {
            that.setData({
                img_num: i
            })
            that.refresh()
            if (i == that.data.img_num_max) {
                that.setData({
                    is_playing: false
                })
            }
        }, PLAY_INTERVAL * i);
    },

    playPic: function(event) { //播放图片
        //TODO: 解决图片播放闪烁的问题
        for (var i = 1; i <= this.data.img_num_max; ++i)
            this.doSetTimeout(i); //使用定时器来播放
        this.setData({
            is_playing: true
        })

    },

    imageTap: function(event) { //显示大图
        wx.previewImage({
            current: this.data.imgsrc, //没有大图
            urls: [this.data.imgsrc] //仅显示一张图片，如果是多张图片，微信会全部重新下载，这样很浪费用户流量
        })
    },

    changePic: function(event) { //拖动slider时修改图片
        console.log(event)
        this.setData({
            img_num: event.detail.value
        })
        this.refresh()
    },

    refresh: function(event) { //刷新图片
        var imgurl = this.data.img_list[this.data.img_num_max - this.data.img_num]
        this.setData({
            imgsrc: FY2_url + imgurl
        })
    },
})