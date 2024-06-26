let loadedTabs = [false, false, false];

$(function () {
    console.log("detailPage");
    let url = location.href;

    let contentId = url.split("contentid=")[1];

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

                    for (let i = 0; i < images.length; i++) {
                        imageArray.push(images[i].originimgurl);
                    }

                    console.log(imageArray);

                    $("#imgArea").html(makeCarouselSlide(imageArray));
                    // $("#tab0-content").append(makeCommonInfoTable());
                }
            );

            // 상세 정보 요청
            ajaxRequest(
                detailContentUrl,
                {
                    MobileOS: "ETC",
                    MobileApp: "AppTest",
                    serviceKey: apiKey,
                    _type: "json",
                    contentId: contentId,
                    defaultYN: "Y",
                    firstImageYN: "Y",
                },
                function (data) {
                    // console.log(data);
                    // console.log(makeCarouselSlide([]));
                    // $("#tab0-content").append(makeCommonInfoTable());
                }
            );
        } else {
        }
    } else if (tab == 1) {
        if ($("#tab1-content").html() == "") {
            ajaxRequest(
                detailContentUrl,
                {
                    MobileOS: "ETC",
                    MobileApp: "AppTest",
                    serviceKey: apiKey,
                    _type: "json",
                    contentId: contentId,
                    defaultYN: "Y",
                    firstImageYN: "Y",
                },
                function (data) {
                    let output2 = `<div class="row py-4">
                        <div class="col">345</div>
                        <div class="col">678</div>
                    </div>`;
                    let item = data.response.body.items.item[0];
                    // console.log(item.firstimage);
                    $("#tab1-content").html(output2);
                }
            );
        }
    } else {
        console.log("tab2 데이터 호출");
    }
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

function makeCommonInfoTable() {
    let table = `
    
<div id="infoArea" class="">
                            <table class="">
                                <tr class="">
                                    <th class="py-2">우편번호</th>
                                    <td class="">
                                        전라남도 진도군 고군면 신비의바닷길 47
                                        (고군면)
                                    </td>
                                </tr>
                                <tr>
                                    <th class="py-2">주소</th>
                                    <td>
                                        전라남도 진도군 고군면 신비의바닷길 47
                                        (고군면)
                                    </td>
                                </tr>
                                <tr>
                                    <th class="py-2">홈페이지</th>
                                    <td>
                                        전라남도 진도군 고군면 신비의바닷길 47
                                        (고군면)
                                    </td>
                                </tr>
                            </table>
                        </div>`;

    return table;
}
