package co.businessteam.minoticia.core.service;

import java.util.List;

import co.businessteam.core.service.ex.ServiceException;
import co.businessteam.minoticia.core.domain.Noticia;

public interface NoticiaService {
	
	Noticia registrar(Noticia domain) throws ServiceException;
	
	Noticia actualizar(Noticia domain) throws ServiceException;
	
	Noticia consultarPorId(Long id) throws ServiceException;
	
	List<Noticia> consultarNoticiaPorPatrocinadoresOIdCategoria(Long idPatrocinador, Long idCategoria) throws ServiceException; 
	
	List<Noticia> consultarNoticiasPorUsuario(Long idUsuario) throws ServiceException; 
	

}
