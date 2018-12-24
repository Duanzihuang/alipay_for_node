//加载需要的node核心模块
const crypto = require('crypto')
const querystring = require('querystring')

//导入构建请求参数模块
const buildParams = require('./buildParams.js')

//对请求参数使用私钥进行签名,得到签名的值
/**
 * 参数1：请求参数对象
 * 参数2：RSA的私钥
 * 参数3：RSA2的私钥
 */
exports.getParamsQueryAndSign = (params, RSAPrivateKey, RSA2PrivateKey) => {
    //获取请求的参数
    let paramsQuery = buildParams.buildParamsQuery(params);

    if (!params.hasOwnProperty('sign_type')) {
        throw new Error('必须指定签名方式RSA或RSA2，二者任选其一')
    }

    switch (params['sign_type']) {
        case 'RSA':
            if (RSAPrivateKey.trim().length <= 0) {
                throw new Error('使用RSA签名是，必须指定rsaPrivateKey的值')
            }
            var sign = crypto.createSign('RSA-SHA1');
            break;
        case 'RSA2':
            if (RSA2PrivateKey.trim().length <= 0) {
               throw new Error('使用RSA2签名是，必须指定rsa2PrivateKey的值')
            }
            var sign = crypto.createSign('RSA-SHA256');
            break;
    }

    //更新参数
    sign.update(paramsQuery);

    //加密最终的结果
    let res = ""

    switch (params['sign_type']) {
        case 'RSA':
            res = sign.sign(RSAPrivateKey, 'base64');
            break;
        case 'RSA2':
            res = sign.sign(RSA2PrivateKey, 'base64');
            break;
    }

    //需要对加密的字符串进行url编码
    res = querystring.escape(res)

    //返回签名的原始字符串及签名之后的值
    return { paramsQuery: paramsQuery, sign: res };
}