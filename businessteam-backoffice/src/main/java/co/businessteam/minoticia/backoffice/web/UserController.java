package co.businessteam.minoticia.backoffice.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(value = "/user")
@Controller
public class UserController {

	@RequestMapping(value = "/signup")
	public String signUp(){
		return null;
	}
	
}
