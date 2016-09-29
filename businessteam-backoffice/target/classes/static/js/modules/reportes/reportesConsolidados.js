var ReportesConsolidados = function() {
	var validationForm = function(options) {
		var form = $('#formReporteTransacPorConvenioConsolidado').parsley().on(
				'form:submit', function() {
					$('#formReporteTransacPorConvenioConsolidado').ajaxSubmit({
						url : options.URL.listar,
					});
					return true;
				})
		$('#formReporteTransacPorConvenioConsolidado').parsley().on('form:error',
				function() {
					$("#parsley-id-4").appendTo("#contenedor_parsley_fecha_inicial");
					$("#parsley-id-6").appendTo("#contenedor_parsley_fecha_final");
					return true;
				})
	};

	var validationFormReporteConsolidado = function(options) {
		var form = $('#formReporteTransacPorEmpresaConsolidado').parsley().on(
				'form:submit', function() {
					$('#formReporteTransacPorEmpresaConsolidado').ajaxSubmit({
						url : options.URL.listar,
					});
					return true;
				})
		$('#formReporteTransacPorEmpresaConsolidado').parsley().on('form:error',
				function() {
					$("#parsley-id-4").appendTo("#contenedor_parsley_fecha_inicial");
					$("#parsley-id-6").appendTo("#contenedor_parsley_fecha_final");
					return true;
				})
	};

	var habilitarDeshabilitarFechaFinal = function() {
		if ($('#fechaInicial').val() === '') {
			$('#fechaFinal').attr('disabled', 'disabled');
		} else {
			$("#fechaFinal").removeAttr("disabled");
		}
	};

	return {
		initTabla : function() {
			$('#table_transacciones_por_convenio_consolidado').configDataTable(
					{
						lengthMenu : [ 5, 15, 45 ],
						sortable : true,
						sortableTargets : [],
						sorting : [ [ 0, "asc" ] ]
					});

			var hoy = new Date();
			$('#fechaInicial').daterangepicker(
					{
						singleDatePicker : true,
						calender_style : "picker_1",
						format : 'DD/MM/YYYY',
						language : "es",
						maxDate : hoy.getDate() + "/" + (hoy.getMonth() + 1)
								+ "/" + hoy.getFullYear()
					}, function(start, end, label) {
						habilitarDeshabilitarFechaFinal();
					});
			$('#fechaFinal').daterangepicker(
					{
						singleDatePicker : true,
						calender_style : "picker_1",
						format : 'DD/MM/YYYY',
						language : "es",
						maxDate : hoy.getDate() + "/" + (hoy.getMonth() + 1)
								+ "/" + hoy.getFullYear()
					}, function(start, end, label) {

					});

			if ($("#convenios_seleccionados").val() === "") {
				$('#convenio > option[value="0"]').attr('selected', 'selected');
			} else {
				var convenios_seleccionados = $("#convenios_seleccionados")
						.val().split(",");
				for (i in convenios_seleccionados) {
					$(
							'#convenio > option[value="'
									+ convenios_seleccionados[i] + '"]').attr(
							'selected', 'selected');
				}
			}
			$(".selectpicker").select2();

			habilitarDeshabilitarFechaFinal();
			$("#fechaInicial").blur(function() {
				habilitarDeshabilitarFechaFinal();
			});
			
			$('#exportExcel').click(function(e) {
				e.preventDefault();
				$('#isExportarExcel').val('true');
				$('#formReporteTransacPorConvenioConsolidado').submit();
				$('#isExportarExcel').val('');
			});

			$('#exportPdf').click(function(e) {
				e.preventDefault();
				$('#isExportarPdf').val('true');
				$('#formReporteTransacPorConvenioConsolidado').submit();
				$('#isExportarPdf').val('');
			});
		},

		initTableReporteConsolidado : function() {
			$('#table_transacciones_por_empresa_consolidado').configDataTable({
				lengthMenu : [ 5, 15, 45 ],
				sortable : true,
				sortableTargets : [],
				sorting : [ [ 0, "asc" ] ]
			});

			var hoy = new Date();
			$('#fechaInicial').daterangepicker(
					{
						singleDatePicker : true,
						calender_style : "picker_1",
						format : 'DD/MM/YYYY',
						language : "es",
						maxDate : hoy.getDate() + "/" + (hoy.getMonth() + 1)
								+ "/" + hoy.getFullYear()
					}, function(start, end, label) {
						habilitarDeshabilitarFechaFinal();
					});
			$('#fechaFinal').daterangepicker(
					{
						singleDatePicker : true,
						calender_style : "picker_1",
						format : 'DD/MM/YYYY',
						language : "es",
						maxDate : hoy.getDate() + "/" + (hoy.getMonth() + 1)
								+ "/" + hoy.getFullYear()
					}, function(start, end, label) {

					});

			$(".select2_multiple").select2({
				maximumSelectionLength : 4,
				placeholder : "With Max Selection limit 4",
				allowClear : true
			});

			if ($("#empresas_seleccionados").val() === "") {
				$('#empresa > option[value="0"]').attr('selected', 'selected');
			} else {
				var empresas_seleccionados = $("#empresas_seleccionados").val()
						.split(",");
				for (i in empresas_seleccionados) {
					$(
							'#empresa > option[value="'
									+ empresas_seleccionados[i] + '"]').attr(
							'selected', 'selected');
				}
			}

			$(".selectpicker").select2();

			habilitarDeshabilitarFechaFinal();
			$("#fechaInicial").blur(function() {
				habilitarDeshabilitarFechaFinal();
			});

			$('#exportExcel').click(function(e) {
				e.preventDefault();
				$('#isExportarExcel').val('true');
				$('#formReporteTransacPorEmpresaConsolidado').submit();
				$('#isExportarExcel').val('');
			});

			$('#exportPdf').click(function(e) {
				e.preventDefault();
				$('#isExportarPdf').val('true');
				$('#formReporteTransacPorEmpresaConsolidado').submit();
				$('#isExportarPdf').val('');
			});
		},

		initForm : function(options) {
			var defaults = {};
			options = $.extend(true, defaults, options);
			validationForm(options);
		},

		initFormReporteConsolidado : function(options) {
			var defaults = {};
			options = $.extend(true, defaults, options);
			validationFormReporteConsolidado(options);
		}
	};
}();