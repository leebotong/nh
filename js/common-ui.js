$(function () {

	// 초기값 실행 함수
	var common_ui = {
		init: function () {
			common_ui.jsHeader();
			common_ui.jsStep();
			common_ui.jsInp();
			common_ui.jsTab();
			common_ui.jsToggle();
			common_ui.jsToast();
			common_ui.jsChecked();
		},

		// 헤더
		jsHeader: function () {
			var headerLeftWidth = $('.header-left').width();
			var headerRightWidth = $('.header-right').width();
			var maxWidth = Math.max(headerLeftWidth, headerRightWidth);

			$('.header-left, .header-right').width(maxWidth);
		},

		// 스텝
		jsStep: function () {
			var $obj = $('.step-bar');
			var $total = $obj.attr('data-total');
			var $now = $obj.attr('data-step');
			
			$obj.find('.step-status').width((100 / $total * $now) + '%');
			$obj.siblings('.step-num').find('.total').html('<span class="blind">총</span>' + $total + '<span class="blind">단계 중</span>');
			$obj.siblings('.step-num').find('.now').html('<span class="blind">현재</span>' + $now + '<span class="blind">단계</span>');
		},

    	// 인풋
		jsInp: function () {
			$('.input-text-wrap :where(input, button):not([readonly])').on('focus, focusin', function () {
				$(this).parent().addClass('focus');
			}).blur(function () {
				$(this).parent().removeClass('focus');
			});
		},

		// 탭메뉴
		jsTab: function () {
			var tabWrap = document.querySelectorAll('.tab');
			if(!tabWrap) return;

			$(tabWrap).each(function (idx) {
				$(this).find('[role="tab"]').each(function (tabIdx) {
					$(this)
					.attr({
						'id':'tab-title' + idx + '-' + tabIdx,
						'aria-controls':'tab-panel' + idx + '-' + tabIdx,
					})
					if ($(this).attr('aria-selected') === 'true') {
						var $selIdx = $(this).index();
						$(this).parents('.tab').find('.tab-panel').prop('hidden', true);
						$(this).parents('.tab').find('.tab-panel').eq($selIdx).prop('hidden', false);
					}
				});
				$(this).find('[role="tabpanel"]').each(function (tabIdx) {
					$(this)
					.attr({
						'id':'tab-panel' + idx + '-' + tabIdx,
						'aria-aria-labelledby':'tab-title' + idx + '-' + tabIdx,
					})
				});

				if($(this).hasClass('tab-nav-fix')){
					var $h = $(this).outerHeight()
					var $mt = parseInt($(this).css('marginTop'))
					var $navH = $(this).find('.tab-nav').innerHeight()
					$('#contents, .popup-body').css('padding-bottom','0')
					if($mt < 0){
						$(this).css({'height':$h - $mt})
					}
					$(this).find('.tab-panel-cont').each(function () {
						if($(this).prev().length != 0){
							var $prevH = $(this).prev().outerHeight(true)
							$(this).css({'height':$h - $mt - $navH - $prevH})
						} else {
							$(this).css({'height':$h - $mt - $navH})
						}
						
					});
				}
			});

			// $(tabWrap).on('click', 'tab-btn', handleClickEvent);
			// $(tabWrap).on('keydown', 'tab-nav', handleKeyEvent);

			// $(tabWrap).on('click', '.tab-btn > button', handleClickEvent);
			$(tabWrap).on('click', '.tab-btn', handleClickEvent);
			$(tabWrap).on('keydown', '.tab-nav', handleKeyEvent);
			function handleClickEvent(e) {
				e = e || window.e;
				e.stopPropagation();
				var currTab = e.currentTarget;

				activateTab(currTab);
				activateTabPanel(currTab);
			}

			function activateTab(tab) {
				if(!tab) return;

				$(tab)
				.attr({
					'tabindex':'0',
					'aria-selected':'true'
				})
				// .focus()
				.siblings()
					.attr({
						'tabindex':'-1',
						'aria-selected':'false'
					});
				
			}

			function activateTabPanel(tab) {
				if(!tab) return;
				$('#' + tab.getAttribute('aria-controls'))
					.attr('tabindex', '0')
					.prop('hidden', false)
					.siblings('.tab-panel')
						.attr('tabindex', '-1')
						.prop('hidden', true)
			}

			function handleKeyEvent(e) {
				e = e || window.e;
				e.stopPropagation();
				var keycode = e.keyCode || e.which;

				switch(keycode) {
					// 왼쪽방향키
					case 37:
						if(e.target.previousElementSibling) {
							$(e.target)
								.attr('tabindex','-1')
								.prev().attr('tabindex','0').focus()
						} else {
							$(e.target)
								.attr('tabindex','-1')
								.siblings(':last').attr('tabindex','0').focus()
						}
						break;
						
					// 오른쪽방향키
					case 39:
						if(e.target.nextElementSibling) {
							$(e.target)
								.attr('tabindex','-1')
								.next().attr('tabindex','0').focus()
						} else {
							$(e.target)
								.attr('tabindex','-1')
								.siblings(':first').attr('tabindex','0').focus()
						}
						break;

					// 스페이스키
					case 32:
					case 13:
						e.preventDefault();
						activateTab(e.target);
						activateTabPanel(e.target);
						break;
					// 탭키
					// case 9:
					// 	break;
				}

			}

			// $('.tab-btn:first-of-type > button', tabWrap).trigger('click');
			// $('.tab-btn:first-of-type', tabWrap).trigger('click');
		},

        // Collapse
        jsToggle: function () {
            $('.js_toggle').each(function (idx) {
                $(this).find('.js_trigger').each(function (itemIdx) {
					if(!$(this).hasClass('active')){
						$(this).attr('aria-expanded', false)
						.closest('.js_toggle_item').find('.js_toggle_cont')
					} else {
						$(this).attr('aria-expanded', true)
						.closest('.js_toggle_item').find('.js_toggle_cont')
						.css('display','block')
					}
					$(this)
					.attr({
						'id':'collapse-title' + idx + '-' + itemIdx,
						'aria-controls':'collapse-cont-' + itemIdx
					})
					.closest('.js_toggle_item').find('.js_toggle_cont')
					.attr({
						'id':'collapse-cont-' + itemIdx,
						'aria-labelledby':'collapse-title' + idx + '-' + itemIdx
					})
                });
            });
        } ,
        
        // Toast Popup
        jsToast: function () {
            var $obj = $('.popup-toast');
            var $objH = $obj.find('.toast-msg').innerHeight();
            var $bottom = $('#bottom');
            var $bottomH = $bottom.innerHeight();
            $obj.css('height',$objH);
            if($bottom){
                $obj.css('bottom',$bottomH); 
            }
        },

		// 리스트 선택 상태
		jsChecked: function () {
			var listWrap = document.querySelector('.js_selected');
			if(!listWrap) return;
			
			var $obj = $('.js_selected input')
			$obj.each(function () {
				if($(this).prop('checked')){
					$(this).closest('.inner').parent().addClass('selected')
				}
			})
		}

    }

    // ************************************
	// 클릭이벤트
	// ************************************
	$(document)

		// 토글컨텐츠
		.off('click', '.js_toggle .js_trigger')
		.on('click', '.js_toggle .js_trigger', function () {
			var $this = $(this);
			if(!$this.hasClass('active')){
				$this.parents('.js_toggle').find('.js_trigger').removeClass('active')
				.attr('aria-expanded', false)
				.closest('.js_toggle_item').find('.js_toggle_cont')
				.slideUp(200)

				$this.addClass('active')
				.attr('aria-expanded', true)
				.closest('.js_toggle_item').find('.js_toggle_cont')
				.slideDown(200, function () {
                    var $inputText = $(this).find('input[type=text]');
                    if ($inputText.length > 0) {
                        $inputText.focus(); // 포커스를 input 요소로 이동
						$('#contents').scrollTop(0, $inputText.offset().top - 50); 
                        if (/Mobi|Android/i.test(navigator.userAgent)) {
                            // 모바일 장치의 경우, 스크롤을 위해 뷰포트를 조정합니다.
                            $('#contents').scrollTop(0, $inputText.offset().top - 50); // 필요한 만큼 조절 가능
                        }
                    }
				})
			} else {
				$this.removeClass('active')
				.attr('aria-expanded', false)
				.closest('.js_toggle_item').find('.js_toggle_cont')
				.slideUp(200)
			}
		})

		// 리스트 역순 노출
		.off('click', '.list-reverse')
		.on('click', '.list-reverse button', function () {
			$(this).closest('.list-item').next().slideDown(200)
		})

		// 카드타입리스트 선택 상태
		.off('click', '.js_selected input:not([type=text])')
		.on("click", ".js_selected input:not([type=text])", function () {
			var $this = $(this);
			$this.each(function () {
				if($(this).prop('checked')){
					if($(this).prop('type') === 'radio'){
						$(this).closest('.js_selected').find('.inner').parent().removeClass('selected')
					}
					$(this).parents('.inner').parent().addClass('selected')
				} else {
					$(this).parents('.inner').parent().removeClass('selected')
				}
			})
		})

		// 셀렉트옵션 선택 상태
		.off('click', '.list-select-option .option-item')
		.on("click", '.list-select-option .option-item', function () {
			var $this = $(this);
			$this.each(function () {
				if(!$(this).hasClass('selected')){
					$('.list-select-option .option-item').removeClass('selected').attr('title','')
					$(this).addClass('selected').attr('title','선택됨')
				}
			})
		})

		// 전체동의 선택
		.off('click', '.terms-wrap .terms-header input')
		.on('click', '.terms-wrap .terms-header input', function () {
			var $this = $(this);
			var $termsList = $('.terms-list');
			var $termsListInputs = $termsList.find('input');
			if($this.is(':checked')){
				$termsListInputs.prop('checked', true);
				if ($this.parents('.terms-wrap').hasClass('js_toggle')) {
					$termsList.slideUp(200);
				}
			} else {
				$termsListInputs.prop('checked', false);
				if ($this.parents('.terms-wrap').hasClass('js_toggle')) {
					$termsList.slideDown(200);
				}
			}
		})
		
		.off('click', '.terms-wrap .terms-list input')
		.on('click', '.terms-wrap .terms-list input', function () {
			var $termsList = $('.terms-list');
			var $total = $termsList.find('input').length;
			var $checked = $termsList.find('input:checked').length;
			if($total != $checked){
				$('.terms-wrap .terms-header input').prop('checked', false);
				if ($termsList.parents('.terms-wrap').hasClass('js_toggle')) {
					$termsList.slideDown(200);
				}
			} else {
				$('.terms-wrap .terms-header input').prop('checked', true);
				if ($termsList.parents('.terms-wrap').hasClass('js_toggle')) {
					$termsList.slideUp(200);
				}
			}
		})

		// input clear 
		.off('click', '.btn-input-clear')
		.on('click', '.btn-input-clear', function () {
			// $(this).parent('.input-text-wrap').addClass('focus');
			$(this)
				.prevAll('input[type="text"]:not([readonly]), input[type="tel"]:not([readonly])')
				.val('')
				.focus();
			$(this).hide();
		})
		.off('focus, focusin', 'input[type="text"]:not([readonly]), input[type="tel"]:not([readonly])')
		.on('focus, focusin', 'input[type="text"]:not([readonly]), input[type="tel"]:not([readonly])', function () {
			var $this = $(this);
			$this.parent('.input-text-wrap').addClass('focus');
			if ($this.val() !== '') {
				$this.nextAll('.btn-input-clear').show();
			}
		})
		.off('keyup', 'input[type="text"]:not([readonly]), input[type="tel"]:not([readonly])')
		.on('keyup', 'input[type="text"]:not([readonly]), input[type="tel"]:not([readonly])', function () {
			var $this = $(this);
			if ($this.val() !== '') {
				$this.nextAll('.btn-input-clear').show();
			} else {
				$this.nextAll('.btn-input-clear').hide();
			}
		})
		.off('focusout, blur', 'input[type="text"]:not([readonly]), input[type="tel"]:not([readonly])')
		.on('focusout, blur', 'input[type="text"]:not([readonly]), input[type="tel"]:not([readonly])', function () {
			var $this = $(this);
			$this.parent('.input-text-wrap').removeClass('focus');
			//$this.nextAll('.btn-input-clear').hide();
			setTimeout(function () {
				$this.nextAll('.btn-input-clear').hide();
			}, 1);

			// if ($this.val() == '') {
			// 	setTimeout(function () {
		  	// 	$this.nextAll('.btn-input-clear').hide();
			// 	}, 1);
			// }
		})

    common_ui.init();
});

