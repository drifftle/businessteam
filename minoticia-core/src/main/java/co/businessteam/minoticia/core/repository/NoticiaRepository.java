package co.businessteam.minoticia.core.repository;

import java.util.List;

import co.businessteam.core.repository.data.CrudRepository;
import co.businessteam.jdbc.dao.ex.SQLException;
import co.businessteam.minoticia.core.domain.Noticia;

public interface NoticiaRepository extends CrudRepository<Noticia>{
	
	List<Noticia> consultarNoticiaPorPatrocinadoresOIdCategoria(Long idPatrocinador, Long idCategoria) throws SQLException;
	
	List<Noticia> consultarNoticiasPorUsuario(Long idUsuario) throws SQLException;

}
