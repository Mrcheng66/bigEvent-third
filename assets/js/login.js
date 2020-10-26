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
    console.log(form);
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
            url:'http://ajax.frontend.itheima.net/api/reguser',
            success:function(res) {
                console.log(res);
                if(res.status !==0) {
                    layer.msg('注册失败')
                }
                layer.msg(res.message)
            }
        })
    })
})