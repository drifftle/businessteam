package co.businessteam.minoticia.core.service;

import java.util.List;

import co.businessteam.core.service.ex.ServiceException;
import co.businessteam.minoticia.core.domain.Comentario;

public interface ComentarioService {
	
	public List<Comentario> obtenerComentariosPorIdNoticia(Long idNoticia) throws ServiceException;

}
