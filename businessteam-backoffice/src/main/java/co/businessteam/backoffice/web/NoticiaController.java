package co.businessteam.backoffice.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/noticia")
@Controller
public class NoticiaController {
	
	
	@RequestMapping("/{idPatrocinador}")
	public String getListaNoticiasPorPatrocinador(@PathVariable String patrocinador){
		
		return null;
	}
	
	@RequestMapping("/")
	public String getNoticia(){
		return "recaudos/listarRecaudos";
	}

}
