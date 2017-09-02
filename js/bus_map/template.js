(function ($) {
    $(document).ready(function () {
        var style = $('<style type="text/css" id="theme_color" />').appendTo('head');

        var $op = $('#options_panel'),
            $op_btn = $('#options_panel h3');

        $op_btn.click(function () {
            if ($op.hasClass('opened')) {
                $op.removeClass('opened').animate({
                    'left': '-' + 180 + 'px',
                    opacity: .7
                }, 500, 'easeOutExpo');
                $(this).find('span').removeClass('icon-remove').addClass('icon-wrench');

            } else {
                $op.addClass('opened').animate({
                    'left': 0,
                    opacity: 1
                }, 500, 'easeOutBounce');
                $(this).find('span').removeClass('icon-wrench').addClass('icon-remove');
            }
        });

        $('#header_style').change(function () {
            $('#header').attr('class', '');
            $('#header').addClass('style' + $(this).val());
        });

        $('#theme_switcher').change(function () {
            if ($(this).val() == 1) var style = $('<link rel="stylesheet" href="css/dark-theme.css" type="text/css" id="theme_style" />').appendTo('head');
            else if ($(this).val() == 0) $('#theme_style').remove();
        });

        function changeColor(hex) {
            style.html('a:hover, .cart_details .checkout, .info_pop .buyit, .m_title, .smallm_title, .circle_title, .feature_box .title, .services_box .title, .latest_posts.default-style .hoverBorder:hover h6, .latest_posts.style2 ul.posts .title, .latest_posts.style3 ul.posts .title, .recentwork_carousel li .details h4, .acc-group.default-style > button, .acc-group.style3 > button:after, .screenshot-box .left-side h3.title, .vertical_tabs .tabbable .nav>li>a:hover, .vertical_tabs .tabbable .nav>li.active>a, .services_box.style2 .box .list li, .shop-latest .tabbable .nav li.active a, .product-list-item:hover .details h3, .statbox h4 {color:' + hex + ';}' + '.acc-group.style3 > button:hover, .acc-group.style3 > button:hover:after { color:' + hex + ' !important;}' + '.tabs_style1 > ul.nav > li.active > a, header.style1, header.style2 #logo a, header.style3 #logo a {border-top: 3px solid ' + hex + ';}' + 'nav#main_menu > ul > li.active > a, nav#main_menu > ul > li > a:hover, nav#main_menu > ul > li:hover > a, .social-icons li a:hover, #action_box, .circlehover, .iosSlider .item .caption.style2 .more  {background-color:' + hex + ';}' + '.how_to_shop .number, .newsletter-signup input[type=submit], .vertical_tabs .tabbable .nav>li.active>a>span, .vertical_tabs .tabbable .nav>li>a:hover>span, #map_controls, .hg-portfolio-sortable #portfolio-nav li.current a, .ptcarousel .controls > a:hover, .itemLinks span a:hover, .product-list-item .details .actions a, .shop-features .shop-feature:hover, .btn-flat, .redbtn, #sidebar ul.menu li a:hover, .imgboxes_style1 .hoverBorder h6, .feature_box.style3 .box:hover, .services_box .box:hover .icon, .latest_posts.default-style .hoverBorder h6, .process_steps .step.intro, .recentwork_carousel.style2 li a .details .plus, .gobox.ok, .hover-box:hover, .recentwork_carousel li .details > .bg, .circlehover:before,.iosSlider .item .caption.style1 .more:before, .iosSlider .item .caption.style1 .more:after {background:' + hex + ';}' + '#action_box:before {border-top-color:' + hex + ';}' + '.process_steps .step.intro:after {border-left-color:' + hex + '; }' + '.theHoverBorder:hover {box-shadow:0 0 0 5px ' + hex + ' inset;}' + '.offline-page .containerbox {border-bottom:5px solid ' + hex + '; }' + '.offline-page .containerbox:after {border-top: 20px solid ' + hex + ';}' + '.iosSlider .item .caption.style2 .title_big, .iosSlider .item .caption.style2 .title_small {border-left: 5px solid ' + hex + '; }' + '.iosSlider .item .caption.style2.fromright .title_big, .iosSlider .item .caption.style2.fromright .title_small {border-right: 5px solid ' + hex + '; }');
        }

        // Attach callbacks
        $('.color-picker').miniColors({
            change: function (hex, rgba) {
                changeColor(hex);
            }
        });

        $('#options_panel .color_suggestions li').click(function () {
            var hex = $(this).css('background-color');
            changeColor(hex);
        });

    });
})(jQuery);
/*
 * jQuery miniColors: A small color selector
 *
 * Copyright 2012 Cory LaViska for A Beautiful Site, LLC. (http://www.abeautifulsite.net/)
 *
 * Dual licensed under the MIT or GPL Version 2 licenses
 *
*/
if (jQuery)(function ($) {
    $.extend($.fn, {
        miniColors: function (o, data) {
            var prefix = !o || typeof o.prefix === 'undefined' ? '#' : o.prefix;

            function create(input, o, data) {
                var color = expandHex(input.val()) || 'ffffff',
                    hsb = hex2hsb(color),
                    rgb = hsb2rgb(hsb),
                    alpha = parseFloat(input.attr('data-opacity')).toFixed(2),
                    opacity = false,
                    trigger;
                if (alpha > 1) alpha = 1;
                if (alpha < 0) alpha = 0;
                if (input.attr('data-opacity') !== undefined || o.opacity === true) {
                    opacity = true;
                    alpha = input.attr('data-opacity');
                    if (alpha === '') {
                        alpha = 1
                    } else {
                        alpha = parseFloat(alpha).toFixed(2)
                    }
                    if (alpha > 1) alpha = 1;
                    if (alpha < 0) alpha = 0;
                    input.attr('data-opacity', alpha)
                }
                trigger = $('<a class="miniColors-trigger" style="background-color: #' + color + '" href="#"></a>');
                trigger.insertAfter(input);
                trigger.wrap('<span class="miniColors-triggerWrap"></span>');
                if (o.opacity) {
                    trigger.css('backgroundColor', 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + alpha + ')')
                }
                input.addClass('miniColors').data('original-maxlength', input.attr('maxlength') || null).data('original-autocomplete', input.attr('autocomplete') || null).data('letterCase', o.letterCase === 'uppercase' ? 'uppercase' : 'lowercase').data('opacity', opacity).data('alpha', alpha).data('trigger', trigger).data('hsb', hsb).data('change', o.change ? o.change : null).data('close', o.close ? o.close : null).data('open', o.open ? o.open : null).attr('maxlength', 7).attr('autocomplete', 'off').val(prefix + convertCase(color, o.letterCase));
                if (o.readonly || input.prop('readonly')) input.prop('readonly', true);
                if (o.disabled || input.prop('disabled')) disable(input);
                trigger.on('click.miniColors', function (event) {
                    event.preventDefault();
                    if (input.val() === '') input.val(prefix);
                    show(input)
                });
                input.on('focus.miniColors', function (event) {
                    if (input.val() === '') input.val(prefix);
                    show(input)
                });
                input.on('blur.miniColors', function (event) {
                    var hex = expandHex(input.val());
                    input.val(hex ? prefix + convertCase(hex, input.data('letterCase')) : '#' + hsb2hex(input.data('hsb')))
                });
                input.on('keydown.miniColors', function (event) {
                    if (event.keyCode === 9 || event.keyCode === 27) hide(input)
                });
                input.on('keyup.miniColors', function (event) {
                    setColorFromInput(input)
                });
                input.on('paste.miniColors', function (event) {
                    setTimeout(function () {
                        setColorFromInput(input)
                    }, 5)
                })
            }

            function destroy(input) {
                hide();
                input = $(input);
                input.data('trigger').parent().remove();
                input.attr('autocomplete', input.data('original-autocomplete')).attr('maxlength', input.data('original-maxlength')).removeData().removeClass('miniColors').off('.miniColors');
                $(document).off('.miniColors')
            }

            function enable(input) {
                input.prop('disabled', false).data('trigger').parent().removeClass('disabled')
            }

            function disable(input) {
                hide(input);
                input.prop('disabled', true).data('trigger').parent().addClass('disabled')
            }

            function show(input) {
                var hex, colorPosition, huePosition, opacityPosition, hidden, top, left, trigger, triggerWidth, triggerHeight, selector, selectorWidth, selectorHeight, windowHeight, windowWidth, scrollTop, scrollLeft;
                if (input.prop('disabled')) return false;
                hide();
                selector = $('<div class="miniColors-selector"></div>').append('<div class="miniColors-hues"><div class="miniColors-huePicker"></div></div>').append('<div class="miniColors-colors" style="background-color: #FFF;"><div class="miniColors-colorPicker"><div class="miniColors-colorPicker-inner"></div></div>').css('display', 'none').addClass(input.attr('class'));
                if (input.data('opacity')) {
                    selector.addClass('opacity').prepend('<div class="miniColors-opacity"><div class="miniColors-opacityPicker"></div></div>')
                }
                hsb = input.data('hsb');
                selector.find('.miniColors-colors').css('backgroundColor', '#' + hsb2hex({
                    h: hsb.h,
                    s: 100,
                    b: 100
                })).end().find('.miniColors-opacity').css('backgroundColor', '#' + hsb2hex({
                    h: hsb.h,
                    s: hsb.s,
                    b: hsb.b
                })).end();
                colorPosition = input.data('colorPosition');
                if (!colorPosition) colorPosition = getColorPositionFromHSB(hsb);
                selector.find('.miniColors-colorPicker').css('top', colorPosition.y + 'px').css('left', colorPosition.x + 'px');
                huePosition = input.data('huePosition');
                if (!huePosition) huePosition = getHuePositionFromHSB(hsb);
                selector.find('.miniColors-huePicker').css('top', huePosition + 'px');
                opacityPosition = input.data('opacityPosition');
                if (!opacityPosition) opacityPosition = getOpacityPositionFromAlpha(input.attr('data-opacity'));
                selector.find('.miniColors-opacityPicker').css('top', opacityPosition + 'px');
                input.data('selector', selector).data('huePicker', selector.find('.miniColors-huePicker')).data('opacityPicker', selector.find('.miniColors-opacityPicker')).data('colorPicker', selector.find('.miniColors-colorPicker')).data('mousebutton', 0);
                $('BODY').append(selector);
                trigger = input.data('trigger');
                hidden = !input.is(':visible');
                top = hidden ? trigger.offset().top + trigger.outerHeight() : input.offset().top + input.outerHeight();
                left = hidden ? trigger.offset().left : input.offset().left;
                selectorWidth = selector.outerWidth();
                selectorHeight = selector.outerHeight();
                triggerWidth = trigger.outerWidth();
                triggerHeight = trigger.outerHeight();
                windowHeight = $(window).height();
                windowWidth = $(window).width();
                scrollTop = $(window).scrollTop();
                scrollLeft = $(window).scrollLeft();
                if ((top + selectorHeight) > windowHeight + scrollTop) top = top - selectorHeight - triggerHeight;
                if ((left + selectorWidth) > windowWidth + scrollLeft) left = left - selectorWidth + triggerWidth;
                selector.css({
                    top: top,
                    left: left
                }).fadeIn(100);
                selector.on('selectstart', function () {
                    return false
                });
                if (!$.browser.msie || ($.browser.msie && $.browser.version >= 9)) {
                    $(window).on('resize.miniColors', function (event) {
                        hide(input)
                    })
                }
                $(document).on('mousedown.miniColors touchstart.miniColors', function (event) {
                    var testSubject = $(event.target).parents().andSelf();
                    input.data('mousebutton', 1);
                    if (testSubject.hasClass('miniColors-colors')) {
                        event.preventDefault();
                        input.data('moving', 'colors');
                        moveColor(input, event)
                    }
                    if (testSubject.hasClass('miniColors-hues')) {
                        event.preventDefault();
                        input.data('moving', 'hues');
                        moveHue(input, event)
                    }
                    if (testSubject.hasClass('miniColors-opacity')) {
                        event.preventDefault();
                        input.data('moving', 'opacity');
                        moveOpacity(input, event)
                    }
                    if (testSubject.hasClass('miniColors-selector')) {
                        event.preventDefault();
                        return
                    }
                    if (testSubject.hasClass('miniColors')) return;
                    hide(input)
                }).on('mouseup.miniColors touchend.miniColors', function (event) {
                    event.preventDefault();
                    input.data('mousebutton', 0).removeData('moving')
                }).on('mousemove.miniColors touchmove.miniColors', function (event) {
                    event.preventDefault();
                    if (input.data('mousebutton') === 1) {
                        if (input.data('moving') === 'colors') moveColor(input, event);
                        if (input.data('moving') === 'hues') moveHue(input, event);
                        if (input.data('moving') === 'opacity') moveOpacity(input, event)
                    }
                });
                if (input.data('open')) {
                    input.data('open').call(input.get(0), '#' + hsb2hex(hsb), $.extend(hsb2rgb(hsb), {
                        a: parseFloat(input.attr('data-opacity'))
                    }))
                }
            }

            function hide(input) {
                if (!input) input = $('.miniColors');
                input.each(function () {
                    var selector = $(this).data('selector');
                    $(this).removeData('selector');
                    $(selector).fadeOut(100, function () {
                        if (input.data('close')) {
                            var hsb = input.data('hsb'),
                                hex = hsb2hex(hsb);
                            input.data('close').call(input.get(0), '#' + hex, $.extend(hsb2rgb(hsb), {
                                a: parseFloat(input.attr('data-opacity'))
                            }))
                        }
                        $(this).remove()
                    })
                });
                $(document).off('.miniColors')
            }

            function moveColor(input, event) {
                var colorPicker = input.data('colorPicker'),
                    position, s, b, hsb;
                colorPicker.hide();
                position = {
                    x: event.pageX,
                    y: event.pageY
                };
                if (event.originalEvent.changedTouches) {
                    position.x = event.originalEvent.changedTouches[0].pageX;
                    position.y = event.originalEvent.changedTouches[0].pageY
                }
                position.x = position.x - input.data('selector').find('.miniColors-colors').offset().left - 6;
                position.y = position.y - input.data('selector').find('.miniColors-colors').offset().top - 6;
                if (position.x <= -5) position.x = -5;
                if (position.x >= 144) position.x = 144;
                if (position.y <= -5) position.y = -5;
                if (position.y >= 144) position.y = 144;
                input.data('colorPosition', position);
                colorPicker.css('left', position.x).css('top', position.y).show();
                s = Math.round((position.x + 5) * 0.67);
                if (s < 0) s = 0;
                if (s > 100) s = 100;
                b = 100 - Math.round((position.y + 5) * 0.67);
                if (b < 0) b = 0;
                if (b > 100) b = 100;
                hsb = input.data('hsb');
                hsb.s = s;
                hsb.b = b;
                setColor(input, hsb, true)
            }

            function moveHue(input, event) {
                var huePicker = input.data('huePicker'),
                    position = event.pageY,
                    h, hsb;
                huePicker.hide();
                if (event.originalEvent.changedTouches) {
                    position = event.originalEvent.changedTouches[0].pageY
                }
                position = position - input.data('selector').find('.miniColors-colors').offset().top - 1;
                if (position <= -1) position = -1;
                if (position >= 149) position = 149;
                input.data('huePosition', position);
                huePicker.css('top', position).show();
                h = Math.round((150 - position - 1) * 2.4);
                if (h < 0) h = 0;
                if (h > 360) h = 360;
                hsb = input.data('hsb');
                hsb.h = h;
                setColor(input, hsb, true)
            }

            function moveOpacity(input, event) {
                var opacityPicker = input.data('opacityPicker'),
                    position = event.pageY,
                    alpha;
                opacityPicker.hide();
                if (event.originalEvent.changedTouches) {
                    position = event.originalEvent.changedTouches[0].pageY
                }
                position = position - input.data('selector').find('.miniColors-colors').offset().top - 1;
                if (position <= -1) position = -1;
                if (position >= 149) position = 149;
                input.data('opacityPosition', position);
                opacityPicker.css('top', position).show();
                alpha = parseFloat((150 - position - 1) / 150).toFixed(2);
                if (alpha < 0) alpha = 0;
                if (alpha > 1) alpha = 1;
                input.data('alpha', alpha).attr('data-opacity', alpha);
                setColor(input, input.data('hsb'), true)
            }

            function setColor(input, hsb, updateInput) {
                var hex = hsb2hex(hsb),
                    selector = $(input.data('selector')),
                    rgb = hsb2rgb(hsb);
                input.data('hsb', hsb);
                if (updateInput) input.val(prefix + convertCase(hex, input.data('letterCase')));
                selector.find('.miniColors-colors').css('backgroundColor', '#' + hsb2hex({
                    h: hsb.h,
                    s: 100,
                    b: 100
                })).end().find('.miniColors-opacity').css('backgroundColor', '#' + hex).end();
                input.data('trigger').css('backgroundColor', '#' + hex);
                if (input.data('opacity')) {
                    input.data('trigger').css('backgroundColor', 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + input.attr('data-opacity') + ')')
                }
                if (input.data('change')) {
                    if ((hex + ',' + input.attr('data-opacity')) === input.data('lastChange')) return;
                    input.data('change').call(input.get(0), '#' + hex, $.extend(hsb2rgb(hsb), {
                        a: parseFloat(input.attr('data-opacity'))
                    }));
                    input.data('lastChange', hex + ',' + input.attr('data-opacity'))
                }
            }

            function setColorFromInput(input) {
                var hex, hsb, colorPosition, colorPicker, huePosition, huePicker, opacityPosition, opacityPicker;
                input.val(prefix + cleanHex(input.val()));
                hex = expandHex(input.val());
                if (!hex) return false;
                hsb = hex2hsb(hex);
                colorPosition = getColorPositionFromHSB(hsb);
                colorPicker = $(input.data('colorPicker'));
                colorPicker.css('top', colorPosition.y + 'px').css('left', colorPosition.x + 'px');
                input.data('colorPosition', colorPosition);
                huePosition = getHuePositionFromHSB(hsb);
                huePicker = $(input.data('huePicker'));
                huePicker.css('top', huePosition + 'px');
                input.data('huePosition', huePosition);
                opacityPosition = getOpacityPositionFromAlpha(input.attr('data-opacity'));
                opacityPicker = $(input.data('opacityPicker'));
                opacityPicker.css('top', opacityPosition + 'px');
                input.data('opacityPosition', opacityPosition);
                setColor(input, hsb);
                return true
            }

            function convertCase(string, letterCase) {
                if (letterCase === 'uppercase') {
                    return string.toUpperCase()
                } else {
                    return string.toLowerCase()
                }
            }

            function getColorPositionFromHSB(hsb) {
                var x = Math.ceil(hsb.s / 0.67);
                if (x < 0) x = 0;
                if (x > 150) x = 150;
                var y = 150 - Math.ceil(hsb.b / 0.67);
                if (y < 0) y = 0;
                if (y > 150) y = 150;
                return {
                    x: x - 5,
                    y: y - 5
                }
            }

            function getHuePositionFromHSB(hsb) {
                var y = 150 - (hsb.h / 2.4);
                if (y < 0) h = 0;
                if (y > 150) h = 150;
                return y
            }

            function getOpacityPositionFromAlpha(alpha) {
                var y = 150 * alpha;
                if (y < 0) y = 0;
                if (y > 150) y = 150;
                return 150 - y
            }

            function cleanHex(hex) {
                return hex.replace(/[^A-F0-9]/ig, '')
            }

            function expandHex(hex) {
                hex = cleanHex(hex);
                if (!hex) return null;
                if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                return hex.length === 6 ? hex : null
            }

            function hsb2rgb(hsb) {
                var rgb = {};
                var h = Math.round(hsb.h);
                var s = Math.round(hsb.s * 255 / 100);
                var v = Math.round(hsb.b * 255 / 100);
                if (s === 0) {
                    rgb.r = rgb.g = rgb.b = v
                } else {
                    var t1 = v;
                    var t2 = (255 - s) * v / 255;
                    var t3 = (t1 - t2) * (h % 60) / 60;
                    if (h === 360) h = 0;
                    if (h < 60) {
                        rgb.r = t1;
                        rgb.b = t2;
                        rgb.g = t2 + t3
                    } else if (h < 120) {
                        rgb.g = t1;
                        rgb.b = t2;
                        rgb.r = t1 - t3
                    } else if (h < 180) {
                        rgb.g = t1;
                        rgb.r = t2;
                        rgb.b = t2 + t3
                    } else if (h < 240) {
                        rgb.b = t1;
                        rgb.r = t2;
                        rgb.g = t1 - t3

                    } else if (h < 300) {
                        rgb.b = t1;
                        rgb.g = t2;
                        rgb.r = t2 + t3
                    } else if (h < 360) {
                        rgb.r = t1;
                        rgb.g = t2;
                        rgb.b = t1 - t3
                    } else {
                        rgb.r = 0;
                        rgb.g = 0;
                        rgb.b = 0
                    }
                }
                return {
                    r: Math.round(rgb.r),
                    g: Math.round(rgb.g),
                    b: Math.round(rgb.b)
                }
            }

            function rgb2hex(rgb) {
                var hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];
                $.each(hex, function (nr, val) {
                    if (val.length === 1) hex[nr] = '0' + val
                });
                return hex.join('')
            }

            function hex2rgb(hex) {
                hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
                return {
                    r: hex >> 16,
                    g: (hex & 0x00FF00) >> 8,
                    b: (hex & 0x0000FF)
                }
            }

            function rgb2hsb(rgb) {
                var hsb = {
                    h: 0,
                    s: 0,
                    b: 0
                };
                var min = Math.min(rgb.r, rgb.g, rgb.b);
                var max = Math.max(rgb.r, rgb.g, rgb.b);
                var delta = max - min;
                hsb.b = max;
                hsb.s = max !== 0 ? 255 * delta / max : 0;
                if (hsb.s !== 0) {
                    if (rgb.r === max) {
                        hsb.h = (rgb.g - rgb.b) / delta
                    } else if (rgb.g === max) {
                        hsb.h = 2 + (rgb.b - rgb.r) / delta
                    } else {
                        hsb.h = 4 + (rgb.r - rgb.g) / delta
                    }
                } else {
                    hsb.h = -1
                }
                hsb.h *= 60;
                if (hsb.h < 0) {
                    hsb.h += 360
                }
                hsb.s *= 100 / 255;
                hsb.b *= 100 / 255;
                return hsb
            }

            function hex2hsb(hex) {
                var hsb = rgb2hsb(hex2rgb(hex));
                if (hsb.s === 0) hsb.h = 360;
                return hsb
            }

            function hsb2hex(hsb) {
                return rgb2hex(hsb2rgb(hsb))
            }
            switch (o) {
            case 'readonly':
                $(this).each(function () {
                    if (!$(this).hasClass('miniColors')) return;
                    $(this).prop('readonly', data)
                });
                return $(this);
            case 'disabled':
                $(this).each(function () {
                    if (!$(this).hasClass('miniColors')) return;
                    if (data) {
                        disable($(this))
                    } else {
                        enable($(this))
                    }
                });
                return $(this);
            case 'value':
                if (data === undefined) {
                    if (!$(this).hasClass('miniColors')) return;
                    var hex = expandHex($(this).val());
                    return hex ? prefix + convertCase(hex, $(this).data('letterCase')) : null
                }
                $(this).each(function () {
                    if (!$(this).hasClass('miniColors')) return;
                    $(this).val(data);
                    setColorFromInput($(this))
                });
                return $(this);
            case 'opacity':
                if (data === undefined) {
                    if (!$(this).hasClass('miniColors')) return;
                    if ($(this).data('opacity')) {
                        return parseFloat($(this).attr('data-opacity'))
                    } else {
                        return null
                    }
                }
                $(this).each(function () {
                    if (!$(this).hasClass('miniColors')) return;
                    if (data < 0) data = 0;
                    if (data > 1) data = 1;
                    $(this).attr('data-opacity', data).data('alpha', data);
                    setColorFromInput($(this))
                });
                return $(this);
            case 'destroy':
                $(this).each(function () {
                    if (!$(this).hasClass('miniColors')) return;
                    destroy($(this))
                });
                return $(this);
            default:
                if (!o) o = {};
                $(this).each(function () {
                    if ($(this)[0].tagName.toLowerCase() !== 'input') return;
                    if ($(this).data('trigger')) return;
                    create($(this), o, data)
                });
                return $(this)
            }
        }
    })
})(jQuery);
/* ===================================================
 * bootstrap-transition.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!
function ($) {

    $(function () {

        "use strict"; // jshint ;_;
/* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
     * ======================================================= */

        $.support.transition = (function () {

            var transitionEnd = (function () {

                var el = document.createElement('bootstrap'),
                    transEndEventNames = {
                        'WebkitTransition': 'webkitTransitionEnd',
                        'MozTransition': 'transitionend',
                        'OTransition': 'oTransitionEnd otransitionend',
                        'transition': 'transitionend'
                    },
                    name

                for (name in transEndEventNames) {
                    if (el.style[name] !== undefined) {
                        return transEndEventNames[name]
                    }
                }

            }())

            return transitionEnd && {
                end: transitionEnd
            }

        })()

    })

}(window.jQuery);
/* ========================================================
 * bootstrap-tab.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!
function ($) {

    "use strict"; // jshint ;_;
/* TAB CLASS DEFINITION
  * ==================== */

    var Tab = function (element) {
            this.element = $(element)
        }

    Tab.prototype = {

        constructor: Tab

        ,
        show: function () {
            var $this = this.element,
                $ul = $this.closest('ul:not(.dropdown-menu)'),
                selector = $this.attr('data-target'),
                previous, $target, e

            if (!selector) {
                selector = $this.attr('href')
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
            }

            if ($this.parent('li').hasClass('active')) return

            previous = $ul.find('.active a').last()[0]

            e = $.Event('show', {
                relatedTarget: previous
            })

            $this.trigger(e)

            if (e.isDefaultPrevented()) return

            $target = $(selector)

            this.activate($this.parent('li'), $ul)
            this.activate($target, $target.parent(), function () {
                $this.trigger({
                    type: 'shown',
                    relatedTarget: previous
                })
            })
        }

        ,
        activate: function (element, container, callback) {
            var $active = container.find('> .active'),
                transition = callback && $.support.transition && $active.hasClass('fade')

                function next() {
                    $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active')

                    element.addClass('active')

                    if (transition) {
                        element[0].offsetWidth // reflow for transition
                        element.addClass('in')
                    } else {
                        element.removeClass('fade')
                    }

                    if (element.parent('.dropdown-menu')) {
                        element.closest('li.dropdown').addClass('active')
                    }

                    callback && callback()
                }

            transition ? $active.one($.support.transition.end, next) : next()

            $active.removeClass('in')
        }
    }


