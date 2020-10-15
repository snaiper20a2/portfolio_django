/*---------------------------------
[Master Javascript]

Project: Travel

-------------------------------------------------------------------*/
(function ($) {
    "use strict";
    var Travel = {
        initialised: false,
        version: 1.0,
        mobile: false,
        init: function () {
            if (!this.initialised) {
                this.initialised = true;
            } else {
                return;
            }
            /*-------------- Travel Functions Calling ---------------------------------------------------
            ------------------------------------------------------------------------------------------------*/
            this.RTL();
            this.Homeslider();
            this.Responsive_menu();
            this.Dropdown_Menu();
            this.video_popup();
            this.Datepicker();
            this.Selectpicker();
            this.Testimonial();
            this.Bradscrousel();
            this.BookingSlider();
            this.countint_up();
            this.Gallery();
            this.wowanimation();
            this.MailFunction();
        },
        /*-------------- Travel Functions definition ---------------------------------------------------
        ---------------------------------------------------------------------------------------------------*/
        RTL: function () {
            // On Right-to-left(RTL) add class
            var rtl_attr = $("html").attr('dir');
            if (rtl_attr) {
                $('html').find('body').addClass("rtl");
            }
        },
        //home slider
        Homeslider: function () {
            if ($(".tr_home_slider").length > 0) {
                $('.tr_home_slider').owlCarousel({
                    loop: true,
                    margin: 0,
                    items: 1,
                    autoplay: true,
                    autoplayTimeout: 3000,
                    autoplaySpeed: 1500,
                    smartSpeed: 1500,
                    animateIn: "slidein",
                    animateOut: "zoom_out",
                    dots: false,
                    nav: true,
                    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
                    responsiveClass: true,
                    responsive: {
                        0: {
                            items: 1
                        },
                        600: {
                            items: 1
                        },
                        768: {
                            items: 1
                        },
                        1000: {
                            items: 1
                        }
                    }
                })
            }
        },
        //Responsive Menu
        Responsive_menu: function () {
            $(".nav_toggle").on('click', function () {
                $(this).toggleClass("toggle_open");
                $(".header_right_menu").toggleClass("menu_open");
            });
        },
        //dropdown menu
        Dropdown_Menu: function () {
            if ($(window).width() <= 767) {
                $(".header_right_menu ul li ul.sub-menu").parents("li").addClass("dropdown_toggle");
                $(".dropdown_toggle").append("<span class='caret_down'></span>");
                $(".caret_down").on("click", function () {
                    $(this).toggleClass("caret_up");
                    $(this).prev("ul").slideToggle();
                    //$('.caret_down').not(this).prev("ul").slideUp();
                    //$('.caret_down').not(this).removeClass("caret_up");
                });
            } else {

            }
        },
        //video popup
        video_popup: function () {
            $(".vdopopup_btn").on("click", function () {
                $(this).next(".video_overlay").addClass('popup_zoom');
            });
            $(".vdo_close").on("click", function () {
                $(this).parents(".video_overlay").removeClass('popup_zoom');
            });
            //popup close click outer
            $('.video_overlay').click(function (e) {
                $(this).removeClass("popup_zoom");
            });
            $('.video_inner').click(function (e) {
                return false;
            });
            //playvideo on click
            $('.vdopopup_btn').on('click', function (ev) {
                var path = $(".video_overlay iframe").attr("src");
                var path2 = path + "?autoplay=1";
                $(".video_overlay iframe").attr('src', path2);
            });
        },
        //Datepicker
        Datepicker: function () {
            if ($(".datepicker").length > 0) {
                $(".datepicker").datepicker({
                    dateFormat: "dd-mm-yy"
                });
            }
        },
        //selectpicker
        Selectpicker: function () {
            $("select").wrap("<div class='select_wrapper'></div>");
            $(".select_wrapper select").each(function () {
                $(this).after("<span class='select_holder'></span>");
            });
            $(".select_wrapper select").change(function () {
                var selectedOption = $(this).find(":selected").text();
                $(this).next(".select_holder").text(selectedOption);
            }).trigger('change');
        },
        //Testimonialcrousel
        Testimonial: function () {
            if ($(".tr_testimonial_crousel").length > 0) {
                $('.tr_testimonial_crousel').owlCarousel({
                    loop: true,
                    margin: 5,
                    items: 1,
                    autoplay: false,
                    autoplayTimeout: 2500,
                    autoplaySpeed: 1500,
                    smartSpeed: 1500,
                    animateIn: "zoom",
                    animateOut: "zoom_out",
                    responsiveClass: true,
                    responsive: {
                        0: {
                            items: 1
                        },
                        600: {
                            items: 1
                        },
                        768: {
                            items: 1
                        }
                    }
                })
            }
        },
        //Bradscrousel
        Bradscrousel: function () {
            if ($(".brands_crousel").length > 0) {
                $('.brands_crousel').owlCarousel({
                    loop: true,
                    margin: 5,
                    items: 5,
                    autoplay: true,
                    autoplayTimeout: 2000,
                    autoplaySpeed: 1000,
                    smartSpeed: 1500,
                    dots: false,
                    nav: true,
                    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
                    responsiveClass: true,
                    responsive: {
                        0: {
                            items: 1
                        },
                        480: {
                            items: 1
                        },
                        600: {
                            items: 2
                        },
                        768: {
                            items: 3
                        },
                        1000: {
                            items: 4
                        },
                        1200: {
                            items: 5
                        }
                    }
                })
            }
        },
        //BookingSlider
        BookingSlider: function () {
            if ($(".booking_slider").length > 0) {
                $('.booking_slider').owlCarousel({
                    loop: true,
                    margin: 0,
                    items: 0,
                    singleItem: true,
                    autoplay: true,
                    autoplayTimeout: 2000,
                    autoplaySpeed: 1000,
                    smartSpeed: 1500,
                    dots: false,
                    nav: true,
                    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
                    responsiveClass: true,
                    responsive: {
                        0: {
                            items: 1
                        },
                        480: {
                            items: 1
                        },
                        768: {
                            items: 1
                        },
                    }
                })
            }
        },
        //counter
        countint_up: function () {
            if ($('.block_counter').length > 0) {
                $('.block_counter').appear(function () {
                    $('.block_counter').each(count);

                    function count(options) {
                        var $this = $(this);
                        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
                        $this.countTo(options);
                    }
                });
            }
        },
        //Gallery
        Gallery: function () {
            //main gallery of gallery page
            if ($('.gallery_main').length > 0) {
                $('.gallery_main').magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    tLoading: '../images/loader.gif',
                    removalDelay: 300,
                    mainClass: 'image_zoom',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                    },
                    image: {
                        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                        titleSrc: function (item) {
                            return item.el.attr('title') + '<small></small>';
                        }
                    }
                });
            }
            //sidebar gallery of blog
            if ($('.widget_tour_gallery').length > 0) {
                $('.widget_tour_gallery').magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    tLoading: '../images/loader.gif',
                    removalDelay: 300,
                    mainClass: 'image_zoom',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                    },
                    image: {
                        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                        titleSrc: function (item) {
                            return item.el.attr('title') + '<small></small>';
                        }
                    }
                });
            }
        },
        //animation on page scroll
        wowanimation: function () {
            var wow = new WOW({
                boxClass: 'wow',      // default
                animateClass: 'animated', // default
                offset: 0,          // default
                mobile: true,       // default
                live: true        // default
            })
            wow.init();
        },
        //contact form
        MailFunction: function () {
            $('.contact_sub').on('click', function () {
                var name = $('#c_name').val();
                var email = $('#c_email').val();
                var phone = $('#c_phone').val();
                var u_msg = $('#c_message').val();
                $.ajax({
                    type: "POST",
                    url: "contactmail.php",
                    data: {
                        'username': name,
                        'useremail': email,
                        'userphone': phone,
                        'usermsg': u_msg,
                    },
                    success: function (msg) {
                        var full_msg = msg.split("#");
                        if (full_msg[0] == '1') {
                            $('#c_name').val("");
                            $('#c_email').val("");
                            $('#c_phone').val("");
                            $('#c_message').val("");
                            $('#err_msg').html(full_msg[1]);
                        } else {
                            $('#c_name').val(name);
                            $('#c_email').val(email);
                            $('#c_phone').val(phone);
                            $('#c_message').val(u_msg);
                            $('#err_msg').html(full_msg[1]);
                        }
                    }
                });
            });
        },

    };

    Travel.init();
    //window load function
    $(window).load(function () {
        $(".preloader").fadeOut("slow").delay("600");
    });
    //window scroll
    // $(window).bind("scroll", function(){
    // if ($(this).scrollTop() > 100) {
    // $(".ad_header_section").addClass("fixed_menu");
    // }
    // else{
    // $(".ad_header_section").removeClass("fixed_menu");
    // }
    // });

})(jQuery);