// 이전에 포커스를 설정한 요소를 기억할 변수
let lastFocusedElement; 

// ************************************
// POPUP OPEN
// 팝업 열기
// ************************************
function popOpen(popupID) {
	var POPUP = $(popupID);

	lastFocusedElement = $(document.activeElement); // 현재 포커스를 기억
	$('#' + POPUP.attr('id')).show(); // 선택된 팝업 표시

	if(!POPUP.hasClass('popup-full')){
		$('#' + POPUP.attr('id')).find('.popup-wrap').removeClass('close');
	}

	// POPUP 타입 구분 실행
	// if (POPUP.hasClass("st_alert")) {
	//   console.log(`Opened popup & type : ${POPUP.attr("id")} / st_alert`)
	// } else if (POPUP.hasClass("st_full")) {
	//   console.log(`Opened popup & type : ${POPUP.attr("id")} / st_full`)
	// } else if (POPUP.hasClass("st_bottom")){
	//   console.log(`Opened popup & type : ${POPUP.attr("id")} / st_bottom`)
	// }

	// 접근성 속성 제어
	$('html, body').css('overflow','hidden');
	$('#wrap').attr('aria-hidden', true);
	POPUP.attr('aria-hidden', false);
	POPUP.find('h2').attr({
		'id':POPUP.attr('id') + '-title',
		'tabindex':0
	}).focus();
	POPUP.find('h2').attr('data-popup-focus', POPUP.attr('id'));
	POPUP.find('.popup-close').attr('data-popup-focus-close', POPUP.attr('id') + '-close');
	POPUP.find('.popup-footer .btn-wrap button:last-child').attr('data-popup-focus-close', POPUP.attr('id') + '-close');
  
  	// 접근성 포커스 위치 설정
  	function focusMOVING(r) {
		$('[data-popup-focus-close="' + r + '-close"]').keydown(function (e) {
			var keyCode = e.keyCode || e.which;
			if (keyCode == 9) {
				e.preventDefault();
				var nextSelect = $('[data-popup-focus="' + r + '"]');
				$(nextSelect).focus();
			}
		});

		$('[data-popup-focus="' + r + '"]').keydown(function (e) {
			var keyCode = e.keyCode || e.which;
			if (keyCode == 9) {
				if (e.shiftKey) {
					e.preventDefault();
					var prevSelect = $('[data-popup-focus-close="' + r + '-close"]');
					$(prevSelect).focus();
				}
			}
		});
	}
	focusMOVING(POPUP.attr('id'));
}

