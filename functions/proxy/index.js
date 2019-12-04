//云函数作为http代理 https://developers.weixin.qq.com/community/develop/doc/000c82801a45e8ca18c7e8fba51800
//函数超时时间：10s
const cloud = require('wx-server-sdk')
const request = require('sync-request')
const CACHE_TIME = 300000 //缓存时间，单位ms。缓存5分钟。
cloud.init()
exports.main = async(event, context) => {
    console.log("请求内容：", event)

    //判断是否启用缓存
    if (event.cache != false) { // 注：目前小程序未能过审，暂时默认打开缓存。后面小程序过审后把这里改成==true
        console.log("启用URL缓存结果缓存")
        var return_txt //要返回的文本

        //初始化数据库
        const db = cloud.database()
        const proxy_cache = db.collection('proxy_cache') //使用的集合为proxy_cache

        //查询数据库
        await proxy_cache.doc(event.url).get().then(res => {
            console.log("缓存命中：", res.data) // res.data 包含该记录的数据
            //检查缓存是否过期
            if (Date.now() - res.data.updateDate > CACHE_TIME) {
                //过期，重新获取
                console.log("缓存过期")
                //请求url
                return_txt = requestText(event.url)
                //更新数据库
                proxy_cache.doc(event.url).update({
                    data: {
                        body: return_txt,
                        updateDate: Date.now()
                    }
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            } else {
                //构造返回内容
                return_txt = res.data.body
            }
        }).catch(err => {
            //缓存不命中则直接请求url，并缓存
            console.log("缓存未命中")
            //请求url
            return_txt = requestText(event.url)
            //把结果写入数据库
            proxy_cache.add({
                data: {
                    _id: event.url, //数据的_id为url
                    body: return_txt,
                    updateDate: Date.now()
                }
            }).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        })
        //返回内容
        return {
            body: return_txt
        }
    } else {
        //不启用缓存则直接请求url并返回
        return {
            body: requestText(event.url)
        }
    }
}

function requestText(url) {
    //请求url
    var res = request('GET', url, {
        timeout: 2800, //超时时间2.8s
        retry: true, //启用重试
        maxRetries: 3, //重试次数
        retryDelay: 100 //重试间隔0.1s
    })
    //返回文本内容
    return res.getBody().toString()
}