$(document).ready(function (document, window, setTimeout) {
  // Strings
  var _opacity_ = 'opacity';
  var _isActive_ = 'is-active';
  var _lazybeforeunveil_ = 'lazybeforeunveil';

  var preloader = '<div class="preloader"><img src="svg/loader.svg"></div>';

  /**
   * Buttons animation
   */
  var btnLine = '<div class="line"></div>';

  $('.btn_stroke-anim').each(function () {
    $(this).append(btnLine + btnLine + btnLine + btnLine + btnLine + btnLine);
  });

  /**
   * LogoAnimation
   */
  var logoEase = CustomEase.create('custom', 'M0,0 C0.114,0 0.283,0.051 0.318,0.094 0.394,0.186 0.406,0.388 0.436,0.526 0.474,0.708 0.584,0.876 0.64,0.928 0.677,0.963 0.698,1 1,1');
  var logoShapeCircle = document.getElementById('logo-circle');
  var logoShapeX = document.getElementById('logo-x');
  var mainLogo = $('.logo-main').eq(0);

  var logoAnimTimeline = new TimelineLite();

  mainLogo
    .on('mouseenter', function () {
      logoAnimTimeline
        .to(logoShapeCircle, .4, { morphSVG: logoShapeX, ease: logoEase }, '+=0')
    }).on('mouseleave', function () {
      logoAnimTimeline
        .to(logoShapeCircle, .4, { morphSVG: logoShapeCircle, ease: logoEase }, '+=0');
    });

    mainLogo.on('click', function () {
    logoAnimTimeline
      .to(logoShapeCircle, .5, { morphSVG: logoShapeCircle, ease: logoEase }, '+=.15')
      .call(function () {
        window.location = '/';
      })
    return false;
  });

  /**
   * Counter (animation)
   * Use: <div class="lazyload" data-counter data-expand="0">{number}<div>
   */
  function counterAnimation(element) {
    $(element)
      .prop('Counter', 0)
      .animate(
        {
          Counter: $(element).text()
        },
        {
          duration: 2500,
          easing: 'swing',
          step: function (now) {
            $(element).text(Math.ceil(now));
          }
        }
      );
  }

  $(document).on(_lazybeforeunveil_, function (e) {
    var element = $(e.target);
    var counter = element.data('counter');

    if (counter || counter === '') {
      counterAnimation(element);
    }
  });

  /**
   * Fancybox: basic options
   * doc: https://fancyapps.com/fancybox/3/docs/#options
   */
  $.extend(true, $.fancybox.defaults, {
    idleTime: 5,
    animationEffect: 'zoom',
    animationDuration: 366,
    transitionEffect: 'circular',
    transitionDuration: 550,
    lang: 'ru',
    i18n: {
      'ru': {
        CLOSE: 'Закрыть',
        NEXT: 'Далее',
        PREV: 'Назад',
        ERROR: 'Не удалось загрузить содержимое.<br>Пожалуйста, попробуйте позже.',
        PLAY_START: 'Запустить слайд-шоу',
        PLAY_STOP: 'Остановить слайд-шоу',
        FULL_SCREEN: 'На весь экран',
        THUMBS: 'Миниатюры',
        DOWNLOAD: 'Скачать',
        SHARE: 'Поделиться',
        ZOOM: 'Масштаб'
      }
    }
  });

  /**
   * MoreContent
   */
  var $aboutDescrs = $('.main-about-descr');
  var windowWidth = $(window).width();

  $aboutDescrs.each(function () {
    var $item = $(this);
    var breakpoint = $item.data('mrc-disaled-up');

    if (windowWidth >= breakpoint) {
      return;
    } else {
      $item.moreContent();
    }
  });

  /**
   * Swiper
   */
  $('.slider-revolver').each(function () {
    var node = this;
    var $slider = $(node);
    var swiper = new Swiper(node, {
      direction: 'vertical',
      slidesPerView: 5,
      loop: true,
      noSwiping: false,
      allowTouchMove: false,
      mousewheel: true,
      centeredSlides: true,
      containerModifierClass: 'slider-revolver-',
      wrapperClass: 'slider-revolver__wrapper',
      slideClass: 'slider-revolver__slide',
      // speed: 5000,
      autoplay: {
        delay: 2000,
        reverseDirection: true
      },
      watchSlidesVisibility: true,
      on: {
        slideChange: function () {
          var self = this;
          var $visibleSlides = $(self.visibleSlides);
          var $allSlides = $(self.slides);
  
          setTimeout(function () {
            $visibleSlides.eq(0).css('opacity', 0.1);
            $visibleSlides.eq(1).css('opacity', 0.35);
            $visibleSlides.eq(2).css('opacity', 1);
            $visibleSlides.eq(3).css('opacity', 0.35);
            $visibleSlides.eq(4).css('opacity', 0.1);
            $allSlides
              .filter(':not(.swiper-slide-visible)')
              .css('opacity', 0.1);
          }, 0);
        }
      }
    });

    if (swiper.params.autoplay.enabled) {
      $slider.on('mouseenter', function () {
        this.swiper.autoplay.stop();
      });
  
      $slider.on('mouseleave', function () {
        this.swiper.autoplay.start();
      });
    }
  });
  

  /**
   * Drawers
   */
  (function () {
    var $drawers = $('[data-drawer]');
    var $swithes = $('[data-drawerToggle]');

    $drawers.each(function (i, drawer) {
      var $drawer = $(drawer);
      var data = $drawer.data('drawer');
      var options = {};

      if (typeof data === 'string') {
        options.id = data;
      } else if (typeof data === 'object' && typeof data !== null) {
        options = data;
      }

      var sets = $.extend(
        true,
        {},
        {
          // Defaults...
          active: _isActive_,
          open: '',
          close: '',
          autoClose: true
        },
        options
      );

      var $switch = $('[data-drawerToggle="' + sets.id + '"');

      drawer.drawer = {
        open: function () {
          if (sets.autoClose) {
            $drawers.removeClass(sets.active);
            $swithes.removeClass(sets.active);
          }

          $switch.addClass(sets.active);
          $drawer.addClass(sets.active);
        },
        close: function () {
          $switch.removeClass(sets.active);
          $drawer.removeClass(sets.active);
        }
      };

      $('[data-drawerToggle="' + sets.id + '"').on('click', function () {
        var isOpen = $drawer.hasClass(_isActive_);
        if (isOpen) {
          drawer.drawer.close();
        } else {
          drawer.drawer.open();
        }
      });
    });
  })();

  /**
   * SliderCardsExtended
   */
  var sliderCardsExtended = $('.slider-cards-extended');

  function owlCheckClasses(slider) {
    var $slider = $(slider);
    var total = $slider.find('.owl-stage .owl-item.active').length;

    $slider.find('.owl-stage .owl-item').removeClass('firstActiveItem lastActiveItem');

    $slider.find('.owl-item .extended').removeClass('extended');
    $slider.find('.owl-stage .owl-item.active').each(function(index) {
        if (index === 0) {
            // this is the first one
            $(this).addClass('firstActiveItem');
            $(this).find('.card-article').addClass('extended');
        }
        if (index === total - 1 && total > 1) {
            // this is the last one
            $(this).addClass('lastActiveItem');
        }
    });
  }

  sliderCardsExtended
    .on('initialized.owl.carousel', function () {
      console.log('init')
      var slider = this;
      var $slider = $(slider);
      var $stage = $slider.find('.owl-stage');

      slider.owlReinit = function () {
        console.log('reinit')
        
        $slider.find('.extended').removeClass('extended')
        $slider.trigger('destroy.owl.carousel');
        $slider.owlCarousel(slider.owlOptions);
      }

      if ($(window).width() <= 768 ) return;

      $stage.css('width', 4900);
      setTimeout(function () {
        owlCheckClasses(slider);
      }, 350);
    })
    .on('translate.owl.carousel', function(event) {
      if ($(window).width() <= 768 ) return;

      var slider = this;
      var $slider = $(slider);

        setTimeout(function () {
          owlCheckClasses(slider);
        });
    });

  /**
   * SliderDefault
   */
  var $sliderDefault = $('[data-slider-default]');

  $sliderDefault.each(function (i, slider) {
    var $slider = $(slider);

    // Options
    var options = $.extend(
      true,
      {},
      {
        items: 1,
        nav: false,
        dots: false,
        lazyLoad: true,
        lazyLoadEager: 1,
        smartSpeed: 450,
        navText: [
          '<i class="aif-chevron-left"></i>',
          '<i class="aif-chevron-right"></i>'
        ],
        navContainerClass: 'slider-nav slider-nav_default',
        navClass: ['slider-nav__prev', 'slider-nav__next'],
        dotsClass: 'slider-dots slider-dots_default',
        dotClass: 'slider-dots__dot',
        ofi: {
          watchMQ: true
        },
      },
      $slider.data('owl')
    );

    $slider.on('changed.owl.carousel', function (e) {
      // Refresh OFI
      if (window.objectFitImages) {
        objectFitImages(null, options.ofi);
      }
    });

    $slider.on('load.owl.lazy', function (e) {
      var hasPreloader = $(e.element).data('preloader');

      if (hasPreloader || hasPreloader === '') {
        var $preloader = $(preloader);
  
        e.element.$preloader = $preloader;
        $(e.element).parent().append($preloader);
      }
    });

    $slider.on('loaded.owl.lazy', function (e) {
      var $preloader = e.element.$preloader;

      if ($preloader) {
        $preloader.fadeOut();
      }
    });

    // Init
    if ($slider.hasClass('lazyload')) {
      $slider.get(0).owlOptions = options;
      $slider.css('display', 'block');
    } else {
      $slider.owlCarousel(options);
    }
  });

  // Owl lazy loading
  $(document).on(_lazybeforeunveil_, function (e) {
    var $element = $(e.target);
    var isOwl = $element.hasClass('owl-carousel');

    if (isOwl) $element.owlCarousel(e.target.owlOptions || {});
  });

  /**
    * Input: Blinking caret
    */
  function startCaretBlinking(element, duration) {
    var initialHolder = element.placeholder;

    return setInterval(function () {
      element.placeholder = / _/.test(element.placeholder)
        ? initialHolder
        : initialHolder + ' _';
    }, duration || 400);
  }

  $('.form-input').each(function () {
    var input = this;
    var placeholder = input.placeholder;

    $(input).on('focus', function () {
      input.placeholder = '';
    });
    $(input).on('blur', function () {
      input.placeholder = placeholder;
    });
  });

  

  $('[data-input-animated]').each(function () {
    var input = this;
    var initialHolder = input.placeholder;
    var interval = startCaretBlinking(input);

    $(input).on('focus', function () {
      clearInterval(interval);
      input.placeholder = '';
    });

    $(input).on('blur', function () {
      input.placeholder = initialHolder;
      if (!input.value) {
        interval = startCaretBlinking(input);
      }
    });
  });

  /**
   * Rellax
   */
  $('.rellax-box img').each(function (key, item) {
    item.rellax = new Rellax(item);
  });

  /**
   * LazySizes
   */
  $(document)
    .on(_lazybeforeunveil_, function (e) {
      if (e.target.hasAttribute('data-lazyload-no-anim')) return;

      var hasPreloader = $(e.target).data('preloader');

      if (hasPreloader || hasPreloader === '') {
        var $preloader = $(preloader).clone();

        e.target.$preloader = $preloader;
        $(e.target).parent().append($preloader);
      }

      $(e.target).css(_opacity_, 0);
    })
    .on('lazyloaded', function (e) {
      if (e.target.hasAttribute('data-lazyload-no-anim')) return;

      var $target = $(e.target);
      var $preloader = e.target.$preloader;
      var duration = 750;

      if ($preloader) {
        $preloader.fadeOut();
      }

      $target.animateCSS('fadeIn', {
        duration: duration,
        clear: true,
        start: function () {
          setTimeout(function () {
            $target.css(_opacity_, '');
          }, duration + 25);
        },
        complete: function () {
          $target.css(_opacity_, '');
        }
      });
    });

  // LazySizes: Init
  lazySizes.init();

  /**
   * Logic on resize
   */
  var rtime;
  var timeout = false;
  var delta = 350;

  $(window).resize(function () {
    rtime = new Date();
    if (timeout === false) {
      timeout = true;
      setTimeout(resizeend, delta);
    }
  });

  function resizeend() {
    if (new Date() - rtime < delta) {
      setTimeout(resizeend, delta);
    } else {
      timeout = false;
      
      /**
        * MRC
        */
      $('[data-mrc]').each(function () {
        var tab = this;
        var $tab =  $(tab);

        if ($(window).width() >= $tab.data('mrc-disaled-up'))
          $tab.moreContent('destroy');
        else if (!tab.MoreContent) $tab.moreContent();
      });

      /**
       * OWl
       */
      
      sliderCardsExtended.each(function () {
        var slider = this;

        if (slider.owlReinit) {
          slider.owlReinit();
        }
      });
    }
  }

  /**
   * AnimateOnScroll
   */
  AOS.init({
    offset: 25,
    duration: 750,
    once: true,
    // easing: 'ease',
  });

  /**
   * Back to top button
   */
  var navButton = $('#top-button'),
    screenHeight = $(window).height(),
    topShow = screenHeight, // hidden before (screenHeight or Number), px
    navSpeed = 1200; // speed, ms

  function scrollCalc() {
    var scrollOut = $(window).scrollTop();

    if (
      scrollOut > topShow &&
      (navButton.attr('class') == '' || navButton.attr('class') == undefined)
    )
      navButton
        .fadeIn()
        .removeClass('down')
        .addClass('up')
        .attr('title', 'Наверх');
    if (scrollOut < topShow && navButton.attr('class') == 'up')
      navButton.fadeOut().removeClass('up down');
    if (scrollOut > topShow && navButton.attr('class') == 'down')
      navButton
        .fadeIn()
        .removeClass('down')
        .addClass('up');
  }

  $(window).bind('scroll', scrollCalc);
  var lastPos = 0;

  navButton.bind('click', function() {
    scrollOut = $(window).scrollTop();

    if (navButton.attr('class') == 'up') {
      lastPos = scrollOut;
      $(window).unbind('scroll', scrollCalc);

      $('body, html').animate(
        {
          scrollTop: 0
        },
        navSpeed,
        'swing',
        function() {
          navButton
            .removeClass('up')
            .addClass('down')
            .attr('title', 'Back');
          $(window).bind('scroll', scrollCalc);
        }
      );
    }
    if (navButton.attr('class') == 'down') {
      $(window).unbind('scroll', scrollCalc);

      $('body, html').animate(
        {
          scrollTop: lastPos
        },
        navSpeed,
        'swing',
        function() {
          navButton
            .removeClass('down')
            .addClass('up')
            .attr('title', 'Top');
          $(window).bind('scroll', scrollCalc);
        }
      );
    }
  });
}.bind(null, document, window, setTimeout));
