var Empresa = function() {

	var configTable = function() {
		$('#table_empresas').dataTable({
			"language" : {
				"url" : '/js/plugins/datatables/dataTables.es.json'
			},
			"sPaginationType" : "full_numbers",
			"aoColumnDefs" : [ {
				'bSortable' : false,
				'aTargets' : [ 0 ]
			} ],
			"pageLength" : 15,
			"lengthMenu" : [ 15 ],
			"iDisplayLength" : 15,
			"dom": '<"row"<"col-md-12 col-sm-12 col-xs-12"lrti<"pull-right"p>>>'
		});
	};

	var validationForm = function(options) {
		var form = $('#formEmpresa').parsley().on('form:submit', function() {
			$('#formEmpresa').ajaxSubmit({
				beforeSubmit : function() {
					blockUI();
				},
				target : '#formEmpresa',
				success : function() {
					unBlockUI();
				},
			});
			return true;
		});
	};
		
	var findContactoComercial = function() {
		var numDocumento = $("#conNumDocumento");
		numDocumento.parsley().validate();
		if(numDocumento.val() > 0 || numDocumento !== null){
			RestServices.obtenerInfoTerceroPorDocumento($("#conTipoDocumento").val(), $("#conNumDocumento").val(), {
				terceros : {
					callback : function(tercero) {
						if(tercero.id !== null){
							$("#findContacto").hide();
							$("#updateContacto").show();
							$("#id_contacto").val(tercero.id);
							if($('#isNuevo').val() === 'true'){
								$("#updateContacto").hide();
								$("#readyContacto").show();
							}
						}else{
							if(numDocumento.val() !== ''){
								$("#findContacto").hide();
								$("#createContacto").show();
								$("#id_contacto").val(tercero.id);
							}
						}
					}
				}
			});
		}
	}
	
	var findRepresentanteLegal = function() {
		var numDocumento = $("#repNumDocumento");
		numDocumento.parsley().validate();
		if(numDocumento.val() > 0 || numDocumento !== null){
			RestServices.obtenerInfoTerceroPorDocumento($("#repTipoDocumento").val(), $("#repNumDocumento").val(), {
				terceros : {
					callback : function(tercero) {
						if(tercero.id !== null){
							$("#findRepresentante").hide();
							$("#updateRepresentante").show();
							$("#id_representante").val(tercero.id);
							if($('#isNuevo').val() === 'true'){
								$("#updateRepresentante").hide();
								$("#readyRepresentante").show();
							}
						}else{
							if(numDocumento.val() !== ''){
								$("#findRepresentante").hide();
								$("#createRepresentante").show();
								$("#id_representante").val(tercero.id);
							}
						}
					}
				}
			});
		}
	}
	
	var updateToFindContacto = function() {
		$("#updateContacto").hide();
		$("#findContacto").show();
	}
	
	var createToFindContacto = function() {
		$("#createContacto").hide();
		$("#findContacto").show();
	}
	
	var updateToFindRepresentante = function() {
		$("#updateRepresentante").hide();
		$("#findRepresentante").show();
	}
	
	var createToFindRepresentante = function() {
		$("#createRepresentante").hide();
		$("#findRepresentante").show();
	}
	

	return {
		initTabla : function() {
			configTable();
		},
		initForm : function(options) {
			$("#readyContacto, #findContacto, #updateContacto, #createContacto").hide();
			$("#readyRepresentante, #findRepresentante, #updateRepresentante, #createRepresentante").hide();
			var defaults = {};
			options = $.extend(true, defaults, options);
			$('input[id="isActivo"]').bootstrapSwitch();
			validationForm(options);

			$("#departamento").change( function() {
				if ($("#departamento").val() > 0) {
					$("#municipio > *").remove();
					$('<option />', {
						value : ''
					}).appendTo('#municipio');
					RestServices.obtenerMunicipiosPorDepartamento($("#departamento").val(), {
						municipios : {
							callback : function(data) {
								$.each(data, function(i, municpio) {
									$('<option />', {
										value : municpio.id,
										text : municpio.nombre
									}).appendTo('#municipio');
								});
							}
						}
					});
				}else{
					$("#municipio").remove();
				}
			});
			
		},
		validateTercero: function () {
			esNuevo = $('#isNuevo').val();
			representante = $('#doc_representante').val();
			contacto = $('#doc_contacto').val();
			console.log(esNuevo+" "+representante+" "+contacto)
			if(esNuevo === 'false') {
				if(contacto !== null){
					$("#updateContacto").show();
				}
				if(representante !== null){
					$("#updateRepresentante").show();
				}
				
				$('#findContacto').click(function() {
					findContactoComercial();
				});
				
				$('#findRepresentante').click(function() {
					findRepresentanteLegal();
				});
				
			}else{
				$('#findContacto').click(function() {
					findContactoComercial();
				});
				
				$('#findRepresentante').click(function() {
					findRepresentanteLegal();
				});
			}
		},
		plugTercero: function () {
			$('#conNumDocumento').keyup(function() {
				if($('#conNumDocumento').val() === ''){
					$("#findContacto").hide();
				}else{
					$("#updateContacto, #createContacto").hide();
					$("#findContacto").show();
				}
			});
			
			$('#repNumDocumento').keyup(function() {
				if($('#repNumDocumento').val() === ''){
					$("#findRepresentante").hide();
				}else{
					$("#updateRepresentante, #createRepresentante").hide();
					$("#findRepresentante").show();
				}
			});
			
			$('#createContacto').click(function() {
				
			});
		}
	};
}();