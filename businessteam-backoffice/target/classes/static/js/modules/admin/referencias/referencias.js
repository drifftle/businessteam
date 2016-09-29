define(function() {

	var configTable = function() {
		$('#table_referencias').configDataTable({
			lengthMenu : [ 5, 15, 45 ]
		});
	};

	return {
		initTable : function() {
			configTable();
		},
		initForm : function(options) {
			var defaults = {};
			options = $.extend(true, defaults, options);
		},
		confirmCreate: function(){
			$('#confirm_create').click(function() {
				
				var nombre_usuario;
				if( $("#nombreRef").val() === "" ){
					nombre_usuario = "_____";
				}else{
					nombre_usuario = $('#nombreRef').val();
				}
				
				bootbox.dialog({
					 message: "Se va crear la referencia "+ nombre_usuario +", \u00BFDesea continuar con la operaci\u00f3n?",
					 title: "Confirmaci\u00F3n",
					 buttons: {
						 success: {
							 label: "Aceptar",
							 className: "btn-success",
							 callback: function() {
								 if ($('#formReferencia').parsley('validate')){
									 $('#formReferencia').submit();
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
		cancelCreate: function(){
			$('#cancel_create').click(function() {
	            bootbox.dialog({
	            	 message: "Se va cancelar la creación de la referencia, \u00BFDesea seguir con la operaci\u00f3n?",
	            	 title: "Confirmaci\u00F3n",
	            	 buttons: {
	            		 success: {
	            			 label: "Aceptar",
	            			 className: "btn-success",
	            			 callback: function() {
	            				 if ($('#formReferencia').parsley('validate')){
	            					 document.location.href='/admin/referencias';
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