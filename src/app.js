// 导入http、querystring模块
const http = require('http')
const querystring = require('querystring')

// 导入alipay_for_node模块
const Alipay = require('./alipay_for_node')

// 开启web服务
http.createServer((req,res)=>{
    // 设置允许跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1')
    res.setHeader("Content-Type", "application/json;charset=utf-8");

    // 判断路径
    if(req.url.includes('pay') && req.method == "POST"){
        // 获取post参数
        let body = ''
        req.on('data',chunk=>{
            body += chunk
        })

        req.on('end',()=>{
            const params = querystring.parse(body)

            //导入需要的包
            const path = require('path')

            //创建Alipay对象
            let alipay =  new Alipay();

            //设置网关，注意:沙箱环境与生产环境是不一样的，注意区分
            alipay.gateWayUrl = 'https://openapi.alipaydev.com/gateway.do'

            //设置加密请求参数的私钥,注意:在当前目录下新建一个pem目录，并且导入你自己的RSA或RSA2密钥
            //alipay.rsaPrivateKey=path.join(__dirname,'./pem/rsa_private_key.pem')
            alipay.rsa2PrivateKey=path.join(__dirname,'./pem/rsa2_private_key.pem')

            //设置app_id,替换你自己的app_id,沙箱模式或生产环境下的app_id都可以
            alipay.setParam('app_id','2016092300574408')

            //设置商品相关参数
            alipay.setParam('biz_content',JSON.stringify({subject:params.productName || '越南新娘',out_trade_no:alipay.generateOutTradeNo(),total_amount:parseFloat(params.price || '100').toFixed(2),product_code:'QUICK_WAP_WAY'}))

            //设置成功支付之后的跳转地址
            alipay.setParam('return_url',params.returnURL || 'http://www.itheima.com/')

            //设置编码
            alipay.setParam('charset','utf-8')

            //设置格式
            alipay.setParam('format','json')

            //设置method
            alipay.setParam('method','alipay.trade.wap.pay')

            //设置加密方式
            //alipay.setParam('sign_type','RSA')
            alipay.setParam('sign_type','RSA2')

            //设置版本
            alipay.setParam('version','1.0')

            //设置时间戳
            alipay.setParam('timestamp',alipay.getNowFormatDate())

            //调用方法,获取最终支付的URL
            const alipayRequestStr = alipay.getLastRequestStr()

            const result = {
                status:0,//成功
                alipay_url:alipayRequestStr
            }

            res.setHeader('Content-Type','text/json')
            res.end(JSON.stringify(result))
        })
    }else{
        res.end('test')
    }

}).listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }

    console.log('start OK')
})