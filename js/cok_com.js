/* [SEPTEM] UI Dev Team :: 콕뱅크 com js */
"use strict";
var tabSwipeWidth = [];

$(function () {
	// 초기값 실행 함수
	var common_ui = {
		init: function () {
			common_ui.initBrowserCheck();
			common_ui.inp();
			common_ui.jsTab();
			common_ui.jsTabBox();
			common_ui.jsTabInTab();
			common_ui.jsTabInTabPos();
			common_ui.jsTabSwipe();
			common_ui.jsTgCont();
			common_ui.jsAcc();
			common_ui.jsListItemCheck();
			common_ui.jsActiveSelect();
			common_ui.jsToolTipPosition();
			common_ui.initTopBtn();
			common_ui.initButtonCheck();
			common_ui.initPopupCloseCheck();
			common_ui.initFooterToast();
			common_ui.initPopupSet();
			common_ui.initDotListSolo();
			common_ui.initArrRemove();
			common_ui.initAccess();
			common_ui.initPrdDetail();
			common_ui.initSrchDivid();
			common_ui.initPrdAccTop();
		},

		initPopupSet: function () {
			$(".popupWrap").attr("role", "dialog"); // 모든 팝업에 role 속성 부여
		},

		initBrowserCheck: function () {
			var ua = navigator.userAgent,
				standalone = navigator.standalone,
				safari = /safari/.test( ua.toLowerCase() );
			if (/Android/i.test(ua)) {
				$("html").addClass("Android").data("browser", "Android");
				var androidversion = parseFloat(ua.slice(ua.indexOf("Android") + 8));
				if (androidversion < 4.5) $("html").addClass("androidLow");
				if (androidversion == 4.4) $("html").addClass("android4d4");
			} else if (/iPad|iPhone|iPod/i.test(ua)) {
				var verRegx = /os (\d+)_(\d+)_?(\d+)?/i;
				var match = verRegx.exec(ua);
				$("html").addClass("iOS").data("browser", "iOS");
				// 개발로 이관 : 콕뱅크 앱버전(웹뷰버전) + iOS버전 체크하여 클래스 추가
				// if(match && (Number(match[1]+'.'+match[2]) >= 16.4)){
				// 	if (!standalone && !safari) {
				// 		$('html').addClass('OS16 OS164');
				// 		window.isIOSWebView = true;
				// 	}
				// } else if(match && Number(match[1]+'.'+match[2]) >= 16 && Number(match[1]+'.'+match[2]) <= 16.3) {
				// 	$('html').addClass('OS16');
				// }
			} else if (/Chrome/i.test(ua)) {
				$("html").addClass("Chrome").data("browser", "Chrome");
			}
		},

		// 인풋요소 함수
		inp: function () {
			$("input[readonly]").each(function () {
				if( !$(this).hasClass('sKey') ){ //[2023-05-25] 계좌번호 입력 케이스 추가
					$(this).parent(".inpText").addClass("readonly");
				}
			});
			$("input[disabled]").each(function () {
				// $(this).parent(".inpText").addClass("disabled");
			});
			$("input.sKey").each(function () {
				$(this).parent(".inpText").addClass("sKey");
			});
			// action ui경우
			$("input[type='text'],input[type='tel']").each(function () {
				if (
					$(this).closest(".formItem").hasClass("action") &&
					$(this).val() !== ""
				) {
					$(this).closest(".formItem").addClass("up");
					$(this).closest(".formItem").find(".formTit").addClass("default");
				}
			});
		},

		// 탭 메뉴 접근성 초기 속성값
		jsTab: function () {
			$('[role="tab"]').each(function () {
				if ($(this).hasClass("active")) {
					$(this).attr("aria-selected", "true");
				} else {
					$(this).removeAttr("aria-selected");
				}
			});
		},

		// 탭 박스형 초기클래스 추가
		jsTabBox: function () {
			$(".tabWrap.box2").each(function () {
				var aLen = $(this).find("a").length;
				var aCurIdx = $(this).find("a.active").index() + 1;
				$(this).addClass("n" + aLen);
				$(this)
					.find(".tabList")
					.addClass("pos" + aCurIdx);
			});
		},

		// 탭 인 탭형 초기클래스 추가
		jsTabInTab: function () {
			$(".tabWrap").each(function () {
				if ($(this).hasClass("jsTabInTab")) {
					$(this).find('[role="tablist"]').addClass("inTabList");
					$(".inTabList").find('[role="tab"]').addClass("inTabMenu");
					$(this)
						.find('.tabPanelList [role="tabpanel"]')
						.addClass("inTabPanel");
					$(this)
						.find('.tabPanelList [role="tabpanel"]')
						.removeClass("tabPanel");
				}
			});
		},

		// 탭 인 탭형 초기클래스 추가
		jsTabInTab: function () {
			$(".tabWrap").each(function () {
				if ($(this).hasClass("jsTabInTab")) {
					$(this).find('[role="tablist"]').addClass("inTabList");
					$(".inTabList").find('[role="tab"]').addClass("inTabMenu");
					$(this)
						.find('.tabPanelList [role="tabpanel"]')
						.addClass("inTabPanel");
					$(this)
						.find('.tabPanelList [role="tabpanel"]')
						.removeClass("tabPanel");
				}
			});
		},

		// 탭 인 탭형 포지션
		jsTabInTabPos: function () {
			$(".alarmWrap .tabList a").each(function(i){
				if($(".alarmWrap .tabList a").eq(i).hasClass('active')){
					var tabWidth = $(".alarmWrap .tabList a").outerWidth();
					$(".alarmWrap .tabList").stop().animate({scrollLeft:((tabWidth+16)*(i))},300);
				}
			});
		},

		// 탭 스와이프 width값 배열 저장
		jsTabSwipe: function () {
			if(!$('.tabSwipe').closest('.popupWrap')){
				$(".tabSwipe a").each(function (e) {
					tabSwipeWidth.push($(".tabSwipe a").eq(e).innerWidth());
				});
			} else {
				setTimeout(function(){
					$(".tabSwipe a").each(function (e) {
						tabSwipeWidth.push($(".tabSwipe a").eq(e).innerWidth());
					});
				}, 500);
			}
		},

		// 토글버튼 접근성 초기 속성값
		jsTgCont: function () {
			$(".jsTgCont").each(function () {
				if ($(this).css("display") == "none") {
					$(this)
						.closest(".jsTgWrap")
						.find(".jsTgBtn")
						.attr("aria-expanded", "false");
				} else {
					$(this)
						.closest(".jsTgWrap")
						.find(".jsTgBtn")
						.attr("aria-expanded", "true");
				}
			});
		},

		// 아코디언 접근성 초기 속성값
		jsAcc: function () {
			$(".jsAcc .accHeader").each(function () {
				if ($(this).hasClass('active')) {
					$(this)
						.attr("aria-expanded", "true")
						.next('.view')
						.attr("aria-hidden", "false");
				} else {
					$(this)
						.attr("aria-expanded", "false")
						.next('.view')
						.attr("aria-hidden", "true");
				}
			});
		},

		// 리스트 항목 초기 선택상태 확인
		jsListItemCheck: function () {
			$(".jsSelectLink").each(function () {
				if ($(this).hasClass("active")) {
					$(this).addClass("active").attr("title", "선택됨");
				} else {
					$(this).removeClass("active").attr("title", "");
				}
			});
		},

		// 리스트 항목 초기 선택상태 확인
		jsActiveSelect: function () {
			$(".jsSelectWrap button").each(function () {
				if ($(this).find(".item").hasClass("active")) {
					$(this).addClass("active").attr("title", "선택됨");
				} else {
					$(this).removeClass("active").attr("title", "");
				}
			});
		},

		// 툴팁이 flex, table cell 등으로 위치가 잡히지 않을 경우
		// 강제로 툴팁의 좌우 여백을 고정폭으로 대치 시킴
		jsToolTipPosition: function () {
			var winW = $(window).width();
			$(".tooltipWrap").each(function () {
				if ($(this).hasClass("jsTooltipPosition")) {
					$(this)
						.find(".tooltipCont")
						.css("width", winW - 40 + "px");
				}
			});
		},

		initTopBtn: function() {
			var jsBtnTop = $('.jsBtnTop');
			$(window).scroll(function(e){
				if($('html').scrollTop() > 0){
					jsBtnTop.fadeIn();
				} else {
					jsBtnTop.fadeOut();
				}
			});
		},

		// 바닥페이지 진입시 #footer_cont 영역 유무 확인 하여 여백조정 : 콕모임 수정
		initButtonCheck: function () {
			if(!$("#container #frameObj").length){
				if ($("#wrap #footer_cont").length === 0) {
					$("#container").css("padding-bottom", "30px");
				}
			}
		},

		// 풀팝업의 .popFootBox 유무 확인 하여 여백조정
		initFullPopupButtonCheck: function () {
			var FootBox = $(".popFootBox")
				.closest(".popContentBox")
				.addClass("hasFoot");
			FootBox.find(".popContBox").css("bottom", 105);
		},

		// 팝업에 닫기(btnPopClose) 버튼 유무에 따라 타이틀(H2) 영역 여백 변경
		initPopupCloseCheck: function () {
			$(".btnPopClose")
				.closest(".popupWrap")
				.find("h2")
				.addClass("closerSpace");
		},

		initFooterToast: function () {
			if ($("#footer_cont .toastMessage, #footer_cont .floating").length > 0) {
				$("#container").css("padding-bottom", 195);
			} else if ($("#footer_cont .btnLnkLine").length > 0) {
				$("#container").css("padding-bottom", 160);
			}

			// 팝업용
			$(".popupWrap .popFootBox").each(function () {
				var checkToast = $(this).find(".toastMessage");
				checkToast.closest(".popFootBox").prev().css("padding-bottom", 100);
				//[2023-05-22] 콕모임 : 약관플로팅 추가 -->
				var checkFloating = $(this).find(".floating");
				checkFloating.closest(".popFootBox").prev().css("padding-bottom", 100);
			});

			if ($(".popupWrap .Layer_Pop_Close .floating").length > 0){
				$(".popupWrap .Layer_Con").css("padding-bottom", 90);
			}
		},

		currentDate: function () {
			if ($(".typeMonth .current").length > 0) {
				$(".typeMonth .current").attr("title", "당월");
			} else if ($(".typeDay .current").length > 0) {
				$(".typeDay .current").attr("title", "오늘");
			}
		},

		//도트리스트 하나일때
		initDotListSolo: function () {
			var dotList = $(".defTit2").next(".listDot").find("li");
			if (dotList.length == 1) {
				dotList.addClass("one");
			}
		},

		// 화살표 특수문자 제거
		initArrRemove: function () {
			$("a:contains('')").each(function(){
				$(this).wrapInner("<div class='inner'></div>");
				if($(this).hasClass('termsArrow')){
					$('.termsArrow').find('.inner').remove();

				} else if($(this).parent('.limitMoney').length > 0){	//2022-11-18 윤지현:송금가능금액 case추가
					$(this).parent('.limitMoney').find(".arr").remove();

					var arrTxt = $(this).find(".inner").html();
					arrTxt = arrTxt.replace('', '');
					$(this).find(".inner").html(arrTxt);

				} else{
					$(this).find(".icon").remove();
					$(this).find(".arr").remove();

					var arrTxt = $(this).find(".inner").text();
					arrTxt = arrTxt.replace('', '');
					$(this).find(".inner").text(arrTxt);
				}
			});
		},

		// 접근성 관련
		initAccess: function () {
			$('.divingLine').attr("aria-hidden", "true");
			$('hr').attr("aria-hidden", "true");
			$('.homeModeTab ').find('.imageBox').attr("aria-hidden", "true");
		},

		// 마케팅컨텐츠 초점접근 막기
		initPrdDetail: function () {
			$(".imgAreaUnit").each(function(){
				$(this).attr('aria-hidden',true)
			});
		},

		// 검색창 아래 divingLine 간격조정
		initSrchDivid :function() {
			var srchInp = $('.formWrap.typeSrch');
			srchInp.parent('section').next('.divingLine').addClass('reMg');
			srchInp.next('.divingLine').addClass('reMg');
		},

		// 상품몰 상품상세 아코이언영역에 slideSetTop 클래스 추가
		initPrdAccTop :function() {
			$('.jsAcc.marketAcc').each(function(){
				$(this).addClass('slideSetTop');
			})
		}
	};



	// ===============================================
	// =============== 클릭이벤트 영역 ===============
	// ===============================================
	$(document)
		.off("click", ".jsMoreBtn")
		.on("click", ".jsMoreBtn", function (e) {
			var $jsMore = $(this).parents(".jsMore");
			$(this).next(".jsMoreWrap").slideToggle();
			$jsMore.toggleClass("on");
			$(this).next("color", "red");
			if ($(this).siblings(".jsMoreWrap").css("display") == "none") {
				$jsMore.attr("aria-expanded", "true");
			} else {
				$jsMore.attr("aria-expanded", "false");
			}
			e.preventDefault();
			e.stopPropagation();
		})

		//tab
		.off("click", '[role="tab"]')
		.on("click", '[role="tab"]', function (e) {
			if ($(this).hasClass('disabled')) {
				// $(this).closest(".tabWrap").find(".tabPanelList .tabPanel").eq($(this).index()).addClass("show");
			} else {
				$(this).closest(".tabList").find('[role="tab"]').removeClass("active").removeAttr("aria-selected");
				$(this).addClass("active").attr("aria-selected", "true");
				$(this).closest(".tabWrap").find(".tabPanelList .tabPanel").removeClass("show");
				$(this).closest(".tabWrap").find(".tabPanelList .tabPanel").eq($(this).index()).addClass("show");
				if ($(this).closest(".tabWrap").hasClass("box2")) {
					var aLen = $(this).parent().find("a").length;
					var idx = $(this).index() + 1;
					$(this).parent().removeClass().addClass("tabList");
					$(this)
						.closest(".tabWrap")
						.addClass("n" + aLen);
					$(this)
						.parent()
						.addClass("pos" + idx);
					//console.log(aLen);
				}

				// s: [2023-03-31] 김연진 : 거래메모추가
				if($(this).parent().hasClass("posX")){
					var active = $(this).index();
					var move_x = 0;

					for(var i=0;  i < active; i++){
						move_x += $("a", $(this).parent(".posX")).eq(i).outerWidth() + 5;
					}

					$(this).parent(".posX").animate({
						scrollLeft: move_x +"px"
					}, 200);
				}
				// e: [2023-03-31] 김연진 : 거래메모추가 */
			}
			e.preventDefault();
			e.stopPropagation();
		})

		//tab
		.off("click", ".inTabMenu")
		.on("click", ".inTabMenu", function (e) {
			// 	tabInTab
			var boxR = $('.mainMenuBox').find('.boxRight');
			$(this)
				.closest(".inTabList")
				.find('[role="tab"]')
				.removeClass("active")
				.removeAttr("aria-selected");
			$(this).addClass("active").attr("aria-selected", "true");
			$(this)
				.closest(".jsTabInTab")
				.find(".tabPanelList .inTabPanel")
				.removeClass("show");
			$(this)
				.closest(".jsTabInTab")
				.find(".tabPanelList .inTabPanel")
				.eq($(this).index())
				.addClass("show");
				boxR.scrollTop(0);
			e.preventDefault();
			e.stopPropagation();
		})

		//tabSwipe
		.off("click", ".tabSwipe a")
		.on("click", ".tabSwipe a", function (e) {
			var tabSwiperSubWidth = 0;
			for (var i = 0; i < $(this).index(); i++) {
				tabSwiperSubWidth += tabSwipeWidth[i];
			}
			$(".tabSwipe").stop().animate({ scrollLeft: tabSwiperSubWidth }, 300);
			e.preventDefault();
			e.stopPropagation();
		})

		//toggle
		.off("click", ".jsTgBtn")
		.on("click", ".jsTgBtn", function () {
			if (
				$(this).closest(".jsTgWrap").find(".jsTgCont").css("display") == "block"
			) {
				$(this).attr("aria-expanded", "false");
				$(this).closest(".jsTgWrap").find(".jsTgCont").slideUp(200);
				$(this).closest(".jsTgWrap").removeClass("active"); //아코디언 오픈시 일부 디자인 영역 제어를 위한 클래스 추가
			} else {
				$(this).attr("aria-expanded", "true");
				$(this).closest(".jsTgWrap").find(".jsTgCont").slideDown(200);
				$(this).closest(".jsTgWrap").addClass("active"); //아코디언 오픈시 일부 디자인 영역 제어를 위한 클래스 추가
			}

		})

		//아코디언(faq)
		.off('click', '.jsAcc .accHeader')
		.on('click', '.jsAcc .accHeader', function (e) {
			var $obj = $(this);
			var $target = $obj.attr('aria-controls');
			if (!$obj.hasClass('active')) {
				$obj.closest('.jsAcc').find('.accHeader').removeClass('active').attr('aria-expanded', 'false');
				$obj.addClass('active').attr('aria-expanded', 'true');
				if ($obj.parent().parent().hasClass('slideSetTop')) { //헤더 top 고정일 경우
					$obj.closest('.jsAcc').find('.view').hide().attr('aria-hidden', "true");
					$obj.next().show().attr('aria-hidden', "false");;

					if($obj.closest('.jsAcc').parent('div').hasClass('popContBox')){
						popupBoardTop($obj);
					} else{
						boardTop($obj);
					}
				} else {
					//$('.view[data-acc-view="' + $target + '"]').trigger('showAcc');
					$obj.closest('.jsAcc').find('.view').slideUp(200).attr('aria-hidden', "true");
					$obj.next('.view').slideDown(200).attr('aria-hidden', "false");
				}
			} else {
				$obj.closest('.jsAcc').find('.accHeader').removeClass('active').attr('aria-expanded', 'false');
				$obj.removeClass('active').attr('aria-expanded', 'false');
				if ($obj.parent().parent().hasClass('slideSetTop')) { //헤더 top 고정일 경우
					$obj.closest('.jsAcc').find('.view').hide().attr('aria-hidden', "true");
				} else {
					//$('.view[data-acc-view="' + $target + '"]').trigger('hideAcc');
					$obj.closest('.jsAcc').find('.view').slideUp(200).attr('aria-hidden', "true");
				}
			}
			e.preventDefault();
			e.stopPropagation();
		})

		//input reset 버튼
		.off("click", ".btnReset")
		.on("click", ".btnReset", function () {
			$(this)
				.prevAll(
					'input[type="text"]:not([readonly]), input[type="tel"]:not([readonly]),textarea[id="MEMOtxt"]:not([readonly])'
				) // [2023-03-31] 김연진 : 거래메모추가
				.val("")
				.focus();
			$(this).parent(".inpText").prev(".numVal").find(".val").empty();
			$(this).hide();
		})
		.off("focus, focusin", 'input[type="text"]:not([readonly]), input[type="tel"]:not([readonly])')
		.on("focus, focusin", 'input[type="text"]:not([readonly]), input[type="tel"]:not([readonly])', function () {
			var $this = $(this);
			$this.parent(".inpText").addClass("focus");
			// s: action UI 분기
			if ($this.closest(".formItem").hasClass("action")) {
				$this.closest(".formItem").addClass("up");
				$this.closest(".formItem").find(".formTit").addClass("point");
			}
			// e: action UI 분기
			if ($this.val() !== "") {
				$this.closest(".formItem").removeClass("down").addClass("up"); //action UI 분기
				$this.closest(".formItem").find(".formTit").removeClass("point"); //action UI 분기
				$this.nextAll(".btnReset").show();
				if ($this.hasClass("tyNum") == true) {
					$this.parent(".inpText").prev(".numVal").addClass("focus");
				}
			} else {
				if ($this.closest(".formItem").hasClass("action")) {
					$this.closest(".formItem").removeClass("down").addClass("up");
				}
				$this
					.closest(".formItem")
					.find(".formTit")
					.removeClass("default")
					.addClass("point");
			}

			// $('html').addClass('keypadOn');  //개발에서 클래스제어해야 함
		})
		.off("keyup", 'input[type="text"]:not([readonly]), input[type="tel"]:not([readonly])')
		.on("keyup", 'input[type="text"]:not([readonly]), input[type="tel"]:not([readonly])', function () {
			var $this = $(this);
			if ($this.val() !== "") {
				$this.nextAll(".btnReset").show();
				$this.parent(".inpText").prev(".numVal").addClass("focus");
			} else {
				$this.nextAll(".btnReset").hide();
				$this.parent(".inpText").prev(".numVal").removeClass("focus");
			}
		})
		.off("focusout, blur", 'input[type="text"]:not([readonly]), input[type="tel"]:not([readonly])')
		.on("focusout, blur", 'input[type="text"]:not([readonly]), input[type="tel"]:not([readonly])', function () {
			var $this = $(this);
			$this.parent(".inpText").removeClass("focus");
			$this.parent(".inpText").prev(".numVal").removeClass("focus");
			// s: action UI 분기
			if ($this.closest(".formItem").hasClass("action")) {
				if ($this.val() == "") {
					$this.closest(".formItem").find(".formTit").removeClass("point");
					$this.closest(".formItem").removeClass("up").addClass("down");
				} else {
					$this.closest(".formItem").find(".formTit").addClass("default");
					$this.closest(".formItem").removeClass("down").addClass("up");
				}
			}
			// e: action UI 분기

			// $('html').removeClass('keypadOn');  //개발에서 클래스제어해야 함

			if ($this.val() == "") {
				setTimeout(function () {
		  		$this.nextAll(".btnReset").hide();
				}, 1); //300이상이어야 PC에서 작동
			}
		})


		//상단으로 탑버튼
		.off("click", ".jsBtnTop")
		.on("click", ".jsBtnTop", function () {
			$('html,body').stop().animate({scrollTop:0});
		})

		// s: textArea reset 버튼 [2023-03-31] 김연진 : 거래메모추가
		.on("keyup", 'textarea[id="MEMOtxt"]:not([readonly])', function () {
			var $this = $(this);
			if ($this.val() !== "") {
				$this.nextAll(".btnReset").show();
				$this.parent(".memo").prev(".inpTextArea").addClass("focus");
			} else {
				$this.nextAll(".btnReset").hide();
				$this.parent(".memo").prev(".inpTextArea").removeClass("focus");
			}
		})
		.on('focus', 'textarea[id="MEMOtxt"]:not([readonly])', function(){
			$(".inpTextArea").addClass("focus");
		})
		.on("focusout, blur", 'textarea[id="MEMOtxt"]:not([readonly])', function () {
			var $this = $(this);
			$this.parent(".inpTextArea").removeClass("focus");
		})
		// e: textArea reset 버튼 [2023-03-31] 김연진 : 거래메모추가

		// 정보 더보기
		.off("click", ".jsShowBtn")
		.on("click", ".jsShowBtn", function () {
			var $this = $(this);
			if (!$this.hasClass("active")) {
				$this.addClass("active").attr("aria-expanded", "true");
				$(".hideBox").show().find("[data-focus]").attr("tabindex", "0").focus();
			} else {
				$this.removeClass("active").attr("aria-expanded", "false");
				$(".hideBox").hide();
			}
		})

		// 정보 더보기 한개씩 열고 닫기
		.off("click", ".jsOneShControl")
		.on("click", ".jsOneShControl", function () {
			var $this = $(this);
			var box = $this.closest(".jsShWrap").find(".jsShTarget");
			$this.each(function () {
				if ($this.hasClass("show")) {
					box.find(".hideBox").hide();
					$this.removeClass("show").attr("aria-expanded", "false").text("펼침");
				} else {
					box
						.find(".hideBox")
						.show()
						.find("[data-focus]")
						.attr("tabindex", "0")
						.focus();
					$this.addClass("show").attr("aria-expanded", "true").text("닫힘");
				}
			});
		})

		// 정보 더보기 전체 열고 닫기
		.off("click", ".jsAllShControl")
		.on("click", ".jsAllShControl", function () {
			$(this).toggleClass("change");
			if ($(this).hasClass("change")) {
				$(".jsShControl").addClass("show");
				$(".jsShTarget").find(".hideBox").css("display", "block");
				$(".jsAllShControl").text("모두닫기");
				$(".jsAllShControl").prop("aria-expanded", false);
			} else {
				$(".jsShControl").removeClass("show");
				$(".jsShTarget").find(".hideBox").css("display", "none");
				$(".jsAllShControl").text("모두펼침");
				$(".jsAllShControl").prop("aria-expanded", true);
			}
		})

		// 정보 더보기 구조
		.off("click", ".jsShControl")
		.on("click", ".jsShControl", function () {
			var $this = $(this);
			var box = $this.closest(".jsShWrap").find(".jsShTarget");
			var targetAttr = $(".jsShTarget").find(".hideBox > li:first-child > .tit");
			targetAttr.attr("data-focus", "focus");
			$this.each(function () {
				if ($this.hasClass("show")) {
					box.find(".hideBox").hide();
					$this.removeClass("show").attr("aria-expanded", "false");
				} else {
					box.find(".hideBox").show().find("[data-focus]").attr("tabindex", "0").focus();
					$this.addClass("show").attr("aria-expanded", "true");
				}
			});
		})

		// 리스트 항목 선택상태 확인
		.off("click", ".jsSelectLink")
		.on("click", ".jsSelectLink", function () {
			var $this = $(this);
			if ($this.hasClass('multi')) {
				if ($this.hasClass("active")) {
					$this.removeClass("active").attr("title", "선택해제됨");
					$(this).parent('.accSelectType').removeClass("active");
				} else {
					$this.addClass("active").attr("title", "선택됨");
					$(this).parent('.accSelectType').addClass("active");
				}
			} else {
				// 사용자 선택상태 확인
				if ($this.hasClass("active")) {
					$(this).removeClass("active").attr("title", "선택해제됨");
					$(this).parent('.accSelectType').removeClass("active");
				} else {
					$(".jsSelectLink").removeClass("active").attr("title", "선택해제됨");
					$(".accSelectType").removeClass("active");
					$(this).addClass("active").attr("title", "선택됨");
					$(this).parent('.accSelectType').addClass("active");
				}
			}
		})

		// 리스트 항목 선택상태 확인
		.off("click", ".item")
		.on("click", ".item", function () {
			var $this = $(this);
			$(".item").removeClass("active").attr("title", "");
			if ($this.find(".item").hasClass("active")) {
				$(this).removeClass("active").attr("title", "");
			} else {
				$(this).addClass("active").attr("title", "선택됨");
			}
		})

		// 약관 및 설명서 전체동의
		.off("click", ".allCheckTopBox input")
		.on("click", ".allCheckTopBox input", function () {
			if ($(this).is(":checked")) {
				$(this).parent(".allCheckTopBox").addClass("active");
			} else {
				$(this).parent(".allCheckTopBox").removeClass("active");
			}
		})

		// 휴대폰 본인인증
		.off("click", ".allCheckTopBox input")
		.on("click", ".allCheckTopBox input", function () {
			if ($(this).is(":checked")) {
				$(this).parent(".allCheckTopBox").addClass("active");
				$(".allAgreeCont").slideDown(200);
			} else {
				$(this).parent(".allCheckTopBox").removeClass("active");
				$(".allAgreeCont").slideUp(200);
			}
		})
		.off("click", ".tooltipWrap .btnToolTip")
		.on("click", ".tooltipWrap .btnToolTip", function (e) {
			var $tooltipCont = $(this).closest(".tooltipWrap").find(".tooltipCont");

			$(".tooltipCont").hide();
			$(".tooltipCont").removeClass("bt");
			$('.popContBox').find(".btnToolTip").addClass("popTooltip");

			if($(this).hasClass('popTooltip')){
				var scrollTop = $('.popContBox').scrollTop();
				var objH = $tooltipCont.outerHeight() + $('.popFootBox').outerHeight() + 35;
				var uspace = $(this).offset().top - scrollTop;
				var dspace = $(window).innerHeight() - uspace;

				console.log(uspace, dspace, objH);
				if(uspace > $(window).innerHeight()/2 && dspace <= objH){
					$tooltipCont.addClass("bt");
					console.log('bt');
				}
				if($(".popContentBox .popFootBox").length === 0 || $(".popContentBox .popFootBox").outerHeight() === 0){
					$tooltipCont.removeClass("bt");
				}
			} else{
				var scrollTop = $(window).scrollTop();
				var objH = $tooltipCont.outerHeight() + $('#footer_cont').outerHeight() + 35;
				var uspace = $(this).offset().top - scrollTop;
				var dspace = $(window).innerHeight() - uspace;

				console.log(uspace, dspace, objH);
				if(uspace > $(window).innerHeight()/2 && dspace <= objH){
					$tooltipCont.addClass("bt");
					console.log('bt');
				}
				if($("#wrap #footer_cont").length === 0 || $("#wrap #footer_cont").outerHeight() === 0){
					$tooltipCont.removeClass("bt");
				}
			}

			$tooltipCont.show();

			$(this)
				.closest(".tooltipWrap").find(".close").on("click", function () {
					$tooltipCont.hide();
					$tooltipCont.removeClass("bt");
					setTimeout(function () {
						$tooltipCont.prev(".btnToolTip").focus();
					}, 100);
				});
		})

		// 달력선택
		.off("click", ".calCont button")
		.on("click", ".calCont button", function () {
			var item = $('.calCont button');
			var curday = $(".calCont .typeDay button.current");
			var curmonth = $(".calCont .typeMonth button.current");
			$(".calCont button").each(function () {
				var str = $(this).text();
				if ($(this).parents('div').hasClass('typeMonth')) {
					$(this).removeClass("active").attr("title", str + "을 선택하고 창을 닫습니다.");
					console.log(1);
				} else {
					$(this).removeClass("active").attr("title", str + "일을 선택하고 창을 닫습니다.");
				}
			})
			curday.removeClass("active").attr("title", "오늘");
			curmonth.removeClass("active").attr("title", "당월");
			$(this).addClass("active").attr("title", "선택됨");
		})

		//전체메뉴
		//전체메뉴 닫기
		.off("click", ".btnAllMenuClose")
		.on("click", ".btnAllMenuClose", function () {
			$('.popContent.allMenu').animate({ 'right': '-100%' }, 500, function () {
				$('#fullPopMenu').hide().attr('aria-hidden', 'true');
				$('#wrap').attr('aria-hidden', 'false');
				$('#header .btnMenu').focus();
			});
		})
		//서브메뉴 열림
		.off("click", ".boxLeft a, .allMenuTab a")
		.on("click", ".boxLeft a, .allMenuTab a", function () {
			$('.boxRight .menus').attr('aria-expanded', 'true');
		})

		.off("click", ".jsActive a")
		.on("click", ".jsActive a", function () {
			if(! $(this).hasClass('active')){
				$('.accreditList a').removeClass('active').attr('title','');;
				$(this).addClass('active').attr('title','선택됨');
			}
		})
		.ready(function () {
			//스와이프 paging init 접근성
			$(".swiper-pagination").find("a.swiper-pagination-bullet-active").attr("title", "선택됨");

			// [2023-01-16] 윤지현 : 스와이퍼 1개일때 pagination 삭제.
			$('.swiper-container').each(function(){
				if($(this).find('.swiper-slide').length == 1){
					$(this).parent('div').find('.swiper-pagination').css('display','none')
				}
			})
		});

	// 페이지 로드 후 기본으로 실행되는 함수
	common_ui.init();
});

