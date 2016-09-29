var RestServices = function(){
	
	var _obtenerDepartamentos = function(options) {
		$.ajax({
			url: '/rest/core/regiones/departamentos',
			type: 'post',
			dataType: 'json',
			beforeSend: function(){
				
			},
			success: function(data) {
				
				if('callback' in options.departamentos) {
					options.departamentos.callback(data);
				}
 			},
			error: function() {
				bootbox.alert('Error en el servicio de departamentos.');
			}
		});
	};
	
	var _obtenerMunicipiosPorDepartamento = function(depatarmentoId, options){
		$.ajax({
			url: '/rest/core/regiones/municipios',
			type: 'post',
			dataType: 'json',
			data: { idDepartamento: depatarmentoId },
			beforeSend: function(){
				
			},
			success: function(data) {
				
				if('callback' in options.municipios) {
					options.municipios.callback(data);
				}
 			},
			error: function() {
				bootbox.alert('Error en el servicio de municipios.');
			}
		});
	};
	
	var _obtenerInfoTerceroPorDocumento = function(tipoDoc, numDoc, options) {
		$.ajax({
			url: '/rest/core/terceros/consultar',
			type: 'post',
			dataType: 'json',
			data: { tipoDocumento: tipoDoc, numDocumento: numDoc },
			beforeSend: function(){
				
			},
			success: function(data) {
				
				if('callback' in options.terceros) {
					options.terceros.callback(data);
				}
 			},
			error: function() {
				bootbox.alert('Error en el servicio de terceros.');
			}
		});
	};
	
	var _obtenerOficinasActivasPorRed = function(redId, options) {
		$.ajax({
			url: '/rest/core/redes/oficinas',
			type: 'post',
			dataType: 'json',
			data: { idRed: redId },
			beforeSend: function(){
				
			},
			success: function(data) {
				
				if('callback' in options.oficinas) {
					options.oficinas.callback(data);
				}
 			},
			error: function() {
				bootbox.alert('Error en el servicio de oficinas.');
			}
		});
	};
	
	var _obtenerRedPorId = function(redId, options) {
		$.ajax({
			url: '/rest/core/redes/red',
			type: 'post',
			dataType: 'json',
			data: { idRed: redId },
			beforeSend: function(){
				
			},
			success: function(data) {
				
				if('callback' in options.red) {
					options.red.callback(data);
				}
 			},
			error: function() {
				bootbox.alert('Error en el servicio de redes.');
			}
		});
	};
	
	return {
		obtenerDepartamentos: function(options){
			var defaults = {};
			options = $.extend(true, defaults, options);
			
			if('departamentos' in options) {
				_obtenerDepartamentos(options);
			}
			
		},
		obtenerMunicipiosPorDepartamento: function(depatarmentoId, options) {
			var defaults = {};
			options = $.extend(true, defaults, options);
			
			if('municipios' in options) {
				_obtenerMunicipiosPorDepartamento(depatarmentoId, options);
			}
		},
		obtenerInfoTerceroPorDocumento: function(tipoDoc, numDoc, options) {
			var defaults = {};
			options = $.extend(true, defaults, options);
			
			if('terceros' in options) {
				_obtenerInfoTerceroPorDocumento(tipoDoc, numDoc, options);
			}
		},
		obtenerOficinasActivasPorRed: function(redId, options) {
			var defaults = {};
			options = $.extend(true, defaults, options);
			
			if('oficinas' in options) {
				_obtenerOficinasActivasPorRed(redId, options);
			}
		},
		obtenerRedPorId: function(redId, options) {
			var defaults = {};
			options = $.extend(true, defaults, options);
			
			if('red' in options) {
				_obtenerRedPorId(redId, options);
			}
		}
	}
	
}();