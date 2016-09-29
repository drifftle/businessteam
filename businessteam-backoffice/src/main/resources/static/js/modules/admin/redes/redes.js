define(function() {

	var configTable = function() {
		$('#table_redes').configDataTable();
	};

	var validationForm = function(options) {
		var form = $('#formRedes').parsley().on('form:submit', function() {
			$('#formRedes').ajaxSubmit({
				beforeSubmit : function() {
					blockUI();
				},
				target : '#default_modal_dialog_content',
				success : function() {
					unBlockUI();
				}
			});
			return false;
		});
		
		if (('UI' in options) && 'modal' in options.UI) {
			$(options.UI.modal).on('hidden.bs.modal', function(e) {
				$.ajax({
					url : options.URL.listar,
					data : {
						"_isAjax" : true
					},
					beforeSend : function() {
						blockUI();
						$('#body-panel-container > *').remove();
					},
					success : function(html) {
						$('#body-panel-container').replaceWith(html);

						unBlockUI();
						configTable();
					}
				})
			});
		}

	}
	
	return {
		initTable : function() {
			configTable();
		},
		initForm : function(options) {
			$('input[id="isActivo"]').bootstrapSwitch();
			var defaults = {};
			options = $.extend(true, defaults, options);
			validationForm(options);
		}
	};
});