// ************************************
// POPUP CLOSE
// 팝업 닫기
// ************************************
function popClose(e) {
	var POPUP = $(e).parents('.popup-area');

	// POPUP.attr('aria-hidden',true).hide();

	if(!POPUP.hasClass('popup-full')){
		POPUP.find('.popup-wrap').addClass('close');
		setTimeout(function(){
			POPUP.attr('aria-hidden',true).hide();
		}, 500);
	} else {
		POPUP.attr('aria-hidden',true).hide();
	}

	// if(POPUP.hasClass("st_bottom")){
	// 	POPUP.find(".popup-wrap").addClass("close");
	// 	setTimeout(function(){
	// 		POPUP.prop('hidden', true).find(".popup-wrap").removeClass("close");
	// 	}, 300);
	// } else {
	// 	POPUP.prop('hidden',true);
	// }

	// 접근성관련 속성 제어 및 포커스 이동
	$('html, body').css('overflow','auto');
	$('#wrap').attr('aria-hidden', false);
	POPUP.attr('aria-hidden', true);
  	lastFocusedElement.focus();
}

// ************************************
// 토스트 팝업
// 토스트 팝업의 고유 ID를 기준으로 제어
// ************************************
function toastOpen(toastID) {
    const TOAST = $(toastID);
    TOAST.addClass('active');
    TOAST.attr('aria-hidden', false);
    setTimeout(function () {
        TOAST.removeClass('active');
        TOAST.attr('aria-hidden', true);
    }, 3000);
}
// function toastOpen(toastID, message, time) {
// 	const TOAST = $(toastID);
// 	const TOAST_ID = TOAST.attr("id");
// 	const MESSAGE = $(".toastMessage").html(message ? message : "Toast Message");
// 	const MOTION_TIME = time ? time : 3000; // 속도 임의 조정 옵션
// 	console.log(`Opened Toast : ${TOAST_ID}`);
  
