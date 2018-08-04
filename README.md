# 微信小程序：气象卫星云图
- **微信小程序列表搜索“气象卫星云图”即可找到本程序。**  
- 由于“卫星云图”这个名字已经被注册了，所以我就使用了这个名字。  
- 因为wx.request不支持http，所以小程序采用了hotapp作为代理。如果要使用，需要先上hotapp注册，获得一个key，填入对应位置中。（我上传到GitHub的key是假的）
- 吐槽一下为什么我国那么多国家机构的网站都不支持HTTPS……

## 更新日志（主要功能更新）
- v1.0.0 包含实时云图功能，包括FY4A真彩色、FY2E彩色云图、FY4A中国区高清、FY4A圆盘图高清。其中前面两个来自中央气象台，后面两个来自国家卫星气象中心。  
- v1.1.0 新增视频（最近72小时中国区视频、最近72小时全圆盘视频），来自国家卫星气象中心。  
- v1.2.0 新增动图，FY4A真彩色。图片列表来自中央气象台。  
- v1.3.0 新增Hamawari8卫星云图和GOES16卫星云图。将“FY2E彩色云图”改名为“风云二号彩色云图”，原因是这个云图实际上是G星和E星双星观测的，G星进行整点观测，E星进行半点观测。（http://www.cma.gov.cn/2011xwzx/2011xqxxw/2011xqxyw/201706/t20170601_418013.html http://www.nsmc.org.cn/NSMC/Channels/100028.html）
- v1.3.1 收到中央气象台警告（https://github.com/chn-lee-yumi/Satillite-Cloud-Image-WeixinAPP/issues/1）删除所有与中央气象台有关的代码。此次更新后，“动图”页面将无法使用。（缺失的功能将于下个版本补齐）

## 更多信息
- 卫星介绍：http://fy4.nsmc.org.cn/portal/cn/satellite/index.html  
- 卫星运行状态：http://fy4.nsmc.org.cn/portal/cn/operation/status.html  
- 国家气象信息中心：http://data.cma.cn/site/index.html  
- 交通部中央气象局：https://www.cwb.gov.tw/V7/observe/satellite/Sat_TrueW.htm
- GOES-East Image Viewer：https://www.star.nesdis.noaa.gov/GOES/index.php
- http://www.ssd.noaa.gov/imagery/  
- http://www.goes.noaa.gov/  
- http://oiswww.eumetsat.org/IPPS/html/latestImages.html  
- http://www.data.jma.go.jp/mscweb/data/himawari/index.html  
- Meteosat实时图像：https://www.eumetsat.int/website/home/Images/RealTimeImages/index.html
- 其它网址：
   - http://himawari8.nict.go.jp/  
   - http://cimss.ssec.wisc.edu/goes/blog/archives/category/himawari-9  
