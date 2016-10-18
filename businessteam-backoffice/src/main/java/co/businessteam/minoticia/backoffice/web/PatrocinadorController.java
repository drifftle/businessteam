package co.businessteam.minoticia.backoffice.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import co.businessteam.core.domain.Avatar;
import co.businessteam.core.domain.Patrocinador;
import co.businessteam.core.domain.Rol;
import co.businessteam.core.service.CategoriaService;
import co.businessteam.core.service.PatrocinadorService;

@Controller
@RequestMapping("/patrocinador")
public class PatrocinadorController {
	
	private static final String MODEL_PATROCINADOR = "patrocinador";

	@Autowired
	private PatrocinadorService patrocinadorService;
	
	@Autowired
	private CategoriaService categoriaService;

	@RequestMapping(value = "/search")
	public String formularioConsultarPatrocinador(Model model) {
		
			model.addAttribute("patrocinador", new Patrocinador());
		
		return "patrocinador/formularioSolicitud";
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public String buscarPatrocinadorPorApodo(Model model, @RequestParam(required = false, value = "_username") String username) {
		try{
			Patrocinador patrocinador = patrocinadorService.obtenerPatrocinadorPorApodo(username);
			model.addAttribute("categorias", categoriaService.consultarTodos());
			model.addAttribute("patrocinador", patrocinador);
		}catch(Exception e){
			
		}
		return "patrocinador/formularioSolicitud";
	}
	

	@RequestMapping("/signup")
	public String formularioRegistro(Model model) {
		model.addAttribute(MODEL_PATROCINADOR, new Patrocinador());
		return "patrocinador/formularioPatrocinador";
	}

	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public String RegistrarPatrocinador(Model model, @ModelAttribute @Valid Patrocinador patrocinador,
			BindingResult result) {

		try {
			if (!result.hasErrors()) {
				patrocinador.setAvatar(getDefaultAvatar());
				patrocinador.setRol(getDefaultRol());
				patrocinadorService.registrar(patrocinador);
			}
		} catch (Exception e) {

		}
		return "patrocinador/formularioPatrocinador";
	}
	
	public String enviarSolicitud(){
		return null;
	}

	@ModelAttribute
	public Avatar getDefaultAvatar() {
		return new Avatar(1l, "/avatar/img1.jpg");
	}
	
	public Rol getDefaultRol(){
		return new Rol(2l);
	}
}
