"use strict";

	/**
  Opciones para inicializar:
  {
    open:    '#id',             // Identificador el elemento al para abrir
    close:   '.close, .search', // Cerrar Elementos al abrir el elemento selecionados
    overlay: '.overlay',        // Agrega overlay de fondo
    active:  'selected'         // Class para agrear al elemento actual y el elemento a abrir
  }

  Opciones por data atributo html:
  <button data-open="#id" data-close=".close, .search" overlay=".overlay" active="selected"></button>
  **/
export default $.fn.i2bDropdown = function(options) {
	var $tg = $(this),

	opt = $.extend({}, {
		dtOpen      : 'data-open',
		open        : '',
		dtClose     : 'data-close',
		close       : '',
		dtOverlay   : 'data-overlay',
		overlay     : '',
		active      : 'active'
	}, options);

	if(typeof options == 'string') {
		return this.each(function(i, t) {
			var $t = $(t);

			if(options == 'show') {
				open($t);

			} else if(options == 'hide') {
				close($t);

			} else if(options == 'toggle') {
				toggle($t);
			}
		});

	} else {
		return this.each(function(i, t) {
			var $t = $(t);

			$t.on('click', onClick);

			overlayClose($t);
		});
	}

	function onClick(e) {
		e.preventDefault();
		var $t = $(this);

		toggle($t);
	}

	function open($t) {
		var cont = getOpen($t),
		$cont = $(cont);

		if($cont.length) {
			$t.trigger('beforeshow');
			$t.addClass(opt.active);
			$cont.addClass(opt.active);

			var over = getOverlay($t);

			if(over) {
				const $over = $(over);
				$over.addClass(opt.active);
			}
			$t.trigger('show');
		}
	}

	function close($t) {
		var cont = getOpen($t),
		$cont = $(cont);

		if($cont.length) {
			$t.trigger('beforehide');
			$t.removeClass(opt.active);
			$cont.removeClass(opt.active);
			$t.trigger('hide');

			const over = getOverlay($t),
			$over = $(over);

			if($over.length) {
				$over.removeClass(opt.active);
			}
		}
	}

	function toggle($t) {
		if($t.hasClass(opt.active)) {
			close($t);

		} else {
			open($t);
		}
	}

	function overlayClose($t) {
		const over = getOverlay($t),
		$over = $(over),
		clos = getClose($t);
		var selEvent = (over? over: '');
		selEvent = selEvent+(clos? (selEvent? ', ': '')+clos: '');

		$(document).on("click", selEvent, function(e) {
			const $tc = $(e.target),
			cont = getOpen($t),
			over = $t.attr(opt.dtOverlay),
			sel = ($tg.selector? $tg.selector: null);

			if($tc.hasClass(over) || ($tc.length && !$tc.is(sel) && !$tc.parents(sel).length) && (!$tc.is(cont) && !$tc.parents(cont).length)) {
				close($t);
			}
		});
	}

	function getOpen($t) {
		var dto = $t.attr(opt.dtOpen);
		return dto? dto: opt.open;
	}

	function getClose($t) {
		var dtc = $t.attr(opt.dtClose);
		return dtc? dtc: opt.close;
	}

	function getOverlay($t) {
		var dtc = $t.attr(opt.dtOverlay);
		return dtc? dtc: opt.overlay;
	}
};
