const apiKey =
    "6gNmKhyEs%2BsCMNSLmsp%2FQTRwU3aROgyt%2F84W0LeYg0i%2BIX98xBhh6%2F1teGtm431ojGRZR4cEjNVelra2oXxPmA%3D%3D";

const areaBasedContentsUrl =
    "http://apis.data.go.kr/B551011/KorService1/areaBasedList1?";

const searchedContentUrl =
    "http://apis.data.go.kr/B551011/KorService1/searchKeyword1?";

const commonInfoUrl =
    "http://apis.data.go.kr/B551011/KorService1/detailCommon1?";

const moreImagesUrl =
    "http://apis.data.go.kr/B551011/KorService1/detailImage1?";

const detailInfoUrl =
    "http://apis.data.go.kr/B551011/KorService1/detailIntro1?";

const areaCodeUrl = "http://apis.data.go.kr/B551011/KorService1/areaCode1?";

const kakaoKey = "7f8e1dea7a4541ed9a2fdba8613d1306";

(function ($) {})(jQuery);

// ---------------------------------------------------------------------------------------

// ajax 요청
function ajaxRequest(baseUrl, params, successCallback) {
    let url = `${baseUrl}`;

    for (key in params) {
        url += `${key}=${params[key]}&`;
    }

    $.ajax({
        url: url, // url
        type: "get", // method
        dataType: "json", // dataType
        success: successCallback, // 통신 성공
        error: function () {}, // 통신 실패
        complete: function () {}, // 통신 완료
    });
}

// favorite_post 쿠키 가져오기
function getFavCookie() {
    let cookArr = document.cookie.split(";");

    for (let i = 0; i < cookArr.length; i++) {
        let cookie = cookArr[i].trim();

        let cookName = cookie.split("=")[0];
        let cookValue = cookie.substring(cookie.indexOf("=") + 1);

        if (cookName == "favorite_post") {
            cookValJson = JSON.parse(cookValue);
            return cookValJson;
        }
    }

    return null;
}

// 찜 아이템 추가
function addFavItem(cookValJson, contentId, title, img) {
    let cookie;
    // 아이템이 없는 경우

    if (cookValJson == null) {
        cookie = {
            [contentId]: {
                postimage: img,
                title: title,
                link: `tourist-destination-detail.html?contentid=${contentId}`,
            },
        };

        let cookieStr = JSON.stringify(cookie);

        document.cookie = `favorite_post=${cookieStr}`;
    } else {
        cookValJson[contentId] = {
            postimage: img,
            title: title,
            link: `tourist-destination-detail.html?contentid=${contentId}`,
        };

        let cookieStr = JSON.stringify(cookValJson);

        document.cookie = `favorite_post=${cookieStr}`;
    }
}

// 찜 아이템 삭제
function delFavItem(cookValJson, contentId) {
    if (contentId in cookValJson) {
        delete cookValJson[contentId];

        let cookieStr = JSON.stringify(cookValJson);

        document.cookie = `favorite_post=${cookieStr}`;
    }
}

