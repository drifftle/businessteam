define(function() {

	var configTable = function() {
		$('#table_oficinas').configDataTable();
	};
	
	var validationForm = function(options) {
		var form = $('#formOficina').parsley().on('form:submit', function() {
			$('#formOficina').ajaxSubmit({
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
		init: function(){
			
		},
		initForm : function(options) {
			var defaults = {};
			options = $.extend(true, defaults, options);
			$('input[id="isActivo"]').bootstrapSwitch();
			validationForm(options);

			$("#red").change(function(){
				
				if( $("#red").val() > 0 ) {
					cleanCombo($("#municipio"));
					
					RestServices.obtenerRedPorId($("#red").val(), {
						red: {
							callback: function(data){
								$("#departamento").val(data.departamento.nombre);
								RestServices.obtenerMunicipiosPorDepartamento( data.departamento.id, {
									municipios: {
										callback: function(data){
											$.each(data, function(i, municpio){
												$('<option />', { value: municpio.id, text: municpio.nombre }).appendTo('#municipio');
											});
										}
									}
								});
							}
						}
					});
				}
			});
	
		},initTable : function(){
			configTable();
		}, 
	};
});