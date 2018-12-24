# 说明
段子黄写的Node服务端生成支付宝支付链接的第三方模块，支持 **沙箱环境** 和 **生产环境**

体验地址:http://huangjiangjun.top/alipay/

	npmjs包地址:https://www.npmjs.com/package/alipay_for_node
	
	该包的使用参考请参考npmjs上面的文档

# 前提

```
1、首先生成公私钥
	参考：https://docs.open.alipay.com/291/
	
2、上传公钥到支付宝后台/沙箱后台
```

# 使用

	1、克隆项目到你本地
	
	2、替换掉项目根目录/src/pem中私钥部分的内容【重要】
	
	3、替换掉项目根目录/src/app.js中app_id的值【重要】
	
	4、把终端切换到项目根目录，执行 `npm run start` 启动服务器
	
	5、打开根目录/test/index.html即可【推荐使用通过HTTP服务器打开，最好不要本地File协议打开】
	
	6、填写相关的内容，点击支付按钮，即可支付

# 注意

### 私钥文件的格式

```
-----BEGIN PRIVATE KEY-----
中间是你的私钥
-----END PRIVATE KEY-----
```

###其它注意事项

	后台接口文档地址:
		http://huangjiangjun.top:5000/pay
		
		请求方式:
			POST
		
		请求参数:
			productName:商品名称
			price:价格
			returnURL:支付成功之后跳转的地址
