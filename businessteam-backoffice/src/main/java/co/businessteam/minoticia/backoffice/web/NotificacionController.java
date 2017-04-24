package co.businessteam.minoticia.backoffice.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import co.businessteam.core.domain.Notificacion;
import co.businessteam.core.repository.NotificacionRepository;
import co.businessteam.core.security.context.BusinessTeamContextHolder;

@Controller
@RequestMapping(value = "/notificacion")
public class NotificacionController {
	
	@Autowired
	private NotificacionRepository notificacionRepository;
	
	@RequestMapping(value ="/historial")
	public String get(){
		System.out.println("hey!! que pasa "+BusinessTeamContextHolder.getUsernameUsuarioSesion());
		return "notificacion/historialNotificaciones";
	}
	
	@MessageMapping("/notificaciones")
	@SendTo("/list/notificaciones")
	public List<Notificacion>  getNotificacion(String test){
		try{
			System.out.println("hey!! que pasa "+BusinessTeamContextHolder.getUsernameUsuarioSesion());
			//if(BusinessTeamContextHolder.isAuthenticate()){
				List<Notificacion> notificaciones = notificacionRepository.obtenerNotificacionesPorUsernameUsuario("drifftle");
				return notificaciones;
			//}
		}catch(Exception e){
			
		}
		return null;
	}

}
