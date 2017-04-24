define(function() {

	var initSendSolicitud = function(){
		$("#send_solicitud").click(function(){
			privateSendSolicitud();
		});
		
	};
	
	var privateInitComponents = function(){
		
		$("#categorias").select2();
		
		var idPatrocinador = $('#idPatrocinador').val();
		
		if(typeof idPatrocinador !== "undefined" && idPatrocinador != null && idPatrocinador != ""){
			$('#form_solicitud').show();
		}else{
			$('#form_solicitud').hide();
		}
	};
	
	var privateEventSelected = function(){
			
			/*$.ajax({
				url : '/categoria/add',
				type : 'POST',
				data : {
					idCategotia : _idEmpresa
				}
			}).done(function(data) {
				
			}); 
			
		});
		*/
	};
	
	var privateSendSolicitud = function(){
		$('#form_solicitud').submit();
		
	};
	
	return {
		initForm : function() {
			privateEventSelected();
			initSendSolicitud();
			privateInitComponents();
		}

	};
});