//only show/hide
function CrossShowHideClick(name1, name2) {
	$("." + name1).hide();
	$("." + name2).show();
}

// 약관 swiper
function termsSwiper() {
	$(".termsContSwipe").each(function (idx) {
		var $this = $(this);
		$this.addClass("type" + idx);

		//슬라이드 초기화
		if (termsSwiper != undefined) {
			termsSwiper.destroy();
			termsSwiper = undefined;
		}

		var termsSwiper = new Swiper(".type" + idx + " .swiper-container", {
			centeredSlides: true,
			observer: true,
			observeParents: true,
			//observeSlideChildren: true,
			pagination: {
				el: $(".type" + idx).find(".swiper-pagination"),
				clickable: true,
				bulletElement: "a",
			},
			// autoplay: {
			// 	deley: 3000,
			// 	disableOnInteraction: true,
			// },
			navigation: {
				nextEl: $(".type" + idx).find(".swiper-button-next"),
				prevEl: $(".type" + idx).find(".swiper-button-prev"),
			},
			on: {
				init: function () {
					$(".type" + idx + " .swiper-container").find(".swiper-slide").attr("aria-hidden", true).removeAttr("tabindex");
					$(".type" + idx + " .swiper-container").find(".swiper-slide.swiper-slide-active").attr("aria-hidden", false).attr("tabindex", 0);
				},
				slideChangeTransitionEnd: function () {
					$(".type" + idx + " .swiper-container").find(".swiper-slide").attr("aria-hidden", true).removeAttr("tabindex");
					$(".type" + idx + " .swiper-container").find(".swiper-slide.swiper-slide-active").attr("aria-hidden", false).attr("tabindex", 0);
					$(".type" + idx + " .swiper-pagination").find("a").attr("title", "");
					$(".type" + idx + " .swiper-pagination").find("a").eq(this.activeIndex).attr("title", "선택됨");
				},
			},
		});
	});
}

