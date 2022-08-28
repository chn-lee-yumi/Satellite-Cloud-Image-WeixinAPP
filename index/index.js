/* 实时云图
5分钟刷新一次
*/
//const app = getApp()
const CACHE_TIME = 300000 //缓存时间，单位毫秒。300000ms=5分钟

Page({
    data: {
        img_src: "", //图片url
        img_load_complete: false, //图片是否加载完成。false会转圈圈，true则圈圈消失
        img_name: "FY4A中国区", //图片名字（标题）
    },

    onShareAppMessage(options) {
        return {
            title: '台风来了吗？看看云图吧！',
            path: '/index/index'
        }
    },

    onLoad: function () {
        //加载（刷新）图片
        this.refresh()
    },

    imageLoad: function (event) { //图片加载完成
        //取消转圈圈，显示图片
        this.setData({
            img_load_complete: true
        })
    },

    openList: function (event) { //查看区域图
        //根据button的data-type来决定显示哪个列表
        var itemList
        switch (event.target.dataset.type) {
            case 'area':
                itemList = ['FY4A中国区', 'FY4A闪电云图', 'FY2H“一带一路”区域', "FY3D全球影像", '静止卫星全球云图']
                break
            case 'circle':
                itemList = ['FY4A圆盘图', 'FY2H圆盘图', 'GOES-WEST圆盘图'] //GOES16也称为GOES-WEST，这个就只写在注释里了
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

    imageTap: function (event) { //点击图片，显示大图
        //根据不同的图片，给不同的大图链接
        switch (this.data.img_name) {
            case "FY4A中国区":
            case "FY4A闪电云图":
            case "FY4A圆盘图":
            case "FY3D全球影像":
            case "静止卫星全球云图":
            case "FY2H“一带一路”区域":
            case "FY2H圆盘图":
                wx.previewImage({
                    current: this.data.img_src, // 无大图，使用同一个链接
                    urls: [this.data.img_src]
                })
                break;
            case "GOES-WEST圆盘图":
                var full_imgurl = this.data.img_src.replace(/678/, "1808").replace(/678/, "1808")
                wx.previewImage({
                    current: full_imgurl,
                    urls: [full_imgurl]
                })
                break;
        }
    },

    refresh: function (event) { //刷新图片，显示小图
        //云图列表接口
        //FY4A图像时间列表接口 http://fy4.nsmc.org.cn/nsmc/v1/nsmc/image/animation/datatime/mongodb?dataCode=FY4A-_AGRI--_N_REGI_1047E_L1C_TCC-_MULT_GLL_YYYYMMDDHHmm_1000M_V0001.JPG&hourRange=3&isHaveNight=0
        //FY4A大图链接接口 http://fy4.nsmc.org.cn/nsmc/v1/nsmc/image/animation/url?filenameCode=FY4A-_AGRI--_N_REGI_1047E_L1C_MTCC_MULT_GLL_YYYYMMDDhhmmss_YYYYMMDDhhmmss_4000M_V0001.JPG&dateString=20180804134500_
        //注：FY4A大图接口有延迟，暂不使用。
        const FY4A = 'http://img.nsmc.org.cn/CLOUDIMAGE/FY4A/MTCC/FY4A_CHINA.JPG' //FY4A中国区
        const FY4A_circle = 'http://img.nsmc.org.cn/CLOUDIMAGE/FY4A/MTCC/FY4A_DISK.JPG' //FY4A圆盘图
        const FY2H = 'http://img.nsmc.org.cn/CLOUDIMAGE/FY2H/GLL/FY2H_ETV_SEC_GLB.jpg' //FY2H“一带一路”区域
        const FY2H_circle = 'http://img.nsmc.org.cn/CLOUDIMAGE/FY2H/NOM/FY2H_ETV_NOM.jpg' //FY2H圆盘图
        const GOES16_circle = 'https://cdn.star.nesdis.noaa.gov/GOES16/ABI/FD/GEOCOLOR/678x678.jpg' //GOES16圆盘图
        const FY4A_LMI = 'http://img.nsmc.org.cn/CLOUDIMAGE/FY4A/MTCC/FY4A_LMI.JPG' //闪电云图
        const GEO = 'http://img.nsmc.org.cn/CLOUDIMAGE/GEOS/MOS/IRX/PIC/GBAL/GEOS_IMAGR_GBAL_L2_MOS_IRX_GLL_YYYYMMDD_HHmm_10KM_MS.jpg' // 静止卫星全球云图
        const FY3D = 'http://img.nsmc.org.cn/CLOUDIMAGE/FY3D/MIPS/FY3D_MERSI_GLOBAL.jpg' //FY3D全球影像

        //准备变量
        var old_img_src = this.data.img_src //旧url，后面会和新url做判断，如果相同，则图片算直接加载完毕
        var new_img_src = '' //新url
        var cache_time = Math.round(new Date().getTime() / CACHE_TIME) //与时间相关的参数，每过CACHE_TIME增加1。作为参数附带在访问图片后面（?t=xxxxxx），以防止缓存

        //显示加载中
        this.setData({
            img_load_complete: false
        })

        //根据标题来显示图片（“云图适配器”）
        var that = this
        switch (this.data.img_name) {

            case "FY4A中国区":
                new_img_src = FY4A + "?t=" + cache_time //图片末尾都加时间，为了防止缓存。时间5分钟变一次，防止浪费流量。
                break;

            case "FY4A闪电云图":
                new_img_src = FY4A_LMI + "?t=" + cache_time //图片末尾都加时间，为了防止缓存。时间5分钟变一次，防止浪费流量。
                break;

            case "FY4A圆盘图":
                new_img_src = FY4A_circle + "?t=" + cache_time
                break;

            case "FY3D全球影像":
                new_img_src = FY3D + "?t=" + cache_time
                break;

            case "静止卫星全球云图":
                new_img_src = GEO + "?t=" + cache_time
                break;

            case "FY2H“一带一路”区域":
                new_img_src = FY2H + "?t=" + cache_time
                break;

            case "FY2H圆盘图":
                new_img_src = FY2H_circle + "?t=" + cache_time
                break;

            case "GOES-WEST圆盘图":
                new_img_src = GOES16_circle + "?t=" + cache_time
                break;
        }

        //检查新的图片url，判断是否和旧url一样
        if (old_img_src == new_img_src) {
            //如果url相同，图片不会加载，不会触发imageLoad，所以需要手动把“加载中”去掉
            setTimeout(function () { //等0.25s再取消圈圈，免得用户以为按钮无效
                that.setData({
                    img_load_complete: true
                })
            }, 250);
        } else {
            //图片url不同，则更新图片url，图片加载完成后会自动触发imageLoad，把“加载中”去掉
            this.setData({
                img_src: new_img_src
            })
        }
    }
})