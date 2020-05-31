"use strict";

import { $js } from './utils';
import i2bTabs from './components/i2b-tabs';
import i2bCollapse from './components/i2b-collapse';
import i2bDropdown from './components/i2b-dropdown';
import i2bModal from './components/i2b-modal';
import i2bSelect from './components/i2b-select';
import i2bLazyLoad from './components/i2b-lazyload';
import cForm from './components/i2b-form';

$(function () {
	// Tabs
	$js('tab').i2bTabs();

	// Collapses
	const $collapse = $js('collapse');
	$collapse.i2bCollapse();

	$collapse
		.on('beforeshow', function () {
			console.log('beforeshow', this);
		})
		.on('show', function () {
			console.log('show', this);
		})
		.on('hidden', function () {
			console.log('hidden', this);
		});

	const $collapseGroup = $js('collapse-group');
	$collapseGroup.i2bCollapse();

	$js('wc-open').on('click', function (e) {
		e.preventDefault();
		$collapseGroup.filter(':eq(1)').i2bCollapse('show');
	});

	$js('wc-close').on('click', function (e) {
		e.preventDefault();
		$collapseGroup.filter(':eq(1)').i2bCollapse('hide');
	});

	$js('wc-toggle').on('click', function (e) {
		e.preventDefault();
		$collapseGroup.filter(':eq(1)').i2bCollapse('toggle');
	});

	$js('collapse-group-first').i2bCollapse({
		open: 'first',
		time: 800
	});

	// DropDown
	$js('dropdown').i2bDropdown();
  $js('ddoverlay').i2bDropdown({
    overlay: '.overlay'
	});

	// Modal
	$js('modal').i2bModal();

	// Scroll
	$js('sctop').on('click', function (e) {
		e.preventDefault();
		const $hb = $("html, body"),
			href = $(this).attr('href'),
			$href = $(href);

		if ($href.length) {
			var top = $(href).offset().top;
			top = top ? (top - 65) : 0;

			$hb.stop().animate({ scrollTop: top }, 500, 'swing');
		}
	});

	// Form Select
	$js('csel').i2bSelect();

	// Lazy Load
	$('[lazyload]').i2bLazyLoad();

	$('[lazyscroll]').i2bLazyLoad({
		content: '#sc-custom'
	});

	const $frm = $js('frm-valid');
	cForm.validate($frm);

	$frm.on('submit', (e) => {
		e.preventDefault();

		if($frm.valid()) {
			console.log('Enviado');
		}
	});
});
