var Recaudos = function() {

	var configFilterTable = function(options) {
		$('#table_recaudos').configDataTable({
			sortable : true,
			sortableTargets : []
		});
	};

	var configFilterModal = function(options) {

		$('#filtroEmpresa').change(function() {
			cleanCombo($('#filtroConvenio'), {
				data : [ {
					id : '0',
					text : '-- Todos --'
				} ]
			});

			var _idEmpresa = this.value;
			if (_idEmpresa != 0) {
				$.ajax({
					url : options.url.conveniosPorEmpresa,
					type : 'post',
					dataType : 'json',
					data : {
						filtroEmpresa : _idEmpresa
					},
					success : function(convenios) {
						if (convenios.length > 0) {
							$.each(convenios, function(i, data) {
								$('<option />', {
									value : data.id,
									html : data.codigoConvenio
								}).appendTo($('#filtroConvenio'));
							});
						}
					},
					error : function() {

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
			
			$("#pre-selected-options").select2(); 
				
			
		},
		initFilterModal : function(options) {
			var defaults = {};
			options = $.extend(true, defaults, options);

			configFilterModal(options);
		}
	};
}();