// 	TOAST.addClass("show");
// 	TOAST.removeClass("hide");
// 	TOAST.attr("aria-hidden", false);
// 	TOAST.attr("aria-invalid", true);
// 	MESSAGE;
// 	$(".toastOpen").attr("aria-describedby", TOAST_ID);
// 	console.log(`${TOAST_ID} show`);
// 	setTimeout(function () {
// 	  TOAST.removeClass("show");
// 	  TOAST.addClass("hide");
// 	  TOAST.attr("aria-hidden", true);
// 	  TOAST.removeAttr("aria-invalid");
// 	  $(".toastOpen").removeAttr("aria-describedby");
// 	  console.time();
// 	  console.log(`${TOAST_ID} hide`);
// 	  console.timeEnd();
// 	}, MOTION_TIME);
//   }

// ************************************
// swiper 접근성
// ************************************
function swiperA11y() {
	$('.swiper-container').find('.swiper-slide').attr('aria-hidden', true).removeAttr('tabindex');
	$('.swiper-container').find('.swiper-slide.swiper-slide-active').attr('aria-hidden', false).attr('tabindex', 0);
}


// ************************************
// 스크롤 애니메이션
// ************************************
let lastScrollTop = 0;

function scrollAni(){
	let st = document.getElementById('contents').scrollTop;
	if (st > lastScrollTop) {
		let objs = document.querySelectorAll('.scr-ani');
		objs.forEach((obj) => {
			let rect = obj.getBoundingClientRect();
			let screenHeight = document.getElementById('contents').clientHeight;
			if (rect.top + 100 < screenHeight) {
				obj.classList.add('action');
			} else {
				obj.classList.remove('action');
			}
		});
	}
	lastScrollTop = st;

	// let observer = new IntersectionObserver((entries) => {
	// 	entries.forEach((entry) => {
	// 		if(entry.isIntersecting){
	// 			if (entry.intersectionRatio >= 0.8){
	// 				entry.target.style.opacity = 1;
	// 				entry.target.style.transform = 'rotate(0deg)';
	// 			} 
	// 		}
	// 	});
	// }, { threshold: 0.8, root: document.querySelector('#contents') });
	  
	// let parent = document.querySelector('.scroll-ani');
	// let objs = parent.querySelectorAll('.ani');
	// objs.forEach((obj) => {
	// 	observer.observe(obj);
	// });
}