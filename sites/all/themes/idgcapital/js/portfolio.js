/**
 * Created by wangzhiwei on 2018/3/6.
 */
function loadTid(tid) {
    var targetLi = $(".portfolios .select li[data-val="+tid+"]");
    targetLi.addClass("active").siblings().removeClass("active");
    var text = targetLi.text();
    $(".portfolios .select span").text(text);
}
$(function(){
    // portfolio
    try{
        groupNum();
    }
    catch (e){}
    try {
        $(".portfolio-item").each(function (index) {
            var imgsrc = $(this).find("a:eq(0)").data("src");
            if(imgsrc!=""){
                $(this).find("a:eq(0)").css({
                    "background-image": "url(" + imgsrc + ")"
                });
            }
        });
        $(".portfolio-list").on("click", ".portfolio-item", function () {
            var col = $(this).attr("data-col");
            var $plast = $(".portfolio-item[data-col='" + col + "']:last");
            var detail = $(this).find(".portfolio-info").html();
            // alert(col);

            if ($(this).hasClass("active") && $plast.next().is(".portfolio-detail")) {
                $(".portfolio-detail").removeClass("active");
                $(this).removeClass("active");
            }
            else {
                $(this).addClass("active").siblings().removeClass("active");
                if ($plast.next().is(".portfolio-detail")) {
                    $(".portfolio-detail").addClass("active").empty().html(detail)
                }
                else {
                    $(".portfolio-detail").remove();
                    $plast.after('<div class="portfolio-detail">' + detail + '</div>');
                    $(".portfolio-detail").addClass("active");
                }
            }


            /*
             var tt = $(this).position().top + $(this).height();
             $("#portfolioPop").css("top",tt+"px").show().addClass("show");*/
            /*$("#portfolioPop .portfolio-detail").html(detail);
             var wh = $(window).height(), th  = $("#portfolioPop").height();
             $("#cover").fadeIn(300);
             $("#portfolioPop").addClass("active").css({
             "top": (wh-th)/2 + "px"
             });*/
        })

        $("#portfolioPop a.close").click(function () {
            $("#cover").fadeOut(300);
            $("#portfolioPop").removeClass("active");
            $(".portfolio-item").removeClass("active");
        })
    }
    catch (e) {}
    var tid = getQueryStringRegExp("tid");
    if(tid!=""){
        loadTid(tid);
    }

    $(".search-portfolio .search-btn").click(function(){
        var inputVal = $("#portfolioInput").val();
        if($.trim(inputVal)=="") {
            return false;
        }
        else {
            location.href="/portfolio?tid=All&title="+inputVal;
        }
    })
    $(".portfolios .select li").click(function(){
        var txt = $(this).text();
        $(this).addClass("active").siblings("li").removeClass("active");
        $(this).parent("ul").prev("span").html(txt).parent(".select").removeClass("on");
        var val = $(this).data("val");
        location.href="/portfolio?tid="+val;
    });



})
