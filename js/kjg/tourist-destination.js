let itemNo = 1;
let numOfRows = 20;
let pageNo = 1;
let totalCnt = 0;
let totalPage = 0;
let searchKey;
let areaCodes = {
    전국: "0",
};

// 최초 페이지 이동시 리스트
$(function () {
    console.log("mainPage");
    $("#spinner").addClass("show");

    $(".navbarArea").html(getNavbar());
    $(".headerArea").html(
        getHeader("Tourist-Destination", {
            home: "index.html",
            "tourist-destination": "tourist-destination-main.html",
        })
    );
    $(".footerArea").html(getFooter());
    $(".copyrightArea").html(getCopyright());

    $("#selectArea").html(`
                <option>1</option>
                
                <option>3</option>
                <option>4</option>`);

    ajaxRequest(
        areaBasedContentsUrl,
        {
            numOfRows: numOfRows,
            pageNo: pageNo++,
            MobileOS: "ETC",
            MobileApp: "AppTest",
            serviceKey: apiKey,
            _type: "json",
            contentTypeId: 12,
        },
        function (data) {
            let body = data.response.body;

            totalCnt = body.totalCount;
            totalPage = Math.floor(totalCnt / numOfRows + 1);
            drawList(body.totalCount, body.items);
            $("#spinner").removeClass("show");
        }
    );

    makeAreaSelector();

    // 더보기
    $("#moreItemsButton").on("click", function () {
        console.log(pageNo);
        console.log(totalPage);
        if (pageNo == totalPage) {
            $("#moreItemsButton").hide();
        }

        $("#spinner").addClass("show");

        // 검색결과 더보기
        if ($("#moreItemsButton").hasClass("searched")) {
            ajaxRequest(
                searchedContentUrl,
                {
                    numOfRows: numOfRows,
                    pageNo: pageNo++,
                    MobileOS: "ETC",
                    MobileApp: "AppTest",
                    serviceKey: apiKey,
                    _type: "json",
                    keyword: searchKey,
                    contentTypeId: 12,
                },
                function (data) {
                    let body = data.response.body;
                    console.log(body);
                    drawList(body.totalCount, body.items);

                    $("#spinner").removeClass("show");
                }
            );
        } else {
            // 일반 더보기
            ajaxRequest(
                areaBasedContentsUrl,
                {
                    numOfRows: numOfRows,
                    pageNo: pageNo++,
                    MobileOS: "ETC",
                    MobileApp: "AppTest",
                    serviceKey: apiKey,
                    _type: "json",
                    contentTypeId: 12,
                },
                function (data) {
                    let body = data.response.body;

                    totalCnt = body.totalCount;
                    drawList(body.totalCount, body.items);
                }
            );
        }
    });

    $("#listTab").on("click", ".favoriteButton i", function (e) {
        let element = $(e.target).parent().parent().parent();
        let title = element.attr("data-title");
        let img = element.attr("data-img");
        let contentId = element.attr("data-contentId");

        let cookValJson = getFavCookie();
        if (e.target.classList.contains("checked")) {
            delFavItem(cookValJson, contentId);
        } else {
            addFavItem(cookValJson, contentId, title, img);
        }

        e.target.classList.toggle("fa-solid");
        e.target.classList.toggle("fa-regular");
        e.target.classList.toggle("checked");
    });
});

function makeListItem(title, img, contentId, isFavorite) {
    let item = `
        <div class="col-lg-6 col-xl-3">
            <div class="list-item" data-contentId="${contentId}" data-img="${img}" data-title="${title}" >
                <div class="list-img">
                    <img
                        src="${img}"
                        class="img-fluid item-img"
                        alt=""
                    />
                    <div class="favoriteButton">
                        <i class="${
                            isFavorite ? "fa-solid checked" : "fa-regular"
                        } fa-heart"></i>
                    </div>
                </div>
                <div class="item-title p-4 border">
                    <div class="detailPageBtn">
                        <a href="tourist-destination-detail.html?contentid=${contentId}">
                            <h4 class="mb-4">${title}</h4>
                        </a>
                    </div>
                </div>
            </div>
        </div>`;

    return item;
}

