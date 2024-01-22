# 微信小程序：气象卫星云图

- **微信小程序列表~搜索“气象卫星云图”即可找到本程序~。或扫描下方小程序码。**（搜索找不到了，因为腾讯开始收割开发者，必须交钱认证才能被搜索和被分享，不过目前扫码还是可以使用的）  
![mini_program_code.jpg](mini_program_code.jpg)
- ~不久前发现“卫星云图监测”小程序违反开源协议剽窃本项目代码甚至还加广告牟利，不讲码德，没有道德。我劝这位小伙子好自为之，好好反思。详见：[plagiarism.md](plagiarism/plagiarism.md)~ 这个无良小程序已下线，可能小伙子已经悔改了。
- 由于“卫星云图”这个名字已经被注册了，所以我就使用了这个名字。 
- 现在国家卫星气象中心已推出官方小程序“风云此刻”，推荐大家试试。

## 2024.01.22 项目总结

- 这个微信小程序以后不会更新了，因为现在需要交钱完成微信认证后，账号才可获得“被搜索”和“被分享”能力。这种感觉就像是，你想做善事，然后你所在区域的管理者跟你说，你必须先给他交钱，然后你才能在他的管辖范围内做善事。我对腾讯的这个决定感到非常遗憾，这势必会影响一大群不以营利为目的的开发者。我后续可能开发一个小网页作为替代吧（或者开发一个动态将云图设置为壁纸的APP？）。  
- 我开发这个小程序纯属个人兴趣爱好，因为平时喜欢看卫星云图，而手机查看不够方便，故将其写成小程序，方便大家查看。**我从未打算通过这个来盈利，并且故意使用GPLv3协议开源。现在你跟我说我还得倒贴钱，对不起，我做不到。（借用Linus的话，_______， F\*\*K YOU.）**

**下面是到目前为止这个小程序的一些运营数据**

累计收到三个有效反馈（不知道为什么都是2020年）。

