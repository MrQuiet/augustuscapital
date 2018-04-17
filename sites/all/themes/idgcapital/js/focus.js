/**
 * Created by wangzhiwei on 2018/3/6.
 */
$(function () {
    var _hash = location.hash.substring(2), hash0 = _hash.split("/")[0], hash1 = _hash.split("/")[1];
    console.log(_hash);
    if(hash0=="cases") {
        toClass("casestudies");
            $(".casestudies .case-list").eq(hash1).find("dt").click();
    }
})