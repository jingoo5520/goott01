$(function () {
    console.log("favorite page");

    $(".breadcrumb").html(
        `<li class="breadcrumb-item"><a href="index.html">Home</a></li><li class="breadcrumb-item"><a href="#">Favoite</a></li>`
    );
});

function getFavoriteData() {
    // 쿠키 가져와서 데이터 뿌리기
}
