const apiKey =
    "6gNmKhyEs%2BsCMNSLmsp%2FQTRwU3aROgyt%2F84W0LeYg0i%2BIX98xBhh6%2F1teGtm431ojGRZR4cEjNVelra2oXxPmA%3D%3D";

const areaBasedContentsUrl =
    "http://apis.data.go.kr/B551011/KorService1/areaBasedList1?";

const searchedContentUrl =
    "http://apis.data.go.kr/B551011/KorService1/searchKeyword1?";

const detailContentUrl =
    "http://apis.data.go.kr/B551011/KorService1/detailCommon1?";

(function ($) {
    console.log("페이지시작");
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

function makeListItem(title, img, contentId) {
    let item = `
        <div class="col-lg-6 col-xl-3">
            <div class="list-item">
                <div class="list-img">
                    <img
                        src="${img}"
                        class="img-fluid item-img"
                        alt=""
                    />
                </div>
                <div class="item-title p-4 border">
                    <div class="detailPageBtn">
                        <a href="detail.html?contentid=${contentId}">
                            <h4 class="mb-4">${title}</h4>
                        </a>
                    </div>
                </div>
            </div>
        </div>`;

    return item;
}

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

// 리스트 그리기
function drawList(list) {
    for (let i = 0; i < list.length; i++) {
        let title = list[i].title;
        let img =
            list[i].firstimage != "" ? list[i].firstimage : "img/noimg.png";
        let contentId = list[i].contentid;
        $("#listTab").append(makeListItem(title, img, contentId));
    }
}

// 키워드 검색
$("#searchBar").on("keydown", function (e) {
    if (e.key == "Enter" && $(this).val() != "") {
        let searchKey = $(this).val();
        console.log("enter");

        ajaxRequest(
            searchedContentUrl,
            {
                numOfRows: "20",
                pageNo: "0",
                MobileOS: "ETC",
                MobileApp: "AppTest",
                serviceKey: apiKey,
                _type: "json",
                keyword: searchKey,
                contentTypeId: 12,
            },
            function (data) {
                if (data.response.body.totalCount != 0) {
                    let itemList = data.response.body.items.item;

                    console.log(itemList.length);
                    $("#listTab").html("");
                    drawList(itemList);
                } else {
                    $("#listTab").html("검색결과가 없습니다.");
                }
            }
        );
    }
});

$(".detailPageBtn").click(function () {
    console.log(this);
});

$("#selectAreaBtn").click(function () {});

function setDetailPage(item) {
    console.log(item);

    $("#areaDetail").html(item.title);
}
