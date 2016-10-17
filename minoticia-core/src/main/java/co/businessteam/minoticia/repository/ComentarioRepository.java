package co.businessteam.minoticia.repository;

import java.util.List;

import co.businessteam.core.repository.data.CrudRepository;
import co.businessteam.jdbc.dao.ex.SQLException;
import co.businessteam.minoticia.domain.Comentario;

public interface ComentarioRepository extends CrudRepository<Comentario> {
	
	List<Comentario> obtenerComentarioPorNoticia(Long idNoticia) throws SQLException; 

}
