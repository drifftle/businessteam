(function($) {

	$.fn.configDataTable = function(options) {

		var settings = $.extend({
			sortable : false,
			sortableTargets : [ 0 ],
			visible : true,
			visibleTargets : [ ],
			sorting : [[ 0, "asc" ]],
			pageLength : 15,
			lengthMenu : [ 15 ],
			displayLength : 15,
		}, options);

		this.dataTable({
					"language" : {
						"url" : '/js/plugins/datatables/dataTables.es.json'
					},
					"sPaginationType" : "full_numbers",
					"aoColumnDefs" : [ 
					    { 
					    	'bSortable' : settings.sortable,
					    	'aTargets' : settings.sortableTargets 
					    },
						{ 
					    	"visible": settings.visible,
					    	"targets": settings.visibleTargets
		                }
		            ],
					"aaSorting": settings.sorting,
					"pageLength" : settings.pageLength,
					"lengthMenu" : settings.lengthMenu,
					"iDisplayLength" : settings.displayLength,
					"dom" : '<"row"<"col-md-12 col-sm-12 col-xs-12"lrti<"pull-right"p>>>'
				});

		return this;

	};

}(jQuery));