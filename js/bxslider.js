var __globalBxslider = {
	bxList:[],
	setup:function(idx, attr){

		if(attr.bxSlider) { // bxslider �̹� ����� ��� return ó��
			return false;
		}

		// attr�� bxslider ����
		var $sliderLi = $(".bxslider li", attr);

		var wd = $sliderLi.width();
		
		var _wd = $(attr).attr("data-width"); // �����̵� ȿ�� �ʺ�
		_wd = _wd ? _wd : wd;

		var isSingleImage = $sliderLi.length === 1;

		var _mode = $(attr).attr("data-mode"); // �����̵� ȿ�� - horizontal,vertical,fade
		_mode = _mode ? _mode : 'horizontal';

		var _minSlides = $(attr).attr("data-minSlides"); // �ּ� �������� ����
		_minSlides = _minSlides && !isNaN(parseInt(_minSlides)) ? parseInt(_minSlides) : 1;

		var _maxSlides = $(attr).attr("data-maxSlides"); // �ִ� �������� ����
		_maxSlides = _maxSlides && !isNaN(parseInt(_maxSlides)) ? parseInt(_maxSlides) : 1;

		var _slideMargin = $(attr).attr("data-slideMargin"); // �����̵� ���� margin ��
		_slideMargin = _slideMargin && !isNaN(parseInt(_slideMargin)) ? parseInt(_slideMargin) : 0;

		var _delay = $(attr).attr("data-delay"); // �����̵� ������ ����
		_delay = _delay && !isNaN(parseInt(_delay)) ? parseInt(_delay) : 4000;

		var _speed = $(attr).attr("data-speed"); // �����̵� �ӵ� ����
		_speed = _speed && !isNaN(parseInt(_speed)) ? parseInt(_speed) : 400;

		var _autoBtn = $(attr).attr("data-autoBtn"); // play / stop / puase
		_autoBtn = _autoBtn && _autoBtn=='true' ? true : false;

		var _auto  = $(attr).attr("data-auto"); // �ڵ������̵� ����
		_auto = _auto && _auto=='true' ? true : false;

		var _pager = $(attr).attr("data-pager");  // ������ ���׶� ��ư ���� ����
		_pager = ( _pager && _pager=='true' && !isSingleImage ) ? true : false;

		var _pagerCustom = '.'+$(attr).attr("data-pagerCustom");  // ������ �ܺη� �������Ҷ�

		var _controls = $(attr).attr("data-controls"); //�ڵ� �����̵� ��Ʈ�� ��ư ���� ����
		_controls = _controls && _controls=='true' ? true : false;

		var _moves = $(attr).attr("data-moves"); //���徿 �����̵�
		_moves = _moves && !isNaN(parseInt(_moves)) ? parseInt(_moves) : 1;

		var _touch = $(attr).attr("data-touch"); //���콺 ��ġ �����̵� ��뿩��
		_touch = _touch && _touch=='true' ? true : false;

		var _loop = $(attr).attr("data-loop"); //���콺 ��ġ �����̵� ��뿩��
		_loop = _loop && _loop=='false' ? false : true;

        var _info = $(attr).attr("data-info");
        var li_length_num=0;

		var bgCacheCheck = false,
			bgAvailable = false,
			bgColors = [],
			bgTarget;

		__globalBxslider.bxList[__globalBxslider.bxList.length] = attr.bxSlider = $('.bxslider',attr).bxSlider({
			slideWidth: _wd
			,slideMargin: _slideMargin
			,minSlides: _minSlides
			,maxSlides: _maxSlides // �ִ� �������� ����
			,speed: _speed
			,pause: _delay
			,moveSlides:_moves
			,mode: _mode // �����̵� ȿ�� - horizontal,vertical,fade
			,autoControls: _autoBtn // play / stop / puase
			,auto: _auto // _auto // �ڵ������̵� ����
			,pager: _pager
			,pagerCustom: (_pagerCustom == '.undefined') ? '': _pagerCustom
			,controls: _controls
			,touchEnabled: _touch
			,infiniteLoop: _loop
			,onSliderLoad:function(){
				//�� bxslider onSliderLoad �̺�Ʈ ����
				// LazyLoad �ɼ��� �������� ��� �����̵� ������ �̹����� data-original�� ���� �ε����� ������
				// �����̵� �ε�� �����̵� �̵� ������ �ڽŰ� ������ �̹����� �ε��Ѵ�
				$(attr).css('visibility', 'visible');
				__globalBxslider.renderLazyImage(this);
                //(���� �����̵����/�� �����̵����) ��) (2/4) �̷� ���������°� �κ�
                if( _info != undefined ){
                    $(this).parents('.bxslider-default').find('.bxslider li').each(function(){
                        if( !$(this).hasClass('bx-clone') ){
                            li_length_num++
                        }
                    });
                    $('.'+_info).html('1/'+li_length_num);
                }

				// �����̵� �ε� �� �ڵ����� �ڵ����� �̺�Ʈ �ο�
				/* controls , pager click ����? auto ���ߴ� ���� ���� */
				if(!_autoBtn){
					if( _auto && !isSingleImage ){
						$(attr).on('mouseover',function(){

							this.bxSlider.stopAuto()
						});
						$(attr).on('mouseout',function(){
							this.bxSlider.startAuto()
						});
					}
				}
			}
			,onSliderResize:function(){} // ...
			,onSlideBefore:function(el, current, next){//�� bxslider onSliderBefore �̺�Ʈ ����
				var imageLoad = __globalBxslider.renderLazyImage(this, current, next);
				if (!imageLoad) {
					return false;
				}

                //(���� �����̵����/�� �����̵����) ��) (2/4) �̷� ���������°� �κ�
                if( _info != undefined ){
                    $('.'+_info).html((next+=1)+'/'+li_length_num);
                }

				// ��׶��� ����
				if( !bgCacheCheck ) {
					bgCacheCheck = true;

					var $bxsliderDefault = $(el).closest('.bxslider-default');
					if( !$bxsliderDefault.hasClass('bxslider-bgcolor') ) {
						bgAvailable = false;
						return;
					}
					$sliderLi.each(function() {
						var color = $(this).css('backgroundColor');
						bgColors.push(color);
						if( !bgAvailable && color != 'rgba(0, 0, 0, 0)' && color != 'rgb(0, 0, 0)' ) {
							bgAvailable = true;
						}
					});
					bgTarget = $(el).closest('.bxslider-default').parent().parent();
				}

				if( bgAvailable && bgTarget) {
					this.speed = 0;
					bgTarget.css({
						'backgroundColor': bgColors[next]
					});
				}
			}
			//infiniteLoop: false
		});
		return true; // �����̵尡 ���������� �ʱ�ȭ
	},
	startAuto:function() {
		this.bxSlider.startAuto();
	},
	stopAuto:function() {
		this.bxSlider.stopAuto();
	},
	resize:function(){
		for(var i in this.bxList){
			if( $.isNumeric(i) === false )
				continue;
			try {
				this.bxList[i].redrawSlider();
			}
			catch(e) {
				console.warn('Should Remove Legacy Code in bxslider.js');
				continue;
			}
		}
	},
	init:function(selector){ // �� _globalBxslider.init �Լ� ����
		var _this = this;
		$(selector).each(function (idx, slider) {
			var sliderObj = $(slider);

			// ������/����� viewport ��� ������ visible ���� ����
			// if (sliderObj.hasClass('loaded') || !sliderObj.visible(true)) {
			if (sliderObj.hasClass('loaded')) {
				return true;
			}

			var lazyImage = sliderObj.find('.slider-lazy-image');
			if (lazyImage.length > 0) {
				var img = lazyImage.eq(0);
				_this.renderImage(img);
				// IE7,8�� ĳ�̵� �̹����� �ε��Ұ�� load �̺�Ʈ�� �߻����� ����
				// �̹����� state�� üũ�� �Ϸ���¶�� �̺�Ʈ�� �ǳʶٰ� �ʱ�ȭ ����
				if (img.get(0).readyState && img.get(0).readyState == 'complete') {
					__globalBxslider.setup(idx, slider);
				} else {
					img.one('load', function () {
						var imgObj = this;
						if (this.readyState) { // IE7,8 �ʱ�ȭ
							var loadInterval = setInterval(function () {
								if (imgObj.readyState == 'complete') {
									__globalBxslider.setup(idx, slider);
									clearInterval(loadInterval);
								}
							}, 250);
						} else { // ��������� �ʱ�ȭ
							__globalBxslider.setup(idx, slider);
						}
					});
				}
			} else {
				__globalBxslider.setup(idx, slider);
			}
			sliderObj.css("overflow","visible").addClass('loaded');
		});
	},
	reloadSlider: function($el) {
		var _this = this;
		$el.each(function(i, $this) {
			var idx = parseInt($('.bxslider-default').index($this));
			_this.bxList[idx].reloadSlider();
		});
	},
	renderImage: function (obj) {
		var img = $(obj);
		if (!img.hasClass('slider-lazy-image')) {
			return false;
		}
		var imgUrl = img.attr('data-original');
		img.attr('src', imgUrl).removeClass('slider-lazy-image');
		return true;

	},
	renderLazyImage: function (slideObj, current, next) { // ��__globalBxslider.renderLazyImage �Լ� �߰�
		var _this = this;
		var context = $(slideObj.context);
		var slidePerMove = context.attr('data-moves') || 1;
		var visibleSlideCount = context.attr('data-maxslides') || 1;

		var preRenderRange =  visibleSlideCount;
		var slideCount = slideObj.getSlideCount();
		var currentSlideIdx = slideObj.getCurrentSlide();

		// ������ ���� �����̵��� �̹��� ������
		for (var i = 0; i < preRenderRange; i++) {
			var slideIdx = currentSlideIdx + i;
			if (slideIdx + 1 > slideCount) {
				slideIdx = slideIdx - slideCount;
			}
			var nextElem = slideObj.getSlideElement(slideIdx);
			nextElem.find('.slider-lazy-image').each(function () {
				_this.renderImage(this);
			});
		}

		if (current === undefined || next === undefined) return;

		// �����̵� ȿ���� �̵��� ��� �����Ǵ� bx-clone ������ �̹��� ������
		context.find('.bx-clone').each(function () {
			$(this).find('.slider-lazy-image').each(function () {
				_this.renderImage(this);
			});
		});

		var imgLoad = true;
		for (var i = current; i < ((next + 1) * slidePerMove); i++) {
			var sliderElem = $(slideObj.getSlideElement(i));
			sliderElem.find('img').each(function () {
				_this.renderImage(this);
				// �̹����� �ε���� �ʾҰ� IE7,8 ȯ���� �ƴҶ��� �̹��� �ε� ��� ó��
				if (!this.complete && !this.readyState) {
					$(this).one('load', function () {
						if (this.complete) {
							slideObj.goToSlide(next);
						}
					});
					imgLoad = false;
				}
			});
		}
		return imgLoad;
	}
};