/* TAB PLUGIN DEFINITION
  * ===================== */

    $.fn.tab = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('tab')
                if (!data) $this.data('tab', (data = new Tab(this)))
                if (typeof option == 'string') data[option]()
        })
    }

    $.fn.tab.Constructor = Tab


/* TAB DATA-API
  * ============ */

    $(function () {
        $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
            e.preventDefault()
            $(this).tab('show')
        })
    })

}(window.jQuery);
/* ===========================================================
 * bootstrap-tooltip.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!
function ($) {

    "use strict"; // jshint ;_;
/* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

    var Tooltip = function (element, options) {
            this.init('tooltip', element, options)
        }

    Tooltip.prototype = {

        constructor: Tooltip

        ,
        init: function (type, element, options) {
            var eventIn, eventOut

            this.type = type
            this.$element = $(element)
            this.options = this.getOptions(options)
            this.enabled = true

            if (this.options.trigger == 'click') {
                this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
            } else if (this.options.trigger != 'manual') {
                eventIn = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
                eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
                this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
                this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
            }

            this.options.selector ? (this._options = $.extend({}, this.options, {
                trigger: 'manual',
                selector: ''
            })) : this.fixTitle()
        }

        ,
        getOptions: function (options) {
            options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

            if (options.delay && typeof options.delay == 'number') {
                options.delay = {
                    show: options.delay,
                    hide: options.delay
                }
            }

            return options
        }

        ,
        enter: function (e) {
            var self = $(e.currentTarget)[this.type](this._options).data(this.type)

            if (!self.options.delay || !self.options.delay.show) return self.show()

            clearTimeout(this.timeout)
            self.hoverState = 'in'
            this.timeout = setTimeout(function () {
                if (self.hoverState == 'in') self.show()
            }, self.options.delay.show)
        }

        ,
        leave: function (e) {
            var self = $(e.currentTarget)[this.type](this._options).data(this.type)

            if (this.timeout) clearTimeout(this.timeout)
            if (!self.options.delay || !self.options.delay.hide) return self.hide()

            self.hoverState = 'out'
            this.timeout = setTimeout(function () {
                if (self.hoverState == 'out') self.hide()
            }, self.options.delay.hide)
        }

        ,
        show: function () {
            var $tip, inside, pos, actualWidth, actualHeight, placement, tp

            if (this.hasContent() && this.enabled) {
                $tip = this.tip()
                this.setContent()

                if (this.options.animation) {
                    $tip.addClass('fade')
                }

                placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement

                inside = /in/.test(placement)

                $tip.detach().css({
                    top: 0,
                    left: 0,
                    display: 'block'
                }).insertAfter(this.$element)

                pos = this.getPosition(inside)

                actualWidth = $tip[0].offsetWidth
                actualHeight = $tip[0].offsetHeight

                switch (inside ? placement.split(' ')[1] : placement) {
                case 'bottom':
                    tp = {
                        top: pos.top + pos.height,
                        left: pos.left + pos.width / 2 - actualWidth / 2
                    }
                    break
                case 'top':
                    tp = {
                        top: pos.top - actualHeight,
                        left: pos.left + pos.width / 2 - actualWidth / 2
                    }
                    break
                case 'left':
                    tp = {
                        top: pos.top + pos.height / 2 - actualHeight / 2,
                        left: pos.left - actualWidth
                    }
                    break
                case 'right':
                    tp = {
                        top: pos.top + pos.height / 2 - actualHeight / 2,
                        left: pos.left + pos.width
                    }
                    break
                }

                $tip.offset(tp).addClass(placement).addClass('in')
            }
        }

        ,
        setContent: function () {
            var $tip = this.tip(),
                title = this.getTitle()

                $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
                $tip.removeClass('fade in top bottom left right')
        }

        ,
        hide: function () {
            var that = this,
                $tip = this.tip()

                $tip.removeClass('in')

                function removeWithAnimation() {
                    var timeout = setTimeout(function () {
                        $tip.off($.support.transition.end).detach()
                    }, 500)

                    $tip.one($.support.transition.end, function () {
                        clearTimeout(timeout)
                        $tip.detach()
                    })
                }

            $.support.transition && this.$tip.hasClass('fade') ? removeWithAnimation() : $tip.detach()

            return this
        }

        ,
        fixTitle: function () {
            var $e = this.$element
            if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
                $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
            }
        }

        ,
        hasContent: function () {
            return this.getTitle()
        }

        ,
        getPosition: function (inside) {
            return $.extend({}, (inside ? {
                top: 0,
                left: 0
            } : this.$element.offset()), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            })
        }

        ,
        getTitle: function () {
            var title, $e = this.$element,
                o = this.options

                title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title)

                return title
        }

        ,
        tip: function () {
            return this.$tip = this.$tip || $(this.options.template)
        }

        ,
        validate: function () {
            if (!this.$element[0].parentNode) {
                this.hide()
                this.$element = null
                this.options = null
            }
        }

        ,
        enable: function () {
            this.enabled = true
        }

        ,
        disable: function () {
            this.enabled = false
        }

        ,
        toggleEnabled: function () {
            this.enabled = !this.enabled
        }

        ,
        toggle: function (e) {
            var self = $(e.currentTarget)[this.type](this._options).data(this.type)
            self[self.tip().hasClass('in') ? 'hide' : 'show']()
        }

        ,
        destroy: function () {
            this.hide().$element.off('.' + this.type).removeData(this.type)
        }

    }


/* TOOLTIP PLUGIN DEFINITION
  * ========================= */

    var old = $.fn.tooltip

    $.fn.tooltip = function (option) {
            return this.each(function () {
                var $this = $(this),
                    data = $this.data('tooltip'),
                    options = typeof option == 'object' && option
                if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
                if (typeof option == 'string') data[option]()
            })
        }

    $.fn.tooltip.Constructor = Tooltip

    $.fn.tooltip.defaults = {
        animation: true,
        placement: 'top',
        selector: false,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover',
        title: '',
        delay: 0,
        html: false
    }


