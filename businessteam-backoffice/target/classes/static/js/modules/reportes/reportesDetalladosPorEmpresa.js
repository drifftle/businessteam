var ReportesDetalladosPorEmpresa = function() {
	var validationForm = function(options) {
		var form = $('#formReporteTransaccionesPorEmpresaDetallado').parsley().on('form:submit',
				function() {
					$('#formReporteTransaccionesPorEmpresaDetallado').ajaxSubmit({
						url : options.URL.listar
					});
					return true;
				})
		$('#formReporteTransaccionesPorEmpresaDetallado').parsley().on('form:error',
				function() {
					$("#parsley-id-4").appendTo("#contenedor_parsley_fecha_inicial");
					$("#parsley-id-6").appendTo("#contenedor_parsley_fecha_final");
					return true;
				})
	};
	var habilitarDeshabilitarFechaFinal = function() {
		if ( $('#fechaInicial').val() === '' ){
			$('#fechaFinal').attr('disabled', 'disabled');
		} else {
			$("#fechaFinal").removeAttr("disabled");
		}
	};
	
	return {
		initTabla : function() {
			$('#table_transacciones_por_empresa_detallado').configDataTable({
				lengthMenu : [ 5, 15, 45 ],
				sortable : true,
				sortableTargets : [],
				visible : false,
				visibleTargets : [ 9 ],
				sorting : [[ 9, "desc" ], [ 1, "desc" ], [ 0, "desc" ]]
			});

			var hoy = new Date();
			$('#fechaInicial').daterangepicker({
				singleDatePicker : true,
				calender_style : "picker_1",
				format : 'DD/MM/YYYY',
				language : "es",
				maxDate : hoy.getDate()+"/"+(hoy.getMonth()+1)+"/"+hoy.getFullYear()
			}, function(start, end, label) {
				habilitarDeshabilitarFechaFinal();
			});
			$('#fechaFinal').daterangepicker({
				singleDatePicker : true,
				calender_style : "picker_1",
				format : 'DD/MM/YYYY',
				language : "es",
				maxDate : hoy.getDate()+"/"+(hoy.getMonth()+1)+"/"+hoy.getFullYear()
			}, function(start, end, label) {
				
			});

			habilitarDeshabilitarFechaFinal();
			$("#fechaInicial").blur(function() {
				habilitarDeshabilitarFechaFinal();
			});
			
			$('#exportExcel').click(function(e) {
				e.preventDefault();
				$('#isExportarExcel').val('true');
				$('#formReporteTransaccionesPorEmpresaDetallado').submit();
				$('#isExportarExcel').val('');
			});

			$('#exportPdf').click(function(e) {
				e.preventDefault();
				$('#isExportarPdf').val('true');
				$('#formReporteTransaccionesPorEmpresaDetallado').submit();
				$('#isExportarPdf').val('');
			});
		},
		initForm : function(options) {
			var defaults = {};
			options = $.extend(true, defaults, options);
			validationForm(options);
		}
	};
}();