// BXSLIDER-DEFAULT �ʱ�ȭ ��������
// ���� Ŭ������ �����Ѵٸ� �ʱ�ȭ���� �ʴ´�
var exceptElements = [
	'.loaded',
	'.top_open_box',
	'.ly_movie_bx'
];
var sliderObserver = null;
$(function() {

	/* ie8,ie7 ���� forEach ��� �߰� */
	if (!('forEach' in Array.prototype)) {
		Array.prototype.forEach= function(action, that /*opt*/) {
			for (var i= 0, n= this.length; i<n; i++)
				if (i in this)
					action.call(that, this[i], i, this);
		};
	}

	// �� document load�� �ƴ� window �ε� ���� �����̵� �۵�����
	// IntersectionObserver Ŭ���� �������� Ȯ��
	if (typeof IntersectionObserver !== 'undefined') {
		$(window).on('load', function () {
			sliderObserver = new IntersectionObserver(function (entries) {
				for (var i in entries) {
					var entry = entries[i];
					if (entry.isIntersecting) {
						var slideObj = $(entry.target).get(0);
						__globalBxslider.init(slideObj);
					}
				}
			}, { root : null });
			$('.bxslider-default').not(exceptElements.join(',')).each(function () {
				sliderObserver.observe(this);
			});
		});
	} else {
		$(window).on('load scroll', function () {
			__globalBxslider.init($('.bxslider-default').not(exceptElements.join(',')));
		});
	}

	$(window).on('load', function () {
		/* tab ���ο� bxslider�� ������ ��� */
		$('[class*="js-tab"] a[href*="#"]').on('click', function(){__globalBxslider.resize()});
		$('[class*="js-tab-type1"] a[href*="#"]').on('click', function(){__globalBxslider.resize()});
		$('[class*="js-tab-type2"] a[href*="#"]').on('click', function(){__globalBxslider.resize()});
		$('[class*="js-tab-type3"] a[href*="#"]').on('click', function(){__globalBxslider.resize()});
	});
	// �� document load�� �ƴ� window �ε� ���� �����̵� �۵� ��

	$(window).trigger('old-tab')

});


