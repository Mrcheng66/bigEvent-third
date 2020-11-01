$(function () {
    var layer = layui.layer
    var form = layui.form

    //定义过滤器
    template.defaults.imports.dataFormate = function (date) {
        // 过滤器的内容
        // 一定要注意 需要一个返回值
        var dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDay())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    };
    //取零函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    var q = {
        pagenum: 1, //页码值
        pagesize: 3, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '', //文章的状态，可选值有：已发布、草稿
    }
    //初始化文章列表内容
    initArticle()

    function initArticle() {
        $.ajax({
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl_table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }
    //初始化 获取下拉表单的分类内容
    initCate()
    function initCate() {
        $.ajax({
            url:'/my/article/cates',
            success : function (res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl_cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    //筛选功能
    $('#form_search').on('submit',function (e) {
        e.preventDefault()
        q.state = $('[name=state]').val()
        q.cate_id = $('[name=cate_id]').val()
        initArticle()
    })
    
    //分页
    var laypage = layui.laypage
    function renderPage(all) {
        laypage.render({
            elem: 'pageBox',   //注意，这里的 test1 是 ID，不用加 # 号
            count: all,       //数据总数，从服务端得到
            limit: q.pagesize,  //每页几条
            curr:q.pagenum,     //第几页

            //分页布局设置
            layout:	['count','limit','prev', 'page', 'next','skip'],
            limits:[2,3,5,10],
            //分页初始化,页码改变时触发jump
            jump:function (obj,first) {
                if (!first) {
                    q.pagenum =obj.curr
                    q.pagesize = obj.limit
                    initArticle()
                }
            }
          });
    }
    //删除按钮
    $('tbody').on('click','.btnDelete',function () {
        //这里不能用id选择器 不然只能选中一个使用类选择器,且id一般是固定一个的
        var id = $(this).data('id')
        console.log(id);
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                url:'/my/article/delete/' + id,
                success : function (res) {
                    if (res.status !== 0 ) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    if($('.btnDelete').length === 1 && q.pagenum > 1 ){
                        q.pagenum--
                    }
                    initArticle()
                }
            })
            layer.close(index);
          });
        
    })
})