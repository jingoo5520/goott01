let itemNo = 1;
let numOfRows = 20;
let pageNo = 1;
let totalCnt = 0;
let totalPage = 0;
let searchKey;

// 최초 페이지 이동시 리스트
$(function () {
    console.log("mainPage");
    $("#spinner").addClass("show");

    $(".navbarArea").html(getNavbar());
    $(".headerArea").html(getHeader("Tourist-Destination"));
    $(".footerArea").html(getFooter());
    $(".copyrightArea").html(getCopyright());

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
            console.log(totalPage);
            drawList(body.items);
            $("#spinner").removeClass("show");
        }
    );

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
                    drawList(body.items);

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
                    let itemList = data.response.body.items;

                    totalCnt = itemList.totalCount;
                    drawList(itemList);
                    $("#spinner").removeClass("show");
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
            <div class="list-item" data-contentId="${contentId}" data-img=${img} data-title=${title} >
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
function drawList(list) {
    let cookValJson = getFavCookie();
    let cookieNames = [];

    if (cookValJson == null) {
    } else {
        console.log("쿠키있음");
        cookieNames = Object.keys(cookValJson);
        console.log(cookieNames);
    }

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
}

// 키워드 검색
$("#searchBar").on("keydown", function (e) {
    pageNo = 1;

    if (e.key == "Enter" && $(this).val() != "") {
        searchKey = $(this).val();
        $("#moreItemsButton").show();

        $("#moreItemsButton").addClass("searched");
        $("#spinner").addClass("show");

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
                    drawList(body.items);
                } else {
                    $("#listTab").html("검색결과가 없습니다.");
                    $("#moreItemsButton").hide();
                }

                $("#spinner").removeClass("show");
            }
        );
    }
});
