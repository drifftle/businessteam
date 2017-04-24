package co.businessteam.minoticia.core.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.businessteam.core.service.ex.ServiceException;
import co.businessteam.minoticia.core.domain.Comentario;
import co.businessteam.minoticia.core.repository.ComentarioRepository;
import co.businessteam.minoticia.core.service.ComentarioService;

@Service
public class ComentarioServiceImpl implements ComentarioService{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ComentarioServiceImpl.class);

	@Autowired
	private ComentarioRepository comentarioRepository; 
	
	@Override
	public List<Comentario> obtenerComentariosPorIdNoticia(Long idNoticia) throws ServiceException {
		try{
			return comentarioRepository.obtenerComentarioPorNoticia(idNoticia);
		}catch(Exception e){
			LOGGER.error("Error al cargar los comentarios por id noticia {}{}", idNoticia, e);
			throw new ServiceException("Error al cargar los comentarios por id noticia {}{}",e);
		}
	}

}
