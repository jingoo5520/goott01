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

    console.log(title, img, contentId);

    if (e.target.classList.contains("checked")) {
      let cookArr = document.cookie.split(";");
      console.log(cookArr);
      for (let i = 0; i < cookArr.length; i++) {
        let cookie = cookArr[i].trim();
        let cookName = cookie.split("=")[0];
        let index = cookie.indexOf("=");
        let cookValue = cookie.substring(index + 1);

        console.log(cookValue);
        // 여기서부터 수정
        // cookValJson = JSON.parse(cookValue);
        // console.log(cookValJson);
      }
      // 쿠키 제거
      // let now = new Date();
      // cookie = `${contentId}=tourist-destination-detail.html?contentid=${contentId};expires=${now.toUTCString()}`;
      // document.cookie = cookie;
    } else {
      let isExistCookie = false;
      // 쿠키 추가

      // 기존 쿠키 데이터 가져오기
      let cookArr = document.cookie.split(";");

      let cookValueStr;
      let cookValJson;

      for (let i = 0; i < cookArr.length; i++) {
        let cookie = cookArr[i].trim();
        let cookName = cookie.split("=")[0];
        let cookValue = cookie.split("=")[1] + "=" + cookie.split("=")[2];

        if (cookName == "favorite_post") {
          isExistCookie = true;
          cookValueStr = cookValue;
          // console.log(cookValueStr);

          cookValJson = JSON.parse(cookValueStr);
          // console.log(cookValJson);
        }
        if (cookArr[i].split("=")[0].trim() == "favorite_post") {
          console.log(
            cookArr[i]
              .split("=")[0]
              .trim()
              .substring(("favorite_post" + "=").length)
          );
        }
        console.log(cookArr[i].split("=")[0].trim());
      }

      // 쿠키가 이미 있다면
      if (isExistCookie) {
        console.log("쿠키있음");
        cookValJson[contentId] = {
          postimage: img,
          title: title,
          link: `tourist-destination-detail.html?contentid=${contentId}`,
        };

        // console.log(`favorite_post=${JSON.stringify(cookValJson)}`);
        document.cookie = `favorite_post=${JSON.stringify(cookValJson)}`;
      } else {
        // 쿠키없음
        console.log("쿠키음슴");
        let temp = {
          postimage: img,
          title: title,
          link: `tourist-destination-detail.html?contentid=${contentId}`,
        };

        document.cookie = `favorite_post = {"${contentId}": ${JSON.stringify(
          temp
        )}}`;
      }
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
  let isExistCookie = false;
  // 모든 쿠키 가져오기

  // 기존 쿠키 데이터 가져오기
  let cookArr = document.cookie.split(";");
  let cookValJson;

  let cookJsonArr;

  for (let i = 0; i < cookArr.length; i++) {
    let cookie = cookArr[i].trim();
    let cookName = cookie.split("=")[0];
    let cookValue = cookie.substring(cookie.indexOf("=") + 1);
    console.log(cookValue);

    // console.log(cookValue);

    if (cookName == "favorite_post") {
      isExistCookie = true;

      cookValJson = JSON.parse(cookValue);
      console.log(cookValJson);
    }
  }

  let cookieNames = [];
  //쿠키가 있다면
  if (isExistCookie) {
    console.log("쿠키있음");
    cookieNames = Object.keys(cookValJson);
  }

  for (let i = 0; i < list.item.length; i++) {
    let title = list.item[i].title;
    let img =
      list.item[i].firstimage != ""
        ? list.item[i].firstimage
        : "img/kjg/noimg.png";
    let contentId = list.item[i].contentid;

    let isFavorite = cookieNames.includes(contentId);
    console.log(isFavorite);

    //[1] == contentId ? true : false;
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
