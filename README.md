# 微信小程序：气象卫星云图

- **微信小程序列表搜索“气象卫星云图”即可找到本程序。或扫描下方小程序码。**  
![mini_program_code.jpg](mini_program_code.jpg)
- 由于“卫星云图”这个名字已经被注册了，所以我就使用了这个名字。 
- 吐槽一下为什么我国那么多国家机构的网站都不支持HTTPS……
- 线上环境为1.5.0版本。辣鸡微信现在审核不允许有视频，所以最新的2.0.1版本无法通过审核。所以我想想办法怎么弄成gif图之类的好了。

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

## 已知问题

- **动图有时会闪，因为图片没缓存。不知道咋预加载（当前办法是后台播放一次）。欢迎提issue一起解决。**
- **播放大视频时会卡顿，如有办法欢迎提issue一起解决。（怀疑码率过大/视频体积过大导致的）**（TODO：用node.js做服务端压缩视频）
- 代码有点冗余，有空再重构。此外有点不习惯2个空格的缩进，到时重构一起改了。

## 更多信息

|网站|地址|
|---|---|
|FY-2E/G云图|http://www.nsmc.org.cn/NSMC/Channels/100028.html|
|FY-2F云图|http://www.nsmc.org.cn/NSMC/Channels/fy2f_topic.html|
|FY-2H云图（一带一路）|http://fy4.nsmc.org.cn/nsmc/cn/theme/belt_and_road.html|
|FY-3D主页|http://www.nsmc.org.cn/NSMC/Contents/FY3D.html|
|FY-3D平面图（风云三号全球卫星影像）|https://satellite.nsmc.org.cn/PortalSite/Maps/ArssMaps.aspx|
|FY-3D圆盘图（风云看地球）|https://fy4.nsmc.org.cn/mips/index.html|
|FY-4A主页|http://fy4.nsmc.org.cn/portal/cn/theme/FY4A.html|
|FY-4A云图（风云四号云图动画）|https://fy4.nsmc.org.cn/nsmc/cn/image/animation.html|
|FY-4A实时数据（HDF格式）|http://fy4.nsmc.org.cn/data/cn/data/realtime.html|
|卫星介绍|http://fy4.nsmc.org.cn/portal/cn/satellite/index.html|
|卫星介绍（旧页面）|https://www.nsmc.org.cn/NSMC/Channels/100003.html|
|国家卫星气象中心|https://www.nsmc.org.cn/NSMC/Home/Index.html|
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

## 部署说明

由于小程序功能越来越多，开始使用[云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)，所以小程序还需要部署服务端。不过云开发环境比较简单，只需做一些简单的初始化操作（需要在微信开发者工具下执行，建议阅读云开发入门文档，以完成下列操作）：

1. 创建所有云函数（函数名为`functions`目录下的文件夹名字，目前只有一个云函数`proxy`）
2. 上传所有云函数（右键函数名对应文件夹，上传并部署：云端安装依赖）
3. 数据库创建集合：`proxy_cache`