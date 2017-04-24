package co.businessteam.minoticia.core.repository;

import java.util.List;

import co.businessteam.core.repository.data.CrudRepository;
import co.businessteam.jdbc.dao.ex.SQLException;
import co.businessteam.minoticia.core.domain.Comentario;

public interface ComentarioRepository extends CrudRepository<Comentario> {
	
	List<Comentario> obtenerComentarioPorNoticia(Long idNoticia) throws SQLException; 

}
