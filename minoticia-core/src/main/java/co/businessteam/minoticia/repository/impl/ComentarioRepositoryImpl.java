package co.businessteam.minoticia.repository.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;

import co.businessteam.core.domain.Referido;
import co.businessteam.jdbc.dao.Dao;
import co.businessteam.jdbc.dao.ex.SQLException;
import co.businessteam.minoticia.domain.Comentario;
import co.businessteam.minoticia.repository.ComentarioRepository;

public class ComentarioRepositoryImpl extends Dao implements ComentarioRepository{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ComentarioRepositoryImpl.class);
	
	@Value("${dao.sequence.comentario}")
	private String nameSequence;

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
		Long id = null;

		try {
			id = getDomainKeyValue().longValue();
			SqlParameterSource parametros = new MapSqlParameterSource().addValue("ID_COMENTARIO", id)
					.addValue("ID_NOTICIA", domain.getNoticia().getId())
					.addValue("ID_REFERIDO", domain.getReferido().getId())
					.addValue("DESCRIPCION_COMENTARIO", domain.getDescripcionComentario());
			getNamedParameterJdbcTemplate().update(SQL(""), parametros);

			domain.setId(id);
			return domain;
		} catch (Exception e) {
			LOGGER.error("Error al intentar registrar el comentario con el id {}{}", id, e);
			throw new SQLException("Error al intentar registrar la comentario-{}{}", e);
		}
	}

	@Deprecated
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
		try {
			return getJdbcTemplate().query(SQL("minoticia/select/SELECT_COMENTARIOS_POR_IDNOTICIA.sql"), new Object[] { idNoticia }, (RowMapper<Comentario>) (rs, rowNum) -> {
				Comentario comentario = new Comentario();
				comentario.setId(rs.getLong("ID_COMENTARIO"));
				comentario.setDescripcionComentario(rs.getString("DESCRIPCION_COMENTARIO"));
				comentario.setFechaRegistro(rs.getDate("FECHA_REGISTRO"));
				comentario.setReferido(new Referido());
				comentario.getReferido().setApodo(rs.getString("APODO_REFERIDO"));
				return comentario;
			});
		} catch (Exception e) {
			LOGGER.error("Error al obtener los comentarios por id noticia {}{}.", idNoticia, e);
			throw new SQLException("Error al obtener los comentarios por id noticia {}.", e);
		}
	}

	@Override
	protected String getSequenceName() {
		return nameSequence;
	}

}
