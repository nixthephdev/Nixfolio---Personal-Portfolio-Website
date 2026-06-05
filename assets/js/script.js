/*-----------------------------------------------------------------------------------
    Template Name: Qomfort - Hotel Booking HTML Template
    Template URI: https://demo.webtend.net/html/qomfort/
    Author: WebTend
    Author URI:  https://webtend.net/
    Version: 1.0

    Note: This is Main JS File.
-----------------------------------------------------------------------------------
	CSS INDEX
	===================
    ## Header Style
    ## Dropdown menu
    ## Submenu Dropdown
    ## Menu Hidden Sidebar
    ## OnePage Nav
    ## Testimonials
    ## Project Filter
    ## Fact Counter
    ## Scroll to Top
    ## Nice Select
    ## Preloader
    ## Blog Standard
-----------------------------------------------------------------------------------*/

(function ($) {

    "use strict";

    $(document).ready(function () {

        // ## Header Style and Scroll to Top
        function headerStyle() {
            if ($('.main-header').length) {
                var windowpos = $(window).scrollTop();
                var siteHeader = $('.main-header');
                var scrollLink = $('.scroll-top');
                if (windowpos >= 250) {
                    siteHeader.addClass('fixed-header');
                    scrollLink.fadeIn(300);
                } else {
                    siteHeader.removeClass('fixed-header');
                    scrollLink.fadeOut(300);
                }
            }
        }
        headerStyle();
        
        
        // ## Dropdown menu
        var mobileWidth = 992;
        var navcollapse = $('.navigation li.dropdown');

        navcollapse.hover(function () {
            if ($(window).innerWidth() >= mobileWidth) {
                $(this).children('ul').stop(true, false, true).slideToggle(300);
                $(this).children('.megamenu').stop(true, false, true).slideToggle(300);
            }
        });
        
        // ## Submenu Dropdown Toggle
        if ($('.main-header .navigation li.dropdown ul').length) {
            $('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fas fa-chevron-down"></span></div>');

            //Dropdown Button
            $('.main-header .navigation li.dropdown .dropdown-btn').on('click', function () {
                $(this).prev('ul').slideToggle(500);
                $(this).prev('.megamenu').slideToggle(800);
            });
            
            //Disable dropdown parent link
            $('.navigation li.dropdown > a').on('click', function (e) {
                e.preventDefault();
            });
        }
        
        // Submenu Dropdown Toggle
        if ($('.main-header .main-menu').length) {
            $('.main-header .main-menu .navbar-toggle').click(function () {
                $(this).prev().prev().next().next().children('li.dropdown').hide();
            });
        }
        
        
         
        // ## Menu Hidden Sidebar Content Toggle
        if($('.menu-sidebar').length){
            //Show Form
            $('.menu-sidebar').on('click', function(e) {
                e.preventDefault();
                $('body').toggleClass('side-content-visible');
            });
            //Hide Form
            $('.hidden-bar .inner-box .cross-icon,.form-back-drop,.close-menu').on('click', function(e) {
                e.preventDefault();
                $('body').removeClass('side-content-visible');
            });
            //Dropdown Menu
            $('.fullscreen-menu .navigation li.dropdown > a').on('click', function() {
                $(this).next('ul').slideToggle(500);
            });
        }
        
        
        
        // ## OnePage Nav Scroll
        $(".onepage a").on('click', function(e){
            e.preventDefault();
            var hash = this.hash;
            var position = $(hash).offset().top;
            $("html").animate({
                scrollTop : position
            },1000);
        });
        
        
        // ## Testimonials Active
        if ($('.testimonials-wrap').length) {
            $('.testimonials-wrap').slick({
                dots: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 2000,
                arrows: true,
                speed: 1000,
                focusOnSelect: false,
                prevArrow: '.testimonial-prev',
                nextArrow: '.testimonial-next',
                slidesToShow: 2,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });
        }
        
        
        
        // ## Project Filter
        $(".project-filter li").on('click', function () {
            $(".project-filter li").removeClass("current");
            $(this).addClass("current");

            var selector = $(this).attr('data-filter');
            $('.project-masonry-active').imagesLoaded(function () {
                $(".project-masonry-active").isotope({
                    itemSelector: '.item',
                    filter: selector,
                    masonry: {
                        columnWidth: '.item'
                    }
                });
            });

        });
        
        
        
         /* ## Fact Counter + Text Count - Our Success */
        if ($('.counter-text-wrap').length) {
            $('.counter-text-wrap').appear(function () {
                
                var $t = $(this),
                    n = $t.find(".count-text").attr("data-stop"),
                    r = parseInt($t.find(".count-text").attr("data-speed"), 10);

                if (!$t.hasClass("counted")) {
                    $t.addClass("counted");
                    $({
                        countNum: $t.find(".count-text").text()
                    }).animate({
                        countNum: n
                    }, {
                        duration: r,
                        easing: "linear",
                        step: function () {
                            $t.find(".count-text").text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $t.find(".count-text").text(this.countNum);
                        }
                    });
                }

            }, {
                accY: 0
            });
        }
        

        
        // ## Scroll to Top
        if ($('.scroll-to-target').length) {
            $(".scroll-to-target").on('click', function () {
                var target = $(this).attr('data-target');
                // animate
                $('html, body').animate({
                    scrollTop: $(target).offset().top
                }, 1000);

            });
        }
        
        
        // ## Nice Select
        if (typeof $.fn.niceSelect !== 'undefined') {
            $('select').niceSelect();
        }
        
        
        // ## WOW Animation
        if ($('.wow').length) {
            var wow = new WOW({
                boxClass: 'wow', // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 0, // distance to the element when triggering the animation (default is 0)
                mobile: false, // trigger animations on mobile devices (default is true)
                live: true // act on asynchronously loaded content (default is true)
            });
            wow.init();
        }
        
 
    });
    
    
    /* ==========================================================================
       When document is resize, do
       ========================================================================== */

    $(window).on('resize', function () {
        var mobileWidth = 992;
        var navcollapse = $('.navigation li.dropdown');
        navcollapse.children('ul').hide();
        navcollapse.children('.megamenu').hide();

    });


    /* ==========================================================================
       When document is scroll, do
       ========================================================================== */

    $(window).on('scroll', function () {

        // ## Header Style and Scroll to Top
        function headerStyle() {
            if ($('.main-header').length) {
                var windowpos = $(window).scrollTop();
                var siteHeader = $('.main-header');
                var scrollLink = $('.scroll-top');
                if (windowpos >= 100) {
                    siteHeader.addClass('fixed-header');
                    scrollLink.fadeIn(300);
                } else {
                    siteHeader.removeClass('fixed-header');
                    scrollLink.fadeOut(300);
                }
            }
        }

        headerStyle();

    });

    /* ==========================================================================
       When document is loaded, do
       ========================================================================== */

    // Preloader: hide on DOMContentLoaded (not window.load) so FCP is not blocked by image downloads.
    // Hard cap at 800ms so a slow asset can never stall it.
    (function () {
        function hidePreloader() {
            var $pre = $('.preloader');
            if ($pre.length) $pre.stop(true).fadeOut(400);
        }
        $(document).ready(hidePreloader);
        setTimeout(hidePreloader, 800);
    }());

    $(window).on('load', function () {

        // ## Project Filtering
        
        
        // ## Project Filtering
        if ($('.project-masonry-active').length) {
            $(this).imagesLoaded(function () {
                $('.project-masonry-active').isotope({
                    // options
                    itemSelector: '.item',
                });
            });
        }
          
        
        // ## Blog Standard
        if ($('.blog-standard-wrap').length) {
            $(this).imagesLoaded(function () {
                $('.blog-standard-wrap').isotope({
                    // options
                    itemSelector: '.item',
                });
            });
        }
          
        
    });

    // Snow Effect Initialization
    (function() {
        const canvas = document.getElementById('snow-canvas');
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext('2d');

        let snowflakes = [];
        const flakesCount = 100; // Number of snowflakes

        // Set canvas size to window size
        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        setCanvasSize();

        // Snowflake constructor
        function Snowflake(x, y, r, d) {
            this.x = x;     // X-coordinate
            this.y = y;     // Y-coordinate
            this.r = r;     // Radius
            this.d = d;     // Density
        }

        // Update snowflake position
        Snowflake.prototype.update = function() {
            this.y += Math.pow(this.d, 2) + 1;
            this.x += Math.sin(this.y * 0.01);

            // Reset snowflake to top if it goes below the canvas
            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        };

        // Draw snowflake
        Snowflake.prototype.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            ctx.fillStyle = 'white';
            ctx.fill();
        };

        // Initialize snowflakes
        function init() {
            snowflakes = [];
            for (let i = 0; i < flakesCount; i++) {
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                let r = Math.random() * 3 + 1; // Radius between 1 and 4
                let d = Math.random() * 2 + 1; // Density between 1 and 3

                snowflakes.push(new Snowflake(x, y, r, d));
            }
        }

        // Animate snowflakes
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let flake of snowflakes) {
                flake.update();
                flake.draw();
            }
            requestAnimationFrame(animate);
        }

        // Handle window resizing
        window.addEventListener('resize', function() {
            setCanvasSize();
            init();
        });

        // Initialize and start animation
        init();
        animate();

    })();

})(window.jQuery);
