package co.businessteam.minoticia.repository.impl;

import java.sql.ResultSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import co.businessteam.core.domain.Categoria;
import co.businessteam.core.domain.Patrocinador;
import co.businessteam.jdbc.dao.Dao;
import co.businessteam.jdbc.dao.ex.SQLException;
import co.businessteam.minoticia.domain.Noticia;
import co.businessteam.minoticia.repository.NoticiaRepository;
import co.businessteam.util.Constantes;
import co.businessteam.util.Util;

@Repository
public class NoticiaRepositoryImpl extends Dao implements NoticiaRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(NoticiaRepositoryImpl.class);
	
	private String ID_PATROCINADORES = "";

	private String nameSequence;

	@Deprecated
	@Override
	public List<Noticia> consultarTodos() throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Noticia consultarPorId(Long id) throws SQLException {
		try {
			return getJdbcTemplate().queryForObject(SQL(""), new Object[] { id }, (RowMapper<Noticia>) (rs, rowNum) -> {
				return cargarNoticia(rs);
			});
		} catch (Exception e) {
			LOGGER.error("Error al cargar la noticia por el id {}{}.", id, e);
			throw new SQLException("Error al cargar la noticia por el id {}{}.", e);
		}
	}

	@Override
	public Noticia registrar(Noticia domain) throws SQLException {

		Long id = null;

		try {
			id = getDomainKeyValue().longValue();
			SqlParameterSource parametros = new MapSqlParameterSource().addValue("ID_NOTICIA", id)
					.addValue("ID_CATEGORIA", domain.getCategoria().getId())
					.addValue("ID_PATROCINADOR", domain.getPatrocinador().getId())
					.addValue("TITULO_NOTICIA", domain.getTituloNoticia())
					.addValue("DESCRIPCION_NOTICIA", domain.getDescripcionNoticia());
			getNamedParameterJdbcTemplate().update(SQL(""), parametros);

			domain.setId(id);
			return domain;
		} catch (Exception e) {
			LOGGER.error("Error al intentar registrar la noticia con el id {}{}", id, e);
			throw new SQLException("Error al intentar registrar la noticia-{}{}", e);
		}
	}

	@Override
	public Noticia actualizar(Noticia domain) throws SQLException {
		try {
			SqlParameterSource parametros = new MapSqlParameterSource().addValue("ID_NOTICIA", domain.getId())
					.addValue("ID_CATEGORIA", domain.getCategoria().getId())
					.addValue("TITULO_NOTICIA", domain.getTituloNoticia())
					.addValue("DESCRIPCION_NOTICIA", domain.getDescripcionNoticia());
			getNamedParameterJdbcTemplate().update(SQL(""), parametros);
			return domain;
		} catch (Exception e) {
			LOGGER.error("Error al intentar actualizar la noticia con el id {}{}", domain.getId(), e);
			throw new SQLException("Error al intentar actualizar la noticia-{}{}", e);
		}
	}

	@Override
	public void eliminar(Noticia domain) throws SQLException {
		// TODO Auto-generated method stub

	}

	@Deprecated
	@Override
	protected String getSequenceName() {
		return nameSequence;
	}

	@Override
	public List<Noticia> consultarNoticiaPorPatrocinadoresOIdCategoria(List<Patrocinador> patrocinadores, Long idCategoria) throws SQLException {
		try{
			
			Map<String, Object> parametros = new HashMap<String,  Object>();
			
			patrocinadores.forEach((patrocinador) -> {
				ID_PATROCINADORES = ID_PATROCINADORES + ""+patrocinador.getId() +",";
			});
			
			parametros.put(":IN", !Util.isNull(ID_PATROCINADORES) ?  "WHERE PAT.ID_PATROCIADOR IN ("+ID_PATROCINADORES+")" : Constantes.EMPTY);
			
			parametros.put(":ID_CATEGORIA", !Util.isNull(idCategoria) ?  "WHERE CAT.ID ="+idCategoria : Constantes.EMPTY);
			
			return getJdbcTemplate().query(SQL("",parametros), (RowMapper<Noticia>) (rs, rowNum) ->{
				return cargarNoticia(rs);
			});
		}catch(Exception e){
			LOGGER.error("Error al intentar consultar la lista de noticia por patrocinadores o id categoria- {}{}", idCategoria, e);
			throw new SQLException("Error al intentar consultar la lista de noticia por patrocinadores o id categoria- {}{}", e);
		}
	}
	
	private Noticia cargarNoticia(ResultSet rs) {
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
			LOGGER.error("Error al cargar los datos de la noticia {}{}.", e);
			throw new SQLException("Error al cargar los datos de la noticia {}{}.", e);
		}
	}
}
