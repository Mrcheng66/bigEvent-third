//开发地址
var local = 'http://ajax.frontend.itheima.net'
// ................................
//这个方法ajaxPrefilter 只要发送ajax 就会执行
$.ajaxPrefilter(function(param) {
    // console.log(param.url);
    param.url = local + param.url
    // console.log(param.url);

    // 如果param的url 含有/my则 需要给页面添加headers属性 及其值
    if(param.url.indexOf('/my/') !==-1) {
        param.headers = {
            Authorization: localStorage.getItem('token')||''
        }
    }
    //complete ：当请求完成时调用的函数  即服务器返回时候
    //ajaxComplete() 方法规定的函数会在请求完成时运行，即使请求并未成功。
    param.complete = function (res) {
        // console.log(res.responseJSON);
        //实现拦截功能,不能通过直接输入网址进入后台
        if(res.responseJSON.status === 1 && res.responseJSON.message ==='身份认证失败！'){
            location.href='/login.html'
            localStorage.removeItem('token')
        }
    }
})