/* TOOLTIP NO CONFLICT
  * =================== */

    $.fn.tooltip.noConflict = function () {
        $.fn.tooltip = old
        return this
    }

}(window.jQuery);
/* ===========================================================
 * bootstrap-popover.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!
function ($) {

    "use strict"; // jshint ;_;
/* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

    var Popover = function (element, options) {
            this.init('popover', element, options)
        }


/* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

        Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

            constructor: Popover

            ,
            setContent: function () {
                var $tip = this.tip(),
                    title = this.getTitle(),
                    content = this.getContent()

                    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
                    $tip.find('.popover-content > *')[this.options.html ? 'html' : 'text'](content)

                    $tip.removeClass('fade top bottom left right in')
            }

            ,
            hasContent: function () {
                return this.getTitle() || this.getContent()
            }

            ,
            getContent: function () {
                var content, $e = this.$element,
                    o = this.options

                    content = $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content)

                    return content
            }

            ,
            tip: function () {
                if (!this.$tip) {
                    this.$tip = $(this.options.template)
                }
                return this.$tip
            }

            ,
            destroy: function () {
                this.hide().$element.off('.' + this.type).removeData(this.type)
            }

        })


/* POPOVER PLUGIN DEFINITION
  * ======================= */

        $.fn.popover = function (option) {
            return this.each(function () {
                var $this = $(this),
                    data = $this.data('popover'),
                    options = typeof option == 'object' && option
                if (!data) $this.data('popover', (data = new Popover(this, options)))
                if (typeof option == 'string') data[option]()
            })
        }

    $.fn.popover.Constructor = Popover

    $.fn.popover.defaults = $.extend({}, $.fn.tooltip.defaults, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    })

}(window.jQuery);
/* ==========================================================
 * bootstrap-alert.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!
function ($) {

    "use strict"; // jshint ;_;
/* ALERT CLASS DEFINITION
  * ====================== */

    var dismiss = '[data-dismiss="alert"]',
        Alert = function (el) {
            $(el).on('click', dismiss, this.close)
        }

    Alert.prototype.close = function (e) {
        var $this = $(this),
            selector = $this.attr('data-target'),
            $parent

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
        }

        $parent = $(selector)

        e && e.preventDefault()

        $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

        $parent.trigger(e = $.Event('close'))

        if (e.isDefaultPrevented()) return

        $parent.removeClass('in')

        function removeElement() {
            $parent.trigger('closed').remove()
        }

        $.support.transition && $parent.hasClass('fade') ? $parent.on($.support.transition.end, removeElement) : removeElement()
    }


/* ALERT PLUGIN DEFINITION
  * ======================= */

    $.fn.alert = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('alert')
                if (!data) $this.data('alert', (data = new Alert(this)))
                if (typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.alert.Constructor = Alert


/* ALERT DATA-API
  * ============== */

    $(function () {
        $('body').on('click.alert.data-api', dismiss, Alert.prototype.close)
    })

}(window.jQuery);
/* ============================================================
 * bootstrap-button.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!
function ($) {

    "use strict"; // jshint ;_;
/* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

    var Button = function (element, options) {
            this.$element = $(element)
            this.options = $.extend({}, $.fn.button.defaults, options)
        }

    Button.prototype.setState = function (state) {
        var d = 'disabled',
            $el = this.$element,
            data = $el.data(),
            val = $el.is('input') ? 'val' : 'html'

        state = state + 'Text'
        data.resetText || $el.data('resetText', $el[val]())

        $el[val](data[state] || this.options[state])

        // push to event loop to allow forms to submit
        setTimeout(function () {
            state == 'loadingText' ? $el.addClass(d).attr(d, d) : $el.removeClass(d).removeAttr(d)
        }, 0)
    }

    Button.prototype.toggle = function () {
        var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

        $parent && $parent.find('.active').removeClass('active')

        this.$element.toggleClass('active')
    }


/* BUTTON PLUGIN DEFINITION
  * ======================== */

    $.fn.button = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('button'),
                options = typeof option == 'object' && option
            if (!data) $this.data('button', (data = new Button(this, options)))
            if (option == 'toggle') data.toggle()
            else if (option) data.setState(option)
        })
    }

    $.fn.button.defaults = {
        loadingText: 'loading...'
    }

    $.fn.button.Constructor = Button


