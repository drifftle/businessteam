var ReportesDetallados = function() {
	
	var validationForm = function(options) {
	
		$('#formReporteDiarioTransac').parsley().on('form:submit',
				function() {
					$('#formReporteDiarioTransac').ajaxSubmit({
						url : options.URL.listar,
					});
					return true;
				})
		$('#formReporteDiarioTransac').parsley().on('form:error',
				function() {
					$("#parsley-id-4").appendTo("#contenedor_parsley_fecha");
					return true;
				})
	};
	
	
	return {
		initTabla : function() {
			$('#table_transacciones_diarias').configDataTable({
				lengthMenu : [ 5, 15, 45 ],
				sortable : true,
				sortableTargets : [],
				visible : false,
				visibleTargets : [ 10 ],
				sorting : [[ 10, "desc" ], [ 1, "desc" ], [ 0, "desc" ]]
			});

			var hoy = new Date();
			$('#fecha').daterangepicker({
				singleDatePicker : true,
				calender_style : "picker_1",
				format : 'DD/MM/YYYY',
				language : "es",
				maxDate : hoy.getDate()+"/"+(hoy.getMonth()+1)+"/"+hoy.getFullYear()
			}, function(start, end, label) {
			});
			
			$('#exportExcel').click(function(e) {
				e.preventDefault();
				$('#isExportarExcel').val('true');
				$('#formReporteDiarioTransac').submit();
				$('#isExportarExcel').val('');
			});

			$('#exportPdf').click(function(e) {
				e.preventDefault();
				$('#isExportarPdf').val('true');
				$('#formReporteDiarioTransac').submit();
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