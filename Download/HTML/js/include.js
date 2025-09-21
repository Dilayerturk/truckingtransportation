(jQuery)(function ($) {

    // MAIN NAVIGATION
    $('.nav .dropdown').hover(function () {
        $(this).find('> .dropdown-menu').slideDown(200);

    }, function () {
        $(this).find('> .dropdown-menu').fadeOut(200);
    });

    // RESPONSIVE NAVIGATION
    $(function () {
        $('#dl-menu').dlmenu({
            animationClasses: {
                classin: 'dl-animate-in-2',
                classout: 'dl-animate-out-2'
            }
        });
    });


    // SEARCH ANIMATION
    $('#header').on('click', '#search', function (e) {
        e.preventDefault();

        $(this).find('#m_search').slideDown(200).focus();
    });

    $('#m_search').focusout(function (e) {
        $(e.target).slideUp();
    });


    if (!is_touch_device()) {

        

        function set_static_header(position) {
            var header_height = $(".header-wrapper.header-transparent").height();
            if (position > header_height) {
                $(".header-wrapper.header-transparent").addClass("solid-color").find('.header-style01 .main-nav').css('margin-top', '10px');
                $(".header-wrapper.header-transparent02").addClass("solid-color").find('.header-style01 .main-nav').css('margin-top', '10px');
            } else {
                $(".header-wrapper.header-transparent").removeClass("solid-color").find('.header-style01 .main-nav').css('margin-top', '35px');
                $(".header-wrapper.header-transparent02").removeClass("solid-color").find('.header-style01 .main-nav').css('margin-top', '35px');
            }

            var header_height = $(".header-style02").height();
            var top_bar_height = $('#top-bar-wrapper').height();
            if (position > header_height) {

                $('.header-wrapper').css(
                        'top', -top_bar_height - 20
                        );
            } else {
                $('.header-wrapper').css('top', 0);
            }

            var header_height02 = $(".header-style03").height();
            if (position > header_height02) {
                $('.header-wrapper.style03').css(
                        'top', 0
                        );
            } else {
                $('.header-wrapper.style03').css('top', 0);
            }
        }
		
		(function () {
            var window_y = $(document).scrollTop();
            if (window_y > 0) {
                set_static_header(1);
            }
        })();

        $(window).scroll(function () {
            var position = $(this).scrollTop();
            set_static_header(position);
        });

        var headerWwrapperHeight = $('.header-wrapper').height();
        $('.header-wrapper').next().css('margin-top', headerWwrapperHeight);
    }


    // CONTENT TABS
    (function () {
        $('.tabs').each(function () {
            var $tabLis = $(this).find('li');
            var $tabContent = $(this).next('.tab-content-wrap').find('.tab-content');

            $tabContent.hide();
            $tabLis.first().addClass('active').show();
            $tabContent.first().show();
        });

        $('.tabs').on('click', 'li', function (e) {
            var $this = $(this);
            var parentUL = $this.parent();
            var tabContent = parentUL.next('.tab-content-wrap');

            parentUL.children().removeClass('active');
            $this.addClass('active');

            tabContent.find('.tab-content').hide();
            var showById = $($this.find('a').attr('href'));
            tabContent.find(showById).fadeIn();

            e.preventDefault();
        });
    })();

    //ACCORDION
    (function () {
        'use strict';
        $('.accordion').on('click', '.title', function (event) {
            event.preventDefault();
            $(this).siblings('.accordion .active').next().slideUp('normal');
            $(this).siblings('.accordion .title').removeClass("active");

            if ($(this).next().is(':hidden') === true) {
                $(this).next().slideDown('normal');
                $(this).addClass("active");
            }
        });
        $('.accordion .content').hide();
        $('.accordion .active').next().slideDown('normal');
    })();


    // SCROLL TO TOP 
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-up').fadeIn();
        } else {
            $('.scroll-up').fadeOut();
        }
    });

    $('.scroll-up').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });


    // NEWSLETTER FORM AJAX SUBMIT
    $('.newsletter .submit').on('click', function (event) {
        event.preventDefault();
        var email = $(this).siblings('.email').val();
        var form_data = new Array({'Email': email});
        $.ajax({
            type: 'POST',
            url: "contact.php",
            data: ({'action': 'newsletter', 'form_data': form_data})
        }).done(function (data) {
            alert(data);
        });
    });


    // function to check is user is on touch device
    if (!is_touch_device()) {
        // ANIMATION FOR CONTENT
        $.stellar({
            horizontalOffset: 0,
            horizontalScrolling: false
        });

        // ANIMATED CONTENT
        if ($(".animated")[0]) {
            jQuery('.animated').css('opacity', '0');
        }

        var currentRow = -1;
        var counter = 1;

        $('.triggerAnimation').waypoint(function () {
            var $this = $(this);
            var rowIndex = $('.row').index($(this).closest('.row'));
            if (rowIndex !== currentRow) {
                currentRow = rowIndex;
                $('.row').eq(rowIndex).find('.triggerAnimation').each(function (i, val) {
                    var element = $(this);
                    setTimeout(function () {
                        var animation = element.attr('data-animate');
                        element.css('opacity', '1');
                        element.addClass("animated " + animation);
                    }, (i * 250));
                });

            }

            //counter++;

        },
                {
                    offset: '70%',
                    triggerOnce: true
                }
        );

    }
    ;

    // function to check is user is on touch device
    function is_touch_device() {
        return Modernizr.touch;
    }

    // Placeholder fix for old browsers
    $('input, textarea').placeholder();

    // services gallery button positioning 
    var service_button_width = $('.hover-details').width() / 2;
    $('.hover-details').css('margin-left', -service_button_width);

    /*
     * SVG COLOR CHANGING
     */
    jQuery('img.svg-white').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });
    
    /*
     * SVG COLOR CHANGING
     */
    jQuery('.icon-container img').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });
});




(function ($) {

  function loadLanguage(lang) {
    $.getJSON("lang/" + lang + ".json", function (data) {
      $.each(data, function (key, value) {
        var el = $("#" + key);
        if (el.length) {
          el.html(value);
        }
      });
    });
  }

  // Dropdown'dan seçilen dili üstteki bayrağa yansıt
  function setMainFlag(lang) {
    var $container = $(".wpml-languages");
    var $main = $container.children("a").first(); // üstte görünen ana <a>
    var $match = $container.find(".wpml-lang-dropdown a[data-lang='" + lang + "']");

    if ($match.length) {
      var src = $match.find("img").attr("src");
      var alt = $match.find("img").attr("alt");
      $main.find("img").attr("src", src).attr("alt", alt);
    }
  }

  // Sayfa açıldığında
  var savedLang = localStorage.getItem("lang") || "en";
  loadLanguage(savedLang);
  setMainFlag(savedLang);

  // Dropdown tıklama
  $(".wpml-languages .wpml-lang-dropdown a").on("click", function (e) {
    e.preventDefault();
    var lang = $(this).data("lang");

    localStorage.setItem("lang", lang);
    loadLanguage(lang);
    setMainFlag(lang);
  });

})(jQuery);

function setMainFlag(lang) {
  var $container = $(".wpml-languages");
  var $main = $container.children("a").first(); // üstteki ana <a>
  var $mainImg = $main.find("img"); // sadece var olan img kullanılacak
  var $match = $container.find(".wpml-lang-dropdown a[data-lang='" + lang + "'] img");

  if ($match.length && $mainImg.length) {
    $mainImg.attr("src", $match.attr("src")).attr("alt", $match.attr("alt"));
  }
}



    
    