//var win = require('nw.gui');
var is_overdue;
var setting_host = '';
if (!!!get_local_cache("http_url")) {
    set_local_cache('http_url', 'http://211.149.198.76')
}


function getQueryString(e) {
    var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)");
    var a = window.location.search.substr(1).match(t);
    if (a != null) return a[2];
    return "";
}

function addCookie(e, t, a) {
    var n = e + "=" + escape(t) + "; path=/";
    if (a > 0) {
        var r = new Date();
        r.setTime(r.getTime() + a * 3600 * 1e3);
        n = n + ";expires=" + r.toGMTString();
    }
    document.cookie = n;
}

function setCookie(name, value, days) {
    var exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    document.cookie =
        name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(e) {
    var t = document.cookie;
    var a = t.split("; ");
    for (var n = 0; n < a.length; n++) {
        var r = a[n].split("=");
        if (r[0] == e) return unescape(r[1]);
    }
    return null;
}

function delCookie(e) {
    var t = new Date();
    t.setTime(t.getTime() - 1);
    var a = getCookie(e);
    if (a != null)
        document.cookie = e + "=" + a + "; path=/;expires=" + t.toGMTString();
}

//设置缓存
function set_cache(key, value) {
    if (key == '') return false;
    sessionStorage.setItem(key, value);
}

function set_local_cache(key, value) {
    if (key == '') return false;
    localStorage.setItem(key, value);
}

//读取缓存
function get_cache(key) {
    return sessionStorage.getItem(key);
}

function get_local_cache(key) {
    return localStorage.getItem(key);
}

//删除缓存
function remove_cache(key) {
    sessionStorage.removeItem(key);
}

function remove_local_cache(key) {
    localStorage.removeItem(key);
}


//设置chrome cookie
function set_chrome_() {
    //chrome.cookies.set(objectdetails,functioncallback);
    // chrome.cookies.getAll(objectdetails,functioncallback);
    // chrome.cookies.get(objectdetails,functioncallback);
    //chrome.cookies.remove(objectdetails,functioncallback)
}

function openWin(url, opt, fn) {
    var def = {
        "position": "center",
        "focus": true
    }
    var option = $.extend({}, def, opt)
    win.Window.open(url, option, function(win) {
        fn(win)
    })
}

function ajax_data(url, opt, basefunc) {
    $("body").mLoading({text:'数据量大，加载中...'});
    $("body").mLoading("show");
    var allurl = AddServerHead(url);
    $.ajax({
        url: allurl,
        data: opt,
        type: "post",
        dataType: "json",
        success: function(retjson) {
            basefunc(retjson);
            hide_loading()
            if (retjson.errcode == 1001) {
                showErr(retjson.errmsg, retjson.errmsg_en, retjson.errcode)
                setTimeout(function() {
                    top.location.href = '../temp/login.html'
                }, 2000)
            }
        },
        error: function(XMLHttpRequest) {
            //console.log(XMLHttpRequest.status)
            showErr(config_txt.network_err.zn_network_err, config_txt.network_err.en_network_err + XMLHttpRequest.status);
            $('input[type="button"]').attr('disabled', false);
            $('input[type="button"]').css('filter', 'none');
            hide_loading()
        }
    });

}

function ajax(url, opt, basefunc) {
    show_loading()
    var allurl = AddServerHead(url);
    $.ajax({
        url: allurl,
        data: opt,
        type: "post",
        dataType: "json",
        success: function(retjson) {
            basefunc(retjson);
            hide_loading()
            if (retjson.errcode == 1001) {
                showErr(retjson.errmsg, retjson.errmsg_en, retjson.errcode)
                setTimeout(function() {
                    top.location.href = '../temp/login.html'
                }, 2000)
            }
        },
        error: function(XMLHttpRequest) {
            //console.log(XMLHttpRequest.status)
            showErr(config_txt.network_err.zn_network_err, config_txt.network_err.en_network_err + XMLHttpRequest.status);
            $('input[type="button"]').attr('disabled', false);
            $('input[type="button"]').css('filter', 'none');
            hide_loading()
        }
    });

}

function ajax1(url, opt, basefunc) { // 不显示加载状态
    var allurl = AddServerHead(url);
    //var allurl = 'http://192.168.0.251' + url
    $.ajax({
        url: allurl,
        data: opt,
        type: "post",
        dataType: "json",
        success: function(retjson) {
            basefunc(retjson);
        },
        error: function(XMLHttpRequest) {

        }
    });

}

function AddServerHead(url) { // 路径的拼接
    var allurlhead = setting_host || get_local_cache('http_url');
    var allurl;
    allurl = allurlhead + url;
    return allurl;
}

function showErr(msg_cn, msg_en, code) { //信息弹出框
    var msg_cn = msg_cn || "";
    var msg_en = msg_en || "";
    var code = code || "";
    if (msg_cn != '没有数据') {
        $.Huimodalalert(msg_cn + "<br>" + msg_en, 2000)
    }
}

function success(msg_cn) { //信息弹出框
    $.Huimodalalert(msg_cn, 2000)
}

function firm(title, txt,obj, fun) { // 确认框
    layer.open({
        type: 1,
        title: title,
        content: txt, //这里content是一个普通的String
        btn: [obj.l||'确定', obj.r||'取消'],
        area: ['300px', '200px'],
        yes: function(index, layero) {
            fun()
        },
        btn2: function(index, layero) {

        }
    });
}

function open_frame(title, url) { 
    layer.open({
        type: 2,
        title: title,
        maxmin: true,
        content: url, //这里content
        area: ['900px', '600px'],
        success: function(layero, index) {
            //在回调方法中的第2个参数“index”表示的是当前弹窗的索引。
            //通过layer.full方法将窗口放大。
            layer.full(index);
        },
        end: function() {
            Refresh()
        }
    });
}

function open_html(title, ht_id, id,fn,win_width,win_height) {
    var h_w = (win_width+'px')||'800px';
    var h_h = (win_height+'px')||'500px';
    layer.open({
        type: 1,
        // id:id,
        title: title,
        maxmin: true,
        content: $(ht_id), //这里content
        area: [h_w, h_h],
        end: function () { // 销毁弹出时 执行
            if(!!fn){
                fn()
            }
        }
    });
}

function queryString(e) { //url 传值取值
    var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)");
    var a = window.location.search.substr(1).match(t);
    if (a != null) return a[2];
    return "";
}

