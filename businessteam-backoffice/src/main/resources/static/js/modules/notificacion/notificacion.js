define(function() {

	var stompClient = null;
	var notificaciones = null;

	var connecting = function() {
		var socket = new SockJS('/notificacion');// --/notificacion
		stompClient = Stomp.over(socket);
		stompClient.connect({}, function(frame) {
			obtenerNotificaciones();
			stompClient.subscribe('/list/notificaciones', function(message) {
				handleNotificaciones(JSON.parse(message.body));
			});
		});

	};

	/*
	 * function disconnect() { if (stompClient != null) {
	 * stompClient.disconnect(); } setConnected(false);
	 * console.log("Disconnected"); }
	 */

	var obtenerNotificaciones = function() {
		if (stompClient.connected) {
			stompClient.send("/app/notificaciones", {}, JSON.stringify({
				'test' : 'test'
			}));
		}
	};

	var handleNotificaciones = function(message) {
		$(".badge").append(message.length);
		notificaciones = message;
	};

	var loadDropdown = function() {
		
		$('#invoque_event').on('show.bs.dropdown', function() {
			var dropdown = $('.dropdown-menu.list-unstyled.msg_list').empty();
			for (i = 0; i < notificaciones.length; i++) {
			dropdown.append('<li><a> <span class="image"><img src="'+notificaciones[i].usuario.avatar.urlAvatar+'" alt="Profile Image" /></span>'+
					        '<span><span>'+notificaciones[i].usuario.apodo+'</span> <span class="time">'+notificaciones[i].fechaRegistro+' </span> </span>'+ 
					        '<span class="message">'+notificaciones[i].descripcionNotificacion+'</span></a></li>');
			}
			dropdown.append('<div class="text-center"><a> <strong>Mirar todas la notificaciones</strong> <iclass="fa fa-angle-right"></i></a></div>');
		});
	};

	return {

		webSocketInit : function() {
			connecting();
			loadDropdown();
		}
	};
});
