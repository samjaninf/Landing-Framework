var ladda_button;

/*
 * This function is called when the editor duplicates a block.
 * All template relevant stuff that needs to be re-bound and
 * re-initiated can be put here.
 */

function lfDuplicateBlockHook($new_block) {
  /*
   * Flat Surface Shader
   * http://matthew.wagerfield.com/flat-surface-shader/
   */

	if ($('.polygon-bg').length) {
    $('.polygon-bg').each(function() {

      var color_bg = ($(this).is('[data-color-bg]')) ? $(this).attr('data-color-bg') : '29a9e1';
      var color_light = ($(this).is('[data-color-light]')) ? $(this).attr('data-color-light') : '2db674';

      var container = $(this)[0];
      var renderer = new FSS.CanvasRenderer();
      var scene = new FSS.Scene();
      var light = new FSS.Light(color_bg, color_light);
      var geometry = new FSS.Plane(3000, 1000, 60, 22);
      var material = new FSS.Material('FFFFFF', 'FFFFFF');
      var mesh = new FSS.Mesh(geometry, material);
      var now, start = Date.now();

      function initialiseFss() {
        scene.add(mesh);
        scene.add(light);
        container.appendChild(renderer.element);
        window.addEventListener('resize', resizeFss);
      }

      function resizeFss() {
        renderer.setSize(container.offsetWidth, container.offsetHeight);
      }

      function animateFss() {
        now = Date.now() - start;
        light.setPosition(300*Math.sin(now*0.001), 200*Math.cos(now*0.0005), 60);
        renderer.render(scene);
        requestAnimationFrame(animateFss);
      }

      initialiseFss();
      resizeFss();
      animateFss();
    });
	}
}

/*
 * Particles.js
 * http://vincentgarreau.com/particles.js/
 */

if (document.getElementById('particles-js-hexagon') !== null) { particlesJS.load('particles-js-hexagon', '/assets/js/particles/particles-hexagon.json'); }
if (document.getElementById('particles-js-bubble') !== null) { particlesJS.load('particles-js-bubble', '/assets/js/particles/particles-bubble.json'); }
if (document.getElementById('particles-js-connect') !== null) { particlesJS.load('particles-js-connect', '/assets/js/particles/particles-connect.json'); }
if (document.getElementById('particles-js-diamonds') !== null) { particlesJS.load('particles-js-diamonds', '/assets/js/particles/particles-diamonds.json'); }
if (document.getElementById('particles-js-nasa') !== null) { particlesJS.load('particles-js-nasa', '/assets/js/particles/particles-nasa.json'); }
if (document.getElementById('particles-js-snow') !== null) { particlesJS.load('particles-js-snow', '/assets/js/particles/particles-snow.json'); }