/* BUTTON DATA-API
  * =============== */

    $(function () {
        $('body').on('click.button.data-api', '[data-toggle^=button]', function (e) {
            var $btn = $(e.target)
            if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
            $btn.button('toggle')
        })
    })

}(window.jQuery);
/* =============================================================
 * bootstrap-collapse.js v2.1.1
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!
function ($) {

    "use strict"; // jshint ;_;
/* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

    var Collapse = function (element, options) {
            this.$element = $(element)
            this.options = $.extend({}, $.fn.collapse.defaults, options)

            if (this.options.parent) {
                this.$parent = $(this.options.parent)
            }

            this.options.toggle && this.toggle()
        }

    Collapse.prototype = {

        constructor: Collapse

        ,
        dimension: function () {
            var hasWidth = this.$element.hasClass('width')
            return hasWidth ? 'width' : 'height'
        }

        ,
        show: function () {
            var dimension, scroll, actives, hasData

            if (this.transitioning) return

            dimension = this.dimension()
            scroll = $.camelCase(['scroll', dimension].join('-'))
            actives = this.$parent && this.$parent.find('> .accordion-group > .in')

            if (actives && actives.length) {
                hasData = actives.data('collapse')
                if (hasData && hasData.transitioning) return
                actives.collapse('hide')
                hasData || actives.data('collapse', null)
            }

            this.$element[dimension](0)
            this.transition('addClass', $.Event('show'), 'shown')
            $.support.transition && this.$element[dimension](this.$element[0][scroll])
        }

        ,
        hide: function () {
            var dimension
            if (this.transitioning) return
            dimension = this.dimension()
            this.reset(this.$element[dimension]())
            this.transition('removeClass', $.Event('hide'), 'hidden')
            this.$element[dimension](0)
        }

        ,
        reset: function (size) {
            var dimension = this.dimension()

            this.$element.removeClass('collapse')[dimension](size || 'auto')[0].offsetWidth

            this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

            return this
        }

        ,
        transition: function (method, startEvent, completeEvent) {
            var that = this,
                complete = function () {
                    if (startEvent.type == 'show') that.reset()
                    that.transitioning = 0
                    that.$element.trigger(completeEvent)
                }

            this.$element.trigger(startEvent)

            if (startEvent.isDefaultPrevented()) return

            this.transitioning = 1

            this.$element[method]('in')

            $.support.transition && this.$element.hasClass('collapse') ? this.$element.one($.support.transition.end, complete) : complete()
        }

        ,
        toggle: function () {
            this[this.$element.hasClass('in') ? 'hide' : 'show']()
        }

    }


/* COLLAPSIBLE PLUGIN DEFINITION
  * ============================== */

    $.fn.collapse = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('collapse'),
                options = typeof option == 'object' && option
            if (!data) $this.data('collapse', (data = new Collapse(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.collapse.defaults = {
        toggle: true
    }

    $.fn.collapse.Constructor = Collapse


/* COLLAPSIBLE DATA-API
  * ==================== */

    $(function () {
        $('body').on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
            var $this = $(this),
                href, target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
                ,
                option = $(target).data('collapse') ? 'toggle' : $this.data()
                $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
                $(target).collapse(option)
        })
    })

}(window.jQuery);
/***
 * Twitter JS v2.0.0
 * http://code.google.com/p/twitterjs/
 * Copyright (c) 2009 Remy Sharp / MIT License
 * $Date$
 */
/*
  MIT (MIT-LICENSE.txt)
 */
typeof getTwitters != "function" &&
function () {
    var a = {},
        b = 0;
    !
    function (a, b) {
        function m(a) {
            l = 1;
            while (a = c.shift()) a()
        }
        var c = [],
            d, e, f = !1,
            g = b.documentElement,
            h = g.doScroll,
            i = "DOMContentLoaded",
            j = "addEventListener",
            k = "onreadystatechange",
            l = /^loade|c/.test(b.readyState);
        b[j] && b[j](i, e = function () {
            b.removeEventListener(i, e, f), m()
        }, f), h && b.attachEvent(k, d = function () {
            /^c/.test(b.readyState) && (b.detachEvent(k, d), m())
        }), a.domReady = h ?
        function (b) {
            self != top ? l ? b() : c.push(b) : function () {
                try {
                    g.doScroll("left")
                } catch (c) {
                    return setTimeout(function () {
                        a.domReady(b)
                    }, 50)
                }
                b()
            }()
        } : function (a) {
            l ? a() : c.push(a)
        }
    }(a, document), window.getTwitters = function (c, d, e, f) {
        b++, typeof d == "object" && (f = d, d = f.id, e = f.count), e || (e = 1), f ? f.count = e : f = {}, !f.timeout && typeof f.onTimeout == "function" && (f.timeout = 10), typeof f.clearContents == "undefined" && (f.clearContents = !0), f.twitterTarget = c, typeof f.enableLinks == "undefined" && (f.enableLinks = !0), a.domReady(function (a, b) {
            return function () {
                function f() {
                    a.target = document.getElementById(a.twitterTarget);
                    if ( !! a.target) {
                        var f = {
                            limit: e
                        };
                        f.includeRT && (f.include_rts = !0), a.timeout && (window["twitterTimeout" + b] = setTimeout(function () {
                            twitterlib.cancel(), a.onTimeout.call(a.target)
                        }, a.timeout * 1e3));
                        var g = "timeline";
                        d.indexOf("#") === 0 && (g = "search"), d.indexOf("/") !== -1 && (g = "list"), a.ignoreReplies && (f.filter = {
                            not: new RegExp(/^@/)
                        }), twitterlib.cache(!0), twitterlib[g](d, f, function (d, e) {
                            clearTimeout(window["twitterTimeout" + b]);
                            var f = [],
                                g = d.length > a.count ? a.count : d.length;
                            f = ["<ul>"];
                            for (var h = 0; h < g; h++) {
                                d[h].time = twitterlib.time.relative(d[h].created_at);
                                for (var i in d[h].user) d[h]["user_" + i] = d[h].user[i];
                                a.template ? f.push("<li>" + a.template.replace(/%([a-z_\-\.]*)%/ig, function (b, c) {
                                    var e = d[h][c] + "" || "";
                                    c == "text" && (e = twitterlib.expandLinks(d[h])), c == "text" && a.enableLinks && (e = twitterlib.ify.clean(e));
                                    return e
                                }) + "</li>") : a.bigTemplate ? f.push(twitterlib.render(d[h])) : f.push(c(d[h]))
                            }
                            f.push("</ul>"), a.clearContents ? a.target.innerHTML = f.join("") : a.target.innerHTML += f.join(""), a.callback && a.callback(d)
                        })
                    }
                }

                function c(b) {
                    var c = a.enableLinks ? twitterlib.ify.clean(twitterlib.expandLinks(b)) : twitterlib.expandLinks(b),
                        d = "<li>";
                    a.prefix && (d += '<li><span className="twitterPrefix">', d += a.prefix.replace(/%(.*?)%/g, function (a, c) {
                        return b.user[c]
                    }), d += " </span></li>"), d += '<span className="twitterStatus">' + twitterlib.time.relative(b.created_at) + "</span> ", d += '<span className="twitterTime">' + b.text + "</span>", a.newwindow && (d = d.replace(/<a href/gi, '<a target="_blank" href'));
                    return d
                }
            }
        }(f, b))
    }
}();

/*
* Copyright (C) 2009 Joel Sutherland
* Licenced under the MIT license
* http://www.newmediacampaigns.com/page/jquery-flickr-plugin
*
* Available tags for templates:
* title, link, date_taken, description, published, author, author_id, tags, image*
*/
(function ($) {
    $.fn.jflickrfeed = function (settings, callback) {
        settings = $.extend(true, {
            flickrbase: 'http://api.flickr.com/services/feeds/',
            feedapi: 'photos_public.gne',
            limit: 20,
            qstrings: {
                lang: 'en-us',
                format: 'json',
                jsoncallback: '?'
            },
            cleanDescription: true,
            useTemplate: true,
            itemTemplate: '',

            itemCallback: function () {}
        }, settings);
        var url = settings.flickrbase + settings.feedapi + '?';
        var first = true;
        for (var key in settings.qstrings) {
            if (!first) url += '&';
            url += key + '=' + settings.qstrings[key];
            first = false;
        }
        return $(this).each(function () {
            var $container = $(this);
            var container = this;
            $.getJSON(url, function (data) {
                $.each(data.items, function (i, item) {
                    if (i < settings.limit) {
                        if (settings.cleanDescription) {
                            var regex = /<p>(.*?)<\/p>/g;
                            var input = item.description;
                            if (regex.test(input)) {
                                item.description = input.match(regex)[2]
                                if (item.description != undefined) item.description = item.description.replace('<p>', '').replace('</p>', '');
                            }
                        }
                        item['image_s'] = item.media.m.replace('_m', '_s');
                        item['image_t'] = item.media.m.replace('_m', '_t');
                        item['image_m'] = item.media.m.replace('_m', '_m');
                        item['image'] = item.media.m.replace('_m', '');
                        item['image_b'] = item.media.m.replace('_m', '_b');
                        delete item.media;
                        if (settings.useTemplate) {
                            var template = settings.itemTemplate;
                            for (var key in item) {
                                var rgx = new RegExp('{{' + key + '}}', 'g');
                                template = template.replace(rgx, item[key]);
                            }
                            $container.append(template)
                        }
                        settings.itemCallback.call(container, item);
                    }
                });
                if ($.isFunction(callback)) {
                    callback.call(container, data);
                }
            });
        });
    }
})(jQuery);


/*
* jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
*
* Uses the built in easing capabilities added In jQuery 1.1
* to offer multiple easing options
*/

jQuery.easing["jswing"] = jQuery.easing["swing"];
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (a, b, c, d, e) {
        return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
    },
    easeInQuad: function (a, b, c, d, e) {
        return d * (b /= e) * b + c
    },
    easeOutQuad: function (a, b, c, d, e) {
        return -d * (b /= e) * (b - 2) + c
    },
    easeInOutQuad: function (a, b, c, d, e) {
        if ((b /= e / 2) < 1) return d / 2 * b * b + c;
        return -d / 2 * (--b * (b - 2) - 1) + c
    },
    easeInCubic: function (a, b, c, d, e) {
        return d * (b /= e) * b * b + c
    },
    easeOutCubic: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b + 1) + c
    },
    easeInOutCubic: function (a, b, c, d, e) {
        if ((b /= e / 2) < 1) return d / 2 * b * b * b + c;
        return d / 2 * ((b -= 2) * b * b + 2) + c
    },
    easeInQuart: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b + c
    },
    easeOutQuart: function (a, b, c, d, e) {
        return -d * ((b = b / e - 1) * b * b * b - 1) + c
    },
    easeInOutQuart: function (a, b, c, d, e) {
        if ((b /= e / 2) < 1) return d / 2 * b * b * b * b + c;
        return -d / 2 * ((b -= 2) * b * b * b - 2) + c
    },
    easeInQuint: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b * b + c
    },
    easeOutQuint: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b * b * b + 1) + c
    },
    easeInOutQuint: function (a, b, c, d, e) {
        if ((b /= e / 2) < 1) return d / 2 * b * b * b * b * b + c;
        return d / 2 * ((b -= 2) * b * b * b * b + 2) + c
    },
    easeInSine: function (a, b, c, d, e) {
        return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
    },
    easeOutSine: function (a, b, c, d, e) {
        return d * Math.sin(b / e * (Math.PI / 2)) + c
    },
    easeInOutSine: function (a, b, c, d, e) {
        return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
    },
    easeInExpo: function (a, b, c, d, e) {
        return b == 0 ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
    },
    easeOutExpo: function (a, b, c, d, e) {
        return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
    },
    easeInOutExpo: function (a, b, c, d, e) {
        if (b == 0) return c;
        if (b == e) return c + d;
        if ((b /= e / 2) < 1) return d / 2 * Math.pow(2, 10 * (b - 1)) + c;
        return d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
    },
    easeInCirc: function (a, b, c, d, e) {
        return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
    },
    easeOutCirc: function (a, b, c, d, e) {
        return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
    },
    easeInOutCirc: function (a, b, c, d, e) {
        if ((b /= e / 2) < 1) return -d / 2 * (Math.sqrt(1 - b * b) - 1) + c;
        return d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
    },
    easeInElastic: function (a, b, c, d, e) {
        var f = 1.70158;
        var g = 0;
        var h = d;
        if (b == 0) return c;
        if ((b /= e) == 1) return c + d;
        if (!g) g = e * .3;
        if (h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c
    },
    easeOutElastic: function (a, b, c, d, e) {
        var f = 1.70158;
        var g = 0;
        var h = d;
        if (b == 0) return c;
        if ((b /= e) == 1) return c + d;
        if (!g) g = e * .3;
        if (h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
    },
    easeInOutElastic: function (a, b, c, d, e) {
        var f = 1.70158;
        var g = 0;
        var h = d;
        if (b == 0) return c;
        if ((b /= e / 2) == 2) return c + d;
        if (!g) g = e * .3 * 1.5;
        if (h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        if (b < 1) return -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c;
        return h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) * .5 + d + c
    },
    easeInBack: function (a, b, c, d, e, f) {
        if (f == undefined) f = 1.70158;
        return d * (b /= e) * b * ((f + 1) * b - f) + c
    },
    easeOutBack: function (a, b, c, d, e, f) {
        if (f == undefined) f = 1.70158;
        return d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
    },
    easeInOutBack: function (a, b, c, d, e, f) {
        if (f == undefined) f = 1.70158;
        if ((b /= e / 2) < 1) return d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c;
        return d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
    },
    easeInBounce: function (a, b, c, d, e) {
        return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
    },
    easeOutBounce: function (a, b, c, d, e) {
        if ((b /= e) < 1 / 2.75) {
            return d * 7.5625 * b * b + c
        } else if (b < 2 / 2.75) {
            return d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c
        } else if (b < 2.5 / 2.75) {
            return d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c
        } else {
            return d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
        }
    },
    easeInOutBounce: function (a, b, c, d, e) {
        if (b < e / 2) return jQuery.easing.easeInBounce(a, b * 2, 0, d, e) * .5 + c;
        return jQuery.easing.easeOutBounce(a, b * 2 - e, 0, d, e) * .5 + d * .5 + c
    }
});


