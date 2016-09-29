var Matrix = function() {

	/** Callback al cerrar los modales */
	var handleModal = function() {
		// fix stackable modal issue: when 2 or more modals opened, closing one of modal will remove .modal-open class. 
        $('body').on('hide.bs.modal', function() {
            if ($('.modal:visible').size() > 1 && $('html').hasClass('modal-open') === false) {
                $('html').addClass('modal-open');
            } else if ($('.modal:visible').size() <= 1) {
                $('html').removeClass('modal-open');
            }
        });

        // fix page scrollbars issue
        $('body').on('show.bs.modal', '.modal', function() {
            if ($(this).hasClass("modal-scroll")) {
                $('body').addClass("modal-open-noscroll");
            }
        });

        // fix page scrollbars issue
        $('body').on('hide.bs.modal', '.modal', function() {
            $('body').removeClass("modal-open-noscroll");
        });

        // remove ajax content and remove cache on modal closed 
        $('body').on('hidden.bs.modal', '.modal:not(.modal-cached)', function () {
            $(this).removeData('bs.modal');
        });
	};

	var handleSelect2 = function() {
		if ($().select2) {
			$('.select2me').select2({
				placeholder : "-- Seleccione --",
				allowClear : false,
				width: '100%'
			});
		}
	};

	// Handles Bootstrap Tooltips.
	var handleTooltips = function() {
		// global tooltips
		$('.tooltips').tooltip();
	};

	/** iCheck Plugin */
	var handleiCheck = function() {
		if (!$().iCheck) {
			return;
		}

		$('input.flat').each(function() {
			$(this).iCheck({
				checkboxClass : 'icheckbox_flat-green',
				radioClass : 'iradio_flat-green'
			}).on('ifChecked', function(){
				var selector = $(this).attr('checkbox-selector-manager')
				if (typeof selector !== typeof undefined && selector !== false) {
					$(selector).iCheck('check');
				}
			}).on('ifUnchecked', function(){
				var selector = $(this).attr('checkbox-selector-manager')
				if (typeof selector !== typeof undefined && selector !== false) {
					$(selector).iCheck('uncheck');
				}
			});
		});
	};
	
	var handleTextAreaNoResize = function() {
		$('textarea').each(function(i, obj){
			$(this).css('resize', 'none');
		});
	};
	
	var handleValidationRulesInputs = function() {
		
		$(':input[type="number"], input.number, input.phone').keypress(function(event){
			if(!(event.which >= 48 && event.which <= 57) && event.which != 8 && event.which != 0 && event.which != 46) {
				event.preventDefault();
			}
		});
		
    };

	return {
		init : function() {
			handleiCheck();
			handleSelect2();
			handleTooltips();
			handleModal();
			handleTextAreaNoResize();
			handleValidationRulesInputs();
		},
		initAjax : function() {
			handleiCheck();
			handleSelect2();
			handleTooltips();
			handleTextAreaNoResize();
			handleValidationRulesInputs();
		}
	}
}();