// 정기공지 swiper(pub확인용) : 개발 popup.js의 함수로 공지 띄우고 있음.
function noticeSwiper() {
	var termsSwiper = new Swiper(".notiSwipeWrap .swiper-container", {
		centeredSlides: true,
		autoHeight: true,
		pagination: {
			el: $(".notiSwipeWrap .swiper-pagination"),
			clickable: true,
			bulletElement: "a",
		},
		autoplay : {
		 	deley: 3000,
			disableOnInteraction: true,
		},
		on: {
			init: function () {
				$(".notiSwipeWrap .swiper-container").find(".swiper-slide").attr("aria-hidden", true).removeAttr("tabindex");
				$(".notiSwipeWrap .swiper-container").find(".swiper-slide.swiper-slide-active").attr("aria-hidden", false).attr("tabindex", 0);
			},
			slideChangeTransitionEnd: function () {
				swiperA11y();
				$(".notiSwipeWrap .swiper-pagination").find("a").attr("title", "");
				$(".notiSwipeWrap .swiper-pagination").find("a").eq(this.activeIndex).attr("title", "선택됨");
			},
		},
	});

	//autoplay control 옵션

	$(".notiSwipeWrap .swiper-pagination").append('<a href="javascript:;" class="swiperAuto stop" role="button" aria-label="일시정지"></a>');
	$(".notiSwipeWrap .swiperAuto").on("click", function () {
	if ($(this).hasClass("stop")) {
		$(this).addClass("start").removeClass("stop").attr("aria-label", "재생");
			termsSwiper.autoplay.stop();
		} else {
		$(this).addClass("stop").removeClass("start").attr("aria-label", "일시정지");
			termsSwiper.autoplay.start();
		}
	});

}