function getFooter() {
    let footer = `<div class="container-fluid footer bg-dark text-body py-5">
            <div class="container py-5">
                <div class="row g-5">
                    <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="footer-item d-flex flex-column">
                            <h4 class="mb-4 text-white">Members</h4>
                            <a href="#"
                                ><i class="fas fa-angle-right me-2"></i> Junho
                                Jang</a
                            >
                            <a href=""
                                ><i class="fas fa-angle-right me-2"></i> Jingu
                                Kang
                            </a>
                            <a href=""
                                ><i class="fas fa-angle-right me-2"></i> Junbeom
                                Kim</a
                            >
                            <a href=""
                                ><i class="fas fa-angle-right me-2"></i>
                                Minseong Kim
                            </a>
                            <a href=""
                                ><i class="fas fa-angle-right me-2"></i>
                                Hyunmyung Lee
                            </a>
                            <a href=""
                                ><i class="fas fa-angle-right me-2"></i>
                                Jeongheon Seok
                            </a>
                            <a href=""
                                ><i class="fas fa-angle-right me-2"></i> Yongho
                                Shin
                            </a>
                            <a href=""
                                ><i class="fas fa-angle-right me-2"></i> Heesung
                                Yoon</a
                            >
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="footer-item d-flex flex-column">
                            <h4 class="mb-4 text-white">Project</h4>
                            <a href=""
                                ><i class="fas fa-angle-right me-2"></i> 1st
                                mini Project</a
                            >
                            <a href=""
                                ><i class="fas fa-angle-right me-2"></i>
                                group1</a
                            >
                            <a href=""
                                ><i class="fas fa-angle-right me-2"></i> to Jul.
                                5, 2024<sup>th</sup></a
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    return footer;
}

function getCopyright() {
    let copyright = `<div class="container-fluid copyright py-4">
            <div class="container">
                <div class="row g-4 align-items-center">
                    <div class="col-md-4 text-center text-md-start mb-md-0">
                        <span class="text-body"
                            ><a href="#"
                                ><i class="fas fa-copyright text-light me-2"></i
                                >1st mini Project-group1</a
                            >, All right reserved.</span
                        >
                    </div>
                    <div class="col-md-4 text-center">
                        <div
                            class="d-flex align-items-center justify-content-center"
                        >
                            <a
                                href="#"
                                class="btn-hover-color btn-square text-white me-2"
                                ><i class="fab fa-facebook-f"></i
                            ></a>
                            <a
                                href="#"
                                class="btn-hover-color btn-square text-white me-2"
                                ><i class="fab fa-twitter"></i
                            ></a>
                            <a
                                href="#"
                                class="btn-hover-color btn-square text-white me-2"
                                ><i class="fab fa-instagram"></i
                            ></a>
                            <a
                                href="#"
                                class="btn-hover-color btn-square text-white me-2"
                                ><i class="fab fa-pinterest"></i
                            ></a>
                            <a
                                href="#"
                                class="btn-hover-color btn-square text-white me-0"
                                ><i class="fab fa-linkedin-in"></i
                            ></a>
                        </div>
                    </div>
                    <div class="col-md-4 text-center text-md-end text-body">
                        <!--/*** This template is free as long as you keep the below author’s credit link/attribution link/backlink. ***/-->
                        <!--/*** If you'd like to use the template without the below author’s credit link/attribution link/backlink, ***/-->
                        <!--/*** you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". ***/-->
                        Designed By
                        <a class="border-bottom" href="https://htmlcodex.com"
                            >HTML Codex</a
                        >
                        Distributed By
                        <a class="border-bottom" href="https://themewagon.com"
                            >ThemeWagon</a
                        >
                    </div>
                </div>
            </div>
        </div>`;

    return copyright;
}

function getNavbar() {
    let navbar = `<div class="container-fluid fixed-top px-0">
            <div class="container px-0">
                <div class="topbar">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-md-8"></div>
                        <div class="col-md-4">
                            <div
                                class="topbar-icon d-flex align-items-center justify-content-end"
                            >
                                <a href="#" class="btn-square text-white me-2"
                                    ><i class="fab fa-facebook-f"></i
                                ></a>
                                <a href="#" class="btn-square text-white me-2"
                                    ><i class="fab fa-twitter"></i
                                ></a>
                                <a href="#" class="btn-square text-white me-2"
                                    ><i class="fab fa-instagram"></i
                                ></a>
                                <a href="#" class="btn-square text-white me-2"
                                    ><i class="fab fa-pinterest"></i
                                ></a>
                                <a href="#" class="btn-square text-white me-0"
                                    ><i class="fab fa-linkedin-in"></i
                                ></a>
                            </div>
                        </div>
                    </div>
                </div>
                <nav class="navbar navbar-light bg-light navbar-expand-xl">
                    <a href="index.html" class="navbar-brand ms-3">
                        <h1 class="text-primary display-5">Goott01</h1>
                    </a>
                    <button
                        class="navbar-toggler py-2 px-3 me-3"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                    >
                        <span class="fa fa-bars text-primary"></span>
                    </button>
                    <div
                        class="collapse navbar-collapse bg-light"
                        id="navbarCollapse"
                    >
                        <div class="navbar-nav ms-auto">
                            <a href="index.html" class="nav-item nav-link"
                                >Home</a
                            >

                            <div class="nav-item dropdown">
                                <a
                                    href="#"
                                    class="nav-link dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    >Categories</a
                                >
                                <div
                                    class="dropdown-menu m-0 bg-secondary rounded-0"
                                >
                                    <a href="tourist-destination-main.html" class="dropdown-item"
                                        >tourist-destination</a
                                    >
                                    <a href="cultural-facilities-main.html" class="dropdown-item"
                                        >cultural-facilities</a
                                    >
                                    <a href="festival-main.html" class="dropdown-item"
                                        >festival</a
                                    >
                                    <a
                                        href="travel-course-main.html"
                                        class="dropdown-item"
                                        >travel-course</a
                                    >
                                    <a
                                        href="leisure-sports-main.html"
                                        class="dropdown-item"
                                        >leisure-sports</a
                                    >
                                    <a
                                        href="lodgment-main.html"
                                        class="dropdown-item"
                                        >lodgment</a
                                    >
                                    <a
                                        href="shopping-main.html"
                                        class="dropdown-item"
                                        >shopping</a
                                    >
                                    <a
                                        href="restaurant-main.html"
                                        class="dropdown-item"
                                        >restaurant</a
                                    >
                                </div>
                            </div>
                        </div>
                        <div
                            class="d-flex align-items-center flex-nowrap pt-xl-0"
                            style="margin-left: 15px"
                        >
                            <a
                                href="favorite.html"
                                class="btn-hover-bg btn btn-primary text-white py-2 px-4 me-3"
                                >favorite</a
                            >
                        </div>
                    </div>
                </nav>
            </div>
        </div>`;

    return navbar;
}

function getHeader(title, links) {
    let header = `
    <div class="container-fluid bg-breadcrumb bg-dark">
        <div class="container text-center py-5" style="max-width: 900px">
            <h3 class="text-white display-3 mb-4">${title}</h3>
            <p class="fs-5 mb-4 header-subtitle">
                    Help today because tomorrow you may be the one who needs
                    more helping!
            </p>
            <ol class="breadcrumb justify-content-center mb-0">`;

    for (link in links) {
        let key = link;
        let value = links[link];

        header += `<li class="breadcrumb-item">
                        <a href="${value}">${key}</a>
                    </li>`;
    }

    header += `</ol>
            </div>
    </div>`;

    return header;
}
