package co.businessteam.minoticia.backoffice.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import co.businessteam.core.security.context.BusinessTeamContextHolder;
import co.businessteam.core.service.CategoriaService;
import co.businessteam.core.service.UsuarioService;
import co.businessteam.minoticia.core.domain.Comentario;
import co.businessteam.minoticia.core.domain.Noticia;
import co.businessteam.minoticia.core.service.ComentarioService;
import co.businessteam.minoticia.core.service.NoticiaService;

@RequestMapping("/noticia")
@Controller
public class NoticiaController {
	
	
	@Autowired
	private NoticiaService noticiaService;
	
	@Autowired
	private CategoriaService categoriaService;
	
	@Autowired
	private ComentarioService comentarioService;
	
	@Autowired
	private UsuarioService usuarioService;
	
	@RequestMapping(value = "/lista")
	public String getListaNoticias(Model model){
		try{
			model.addAttribute("noticias", noticiaService.consultarNoticiasPorUsuario(usuarioService.obtnerReferidoPorUsername(BusinessTeamContextHolder.getUsernameUsuarioSesion()).getId()));
		}catch(Exception e){
			
		}
		return "noticias/listarNoticias";
	}
	
	@RequestMapping("/{idNoticia}")
	private String getFormtNoticeQuestion(Model model, @PathVariable Long idNoticia){
		try{
			
			model.addAttribute("noticia", noticiaService.consultarPorId(idNoticia));
			model.addAttribute("comentarios", comentarioService.obtenerComentariosPorIdNoticia(idNoticia));
		}catch(Exception e){
			
		}
		return "noticias/formQuestions";
	}
	
	@RequestMapping(value = "/comment/save")
	public String PostCreateComment(Model model, Comentario comentario){
		try{
			
		}catch(Exception e){
			
		}
		return "/noticias/formQuestions :: body-container-comments";
	}
	
	@RequestMapping(value = "/{idNoticia}/questions}", method = RequestMethod.POST)
	private String postFormtNoticeQuestion(Model model, @PathVariable Long idNoticia){
		try{
			model.addAttribute("noticia", noticiaService.consultarPorId(idNoticia));
			model.addAttribute("comentarios", comentarioService.obtenerComentariosPorIdNoticia(idNoticia));
		}catch(Exception e){
			
		}
		return "noticias/formQuestions";
	}
	
	@RequestMapping("/update/{idNoticia}")
	public String getFormUpdate(Model model, @PathVariable Long idNoticia){
		try{
			
			model.addAttribute("noticia", noticiaService.consultarPorId(idNoticia));
			model.addAttribute("categorias", categoriaService.consultarTodos());
		}catch(Exception e){
			
		}
		return "noticias/formularioNoticias";
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public String postFormUpdate(Model model, BindingResult result , @Valid @ModelAttribute Noticia noticia){
		try{
			if(!result.hasErrors()){
				noticiaService.actualizar(noticia);
			}
		}catch(Exception e){
			
		}
		return "noticias/formularioNoticias";
	}
	
	@RequestMapping(value = "/signup")
	public String getFormularioRegistro(Model model){
		try{
			model.addAttribute("categorias", categoriaService.consultarTodos());
			model.addAttribute("noticia", new Noticia());
		}catch(Exception e){
			e.printStackTrace();
		}
		return "noticias/formularioNoticias";
	}
	
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public String postFormularioRegistro(Model model, @Valid @ModelAttribute Noticia noticia, BindingResult result){
		
		try{
			if(!result.hasErrors()){
				noticia.setUsuario(usuarioService.obtenerUsuarioPorUsername(BusinessTeamContextHolder.getUsernameUsuarioSesion()));
				noticiaService.registrar(noticia);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "noticias/formularioNoticias";
	}
	
	@RequestMapping
	public String getNoticia(Model model){
		try{
			model.addAttribute("noticias", noticiaService.consultarNoticiaPorPatrocinadoresOIdCategoria(usuarioService.obtenerUsuarioPorUsername(BusinessTeamContextHolder.getUsernameUsuarioSesion()).getId(), 0l));
		}catch(Exception e){
			e.printStackTrace();
		}
		return "noticias/listarNoticias";
	}

}
