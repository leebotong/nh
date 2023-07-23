$(function () {

	// 초기값 실행 함수
	var common_ui = {
		init: function () {
			common_ui.inp();
			common_ui.jsTab();
		},

    	// 인풋
		inp: function () {
			$(".inp-affix-wrap input").focus(function () {
				$(this).parent().addClass("st_focus");
			}).blur(function () {
				$(this).parent().removeClass("st_focus");
			});
		},

		// 탭메뉴
		jsTab: function () {
			var tabWrap = document.querySelector(".tab");
			if(!tabWrap) return;

			$(tabWrap).on('click', '.tab-btn > button', handleClickEvent);
			function handleClickEvent(event) {
				event = event || window.event;
				event.stopPropagation();
				var currTab = event.currentTarget;

				activateTab(currTab);
				activateTabPanel(currTab);
			}

			function activateTab(tab) {
				if(!tab) return;

				$(tab)
				.attr({
					'tabindex':'0',
					'aria-selected':'true'
				}).focus().parent().addClass('cs_active').siblings()
					.removeClass('cs_active')
					.find('button')
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

			$('.tab-btn:first-of-type > button', tabWrap).trigger('click');
		}

  	}

  	common_ui.init();
});

// 이전에 포커스를 설정한 요소를 기억할 변수
let lastFocusedElement;

// ************************************
// POPUP OPEN
// 팝업 열기, 각 팝업용 이벤트
// 팝업의 고유 ID를 기준으로 title, close, data값을 생성 및 제어
// ************************************

function popOpen(popupID) {
	var POPUP = $(popupID);

	lastFocusedElement = $(document.activeElement); // 현재 포커스를 기억
	$("#" + POPUP.attr("id")).prop('hidden',false); // 선택된 팝업 표시

	// POPUP 타입 구분 실행
	// if (POPUP.hasClass("st_alert")) {
	//   console.log(`Opened popup & type : ${POPUP.attr("id")} / st_alert`)
	// } else if (POPUP.hasClass("st_full")) {
	//   console.log(`Opened popup & type : ${POPUP.attr("id")} / st_full`)
	// } else if (POPUP.hasClass("st_bottom")){
	//   console.log(`Opened popup & type : ${POPUP.attr("id")} / st_bottom`)
	// }

	// 접근성 속성 제어
	$('html, body').css("overflow","hidden");
	$('#wrap').attr('aria-hidden', true);
	POPUP.attr('aria-hidden', false);
	POPUP.find("h2").attr('tabindex', 0).focus();
	POPUP.find("h2").attr("id", POPUP.attr("id") + "-title");
	POPUP.find("h2").attr("data-popup-focus", POPUP.attr("id"));
	POPUP.find(".popup-close").attr("data-popup-focus-close", POPUP.attr("id") + "-close");
  
  	// 접근성 포커스 위치 설정
  	function focusMOVING(r) {
		$('[data-popup-focus-close="' + r + '-close"]').keydown(function (e) {
			var keyCode = e.keyCode || e.which;
			if (keyCode == 9) {
				e.preventDefault();
				var nextSelect = $('[data-popup-focus="' + r + '"]');
				console.log(nextSelect.attr("id"));
				$(nextSelect).focus();
			}
		});

		$('[data-popup-focus="' + r + '"]').keydown(function (e) {
			var keyCode = e.keyCode || e.which;
			if (keyCode == 9) {
				if (e.shiftKey) {
					e.preventDefault();
					var prevSelect = $('[data-popup-focus-close="' + r + '-close"]');
					console.log(prevSelect.attr("data-popup-focus-close"));
					$(prevSelect).focus();
				}
			}
		});
	}
	focusMOVING(POPUP.attr("id"));
}

// ************************************
// POPUP CLOSE
// 팝업 닫기
// ************************************
function popClose(e) {
	var POPUP = $(e).parents(".popup-area");

	POPUP.prop('hidden',true);

	// if(POPUP.hasClass("st_bottom")){
	// 	POPUP.find(".popup-wrap").addClass("close");
	// 	setTimeout(function(){
	// 		POPUP.prop('hidden', true).find(".popup-wrap").removeClass("close");
	// 	}, 1000);
	// } else {
	// 	POPUP.prop('hidden',true);
	// }

	// 접근성관련 속성 제어 및 포커스 이동
	$('html, body').css("overflow","auto");
	$('#wrap').attr('aria-hidden', false);
	POPUP.attr('aria-hidden', true);
  lastFocusedElement.focus();
}