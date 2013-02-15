function prepareSearch($searchBox, settings) {

	$searchBox.blur(function() {
		doSearch($searchBox.val(), settings);
	});

}

function doSearch(queryString, settings) {
	$(settings.searchLine).each(function() {
		cleanContrasts($(this));

		$(this).children(settings.searchSightPoint).each(function() {
			var element = $(this);

			if (settings.contrastString == true) {
				doContrast(element, queryString);
			}

			if (!element.html().match(new RegExp('.*?' + queryString + '.*?', 'i'))) {

				if (settings.fade == true) {
					$(this).parent(settings.searchLine).fadeOut();
				} else {
					$(this).parent(settings.searchLine).hide();
				}

				return true;

			} else {

				if (settings.fade == true) {
					$(this).parent(settings.searchLine).fadeIn();
				} else {
					$(this).parent(settings.searchLine).show();
				}

				return false;
			}

		});
	});
}

function doContrast(content, queryString) {
	if ( n = content.html().match(new RegExp(queryString, "i"))) {
		for (var i = 0; i < n.length; i++) {
			var contrastedContent = content.html().replace(new RegExp(queryString, 'i'), "<!--contrast--><span class='contrastString'><!--/contrast-->" + n[i] + "<!--endcontrast--></span><!--/endcontrast-->");
			content.html(contrastedContent);
		}
	}
}

function cleanContrasts(content) {
	var oldResults = /(\<\!\-\-contrast\-\-\>.*\<\!\-\-\/contrast\-\-\>|\<\!\-\-endcontrast\-\-\>.*\<\!\-\-\/endcontrast\-\-\>)/ig;
	cleanContent = content.html().replace(oldResults, "");
	content.html(cleanContent);
}