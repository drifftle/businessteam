package co.businessteam.minoticia.backoffice.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import co.businessteam.core.security.service.SecurityService;

@Controller
@RequestMapping("/login")
public class LoginController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(LoginController.class);

	@Autowired
	private SecurityService securityService;

	@RequestMapping
	public String login(Model model) {
		return "login";
	}

	@RequestMapping(method = RequestMethod.POST)
	public String login(@RequestParam("j_username") String usuario, @RequestParam("j_password") String contrasena,
			Model model) {
		try {
			if (securityService.authenticate(usuario, contrasena)) {
				return "redirect:/";
			} else {
				model.addAttribute("error",
						"Debe verificar si las credenciales de sesion son correctas. Intente de nuevo con el usuario y contraseña.");
			}

		} catch (Exception e) {
			LOGGER.error("Error al tratar de autenticar al usuario {}", usuario, e);
		}

		SecurityContextHolder.clearContext();
		return login(model);
	}

}
