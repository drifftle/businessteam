package co.businessteam.minoticia.backoffice.web;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import co.businessteam.core.domain.Categoria;
import co.businessteam.core.domain.Solicitud;
import co.businessteam.core.domain.SolicitudPorCategoria;
import co.businessteam.core.domain.Usuario;
import co.businessteam.core.security.context.BusinessTeamContextHolder;
import co.businessteam.core.service.CategoriaService;
import co.businessteam.core.service.ReferidoService;
import co.businessteam.core.service.SolicitudPorCategoriaService;
import co.businessteam.core.service.SolicitudService;
import co.businessteam.core.service.UsuarioService;
import co.businessteam.core.service.ex.ServiceException;

@Controller
@RequestMapping(value = "/solicitud")
public class SolicitudController {

	private static final String WEB_PATROCINADOR_MODEL = "patrocinador";

	private static final String WEB_CATEGORIAS_MODEL = "categorias";

	private static final String WEB_SOLICITUD_MODEL = "solicitud";

	@Autowired
	private SolicitudService solicitudService;

	@Autowired
	private CategoriaService categoriaService;

	@Autowired
	private ReferidoService referidoService;
	
	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private SolicitudPorCategoriaService solicitudPorCategoriaService;

	@RequestMapping(value = "/search")
	public String formularioConsultarPatrocinador(Model model) {
		
		model.addAttribute(WEB_SOLICITUD_MODEL, new Solicitud());

		return "solicitud/formularioSolicitud";
	}

	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public String buscarPatrocinadorPorApodo(Model model,
			@RequestParam(required = false, value = "_username") String username) {
		
		try {
			Solicitud solicitud = new Solicitud();
			List<SolicitudPorCategoria> solicitudPorCategorias = new ArrayList<>();
			solicitudPorCategorias.add(new SolicitudPorCategoria());
			Usuario usuario = usuarioService.obtenerUsuarioPorUsername(username);
			if(!usuario.getApodo().equals(BusinessTeamContextHolder.getUsernameUsuarioSesion())){
				solicitud.setSolicituPorcategorias(solicitudPorCategorias);
				solicitud.setUsuario(usuario);
				model.addAttribute(WEB_CATEGORIAS_MODEL, categoriaService.consultarTodos());
			} else {
				model.addAttribute("infoMsg", "No puedes ser tu propio patrocinador");
			}
			model.addAttribute(WEB_SOLICITUD_MODEL, solicitud);
		} catch (Exception e) {
			model.addAttribute("error", "error al cargar el la lista de categorias");
		}
		return "solicitud/formularioSolicitud";
	}

	@RequestMapping(value = "/send", method = RequestMethod.POST)
	public String sendSolicitud(Model model, @Valid @ModelAttribute Solicitud solicitud, @RequestParam(name ="categorias") String categorias, BindingResult result) {

		try {
			if (!result.hasErrors()) {
				solicitud.setReferido(referidoService
						.obtenerReferidoPorUsername(BusinessTeamContextHolder.getUsernameUsuarioSesion()));
				solicitud.setSolicituPorcategorias(stringToSolicitudPorCategoria(categorias));
				solicitudService.registrar(solicitud);
			}
		} catch (Exception e) {
			System.out.println("error");
		}

		return "solicitud/formularioSolicitud";
	}

	@RequestMapping(value = "/lista")
	public String getListaSolicitudes(Model model) {
		try {
			model.addAttribute("solicitudes", solicitudService.consultarSolicitudPorIdPatrocinador(usuarioService
					.obtenerUsuarioPorUsername(BusinessTeamContextHolder.getUsernameUsuarioSesion()).getId()));
		} catch (ServiceException e) {
			model.addAttribute("ERROR", "Error al cargar las solicitudes");
		}
		return "solicitud/listaSolicitudes";
	}

	@RequestMapping("/status/{idSolicitud}")
	public String getFormStatusSolicitud(Model model, @PathVariable Long idSolicitud) {
		try {
			Solicitud solicitud = solicitudService.consultarPorId(idSolicitud);
			solicitud.setSolicituPorcategorias(solicitudPorCategoriaService.consultarSolicitudPorCategoriasPorIdSolicitud(idSolicitud));
			model.addAttribute("solicitud", solicitud);
		} catch (Exception e) {

		}
		return "solicitud/statusSolicitud";
	}
	
	@RequestMapping(value = "/status/update", method = RequestMethod.POST)
	public String postUpdateStateSolicitud(Model model, @ModelAttribute Solicitud solicitud){
		try{
			
			solicitudService.actualizar(solicitud);
		}catch(Exception e){
			
		}
		return "solicitud/listaSolicitudes";
	}

	private List<SolicitudPorCategoria> stringToSolicitudPorCategoria(String keys) {

		List<SolicitudPorCategoria> solicitudPorCategorias = new ArrayList<>();
		
		String [] keyCategorias = keys.split(",");
		for(String idCategoria : keyCategorias){
			SolicitudPorCategoria solicitudPorCategoria = new SolicitudPorCategoria();
			solicitudPorCategoria.setCategoria(new Categoria());
			solicitudPorCategoria.getCategoria().setId(Long.valueOf(idCategoria));
			solicitudPorCategorias.add(solicitudPorCategoria);
		}
		
		return solicitudPorCategorias;
	}

}
