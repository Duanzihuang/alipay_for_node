# 说明
段子黄写的Node服务端生成支付宝支付链接的第三方模块，支持 **沙箱环境** 和 **生产环境**

支付宝网关地址说明

	沙箱网关地址:https://openapi.alipaydev.com/gateway.do
	
	生产环境网关地址:https://openapi.alipay.com/gateway.do
	 
	请求必填参数说明参考：https://docs.open.alipay.com/203/107090/

# 示例

	//导入需要的包
	const Alipay = require('alipay_for_node')
	const path = require('path')
	
	//创建Alipay对象
	let alipay =  new Alipay();
	
	//设置网关，注意:沙箱环境与生产环境是不一样的，注意区分
	alipay.gateWayUrl = 'https://openapi.alipaydev.com/gateway.do'
	
	//设置加密请求参数的私钥,注意:在当前目录下新建一个pem目录，并且导入你自己的RSA或RSA2密钥
	//alipay.rsaPrivateKey=path.join(__dirname,'./pem/rsa_private_key.pem')
	alipay.rsa2PrivateKey=path.join(__dirname,'./pem/rsa2_private_key.pem')
	
	//设置app_id,替换你自己的app_id,沙箱模式或生产环境下的app_id都可以
	alipay.setParam('app_id','')
	
	//设置商品相关参数
	alipay.setParam('biz_content',JSON.stringify({subject:'越南新娘',out_trade_no:alipay.generateOutTradeNo(),total_amount:100.00,product_code:'QUICK_WAP_WAY'}))
	
	//设置支付成功之后跳转的页面
	alipay.setParam('return_url','http://www.itheima.com/')
	
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
	
	console.log(alipayRequestStr)

# 注意

### 私钥文件的格式

```
-----BEGIN PRIVATE KEY-----
中间是你的私钥
-----END PRIVATE KEY-----
```

###其它注意事项

	1、无论在沙箱模式下还是生成环境模式下，必须先生成商户私钥和公钥，并且将公钥上传到支付宝后台(沙箱或是生产环境后台)
	
	2、生成商户公钥和私钥，可以参考:https://docs.open.alipay.com/291/105971/
	
	3、上传商户公钥到支付宝后台，可以参考：生产环境（https://docs.open.alipay.com/291/105972/） 沙箱模式（https://openclub.alipay.com/read.php?tid=1486&fid=46）
	
	4、支付宝沙箱模式下，只支持新版本接口（https://docs.open.alipay.com/203/107090/），不支持支付老接口（https://docs.open.alipay.com/60/104790/）
	
	5、生成环境下，新老接口都支持
	
	6、集成 alipay_for_node 第三方包，在生成环境下，只需要替换生产环境的网关、app_id、RSA私钥或是RSA2私钥即可
	
	7、alipay_for_node 1.0.0 版本，暂时只是生成了支付宝支付请求URL，其它功能在后续版本中会陆续加入，敬请期待...
