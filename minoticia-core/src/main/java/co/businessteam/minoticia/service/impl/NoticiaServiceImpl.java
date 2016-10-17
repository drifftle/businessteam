package co.businessteam.minoticia.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.businessteam.core.domain.Patrocinador;
import co.businessteam.core.service.ex.ServiceException;
import co.businessteam.minoticia.domain.Noticia;
import co.businessteam.minoticia.repository.NoticiaRepository;
import co.businessteam.minoticia.service.NoticiaService;

@Service
public class NoticiaServiceImpl implements NoticiaService{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(NoticiaServiceImpl.class);
	
	@Autowired
	NoticiaRepository noticiaRepository;

	@Override
	public Noticia registrar(Noticia domain) throws ServiceException {
		try{
			return noticiaRepository.registrar(domain);
		}catch(Exception e){
			LOGGER.error("Error en el servicio de noticias registrar {}{}",domain.getId(),e);
			throw new ServiceException("Error en el servicio de noticias registrar {}",e);
		}
	}

	@Override
	public Noticia actualizar(Noticia domain) throws ServiceException {
		try{
			return noticiaRepository.actualizar(domain);
		}catch(Exception e){
			LOGGER.error("Error en el servicio de noticias actualizar {}{}",domain.getId(),e);
			throw new ServiceException("Error en el servicio de noticias actualizar {}",e);
		}
	}

	@Override
	public Noticia consultarPorId(Long id) throws ServiceException {
		try{
			return noticiaRepository.consultarPorId(id);
		}catch(Exception e){
			LOGGER.error("Error en el servicio de noticias consultar por id {}{}",id,e);
			throw new ServiceException("Error en el servicio de noticias consultar por id {}",e);
		}
	}

	@Override
	public List<Noticia> consultarNoticiaPorPatrocinadoresOIdCategoria(List<Patrocinador> patrocinadores, Long idCategoria) throws ServiceException {
		try{
			return noticiaRepository.consultarNoticiaPorPatrocinadoresOIdCategoria(patrocinadores, idCategoria);
		}catch(Exception e){
			LOGGER.error("Error en el servicio de noticias consultar noticia por patrocinadores o categoria {}{}",e);
			throw new ServiceException("Error en el servicio de noticias consultar noticia por patrocinadores o categoria {}",e);
		}
	}

}
