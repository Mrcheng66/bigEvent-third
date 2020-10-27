$(function () {
    getInfo()
})

// 获取用户基恩信息
function getInfo() {
    $.ajax({
        url:'/my/userinfo',
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