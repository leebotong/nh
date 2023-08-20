"use strict";
/* [SEPTEM] UI Dev Team :: 콕뱅크 퍼블리싱가이드용 js */
/* 개발서버에 업로드 하지 말고 퍼블사이트 서버에만 업로드하세요 */

$(function () {
  checkMobile();
  //PopCheck();

  if ($("body").hasClass("iOS") == true) {
    // iosZom();
  }

  //개발소스(header.jsp)에 공통으로 적용되고 있음
  $(document)
  .off("focus, focusin", 'textarea, input[type="text"]:not([readonly]), input[type="tel"]:not([readonly])')
	.on("focus, focusin", 'textarea, input[type="text"]:not([readonly]), input[type="tel"]:not([readonly])', function () {
      $('html').addClass('keypadOn');
  });


  $(".tyNum").each(function () {
    fn_change_hangul_money(this);
	});

	//$('body').removeClass('purpleC').addClass('lightskyC');

  jsListMore();

  $("#wrap").prepend('<div class="pub"></div>');

	// $('.slideBanner, .centerBanner').find('.btnPopClose').attr('aria-hidden', true);

  darkMode();
  senior();

	// ************************************
	// init 속성
	// 팝업 오픈시 팝업별 고유 ID 적용
	// 오픈 ID 설정, 오픈된 팝업 닫을때 복귀 포인트 설정
	// ************************************
	$(".popOpen").each(function () {
		$(this).bind("click", function () {
			console.log("POPUP ===========================");
			if ($(this).attr("href")) {
				// href = "javascript:popOpen(ID)"
				var getHREF = $(this).attr("href");    // 링크 취득("javascript:popOpen(ID)")
				var cleanData = getHREF.slice(19, -2); // ID값 취득("ID")
				console.log(`This Node & target ID = ${this.nodeName} / ${cleanData}`);
			} else {
				var getClick = $(this).attr("onclick"); // 클릭 함수 취득
				var cleanData = getClick.slice(8, -1);  // ID값 취득
				console.log(`This Node & target ID = ${this.nodeName} / ${cleanData}`);
			}
			$(this).attr("id", cleanData + "-open");
		});
	});
});

const $html = $("html");

// ************************************
// POPUP OPEN
// 팝업 열기, 각 팝업용 이벤트
// 팝업(slide, center, full)
// 팝업의 고유 ID를 기준으로 title, close, data값을 생성 및 제어
// 팝업 오픈전 디폴트 속성은 col_com.js의 initPopupSet에 선언
// ************************************
function popOpen(popupID) {
  var POPUP = $(popupID);

  $("#" + POPUP.attr("id")).show(); // 선택된 팝업 표시

  // POPUP 타입 구분 실행
  if (POPUP.hasClass("slide")) {
    // 슬라이드 팝업
    console.log(`Opened popup & type : ${POPUP.attr("id")} / slide`);
    // AS-IS: 기존 슬라이드 팝업용 소스 사용
    var layerSelBox = POPUP.find(".layerSelectContInner");
    layerSelBox.each(function () {
			$(this).css("bottom", "-" + $(this).outerHeight() + "px");
      $(this).animate({ bottom: "0px" }, 500);
    });
		console.log(`Slide Popup Heigh : ${layerSelBox.outerHeight()}`);
  } else if (POPUP.hasClass("center")) {
    // 중앙 팝업
    console.log(`Opened popup & type : ${POPUP.attr("id")} / center`);
    $(this).closest(".popupWrap").show();
  } else if (POPUP.hasClass("slideBanner")) {
		// 슬라이드 배너
		var bannerBox = POPUP.find(".bannerCont");
		$('.bannerFocus').attr('tabindex', 0).focus();
    bannerBox.each(function () {
      $(this).css("bottom", "-" + $(this).outerHeight() + "px");
      $(this).animate({ bottom: "0px" }, 500);
    });

		// 배너형인 경우, 초기 진입시 버튼까지 읽는 부분 제어를 위해 타이머 설정
		// setTimeout(function(){
		// 	$('.bannerCont').find('.btnPopClose').attr('aria-hidden', false);
		// }, 100);
	} else if (POPUP.hasClass("centerBanner")) {
		// 중앙 배너
		$(this).closest(".popupWrap").show();
		$('.bannerFocus').attr('tabindex', 0).focus();

		// 배너형인 경우, 초기 진입시 버튼까지 읽는 부분 제어를 위해 타이머 설정
		// setTimeout(function(){
		// 	$('.bannerCont').find('.btnPopClose').attr('aria-hidden', false);
		// }, 100);
	} else {
    // 풀팝업
    // console.log('open full');
    console.log(`Opened popup & type : ${POPUP.attr("id")} / full`);
    $(this).closest(".popupWrap").show();
  }

	// 접근성용 함수 호출
	a11yOpen(POPUP);
	// 윤지현:개발에서 팝업 호출 후, 호출
	selectLayerTouchEvent(POPUP);
}

