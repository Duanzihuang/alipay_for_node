//加载需要的node核心模块
const fs = require("fs")

//导入其它模块
const sign = require('./lib/sign.js')
const tools = require('./lib/tools.js')

//定义了一个类
class Alipay {
    //构造器
    constructor() {
        //初始化要加密的请求参数对象
        this.init()
    }

    init() {
        //网关
        this._gateWayUrl = '';
        //RSA私钥
        this._RSAPrivateKey = ""
        //RSA2私钥
        this._RSA2PrivateKey = ""
        //要加密的参数对象
        this.params = {}
    }

    /**
     * 类的setter & getter方法
     */
    set gateWayUrl(gateWayUrl) {
        this._gateWayUrl = gateWayUrl;
    }

    get gateWayUrl() {
        return this._gateWayUrl;
    }

    /**
     * rsa的私钥 setter & getter方法
     */
    set rsaPrivateKey(rsaPrivateKeyPath) {
        this._RSAPrivateKey = this.getPrivateKeyStr(rsaPrivateKeyPath);
    }

    get rsaPrivateKey() {
        return this._RSAPrivateKey;
    }

    /**
     * rsa2的私钥 setter & getter方法
     */
    set rsa2PrivateKey(rsa2PrivateKeyPath) {
        this._RSA2PrivateKey = this.getPrivateKeyStr(rsa2PrivateKeyPath);
    }

    get rsa2PrivateKey() {
        return this._RSA2PrivateKey;
    }

    //获取签名的私钥字符串
    getPrivateKeyStr(privateKeyPath) {
        return fs.readFileSync(privateKeyPath).toString();
    }

    //设置请求参数
    setParam(name, value) {
        this.params[name] = value;
    }

    //获取请求参数
    getParam() {
        return this.params;
    }

    //构建最终的请求字符串
    getLastRequestStr() {
        //网关
        if (this.gateWayUrl.trim().length === 0) {
            throw new Error('必须指定网关 gateWayUrl');
        }

        //获取网关
        const gateWayUrl = this.gateWayUrl

        //获取加密之前的请求字符串和请求字符串加密的结果
        const signObj = sign.getParamsQueryAndSign(this.params,this.rsaPrivateKey,this.rsa2PrivateKey)

        //构建最终的请求字符串
        const lastRequestStr = `${gateWayUrl}?${signObj.paramsQuery}&sign=${signObj.sign}`

        return lastRequestStr
    }

    //提供的生成的订单号与时间戳的方法
    //生成时间戳的方法
    getNowFormatDate(){
        return tools.getNowFormatDate()
    }

    //生成订单号的方法
    generateOutTradeNo(){
        return tools.generateOutTradeNo()
    }
}

//导出类
module.exports = Alipay
