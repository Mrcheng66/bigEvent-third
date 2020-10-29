$(function() {
    //表单验证
    form.verify({
        nickname: function (value) {
            if(value.length > 6) {
                return '昵称的长度为1~6位之间'
            }
        }
    });
})

var layer = layui.layer
var form = layui.form
initUserInfo()
function initUserInfo() {
    //将用户基本信息渲染到表单中并更新欢迎信息
    $.ajax({
        type:'get',
        url:'/my/userinfo',
        success : function (res) {
            if (res.status !== 0 ) {
                return  layer.msg(res.message)
            }
            // layer.msg(res.message)
            //使用layui框架中的方法实现数据填充
            form.val('userInfo' , res.data)
        }
    })
}
//重置按钮
$('#btnReset').on('click',function (e) {
    e.preventDefault()
    //从新渲染用户信息
    initUserInfo()
})
$('.layui-form').on('submit',function (e) {
    e.preventDefault()
    $.ajax({
        url:'/my/userinfo',
        data : $(this).serialize(),
        method:'post',
        success :function (res) {
            if(res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            //调用父类window上的方法重新渲染 头像等信息
            window.parent.getInfo()
        }
    })
})