$(function($) {

	/*
	 * Ajax forms
	 */

  bindAjaxForms();

	/*
	 * Form links
	 */

  bindAjaxFormLinks();

  /*
   * jQuery.scrollTo
   * https://github.com/flesler/jquery.scrollTo
   */

	var onMobile = false;
  var onIOS = false;

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) { onMobile = true; }
	if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) { onIOS = true; }

	if (onMobile === true) {
		$('a.scrollto').click(function (event) {
		  $('html, body').scrollTo(this.hash, 0, {offset: {top: -170}, animation:  {easing: 'easeInOutCubic', duration: 0}});
		  event.preventDefault();
	  });
	} else {
		$('a.scrollto').click(function (event) {
		  $('html, body').scrollTo(this.hash, 1000, {offset: {top: -170}, animation:  {easing: 'easeInOutCubic', duration: 1500}});
			event.preventDefault();
	  });
	}

  var hash = window.location.hash;

  if(hash) {
    $('html, body').scrollTo(hash + '_', 1000, {offset: {top: -170}, animation:  {easing: 'easeInOutCubic', duration: 1500}});
  }

  $(window).on('hashchange', function(e) {
    var hash = window.location.hash;
  
    if(hash) {
      $('html, body').scrollTo(hash + '_', 1000, {offset: {top: -170}, animation:  {easing: 'easeInOutCubic', duration: 1500}});
    }
  });

  /*
   * Ekko Lightbox
   * http://ashleydw.github.io/lightbox/
   */

  $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
    var self = $(this);
    $(this).attr('href', $(this).attr('src'));

    $('*[data-gallery]').each(function() {
      $(this).attr('href', $(this).attr('src'));
    });

    event.preventDefault();
    $(self).ekkoLightbox();
  });

  /*
   * Owl Carousel
   * https://owlcarousel2.github.io/OwlCarousel2/
   */

	if ($('.owl-carousel').length) {
    $('.owl-carousel').owlCarousel({
      loop: true,
      nav: false,
      responsive:{
        0:{
          items:1
        },
        600:{
          items:3
        },
        1000:{
          items:5
        }
      }
    });
  }

  /*
   * Flat Surface Shader
   * http://matthew.wagerfield.com/flat-surface-shader/
   */

	if ($('.polygon-bg').length) {
    $('.polygon-bg').each(function() {

      var color_bg = ($(this).is('[data-color-bg]')) ? $(this).attr('data-color-bg') : '29a9e1';
      var color_light = ($(this).is('[data-color-light]')) ? $(this).attr('data-color-light') : '2db674';

      var container = $(this)[0];
      var renderer = new FSS.CanvasRenderer();
      var scene = new FSS.Scene();
      var light = new FSS.Light(color_bg, color_light);
      var geometry = new FSS.Plane(3000, 1000, 60, 22);
      var material = new FSS.Material('FFFFFF', 'FFFFFF');
      var mesh = new FSS.Mesh(geometry, material);
      var now, start = Date.now();

      function initialiseFss() {
        scene.add(mesh);
        scene.add(light);
        container.appendChild(renderer.element);
        window.addEventListener('resize', resizeFss);
      }

      function resizeFss() {
        renderer.setSize(container.offsetWidth, container.offsetHeight);
      }

      function animateFss() {
        now = Date.now() - start;
        light.setPosition(300*Math.sin(now*0.001), 200*Math.cos(now*0.0005), 60);
        renderer.render(scene);
        requestAnimationFrame(animateFss);
      }

      initialiseFss();
      resizeFss();
      animateFss();
    });
	}

  /*
   * Countdown timer
   */

	if ($('div[data-countdown]').length) {
    $('div[data-countdown]').each(function() {
      var that = $(this);
      var countdown = $(this).attr('data-countdown');
      var clientTime = new Date().getTime();

      var dateTimePartsCountdown = countdown.split(' '),
          timePartsCountdown = dateTimePartsCountdown[1].split(':'),
          datePartsCountdown = dateTimePartsCountdown[0].split('-'),
          counterEnds;

      counterEnds = new Date(datePartsCountdown[0], parseInt(datePartsCountdown[1], 10) - 1, datePartsCountdown[2], timePartsCountdown[0], timePartsCountdown[1]);
      counterEnds = counterEnds.getTime();

      var serverTime = new Date().getTime();

      if ($(this)[0].hasAttribute('data-server-time')) {
        serverTime = $(this).attr('data-server-time');

        var dateTimePartsServerTime = serverTime.split(' '),
            timePartsServerTime = dateTimePartsServerTime[1].split(':'),
            datePartsServerTime = dateTimePartsServerTime[0].split('-'),

        serverTime = new Date(datePartsServerTime[0], parseInt(datePartsServerTime[1], 10) - 1, datePartsServerTime[2], timePartsServerTime[0], timePartsServerTime[1]);
        serverTime = serverTime.getTime();
      }

      var end = counterEnds - serverTime + clientTime;

      var _second = 1000;
      var _minute = _second * 60;
      var _hour = _minute * 60;
      var _day = _hour * 24
      var timer;

      function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {
          // Countdown is zero
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor( (distance % _day ) / _hour );
        var minutes = Math.floor( (distance % _hour) / _minute );
        var seconds = Math.floor( (distance % _minute) / _second );

        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;

        $(that).find('.day').text(days);
        $(that).find('.hour').text(hours);
        $(that).find('.minute').text(minutes);
        $(that).find('.second').text(seconds);
      }

      timer = setInterval(showRemaining, 1000);

    });
	}

});


/*
 * Ajax form links
 */

