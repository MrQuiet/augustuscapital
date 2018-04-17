function loadOffice(office) {
    toClass("offices");
    var targetLi = $(".offices:eq(0) .select li[data-val="+office+"]");
    var index = targetLi.index();
    targetLi.addClass("active").siblings("li").removeClass("active");
    $(".offices:eq(0) .select span").text(office);
    $(".offices:eq(0) .fx-slider .address-list").eq(index).addClass("current").siblings(".address-list").removeClass("current");

    $(".offices:eq(0) .fx-slides li:eq("+index+")").addClass("current");
    setTimeout(function(){
        $(".offices:eq(0) .fx-slides li:eq("+index+")").siblings("li").removeClass("current");
    },500);

    $("#map1").hide();

    $(".offices:eq(0) .fx-slider .address-list").eq(index).find(".btn-map").text('View Map');
}

var gmap1, gmarker1, gmap2, gmarker2;
$(document).ready(function () {
    var office = getQueryStringRegExp("office");
    if(office!=""){
        loadOffice(office);
    }
    $(".photos li").each(function(){
        var src = $(this).data("src");
        $(this).css({
            "background-image":"url('"+src+"')"
        });
    });
    $("li", ".offices .select").click(function () {
        var index = $(this).index();
        var txt = $(this).text();
        $(this).addClass("active").siblings("li").removeClass("active").parent("ul").prev("span").text(txt).parent(".select").removeClass("on");

        var addressLi = $(this).parents(".select").next(".fx-slider");
        addressLi.find(".address-list").eq(index).addClass("current").siblings(".address-list").removeClass("current");

        var fxSlidesLi = $(this).parents(".offices").find(".fx-slides");
        fxSlidesLi.find("li").eq(index).addClass("current");
        setTimeout(function(){
            fxSlidesLi.find("li").eq(index).siblings("li").removeClass("current");
        },500);
        if($(this).parents(".offices").hasClass("affiliates")) {
            $("#map2").hide();
        }
        else {
            $("#map1").hide();
        }

        addressLi.find(".address-list").eq(index).find(".btn-map").text('View Map');
    });
    $(".btn-map", ".offices").click(function () {
        if($(this).parents(".offices").hasClass("affiliates")) {
            if ($(this).text() == 'View Map') {
                if (!gmap2) {
                    var a = map_init($(this).data("coord"), 2);
                    gmap2 = a[0];
                    gmarker2 = a[1];
                }
                else setMap($(this).data("coord"), gmap2, gmarker2);
                $("#map2").show();
                $(this).text("Hide Map");
            }
            else {
                $("#map2").hide();
                $(this).text("View Map");
            }
        }
        else {
            if ($(this).text() == 'View Map') {
                if (!gmap1) {
                    var a = map_init($(this).data("coord"), 1);
                    gmap1 = a[0];
                    gmarker1 = a[1];
                }
                else setMap($(this).data("coord"), gmap1, gmarker1);
                $("#map1").show();
                $(this).text("Hide Map");
            }
            else {
                $("#map1").hide();
                $(this).text("View Map");
            }
        }
    });
});

function map_init(d, n) {
    var c = d.split(',');
    c = new google.maps.LatLng(c[0], c[1]);
    var mapOptions = {
        zoom: 16,
        scrollwheel: false,
        center: c,
        address: n,
        styles: [{
            featureType: "landscape.man_made",
            elementType: "geometry",
            stylers: [{color: "#ffffff"}]
        }, {
            featureType: "landscape.man_made",
            elementType: "labels.text.fill",
            stylers: [{saturation: "51"}]
        }, {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{visibility: "on"}, {color: "#ecefef"}]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{visibility: "on"}, {color: "#abaaaa"}, {lightness: "22"}]
        }, {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{color: "#000000"}]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [{visibility: "simplified"}, {hue: "#ff0000"}]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{visibility: "off"}, {color: "#5e5d5d"}]
        }, {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [{visibility: "on"}, {lightness: 700}, {color: "#f6848f"}]
        }, {featureType: "water", elementType: "all", stylers: [{color: "#c1dfea"}]}]

    };

    var mapElement = document.getElementById('map' + n);
    var gmap = new google.maps.Map(mapElement, mapOptions);

    var gmarker = new google.maps.Marker({
        position: c,
        map: gmap,
        title: 'name',
        icon: "<?php print base_path().path_to_theme(); ?>/i/pin.png"
    });

    setTimeout(function () {
        google.maps.event.trigger(mapElement, 'resize');
        setMap(d, gmap, gmarker);
    }, 100);

    return [gmap, gmarker];
}

function setMap(d, gmap, gmarker) {
    var c = d.split(',');
    c = new google.maps.LatLng(c[0], c[1]);
    gmap.setCenter(c);
    gmarker.setPosition(c);
}
