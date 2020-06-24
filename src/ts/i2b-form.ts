/* ===========
 * Proyecto:
 * Fecha Inicio:
 * Email Desarrollador:
 * ======== */

"use strict";

var $ = $ || {},
jQuery = jQuery || {};

$(function() {
	const $frm = $('[frm-valid]');

	if($frm.length) {
	  $frm.each(function() {
	  	var $tf = $(this);

	    $tf.validate({
	    	ignore: [],
	  	  errorPlacement: function(err, el) {
		    	  var $t = $(el),
		    	  $p = $t.parents('.cselect, .select, [control-group]');

		    	  if ($t.is('select') && $p.length) {
		    	  	$p.addClass('error');
		    	  	err.insertAfter($p);

		    	  } else if (($t.is(':radio') || $t.is(':checkbox')) && $p.length) {
		    	  	err.insertAfter($p);

		    	  } else {
		    			err.insertAfter($t);
		    	  }
	  	  },
	    	unhighlight: function(el) {
	    		var $t = $(el),
	    		$p = $t.parents('.cselect, .select, [control-group]');

	    	  if ($t.is('select') && $p.length) {
	    	  	$t.removeClass('error');
	    	  	$p.removeClass('error');

	    	  } else if (($t.is(':radio') || $t.is(':checkbox')) && $p.length) {
	    	  	$p.find(':radio, :checkbox').removeClass('error');

	    	  } else {
	    	  	$t.removeClass('error');
	    	  }
				},
	    	onfocusout: function(el) { $(el).valid(); }
	    });
	  });

	  $(document).on('change', '[frm-valid] [csel]', function() {
	  	$(this).valid();
	  });

	  $frm.on('submit', function(e) {
	  	e.preventDefault();
	  	const $t = $(this);

	  	if($t.valid()) {
	  		console.log('Datos enviados.');
				// $t.submit();
	  	}
	  });
	}
});
