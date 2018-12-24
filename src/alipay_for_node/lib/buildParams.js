//根据支付宝的要求,所有参数按照ASCII升序排序。
/**
 * 参考:https://docs.open.alipay.com/common/104741
 */
const paramsSort = (params)=>{
    let newParam = {};
    let keyList = [];
    for (let index in params) {
        keyList.push(index);
    }
    keyList = keyList.sort();
    for (let index in keyList) {
        newParam[keyList[index]] = params[keyList[index]];
    }
    
    return newParam;
}

/**
 * 
 * 构建要加密参数字符串
 * 
 * 最终生成的格式如下
    app_id=2016082600315647&biz_content={"subject":"大乐透","out_trade_no":"70501111111S001111115","total_amount":60.00,"product_code":"QUICK_WAP_WAY"}&charset=utf-8&format=json&method=alipay.trade.wap.pay&sign_type=RSA2&timestamp=2018-01-05 21:14:24&version=1.0

    参考:https://docs.open.alipay.com/203/107090/
 */
exports.buildParamsQuery = (params) => {
    let i = 0;
    let signBefore = '';

    /**
     * 验证必填字符串
     * 参考：https://docs.open.alipay.com/203/107090/
     */
    if (!params.hasOwnProperty('app_id')) {
        throw new Error('app_id 不可缺少');
    }

    if (!params.hasOwnProperty('method')) {
        throw new Error('method 不可缺少');
    }

    if (!params.hasOwnProperty('charset')) {
        throw new Error('charset 不可缺少');
    }

    // if (!params.hasOwnProperty('sign_type')) {
    //     throw new Error('sign_type 不可缺少');
    // }

    if (!params.hasOwnProperty('timestamp')) {
        throw new Error('timestamp 不可缺少');
    }

    if (!params.hasOwnProperty('version')) {
        throw new Error('version 不可缺少');
    }

    if (!params.hasOwnProperty('biz_content')) {
        throw new Error('biz_content 不可缺少');
    }

    if (params.hasOwnProperty('sign')) {
        delete params['sign'];
    }
    //参数根据params排序
    params = paramsSort(params);
    for (let index in params) {
        if (i == 0) {
            signBefore += index + '=' + params[index];
        } else {
            signBefore += '&' + index + '=' + params[index];
        }
        i++;
    }
    
    return signBefore;
}