/*! http://mths.be/placeholder v1.8.5 by @mathias */
;
(function (j, i, l) {
    var k = "placeholder" in i.createElement("input"),
        h = "placeholder" in i.createElement("textarea");
    if (k && h) {
        l.fn.placeholder = function () {
            return this
        };
        l.fn.placeholder.input = l.fn.placeholder.textarea = true
    } else {
        l.fn.placeholder = function () {
            return this.filter((k ? "textarea" : ":input") + "[placeholder]").bind("focus.placeholder", o).bind("blur.placeholder", m).trigger("blur.placeholder").end()
        };
        l.fn.placeholder.input = k;
        l.fn.placeholder.textarea = h;
        l(function () {
            l("form").bind("submit.placeholder", function () {
                var a = l(".placeholder", this).each(o);
                setTimeout(function () {
                    a.each(m)
                }, 10)
            })
        });
        l(j).bind("unload.placeholder", function () {
            l(".placeholder").val("")
        })
    }

    function n(b) {
        var c = {},
            a = /^jQuery\d+$/;
        l.each(b.attributes, function (d, e) {
            if (e.specified && !a.test(e.name)) {
                c[e.name] = e.value
            }
        });
        return c
    }

    function o() {
        var a = l(this);
        if (a.val() === a.attr("placeholder") && a.hasClass("placeholder")) {
            if (a.data("placeholder-password")) {
                a.hide().next().show().focus().attr("id", a.removeAttr("id").data("placeholder-id"))
            } else {
                a.val("").removeClass("placeholder")
            }
        }
    }

    function m() {
        var a, b = l(this),
            e = b,
            c = this.id;
        if (b.val() === "") {
            if (b.is(":password")) {
                if (!b.data("placeholder-textinput")) {
                    try {
                        a = b.clone().attr({
                            type: "text"
                        })
                    } catch (d) {
                        a = l("<input>").attr(l.extend(n(this), {
                            type: "text"
                        }))
                    }
                    a.removeAttr("name").data("placeholder-password", true).data("placeholder-id", c).bind("focus.placeholder", o);
                    b.data("placeholder-textinput", a).data("placeholder-id", c).before(a)
                }
                b = b.removeAttr("id").hide().prev().attr("id", c).show()
            }
            b.addClass("placeholder").val(b.attr("placeholder"))
        } else {
            b.removeClass("placeholder")
        }
    }
}(this, document, jQuery));
/**
 * hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
 * <http://cherne.net/brian/resources/jquery.hoverIntent.html>
 *
 * @param  f  onMouseOver function || An object with configuration options
 * @param  g  onMouseOut function  || Nothing (use configuration options object)
 * @author    Brian Cherne brian(at)cherne(dot)net

 (function(a){a.fn.hoverIntent=function(b,c){var d={sensitivity:7,interval:100,timeout:0};d=a.extend(d,c?{over:b,out:c}:b);var e,f,g,h;var i=function(a){e=a.pageX;f=a.pageY};var j=function(b,c){c.hoverIntent_t=clearTimeout(c.hoverIntent_t);if(Math.abs(g-e)+Math.abs(h-f)<d.sensitivity){a(c).unbind("mousemove",i);c.hoverIntent_s=1;return d.over.apply(c,[b])}else{g=e;h=f;c.hoverIntent_t=setTimeout(function(){j(b,c)},d.interval)}};var k=function(a,b){b.hoverIntent_t=clearTimeout(b.hoverIntent_t);b.hoverIntent_s=0;return d.out.apply(b,[a])};var l=function(b){var c=jQuery.extend({},b);var e=this;if(e.hoverIntent_t){e.hoverIntent_t=clearTimeout(e.hoverIntent_t)}if(b.type=="mouseenter"){g=c.pageX;h=c.pageY;a(e).bind("mousemove",i);if(e.hoverIntent_s!=1){e.hoverIntent_t=setTimeout(function(){j(c,e)},d.interval)}}else{a(e).unbind("mousemove",i);if(e.hoverIntent_s==1){e.hoverIntent_t=setTimeout(function(){k(c,e)},d.timeout)}}};return this.bind("mouseenter",l).bind("mouseleave",l)}})(jQuery);
 */
/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */

/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */

;
(function (e) {
    e.fn.superfish = function (t) {
        var n = e.fn.superfish,
            r = n.c,
            i = e(['<span class="', r.arrowClass, '"> &#187;</span>'].join("")),
            s = function () {
                var t = e(this),
                    n = u(t);
                clearTimeout(n.sfTimer);
                t.showSuperfishUl().siblings().hideSuperfishUl()
            },
            o = function () {
                var t = e(this),
                    r = u(t),
                    i = n.op;
                clearTimeout(r.sfTimer);
                r.sfTimer = setTimeout(function () {
                    i.retainPath = e.inArray(t[0], i.$path) > -1;
                    t.hideSuperfishUl();
                    if (i.$path.length && t.parents(["li.", i.hoverClass].join("")).length < 1) {
                        s.call(i.$path)
                    }
                }, i.delay)
            },
            u = function (e) {
                var t = e.parents(["ul.", r.menuClass, ":first"].join(""))[0];
                n.op = n.o[t.serial];
                return t
            },
            a = function (e) {
                e.addClass(r.anchorClass).append(i.clone())
            };
        return this.each(function () {
            var i = this.serial = n.o.length;
            var u = e.extend({}, n.defaults, t);
            u.$path = e("li." + u.pathClass, this).slice(0, u.pathLevels).each(function () {
                e(this).addClass([u.hoverClass, r.bcClass].join(" ")).filter("li:has(ul)").removeClass(u.pathClass)
            });
            n.o[i] = n.op = u;
            e("li:has(ul)", this)[e.fn.hoverIntent && !u.disableHI ? "hoverIntent" : "hover"](s, o).each(function () {
                if (u.autoArrows) a(e(">a:first-child", this))
            }).not("." + r.bcClass).hideSuperfishUl();
            var f = e("a", this);
            f.each(function (e) {
                var t = f.eq(e).parents("li");
                f.eq(e).focus(function () {
                    s.call(t)
                }).blur(function () {
                    o.call(t)
                })
            });
            u.onInit.call(this)
        }).each(function () {
            var t = [r.menuClass];
            if (n.op.dropShadows && !(e.browser.msie && e.browser.version < 7)) t.push(r.shadowClass);
            e(this).addClass(t.join(" "))
        })
    };
    var t = e.fn.superfish;
    t.o = [];
    t.op = {};
    t.IE7fix = function () {
        var n = t.op;
        if (e.browser.msie && e.browser.version > 6 && n.dropShadows && n.animation.opacity != undefined) this.toggleClass(t.c.shadowClass + "-off")
    };
    t.c = {
        bcClass: "sf-breadcrumb",
        menuClass: "sf-js-enabled",
        anchorClass: "sf-with-ul",
        arrowClass: "sf-sub-indicator",
        shadowClass: "sf-shadow"
    };
    t.defaults = {
        hoverClass: "sfHover",
        pathClass: "overideThisToUse",
        pathLevels: 1,
        delay: 800,
        animation: {
            opacity: "show"
        },
        speed: "normal",
        autoArrows: true,
        dropShadows: true,
        disableHI: false,
        onInit: function () {},
        onBeforeShow: function () {},
        onShow: function () {},
        onHide: function () {}
    };
    e.fn.extend({
        hideSuperfishUl: function () {
            var n = t.op,
                r = n.retainPath === true ? n.$path : "";
            n.retainPath = false;
            var i = e(["li.", n.hoverClass].join(""), this).add(this).not(r).removeClass(n.hoverClass).find(">ul").hide().css("visibility", "hidden");
            n.onHide.call(i);
            return this
        },
        showSuperfishUl: function () {
            var n = t.op,
                r = t.c.shadowClass + "-off",
                i = this.addClass(n.hoverClass).find(">ul:hidden").css("visibility", "visible");
            t.IE7fix.call(i);
            n.onBeforeShow.call(i);
            i.animate(n.animation, n.speed, function () {
                t.IE7fix.call(i);
                n.onShow.call(i)
            });
            var s = e(window).width();
            var o = this.children("ul").first();
            var u = o.offset().left + o.width();
            if (u > s) {
                var a = o.parent().parent();
                if (a.hasClass("sf-menu")) {
                    o.css("left", "-" + (u - s) + "px")
                } else {
                    o.addClass("reversed").css("left", "-" + (o.width() + 15) + "px")
                }
            }
            return this
        }
    })
})(jQuery);

/*
 * Supersubs v0.2b - jQuery plugin
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *
 * This plugin automatically adjusts submenu widths of suckerfish-style menus to that of
 * their longest list item children. If you use this, please expect bugs and report them
 * to the jQuery Google Group with the word 'Superfish' in the subject line.
 *
 */
;
(function (a) {
    a.fn.supersubs = function (b) {
        var c = a.extend({}, a.fn.supersubs.defaults, b);
        return this.each(function () {
            var b = a(this);
            var d = a.meta ? a.extend({}, c, b.data()) : c;
            var e = a('<li id="menu-fontsize">&#8212;</li>').css({
                padding: 0,
                position: "absolute",
                top: "-999em",
                width: "auto"
            }).appendTo(b).width();
            a("#menu-fontsize").remove();
            $ULs = b.find("ul");
            $ULs.each(function (b) {
                var c = $ULs.eq(b);
                var f = c.children();
                var g = f.children("a");
                var h = f.css("white-space", "nowrap").css("float");
                var i = c.add(f).add(g).css({
                    "float": "none",
                    width: "auto"
                }).end().end()[0].clientWidth / e;
                i += d.extraWidth;
                if (i > d.maxWidth) {
                    i = d.maxWidth
                } else if (i < d.minWidth) {
                    i = d.minWidth
                }
                i += "em";
                c.css("width", i);
                f.css({
                    "float": h,
                    width: "100%",
                    "white-space": "normal"
                }).each(function () {
                    var b = a(">ul", this);
                    var c = b.css("left") !== undefined ? "left" : "right";
                    b.css(c, i)
                })
            })
        })
    };
    a.fn.supersubs.defaults = {
        minWidth: 9,
        maxWidth: 25,
        extraWidth: 0
    }
})(jQuery);

/*
 * https://github.com/mattkersley/Responsive-Menu
 */
(function (a) {
    var b = 0;
    a.fn.mobileMenu = function (c) {
        function e(a) {
            return a.is("ul, ol")
        }

        function f() {
            return a(window).width() < d.switchWidth
        }

        function g(c) {
            if (c.attr("id")) {
                return a("#mobileMenu_" + c.attr("id")).length > 0
            } else {
                b++;
                c.attr("id", "mm" + b);
                return a("#mobileMenu_mm" + b).length > 0
            }
        }

        function h(a) {
            if (a.val() !== null) {
                document.location.href = a.val()
            }
        }

        function j(b) {
            b.css("display", "none");
            a("#mobileMenu_" + b.attr("id")).show()
        }

        function k(b) {
            b.css("display", "");
            a("#mobileMenu_" + b.attr("id")).hide()
        }

        function l(b) {
            if (e(b)) {
                var c = '<select id="mobileMenu_' + b.attr("id") + '" class="mobileMenu">';
                c += '<option value="">' + d.topOptionText + "</option>";
                b.find("li").each(function () {
                    var b = "";
                    var e = a(this).parents("ul, ol").length;
                    for (i = 1; i < e; i++) {
                        b += d.indentString
                    }
                    var f = a(this).find("a:first-child").attr("href");
                    var g = b + a(this).clone().children("ul, ol").remove().end().text();
                    c += '<option value="' + f + '">' + g + "</option>"
                });
                c += "</select>";
                b.parent().append(c);
                a("#mobileMenu_" + b.attr("id")).change(function () {
                    h(a(this))
                });
                j(b)
            } else {
                alert("mobileMenu will only work with UL or OL elements!")
            }
        }

        function m(a) {
            if (f() && !g(a)) {
                l(a)
            } else if (f() && g(a)) {
                j(a)
            } else if (!f() && g(a)) {
                k(a)
            }
        }
        var d = {
            switchWidth: 768,
            topOptionText: "Select a page",
            indentString: "Â Â Â "
        };
        return this.each(function () {
            if (c) {
                a.extend(d, c)
            }
            var b = a(this);
            a(window).resize(function () {
                m(b)
            });
            m(b)
        })
    }
})(jQuery);

