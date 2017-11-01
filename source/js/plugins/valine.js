const valine = new Valine({
    el: "#comment" ,
    notify: DC.v.notify, 
    verify: DC.v.verify, 
    app_id: DC.v.appid,
    app_key: DC.v.appkey,
    placeholder: DC.v.placeholder,
    path: window.location.pathname, 
    avatar: DC.v.avatar
});