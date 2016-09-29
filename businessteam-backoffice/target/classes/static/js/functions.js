function blockUI(options){
	var defaults = {
		message: '<h2><img src="/images/indicators/32/indicator_timer.gif" /> Procesando...</h2>'
	};
	
	options = $.extend(true, defaults, options);
	$.blockUI(options);
}

function unBlockUI() {
	$.unblockUI();
}

function cleanCombo(combo, options) {

	if (combo) {
		
		var defaults = {
			data: [{
				id: '',
				text: ''
			}],
		};

		options = $.extend(true, defaults, options);
		combo.find('option').remove();

		$(combo).select2({
			placeholder: '-- Seleccione --'
		});
		
		if (('data' in options) && options.data.length > 0) {
						
			$.each(options.data, function(i, option) {
				$('<option />', { value: option.id, html: option.text }).appendTo(combo);
			});
			
			$(combo).select2('val', options.data[0].id);
		}
	}

}