// 2022-11-16 로그인 전 시스템공지안내 swiper(pub확인용) : 개발 popup.js의 함수로 공지 띄우고 있음.
function noticeSwiperBefore() {
	var termsSwiper = new Swiper(".notiSwipeWrap2 .swiper-container", {
		centeredSlides: true,
		autoHeight: true,
		pagination: {
			el: $(".notiSwipeWrap2 .swiper-pagination"),
			clickable: true,
			bulletElement: "a",
		},
		autoplay : {
		 	deley: 3000,
			disableOnInteraction: true,
		},
		on: {
			init: function () {
				$(".notiSwipeWrap2 .swiper-container").find(".swiper-slide").attr("aria-hidden", true).removeAttr("tabindex");
				$(".notiSwipeWrap2 .swiper-container").find(".swiper-slide.swiper-slide-active").attr("aria-hidden", false).attr("tabindex", 0);
			},
			slideChangeTransitionEnd: function () {
				swiperA11y();
				$(".notiSwipeWrap2 .swiper-pagination").find("a").attr("title", "");
				$(".notiSwipeWrap2 .swiper-pagination").find("a").eq(this.activeIndex).attr("title", "선택됨");
			},
		},
	});


	//autoplay control 옵션
	$(".notiSwipeWrap2 .swiper-pagination").append('<a href="javascript:;" class="swiperAuto stop" role="button" aria-label="일시정지"></a>');
	$(".notiSwipeWrap2 .swiperAuto").on("click", function () {
	if ($(this).hasClass("stop")) {
		$(this).addClass("start").removeClass("stop").attr("aria-label", "재생");
			termsSwiper.autoplay.stop();
		} else {
		$(this).addClass("stop").removeClass("start").attr("aria-label", "일시정지");
			termsSwiper.autoplay.start();
		}
	});
}