![screenshot1](https://github.com/chn-lee-yumi/Satellite-Cloud-Image-WeixinAPP/assets/20398519/472a744b-a4dc-44fb-bbd9-de2d074dd9b6)

累计用户12.27万人。这个数量远比我想的要多，我觉得非常满意。

![WX20240122-160738@2x](https://github.com/chn-lee-yumi/Satellite-Cloud-Image-WeixinAPP/assets/20398519/9a8b9d3a-326d-4bb2-8540-ed4efcf31f26)

有趣的是，日访问人数有明显的峰值。我特意去搜了一下，那几个峰值的出现时间都是和冷空气或寒潮相关的。冬天没台风，这也能理解。如果是夏天可能就是台风相关的吧。因为数据只保留90天，所以拿不到夏天的数据了。

![WX20240122-161005@2x](https://github.com/chn-lee-yumi/Satellite-Cloud-Image-WeixinAPP/assets/20398519/0ef0f512-3710-4299-bf72-11d7455f66cb)

大部分用户都是通过搜索进来的。Android用户占比64.89%，iOS用户占比32.61%。几乎所有用户都访问了主页，另外有54.6%的用户还访问了动图页面。有15.66%的用户看了我写的小程序介绍。

![WX20240122-161739@2x](https://github.com/chn-lee-yumi/Satellite-Cloud-Image-WeixinAPP/assets/20398519/55c15c0b-7701-4f09-b0c6-5a55764cf8a5)

最近几天不知道是不是因为寒潮在推进，人均次数暴涨，到达一天3.7次。

![WX20240122-162319@2x](https://github.com/chn-lee-yumi/Satellite-Cloud-Image-WeixinAPP/assets/20398519/9f225d51-dacd-4b48-a613-ef5440786608)

最近一个月有5个用户几乎每天都在用我的小程序。虽然我不知道是谁，但是知道有人天天用，我感到非常开心。

![WX20240122-162105@2x](https://github.com/chn-lee-yumi/Satellite-Cloud-Image-WeixinAPP/assets/20398519/bb9457a9-3627-45c1-b1bc-46da76069456)

次均访问时长22.03秒。我觉得挺合理的，看个云图快的话几秒钟就就看完了。相比通过浏览器搜索云图再打开看，使用我的小程序真的可以节省不少时间。

![WX20240122-162457@2x](https://github.com/chn-lee-yumi/Satellite-Cloud-Image-WeixinAPP/assets/20398519/5844d5fc-7680-4f76-993c-850925dade1c)

有1346人添加了我的小程序。我感觉这对我来说还是挺多人的。

![WX20240122-162835@2x](https://github.com/chn-lee-yumi/Satellite-Cloud-Image-WeixinAPP/assets/20398519/0a1a9067-86cf-4924-9b96-780ffdb3cff9)

我的用户里面93.55%是男性。没想到性别比例相差会这么悬殊。

![WX20240122-163147@2x](https://github.com/chn-lee-yumi/Satellite-Cloud-Image-WeixinAPP/assets/20398519/1c962520-f93a-456b-adda-bb76ae46a28d)

用户年龄分布，30-39岁的人最多，其次是40-49岁和25-29岁。

![WX20240122-163309@2x](https://github.com/chn-lee-yumi/Satellite-Cloud-Image-WeixinAPP/assets/20398519/de7c0b23-3b0f-4082-a02e-3b1a66b80e37)

我不知道为什么还有机型的数据。这个数据收集是不是有点过了……

![WX20240122-163500@2x](https://github.com/chn-lee-yumi/Satellite-Cloud-Image-WeixinAPP/assets/20398519/9f5a8d94-1671-4b20-ae54-4f901ca22adb)

我的用户主要集中在沿海省份。其中广东占了20.31%，山东占了19.49%。

![WX20240122-163618@2x](https://github.com/chn-lee-yumi/Satellite-Cloud-Image-WeixinAPP/assets/20398519/e61dd425-d1f6-4a12-a35c-0ff8a802b4c2)

在广东里面，广州和深圳的用户数量遥遥领先。广州、深圳、佛山三个城市加起来占了全广东省用户的53.86%。

![WX20240122-163718@2x](https://github.com/chn-lee-yumi/Satellite-Cloud-Image-WeixinAPP/assets/20398519/d5a79a1f-a160-4ed3-a9b8-0be89d7771e0)

排名第一的搜索词是“彩云天气”。谢谢你们，我跟着沾光了。其次是云图。

![WX20240122-164218@2x](https://github.com/chn-lee-yumi/Satellite-Cloud-Image-WeixinAPP/assets/20398519/e587bd45-0f83-4382-ae7c-b6dcda21a7a1)

![WX20240122-164057@2x](https://github.com/chn-lee-yumi/Satellite-Cloud-Image-WeixinAPP/assets/20398519/fd89f9df-bd84-4127-8d4d-512b37d88d01)

本项目仓库的star记录，截止目前为止只有14个star（感觉有点少哈哈哈）：

[![Star History Chart](https://api.star-history.com/svg?repos=chn-lee-yumi/Satellite-Cloud-Image-WeixinAPP&type=Date)](https://star-history.com/#chn-lee-yumi/Satellite-Cloud-Image-WeixinAPP&Date)

以上就是我对“气象卫星云图”微信小程序的项目总结了。感谢所有使用我的小程序的用户，谢谢大家的支持。

## 更新日志（主要功能更新）


- v1.0.0 包含实时云图功能，包括FY4A真彩色、FY2E彩色云图、FY4A中国区高清、FY4A圆盘图高清。其中前面两个来自中央气象台，后面两个来自国家卫星气象中心。  
- v1.1.0 新增视频（最近72小时中国区视频、最近72小时全圆盘视频），来自国家卫星气象中心。  
- v1.2.0 新增动图，FY4A真彩色。图片列表来自中央气象台。  
- v1.3.0 新增Hamawari8卫星云图和GOES16卫星云图（来自台湾交通部中央气象局和NOAA）。新增介绍页面。将“FY2E彩色云图”改名为“风云二号彩色云图”，原因是这个云图实际上是G星和E星双星观测的，G星进行整点观测，E星进行半点观测。（ http://www.cma.gov.cn/2011xwzx/2011xqxxw/2011xqxyw/201706/t20170601_418013.html http://www.nsmc.org.cn/NSMC/Channels/100028.html ）
- v1.3.1 收到中央气象台警告（ https://github.com/chn-lee-yumi/Satillite-Cloud-Image-WeixinAPP/issues/1 ）删除所有与中央气象台有关的代码。此次更新后，“动图”页面将无法使用。（缺失的功能将于下个版本补齐）  
- v1.4.0 补齐上个版本缺失的功能。更新动图页面，使用风云二号彩色云图，来自国家卫星气象中心。  
- v1.4.1 修复一些小BUG。更新动图页面，使用风云二号红外一（彩色）云图，来自国家卫星气象中心。更换动图的云图的原因是因为彩色云图太大，导致播放时会闪烁甚至看不到图片。猜测是微信小程序缓存的问题，只要减少图片数量，就不会闪烁。为了能看到更久远的云图，选用了比较小的红外一彩色云图。
- v1.4.2 优化动图页面，现在会预加载图片。
- v1.5.0 修复一些小bug。使用云函数作为代理进行http请求。新增FY2H的图像和视频，来自国家卫星气象中心。具体为：FY2H“一带一路”区域、FY2H圆盘图、“一带一路”区域最近24小时视频。由于itemList最大限制6个，所以我加了一个button，把云图分成了区域图和圆盘图。（这个不知道咋交互比较好）
- v2.0.0 代码重构。更新WeUI版本到2.0。
- v2.0.1 云函数增强，增加缓存功能，提高请求效率。
- v2.1.0 因为云函数开始收费，所以取消相关功能，包括原来的动图和Himawari8云图。取消“视频”，改为“动图”。新增闪电云图、FY3D云图、静止卫星全球云图。
- v2.2.0 增加FY4B卫星云图。

## 更多信息

|网站|地址|
|---|---|
|国家卫星气象中心 卫星云图|http://www.nsmc.org.cn/nsmc/cn/image/index.html|
|FY-2H云图（一带一路）|http://fy4.nsmc.org.cn/nsmc/cn/theme/belt_and_road.html|
|FY-3D平面图（风云三号全球卫星影像）|https://satellite.nsmc.org.cn/PortalSite/Maps/ArssMaps.aspx|
|FY-3D圆盘图（风云看地球）|https://fy4.nsmc.org.cn/mips/index.html|
|FY-4A主页|https://fy4.nsmc.org.cn/nsmc/cn/theme/FY4A.html|
|FY-4A云图（风云四号云图动画）|https://fy4.nsmc.org.cn/nsmc/cn/image/animation.html|
|FY-4A云图（风云四号云图视频）|https://fy4.nsmc.org.cn/nsmc/cn/image/video.html|
|FY-4A实时数据（HDF格式）|http://fy4.nsmc.org.cn/data/cn/data/realtime.html|
|FY-4B主页|http://fy4.nsmc.org.cn/nsmc/cn/theme/FY4B.html|
|卫星介绍|http://www.nsmc.org.cn/nsmc/cn/satellite/index.html|
|国家卫星气象中心|https://www.nsmc.org.cn/nsmc/cn/home/index.html|
|中国气象数据网（可以下数据）|http://data.cma.cn/site/index.html|
|风云卫星遥感数据服务网（可以下数据）|https://satellite.nsmc.org.cn/portalsite/default.aspx|
|GIS气象数据综合展示|http://data.cma.cn/dataGis/gis.html|

- 交通部中央气象局：https://www.cwb.gov.tw/V7/observe/satellite/Sat_TrueW.htm  
- GOES-East Image Viewer：https://www.star.nesdis.noaa.gov/GOES/index.php  
- http://www.ssd.noaa.gov/imagery/  
- http://www.goes.noaa.gov/  
- http://oiswww.eumetsat.org/IPPS/html/latestImages.html  
- http://www.data.jma.go.jp/mscweb/data/himawari/index.html  
- Meteosat实时图像：https://www.eumetsat.int/website/home/Images/RealTimeImages/index.html  
- http://himawari8.nict.go.jp/  
- http://cimss.ssec.wisc.edu/goes/blog/archives/category/himawari-9  