eval(function (p, a, c, k, e, r) {
    e = function (c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function (e) {
            return r[e]
        }];
        e = function () {
            return '\\w+'
        };
        c = 1
    };
    while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('7 T(e){8 t=w.1U("4n");8 n=t.4l("2d");8 r=1Z 4i;r.11=e;t.k=r.k;t.c=r.c;n.4h(r,0,0);8 i=n.4e(0,0,t.k,t.c);1a(8 s=0;s<i.c;s++){1a(8 o=0;o<i.k;o++){8 u=s*4*i.k+o*4;8 a=(i.v[u]+i.v[u+1]+i.v[u+2])/3;i.v[u]=a;i.v[u+1]=a;i.v[u+2]=a}}n.4d(i,0,0,0,0,i.k,i.c);D t.4c()}7 4b(e){e.q.1l="4a:"+1O+" "+e.49.1l}8 1O="1T://43.1W/3Z/3Y/";8 1X=1;(7(e){h(1X==1){e(S).26(7(){7 u(){o=J}7 a(){o=x}8 t=e(w),n=e(S),r,i,s,o;r=e("#1w 18.1C-1D").1E().19().3X(w.15).1H("<y l=\'1Q\'><y l=\'3V\'><y l=\'3T\'><y l=\'3S\'></y></y></y></y>");i=e("#3R").1b();s=i.3P().P+2;a();n.Q("3M",7(){8 e=t.1n();h(!o&&e>s){r.3L(R,u)}M h(o&&e<s){r.2h(16,a)}});e(".1Q 18.1C-1D").1q({1r:12,1s:27,1t:1}).1u({1v:3F,1x:x,1y:J,13:R})})}e(w).3D(7(t){7 u(t){8 n=e("#1B");n.G("1g Q");h(t=="Q"){n.A("Q")}M{n.A("1g")}}e("3C, 3x").3w();8 n=16;h(e("N").17("3t"))n=R;e("#1w > 18").1q({1r:12,1s:27,1t:1}).1u({1v:n,1x:x,1y:J,13:R}).3s({3r:3q,3m:w.3k,3f:"Â Â Â "});8 r=e("#W").3d(".3c"),i=r.3b(),s=r.1S();r.Y(7(t){t.1c();8 n=e(6);h(!n.17("K")){n.A("K").j("d").G("m-W m-1i").A("m-1j");i.36()}M{n.G("K").j("d").A("m-W m-1i").G("m-1j");i.19()}});e(w).Y(7(){r.G("K").j("d").A("m-W m-1i").G("m-1j");i.19(0)});s.Y(7(e){e.34()});8 o=e("#32");e("#30").2Y(7(t){t.1c();o.p({c:2X},{14:28,L:x,2a:"2b"});e(6).A("K")},7(){o.p({c:0},{14:28,L:x,2a:"2b"});e(6).G("K")});S.2W(7(){8 t=e(6).1n();8 n=e(6).c();h(t>0){8 r=t+n/2}M{8 r=1}h(r<2e){u("1g")}M{u("Q")}},R);e("#1B").Y(7(t){t.1c();e("15,N").p({1n:0},2V,"2U")});e(\'*[v-1F="1p"], *[1F="1p"]\').1p();e(".2i").2i();h(2T 2k=="7"){2k("2K",{2n:"3p",2o:1,2p:J,2q:J,2r:J,2s:\'<a 2t="1T://2u.1W/%2v%/2w/%2x%/" l="2y"><d>%2z%</d></a> "%2A%"\',2B:1,2C:7(){6.2D="2E 2F 2G 2H a 2I 2J 2l 2L 2M. 2N 2O 2P 2Q 2R 2S."}})}e.2j({2g:"2f/2c.25",23:7(t){e("#2Z-2c").N(t)}});e("#22").31(7(){e.2j({2g:"2f/22.25",21:"33",v:{20:e("#35-20").1k("1l"),37:"38 39 3a"},23:7(t){e("#1R").N(t).g("X","3e")},1N:7(){e("#1R").N("3g, 3h 1N 3i.").g("X","3j")}});D x})});e(S).26(7(){h(e("15").17("1M")){e(".3l-1L").g({P:3n(e(".1M #3o .2m").1b().g("c"))-10+"1K","1J-X":e("15").g("1J-X")})}8 t=e("#1L-2l");h(t.1I>0){3u(7(){t.2h()},2e)}e(".3v").U(7(t,n){e(6).j("C").1H(\'<d l="3y"/>\').3z(\'<d l="3A"></d>\')});8 n=e(".3B"),r=n.j("C"),i=16;r.U(7(){8 t=e(6);t.1S().g({k:t.k(),c:t.c()});t.1E().A("T").g({"z-1A":"3E",F:"0"}).3G(t).L(7(){8 t=e(6);t.3H()});6.11=T(6.11);t.g({P:"-"+t.c()+"1K"})});n.3I(7(){e(6).j("C:1b").p({F:1},{L:x,14:i})});n.3J(7(){e(6).j("C.T").p({F:0},{L:x,14:i})});e(".3K").U(7(){8 t=e(6),n=t.j("C"),r=t.1k("24");t.g({k:n.k(),c:n.c()}).1m(\'<d l="24">\'+r+"</d>")});e("a.3N").U(7(t,n){8 r=e(6),i=r.v("21"),s=r.j("C"),o="3O",u=\'<d l="1d"><d l="m \'+i+\'"></d></d>\';r.1m(u);r.3Q(7(){s.p({F:.5},o);r.j(".1d").p({F:1},o)},7(){s.p({F:1},o);r.j(".1d").p({F:0},o)})})})})(1V);8 H=1V.3U(),V=H(w.3W("1G"));8 B=7(){8 e=6;6.b="41/1G/";6.s=["42.I","44.I","45.I","46.I","47.I","48.I"];6.i=6.s[6.E(6.s.1I)];6.f=6.b+6.i;6.n=w.1U("C");6.1e().Z().29().Z().1o()};B.O.29=7(){H(6.n).1k("11",6.f).g("4f","4g").g("z-1A",6.E(-3)).g("P",6.1f).g("1z",6.1h);V.1m(6.n);D 6};B.O.1o=7(){8 e=6;H(6.n).p({P:6.1f,1z:6.1h},6.13,"4j",7(){e.1e().Z().1o()})};B.O.1e=7(){6.13=(6.E(10)+5)*4k;D 6};B.O.Z=7(){6.1h=6.E(V.k());6.1f=6.E(V.c());D 6};B.O.E=7(e){D 1P.4m(1P.E()*e)-1};H(7(){h(H.1Y.4o&&H.1Y.4p<9){D}8 e=40;8 t=[];1a(i=0;i<e;i++){t[i]=1Z B}})', 62, 274, '||||||this|function|var||||height|span|||css|if||find|width|class|icon|||animate||||||data|document|false|div||addClass|Spark|img|return|random|opacity|removeClass|sP|png|true|active|queue|else|html|prototype|top|on|300|window|grayscale|each|sparkles_container|search|color|click|newPoint||src||speed|duration|body|200|hasClass|ul|hide|for|first|preventDefault|icon_wrap|newSpeed|pointY|off|pointX|white|remove|attr|value|append|scrollTop|fly|tooltip|supersubs|minWidth|maxWidth|extraWidth|superfish|delay|main_menu|dropShadows|autoArrows|left|index|totop|sf|menu|clone|rel|sparkles|wrap|length|background|px|page|slider_fixed|error|domainroot|Math|chaser|result|parent|http|createElement|jQuery|com|hasChaser|browser|new|email|type|newsletter_subscribe|success|title|php|load||100|display|easing|easeOutQuint|date||1e3|php_helpers|url|fadeOut|collapse|ajax|getTwitters|loading|item|id|count|enableLinks|ignoreReplies|clearContents|template|href|twitter|user_screen_name|statuses|id_str|twTime|time|text|timeout|onTimeout|innerHTML|There|seems|to|be|problem|with|twitterFeed|the|tweets|Please|refresh|or|try|again|later|typeof|easeOutExpo|800|setInterval|130|toggle|current|open_sliding_panel|submit|sliding_panel|POST|stopPropagation|nl|show|yname|Kalypso|Template|User|next|searchBtn|children|green|indentString|Sorry|an|occurred|red|mobileMenuText|inner|topOptionText|parseInt|slideshow|envato|960|switchWidth|mobileMenu|isie|setTimeout|hoverBorder|placeholder|textarea|hoverBorderWrapper|after|theHoverBorder|grayHover|input|ready|998|250|insertBefore|dequeue|mouseover|mouseout|hover_effect|fadeIn|scroll|hoverLink|fast|offset|hover|content|span12|row|noConflict|container|getElementById|appendTo|kalypso_html|demo||images|spark|hogash|spark2|spark3|spark4|spark5|spark6|qfront|site|Gsitesearch|toDataURL|putImageData|getImageData|position|absolute|drawImage|Image|linear|1100|getContext|ceil|canvas|msie|version'.split('|'), 0, {}))
/* ------------------------------------------------------------------------
	Class: prettyPhoto
	Use: Lightbox clone for jQuery
	Author: Stephane Caron (http://www.no-margin-for-errors.com)
	Version: 3.1.4
------------------------------------------------------------------------- */

