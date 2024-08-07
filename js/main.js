(function ($) {
    "use strict";

    $("#spinner").addClass("show");
    setTimeout(function () {
        $("#spinner").removeClass("show");
    }, 300);

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $(".fixed-top .container")
                .addClass("shadow-sm")
                .css("max-width", "100%");
        } else {
            $(".fixed-top .container")
                .removeClass("shadow-sm")
                .css("max-width", "85%");
        }
    });

    // Donation
    $(".progress").waypoint(
        function () {
            $(".progress-bar").each(function () {
                $(this).css("width", $(this).attr("aria-valuenow") + "%");
            });
        },
        { offset: "80%" }
    );

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000,
    });

    // Event carousel
    $(".event-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>',
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 1,
            },
            992: {
                items: 2,
            },
            1200: {
                items: 3,
            },
        },
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $(".back-to-top").fadeIn("slow");
        } else {
            $(".back-to-top").fadeOut("slow");
        }
    });

    // $(".back-to-top").click(function () {
    //     $("html, body").animate({ scrollTop: 0 }, 0, "easeInOutExpo");
    //     return false;
    // });
})(jQuery);
