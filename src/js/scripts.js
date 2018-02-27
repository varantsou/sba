/*
 (function ($) {
 $.fn.extend({
 MyPagination: function (options) {
 var defaults = {
 height: 700,
 fadeSpeed: 700
 };
 var options = $.extend(defaults, options);

 //Creating a reference to the object
 var objContent = $(this);

 // other inner variables
 var fullPages = new Array();
 var subPages = new Array();
 var height = 0;
 var lastPage = 1;
 var paginatePages;

 // initialization function
 init = function () {
 objContent.children().each(function (i) {
 if (height + this.clientHeight > options.height) {
 fullPages.push(subPages);
 subPages = new Array();
 height = 0;
 }

 height += this.clientHeight;
 subPages.push(this);
 });

 if (height > 0) {
 fullPages.push(subPages);
 }

 // wrapping each full page
 $(fullPages).wrap("<div class='page'></div>");

 // hiding all wrapped pages
 objContent.children().hide();

 // making collection of pages for pagination
 paginatePages = objContent.children();

 // show first page
 showPage(lastPage);

 // draw controls
 showPagination($(paginatePages).length);
 };

 // update counter function
 updateCounter = function (i) {
 $('#page_number').html(i);
 };

 // show page function
 showPage = function (page) {
 i = page - 1;
 if (paginatePages[i]) {

 // hiding old page, display new one
 $(paginatePages[lastPage]).fadeOut(options.fadeSpeed);
 lastPage = i;
 $(paginatePages[lastPage]).fadeIn(options.fadeSpeed);

 // and updating counter
 updateCounter(page);
 }
 };

 // show pagination function (draw switching numbers)
 showPagination = function (numPages) {
 var pagins = '';
 for (var i = 1; i <= numPages; i++) {
 pagins += '<li><a href="#" onclick="showPage(' + i + '); return false;">' + i + '</a></li>';
 }
 $('.pagination li:first-child').after(pagins);
 };

 // perform initialization
 init();

 // and binding 2 events - on clicking to Prev
 $('.pagination #prev').click(function () {
 showPage(lastPage);
 });
 // and Next
 $('.pagination #next').click(function () {
 showPage(lastPage + 2);
 });

 }
 });
 })(jQuery);
 */

$(document).ready(function () {
  $('body').addClass('ready');
  $('.slider-main').slick({
    dots: true,
    slidesToShow: 1,
    infinite: true
  });
  var verticalSliderConfig = {
    mode: 'vertical',
    adaptiveHeight: false,
    moveSlides: 1,
    slideMargin: 0,
    infiniteLoop: false,
    minSlides: 1,
    maxSlides: 3,
    speed: 800,
    controls: false
  };
  var slider = $('.history-slider, .callcenter-slider').bxSlider(verticalSliderConfig);

  $(window).resize(function (e) {
    var verticalSlider = $('.vertical-slider');
    if( $(verticalSlider).length ){
      if($(window).width() > 890){
        if ($(verticalSlider).length) {
          var m = 0;
          $(verticalSlider).parent().children().each(function (i, o) {
            if(!$(o).hasClass('vertical-slider')){
              m += $(o).outerHeight();
            }
          });
          var h = $(verticalSlider).parent().height() - m;
          $(verticalSlider).height(h);
        }
        slider.reloadSlider(verticalSliderConfig)
      } else {
        slider.destroySlider();
      }
    }

  });

  var header = $('#header');
  $('.js_open-nav').on('click', function (e) {
    e.preventDefault();
    $(header).toggleClass('open');
  });

  $('.js_tab-nav').on('click', function (e) {
    e.preventDefault();
    var tab = $(this).attr('href');

    if (!$(this).hasClass('active')) {
      $('.right-col-content').addClass('show');
      $('.js_tab-nav').removeClass('active');
      $('.tab-content').removeClass('active').slideUp(200);
    } else {
      $('.right-col-content').removeClass('show');
    }

    $(this).toggleClass('active');
    $(tab).toggleClass('active');
    setTimeout(function(){
      $(tab).slideToggle(300);
    }, 300);

    $(window).resize();
  });

  $('.field-wrapper label').on('click', function () {
    $(this).parent().find('.js_form-field').focus();
  });
  $('.js_form-field').on('focus', function () {
    $(this).parents('.field-wrapper').addClass('focused');
  });
  $('.js_form-field').on('blur', function () {
    if ($(this).val().length < 1) {
      $(this).parents('.field-wrapper').removeClass('focused');
    }
  });

  $('.js_validate').on('submit', function (e) {
    $(this).find('input[type="text"]:required, input[type="email"], input[type="tel"]:required').parents('.field-wrapper').removeClass('error').find('.msg-error').remove();
    var err = 0;
    $(this).find('input[type="text"]:required').each(function (i, o) {
      if (!testInputText(o)) err++;
    });
    $(this).find('input[type="tel"]:required').each(function (i, o) {
      if (!testInputText(o)) err++;
    });
    $(this).find('input[type="email"]').each(function (i, o) {
      if (!testInputEmail(o)) err++;
    });
    if (err > 0) {
      e.preventDefault();
    }
  });
  $('.js_validate input, .js_validate textarea').on('keyup', function () {
    $(this).parents('.field-wrapper').removeClass('error');
  });

  var messageReq = "Поле обязательно для заполнения",
    messageEmail = "Ошибка!<br /> Проверьте пожалуйста<br /> привильно ли написан<br /> ваш email";

  function testInputText(input) {
    if ($(input).val() === '') {
      $(input).parents('.field-wrapper').addClass('error');
      $(input).parents('.field-wrapper').addClass('error').append('<span class="msg-error">' + messageReq + '</span>');
      return false;
    } else {
      $(input).parents('.field-wrapper').removeClass('error').find('.msg-error').remove();
      return true;
    }
  }

  function testInputEmail(input) {
    var inputVal = $(input).val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ((inputVal === '') && ($(input).attr('required'))) {
      $(input).parents('.field-wrapper').addClass('error').append('<span class="msg-error">' + messageReq + '</span>');
      return false;
    } else if (!regex.test(inputVal)) {
      $(input).parents('.field-wrapper').addClass('error').append('<span class="msg-error">' + messageEmail + '</span>');
      return false;
    } else {
      $(input).parents('.field-wrapper').removeClass('error').find('.msg-error').remove();
      return true;
    }
  }

  $(window).resize();

});