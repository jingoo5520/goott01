let loadedTabs = [false, false];

$(function () {
    let url = location.href;

    let contentId = url.split("contentid=")[1];

    $(".navbarArea").html(getNavbar());
    $(".headerArea").html(
        getHeader("Info", {
            home: "index.html",
            "tourist-destination": "tourist-destination-main.html",
        })
    );
    $(".footerArea").html(getFooter());
    $(".copyrightArea").html(getCopyright());

    setDetailPage(contentId, 0);

    $("a[data-bs-toggle='pill']").on("show.bs.tab", function (e) {
        let target = e.target;

        if (target.id == "tab0") {
            setDetailPage(contentId, 0);
        } else if (target.id == "tab1") {
            setDetailPage(contentId, 1);
        } else {
            setDetailPage(contentId, 2);
        }
    });
});

// 최초 상세페이지 이동시 공통정보 호출
function setDetailPage(contentId, tab) {
    if (tab == 0) {
        if (!loadedTabs[tab]) {
            $("#spinner").addClass("show");
            ajaxRequest(
                moreImagesUrl,
                {
                    MobileOS: "ETC",
                    MobileApp: "AppTest",
                    serviceKey: apiKey,
                    _type: "json",
                    contentId: contentId,
                    imageYN: "Y",
                    subImageYN: "Y",
                },
                function (data) {
                    let images = data.response.body.items.item;
                    let imageArray = [];

                    // 이미지가 없는 경우
                    if (data.response.body.totalCount == 0) {
                        imageArray[0] = "img/kjg/noimg.png";
                    } else {
                        for (let i = 0; i < images.length; i++) {
                            imageArray.push(images[i].originimgurl);
                        }
                    }

                    $("#imgArea").html(makeCarouselSlide(imageArray));
                }
            );

            // 상세 정보 요청
            ajaxRequest(
                commonInfoUrl,
                {
                    MobileOS: "ETC",
                    MobileApp: "AppTest",
                    serviceKey: apiKey,
                    _type: "json",
                    contentId: contentId,
                    defaultYN: "Y",
                    addrinfoYN: "Y",
                    mapinfoYN: "Y",
                    overviewYN: "Y",
                },
                function (data) {
                    let item = data.response.body.items.item[0];

                    $(".breadcrumb").append(
                        `<li class="breadcrumb-item"><a href="#">${item.title}</a></li>`
                    );

                    $("#infoArea").html(makeCommonInfoTable(item));
                    makeMap(item.mapy, item.mapx);
                    $("#spinner").removeClass("show");
                }
            );
        } else {
        }
    } else {
        if (!loadedTabs[tab]) {
            $("#spinner").addClass("show");
            ajaxRequest(
                detailInfoUrl,
                {
                    MobileOS: "ETC",
                    MobileApp: "AppTest",
                    serviceKey: apiKey,
                    _type: "json",
                    contentId: contentId,
                    contentTypeId: 12,
                },
                function (data) {
                    let item = data.response.body.items.item[0];
                    $("#detailInfoArea").html(makeDetailInfoTable(item));
                    $("#spinner").removeClass("show");
                }
            );
        } else {
        }
    }

    loadedTabs[tab] = true;
}

function makeCarouselSlide(images) {
    let carousel = `
    <div
        id="demo"
        class="carousel slide"
        data-bs-ride="carousel"
    >`;

    // Indicators/dots
    carousel += `<div class="carousel-indicators">`;
    for (let i = 0; i < images.length; i++) {
        carousel += `
        <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="${i}"
            class="${i == 0 ? "active" : ""}"
        ></button>`;
    }
    carousel += `</div>`;

    // The slideshow/carousel
    carousel += `<div class="carousel-inner">`;
    for (let i = 0; i < images.length; i++) {
        carousel += `
            <div class="carousel-item ${i == 0 ? "active" : ""}">
                <img
                    src="${images[i]}"
                    alt="Los Angeles"
                    class="d-block w-80"
                />
            </div>`;
    }
    carousel += `</div>`;

    // Left and right controls/icons
    carousel += ` 
        <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#demo"
            data-bs-slide="prev"
        >
            <span
                class="carousel-control-prev-icon"
            ></span>
        </button>
        <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#demo"
            data-bs-slide="next"
        >
            <span
                class="carousel-control-next-icon"
            ></span>
        </button>`;
    carousel += `</div>`;

    return carousel;
}

function makeCommonInfoTable(item) {
    let table = `
        <div id="infoArea" class="">
            <table class="">
                <tr class="">
                    <th class="py-2">우편번호</th>
                    <td class="">
                        ${item.zipcode}
                    </td>
                </tr>
                <tr>
                    <th class="py-2">주소</th>
                    <td>
                        ${item.addr1} ${item.addr2}
                    </td>
                </tr>
                <tr>
                    <th class="py-2">홈페이지</th>
                    <td>
                        ${item.homepage}
                    </td>
                </tr>
                <tr>
                    <th class="py-2">개요</th>
                    <td>
                        ${item.overview}
                    </td>
                <tr>
            </table>
        </div>`;

    return table;
}

// 카카오 지도
function makeMap(lat, lon) {
    var mapContainer = $("#mapArea")[0],
        mapOption = {
            center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
        };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(lat, lon);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
}

// 소개 정보
function makeDetailInfoTable(item) {
    let table = `
        <div id="infoArea" class="">
            <table class="">
                <tr class="">
                    <th class="py-2">문의 및 안내</th>
                    <td class="">
                        ${item.infocenter}
                    </td>
                </tr>
                <tr>
                    <th class="py-2">쉬는 날</th>
                    <td>
                        ${item.restdate}
                    </td>
                </tr>
                <tr>
                    <th class="py-2">이용 시간</th>
                    <td>
                        ${item.usetime}
                    </td>
                </tr>
                <tr>
                    <th class="py-2">주차 시설</th>
                    <td>
                        ${item.parking}
                    </td>
                </tr>
                <tr>
                    <th class="py-2">애완동물 동반 가능 여부</th>
                    <td>
                        ${item.chkpet}
                    </td>
                </tr>

            </table>
        </div>`;
    return table;
}
