"use strict";
import $ from 'jquery';

/**
Opciones para inicializar:
{
	active:  'active' // Class para agregar al select content para abrir y cerrar las opciones
}

Opciones por data atributo html:
<select name="opciones" csel>
	<option value="1">Opción 1</option>
</select>
**/
export default $.fn.iSelect = function (opts) {
	var $tg = $(this),

		opt = $.extend({}, {
			active: 'active',
			classMain: 'cselect',
			classCont: 'csel-cont',
			classOptions: 'csel-options'
		}, opts);

	if (typeof opts == 'string') {
		return this.each(function (i, t) {
			var $t = $(t);

			/*if(opts == 'show') {
				open($t);

			} else if(opts == 'hide') {
				close($t);

			} else if(opts == 'toggle') {
				toggle($t);
			}*/
		});

	} else {
		return this.each(function (i, t) {
			var $t = $(t);

			create($t);

			if (i == 0) {
				$(document).on('click', onDocumentClick);
			}
		});
	}

	function create($t) {
		const optNum = $t.children('option').length;
		$t.wrap('<div class="' + opt.classMain + '"></div>');
		$t.after('<div class="' + opt.classCont + '"></div>');

		const $selCont = $t.next('.' + opt.classCont),
			$selOpt = $t.children('option:selected'),
			text = $selOpt ? $selOpt.text() : $t.children('option').eq(0).text();
		$selCont.text(text);

		const $list = $('<ul />', {
			class: opt.classOptions
		}).insertAfter($selCont);

		for (var i = 0; i < optNum; i++) {
			$('<li />', {
				text: $t.children('option').eq(i).text(),
				rel: $t.children('option').eq(i).val(),
				disabled: $t.children('option').eq(i).attr('disabled')
			}).appendTo($list);
		}

		$list.children('li').on('click', onOptionClick);

		$selCont.on('click', onSelectClick);
	}

	function onSelectClick(e) {
		e.preventDefault();
		var $t = $(this);

		$tg.next('.' + opt.classCont + '.' + opt.active).not($t).each(function () {
			$(this).removeClass('active').next('.' + opt.classOptions).hide();
		});

		$t.toggleClass(opt.active).next('.' + opt.classOptions).toggle();
	}

	function onOptionClick(e) {
		e.preventDefault();
		var $t = $(this),
			$p = $t.parents('.' + opt.classMain);

		$p.children('.' + opt.classCont).text($t.text()).removeClass(opt.active);
		$p.children('select').val($t.attr('rel')).trigger('change');
		$p.children('.' + opt.classOptions).hide();
	}

	function onDocumentClick(e) {
		var $tc = $(e.target);

		if (($tc.length && !$tc.is('.' + opt.classMain) && !$tc.parents('.' + opt.classMain).length) && (!$tc.is('.' + opt.classCont) && !$tc.parents('.' + opt.classCont).length)) {
			$tg.next('.' + opt.classCont).removeClass(opt.active);
			$tg.nextAll('.' + opt.classOptions).hide();
		}
	}
};
