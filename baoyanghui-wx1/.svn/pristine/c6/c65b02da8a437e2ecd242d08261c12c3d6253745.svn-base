import fetch from '../config/request'
import {getStore,setStore} from '../config/mUtils'

/*登录*/
export const loginApi = (params) => fetch({
  url:"api/merchants",
  data:{
    operate: "POST",
    request_content: "login",
    merchant_name: params.name,
    password: params.password,
  },
  method:'POST'
});


/*微信登录*/
export const wxLoginApi = (code) => fetch({
  url:"api/merchants",
  data:{
    operate: "POST",
    request_content: "login_by_weixin_code",
    code: code
  },
  method:'POST'
});

/*商家订单*/
export const orderApi = (params) => fetch({
  url:"api/orders_merchant",
  data:{
    operate: "GET",
    request_content: "get_orders",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    ...params
  },
  method:'POST'
});

/*获取物流信息*/
export const getTrack = (id) => fetch({
  url:`api/orders_merchant/${id}`,
  data:{
    operate: "GET",
    request_content: "get_order_track",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode")
  },
  id:id,
  method:'POST'
});

/*再次购买*/
export const buyAain = (id) => fetch({
  url:`api/orders_merchant/${id}`,
  data:{
    operate: "POST",
    request_content: "buy_again",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode")
  },
  id:id,
  method:'POST'
});

/*取消订单*/
export const cancelOrder = (id) => fetch({
  url:`api/orders_merchant/${id}`,
  data:{
    operate: "PUT",
    request_content: "cancel_order",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode")
  },
  id:id,
  method:'POST'
});

/*商家订单详情*/
export const orderApiDetail = (id) => fetch({
  url:`api/orders_merchant/${id}`,
  data:{
    operate: "GET",
    request_content: "get_order_detail",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
  },
  id:id,
  method:'POST'
});

/*取京东子订单信息*/
export const getJdSubOrder = (id) => fetch({
  url:`api/orders_merchant/${id}`,
  data:{
    operate: "GET",
    request_content: "get_jd_sub_orders",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
  },
  id:id,
  method:'POST'
});

/*取京东售后类型*/
export const getJdBackTypes = (params) => fetch({
  url:`api/orders_merchant`,
  data:{
    operate: "GET",
    request_content: "get_jd_after_sale_types",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    ...params
  },
  method:'POST'
});

/*获取账户信息*/
export const getAccountBalance = () => fetch({
  url:`api/merchant_accounts`,
  data:{
    operate: "GET",
    request_content: "get_merchant_account_balance",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
  },
  method:'POST'
});

/*获取配置信息*/
export const getConfigs = () => fetch({
  url:`api/commons`,
  data:{
    operate: "GET",
    request_content: "get_configs",
  },
  method:'POST'
});


/*申请售后*/
export const createAfsApply = (id,params) => fetch({
  url:`api/orders_merchant/${id}`,
  data:{
    operate: "POST",
    request_content: "create_afs_apply",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    ...params
  },
  id:id,
  method:'POST'
});

/*确认收货*/
export const completeOrder = (id) => fetch({
  url:`api/orders_merchant/${id}`,
  data:{
    operate: "PUT",
    request_content: "complete_order",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
  },
  id:id,
  method:'POST'
});

/*搜索历史信息*/
export const keywords = (params) => fetch({
  url:`api/keywords`,
  data:{
    operate: "GET",
    request_content: "get_search_history",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    ...params
  },
  method:'POST'
});

/*取供应商列表*/
export const getSuppliers = () => fetch({
  url:`api/part_goods`,
  data:{
    operate: "GET",
    request_content: "get_suppliers",
  },
  method:'POST'
});

/*搜索商品*/
export const searchGoods = (params) => fetch({
  url:`api/part_goods_prices_merchant`,
  data:{
    operate: "GET",
    request_content: "search_goods",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    ...params
  },
  method:'POST'
});

/*取配件类型列表 (热门，热门采购)*/
export const getPartTypes = (params) => fetch({
  url:`api/item_types`,
  data:{
    operate: "GET",
    request_content: "get_part_types_hot_new",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    ...params
  },
  method:'POST'
});

/*商品详情*/
export const goodsDetail = (id) => fetch({
  url:`api/part_goods_prices_merchant/${id}`,
  data:{
    operate: "GET",
    request_content: "get_goods_detail",
  },
  id:id,
  method:'POST'
});

/*商品介绍*/
export const goodsIntroduce = (id) => fetch({
  url:`api/part_goods_prices_merchant/${id}`,
  data:{
    operate: "GET",
    request_content: "get_goods_introduce_info",
  },
  id:id,
  method:'POST'
});

/*通过vin码取自有车型类型*/
export const vinCode = (code) => fetch({
  url:`api/own_car_models`,
  data:{
    operate: "GET",
    request_content: "get_model_by_vin",
    vin_code:code
  },
  method:'POST'
});

/*添加到购物车*/
export const addMercahnt = (params) => fetch({
  url:`api/shopping_cart_items`,
  data:{
    operate: "POST",
    request_content: "add_item_merchant",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    ...params
  },
  method:'POST'
});

