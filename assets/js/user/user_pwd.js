$(function () {
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        samePwd: function (value) {
            if(value === $('input[name=oldPwd]').val()){
                return '新密码不能与原密码相同'
            }
        },
        rePwd: function (value) {
            if(value !== $('input[name=newPwd]').val()) {
                return '两次新密码不一致'
            }
        }
    })

    //表单提交
    $('.layui-form').on('submit',function (e) {
        e.preventDefault()
        $.ajax({
            url:'/my/updatepwd',
            method:'post',
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    // console.log(res);
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('修改密码成功!')
                $('.layui-form')[0].reset()
            }
        })
    })
})