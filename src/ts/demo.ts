/**
 * Init Pages Home
 */

(function($, doc, win, undefined) {
	i2b.pages.home = i2b.pages.home || {};

	i2b.pages.home = new i2b.contructor.page('demo');
	i2b.pages.home.DOMReady = function() {
		/*$.js('dropdown').dropdown({
			// overlayClose: false
		});*/

		i2b.com.products.init();
		i2b.com.quickcart.init();
	};
})(jQuery, document, window);

i2b.init();
