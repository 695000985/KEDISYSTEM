function detection_version(fn) { // 
    var url = '/index.php?s=desktop/Nversions/versions_detail';
    ajax(url, {}, function (e) {
        if (e.stat == 1) {
            fn(e.data)
        } else {
            showErr(e.errmsg, e.errmsg_en, e.errcode)
        }
    })
}

function get_user_info(fn) { // 查询登录人的 个人信息
    var url = '/index.php?s=desktop/Enter_App_User/admin_info';
    var data = {};
    data['usertoken'] = get_cache('usertoken');
    ajax(url, data, function (e) {
        if (e.stat == 1) {
            fn(e.data)
        } else {
            showErr(e.errmsg, e.errmsg_en, e.errcode)
        }
    })
}

function get_region(fn) { // 获取地区
    var url = "/index.php?s=desktop/common/GetRegion";
    var data = {};
    data['usertoken'] = get_cache('usertoken');
    ajax1(url, data, function (e) {
        if (e.stat != 0) {
            fn(e)
        } else {
            showErr(e.errmsg, e.errmsg_en, e.errcode)
        }


    })
}

function get_user_info_detail(fn) { //查询登录人的个人的详细信息
    var url = "/index.php?s=desktop/Enter_App_User/admin_info_detail";
    var data = {};
    data['usertoken'] = get_cache('usertoken');
    ajax(url, data, function (e) {
        if (e.stat == 1) {
            fn(e.data)
        } else {
            showErr(e.errmsg, e.errmsg_en, e.errcode)
        }
    })
}

function edit_user_passward(obj) { // 修改管理员登录密码
    var url = "/index.php?s=desktop/Enter_App_User/setPassword";
    var data = {};
    data['usertoken'] = get_cache('usertoken');
    var opt = $.extend({}, data, obj)
    ajax(url, opt, function (e) {
        if (e.stat == 1) {
            success(e.data)
        } else {
            showErr(e.errmsg, e.errmsg_en, e.errcode)
        }
    })
}


var config_txt = {
    "success_text": {
        "zn_entry": '录入成功',
        "en_entry": 'success entry',
    },
    "network_err": {
        "zn_network_err": '网络不可用',
        "en_network_err": 'network error'
    },
    "product_no": {
        "zn_network_err": '产品编号不能为空',
        "en_network_err": ''
    },
    "select_shop_no": {
        "zn_select_sn": "填写专卖店编号",
        "en_select_sn": ""
    },
    "select_product": {
        "zn": '请选择产品',
        "en": '',
    },
    "select_sale": {
        "zn": "选择删除的报单",
        "en": ''
    },
    "export_ext": {
        "zn": '没有数据可供导出',
        "en": ''
    },
    "export_creat": {
        "zn": '没有数据可供生成',
        "en": ''
    },
    "confirm_psw": {
        'zn': "密码不一致",
        "cn": ""
    },
    "sel_cash": {
        "zn": "选择你要删除的信息",
        "en": "Pls select the line which one you want to delete"
    },
    "del_cash": {
        "zn": "",
        "en": "Do you want to delete the Cash",
    },
    "sel_tellar": {
        "zn": '',
        "en": "Pls select the line which one you want to delete!"
    },
    "del_tellar": {
        "zn": '',
        "en": "Do you want to the delete tellar"
    },
    "": {

    }
}
var config_year = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];
var config_month = ['1', '2', '3', '4','5','6','7','8','9','10','11','12'];