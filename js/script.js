//메뉴
$(function () {
    $('.nav').hover(function () {
        $('.subnav, .nav_bg').stop().slideDown('300ms');
    }, function () {
        $('.subnav, .nav_bg').stop().slideUp('300ms');
    });
});


//공지사항 text
$(function () {
    setInterval(function () {
        $('.notice ul').animate({
            top: '-=' + 20
        }, 'slow', function () {
            $('.notice li').first().appendTo('.notice ul');
            $('.notice ul').css('top', 0);
        });
    }, 3000);
});


//토글
$(function () {
    $(".bottom_01").hide();

    $('.bot_02').click(function () {
        $('.bottom_01').stop().slideToggle('fast');
        $(this).toggleClass("active");
    });
});




//토글이미지 슬라이드
$(function () {
    setInterval(function () {
        $('.bottom_01 ul').animate({
            left: '-=' + 960
        }, 'slow', function () {
            $('.bottom_01 li').first().appendTo('.bottom_01 ul');
            $('.bottom_01 ul').css('left', 0);
        });
    }, 3000);
});

//스크롤 애니메이션
$(function () {
    // 클래스가 "scroll_on"인 모든 요소를 선택합니다.
    const $counters = $(".scroll_on");

    // 노출 비율(%)과 애니메이션 반복 여부(true/false)를 설정합니다.
    const exposurePercentage = 100; // ex) 스크롤 했을 때 $counters 컨텐츠가 화면에 100% 노출되면 숫자가 올라갑니다.
    const loop = true; // 애니메이션 반복 여부를 설정합니다. (true로 설정할 경우, 요소가 화면에서 사라질 때 다시 숨겨집니다.)

    // 윈도우의 스크롤 이벤트를 모니터링합니다.
    $(window).on('scroll', function () {
        // 각 "scroll_on" 클래스를 가진 요소에 대해 반복합니다.
        $counters.each(function () {
            const $el = $(this);

            // 요소의 위치 정보를 가져옵니다.
            const rect = $el[0].getBoundingClientRect();
            const winHeight = window.innerHeight; // 현재 브라우저 창의 높이
            const contentHeight = rect.bottom - rect.top; // 요소의 높이

            // 요소가 화면에 특정 비율만큼 노출될 때 처리합니다.
            if (rect.top <= winHeight - (contentHeight * exposurePercentage / 100) && rect.bottom >= (contentHeight * exposurePercentage / 100)) {
                $el.addClass('acti');
            }
            // 요소가 화면에서 완전히 사라졌을 때 처리합니다.
            if (loop && (rect.bottom <= 0 || rect.top >= window.innerHeight)) {
                $el.removeClass('acti');
            }
        });
    }).scroll();
});

////스크롤 애니메이션
$(function () {
    // 클래스가 "scroll_on"인 모든 요소를 선택합니다.
    const $counters = $(".scroll_02_on");

    // 노출 비율(%)과 애니메이션 반복 여부(true/false)를 설정합니다.
    const exposurePercentage = 100; // ex) 스크롤 했을 때 $counters 컨텐츠가 화면에 100% 노출되면 숫자가 올라갑니다.
    const loop = true; // 애니메이션 반복 여부를 설정합니다. (true로 설정할 경우, 요소가 화면에서 사라질 때 다시 숨겨집니다.)

    // 윈도우의 스크롤 이벤트를 모니터링합니다.
    $(window).on('scroll', function () {
        // 각 "scroll_on" 클래스를 가진 요소에 대해 반복합니다.
        $counters.each(function () {
            const $el = $(this);

            // 요소의 위치 정보를 가져옵니다.
            const rect = $el[0].getBoundingClientRect();
            const winHeight = window.innerHeight; // 현재 브라우저 창의 높이
            const contentHeight = rect.bottom - rect.top; // 요소의 높이

            // 요소가 화면에 특정 비율만큼 노출될 때 처리합니다.
            if (rect.top <= winHeight - (contentHeight * exposurePercentage / 100) && rect.bottom >= (contentHeight * exposurePercentage / 100)) {
                $el.addClass('acti');
            }
            // 요소가 화면에서 완전히 사라졌을 때 처리합니다.
            if (loop && (rect.bottom <= 0 || rect.top >= window.innerHeight)) {
                $el.removeClass('acti');
            }
        });
    }).scroll();
});



//이미지 슬라이드
$(function () {
    setInterval(function () {
        $('.sl_wrap ul').animate({
            left: '-=' + 840
        }, 'slow', function () {
            $('.sl_wrap li').first().appendTo('.sl_wrap ul');
            $('.sl_wrap ul').css('left', 0);
        });
    }, 3000);
});

//bxSlider
