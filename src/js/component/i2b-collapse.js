"use strict";

/**
Opciones para inicializar:
{
	open:    '#id',     // Identificador el elemento al para abrir
	time:    800, 			// Tiempo efecto slide contenido
	active:  'selected' // Class para agrear al elemento actual y el elemento a abrir
}

Opciones por data atributo html:
<button data-open="#id" data-close=".close, .search" overlay=".overlay" active="selected"></button>
**/
export default $.fn.i2bCollapse = function (options) {
	var $tg = $(this),
		opt = $.extend({}, {
			open: 'none', //first, all
			dtCont: 'data-open',
			dtGroupOpen: 'data-group',
			dtGroupCont: 'group-cont',
			active: 'active',
			time: 300
		}, options);

	if (typeof options == 'string') {
		return this.each(function (i, t) {
			var $t = $(t);

			if (options == 'show') {
				close($t, 'open');
				open($t);

			} else if (options == 'hide') {
				close($t, 'close');

			} else if (options == 'toggle') {
				toggle($t);
			}
		});

	} else {
		return this.each(function (i, t) {
			var $t = $(t);

			if (!$t.data('active')) {
				$t.on('click', onClick);

				if (opt.open != 'none' && opt.open != '') {
					if (opt.open == 'first' && i == 0) {
						open($t);

					} else if (opt.open == 'all') {
						open($t);
					}
				}
				$t.data('active', true);
			}
		});
	}

	function onClick(e) {
		e.preventDefault();
		var $t = $(this);

		toggle($t);
	}

	function open($t) {
		var cont = $t.attr(opt.dtCont),
			$cont = $(cont);

		if ($cont.length) {
			$t.trigger('beforeshow');
			$t.addClass(opt.active);
			$cont.slideDown(opt.time, function () {
				$t.trigger('show');
			})
				.addClass(opt.active);
		}
	}

	function close($t, option = '') {
		$t = $t ? $t : null;
		option = option ? option : null;
		var cont = $t.attr(opt.dtCont),
			$cont = $(cont);

		if ($t.is('[' + opt.dtGroupOpen + ']')) {
			var group = $t.attr(opt.dtGroupOpen),
				$go = null,
				$gc = null;

			if (option == null || option == 'open') {
				$go = $('[' + opt.dtGroupOpen + '="' + group + '"]');
				$gc = $('[' + opt.dtGroupCont + '="' + group + '"]');

				if ($cont.length && option == 'open') {
					$go = $go.not($t);
					$gc = $gc.not($cont);
				}
			} else if (option == 'close') {
				$go = $t;
				$gc = $cont;
			}

			if ($gc.length) {
				$go.removeClass(opt.active);
				$gc.slideUp(opt.time, function () {
					$t.trigger('hidden');
				})
					.removeClass(opt.active);
			}
		} else {
			if ($cont.length) {
				$t.removeClass(opt.active);
				$cont.slideUp(opt.time, function () {
					$t.trigger('hidden');
				})
					.removeClass(opt.active);
			}
		}
	}

	function toggle($t) {
		if ($t.hasClass(opt.active)) {
			close($t);

		} else {
			close($t);
			open($t);
		}
	}
};
