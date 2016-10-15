package co.businessteam.minoticia.repository.impl;

import java.sql.ResultSet;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.RowMapper;

import co.businessteam.core.domain.Categoria;
import co.businessteam.core.domain.Patrocinador;
import co.businessteam.jdbc.dao.Dao;
import co.businessteam.jdbc.dao.ex.SQLException;
import co.businessteam.minoticia.domain.Noticia;
import co.businessteam.minoticia.repository.NoticiaRepository;

public class NoticiaRepositoryImpl extends Dao implements NoticiaRepository{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(NoticiaRepositoryImpl.class);

	@Deprecated
	@Override
	public List<Noticia> consultarTodos() throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Noticia consultarPorId(Long id) throws SQLException {
		try{
			return getJdbcTemplate().queryForObject(SQL(""), new Object[] {id},
					(RowMapper<Noticia>) (rs, rowNum)-> {
				return cargarNoticia(rs);
			});
		}catch(Exception e){
			LOGGER.error("Error al cargar la noticia por el id {}{}.",id,e);
			throw new SQLException("Error al cargar la noticia por el id {}{}.",e);
		}
	}

	@Override
	public Noticia registrar(Noticia domain) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Noticia actualizar(Noticia domain) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void eliminar(Noticia domain) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected String getSequenceName() {
		// TODO Auto-generated method stub
		return null;
	}
	
	private Noticia cargarNoticia(ResultSet rs){
		try {
			
			Noticia noticia = new Noticia();
			noticia.setId(rs.getLong("ID_NOTICIA"));
			noticia.setCategoria(new Categoria());
			noticia.getCategoria().setId(rs.getLong("ID_CATEGORIA"));
			noticia.getCategoria().setDescripcionCategoria("DESCRIPCION_CATEGORIA");
			noticia.setPatrocinador(new Patrocinador());
			noticia.getPatrocinador().setApodo(rs.getString("APODO"));
			noticia.setFechaRegistro(rs.getDate("FECHA_REGISTRO"));
			noticia.setTituloNoticia(rs.getString("TITULO_NOTICIA"));
			noticia.setDescripcionNoticia(rs.getString("DESCRIPCION_NOTICIA"));
			return noticia;
		} catch (java.sql.SQLException e) {
			LOGGER.error("Error al cargar los datos de la noticia {}{}.",e);
			throw new SQLException("Error al cargar los datos de la noticia {}{}.",e);
		}
	}

}