// ************************************
// POPUP CLOSE
// 팝업 닫기, 각 팝업용 이벤트
// ************************************
function popClose(e) {
  var POPUP = $(e).parents(".popupWrap");
  var $closeID = POPUP.attr("id");

  // 슬라이드 팝업인 경우 닫기 모션 추가
	if (POPUP.hasClass("slide")) {
    // 슬라이드 팝업
    console.log(`Closed popup & type : ${POPUP.attr("id")} / slide`);
    // AS-IS: 기존 슬라이드 팝업용 소스 사용
    var layerSelBox = POPUP.find(".layerSelectContInner");
		// console.log(layerSelBox.offset().top);
		// console.log(layerSelBox.position().top);
    layerSelBox.each(function () {
			$(this)
			.animate({ bottom: 0 }, 0)
			.animate({ bottom: "-" + $(this).outerHeight() + "px" }, 500);

			//터치슬라이드 팝업 닫기
			if ($(this).hasClass('set')) {
				$(this).removeClass('set');
			}
		});
		// 팝업이 클 경우, 팝업 닫힐때 DIM 영역과의 시간조정 필요로 타이머 설정
		// console.log(`Slide Popup Heigh : ${layerSelBox.outerHeight()}`);
		setTimeout(function(){
			POPUP.hide();
		}, 800);
  } else if ( POPUP.hasClass("slideBanner") ) {
		// 슬라이더 배너, 기본 구조 슬라이더와 동일
		var bannerBox = POPUP.find(".bannerCont");
		console.log(bannerBox.outerHeight());
		// console.log(bannerBox.offset().top);
		// console.log(bannerBox.position().top);
    bannerBox.each(function () {
      $(this)
				.animate({ bottom: 0 }, 0)
				.animate({ bottom: "-" + $(this).outerHeight() + "px" }, 500);
		});
		// 팝업 닫힐때 DIM 영역과의 시간조정 필요로 타이머 설정
		setTimeout(function(){
			POPUP.hide();
		}, 500);
		// 팝업이 닫힐 경우 이동될 위치 지정
		// 배너형의 경우 페이지 진입 초기에 표시될 경우가 많기 때문에
		// 호출하는 위치가 불분명하여 닫을때 포커스를 이동시켜야 하는 부분이 애매함
		// 따라서, 기본적으로 페이지 타이틀 #wrap h1을 향하도록 작업
		$('#wrap h1').attr('tabindex', 0).focus();
		// 배너형의 경우 재호출시 닫기 버튼을 읽지 않도록 하기 위해 aria-hidden=true 재적용
		// $('.bannerCont').find('.btnPopClose').attr('aria-hidden', true);
	} else if (POPUP.hasClass("centerBanner")) {
		POPUP.hide();
		// 팝업이 닫힐 경우 이동될 위치 지정
		// 배너형의 경우 페이지 진입 초기에 표시될 경우가 많기 때문에
		// 호출하는 위치가 불분명하여 닫을때 포커스를 이동시켜야 하는 부분이 애매함
		// 따라서, 기본적으로 페이지 타이틀 #wrap h1을 향하도록 작업
		$('#wrap h1').attr('tabindex', 0).focus();
		// 배너형의 경우 재호출시 닫기 버튼을 읽지 않도록 하기 위해 aria-hidden=true 재적용
		// $('.bannerCont').find('.btnPopClose').attr('aria-hidden', true);
	} else {
		POPUP.hide();
	}

	// 팝업을 열었던 요소에 포커스를 이동
  $("#" + $closeID + "-open").focus();
  console.log(`Closed popup : ${$closeID}`);

	// 접근성용 함수 호출
	a11yClose(POPUP);
}

