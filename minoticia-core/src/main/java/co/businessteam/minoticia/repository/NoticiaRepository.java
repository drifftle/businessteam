package co.businessteam.minoticia.repository;

import java.util.List;

import co.businessteam.core.domain.Patrocinador;
import co.businessteam.core.repository.data.CrudRepository;
import co.businessteam.jdbc.dao.ex.SQLException;
import co.businessteam.minoticia.domain.Noticia;

public interface NoticiaRepository extends CrudRepository<Noticia>{
	
	List<Noticia> consultarNoticiaPorPatrocinadoresOIdCategoria(List<Patrocinador> patrocinadores, Long idCategoria) throws SQLException;

}