/*取购物车商品列表*/
export const getMerchant = (params) => fetch({
  url:`api/shopping_cart_items`,
  data:{
    operate: "GET",
    request_content: "get_items_merchant",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    is_need_price: true,
    ...params
  },
  method:'POST'
});

/*删除购物车商品*/
export const delMerchant = (id) => fetch({
  url:`api/shopping_cart_items`,
  data:{
    operate: "DELETE",
    request_content: "delete_item_merchant",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    cart_item_ids:id
  },
  method:'POST'
});

/*更改商品数量*/
export const updateMerchant = (id,count) => fetch({
  url:`api/shopping_cart_items/${id}`,
  data:{
    operate: "PUT",
    request_content: "update_count_merchant",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    count
  },
  id:id,
  method:'POST'
});

/*添加购物车*/
export const changeMerchant = (price_id,count) => fetch({
  url:`api/shopping_cart_items`,
  data:{
    operate: "PUT",
    request_content: "update_count_by_price_id",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    price_id,
    count
  },
  method:'POST'
});

/*取收货地址列表*/
export const getConsignees = (params) => fetch({
  url:`api/consignees`,
  data:{
    operate: "GET",
    request_content: "get_consignees",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    current_page_num:1,
    page_size:99,
    ...params
  },
  method:'POST'
});

/*取京东地区列表*/
export const getProvince = () => fetch({
  url:`api/jd/areas`,
  data:{
    operate: "GET",
    request_content: "get_province",
  },
  method:'POST'
});

/*取京东地区列表*/
export const getCity = (id) => fetch({
  url:`api/jd/areas`,
  data:{
    operate: "GET",
    request_content: "get_city",
    parent_id:id
  },
  method:'POST'
});

/*取京东地区列表*/
export const getCounty = (id) => fetch({
  url:`api/jd/areas`,
  data:{
    operate: "GET",
    request_content: "get_county",
    parent_id:id
  },
  method:'POST'
});

/*取地区列表*/
export const getRegion = (id) => fetch({
  url:`api/regions`,
  data:{
    operate: "GET",
    request_content: "get_regions",
    parent_id: id || ""
  },
  method:'POST'
});

/*添加收货地址*/
export const addConsignee = (params) => fetch({
  url:`api/consignees`,
  data:{
    operate: "POST",
    request_content: "add_consignee",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    ...params
  },
  method:'POST'
});

/*修改收货地址*/
export const modifyConsignee = (params,id) => fetch({
  url:`api/consignees/${id}`,
  data:{
    operate: "PUT",
    request_content: "modify_consignee",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    ...params
  },
  id:id,
  method:'POST'
});

/*修改收货地址*/
export const modifyConsigneeDefault = (id) => fetch({
  url:`api/consignees/${id}`,
  data:{
    operate: "PUT",
    request_content: "modify_consignee_default",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
  },
  id:id,
  method:'POST'
});

/*计算运费（商家）*/
export const expressFee = (params) => fetch({
  url:`api/shopping_cart_items`,
  data:{
    operate: "GET",
    request_content: "calculate_express_fee",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    ...params
  },
  method:'POST'
});


/*添加订单*/
export const ordersMerchant = (params) => fetch({
  url:`api/orders_merchant`,
  data:{
    operate: "POST",
    request_content: "add_order",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    ...params
  },
  method:'POST'
});


/*支付订单（使用储值）*/
export const payByBalance = (id) => fetch({
  url:`api/orders_merchant/${id}`,
  data:{
    operate: "PUT",
    request_content: "pay_by_balance",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
  },
  id:id,
  method:'POST'
});

/*取开票信息列表*/
export const getInvoices = (params) => fetch({
  url:`api/invoices`,
  data:{
    operate: "GET",
    request_content: "get_invoices",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    ...params
  },
  method:'POST'
});

/*添加开票信息*/
export const addInvoice = (params) => fetch({
  url:`api/invoices`,
  data:{
    operate: "POST",
    request_content: "add_invoice",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    ...params
  },
  method:'POST'
});

/*更新开票信息*/
export const updateInvoice = (params,id) => fetch({
  url:`api/invoices/${id}`,
  data:{
    operate: "PUT",
    request_content: "update_invoice",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    ...params
  },
  id:id,
  method:'POST'
});

/*更新开票信息*/
export const setDefault = (id) => fetch({
  url:`api/invoices/${id}`,
  data:{
    operate: "PUT",
    request_content: "set_default",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
  },
  id:id,
  method:'POST'
});

/*生成支付商家订单请求*/
export const wxPay = (params) => fetch({
  url:`api/tenpay_app`,
  data:{
    operate: "POST",
    request_content: "gen_pay_request_merchant",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    ...params
  },
  method:'POST'
});

/*生成支付商家订单请求*/
export const alipay = (params) => fetch({
  url:`api/alipay_wap`,
  data:{
    operate: "POST",
    request_content: "gen_pay_request_merchant",
    merchant_id: getStore("merchantId"),
    usercode: getStore("usercode"),
    ...params
  },
  method:'POST'
});

/*生成jssdk权限*/
export const sdkSign = (params) => fetch({
  url:`api/tenpay_app`,
  data:{
    operate: "POST",
    request_content: "gen_js_sdk_sign",
    ...params
  },
  method:'POST'
});