// ************************************
// 토스트 팝업
// 토스트 팝업의 고유 ID를 기준으로 제어
// ************************************
function toastOpen(toastID, message, time) {
  const TOAST = $(toastID);
  const TOAST_ID = TOAST.attr("id");
  const MESSAGE = $(".toastMessage").html(message ? message : "Toast Message");
  const MOTION_TIME = time ? time : 3000; // 속도 임의 조정 옵션
  console.log(`Opened Toast : ${TOAST_ID}`);

  TOAST.addClass("show");
  TOAST.removeClass("hide");
  TOAST.attr("aria-hidden", false);
  TOAST.attr("aria-invalid", true);
  MESSAGE;
  $(".toastOpen").attr("aria-describedby", TOAST_ID);
  console.log(`${TOAST_ID} show`);
  setTimeout(function () {
    TOAST.removeClass("show");
    TOAST.addClass("hide");
    TOAST.attr("aria-hidden", true);
    TOAST.removeAttr("aria-invalid");
    $(".toastOpen").removeAttr("aria-describedby");
    console.time();
    console.log(`${TOAST_ID} hide`);
    console.timeEnd();
  }, MOTION_TIME);
}

// ************************************
// POPUP Accessibility 속성
// a11yOpen, a11yClose
// ************************************
// a11yOpen
// 팝업 오픈시 적용될 속성들
function a11yOpen(element){
	// 접근성 포커스 위치 설정
  // 타이틀에 ID와 동일한 data 값 설정, ID-title 설정
  // 팝업 닫기 버튼에 data 값 설정
  // e.find("h2").focus();
  element.find("h2").attr('tabindex', 0).focus();
  element.find("h2").attr("id", element.attr("id") + "-title");
  element.find("h2").attr("data-popup-focus", element.attr("id"));
  element.find(".btnPopClose, .closePop").attr("data-popup-focus-close", element.attr("id") + "-close");

	// 팝업 오픈시 바닦영역 접근 차단
	element.attr('aria-hidden', false);
	$('html, body').css("overflow","hidden");
	$('#wrap').attr('aria-hidden', true);

	// ************************************
	// 팝업내 포커스 이동
	// 정방향: title -> page -> close -> title
	// 역방향: title -> close -> title -> close
	// ************************************
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
	focusMOVING(element.attr("id"));

	// ************************************
	// 팝엡에 타이틀이 없는 confirm형인 경우,
	// h2에 role="text", titleA11y 클래스 추가
	// ************************************
	element.each(function(){
		const confirm = $('.confirmMsg')
		if ( confirm.length !== 0 ) {
			$(this).closest('.popupWrap').find('h2 > span').attr('role', 'text').addClass('titleA11y');
		}

		// TODO: 업데이트 예정
		// confirm형인 경우 접근성 속성 추가 여부 검토중
		var findA = element.find('a');
		var findB = element.find('button');
		// console.log(`find A ${findA.length}, find Button ${findB.length}`);
		if ( !findA.hasClass('btnPopClose') ) {
		// 	console.log(`%cThis Popup is has Close button.`, `background: #000; color: #fff`);
		// } else {
			console.log(`%cThis Popup is hasn't Close button.`, `background: #c00; color: #fff`);
			// console.log(findB.closest('div'));
		}
	});
}

// a11yClose
// 팝업 닫을때 적용될 속성들
function a11yClose(element){
	// 팝업 닫을시 바닦영역 접근 해제
	element.attr('aria-hidden', true);
	$('html, body').css("overflow","auto");
	$('#wrap').attr('aria-hidden', false);
}