// swiper 접근성
function swiperA11y() {
	$(".swiper-container").find(".swiper-slide").attr("aria-hidden", true).removeAttr("tabindex");
	$(".swiper-container").find(".swiper-slide.swiper-slide-active").attr("aria-hidden", false).attr("tabindex", 0);
}

//셀렉트팝업 터치 슬라이드업
function selectLayerTouchEvent(POPUP) { //POPUP:현재 열려있는 팝업
	var $movPop = POPUP.find('.layerSelectContInner');
	if ($movPop.hasClass('mov')) {
		var $headerH = $movPop.find('.layerSelectTitle').outerHeight();
		var $liL = $movPop.find('.listWrap li').length;
		var $liH = $movPop.find('.listWrap li').outerHeight();
		// var $btnH = $movPop.find('.btnInArea').outerHeight(); //버튼높이 작동X
		if ($liL <= 2) {  //리스트 2개이하 버튼 항시노출
			// $movPop.height( ($liL * $liH) + $headerH + 100); //높이 지정(100 = 패딩포함 하단 여백)
			$movPop.find('.btnInArea').css('display', 'block').addClass('sticky');
		} else {
			// $movPop.height( (3 * $liH) + $headerH);
			$('.layerSelectContent').scroll(function () { //스크롤 맨하단일 경우 버튼 노출
				var scrollTop = $('.layerSelectContent').scrollTop();
				var innerHeight = $('.layerSelectContent').innerHeight();
				var scrollHeight = $('.layerSelectContent').prop('scrollHeight');
				if (scrollTop + innerHeight + 10 >= scrollHeight) {
					$('.accountSelComm .btnInArea').addClass('sticky').fadeIn();
				} else {
					$('.accountSelComm .btnInArea').fadeOut();
				}
			});
		}

		var clientsY;
		var deltasY;
		var flg = false;

		if ($movPop.length > 0) {
			for (var i = 0; i < $movPop.length; i++) {
				$movPop[i].removeEventListener("touchstart", function () { });
				$movPop[i].removeEventListener("touchmove", function () { });
				$movPop[i].removeEventListener("touchend", function () { });
				$movPop[i].addEventListener(
					"touchstart",
					function (e) {
						clientsY = e.touches[0].clientY;
						// console.log("터치팝업 시작 == "+clientsY);
						if ($(".layerSelectContInner.mov").hasClass("set")) {
							//계좌선택팝업이 전체사이즈인경우
							flg = false;
						} else {
							flg = true;
						}
					},
					false
				);
				$movPop[i].addEventListener(
					"touchmove",
					function (e) {
						// console.log("정지");
						if (flg) {
							//계좌선택팝업이 전체사이즈가 아닌 경우 이벤트를 잠근다
							e.preventDefault();

							//console.log("moveState = "+flg);
						} else {
							flg = false;

							//console.log("moveState = "+flg);
						}
					},
					false
				);
				$movPop[i].addEventListener(
					"touchend",
					function (e) {
						deltasY = e.changedTouches[0].clientY - clientsY;
						//console.log("터치팝업 있음 == "+deltasY);
						//GNB동작외 일반화면 터치 작동(GNB메뉴 작동과 충돌하지 않도록 제한적으로 사용)
						if (deltasY > 10) {

							//위에서 아래로 쓸어 내릴때
						} else if (-10 > deltasY) {
							//아래에서 위로 쓸어 올릴때
							// $('.layerSelectContent').scrollTop(0);
							$(".layerSelectCont .layerSelectContInner.mov").addClass("set"); //오픈뱅킹 계좌선택
							// $('.accountSelComm .btnInArea').addClass('show').fadeIn();
						}
						setTimeout(function () { //스크롤 없을 경우 하단 버튼 노출
							var inScrollH = $('.layerSelectCont .layerSelectContent').innerHeight();
							var inContH = $('.layerSelectCont .accountSelComm').outerHeight();
							if (inScrollH >= inContH) {
								$('.accountSelComm .btnInArea').addClass('sticky').fadeIn();
							}
						}, 500); //CSS .mov transition 시간과 동일하게
						flg = false;
					},
					false
				);
			}

		}
	}
}

