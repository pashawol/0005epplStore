const JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {

		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					document.body.classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', (event) => {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					this.closeMenu();
				}
			}, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	// табы  .
	tabscostume(tab) {

		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					let siblings = element.parentNode.querySelector(`.${tab}__btn.active`);
					let siblingsContent = tabs.Content[index].parentNode.querySelector(`.${tab}__content.active`);
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active')
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				} 
			})
		})
		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /табы

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}")
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	customRange() {

		$(".range-wrap").each(function () {
			let _this = $(this);
			var $range= _this.find(".slider-js");
			var $inputFrom = _this.find(".input_from");
			var $inputTo = _this.find(".input_to");
			var instance, from, to,
				min = $range.data('min'),
				max = $range.data('max');
			$range.ionRangeSlider({
				skin: "round",
				type: "double",
				grid: false,
				grid_snap: false,
				hide_min_max: true,
				hide_from_to: true,
				onStart: updateInputs,
				onChange: updateInputs,
				onFinish: updateInputs
			});
			instance = $range.data("ionRangeSlider");

			function updateInputs(data) {
				from = data.from;
				to = data.to;

				$inputFrom.prop("value", from);
				$inputTo.prop("value", to);
			}

			$inputFrom.on("change", function () {
				var val = $(this).prop("value");

				// validate
				if (val < min) {
					val = min;
				} else if (val > to) {
					val = to;
				}

				instance.update({
					from: val
				});

				$(this).prop("value", val);

			});

			$inputTo.on("change", function () {
				var val = $(this).prop("value");

				// validate
				if (val < from) {
					val = from;
				} else if (val > max) {
					val = max;
				}

				instance.update({
					to: val
				});

				$(this).prop("value", val);
			});

		})
	},
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			$("body").prepend('<p   class="browsehappy container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p>')

		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$("form").submit(function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				});
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		// листалка по стр
		$(" .top-nav li a, .scroll-link").click(function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.ifie();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();
	JSCCommon.customRange();

	// JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect
	let screenName;
	screenName = 'catalog-mob.jpg';
	screenName
		? $(".main-wrapper").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`)
		: '';
	// /добавляет подложку для pixel perfect


	function whenResize() {

		const topH = document.querySelector('header').scrollHeight;
		let stickyElement = document.querySelector('.top-nav')
		if(!stickyElement) return
		window.onscroll = () => {
			if ($(window).scrollTop() > topH) {

				stickyElement.classList.add('fixed');
			} else {
				stickyElement.classList.remove('fixed');
			}
		};

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();

	$('.sDescr__showMore').click(function(){
		$(this).slideToggle();
		$(this).parent().find('.sDescr__row').addClass('active');
	})


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const bannerSleder = new Swiper('.bannerSleder-js', {
		slidesPerView: 1,
		loop: true,
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 2,
		},
		pagination: {
			el: '.bannerSleder-js .swiper-pagination',
			clickable: true,
		},
	});

	const sliderCategory = new Swiper('.sliderCategory-js', {
		slidesPerView: 2,
		loop: false,
		// freeMode: true,
		freeModeMomentum: true,
		watchOverflow: true,
		spaceBetween: 3,
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5,
		},
		pagination: {
			el: '.sliderCategory-js .swiper-pagination',
			clickable: true,
		},
		breakpoints: { 
			992: {
				slidesPerView: 'auto',
			},
		},
	});

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	// modal window
	let now = new Date();
	$('.curentYear').text(now.getFullYear());

	//luckyoneJs

	//prod card slider
	let prodCardThumb = new Swiper('.prod-card-thumb-js', {
		slidesPerView: 'auto',
		spaceBetween: 5,
		//breakpoints
		breakpoints: {
			10: {
				direction: 'vertical',
			},
			576: {
				direction: 'horizontal',
			},
			768: {

			},
			992: {

			},
		},
		//nav
		navigation: {
			nextEl: '.prod-card-th-next',
			prevEl: '.prod-card-th-prev',
		},

		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 10,
		},
	});

	let prodCardSlider = new Swiper('.prod-card-slider-js', {
		slidesPerView: 1,
		spaceBetween: 20,
		loop: true,

		thumbs: {
			swiper: prodCardThumb,
		},
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 2,
		},
	});

	//.det-slider-js
	let detSlider = new Swiper('.det-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		loop: true,

		//nav
		navigation: {
			nextEl: '.det-slider-next',
			prevEl: '.det-slider-prev',
		},
		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 4,
		},
	});

	$('.prod-descr-tab-js').click(function () {
		window.setTimeout(function () {
			let detSwiperCont = document.querySelector('.det-slider-js');
			if(!detSwiperCont) return
			detSwiperCont.swiper.update();
		}, 300);
	})

	//.buy-with-slider-js
	let buyWithSlider = new Swiper('.buy-with-slider-js', {
		//loop: true,

		slidesPerColumnFill: 'row',

		breakpoints: {
			1: {
				spaceBetween: 15,
				slidesPerView: 2,
				slidesPerColumn: 2,
			},
			575: {
				slidesPerColumn: 2,
				slidesPerView: 2,
				spaceBetween: 15,
			},
			768: {
				slidesPerView: 3,
				slidesPerColumn: 1,
				spaceBetween: 20,
			},
			1200: {
				slidesPerView: 4,
				slidesPerColumn: 1,
				spaceBetween: 30,
			},
		},

		//pagination
		pagination: {
			el: $(this).find('.buy-with-pugin'),
			clickable: true,
		},
		//nav
		navigation: {
			nextEl: '.buy-with-next',
			prevEl: '.buy-with-prev',
		},
	});

	//stars js
	$('.star-js').click(function () {
		let thisIndex = $('.star-js').index(this);
		let allThis = this.parentElement.children;

		for (let i = 0; i <= thisIndex; i++) {
			allThis[i].classList.add('active');
		}
		for (let i = thisIndex + 1; i <= allThis.length - 1; i++) {
			allThis[i].classList.remove('active');
		}
	});

	$('.star-js').mouseover(function () {
		let thisIndex = $('.star-js').index(this);
		let allThis = this.parentElement.children;

		for (let i = 0; i <= thisIndex; i++) {
			allThis[i].classList.add('hover-paint-js');
		}
		for (let i = thisIndex + 1; i <= allThis.length - 1; i++) {
			allThis[i].classList.remove('hover-paint-js');
		}
	});
	$('.star-js').mouseout(function () {
		let allThis = this.parentElement.children;
		for (let star of allThis) {
			star.classList.remove('hover-paint-js');
		}
	});

	//end luckyoneJs

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
