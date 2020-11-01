$(function () {
    var layer = layui.layer
    var form = layui.form
    // 初始化富文本编辑器
    initEditor()
    //定义文章分类加载的方法
    initCate()

    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //渲染数据  模板引擎
                var htmlStr = template('tpl-cates', res)
                $('[name=cate_id]').html(htmlStr)
                form.render('select')
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#chooseImg').on('click', function () {
        $('#coverFile').trigger('click')
    })
    $('#coverFile').on('change', function (e) {
        var file = e.target.files[0]
        if (file === undefined) {
            return
        }
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //设置状态
    var state = '已发布'
    $('#btnSave2').on('click', function () {
        state = '草稿'
    })
    //表单提交
    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        //创建FormData对象
        var fd = new FormData(this)
        fd.append('state', state)
        // 将裁剪后的图片，输出为文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                console.log(...fd);
                //这里的img是动态生成的所以请求要放到这里面来
                pub_article(fd)
            })
    })
    function pub_article(fd) {
        $.ajax({
            method:'post',
            data:fd,
            url:'/my/article/add',
            processData: false,
            contentType :false,
            success : function (res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('文章添加成功')
                //location.href = '/article/art_list.html'
                 setTimeout(function(){
                    // console.log('hello');
                  var locHref=  window.parent.document.getElementById("art_list")
                  locHref.click()
                }, 1500);
            }
        })
    }
})