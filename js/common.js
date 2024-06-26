const apiKey =
    "6gNmKhyEs%2BsCMNSLmsp%2FQTRwU3aROgyt%2F84W0LeYg0i%2BIX98xBhh6%2F1teGtm431ojGRZR4cEjNVelra2oXxPmA%3D%3D";

const areaBasedContentsUrl =
    "http://apis.data.go.kr/B551011/KorService1/areaBasedList1?";

const searchedContentUrl =
    "http://apis.data.go.kr/B551011/KorService1/searchKeyword1?";

const detailContentUrl =
    "http://apis.data.go.kr/B551011/KorService1/detailCommon1?";

const moreImagesUrl =
    "http://apis.data.go.kr/B551011/KorService1/detailImage1?";

(function ($) {
    ("use strict");

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($("#spinner").length > 0) {
                $("#spinner").removeClass("show");
            }
        }, 1);
    };
    spinner(0);

    // Fixed Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $(".fixed-top .container")
                .addClass("shadow-sm")
                .css("max-width", "100%");
        } else {
            $(".fixed-top .container")
                .removeClass("shadow-sm")
                .css("max-width", "85%");
        }
    });

    // Donation
    $(".progress").waypoint(
        function () {
            $(".progress-bar").each(function () {
                $(this).css("width", $(this).attr("aria-valuenow") + "%");
            });
        },
        { offset: "80%" }
    );

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000,
    });

    // Event carousel
    $(".event-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>',
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 1,
            },
            992: {
                items: 2,
            },
            1200: {
                items: 3,
            },
        },
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $(".back-to-top").fadeIn("slow");
        } else {
            $(".back-to-top").fadeOut("slow");
        }
    });
    $(".back-to-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
        return false;
    });
})(jQuery);

// ---------------------------------------------------------------------------------------

// ajax 요청
function ajaxRequest(baseUrl, params, successCallback) {
    let url = `${baseUrl}`;

    for (key in params) {
        url += `${key}=${params[key]}&`;
    }

    console.log(url);

    $.ajax({
        url: url, // url
        type: "get", // method
        dataType: "json", // dataType
        success: successCallback, // 통신 성공
        error: function () {}, // 통신 실패
        complete: function () {}, // 통신 완료
    });
}

// $(".detailPageBtn").click(function () {
//     console.log(this);
// });

// $("#selectAreaBtn").click(function () {});
