$(function () {
    var layer = layui.layer
    var form = layui.form
    initArticle()
    //初始化获取文章类别信息的函数
    function initArticle() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                // layer.msg(res.message)
                //使用模板引擎渲染页面
                var Arti = template('tpl_article', res)
                $('tbody').html(Arti)
            }
        })
    }

    //添加类别功能
    var addindex;
    $('#btnAddCate').on('click', function () {
        //使用layui中的插件打开一个窗口
        addindex = layer.open({
            type: '1',
            area: ['500px', '260px'],
            title: '添加文章分类',
            content: $('#tpl_addArticle').html(),
        });

    })
    //添加文章分类
    $('body').on('submit', '#formAdd', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('添加成功')
                //关闭添加弹窗
                layer.close(addindex);
                //重新渲染表单
                initArticle()
            }
        })
    })

    //编辑功能
    var editindex;
    $('tbody').on('click', '#btnEdit', function () {
        editindex = layer.open({
            type: '1',
            area: ['500px', '260px'],
            title: '修改文章分类',
            content: $('#tpl_editArticle').html(),
        });
        //根据id获取文章分类数据,并将其填充到表单中
        var id = $(this).attr('data-id')
        $.ajax({
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //layui中的表单赋值取值 方法
                form.val('editRender', res.data)
                // console.log(res);
            }
        })
    })
    //编辑后提交ajax
    $('body').on('submit', '#formEdit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('编辑成功')
                //关闭添加弹窗
                layer.close(editindex);
                //重新渲染表单
                initArticle()
            }
        })
    })
    //删除功能
    $('tbody').on('click','#btnDelete',function () {
        var id = $(this).data('id')
        // console.log(id);
        //显示提示框
        layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                url:'/my/article/deletecate/'+ id,
                success: function (res) {
                    if(res.status !== 0) {
                        return layer.msg(res.messsage)
                    }
                    layer.close(index);
                    layer.msg('删除成功')
                    initArticle()
                }
            })
          });
    })
    //编辑功能
})