package co.businessteam.backoffice.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import co.businessteam.core.domain.Patrocinador;
import co.businessteam.core.domain.Referido;
import co.businessteam.core.domain.Solicitud;
import co.businessteam.core.service.CategoriaService;
import co.businessteam.core.service.PatrocinadorService;
import co.businessteam.core.service.ReferidoService;
import co.businessteam.core.service.SolicitudService;
import co.businessteam.util.Util;

@Controller
@RequestMapping(value = "/solicitud")
public class SolicitudController {

	private static final String WEB_PATROCINADOR_MODEL = "patrocinador";

	private static final String WEB_CATEGORIAS_MODEL = "categorias";

	private static final String WEB_SOLICITUD_MODEL = "solicitud";

	@Autowired
	private SolicitudService solicitudService;

	@Autowired
	private PatrocinadorService patrocinadorService;

	@Autowired
	private CategoriaService categoriaService;
	
	@Autowired
	private ReferidoService referidoService;
	

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
			Patrocinador patrocinador = patrocinadorService.obtenerPatrocinadorPorApodo(username);
			solicitud.setPatrocinador(patrocinador);
			model.addAttribute(WEB_CATEGORIAS_MODEL, categoriaService.consultarTodos());
			model.addAttribute(WEB_SOLICITUD_MODEL, solicitud);
			Referido referido = referidoService.obtenerReferidoPorUsername("MariaAraujo1998");
			System.out.println(referido.getId());
		} catch (Exception e) {
			model.addAttribute("error", "error al cargar el la lista de categorias");
		}
		return "solicitud/formularioSolicitud";
	}

	@RequestMapping(value = "/send", method = RequestMethod.POST)
	public String sendSolicitud(Model model, @Valid @ModelAttribute Solicitud solicitud, BindingResult result) {
		
		try {
			if(!result.hasErrors()){
				Referido referido = referidoService.obtenerReferidoPorUsername("MariaAraujo1998");
			}
		} catch (Exception e) {

		}

		return "solicitud/formularioSolicitud";
	}

	public String registrar(Model model, BindingResult result, @ModelAttribute Solicitud solicitud) {
		try {
			if (!result.hasErrors()) {
				if (!Util.isNull(solicitud.getCategorias())) {

				} else {

				}
			}
		} catch (Exception e) {

		}
		return null;
	}

}