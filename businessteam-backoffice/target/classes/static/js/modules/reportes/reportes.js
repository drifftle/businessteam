var Reportes = function() {
	var validationForm = function(options) {
		$('#formReporteConsolidado').parsley().on('form:submit',
				function() {
					$('#formReporteConsolidado').ajaxSubmit({
						url : options.URL.listar
					});
					return true;
				})
		$('#formReporteConsolidado').parsley().on('form:error',
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
			$('#table_convenios').configDataTable({
				sortable : true
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

			$('#btnExportar').click(function(e) {
				e.preventDefault();
				$('#isExportar').val('true');
				$('#formReporteConsolidado').submit();
				$('#isExportar').val('false');
			});
		},
		initForm : function(options) {
			var defaults = {};
			options = $.extend(true, defaults, options);
			validationForm(options);
		}
	};
}();