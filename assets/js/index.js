$(function () {
    getInfo()
    var layer = layui.layer
    $('#loginOut').on('click',function () {
        //使用layui的插件实现弹出框询问
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //只用点击确定的时候才会指向这里的函数
            //实现页面跳转,清空token
            location.href='/login.html'
            localStorage.removeItem('token')
            layer.close(index);
          });
    })
})

// 获取用户基恩信息
function getInfo() {
    $.ajax({
        url:'/my/userinfo',
        //success ： 当请求成功时调用的函数
        success :function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return  layui.layer.msg(res.message)
            }
            // 请求成功渲染头像
            renderAvatar(res.data)
        }
    })
}
 function renderAvatar(user) {
    //  用户名先昵称后username
    var name = user.nickname||user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    //用户头像
    if(user.user_pic !== null) {
        //有头像
        $('.layui-nav-img').show().attr('src',user.user_pic)
        $('.text-avatar').hide()
    }else {
        //没有头像
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
 }
