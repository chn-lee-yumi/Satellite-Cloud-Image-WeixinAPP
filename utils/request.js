// 请求函数（自带重试）
// https://blog.csdn.net/evan2916/article/details/82597671

function callCloudFunction(obj) {
    //云函数请求
    retry_times = 3 //重试次数
    return callCloudFunctionRetry(obj, retry_times)
}

function callCloudFunctionRetry(obj, times) {
    var err = null;
    return new Promise(function(resolve, reject) {
        var attempt = function() {
            wx.cloud.callFunction(obj).then(resolve).catch(function(err) {
                console.log(`callCloudFunctionRetry ${obj.data.url} failed, retry times: ${times}`);
                if (0 == times) {
                    reject(err);
                } else {
                    times--;
                    setTimeout(function() {
                        attempt()
                    }, 1000);
                }
            });
        };
        attempt();
    });
};

exports.callCloudFunction = callCloudFunction