define(function() {
	
	var configTable = function() {
		$('#table_establecimientos').configDataTable();
	};
	
	var validationForm = function(options) {
		var form = $('#formEstablecimiento').parsley().on('form:submit', function() {
			$('#formEstablecimiento').ajaxSubmit({
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
	
	var obtenerOficinasPorRed = function(options) {
		
	};
	
	return {
		initObtenerOficinasPorRed : function(options) {
			var defaults = {
					obtenerOficinasPorRedAjaxURL : ''
			};
			options = $.extend(true, defaults, options);
			obtenerOficinasPorRed(options);
		},
		initTable : function() {
			configTable();
		},
		initForm: function(options){
			var defaults = {};
			options = $.extend(true, defaults, options);
			$('input[id="isActivo"]').bootstrapSwitch();
			validationForm(options);
			
			$("#select_redes").change(function(){
				
				if( $("#select_redes").val() > 0 ) {
					cleanCombo($("#select_oficinas"));
					
					RestServices.obtenerOficinasActivasPorRed($("#select_redes").val(), {
						oficinas: {
							callback: function(data){
								$.each(data, function(i, oficina){
									$('<option />', { value: oficina.id, text: oficina.nombre }).appendTo('#select_oficinas');
								});
							}
						}
					});
				}
				
			});
			
		},
	};
});