$(function () {
    console.log("mainPage");
    ajaxRequest(
        areaBasedContentsUrl,
        {
            numOfRows: "20",
            pageNo: "0",
            MobileOS: "ETC",
            MobileApp: "AppTest",
            serviceKey: apiKey,
            _type: "json",
            contentTypeId: 12,
        },
        function (data) {
            let itemList = data.response.body.items.item;
            drawList(itemList);
        }
    );
});

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
