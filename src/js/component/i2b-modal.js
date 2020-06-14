"use strict";

/**
Opciones para inicializar:
{
	open:     '#id',             // Identificador el elemento al para abrir
	close:    '.close, .search', // Cerrar Elementos al abrir el elemento selecionados
	overlay:  '[overlay]',       // Agrega overlay de fondo
	active:   'active',          // Class para agrear al elemento actual y el elemento a abrir,
	btnClose: '[close]'
}

Opciones por data atributo html:
<button data-open="#id" data-close=".close, .search" overlay="[overlay]" active="selected"></button>
**/
export default $.fn.i2bModal = function(options) {
	var $tg = $(this),

	opt = $.extend({}, {
		dtOpen      : 'data-open',
		open        : '',
		dtClose     : 'data-close',
		close       : '',
		dtOverlay   : 'data-overlay',
		overlay     : '[overlay]',
		active      : 'active',
		btnClose    : '[close]'
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

			btnClose($t);
			overlayClose($t);
			eventCenter($t);
		});
	}


	function onClick(e) {
		e.preventDefault();
		var $t = $(this);

		toggle($t);
	}

	function btnClose($t) {
		var cont = getOpen($t),
		$cont    = $(cont),
		$btn     = $cont.find(opt.btnClose);

		$btn.on("click", function(e) {
			close($t);
		});
	}

	function open($t) {
		var cont = getOpen($t),
		$cont = $(cont);

		if($cont.length) {
			$t.trigger('beforeshow');
			$t.addClass(opt.active);
			$cont.addClass(opt.active);

			$('body').addClass('fixed');

			var over = getOverlay($t);

			if(over) {
				const $over = $(over);
				$over.addClass(opt.active);
			}
			setTimeout(center($cont), 250);

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

			$('body').removeClass('fixed');

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

	function center($t) {
		if($t.is(':visible') && $t.css("visibility") == 'visible') {
			var $w = $(window),
			wh =   $(window).height(),
			th =   $t.height(),
			top = ((wh - th) / 2);

			top = top > 0? top: 10;
			$t.css({ 'top': top });
		}
	}

	function eventCenter($t) {
		var cont = getOpen($t),
		$cont = $(cont),
		rzTm;

		$(window).on('load resize', function() {
			clearTimeout(rzTm);
			rzTm = setTimeout(center($cont), 250);
		});
	}
};