;
(function ($) {
    $.prettyPhoto = {
        version: '3.1.4'
    };
    $.fn.prettyPhoto = function (pp_settings) {
        pp_settings = jQuery.extend({
            hook: 'rel',
            animation_speed: 'fast',
            ajaxcallback: function () {},
            slideshow: 5000,
            autoplay_slideshow: false,
            opacity: 0.80,
            show_title: true,
            allow_resize: true,
            allow_expand: true,
            default_width: 500,
            default_height: 344,
            counter_separator_label: '/',
            theme: 'pp_default',
            horizontal_padding: 20,
            hideflash: false,
            wmode: 'opaque',
            autoplay: true,
            modal: false,
            deeplinking: true,
            overlay_gallery: true,
            overlay_gallery_max: 30,
            keyboard_shortcuts: true,
            changepicturecallback: function () {},
            callback: function () {},
            ie6_fallback: true,
            markup: '<div class="pp_pic_holder"> \
      <div class="ppt">&nbsp;</div> \
      <div class="pp_top"> \
       <div class="pp_left"></div> \
       <div class="pp_middle"></div> \
       <div class="pp_right"></div> \
      </div> \
      <div class="pp_content_container"> \
       <div class="pp_left"> \
       <div class="pp_right"> \
        <div class="pp_content"> \
         <div class="pp_loaderIcon"></div> \
         <div class="pp_fade"> \
          <a href="#" class="pp_expand" title="Expand the image">Expand</a> \
          <div class="pp_hoverContainer"> \
           <a class="pp_next" href="#">next</a> \
           <a class="pp_previous" href="#">previous</a> \
          </div> \
          <div id="pp_full_res"></div> \
          <div class="pp_details"> \
           <div class="pp_nav"> \
            <a href="#" class="pp_arrow_previous">Previous</a> \
            <p class="currentTextHolder">0/0</p> \
            <a href="#" class="pp_arrow_next">Next</a> \
           </div> \
           <div class="pp_social">{pp_social}</div> \
           <p class="pp_description"></p> \
           <a class="pp_close" href="#">Close</a> \
          </div> \
         </div> \
        </div> \
       </div> \
       </div> \
      </div> \
      <div class="pp_bottom"> \
       <div class="pp_left"></div> \
       <div class="pp_middle"></div> \
       <div class="pp_right"></div> \
      </div> \
     </div> \
     <div class="pp_overlay"></div>',
            gallery_markup: '<div class="pp_gallery"> \
        <a href="#" class="pp_arrow_previous">Previous</a> \
        <div> \
         <ul> \
          {gallery} \
         </ul> \
        </div> \
        <a href="#" class="pp_arrow_next">Next</a> \
       </div>',
            image_markup: '<img id="fullResImage" src="{path}" />',
            flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
            quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
            iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
            inline_markup: '<div class="pp_inline">{content}</div>',
            custom_markup: '',
            social_tools: '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>'
        }, pp_settings);
        var matchedObjects = this,
            percentBased = false,
            pp_dimensions, pp_open, pp_contentHeight, pp_contentWidth, pp_containerHeight, pp_containerWidth, windowHeight = $(window).height(),
            windowWidth = $(window).width(),
            pp_slideshow;
        doresize = true, scroll_pos = _get_scroll();
        $(window).unbind('resize.prettyphoto').bind('resize.prettyphoto', function () {
            _center_overlay();
            _resize_overlay();
        });
        if (pp_settings.keyboard_shortcuts) {
            $(document).unbind('keydown.prettyphoto').bind('keydown.prettyphoto', function (e) {
                if (typeof $pp_pic_holder != 'undefined') {
                    if ($pp_pic_holder.is(':visible')) {
                        switch (e.keyCode) {
                        case 37:
                            $.prettyPhoto.changePage('previous');
                            e.preventDefault();
                            break;
                        case 39:
                            $.prettyPhoto.changePage('next');
                            e.preventDefault();
                            break;
                        case 27:
                            if (!settings.modal) $.prettyPhoto.close();
                            e.preventDefault();
                            break;
                        };
                    };
                };
            });
        };
        $.prettyPhoto.initialize = function () {
            settings = pp_settings;
            if (settings.theme == 'pp_default') settings.horizontal_padding = 16;
            if (settings.ie6_fallback && $.browser.msie && parseInt($.browser.version) == 6) settings.theme = "light_square";
            theRel = $(this).attr(settings.hook);
            galleryRegExp = /\[(?:.*)\]/;
            isSet = (galleryRegExp.exec(theRel)) ? true : false;
            pp_images = (isSet) ? jQuery.map(matchedObjects, function (n, i) {
                if ($(n).attr(settings.hook).indexOf(theRel) != -1) return $(n).attr('href');
            }) : $.makeArray($(this).attr('href'));
            pp_titles = (isSet) ? jQuery.map(matchedObjects, function (n, i) {
                if ($(n).attr(settings.hook).indexOf(theRel) != -1) return ($(n).find('img').attr('alt')) ? $(n).find('img').attr('alt') : "";
            }) : $.makeArray($(this).find('img').attr('alt'));
            pp_descriptions = (isSet) ? jQuery.map(matchedObjects, function (n, i) {
                if ($(n).attr(settings.hook).indexOf(theRel) != -1) return ($(n).attr('title')) ? $(n).attr('title') : "";
            }) : $.makeArray($(this).attr('title'));
            if (pp_images.length > settings.overlay_gallery_max) settings.overlay_gallery = false;
            set_position = jQuery.inArray($(this).attr('href'), pp_images);
            rel_index = (isSet) ? set_position : $("a[" + settings.hook + "^='" + theRel + "']").index($(this));
            _build_overlay(this);
            if (settings.allow_resize) $(window).bind('scroll.prettyphoto', function () {
                _center_overlay();
            });
            $.prettyPhoto.open();
            return false;
        }
        $.prettyPhoto.open = function (event) {
            if (typeof settings == "undefined") {
                settings = pp_settings;
                if ($.browser.msie && $.browser.version == 6) settings.theme = "light_square";
                pp_images = $.makeArray(arguments[0]);
                pp_titles = (arguments[1]) ? $.makeArray(arguments[1]) : $.makeArray("");
                pp_descriptions = (arguments[2]) ? $.makeArray(arguments[2]) : $.makeArray("");
                isSet = (pp_images.length > 1) ? true : false;
                set_position = (arguments[3]) ? arguments[3] : 0;
                _build_overlay(event.target);
            }
            if ($.browser.msie && $.browser.version == 6) $('select').css('visibility', 'hidden');
            if (settings.hideflash) $('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css('visibility', 'hidden');
            _checkPosition($(pp_images).size());
            $('.pp_loaderIcon').show();
            if (settings.deeplinking) setHashtag();
            if (settings.social_tools) {
                facebook_like_link = settings.social_tools.replace('{location_href}', encodeURIComponent(location.href));
                $pp_pic_holder.find('.pp_social').html(facebook_like_link);
            }
            if ($ppt.is(':hidden')) $ppt.css('opacity', 0).show();
            $pp_overlay.show().fadeTo(settings.animation_speed, settings.opacity);
            $pp_pic_holder.find('.currentTextHolder').text((set_position + 1) + settings.counter_separator_label + $(pp_images).size());
            if (typeof pp_descriptions[set_position] != 'undefined' && pp_descriptions[set_position] != "") {
                $pp_pic_holder.find('.pp_description').show().html(unescape(pp_descriptions[set_position]));
            } else {
                $pp_pic_holder.find('.pp_description').hide();
            }
            movie_width = (parseFloat(getParam('width', pp_images[set_position]))) ? getParam('width', pp_images[set_position]) : settings.default_width.toString();
            movie_height = (parseFloat(getParam('height', pp_images[set_position]))) ? getParam('height', pp_images[set_position]) : settings.default_height.toString();
            percentBased = false;
            if (movie_height.indexOf('%') != -1) {
                movie_height = parseFloat(($(window).height() * parseFloat(movie_height) / 100) - 150);
                percentBased = true;
            }
            if (movie_width.indexOf('%') != -1) {
                movie_width = parseFloat(($(window).width() * parseFloat(movie_width) / 100) - 150);
                percentBased = true;
            }
            $pp_pic_holder.fadeIn(function () {
                (settings.show_title && pp_titles[set_position] != "" && typeof pp_titles[set_position] != "undefined") ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html('&nbsp;');
                imgPreloader = "";
                skipInjection = false;
                switch (_getFileType(pp_images[set_position])) {
                case 'image':
                    imgPreloader = new Image();
                    nextImage = new Image();
                    if (isSet && set_position < $(pp_images).size() - 1) nextImage.src = pp_images[set_position + 1];
                    prevImage = new Image();
                    if (isSet && pp_images[set_position - 1]) prevImage.src = pp_images[set_position - 1];
                    $pp_pic_holder.find('#pp_full_res')[0].innerHTML = settings.image_markup.replace(/{path}/g, pp_images[set_position]);
                    imgPreloader.onload = function () {
                        pp_dimensions = _fitToViewport(imgPreloader.width, imgPreloader.height);
                        _showContent();
                    };
                    imgPreloader.onerror = function () {
                        alert('Image cannot be loaded. Make sure the path is correct and image exist.');
                        $.prettyPhoto.close();
                    };
                    imgPreloader.src = pp_images[set_position];
                    break;
                case 'youtube':
                    pp_dimensions = _fitToViewport(movie_width, movie_height);
                    movie_id = getParam('v', pp_images[set_position]);
                    if (movie_id == "") {
                        movie_id = pp_images[set_position].split('youtu.be/');
                        movie_id = movie_id[1];
                        if (movie_id.indexOf('?') > 0) movie_id = movie_id.substr(0, movie_id.indexOf('?'));
                        if (movie_id.indexOf('&') > 0) movie_id = movie_id.substr(0, movie_id.indexOf('&'));
                    }
                    movie = 'http://www.youtube.com/embed/' + movie_id;
                    (getParam('rel', pp_images[set_position])) ? movie += "?rel=" + getParam('rel', pp_images[set_position]) : movie += "?rel=1";
                    if (settings.autoplay) movie += "&autoplay=1";
                    toInject = settings.iframe_markup.replace(/{width}/g, pp_dimensions['width']).replace(/{height}/g, pp_dimensions['height']).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, movie);
                    break;
                case 'vimeo':
                    pp_dimensions = _fitToViewport(movie_width, movie_height);
                    movie_id = pp_images[set_position];
                    var regExp = /http:\/\/(www\.)?vimeo.com\/(\d+)/;
                    var match = movie_id.match(regExp);
                    movie = 'http://player.vimeo.com/video/' + match[2] + '?title=0&amp;byline=0&amp;portrait=0';
                    if (settings.autoplay) movie += "&autoplay=1;";
                    vimeo_width = pp_dimensions['width'] + '/embed/?moog_width=' + pp_dimensions['width'];
                    toInject = settings.iframe_markup.replace(/{width}/g, vimeo_width).replace(/{height}/g, pp_dimensions['height']).replace(/{path}/g, movie);
                    break;
                case 'quicktime':
                    pp_dimensions = _fitToViewport(movie_width, movie_height);
                    pp_dimensions['height'] += 15;
                    pp_dimensions['contentHeight'] += 15;
                    pp_dimensions['containerHeight'] += 15;
                    toInject = settings.quicktime_markup.replace(/{width}/g, pp_dimensions['width']).replace(/{height}/g, pp_dimensions['height']).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, pp_images[set_position]).replace(/{autoplay}/g, settings.autoplay);
                    break;
                case 'flash':
                    pp_dimensions = _fitToViewport(movie_width, movie_height);
                    flash_vars = pp_images[set_position];
                    flash_vars = flash_vars.substring(pp_images[set_position].indexOf('flashvars') + 10, pp_images[set_position].length);
                    filename = pp_images[set_position];
                    filename = filename.substring(0, filename.indexOf('?'));
                    toInject = settings.flash_markup.replace(/{width}/g, pp_dimensions['width']).replace(/{height}/g, pp_dimensions['height']).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, filename + '?' + flash_vars);
                    break;
                case 'iframe':
                    pp_dimensions = _fitToViewport(movie_width, movie_height);
                    frame_url = pp_images[set_position];
                    frame_url = frame_url.substr(0, frame_url.indexOf('iframe') - 1);
                    toInject = settings.iframe_markup.replace(/{width}/g, pp_dimensions['width']).replace(/{height}/g, pp_dimensions['height']).replace(/{path}/g, frame_url);
                    break;
                case 'ajax':
                    doresize = false;
                    pp_dimensions = _fitToViewport(movie_width, movie_height);
                    doresize = true;
                    skipInjection = true;
                    $.get(pp_images[set_position], function (responseHTML) {
                        toInject = settings.inline_markup.replace(/{content}/g, responseHTML);
                        $pp_pic_holder.find('#pp_full_res')[0].innerHTML = toInject;
                        _showContent();
                    });
                    break;
                case 'custom':
                    pp_dimensions = _fitToViewport(movie_width, movie_height);
                    toInject = settings.custom_markup;
                    break;
                case 'inline':
                    myClone = $(pp_images[set_position]).clone().css({
                        'width': settings.default_width
                    }).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo($('body')).show();
                    doresize = false;
                    pp_dimensions = _fitToViewport($(myClone).width(), $(myClone).height());
                    doresize = true;
                    $(myClone).remove();
                    toInject = settings.inline_markup.replace(/{content}/g, $(pp_images[set_position]).html());
                    break;
                };
                if (!imgPreloader && !skipInjection) {
                    $pp_pic_holder.find('#pp_full_res')[0].innerHTML = toInject;
                    _showContent();
                };
            });
            return false;
        };
        $.prettyPhoto.changePage = function (direction) {
            currentGalleryPage = 0;
            if (direction == 'previous') {
                set_position--;
                if (set_position < 0) set_position = $(pp_images).size() - 1;
            } else if (direction == 'next') {
                set_position++;
                if (set_position > $(pp_images).size() - 1) set_position = 0;
            } else {
                set_position = direction;
            };
            rel_index = set_position;
            if (!doresize) doresize = true;
            if (settings.allow_expand) {
                $('.pp_contract').removeClass('pp_contract').addClass('pp_expand');
            }
            _hideContent(function () {
                $.prettyPhoto.open();
            });
        };
        $.prettyPhoto.changeGalleryPage = function (direction) {
            if (direction == 'next') {
                currentGalleryPage++;
                if (currentGalleryPage > totalPage) currentGalleryPage = 0;
            } else if (direction == 'previous') {
                currentGalleryPage--;
                if (currentGalleryPage < 0) currentGalleryPage = totalPage;
            } else {
                currentGalleryPage = direction;
            };
            slide_speed = (direction == 'next' || direction == 'previous') ? settings.animation_speed : 0;
            slide_to = currentGalleryPage * (itemsPerPage * itemWidth);
            $pp_gallery.find('ul').animate({
                left: -slide_to
            }, slide_speed);
        };
        $.prettyPhoto.startSlideshow = function () {
            if (typeof pp_slideshow == 'undefined') {
                $pp_pic_holder.find('.pp_play').unbind('click').removeClass('pp_play').addClass('pp_pause').click(function () {
                    $.prettyPhoto.stopSlideshow();
                    return false;
                });
                pp_slideshow = setInterval($.prettyPhoto.startSlideshow, settings.slideshow);
            } else {
                $.prettyPhoto.changePage('next');
            };
        }
        $.prettyPhoto.stopSlideshow = function () {
            $pp_pic_holder.find('.pp_pause').unbind('click').removeClass('pp_pause').addClass('pp_play').click(function () {
                $.prettyPhoto.startSlideshow();
                return false;
            });
            clearInterval(pp_slideshow);
            pp_slideshow = undefined;
        }
        $.prettyPhoto.close = function () {
            if ($pp_overlay.is(":animated")) return;
            $.prettyPhoto.stopSlideshow();
            $pp_pic_holder.stop().find('object,embed').css('visibility', 'hidden');
            $('div.pp_pic_holder,div.ppt,.pp_fade').fadeOut(settings.animation_speed, function () {
                $(this).remove();
            });
            $pp_overlay.fadeOut(settings.animation_speed, function () {
                if ($.browser.msie && $.browser.version == 6) $('select').css('visibility', 'visible');
                if (settings.hideflash) $('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css('visibility', 'visible');
                $(this).remove();
                $(window).unbind('scroll.prettyphoto');
                clearHashtag();
                settings.callback();
                doresize = true;
                pp_open = false;
                delete settings;
            });
        };

        function _showContent() {
            $('.pp_loaderIcon').hide();
            projectedTop = scroll_pos['scrollTop'] + ((windowHeight / 2) - (pp_dimensions['containerHeight'] / 2));
            if (projectedTop < 0) projectedTop = 0;
            $ppt.fadeTo(settings.animation_speed, 1);
            $pp_pic_holder.find('.pp_content').animate({
                height: pp_dimensions['contentHeight'],
                width: pp_dimensions['contentWidth']
            }, settings.animation_speed);
            $pp_pic_holder.animate({
                'top': projectedTop,
                'left': ((windowWidth / 2) - (pp_dimensions['containerWidth'] / 2) < 0) ? 0 : (windowWidth / 2) - (pp_dimensions['containerWidth'] / 2),
                width: pp_dimensions['containerWidth']
            }, settings.animation_speed, function () {
                $pp_pic_holder.find('.pp_hoverContainer,#fullResImage').height(pp_dimensions['height']).width(pp_dimensions['width']);
                $pp_pic_holder.find('.pp_fade').fadeIn(settings.animation_speed);
                if (isSet && _getFileType(pp_images[set_position]) == "image") {
                    $pp_pic_holder.find('.pp_hoverContainer').show();
                } else {
                    $pp_pic_holder.find('.pp_hoverContainer').hide();
                }
                if (settings.allow_expand) {
                    if (pp_dimensions['resized']) {
                        $('a.pp_expand,a.pp_contract').show();
                    } else {
                        $('a.pp_expand').hide();
                    }
                }
                if (settings.autoplay_slideshow && !pp_slideshow && !pp_open) $.prettyPhoto.startSlideshow();
                settings.changepicturecallback();
                pp_open = true;
            });
            _insert_gallery();
            pp_settings.ajaxcallback();
        };

        function _hideContent(callback) {
            $pp_pic_holder.find('#pp_full_res object,#pp_full_res embed').css('visibility', 'hidden');
            $pp_pic_holder.find('.pp_fade').fadeOut(settings.animation_speed, function () {
                $('.pp_loaderIcon').show();
                callback();
            });
        };

        function _checkPosition(setCount) {
            (setCount > 1) ? $('.pp_nav').show() : $('.pp_nav').hide();
        };

        function _fitToViewport(width, height) {
            resized = false;
            _getDimensions(width, height);
            imageWidth = width, imageHeight = height;
            if (((pp_containerWidth > windowWidth) || (pp_containerHeight > windowHeight)) && doresize && settings.allow_resize && !percentBased) {
                resized = true, fitting = false;
                while (!fitting) {
                    if ((pp_containerWidth > windowWidth)) {
                        imageWidth = (windowWidth - 200);
                        imageHeight = (height / width) * imageWidth;
                    } else if ((pp_containerHeight > windowHeight)) {
                        imageHeight = (windowHeight - 200);
                        imageWidth = (width / height) * imageHeight;
                    } else {
                        fitting = true;
                    };
                    pp_containerHeight = imageHeight, pp_containerWidth = imageWidth;
                };
                _getDimensions(imageWidth, imageHeight);
                if ((pp_containerWidth > windowWidth) || (pp_containerHeight > windowHeight)) {
                    _fitToViewport(pp_containerWidth, pp_containerHeight)
                };
            };
            return {
                width: Math.floor(imageWidth),
                height: Math.floor(imageHeight),
                containerHeight: Math.floor(pp_containerHeight),
                containerWidth: Math.floor(pp_containerWidth) + (settings.horizontal_padding * 2),
                contentHeight: Math.floor(pp_contentHeight),
                contentWidth: Math.floor(pp_contentWidth),
                resized: resized
            };
        };

        function _getDimensions(width, height) {
            width = parseFloat(width);
            height = parseFloat(height);
            $pp_details = $pp_pic_holder.find('.pp_details');
            $pp_details.width(width);
            detailsHeight = parseFloat($pp_details.css('marginTop')) + parseFloat($pp_details.css('marginBottom'));
            $pp_details = $pp_details.clone().addClass(settings.theme).width(width).appendTo($('body')).css({
                'position': 'absolute',
                'top': -10000
            });
            detailsHeight += $pp_details.height();
            detailsHeight = (detailsHeight <= 34) ? 36 : detailsHeight;
            if ($.browser.msie && $.browser.version == 7) detailsHeight += 8;
            $pp_details.remove();
            $pp_title = $pp_pic_holder.find('.ppt');
            $pp_title.width(width);
            titleHeight = parseFloat($pp_title.css('marginTop')) + parseFloat($pp_title.css('marginBottom'));
            $pp_title = $pp_title.clone().appendTo($('body')).css({
                'position': 'absolute',
                'top': -10000
            });
            titleHeight += $pp_title.height();
            $pp_title.remove();
            pp_contentHeight = height;
            pp_contentWidth = width;
            pp_containerHeight = pp_contentHeight + titleHeight + $pp_pic_holder.find('.pp_top').height() + $pp_pic_holder.find('.pp_bottom').height();
            pp_containerWidth = width;
        }

        function _getFileType(itemSrc) {
            if (itemSrc.match(/youtube\.com\/watch/i) || itemSrc.match(/youtu\.be/i)) {
                return 'youtube';
            } else if (itemSrc.match(/vimeo\.com/i)) {
                return 'vimeo';
            } else if (itemSrc.match(/\b.mov\b/i)) {
                return 'quicktime';
            } else if (itemSrc.match(/\b.swf\b/i)) {
                return 'flash';
            } else if (itemSrc.match(/\biframe=true\b/i)) {
                return 'iframe';
            } else if (itemSrc.match(/\bajax=true\b/i)) {
                return 'ajax';
            } else if (itemSrc.match(/\bcustom=true\b/i)) {
                return 'custom';
            } else if (itemSrc.substr(0, 1) == '#') {
                return 'inline';
            } else {
                return 'image';
            };
        };

        function _center_overlay() {
            if (doresize && typeof $pp_pic_holder != 'undefined') {
                scroll_pos = _get_scroll();
                contentHeight = $pp_pic_holder.height(), contentwidth = $pp_pic_holder.width();
                projectedTop = (windowHeight / 2) + scroll_pos['scrollTop'] - (contentHeight / 2);
                if (projectedTop < 0) projectedTop = 0;
                if (contentHeight > windowHeight) return;
                $pp_pic_holder.css({
                    'top': projectedTop,
                    'left': (windowWidth / 2) + scroll_pos['scrollLeft'] - (contentwidth / 2)
                });
            };
        };

        function _get_scroll() {
            if (self.pageYOffset) {
                return {
                    scrollTop: self.pageYOffset,
                    scrollLeft: self.pageXOffset
                };
            } else if (document.documentElement && document.documentElement.scrollTop) {
                return {
                    scrollTop: document.documentElement.scrollTop,
                    scrollLeft: document.documentElement.scrollLeft
                };
            } else if (document.body) {
                return {
                    scrollTop: document.body.scrollTop,
                    scrollLeft: document.body.scrollLeft
                };
            };
        };

        function _resize_overlay() {
            windowHeight = $(window).height(), windowWidth = $(window).width();
            if (typeof $pp_overlay != "undefined") $pp_overlay.height($(document).height()).width(windowWidth);
        };

        function _insert_gallery() {
            if (isSet && settings.overlay_gallery && _getFileType(pp_images[set_position]) == "image" && (settings.ie6_fallback && !($.browser.msie && parseInt($.browser.version) == 6))) {
                itemWidth = 52 + 5;
                navWidth = (settings.theme == "facebook" || settings.theme == "pp_default") ? 50 : 30;
                itemsPerPage = Math.floor((pp_dimensions['containerWidth'] - 100 - navWidth) / itemWidth);
                itemsPerPage = (itemsPerPage < pp_images.length) ? itemsPerPage : pp_images.length;
                totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1;
                if (totalPage == 0) {
                    navWidth = 0;
                    $pp_gallery.find('.pp_arrow_next,.pp_arrow_previous').hide();
                } else {
                    $pp_gallery.find('.pp_arrow_next,.pp_arrow_previous').show();
                };
                galleryWidth = itemsPerPage * itemWidth;
                fullGalleryWidth = pp_images.length * itemWidth;
                $pp_gallery.css('margin-left', -((galleryWidth / 2) + (navWidth / 2))).find('div:first').width(galleryWidth + 5).find('ul').width(fullGalleryWidth).find('li.selected').removeClass('selected');
                goToPage = (Math.floor(set_position / itemsPerPage) < totalPage) ? Math.floor(set_position / itemsPerPage) : totalPage;
                $.prettyPhoto.changeGalleryPage(goToPage);
                $pp_gallery_li.filter(':eq(' + set_position + ')').addClass('selected');
            } else {
                $pp_pic_holder.find('.pp_content').unbind('mouseenter mouseleave');
            }
        }

        function _build_overlay(caller) {
            if (settings.social_tools) facebook_like_link = settings.social_tools.replace('{location_href}', encodeURIComponent(location.href));
            settings.markup = settings.markup.replace('{pp_social}', '');
            $('body').append(settings.markup);
            $pp_pic_holder = $('.pp_pic_holder'), $ppt = $('.ppt'), $pp_overlay = $('div.pp_overlay');
            if (isSet && settings.overlay_gallery) {
                currentGalleryPage = 0;
                toInject = "";
                for (var i = 0; i < pp_images.length; i++) {
                    if (!pp_images[i].match(/\b(jpg|jpeg|png|gif)\b/gi)) {
                        classname = 'default';
                        img_src = '';
                    } else {
                        classname = '';
                        img_src = pp_images[i];
                    }
                    toInject += "<li class='" + classname + "'><a href='#'><img src='" + img_src + "' width='50' alt='' /></a></li>";
                };
                toInject = settings.gallery_markup.replace(/{gallery}/g, toInject);
                $pp_pic_holder.find('#pp_full_res').after(toInject);
                $pp_gallery = $('.pp_pic_holder .pp_gallery'), $pp_gallery_li = $pp_gallery.find('li');
                $pp_gallery.find('.pp_arrow_next').click(function () {
                    $.prettyPhoto.changeGalleryPage('next');
                    $.prettyPhoto.stopSlideshow();
                    return false;
                });
                $pp_gallery.find('.pp_arrow_previous').click(function () {
                    $.prettyPhoto.changeGalleryPage('previous');
                    $.prettyPhoto.stopSlideshow();
                    return false;
                });
                $pp_pic_holder.find('.pp_content').hover(function () {
                    $pp_pic_holder.find('.pp_gallery:not(.disabled)').fadeIn();
                }, function () {
                    $pp_pic_holder.find('.pp_gallery:not(.disabled)').fadeOut();
                });
                itemWidth = 52 + 5;
                $pp_gallery_li.each(function (i) {
                    $(this).find('a').click(function () {
                        $.prettyPhoto.changePage(i);
                        $.prettyPhoto.stopSlideshow();
                        return false;
                    });
                });
            };
            if (settings.slideshow) {
                $pp_pic_holder.find('.pp_nav').prepend('<a href="#" class="pp_play">Play</a>')
                $pp_pic_holder.find('.pp_nav .pp_play').click(function () {
                    $.prettyPhoto.startSlideshow();
                    return false;
                });
            }
            $pp_pic_holder.attr('class', 'pp_pic_holder ' + settings.theme);
            $pp_overlay.css({
                'opacity': 0,
                'height': $(document).height(),
                'width': $(window).width()
            }).bind('click', function () {
                if (!settings.modal) $.prettyPhoto.close();
            });
            $('a.pp_close').bind('click', function () {
                $.prettyPhoto.close();
                return false;
            });
            if (settings.allow_expand) {
                $('a.pp_expand').bind('click', function (e) {
                    if ($(this).hasClass('pp_expand')) {
                        $(this).removeClass('pp_expand').addClass('pp_contract');
                        doresize = false;
                    } else {
                        $(this).removeClass('pp_contract').addClass('pp_expand');
                        doresize = true;
                    };
                    _hideContent(function () {
                        $.prettyPhoto.open();
                    });
                    return false;
                });
            }
            $pp_pic_holder.find('.pp_previous, .pp_nav .pp_arrow_previous').bind('click', function () {
                $.prettyPhoto.changePage('previous');
                $.prettyPhoto.stopSlideshow();
                return false;
            });
            $pp_pic_holder.find('.pp_next, .pp_nav .pp_arrow_next').bind('click', function () {
                $.prettyPhoto.changePage('next');
                $.prettyPhoto.stopSlideshow();
                return false;
            });
            _center_overlay();
        };
        if (!pp_alreadyInitialized && getHashtag()) {
            pp_alreadyInitialized = true;
            hashIndex = getHashtag();
            hashRel = hashIndex;
            hashIndex = hashIndex.substring(hashIndex.indexOf('/') + 1, hashIndex.length - 1);
            hashRel = hashRel.substring(0, hashRel.indexOf('/'));
            setTimeout(function () {
                $("a[" + pp_settings.hook + "^='" + hashRel + "']:eq(" + hashIndex + ")").trigger('click');
            }, 50);
        }
        return this.unbind('click.prettyphoto').bind('click.prettyphoto', $.prettyPhoto.initialize);
    };

    function getHashtag() {
        url = location.href;
        hashtag = (url.indexOf('#prettyPhoto') !== -1) ? decodeURI(url.substring(url.indexOf('#prettyPhoto') + 1, url.length)) : false;
        return hashtag;
    };

    function setHashtag() {
        if (typeof theRel == 'undefined') return;
        location.hash = theRel + '/' + rel_index + '/';
    };

    function clearHashtag() {
        if (location.href.indexOf('#prettyPhoto') !== -1) location.hash = "prettyPhoto";
    }

    function getParam(name, url) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        return (results == null) ? "" : results[1];
    }
})(jQuery);
var pp_alreadyInitialized = false;
