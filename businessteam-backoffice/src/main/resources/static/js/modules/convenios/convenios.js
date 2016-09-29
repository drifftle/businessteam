define(function() {
	/* config table convenios */
	var configFilterTable = function(options) {
		$('#filtroEmpresa').change(function() {
			var _idEmpresa = this.value;

			cleanCombo($("#filtroSolicitudes"), {
				data : [ {
					id : '0',
					text : '-- Todos --'
				} ]
			});

			$.ajax({
				url : options.idSonvenioAjaxURL,
				type : 'POST',
				data : {
					filtroEmpresa : _idEmpresa
				}
			}).done(function(data) {
				if (data.hasOwnProperty('error')) {
					bootbox.alert(data.error);
					return;
				}

				$.each(data, function(i, item) {
					$('<option />', {
						value : item.id,
						text : item.id
					}).appendTo('#filtroSolicitudes');
				});
			});
		});
	};

	/* Asigna el valor de el nombre referencia a un input */
	var privateAsignarValorTipoReferencia = function() {
		$('#idReferencia').change(function() {
			var selected = $(this).find('option:selected');
			$('#tipoReferencia').val(selected.data('tiporeferencia'));
			$('#nombreCorto').val($('#idReferencia').find(":selected").text());
		});
	};
	
	/* Guarda la referencia cuando le da aceptar en el confirm */
	var guardarReferencia = function(){
		var isRegistrar = $('#metodo').val();
		var idReferencia = $('#idReferencia').val();
		var idTipoComision = $('#convenio_tipo_Comision :selected').val();
		
		console.log(idTipoComision);
		
		$('#form_convenio').ajaxSubmit({
			url : '/convenios/addRow',
			type : 'POST',
			data : {
				_idReferencia : idReferencia,
				_isEstadoRequerido : $('#isRequerido').prop('checked'),
				_isEstadoActivo : $('#isActivo').prop('checked'),
				_isRegistrar : isRegistrar
			},
			beforeSend : function() {
				$('#body-panel-container > *').remove();
			},
			success : function(html) {
				$('#modalRegistroReferencia').modal('hide');
				$('#body-panel-container').replaceWith(html);
				inicializarEstilos();
				$('#convenio_tipo_Comision').select2("val", idTipoComision);
				$('#convenio_tipo_Comision').select2();
				privateInicializarEventos();
				$('#referencias-tab').tab('show');
				$('*').removeClass('modal-open');
			}
		});
    };
    
	/* Se cancela la asociacion de la referenica al convenio */
	var privateCancelarReferencia = function() {
		$('a.confirm-delete-referencia').click(function() {
			var isRegistrar = $('#metodo').val();
			var idReferenica = $('#idReferencia').val();
			var selected = $(this).find('option:selected');
			var nombreCorto = $('#idReferencia').find(":selected").text();
			if(idReferenica == null || idReferenica == ""){
				nombreCorto = "___________";
			}
			
			if(isRegistrar === 'true'){
				nombreMetodo = "Se va cancelar la asociación de la referencia "+nombreCorto+" al convenio";
			} else{
				nombreMetodo = "Se va cancelar la actualización de la referencia "+nombreCorto+" asociada al convenio";
			}
			$('#modalRegistroReferencia').modal('hide');
			bootbox.dialog({
				message : nombreMetodo + ", ¿Desea continuar con la operaci\u00f3n ?",
				title : "Confirmaci\u00F3n",
				buttons : {
					success : {
						label : "Aceptar",
						className : "btn-success",
						callback : function() {
							
						}
					},
					danger : {
						label : "Cancelar",
						className : "btn-danger",
						callback : function() {
							$('#modalRegistroReferencia').modal('show');
						}
					}
				}
			});
		});
	};
	
	/* Muestra el confirm cuando va a guardar la referencia */
	var privateConfirmReferencia = function() {
		$('a.confirm-referencia').click(function() {
			$('#formReferenciaConvenio').parsley().validate();
			if (true === $('#formReferenciaConvenio').parsley().isValid()) {
				var isRegistrar = $('#metodo').val();
				var idReferenica = $('#idReferencia').val();
				var selected = $(this).find('option:selected');
				var nombreCorto = $('#idReferencia').find(":selected").text();
				if(idReferenica == null || idReferenica == ""){
					nombreCorto = "___________";
				}
				
				if(isRegistrar === 'true'){
					nombreMetodo = "Se va asociar la referencia "+nombreCorto+" al convenio";
				} else{
					nombreMetodo = "Se va actualizar la referencia "+nombreCorto+" asociada al convenio";
				}
				
				bootbox.dialog({
					message : nombreMetodo + ", ¿Desea continuar con la operaci\u00f3n ?",
					title : "Confirmaci\u00F3n",
					buttons : {
						success : {
							label : "Aceptar",
							className : "btn-success",
							callback : function() {
								guardarReferencia();
							}
						},
						danger : {
							label : "Cancelar",
							className : "btn-danger",
							callback : function() {
							}
						}
					}
				});
			}
		});
	};

	/* Muestra el modal cuando se le da clic en editar modal  */
	var privateMostrarModalEditar = function() {
		$('a.actualizar-ferencia').click(function() {
			$('#modalRegistroReferencia').modal('show');
			var atributos = this.id.split(',');
			var idConvenio = atributos[0];
			var idReferencia = atributos[1];
			$('#form_convenio').ajaxSubmit({
				url : '/convenios/loadreferencia',
				type : 'POST',
				data : {
					_idReferencia : idReferencia
				},
				beforeSubmit : function() {
					$('#id-modal-body > *').remove();
				},
				success : function(html) {
					$('#id-modal-body').replaceWith(html);
					inicializarEstilos();
					privateInicializarEventos();
					Matrix.init();
				}
			});
		});
	};

	/* elimina una referencia */
	var privateConfirmarEliminarReferencia = function(idReferencia) {
		var idTipoComision = $('#convenio_tipo_Comision :selected').val();
		console.log(idTipoComision);
		$('#form_convenio').ajaxSubmit({
			url : '/convenios/removeRow',
			type : 'POST',
			data : {
				idReferencia : idReferencia
			},
			success : function(html) {
				$('#body-panel-container').replaceWith(html);
				inicializarEstilos();
				$('#convenio_tipo_Comision').select2("val", idTipoComision);
				privateInicializarEventos();
				$('#referencias-tab').tab('show');
			}
		});
	};
	
	/* Muestra el modal para el registro de la referencia */
	var privateMostrarModalRegistrar = function() {
		$('a.registrar-ferencia').click(function() {
			$('#modalRegistroReferencia').modal('show');
			$.ajax({
				url : '/convenios/loadnewreferencia',
				type : 'GET',
				beforeSubmit : function() {
					$('#id-modal-body > *').remove();
				},
				success : function(html) {
					$('#id-modal-body').replaceWith(html);
					inicializarEstilos();
					privateMostrarModalEditar();
					privateAsignarValorTipoReferencia();
					privateConfirmReferencia();
					privateCancelarReferencia();
					Matrix.init();
				}
			});
		});
	};

	/* Valida todo el formulario de convenio */
	var validationFormReferenciaConvenio = function(options) {
		var form = $('#formReferenciaConvenio').parsley().on('form:submit',	function() {
			$('#formReferenciaConvenio').ajaxSubmit({
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
					url : options.URL.listar + $('#idConvenio').val(),
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

	};
	
	var configTable = function() {
		$('#table_convenios').configDataTable();
	};

	/* Posiciona la referencia deacuerdo al clic */
	var posicionarReferencia = function() {
		$('a.posicionarReferencia').on('click', function() {
			var atributos = this.id.split('|');
			var accion = atributos[0];
			var referenciaId = atributos[1];
			var idTipoComision = $('#convenio_tipo_Comision :selected').val();
			console.log(idTipoComision);
			$('#form_convenio').ajaxSubmit({
				url : "/convenios/posicionarReferenciaConvenio",
				data : {
					"_accion" : accion,
					"_idReferencia" : referenciaId
				},
				beforeSubmit : function() {
					$('#body-panel-container > *').remove();
				},
				success : function(html) {
					$('#body-panel-container').replaceWith(html);
					inicializarEstilos();
					$('#convenio_tipo_Comision').select2("val", idTipoComision);
					privateInicializarEventos();
					$('#referencias-tab').tab('show');
				}
			});
		});
	};

	var confirmEliminarReferencia = function() {
		$('a.eliminar-ferencia').on("click",function() {
			var parametros = this.id.split(',');
			var nombreCorto = parametros[0];
			var idReferencia = parametros[1];
			$('#id_referencia_convenio').val(idReferencia);
			bootbox.dialog({
				message : "Se va eliminar la referencia "
                    + nombreCorto
                    + " asociada al convenio",
                title : "Confirmaci\u00F3n",
				buttons : {
					success : {
						label : "Aceptar",
						className : "btn-success",
						callback : function() {
							privateConfirmarEliminarReferencia(idReferencia);
						}
					},
					danger : {
						label : "Cancelar",
						className : "btn-danger",
						callback : function() {
						}
					}
				}
			});
		});
	};

	var inicializarEstilos = function() {
		/* Convenios */ 
		$("#estado_convenio").select2();
		$("#convenio_tipo_Comision").select2({
			placeholder: '-- Seleccione --'
		});
		$("#convenio_tipo_estado").select2();
		$("#empresa_tipo_documento").select2();
		$("#repLegal_tipo_documento").select2();
		$("#contactoComer_tipo_documento").select2();
		$('input[id="estadoRequerido"]').bootstrapSwitch();
		$('input[id="estadoActivo"]').bootstrapSwitch();
		
		/* Referencias */
		$("#idReferencia").select2();
		$('input[id="isRequerido"]').bootstrapSwitch();
		$('input[id="isActivo"]').bootstrapSwitch();
	};

	var privateConfirmEdit = function() {
		$('#confirm_edit').click(function() {
			if(privateValidarFormularioConvenio()){
				bootbox.dialog({
					message : "Se va a editar el convenio "+ $('#convenio_cod_convenio').val()
							+ ", \u00BFDesea seguir con la operaci\u00f3n?",
					title : "Confirmaci\u00F3n",
					buttons : {
						success : {
							label : "Aceptar",
							className : "btn-success",
							callback : function() {
								$('#form_convenio').ajaxSubmit({
									url : '/convenios/formularioConvenio/',
									type : 'POST',
									data : {
										_idTipoComision : $('#convenio_tipo_Comision :selected').val(),
									},
									beforeSend : function() {
										$('#body-panel-container > *').remove();
									},
									success : function(html) {
										$('#body-panel-container').replaceWith(html);
										inicializarEstilos();
										$('#convenio_tipo_Comision').select2("val", idTipoComision);
										$('#convenio_tipo_Comision').select2();
										privateInicializarEventos();
										$('#referencias-tab').tab('show');
										$('*').removeClass('modal-open');
									}
								});
							}
						},
						danger : {
							label : "Cancelar",
							className : "btn-danger",
							callback : function() {
							}
						}
					}
				});
			}
		});
	};

	var metodoConvenioReferencia = function(isRegistrar, posicion) {
		$('#form_convenio').ajaxSubmit({
			url : (isRegistrar ? '/convenios/addRow' : '/convenios/removeRow'),
			type : 'GET',
			data : {
				posicion : posicion + 'l'
			},
			succes : function(html) {
				$('#body-panel-container').replaceWith(html);

				require([ 'modules/convenios/convenios' ], function(Convenios) {
					Convenios.loadForm();
					Convenios.confirmEdit();
					Convenios.cancelEdit();
				});
				Matrix.init();
			}
		});
	}

	var initCancelEdit = function() {
		$('#cancel_edit').click(function() {
			bootbox.dialog({
				message : "Se va cancelar la edici\u00F3n del convenio "
						+ $(
								'#convenio_cod_convenio')
								.val()
						+ ", \u00BF Desea seguir con la operaci\u00f3n ?",
				title : "Confirmaci\u00F3n",
				buttons : {
					success : {
						label : "Aceptar",
						className : "btn-success",
						callback : function() {
							if ($('#form_convenio')
									.parsley(
											'validate')) {
								document.location.href = '/convenios';
							}
						}
					},
					danger : {
						label : "Cancelar",
						className : "btn-danger",
						callback : function() {
						}
					}
				}
			});
		});
	};
	
	// Se agregan validaciones parsley a los campos de la tabla comisiones segun el tipo de comision seleccionada.
	var privateConfigurarValidacionesSegunTipoComision = function() {
		if ( $('#convenio_tipo_Comision :selected').val() == 4 
				|| $('#convenio_tipo_Comision :selected').val() == 2
				|| $('#convenio_tipo_Comision :selected').val() == 3){
			$(".rango_desde").attr('maxlength','10');
			$(".rango_hasta").attr('maxlength','10');
			$(".rango_valorVariable").attr('maxlength','5');
			$(".rango_valorFijo").attr('maxlength','10');
		}
	};

	// Se ocultan o muestran campos segun el tipo de comision seleccionada.
	var privateHabilitarCamposSegunTipoComision = function(){
		$('#form_convenio').parsley().reset();
		$('#table_comisiones ul.parsley-errors-list').remove();
		$('#table_comisiones .parsley-error').removeClass('parsley-error');
		$('#table_comisiones input').val("");
		if ( $('#convenio_tipo_Comision :selected').val() == 4 ){
			$('#table_comisiones').show();
			$('#table_comisiones .rango_desde').attr('disabled','disabled');
			$('#table_comisiones .rango_hasta').attr('disabled','disabled');
			$('#table_comisiones input').removeAttr('readonly');
			privateCargarDataTableSegunTipoComision($('#convenio_tipo_Comision :selected').val());
			$('#table_comisiones tr:gt(1)').remove();
		} else if ( $('#convenio_tipo_Comision :selected').val() == 2 ){
			$('#table_comisiones').show();
			privateCargarDataTableSegunTipoComision($('#convenio_tipo_Comision :selected').val());
			$('#table_comisiones tr:gt(1)').remove();
			$('#table_comisiones input').removeAttr('readonly');
			$('#table_comisiones input').removeAttr('disabled');
			$('#title_desde').html('Desde <span class="required" aria-required="true">* </span>');
			$('#title_hasta').html('Hasta <span class="required" aria-required="true">* </span>');
		} else if ( $('#convenio_tipo_Comision :selected').val() == 3 ){
			$('#table_comisiones').show();
			privateCargarDataTableSegunTipoComision($('#convenio_tipo_Comision :selected').val());
			$('#table_comisiones tr:gt(1)').remove();
			$('#table_comisiones input').removeAttr('readonly');
			$('#table_comisiones input').removeAttr('disabled');
			$('#title_desde').html('Desde ($) <span class="required" aria-required="true">* </span>');
			$('#title_hasta').html('Hasta ($) <span class="required" aria-required="true">* </span>');
		}
	};
	
	// Se reinicializa la tabla de comisiones ocultando o mostrando algunas columnas 
	// segun sea el tipo de comision seleccionada.
	var privateCargarDataTableSegunTipoComision = function(tipoComision){
		var visible = null;
		var visibleTargets = null;
		if ( tipoComision == 4 ){
			visible = false;
			visibleTargets = [0, 1, 4];
		} else if ( tipoComision == 2 
				|| tipoComision == 3){
			visible = true;
			visibleTargets = [0, 1, 2, 3, 4];
		} else {
			$('#table_comisiones').hide();
		}
		if( visible != null ) {
			$('#table_comisiones').dataTable({
				"bPaginate" : false,
				"bInfo" : false,
				"bFilters" : false,
				"aoColumnDefs" : [
				    {'bSortable' : false, 'aTargets' : [0, 1, 2, 3, 4]},
					{"visible": visible, "targets": visibleTargets}
	            ],
				"dom" : '<"row"<"col-md-12 col-sm-12 col-xs-12"lrti<"pull-right"p>>>',
				"destroy" : true
			});
		}
	};
	
	// Validaciones manuales sobre las columnas Desde y Hasta de la tabla de comisiones.
	var privateValidarRangoDesdeHasta = function(field) {
		if ( $('#convenio_tipo_Comision :selected').val() == 2
			|| $('#convenio_tipo_Comision :selected').val() == 3 ){
			var par = $(field).closest('tr').find('input' + ($(field).hasClass('rango_desde')?'.rango_hasta':'.rango_desde'));
			
			if(!$(field).hasClass('rango_valorVariable') && !$(field).hasClass('rango_valorFijo')){	
				var desde, hasta;
				if($(field).hasClass('rango_desde')){
					var desde = $(field);
					var hasta = par;
				}else {
					var hasta = $(field);
					var desde = par;
				}
				var valido = true;
				if(desde.val() == ''){
					valido = false;
					desde.addClass('parsley-error');
					desde.closest('td').append('<ul class="parsley-errors-list filled"><li class="parsley-required">El campo es requerido</li></ul>');
				} else if(desde.val().indexOf(".") > 0) {
					valido = false;
					desde.addClass('parsley-error');
					desde.closest('td').append('<ul class="parsley-errors-list filled"><li class="parsley-required">El campo no permite valores decimales</li></ul>');
				}
				if(hasta.val() == ''){
					valido = false;
					hasta.addClass('parsley-error');
					hasta.closest('td').append('<ul class="parsley-errors-list filled"><li class="parsley-required">El campo es requerido</li></ul>');
				} else if(hasta.val().indexOf(".") > 0){
					valido = false;
					hasta.addClass('parsley-error');
					hasta.closest('td').append('<ul class="parsley-errors-list filled"><li class="parsley-required">El campo no permite valores decimales</li></ul>');
				}
				if( valido && parseFloat(hasta.val()) <= parseFloat(desde.val())){
					hasta.addClass('parsley-error');
					desde.addClass('parsley-error');
					var mensajeValidacion = "-";
					if($('#convenio_tipo_Comision :selected').val() == 3){
						mensajeError = "El monto ingresado en el campo Hasta no puede ser menor o igual al monto ingresado en el campo Desde";
					} else if($('#convenio_tipo_Comision :selected').val() == 2){
						mensajeError = "La cantidad ingresada en el campo Hasta no puede ser menor o igual a la cantidad ingresada en el campo Desde";
					}
					hasta.closest('td').append('<ul class="parsley-errors-list filled"><li class="parsley-required">'+mensajeError+'</li></ul>');
				}
			}
		}
	};
	
	// Validaciones manuales sobre las columnas Valor Fijo y Valor Variable de la tabla de comisiones.
	var privateValidarValoresFijoYVariable = function(field) {
		if ( $('#convenio_tipo_Comision :selected').val() == 4 
			|| $('#convenio_tipo_Comision :selected').val() == 2
			|| $('#convenio_tipo_Comision :selected').val() == 3){
			var par = $(field).closest('tr').find('input' + ($(field).hasClass('rango_valorVariable')?'.rango_valorFijo':'.rango_valorVariable'));
	
			if(!$(field).hasClass('rango_desde') && !$(field).hasClass('rango_hasta')){	
				var variable, fijo;
				if($(field).hasClass('rango_valorVariable')){
					var variable = $(field);
					var fijo = par;
				}else {
					var fijo = $(field);
					var variable = par;
				}
				
				if($(field).val() === '' && par.val() === ''){
					variable.addClass('parsley-error');
					fijo.addClass('parsley-error');
					variable.closest('td').append('<ul class="parsley-errors-list filled"><li class="parsley-required">'+
							'Se debe diligenciar al menos uno de los campos Valor fijo o Valor variable</li></ul>');
				} else {
					if( parseFloat(variable.val()) < 0.1 || 100.0 < parseFloat(variable.val()) ) {
						variable.addClass('parsley-error');
						variable.closest('td').append('<ul class="parsley-errors-list filled"><li class="parsley-required">'+
								'El campo debe tener un valor entre 0.1 y 100</li></ul>');
					}
					if(fijo.val() == '0') {
						fijo.addClass('parsley-error');
						fijo.closest('td').append('<ul class="parsley-errors-list filled"><li class="parsley-required">'+
								'El campo no debe ser igual a cero</li></ul>');
					} else if(fijo.val().indexOf(".") > 0){
						fijo.addClass('parsley-error');
						fijo.closest('td').append('<ul class="parsley-errors-list filled"><li class="parsley-required">El campo no permite valores decimales</li></ul>');
					}
					
					
				}
			}
		}
	};
	
	var privateValidarDosDecimales = function(valorCampo){
		return valorCampo.match(/^[0-9]+\.?[0-9]{0,2}/g)?valorCampo.match(/^[0-9]+\.?[0-9]{0,2}/g)[0]:"";
	};
	
	var privateAgregarEventosTablaComision = function() {
		// No se permite al usuario digitar mas de dos decimales en la columna Valor Variable.
		$('#table_comisiones input[type="text"].rango_valorVariable').keyup( function() {
			var valorCampo = $(this).val();
			if((valorCampo=privateValidarDosDecimales(valorCampo)) != null && valorCampo != $(this).val()){
				$(this).val(valorCampo);
			}
		}); 
		
		// Al precionar el botón agregar comision (+) se ejecutan las validaciones de parsley y las validaciones manuales
		// ("privateValidarRangoDesdeHasta" y "privateValidarValoresFijoYVariable").
		$('#btn_add_comision').click(function (e){
			// Si las comisiones ingresadas son validas se agrega una fila a la tabla de comisiones.
			if(privateValidarComisiones()){
				privateAddOrRemoveFilaComisiones(true);
			}
		});
	
		// Al precionar el botón eliminar comision (x) se eliminará la fila correspondiente en la tabla de comisiones.
		$('.btn_del_comision').click(function (e){
			e.preventDefault();
			var rowIndex = $(this).val(); 
			bootbox.dialog({
				message: "¿Desea eliminar el registro?",
				title: "Confirmaci\u00F3n",
				buttons: {
					success: {
						label: "Aceptar",
						className: "btn-success",
						callback: function() {
							privateAddOrRemoveFilaComisiones(false, rowIndex);
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
	};
	
	var limpiarErroresParsleyDeFormulario = function() {
		$('#form_convenio').parsley().reset();
		$('#form_convenio .parsley-error').removeClass('parsley-error');
		$('#form_convenio ul.parsley-errors-list').remove();
	}
	
	var privateValidarFormularioConvenio = function() {
		var valido = false;
		limpiarErroresParsleyDeFormulario();
		valido = $('#form_convenio').parsley().validate();
		valido = valido & privateValidarComisiones();
		return valido;
	}
	
	var privateValidarComisiones = function() {
		var valido = false;
		$('#table_comisiones .parsley-error').removeClass('parsley-error');
		$('#table_comisiones ul.parsley-errors-list').remove();
		
		$('#table_comisiones input[type="text"].rango_desde').each(function(index,data) {
			privateValidarRangoDesdeHasta(data);
		});
		$('#table_comisiones input[type="text"].rango_valorVariable').each(function(index,data) {
			privateValidarValoresFijoYVariable(data);
		});
		valido = $('#table_comisiones .parsley-error').length === 0;
		return valido;
	}
	
	// Función que permite agregar o eliminar una fila en la tabla de comisiones.
	// Si el parametro "isAdd" es true se agregará una fila, de lo contrario se eliminara una fila.
	var privateAddOrRemoveFilaComisiones = function(isAdd, rowIndex) {
		$('#form_convenio').ajaxSubmit({
			url: (isAdd ? '/convenios/addRowComisiones'
					: '/convenios/removeRowComisiones'),
			type: 'GET',
			data: { rowIndex: rowIndex,
					tipoComision : $('#convenio_tipo_Comision :selected').val()},
			success: function(html) {
				$('#body-panel-container').replaceWith(html);
				inicializarEstilos();
				$('#convenio_tipo_Comision').val($('#valor_tipo_comision').val());
				$('#convenio_tipo_Comision').select2();
				console.log($('#convenio_tipo_Comision :selected').val());
				privateInicializarEventos();
				privateConfigurarValidacionesSegunTipoComision();
				Matrix.init();
			}
		});
	}
	
	var privateFindAdminRecaudo = function() {
		var tipoDocumento = $("#adminRecaudo_tipoDocumento :selected").val();
		var numDocumento = $("#adminRecaudo_numDocumento").val();
		if(tipoDocumento != '' && numDocumento != '') {
			RestServices.obtenerInfoTerceroPorDocumento(tipoDocumento, numDocumento, {
				terceros : {
					callback : function(tercero) {
						var existe = tercero.id !== null;
						var mensaje;
						var callback_aceptar;
						var callback_cancelar = function() {
							if( $("#adminRecaudo_tipoDocumento_anterior").val() != '' 
									&& $("#adminRecaudo_numDocumento_anterior").val() != '' ) {
								$("#adminRecaudo_tipoDocumento").val( $("#adminRecaudo_tipoDocumento_anterior").val() );
								$("#adminRecaudo_tipoDocumento").select2();
								$("#adminRecaudo_numDocumento").val( $("#adminRecaudo_numDocumento_anterior").val() );
							}
						}
						if(existe) {
							mensaje = "El contacto administrador del recaudo ya existe \u00BFDesea reemplazar la información del contacto administrador del recaudo?";
							callback_aceptar = function() {
								privateHabilitarAdminRecaudo(false, tercero);
								$("#adminRecaudo_tipoDocumento_anterior").val( $("#adminRecaudo_tipoDocumento :selected").val() );
								$("#adminRecaudo_numDocumento_anterior").val( $("#adminRecaudo_numDocumento").val() );						
								limpiarErroresParsleyDeFormulario();
							}
						} else {
							mensaje = "El contacto administrador del recaudo no existe \u00BFDesea crear el contacto administrador del recaudo?";
							callback_aceptar = function() {
								privateHabilitarAdminRecaudo(true, null);
								$("#adminRecaudo_tipoDocumento_anterior").val( $("#adminRecaudo_tipoDocumento :selected").val() );
								$("#adminRecaudo_numDocumento_anterior").val( $("#adminRecaudo_numDocumento").val() );
								limpiarErroresParsleyDeFormulario();
							}
						}
						bootbox.dialog({
							message : mensaje,
							title : "Confirmaci\u00F3n",
							buttons : {
								success : {
									label : "Aceptar",
									className : "btn-success",
									callback : callback_aceptar
								},
								danger : {
									label : "Cancelar",
									className : "btn-danger",
									callback : callback_cancelar
								}
							}
						});
					}
				}
			});
		} else {
			privateHabilitarBoton_consultarAdminRecaudo();
		}
	}
	
	var privateListarMunicipiosPorDepartamento = function(seleccionar, idMunicipio){
		if( $("#adminRecaudo_departamento :selected").val() > 0 ) {
			cleanCombo($("#adminRecaudo_municipio"));
			RestServices.obtenerMunicipiosPorDepartamento( $("#adminRecaudo_departamento :selected").val(), {
				municipios: {
					callback: function(data){
						$.each(data, function(i, municipio){
							$('<option />', { value: municipio.id, text: municipio.nombre }).appendTo('#adminRecaudo_municipio');
						});
						if(seleccionar) {
							$('#adminRecaudo_municipio').val(idMunicipio);
							$("#adminRecaudo_municipio").select2();
						}
					}
				}
			});
		}
	}
	
	var privateHabilitarAdminRecaudo = function( habilitar, adminRecaudo ) {
		if( habilitar ) {
			$("#adminRecaudo_nombre").removeAttr('readonly');
			$("#adminRecaudo_nombre").val("");
			$("#adminRecaudo_priApellido").removeAttr('readonly');
			$("#adminRecaudo_priApellido").val("");
			$("#adminRecaudo_segApellido").removeAttr('readonly');
			$("#adminRecaudo_segApellido").val("");
			$("#adminRecaudo_direccion").removeAttr('readonly');
			$("#adminRecaudo_direccion").val("");
			$("#adminRecaudo_departamento").removeAttr('disabled');
			$("#adminRecaudo_departamento").val("");
			$("#adminRecaudo_departamento").select2({placeholder: '-- Seleccione --'});
			cleanCombo($("#adminRecaudo_municipio"));
			$("#adminRecaudo_municipio").removeAttr('disabled');
			$("#adminRecaudo_municipio").val("");
			$("#adminRecaudo_municipio").select2({placeholder: '-- Seleccione --'});
			$("#adminRecaudo_telefono").removeAttr('readonly');
			$("#adminRecaudo_telefono").val("");
			$("#adminRecaudo_email").removeAttr('readonly');
			$("#adminRecaudo_email").val("");
			$("#adminRecaudo_cargo").removeAttr('readonly');
			$("#adminRecaudo_cargo").val("");
			$("#adminRecaudo_celular").removeAttr('readonly');
			$("#adminRecaudo_celular").val("");
		} else {
			$("#adminRecaudo_nombre").attr('readonly','readonly');
			$("#adminRecaudo_nombre").val(adminRecaudo.nombre);
			$("#adminRecaudo_priApellido").attr('readonly','readonly');
			$("#adminRecaudo_priApellido").val(adminRecaudo.primerApellido);
			$("#adminRecaudo_segApellido").attr('readonly','readonly');
			$("#adminRecaudo_segApellido").val(adminRecaudo.segundoApellido);
			$("#adminRecaudo_direccion").attr('readonly','readonly');
			$("#adminRecaudo_direccion").val(adminRecaudo.direccion);
			$("#adminRecaudo_departamento").attr('disabled','disabled');
			$("#adminRecaudo_departamento").val(adminRecaudo.ciudad.departamento.id);
			$("#adminRecaudo_departamento").select2();
			$("#adminRecaudo_municipio").attr('disabled','disabled');
			privateListarMunicipiosPorDepartamento(true, adminRecaudo.ciudad.id);
			$("#adminRecaudo_telefono").attr('readonly','readonly');
			$("#adminRecaudo_telefono").val(adminRecaudo.telefono);
			$("#adminRecaudo_email").attr('readonly','readonly');
			$("#adminRecaudo_email").val(adminRecaudo.email);
			$("#adminRecaudo_cargo").attr('readonly','readonly');
			$("#adminRecaudo_cargo").val(adminRecaudo.cargo);
			$("#adminRecaudo_celular").attr('readonly','readonly');
			$("#adminRecaudo_celular").val(adminRecaudo.celular);
		}
	}
	
	var privateHabilitarBoton_consultarAdminRecaudo = function() {
		
		var tipoDocumento = $("#adminRecaudo_tipoDocumento :selected").val();
		var numDocumento = $("#adminRecaudo_numDocumento").val();
		if(tipoDocumento != '' && numDocumento != '') {
			$("#find_adminRecaudo").removeAttr('disabled');
		} else {
			$("#find_adminRecaudo").attr('disabled','disabled');
		}
	}
	
	// Se enlazan los elementos de la vista con los eventos necesarios para el normal funcionamiento de la interfaz.
	var privateInicializarEventos = function(){
		privateMostrarModalEditar();
		confirmEliminarReferencia();
		privateMostrarModalRegistrar();
		posicionarReferencia();
		privateConfirmReferencia();
		privateConfirmEdit();
		initCancelEdit();
		$('#convenio_tipo_Comision').change(function() {
			limpiarErroresParsleyDeFormulario();
			privateHabilitarCamposSegunTipoComision();		
			privateConfigurarValidacionesSegunTipoComision();
		});

		$('#find_adminRecaudo').click(function() {
			privateFindAdminRecaudo();
		});
		$('#adminRecaudo_tipoDocumento').change(function() {
			privateHabilitarBoton_consultarAdminRecaudo();
		});
		$('#adminRecaudo_numDocumento').keyup(function() {
			privateHabilitarBoton_consultarAdminRecaudo();
		});
		privateAgregarEventosTablaComision();
		privateCargarDataTableSegunTipoComision($('#convenio_tipo_Comision :selected').val());
		$("#adminRecaudo_departamento").change(function() {
			privateListarMunicipiosPorDepartamento(false);
		});
	};
	
	var privateConfiguracionTipoComision = function(){
		/*$('#convenio_tipo_Comision').select2("val", $('#valor_tipo_comision').val()).change();
		$("#convenio_tipo_Comision").select2().select2('val',$('#valor_tipo_comision').val());
		*/
		if($('#valor_tipo_comision').val() == null || $('#valor_tipo_comision').val() == ''){
		
		}else{
			$('#convenio_tipo_Comision').select2("val", $('#valor_tipo_comision').val()).change();
		}
		
		if ($('#id_tab_active').val() !== "null") {
			$('#referencias-tab').tab('show');
		} else {
			$('#convenio-tab').tab('show');
		}
		
		if($('#cantidad_comisiones').val() > 0){
			$("#convenio_tipo_Comision").select2("readonly", true);
			privateCargarDataTableSegunTipoComision($('#convenio_tipo_Comision :selected').val());
		} else{
			privateConfigurarValidacionesSegunTipoComision();
		}
	};
	
	return {
		initTable : function(options) {
			var defaults = {
				idSonvenioAjaxURL : ''
			};
			options = $.extend(true, defaults, options);
			configTable();
			configFilterTable(options);
		},

		loadForm : function() {
			inicializarEstilos();
			privateConfiguracionTipoComision();
			
			privateHabilitarBoton_consultarAdminRecaudo();
			
			// Pestaña Administrador del Recaudo :
			if($("#adminRecaudo_numDocumento").val() != '') {
				privateHabilitarAdminRecaudo(true);
			}
			$('#form_convenio').parsley().on('form:error', function() {
				$("#parsley-id-60").appendTo("#contenedor_parsley_numDocumento");
				return true;
			})
		},

		iniciarEventos : function() {
			privateInicializarEventos();
		},
	};

});