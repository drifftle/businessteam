define(function() {

	var configFilterTable = function(options) {
		$('#table_solicitudes').configDataTable({
			sortable : false,
			sortableTargets : [9, 10],
			visible : false,
			visibleTargets : [ 11 ],
			sorting : [[ 11, "desc" ], [ 2, "desc" ]]
		});
		
	};
	
	var privateWizard = function(){
		$('#rootwizard').bootstrapWizard();
	};
	
	var handleAprobarEvent = function(){
		$('input.aprobarSolicitiud').on('ifChecked', function(){
			 
			 var solicitudId = this.value;
			 aprobarRechazarSolicitud(solicitudId, 'APROBADO');
		});
	};
	
	var handleRechazarEvent = function(){
		$('input.rechazarSolicitiud').on('ifChecked', function(){
			
			var solicitudId = this.value;
			aprobarRechazarSolicitud(solicitudId, 'RECHAZADO');
		});
	};
	
	var aprobarRechazarSolicitud = function(solicitudId, estado) {
		if(solicitudId) {
			
			var mensajeConfirm = '¿Esta seguro que desea '
				+ ((estado === 'APROBADO') ? 'Aprobar' : 'Rechazar')
				+ ' la solicitud ' + solicitudId + '?';
			
			bootbox.confirm(mensajeConfirm, function(result) {
				
				if(result) {
					$('#formSolicitudes').ajaxSubmit({
						url: ((estado === 'APROBADO') ? '/solicitudes/aprobar'
								: '/solicitudes/rechazar'),
						type: 'POST',
						success: function(html) {
							$('#body-panel-container').replaceWith(html);
							
							if(estado === 'APROBADO') {
								location.href = "/convenios/" + $('#convenio_id').val();
							}else {
								configFilterTable();
							}
							
							unBlockUI();
						},
						error: function() {
							unBlockUI();
							bootbox.alert('El servicio de Solicitudes no est\u00e1 disponible en estos momentos.' +
									'Por favor intente nuevamente o consulte con su administrador.');
						}
					});
				}else{
					unBlockUI();
					$(':checkbox[name=idSolicitud]:checked').iCheck('uncheck');
				}
			});
		}else {
			unBlockUI();
			bootbox.alert("Debe seleccionar al menos una solicitud.");
		}
	};
	
	var configFilterModal = function(options) {
		
		$('#filtroEmpresa').change(function() {
			cleanCombo($('#filtroSolicitud'), {
				data : [{
					id : '0',
					text : '-- Todos --'
				}]
			});

			var _idEmpresa = this.value;
			if (_idEmpresa != 0) {
				$.ajax({
					url: '/solicitudes/buscar/empresa',
					type: 'post',
					dataType: 'json',
					data: { filtroEmpresa: _idEmpresa },
					success: function(solicitudes){
						if(solicitudes.length > 0) {
							$.each(solicitudes, function(i, data){
								$('<option />',  { value: data.id, html: data.id }).appendTo($('#filtroSolicitud'));
							});
						}
					},
					error: function(){
						bootbox.alert('El servicio de Solicitudes no est\u00e1 disponible en estos momentos.' +
						'Por favor intente nuevamente o consulte con su administrador.');
					}
				});
			}
		});
	};

	return {
		initTable : function(options) {
			var defaults = {};
			options = $.extend(true, defaults, options);

			configFilterTable(options);
			handleAprobarEvent();
			handleRechazarEvent();
		},
		initFilterModal: function(options){
			var defaults = {};
			options = $.extend(true, defaults, options);
			
			configFilterModal(options);
		},
		
		initWizard : function(){
			privateWizard();
		}
	};
});