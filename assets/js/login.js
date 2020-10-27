$(function () {
    $('#loginUser').on('click',function () {
        $('#login_form').show()
        $('#reg_form').hide()
    })
    $('#regUser').on('click',function () {
        $('#login_form').hide()
        $('#reg_form').show()
    })
    // 表单验证
    var form = layui.form
    var layer = layui.layer
    // console.log(form);
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        repass:function(value) {
            var val = $('#reg_form input[name=password]').val()
            if(value !== val) {
              return  '两次输入密码不一致'
            }
        }
    })
    //注册页面的ajax
    $('#reg_form').on('submit',function (e) {
        e.preventDefault()
        $.ajax({
            type:'post',
            data:$(this).serialize(),
            url:'/api/reguser',
            success:function(res) {
                // console.log(res);
                if(res.status !==0) {
                  return  layer.msg('注册失败')
                }
                layer.msg('注册成功,请登录')
                // 清空表单内容并跳转到登录页面
                $('#reg_form')[0].reset()
                $('#loginUser').trigger('click')
            }
        })
    })
    //登录页面
    $('#login_form').on('submit',function (e) {
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success :function (res) {
                console.log(res);
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 跳转到后台后属于内部地址 需要获取到用户的token 值才能访问所以讲token值保存到本地
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})