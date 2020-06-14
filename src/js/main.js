"use strict";
import $ from 'jquery';

import { $js } from './utils';
import iTabs from './components/i-tabs';
import iCollapse from './components/i-collapse';
import iDropdown from './components/i-dropdown';
import iModal from './components/i-modal';
import iSelect from './components/i-select';
import iLazyLoad from './components/i-lazyload';
import iForm from './components/i-form';

$(function () {
	// Tabs
	$js('tab').iTabs();

	// Collapses
	const $collapse = $js('collapse');
	$collapse.iCollapse();

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
	$collapseGroup.iCollapse();

	$js('wc-open').on('click', function (e) {
		e.preventDefault();
		$collapseGroup.filter(':eq(1)').iCollapse('show');
	});

	$js('wc-close').on('click', function (e) {
		e.preventDefault();
		$collapseGroup.filter(':eq(1)').iCollapse('hide');
	});

	$js('wc-toggle').on('click', function (e) {
		e.preventDefault();
		$collapseGroup.filter(':eq(1)').iCollapse('toggle');
	});

	$js('collapse-group-first').iCollapse({
		open: 'first',
		time: 800
	});

	// DropDown
	$js('dropdown').iDropdown();
		$js('ddoverlay').iDropdown({
    overlay: '.overlay'
	});

	// Modal
	$js('modal').iModal();

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
	$js('csel').iSelect();

	// Lazy Load
	$('[lazyload]').iLazyLoad();

	$('[lazyscroll]').iLazyLoad({
		content: '#sc-custom'
	});

	const $frm = $js('frm-valid');
	iForm.validate($frm);

	$frm.on('submit', (e) => {
		e.preventDefault();

		if($frm.valid()) {
			console.log('Enviado');
		}
	});

	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
});