function show_loading() {
    $("body").mLoading("show"); //显示loading组件

}

function hide_loading() {
    $('body').mLoading("hide"); //隐藏loading组件
}

$(function() {
    //  $('title').html('科迪会员录入系统' + '(' + nw.App.manifest.version + ')')
    $(document).ajaxError(function(e, xhr, settings, error) {
        console.log(error);
    });
})

function search_member(obj, fn, Err) { // 搜索会员
    var url = '/index.php?s=desktop/Tb_Customer/get_list';
    var data = {};
    data['usertoken'] = get_cache('usertoken');
    var opt = $.extend({}, data, obj)
    ajax(url, opt, function(e) {
        if (e.stat == 1) {
            fn(e.data)
        } else {
            Err(e.errmsg, e.errmsg_en, e.errcode)
        }
    })
}

function Refresh() { //刷新页面
    location.reload();
}

function get_local_time() { // 获取本地时间
    var myDate = new Date();
    var mytime = myDate.getFullYear() + '-' + check_time(myDate.getMonth() + 1) + '-' + check_time(myDate.getDate());
    return mytime
}

function get_local_year() {
    var myDate = new Date();
    var mytime = myDate.getFullYear();
    return mytime
}

function get_local_month() {
    var myDate = new Date();
    var mytime = myDate.getMonth() + 1;
    return mytime
}

function DateMinus(date1, date2) { //date1:小日期   date2:大日期
    var sdate = new Date(date1);　　
    var now = new Date(date2);　　
    var days = now.getTime() - sdate.getTime();　　
    var day = parseInt(days / (1000 * 60 * 60 * 24));　　
    return day;
}

function is_overdue() {  // 是否过期  语言包缓存7天，
    return DateMinus(get_local_cache('localtime'), get_local_time()) >= 7
}