// 아코디언 top고정
function boardTop(_this) {
	var hei = _this.outerHeight() + 5,
		top = _this.offset().top;
	$('html,body').scrollTop(top - hei);
};

// 아코디언 top고정 [풀팝업]
function popupBoardTop(_this) {
	var hei = _this.outerHeight() + 5,
	popH = $('#header').height() + $('#footer_cont').height() + 380,
	top = _this.position().top;
	$('.popContBox').scrollTop(popH + top - hei);
};

//전체메뉴
function mainMenuHeiCall() {
	var heiCnt = $(window).outerHeight();
	var popHdHei = $('.allMenu .popHead').outerHeight();
	$('.popFocus').focus();
	$('.allMenu .mainMenuBox .menuScroll').css('height', heiCnt - (popHdHei + 44));
	$('#wrap').attr('aria-hidden', 'true');
	$('#fullPopMenu').attr('aria-hidden', 'false');
};

// 금융상품몰 리스트 스와이프
function marketListSwipe() {
	var marketListSwipe = new Swiper(".marketListSwipe .swiper-container", {
		centeredSlides: true,
		observer: true,
		observeParents: true,
		spaceBetween: 10,
		pagination: {
			el: $(".marketListSwipe .swiper-pagination"),
			clickable: true,
			bulletElement: "a",
		},
		breakpoints: {
			// when window width is <= 500px
			500: {
				slidesPerView: 2,
				spaceBetween: 10
			}
		},
		autoplay: {
			deley: 3000,
			disableOnInteraction: true,
		},
		on: {
			init: function () {
				$(".marketListSwipe .swiper-container").find(".swiper-slide").attr("aria-hidden", true).removeAttr("tabindex");
				$(".marketListSwipe .swiper-container").find(".swiper-slide.swiper-slide-active").attr("aria-hidden", false).attr("tabindex", 0);
			},
			slideChangeTransitionEnd: function () {
				swiperA11y();
				$(".marketListSwipe .swiper-pagination").find("a").attr("title", "");
				$(".marketListSwipe .swiper-pagination").find("a").eq(this.activeIndex).attr("title", "선택됨");
			},
		},
	});

	//autoplay control 옵션
	$(".marketListSwipe .swiper-pagination").append('<a href="javascript:;" class="swiperAuto stop" role="button" aria-label="일시정지"></a>');
	$(".marketListSwipe .swiperAuto").on("click", function () {
		if ($(this).hasClass("stop")) {
			$(this).addClass("start").removeClass("stop").attr("aria-label", "재생");
			marketListSwipe.autoplay.stop();
		} else {
			$(this).addClass("stop").removeClass("start").attr("aria-label", "일시정지");
			marketListSwipe.autoplay.start();
		}
	});

	//전체메뉴
	$('.menuBoxWrap .boxLeft .links').click(function(){
		$('.menuBoxWrap .boxLeft a.active').removeClass('active');
	});
	$('.allMenuTab a').click(function(){
		$('.menuBoxWrap .boxLeft a').removeAttr('aria-selected').removeClass('active');
		$('.menuBoxWrap .boxLeft a:first-child').attr('aria-selected', 'true').addClass('active');
	});
}

//달력선택 접근성 추가
function dateActiveInit() {
		$(".calCont button").each(function () {
		if ($(this).hasClass('active')) {
			if($(this).hasClass('current')){
				var str = $(this).attr('title');
				$(this).attr("title", str + " 선택됨");
				}	else {
					$(this).attr("title","선택됨");
				}
			} else if($(this).hasClass('current')){
				if ($(".typeMonth .current").length > 0) {
					$(".typeMonth .current").attr("title", "당월");
				} else if ($(".typeDay .current").length > 0) {
					$(".typeDay .current").attr("title", "오늘");
				}
			}
		})
};