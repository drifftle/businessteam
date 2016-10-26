define(function() {

	var initSendSolicitud = function(){
		$("#send_solicitud").click(function(){
			privateSendSolicitud();
		});
		
	};
	
	var privateInitComponents = function(){
		$("#ids_categorias").select2();
	};
	
	var privateSendSolicitud = function(){
		/*
		var categorias = $("#ids_categorias").val();
		var toArrayInt;
		
		for(var i = 0 ; i < categorias.lenght; i++){
			toArrayInt[i] = parseInt(categorias[i]);
			console.log(toArrayInt[i])
		}
		
		*/
		$('#form_solicitud').submit();
		
	};
	
	return {
		initForm : function() {
			privateInitComponents();
			initSendSolicitud();
		}

	};
});