function times(unixtimestamp) {
    // 时间戳 转换 时间格式
    var unixtimestamp = new Date(unixtimestamp * 1000);
    var year = 1900 + unixtimestamp.getYear();
    var month = "0" + (unixtimestamp.getMonth() + 1);
    var date = "0" + unixtimestamp.getDate();
    var hour = "0" + unixtimestamp.getHours();
    var minute = "0" + unixtimestamp.getMinutes();
    var second = "0" + unixtimestamp.getSeconds();
    return (
        year +
        "-" +
        month.substring(month.length - 2, month.length) +
        "-" +
        date.substring(date.length - 2, date.length) +
        " " +
        hour.substring(hour.length - 2, hour.length) +
        ":" +
        minute.substring(minute.length - 2, minute.length) +
        ":" +
        second.substring(second.length - 2, second.length)
    );
}

function check_time(k) { //小于10  补0；
    if (k < 10) {
        k = "0" + k
    }
    return k;
}

function get_version(fn) { // 获取软件的版本号
    var url = '/index.php?s=desktop/Nversions/versions_detail';
    ajax1(url, {}, function(e) {
        if (e.stat == 1) {
            fn(e.data);
        } else {
            showErr(e.errmsg, e.errmsg_en, e.errcode)
        }
    })
}

//导出表格
function JSONToExcelConvertor(JSONData, FileName, ShowLabel) {
 			
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    console.log(arrData);
    var excel = '<table>';
     
    //设置表头
    var row = "<tr>";
    for (var i = 0, l = ShowLabel.length; i < l; i++) {
             row += "<td>" + ShowLabel[i].value + '</td>';
    }   
    //换行
    excel += row + "</tr>";
     
    //设置数据
    for (var i = 0; i < arrData.length; i++) {
         var row = "<tr>";
     
       for(var j=0;j<arrData[i].length;j++){
         var value = arrData[i][j].value === "." ? "" : arrData[i][j].value;
         row += '<td>' + value + '</td>';
      }
    
       excel += row + "</tr>";
    }
     
    excel += "</table>";
     
    var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
    excelFile += '; charset=UTF-8">';
    excelFile += "<head>";
    excelFile += "<!--[if gte mso 9]>";
    excelFile += "<xml>";
    excelFile += "<x:ExcelWorkbook>";
    excelFile += "<x:ExcelWorksheets>";
    excelFile += "<x:ExcelWorksheet>";
    excelFile += "<x:Name>";
    excelFile += "{worksheet}";
    excelFile += "</x:Name>";
    excelFile += "<x:WorksheetOptions>";
    excelFile += "<x:DisplayGridlines/>";
    excelFile += "</x:WorksheetOptions>";
    excelFile += "</x:ExcelWorksheet>";
    excelFile += "</x:ExcelWorksheets>";
    excelFile += "</x:ExcelWorkbook>";
    excelFile += "</xml>";
    excelFile += "<![endif]-->";
    excelFile += "</head>";
    excelFile += "<body>";
    excelFile += excel;
    excelFile += "</body>";
    excelFile += "</html>";

    var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);    
    var link = document.createElement("a");
    link.href = uri;
    
    link.style = "visibility:hidden";
    link.download = FileName + ".xls";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



$('#index_content dl dd ul li a').on('click',function () {
    // console.log($(this).attr('data-title'))
})

function GetRequest(value) {  
    var url = decodeURI(location.search); //?id="123456"&Name="bicycle";
    var object = {};
    if(url.indexOf("?") != -1)
    {   
      var str = url.substr(1);  
      var strs = str.split("&");  //将得到的参数分隔成数组[id="123456",Name="bicycle"];
      for(var i = 0; i < strs.length; i ++)  
        {   
　　　　　　　　object[strs[i].split("=")[0]]=strs[i].split("=")[1]
　　　　　　}
　　}
    return object[value];  
}  



function showErr_bs(msg){
    var alert = '<div class="alert alert-warning alert-dismissible" role="alert" style="z-index:10000;padding: 25px 15px;color:#333333;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0px 0px 3px 2px #cccccc;background-color:#ffffff;border-color:#ffffff;">'+
        '<button type="button" class="close_ close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"></span></button>'+
        '<strong></strong>'+msg+
        '</div>'
        $(document.body).append(alert);
        setTimeout(function(){
            $('.close_').click();
        },1500)
}


