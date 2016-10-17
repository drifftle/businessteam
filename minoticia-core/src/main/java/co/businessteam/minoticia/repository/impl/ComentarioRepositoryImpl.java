package co.businessteam.minoticia.repository.impl;

import java.util.List;

import co.businessteam.jdbc.dao.Dao;
import co.businessteam.jdbc.dao.ex.SQLException;
import co.businessteam.minoticia.domain.Comentario;
import co.businessteam.minoticia.repository.ComentarioRepository;

public class ComentarioRepositoryImpl extends Dao implements ComentarioRepository{

	@Deprecated
	@Override
	public List<Comentario> consultarTodos() throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Comentario consultarPorId(Long id) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Comentario registrar(Comentario domain) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Comentario actualizar(Comentario domain) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void eliminar(Comentario domain) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Comentario> obtenerComentarioPorNoticia(Long idNoticia) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected String getSequenceName() {
		// TODO Auto-generated method stub
		return null;
	}

}