function bindAjaxFormLinks() {

	if ($('[data-form]').length) {
    $('[data-form]').each(function(i) {
      var index = i;
      var $form_link = $(this);

      var form = $form_link.attr('data-form');

      var html = '<div class="-x-tmp modal modal-frame modal-form fade" tabindex="-1" role="dialog" id="formModal' + index + '" aria-hidden="true">' +
        '<div class="modal-dialog modal-lg">' +
          '<div class="modal-content">' +
            '<div class="modal-header">' +
              '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
              '</button>' +
            '</div>' +
            '<iframe src="about:blank" seamless="1" frameborder="0" style="width:100%;min-height:100px" id="formFrame' + index + '"></frame>' +
          '</div>' +
        '</div>' +
      '</div>';

      $('body').append(html);

      // Initialize the modal, but don't show yet
      $('#formModal' + index).modal({
        show: false,
        backdrop: 'static',
        keyboard: false
      });

      $form_link.off('click.form-modal').on('click.form-modal', function() {
        blockUI();
        var $modal = $('#formModal' + index);
        var $frame = $('#formFrame' + index);

        if ($frame.attr('src') == 'about:blank') {
          var qs = (typeof sl_lp !== 'undefined') ? '?sl_lp=' + sl_lp : '';
          $frame.attr('src', _trans['url'] + '/f/' + form + qs);

          // Set temp css to calculate iframe height
          $modal.css({
            visibility: 'hidden',
            display: 'block'
          });

          $frame.on('load', function() {
            var frame_height = parseInt($frame.contents().find('html').height());
            $frame.height(frame_height);

            $modal.attr('style', '');
            unblockUI();
            $modal.modal('show');
          });
        } else {
          // Set temp css to calculate iframe height
          $modal.css({
            visibility: 'hidden',
            display: 'block'
          });

          // Resize frame in case window size has changes when modal was hidden
          // Timeout is necessary because otherwise 0 height is calculated in some browsers.
          setTimeout(function() {
            var frame_height = parseInt($frame.contents().find('html').height());
            $frame.height(frame_height);

            $modal.attr('style', '');
            unblockUI();
            $('#formModal' + index).modal('show');
          }, 100);
        }

        $(window).resize(function() {
          var frame_height = parseInt($frame.contents().find('html').height());
          $frame.height(frame_height);
        });

      });
    });
  };
}

/*
 * Ajax forms
 */

function bindAjaxForms() {

  // Save cloned forms to freeze labels and placeholders for custom elements
  // This prevents visitors from chaning the dom with dev tools
	if ($('form.ajax').length) {
    var form = 0;
    var $f = [];
    $('form.ajax').each(function() {
      var $form = $(this);
      $form.attr('data-x-i', form);
      $f[form] = $form.clone(false);
      form++;
    });
  };

  $('form.ajax').validator().on('submit', function (e) {
    if (! e.isDefaultPrevented()) {
      var $form = $(this);
      var form = $form.attr('data-x-i');

      processAjaxForm($form, $f[form]);
      /*
      $('form.ajax').ajaxSubmit({
        dataType: 'json',
        beforeSerialize: beforeSerialize,
        success: formResponse,
        error: formResponse
      });
*/
    e.preventDefault();
    }
  });
}

function updateAjaxForms() {
  $('form.ajax').validator('update').on('submit', function (e) {
    if (! e.isDefaultPrevented()) {
      processAjaxForm($(this));
      /*
      $('form.ajax').ajaxSubmit({
        dataType: 'json',
        beforeSerialize: beforeSerialize,
        success: formResponse,
        error: formResponse
      });
*/
      e.preventDefault();
    }
  });
}

function processAjaxForm($form, $clone) {

  var $btn = $form.find('[type=submit]');

  if ($btn.is('[class*=btn-outline]')) {
    $btn.attr('data-spinner-color', $btn.css('border-top-color'));
  } else {
    $btn.attr('data-spinner-color', $btn.css('color'));
  }

	ladda_button = $btn.ladda();

    // Loading state
	ladda_button.ladda('start');

  if (typeof lf_demo === 'undefined') {
    var f = formSerialize($form, $clone);

    var jqxhr = $.ajax({
      url: _trans['url'] + "/f/post",
      data: {
        f: f, 
        _token: _trans['csrf']
      },
      method: 'POST'
    })
    .done(function(data) {
      if (typeof data.redir !== 'undefined') {
        document.location = data.redir;
      } else {
        swal({
          title: data.title,
          text: data.text,
          confirmButtonColor: $btn.css('border-top-color'),
          confirmButtonText: _trans['ok'],
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        }).then(function (result) {

          // Reset form
          if (data.success) {
            $form.resetForm();
          }

          // Loading state
          ladda_button.ladda('stop');

        }, function (dismiss) {
          // Do nothing on cancel
          // dismiss can be 'cancel', 'overlay', 'close', and 'timer'
        });
      }
    })
    .fail(function() {
      alert('Request failed, please try again (' + textStatus + ')');
    })
    .always(function() {
      ladda_button.ladda('stop');
    });

  } else {
    swal({
      title: _trans['form_post_demo_title'],
      text: _trans['form_post_demo_text'],
      confirmButtonColor: $btn.css('border-color'),
      confirmButtonText: _trans['ok'],
      allowOutsideClick: false
    }).then(function (result) {

      // Reset form
      $form.resetForm();

      // Loading state
      ladda_button.ladda('stop');

    }, function (dismiss) {
      // Do nothing on cancel
      // dismiss can be 'cancel', 'overlay', 'close', and 'timer'
    });
  }
}

