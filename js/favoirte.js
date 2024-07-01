$(function () {
    console.log("favorite page");

    $(".breadcrumb").html(
        `<li class="breadcrumb-item"><a href="index.html">Home</a></li><li class="breadcrumb-item"><a href="#">Favoite</a></li>`
    );

    $(".navbarArea").html(getNavbar());
    $(".headerArea").html(getHeader("Favorites"));
    $(".footerArea").html(getFooter());
    $(".copyrightArea").html(getCopyright());

    drawList();
});

// 쿠키 가져와서 데이터 뿌리기
function drawList() {
    // let isExistCookie = false;
    // 모든 쿠키 가져오기
    let cookArr = document.cookie.split(";");
    console.log(cookArr);

    let cookValJson;

    // 쿠키검색, 가져오기
    for (let i = 0; i < cookArr.length; i++) {
        let cookie = cookArr[i].trim();
        let cookName = cookie.split("=")[0];
        let cookValue = cookie.substring(cookie.indexOf("=") + 1);

        if (cookName == "favorite_post") {
            isExistCookie = true;
            cookValJson = JSON.parse(cookValue);
            console.log(cookValJson);
            break;
        }
    }

    for (let item in cookValJson) {
        let title = cookValJson[item].title;
        let img = cookValJson[item].postimage;
        let link = cookValJson[item].link;
        console.log(cookValJson[item].title);

        $("#favoriteListTab").append(makeFavoriteListItem(title, img, link));
    }
}

function makeFavoriteListItem(title, img, link) {
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
                        <a href="${link}">
                            <h4 class="mb-4">${title}</h4>
                        </a>
                    </div>
                </div>
            </div>
        </div>`;

    return item;
}