// �� $.fn.visible Jquery ����� �Լ� �߰�����
(function($){

	/**
	 * JQUERY ��ü ȭ����⿩�� �˻�
	 */
	var $w=$(window);
	$.fn.visible = function(partial,hidden,direction,container){

		// IE7/8�� ���������� ����� �Ұ��ϹǷ� �׻� ���̴� ���·� ó��
		var userAgent = navigator.userAgent;
		if (userAgent.indexOf('MSIE 7') > 0 || userAgent.indexOf('MSIE 8') > 0) {
			return true;
		}

		if (this.length < 1) return false;

		var result = true;
		if (typeof IntersectionObserver !== 'undefined') { // Class base viewportüũ�� ������������ üũ
			return true;
		} else {    // Window Base
			// Set direction default to 'both'.
			direction = direction || 'both';

			var $t          = this.length > 1 ? this.eq(0) : this,
				isContained = typeof container !== 'undefined' && container !== null,
				$c	  = isContained ? $(container) : $w,
				wPosition        = isContained ? $c.position() : 0,
				t          = $t.get(0),
				vpWidth    = $c.outerWidth(),
				vpHeight    = $c.outerHeight(),
				clientSize  = hidden === true ? t.offsetWidth * t.offsetHeight : true;

			if (typeof t.getBoundingClientRect === 'function'){

				// Use this native browser method, if available.
				var rec = t.getBoundingClientRect(),
					tViz = isContained ?
						rec.top - wPosition.top >= 0 && rec.top < vpHeight + wPosition.top :
						rec.top >= 0 && rec.top < vpHeight,
					bViz = isContained ?
						rec.bottom - wPosition.top > 0 && rec.bottom <= vpHeight + wPosition.top :
						rec.bottom > 0 && rec.bottom <= vpHeight,
					lViz = isContained ?
						rec.left - wPosition.left >= 0 && rec.left < vpWidth + wPosition.left :
						rec.left >= 0 && rec.left <  vpWidth,
					rViz = isContained ?
						rec.right - wPosition.left > 0  && rec.right < vpWidth + wPosition.left  :
						rec.right > 0 && rec.right <= vpWidth,
					vVisible  = partial ? tViz || bViz : tViz && bViz,
					hVisible  = partial ? lViz || rViz : lViz && rViz,
					vVisible = (rec.top < 0 && rec.bottom > vpHeight) ? true : vVisible,
					hVisible = (rec.left < 0 && rec.right > vpWidth) ? true : hVisible;

				if(direction === 'both')
					result = clientSize && vVisible && hVisible;
				else if(direction === 'vertical')
					result = clientSize && vVisible;
				else if(direction === 'horizontal')
					result = clientSize && hVisible;
			} else {
				var viewTop = isContained ? 0 : wPosition,
					viewBottom      = viewTop + vpHeight,
					viewLeft        = $c.scrollLeft(),
					viewRight      = viewLeft + vpWidth,
					position          = $t.position(),
					_top            = position.top,
					_bottom        = _top + $t.height(),
					_left          = position.left,
					_right          = _left + $t.width(),
					compareTop      = partial === true ? _bottom : _top,
					compareBottom  = partial === true ? _top : _bottom,
					compareLeft    = partial === true ? _right : _left,
					compareRight    = partial === true ? _left : _right;

				if(direction === 'both')
					result = !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
				else if(direction === 'vertical')
					result = !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
				else if(direction === 'horizontal')
					result = !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
			}
			return result;
		}

	};

})(jQuery);
// �� $.fn.visible Jquery ����� �Լ� �߰���