function formSerialize($form, $clone) {
  var custom_vars = {};
  var form_vars = {};

	if ($form.find('.form-group').length) {
    $form.find('.form-group').each(function(i) {

      var $cloneGroup = $($clone.find('.form-group')[i]);
      var $cloneControl = $cloneGroup.find('.form-control');

      var $formGroup = $(this);
      var $formControl = $formGroup.find('.form-control');

      var type, val;
      var name = $cloneControl.attr('name');

      var label = $cloneGroup.find('label').html();
      label = (typeof label !== typeof undefined && label !== false) ? label : '';

      var placeholder = $cloneControl.attr('placeholder');
      placeholder = (typeof placeholder !== typeof undefined && placeholder !== false) ? placeholder : '';

      var reference = (label != '') ? label : placeholder;

      if (typeof name !== 'undefined') {
        type = 'form-control';
        val = $formControl.val();
        if (name == 'email') {
          reference = 'email';
        }
      } else if ($formGroup.find('input[type=radio]').length) {
        type = 'radio';
        name = $formGroup.find('input[type=radio]').attr('name');
        val = $formGroup.find('input[type=radio]:checked').val();
      } else if ($formGroup.find('input[type=checkbox]').length) {
        type = 'checkbox';
        name = $formGroup.find('input[type=checkbox]').attr('name');
        var val = [];
        $formGroup.find('input[type=checkbox]:checked').each(function() {
          val.push($(this).val());
        });
      } else {
        name = '';
      }

      if (name != '') {
        if (name.indexOf('[]') >= 0) {
          // It's a custom var
          custom_vars[reference] = val;
        } else {
          // It's a form var
          form_vars[name] = val;
        }
      }
    });
  }

  return {
    'sl_lp': (typeof sl_lp !== 'undefined') ? sl_lp : '',
    'sl_f': (typeof sl_f !== 'undefined') ? sl_f : '',
    'c': custom_vars,
    'f': form_vars
  };
}
/*

function beforeSerialize($jqForm, options) {

  var $btn = $jqForm.find('[type=submit]');

  if ($btn.is('[class*=btn-outline]')) {
    $btn.attr('data-spinner-color', $btn.css('border-color'));
  } else {
    $btn.attr('data-spinner-color', $btn.css('color'));
  }

	ladda_button = $btn.ladda();

    // Loading state
	ladda_button.ladda('start');
}

function formResponse(responseText, statusText, xhr, $jqForm) {

  var $btn = $jqForm.find('[type=submit]');
  var formPost = formSerialize($jqForm);

  if (typeof responseText.title !== 'undefined' && typeof responseText.text !== 'undefined') {
    swal({
      title: responseText.title,
      text: responseText.text,
      confirmButtonColor: $btn.css('border-color'),
      confirmButtonText: _trans['ok'],
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    }).then(function (result) {

      // Reset form
      if (responseText.type == 'success') {
        $jqForm[0].reset();
      }

      // Loading state
      ladda_button.ladda('stop');

    }, function (dismiss) {
      // Do nothing on cancel
      // dismiss can be 'cancel', 'overlay', 'close', and 'timer'
    });
  } else {
    swal({
      title: _trans['form_post_demo_title'],
      text: _trans['form_post_demo_text'],
      confirmButtonColor: $btn.css('border-color'),
      confirmButtonText: _trans['ok'],
      allowOutsideClick: false
    }).then(function (result) {

      // Reset form
      $jqForm[0].reset();

      // Loading state
      ladda_button.ladda('stop');

    }, function (dismiss) {
      // Do nothing on cancel
      // dismiss can be 'cancel', 'overlay', 'close', and 'timer'
    });
  }
}*/

/*
 * BlockUI
 */

function blockUI(el) {
  if (typeof el === 'undefined') {
    $.blockUI({
      message: '<div class="loader"></div>',
      fadeIn: 0,
      fadeOut: 100,
      baseZ: 21000,
      overlayCSS: {
        backgroundColor: '#000'
      },
      css: {
        border: 'none',
        padding: '0',
        backgroundColor: 'transparant',
        opacity: 1,
        color: '#fff'
      }
    });
  } else {
    $(el).block({
      message: '<div class="loader loader-xs"></div>',
      fadeIn: 0,
      fadeOut: 100,
      baseZ: 21000,
      overlayCSS: {
        backgroundColor: '#000',
        opacity: 0.1,
      },
      css: {
        border: 'none',
        padding: '0',
        backgroundColor: 'transparant',
        opacity: 1,
        color: '#fff'
      }
    });
  }
}

/*
 * unblockUI
 */

function unblockUI(el) {
  if (typeof el === 'undefined') {
    $.unblockUI();
  } else {
    $(el).unblock();
  }
}