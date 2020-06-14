"use strict";
import $ from 'jquery';

/**
  Opciones para inicializar:
  {
    open:    'none',  // none: No seleccionar item, first: Seleccionar primer item
    active:  'active' // Class para seleccionar al elemento actual
  }

  Opciones por data atributo html:
  <a class="tab-link" data-open="#id" data-group="tab-cont"></a>
  **/

export default $.fn.iTabs = function (options) {
	var $tg = $(this),
		opt = $.extend({}, {
			open: 'none', //first
			dtCont: 'data-open',
			dtGroupOpen: 'data-group',
			dtGroupCont: 'group-cont',
			active: 'tab--active'
		}, options);

	if (typeof options == 'string') {
		return this.each(function (i, t) {
			var $t = $(t);

			if (options == 'show') {
				close($t, 'open');
				open($t);
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

					}
				}
				$t.data('active', true);
			}
		});
	}

	function onClick(e) {
		e.preventDefault();
		var $t = $(this);

		close($t);
		open($t);
	}

	function open($t) {
		var cont = $t.attr(opt.dtCont),
			$cont = $(cont);

		if ($cont.length) {
			$t.trigger('beforeshow');
			$t.addClass(opt.active);
			$cont.addClass(opt.active);
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
				$gc.removeClass(opt.active);
			}
		}
	}
};
