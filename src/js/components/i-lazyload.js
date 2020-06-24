"use strict";
import $ from 'jquery';

/**
Opciones para inicializar:
{
	name:    		'lazy',         // Nombre de custom event
	dtSrc:   		'data-src', 		// Atributo para la imagen por defecto formato: img/img-mobile.jpg
	dtResp:  		'data-srcset',  // Atributo para las imagenes responsive formato: img/img-tablet.jpg 768w, img/img-desktop.jpg 1200w
	content: 		'#content'      // Selector de contenido custom scroll
	loadHidden: false						// Cargar las imagenes ocultas
	threshold: 	200							// Espacio de pantalla oculta por pixel para cargar la imagen
}

Opciones por data atributo html:
<src="img/lazy/b.png" data-src="img/lazy/image-1.jpg" alt="" width="800" height="600" class="lazy" lazyload>

Responsive
<src="img/lazy/b.png" data-src="img/lazy/image-m-3.jpg" data-srcset="img/lazy/image-t-3.jpg 768w, img/lazy/image-3.jpg 1200w" alt="" width="800" height="600" class="lazy" lazyload>
**/
$.fn.iLazyLoad = function (opts) {
	var $tg = $(this),
		aWidth = -1,
		aHeight = -1,

		opt = $.extend({}, {
			name: 'lazy',
			dtSrc: 'data-src',
			dtResp: 'data-srcset',
			content: '',
			loadHidden: false,
			threshold: 200
		}, opts);

	if (typeof opts == 'string') {
		if (opts == 'destroy') {
			destroy();
		}
	} else {
		events();
	}

	function events() {
		$(window).on('load resize.' + opt.name + ' scroll.' + opt.name, function (e) {
			eventCont(e.type);
		});

		if (opt.content && $(opt.content).length) {
			$(opt.content).on('scroll.' + opt.name, function (e) {
				eventCont(e.type);
			});
		}
	}

	function eventCont(type) {
		var resTm;

		if (type == 'resize') {
			aWidth = aHeight = -1;

			clearTimeout(resTm);
			resTm = setTimeout(elemLoad, 250);

		} else {
			elemLoad();
		}
	}

	function elemLoad() {
		var wa = winWidth(),
			dtElem = (wa < opt.mobileWidth ? opt.dtMob : opt.dtDesk);

		$tg.each(function () {
			var $t = $(this);

			if (isVisible(this)) {
				if ($t.is('img')) { //Image
					var dtSrc = getElementSrc($t);

					if (dtSrc && $t.attr("src") != dtSrc) {
						$t.attr("src", dtSrc);
					}

				} else if ($t.is('iframe')) { //Iframe
					var dtSrc = $t.attr(opt.dtSrc);

					if (dtSrc && $t.attr("src") != dtSrc) {
						$t.attr("src", dtSrc);
					}

				} else { //Background
					var dtImg = getElementSrc($t);

					if (dtImg && $t.css('background-image') != dtImg) {
						$t.css('background-image', 'url(' + dtImg + ')');
					}
				}
			}
		});
	}

	function getElementSrc($t) {
		var dtResp = $t.attr(opt.dtResp),
			dtSrc = '';

		if (dtResp) {
			var wa = winWidth(),
				aDtResp = dtResp ? dtResp.split(',') : dtResp;

			$.map(aDtResp, function (val) {
				var tVal = val.trim(),
					tVal = tVal.split(' '),
					wc = tVal[1] ? tVal[1].trim() : null;

				if (wc && wc.toLowerCase().indexOf("w") >= 0) {
					wc = parseInt(wc);

					if (wa >= wc) {
						dtSrc = tVal[0] ? tVal[0] : dtSrc;
					}
				}
				// console.log(dtSrc, wa, wc, (wa >= wc));
			});

			dtSrc = dtSrc ? dtSrc : $t.attr(opt.dtSrc);

		} else {
			dtSrc = $t.attr(opt.dtSrc);
		}

		return dtSrc;
	}

	function isVisible(el) {
		var $el = $(el),
			rect = el.getBoundingClientRect(),
			threshold = opt.threshold;

		return (
			!opt.loadHidden &&
			((winHeight() + threshold) > rect.top) &&
			(-threshold < rect.bottom) &&
			((winWidth() + threshold) > rect.left) &&
			(-threshold < rect.right) &&
			($el.is(':visible') &&
				$el.css('visibility') != 'hidden' &&
				$el.css('opacity') > 0)
		);
	}

	function winWidth() {
		return parseInt(aWidth >= 0 ? aWidth : (aWidth = $(window).width()));
	}

	function winHeight() {
		return parseInt(aHeight >= 0 ? aHeight : (aHeight = $(window).height()));
	}

	function destroy() {
		$(window).off('.' + opt.name);
		$(opt.content).off('.' + opt.name);
	}
};
