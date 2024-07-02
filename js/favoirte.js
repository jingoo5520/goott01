$(function () {
    console.log("favorite page");
    $("#spinner").addClass("show");

    $(".breadcrumb").html(
        `<li class="breadcrumb-item"><a href="index.html">Home</a></li><li class="breadcrumb-item"><a href="#">Favoite</a></li>`
    );

    $(".navbarArea").html(getNavbar());
    $(".headerArea").html(
        getHeader("Favorite", {
            home: "index.html",
            favoirte: "#",
        })
    );
    $(".footerArea").html(getFooter());
    $(".copyrightArea").html(getCopyright());

    drawFavList();

    setTimeout(function () {
        $("#spinner").removeClass("show");
    }, 300);

    // 찜 취소 수정필요
    $("#favoriteListTab").on("click", ".favoriteButton i", function (e) {
        console.log("찜취소 클릭");

        let element = $(e.target).parent().parent().parent();

        let contentId = element.attr("data-contentId");
        console.log(contentId);
        // let img = element.attr("data-img");
        // let contentId = element.attr("data-contentId");

        let cookValJson = getFavCookie();
        delFavItem(cookValJson, contentId);
        drawFavList();
        // if (e.target.classList.contains("checked")) {

        // } else {
        //     addFavItem(cookValJson, contentId, title, img);
        // }

        // e.target.classList.toggle("fa-solid");
        // e.target.classList.toggle("fa-regular");
        // e.target.classList.toggle("checked");
    });
});

// 쿠키 가져와서 데이터 뿌리기
function drawFavList() {
    $("#favoriteListTab").html("");
    let cookValJson = getFavCookie();
    console.log(cookValJson);

    // 찜 아이템 없는 경우
    if (cookValJson == null || Object.keys(cookValJson).length == 0) {
        $("#favoriteListTab").html("찜 항목이 없습니다.");
    } else {
        for (let item in cookValJson) {
            let title = cookValJson[item].title;
            let img = cookValJson[item].postimage;
            let link = cookValJson[item].link;
            let contentId = item;
            console.log(cookValJson[item].title);

            $("#favoriteListTab").append(
                makeFavoriteListItem(contentId, title, img, link)
            );
        }
    }
}

function makeFavoriteListItem(contentId, title, img, link) {
    let item = `
        <div class="col-lg-6 col-xl-3">
            <div class="list-item" data-contentId=${contentId}>
                <div class="list-img">
                    <img
                        src="${img}"
                        class="img-fluid item-img"
                        alt=""
                    />
                <div class="favoriteButton">
                        <i class="fa-solid
                        fa-heart"></i>
                    </div>
                </div>
                <div class="item-title p-4 border">
                    <div class="detailPageBtn">
                        <a href="${link}">
                            <h4 class="mb-4">${title}</h4>
                        </a>
                    </div>
                </div>
            </div>
        </div>`;

    return item;
}