var data = [
    {
        username: "Brad Frost", // Key "username" means that Magnific Popup will look for an element with class "mfp-username" in markup and will replace its inner HTML with the value.

        userWebsite_href: 'http://www.bradfrostweb.com', // Key "userWebsite_href" means that Magnific Popup will look for an element with class "mfp-userWebsite" and will change its "href" attribute. Instead of ending "href" you may put any other attribute.

        userAvatarUrl_img: 'https://si0.twimg.com/profile_images/1561258552/brad_frost_bigger.png', // Prefix "_img" is special. With it Magnific Popup finds an  element "userAvatarUrl" and replaces it completely with image tag.

        userLocation: 'Pittsburgh, PA'
    },

    {
        username: "Paul Irish",
        userWebsite_href: 'http://paulirish.com',
        userAvatarUrl_img: 'https://si0.twimg.com/profile_images/2910976341/7d972c32f3882f715ff84a67685e6acf_bigger.jpeg',
        userLocation: 'San Francisco'

    },

    {
        username: "Chris Coyier",
        userWebsite_href: 'https://css-tricks.com',
        userAvatarUrl_img: 'https://si0.twimg.com/profile_images/1668225011/Gravatar2_bigger.png',
        userLocation: 'Palo Alto, California'
    }
];


$('.gallery').each(function () { // the containers for all your galleries
    $(this).magnificPopup({
        key: 'my-popup',
        items: data,
        type: 'inline',
        inline: {
            // Define markup. Class names should match key names.
            markup: '<div class="white-popup"><div class="mfp-close"></div>' +
                '</div>'
        },
        gallery: {
            enabled: true
        },
        callbacks: {
            markupParse: function (template, values, item) {
                // optionally apply your own logic - modify "template" element based on data in "values"
                // console.log('Parsing:', template, values, item);
            }
        }
    });
});
