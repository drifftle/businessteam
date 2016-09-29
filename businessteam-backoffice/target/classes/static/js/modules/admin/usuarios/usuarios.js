define(function() {
	
	var validateDialog = function(options) {
		$('#formFilterRec').validateModal(options, {
			targetTable : '#table_usuarios'
		});
	};
	
	var validationForm = function(options) {
		var form = $('#formFilterRec').parsley().on('form:submit', function() {
			$('#formFilterRec').ajaxSubmit({
				beforeSubmit: function(){
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
	
	var validateForm = function() {
		if ( $('#rol :selected').val() === 'ADMIN' ){ // Rol id 1: Administrador.
			$('#label_empresa').hide();
			$('#s2id_empresa').hide();
			$("#empresa").removeAttr("required");
		} else {
			$('#label_empresa').show();
			$('#s2id_empresa').show();
			$('#empresa').attr('required', 'true');
		}
	};
	
	var configTable = function() {
		$('#table_usuarios').configDataTable({
			lengthMenu : [ 5, 15, 45 ]
		});
	};
	
	return {
		
		initForm : function(options) {
			var defaults = {};
			options = $.extend(true, defaults, options);
			validateDialog(options);
		},
		
		initTable : function(options) {
			var defaults = {
				idSonvenioAjaxURL: ''
			};
			options = $.extend(true, defaults, options);
			configTable();
		},
		validar: function() {
			$('#form_registrar_usuario').change(function() {
				validateForm();
			});
		},
		loadForm: function(){
			$('input[id="estado"]').bootstrapSwitch();
			validateForm();
			$("#form_registrar_usuario").matrixValidate();
			$('#contrasena_cuenta').attr('type', 'password');
		},
		confirmEdit: function(){
			$('#confirm_edit').click(function() {
				var gestion;
				if($('#usuario_id').val() > 0){
					gestion = "actualizar";
				} else{
					gestion = "crear"
				}
				
				var nombre_suaurio;
				if( $("#nombre_usuario").val() === "" ){
					nombre_suaurio = "_____";
				}else{
					nombre_suaurio = $('#nombre_usuario').val();
				}
				bootbox.dialog({
					 message: "Se va a "+gestion+" el usuario "+ nombre_suaurio +", \u00BFDesea continuar con la operaci\u00f3n?",
					 title: "Confirmaci\u00F3n",
					 buttons: {
						 success: {
							 label: "Aceptar",
							 className: "btn-success",
							 callback: function() {
								 if ($('#form_registrar_usuario').parsley('validate')){
									 $('#form_registrar_usuario').submit();
								 }
							 }
						 },
						 danger: {
							 label: "Cancelar",
							 className: "btn-danger",
							 callback: function() {}
						 },
					 }
				});
			});
		},
		cancelEdit: function(){
			$('#cancel_edit').click(function() {
				var gestion;
				if($('#usuario_id').val() > 0){
					gestion = "actualizaci\u00f3n";
				} else{
					gestion = "creaci\u00F3n"
				}
				
				var nombre_suaurio;
				if( $("#nombre_usuario").val() === "" )
					nombre_suaurio = "_____";
				else
					nombre_suaurio = $('#nombre_usuario').val();
				
	            bootbox.dialog({
	            	 message: "Se va cancelar la "+gestion+" del usuario "+ nombre_suaurio +", \u00BFDesea continuar con la operaci\u00f3n?",
	            	 title: "Confirmaci\u00F3n",
	            	 buttons: {
	            		 success: {
	            			 label: "Aceptar",
	            			 className: "btn-success",
	            			 callback: function() {
	            				 if ($('#form_registrar_usuario').parsley('validate')){
	            					 document.location.href='/admin/usuarios';
	            				 }
	            			 }
	            		 },
	            		 danger: {
	            			 label: "Cancelar",
	            			 className: "btn-danger",
	            			 callback: function() { }
	            		 },
	            	 }
	            });
			});
		}
	};
	
});