// 리스트 그리기
function drawList(totalCount, list) {
    let cookValJson = getFavCookie();
    let cookieNames = [];

    if (cookValJson == null) {
    } else {
        cookieNames = Object.keys(cookValJson);
    }

    totalPage = Math.floor(totalCnt / numOfRows + 1);

    $("#itemCount").html(
        `<span>총 개수: ${totalCount}, 총 페이지: ${totalPage}</span>`
    );
    for (let i = 0; i < list.item.length; i++) {
        let title = list.item[i].title;
        let img =
            list.item[i].firstimage != ""
                ? list.item[i].firstimage
                : "img/kjg/noimg.png";
        let contentId = list.item[i].contentid;

        let isFavorite = cookieNames.includes(contentId);

        $("#listTab").append(makeListItem(title, img, contentId, isFavorite));
    }

    $("#spinner").removeClass("show");
}

// 키워드 검색
$("#searchBar").on("keydown", function (e) {
    pageNo = 1;

    if (e.key == "Enter") {
        let code = areaCodes[$("#selectArea").val()];
        console.log($(this).val());

        // 빈 값인 경우 지역기반 검색을 실행
        if ($(this).val() == null || $(this).val() == "") {
            ajaxRequest(
                areaBasedContentsUrl,
                {
                    numOfRows: numOfRows,
                    pageNo: pageNo++,
                    MobileOS: "ETC",
                    MobileApp: "AppTest",
                    serviceKey: apiKey,
                    _type: "json",
                    contentTypeId: 12,
                    ...(code != 0 ? { areaCode: code } : {}),
                },
                function (data) {
                    if (data.response.body.totalCount != 0) {
                        let body = data.response.body;

                        totalCnt = body.totalCount;
                        totalPage = Math.floor(totalCnt / numOfRows + 1);
                        console.log(`total: ${totalPage}`);
                        console.log(`pageNo: ${pageNo - 1}`);
                        if (pageNo - 1 == totalPage) {
                            $("#moreItemsButton").hide();
                        }

                        $("#listTab").html("");
                        drawList(body.totalCount, body.items);
                    } else {
                        $("#itemCount").html("");
                        $("#listTab").html("검색결과가 없습니다.");
                        $("#moreItemsButton").hide();
                    }

                    $("#spinner").removeClass("show");
                }
            );
        } else {
            // 빈 값이 아닌경우 키워드 검색을 진행
            searchKey = $(this).val();

            $("#moreItemsButton").show();
            $("#moreItemsButton").addClass("searched");
            $("#spinner").addClass("show");
            console.log(code);

            ajaxRequest(
                searchedContentUrl,
                {
                    numOfRows: numOfRows,
                    pageNo: pageNo++,
                    MobileOS: "ETC",
                    MobileApp: "AppTest",
                    serviceKey: apiKey,
                    _type: "json",
                    keyword: searchKey,
                    contentTypeId: 12,
                    ...(code != 0 ? { areaCode: code } : {}),
                },
                function (data) {
                    console.log(data);
                    if (data.response.body.totalCount != 0) {
                        let body = data.response.body;

                        totalCnt = body.totalCount;
                        totalPage = Math.floor(totalCnt / numOfRows + 1);
                        console.log(`total: ${totalPage}`);
                        console.log(`pageNo: ${pageNo - 1}`);
                        if (pageNo - 1 == totalPage) {
                            $("#moreItemsButton").hide();
                        }

                        $("#listTab").html("");
                        drawList(body.totalCount, body.items);
                    } else {
                        $("#itemCount").html("");
                        $("#listTab").html("검색결과가 없습니다.");
                        $("#moreItemsButton").hide();
                    }

                    $("#spinner").removeClass("show");
                }
            );
        }
    }
});

function makeAreaSelector() {
    let output = `<option>전국</option>`;
    console.log(areaCodes[0]);

    ajaxRequest(
        areaCodeUrl,
        {
            MobileOS: "ETC",
            MobileApp: "AppTest",
            serviceKey: apiKey,
            _type: "json",
            numOfRows: 20,
        },
        function (data) {
            let items = data.response.body.items;
            for (let i = 0; i < items.item.length; i++) {
                let key = items.item[i].name;
                let value = items.item[i].code;
                areaCodes[key] = value;
                output += `<option>${key}</option>`;
            }
            console.log(areaCodes);

            $("#selectArea").html(output);
        }
    );
}

// 검색 함수 빼두기
function search() {}