// ------------------------------------
//	iOS 확대막기
// ------------------------------------
function iosZom() {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    window.document.addEventListener(
      "touchmove",
      (e) => {
        if (e.scale !== 1) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }
}

function checkMobile() {
  var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
  if (varUA.indexOf("android") > -1) {
    $("html").addClass("android");
    return "android";
  } else if (
    varUA.indexOf("iphone") > -1 ||
    varUA.indexOf("ipad") > -1 ||
    varUA.indexOf("ipod") > -1
  ) {
    $("html").addClass("iOS");
    return "ios";
  } else {
    $("html").addClass("otherOS");
    return "other";
  }
}

var arrNumberWord = new Array(
  "",
  "일",
  "이",
  "삼",
  "사",
  "오",
  "육",
  "칠",
  "팔",
  "구"
); // 1 ~ 9 한글 표시
var arrDigitWord = new Array("", "십", "백", "천"); // 10, 100, 100 자리수 한글 표시
var arrManWord = new Array("", "만 ", "억 ", "조 "); // 만단위 한글 표시

function fn_change_hangul_money(txt_id) {
  var num_value = txt_id.value;
  var num_length = num_value.length;

  if (isNaN(num_value) == true) {
    return;
  }
  var han_value = "";
  var man_count = 0; // 만단위 0이 아닌 금액 카운트.

  for (var i = 0; i < num_value.length; i++) {
    // 1단위의 문자로 표시.. (0은 제외)
    var strTextWord = arrNumberWord[num_value.charAt(i)];

    // 0이 아닌경우만, 십/백/천 표시
    if (strTextWord != "") {
      man_count++;
      strTextWord += arrDigitWord[(num_length - (i + 1)) % 4];
    }

    // 만단위마다 표시 (0인경우에도 만단위는 표시한다)
    if (man_count != 0 && (num_length - (i + 1)) % 4 == 0) {
      man_count = 0;
      strTextWord = strTextWord + arrManWord[(num_length - (i + 1)) / 4];
    }
    han_value += strTextWord;
  }
  // if(num_value != 0){
  // 	han_value = han_value;
  // }
  // document.all.han_money.innerText = han_value;
  $(txt_id).parents(".formItem").find(".numVal").find(".data").text(han_value);
  console.log(han_value);
}

function jsListMore() {
  var scrollState = true;
  var idx = 10;
  $(window).scroll(function () {
    // console.log('docuH :' + $(document).height());
    // console.log('scrollTop :' + $(window).scrollTop());
    // console.log('windowH :' + $(window).height());
    var contHeight = $(document).height();
    var currentScroll = $(window).scrollTop() + $(window).height();
    if (contHeight <= currentScroll + 1) {
      $(".jsListMore .listItem")
        .slice(idx, idx + 5)
        .slideDown(500);
      if (scrollState) {
        scrollState = false;
      }
      idx += 5;
      // console.log(idx);
    }
    if ($(".jsListMore .listItem:hidden").length < 1) {
      $(".more").hide();
    }
  });
}


// ------------------------------------
// 팝업 종류에 따라 대표 클래스 지정
// ------------------------------------
// function PopCheck() {
// 	$('.popWrap').each(function(e){
// 		if ( $(this).hasClass('dragPop') ) {
// 			$('.popWrap').attr('aria-hidden', true);
// 			//$(this).addClass('center');
// 		} else {
// 			$('.dragPop').attr('aria-hidden', false);
// 			//$(this).addClass('slide');
// 		}
// 	});
// }

// 팝업 초기 접근성 접근 차단

// ------------------------------------
//	다크 모드
// ------------------------------------
// 다크모드 버튼 생성
function darkMode() {
  $(".pub").append(
    '<div class="colorModeSel">' +
      '<input type="checkbox" id="colorMode"><label for="colorMode"><span class="blind">다크모드</span></label>'
  );
  colorAddClassinit();
  $('.colorModeSel input[type="checkbox"]').change(function () {
    colorAddClass();
  });
}

// 다크모드 판단
function colorAddClassinit() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    $('.colorModeSel input[type="checkbox"]').prop("checked", true);
  }
  colorAddClass();
}

// 다크,라이트모드 전환
function colorAddClass() {
  var colorModeV = $('.colorModeSel input[type="checkbox"]').prop("checked");
  if (colorModeV == false) {
    $html.removeClass("dark");
    $html.addClass("light");
    console.log("cok_pub2.js : colorMode : 밝은모드");
  } else {
    $html.removeClass("light");
    $html.addClass("dark");
    console.log("cok_pub2.js : colorMode : 어두운모드");
  }
}

// ------------------------------------
//	시니어 모드
// ------------------------------------
// 시니어 버튼 생성
function senior() {
  $(".pub").append(
    '<div class="seniorModeSel">' +
      '<input type="checkbox" id="seniorMode"><label for="seniorMode"><span class="blind">시니어모드</span></label>'
  );
  typeAddClassinit();
  $('.seniorModeSel input[type="checkbox"]').change(function () {
    typeAddClass();
  });

  // console.log($('.popLayout').height());
}

// 시니어 판단
function typeAddClassinit() {
  if (window.matchMedia("(prefers-color-scheme: senior)").matches) {
    $('.seniorModeSel input[type="checkbox"]').prop("checked", true);
  }
  typeAddClass();
}

// 다크,라이트모드 전환
function typeAddClass() {
  var seniorModeV = $('.seniorModeSel input[type="checkbox"]').prop("checked");
  // var seniorpopLayoutHeight = $('.senior .popLayout').height();

  // console.log('senior:' + seniorpopLayoutHeight);

  if (seniorModeV == false) {
    $html.removeClass("senior");
    $html.addClass("normal");
    console.log("cok_pub2.js : seniorMode : 노말모드");
    // dragEvent();
  } else {
    $html.removeClass("normal");
    $html.addClass("senior");
    console.log("cok_pub2.js : seniorMode : 시니어모드");
    // $('.senior .popWrap').css('height', seniorpopLayoutHeight + 'px');
    // seniorDragEvent();
  }
}
