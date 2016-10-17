package co.businessteam.minoticia.service;

import java.util.List;

import co.businessteam.core.domain.Patrocinador;
import co.businessteam.core.service.ex.ServiceException;
import co.businessteam.minoticia.domain.Noticia;

public interface NoticiaService {
	
	
	Noticia registrar(Noticia domain) throws ServiceException;
	
	Noticia actualizar(Noticia domain) throws ServiceException;
	
	Noticia consultarPorId(Long id) throws ServiceException;
	
	List<Noticia> consultarNoticiaPorPatrocinadoresOIdCategoria(List<Patrocinador> patrocinadores, Long idCategoria) throws ServiceException; 
	

}
