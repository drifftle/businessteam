package co.businessteam.minoticia.core.repository.impl;

import java.sql.ResultSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import co.businessteam.core.domain.Usuario;
import co.businessteam.core.domain.enums.TipoEstadoSolicitud;
import co.businessteam.core.domain.enums.TipoEstadoSolicitudPorCategoria;
import co.businessteam.jdbc.dao.Dao;
import co.businessteam.jdbc.dao.ex.SQLException;
import co.businessteam.minoticia.core.domain.Noticia;
import co.businessteam.minoticia.core.repository.NoticiaRepository;
import co.businessteam.util.Constantes;
import co.businessteam.util.Util;

@Repository
public class NoticiaRepositoryImpl extends Dao implements NoticiaRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(NoticiaRepositoryImpl.class);

	@Value("${dao.sequence.noticia}")
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
			return getJdbcTemplate().queryForObject(SQL("minoticia/noticia/select/SELECT_NOTICIA_POR_ID.sql"), new Object[] { id }, (RowMapper<Noticia>) (rs, rowNum) -> {
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
					.addValue("ID_PATROCINADOR", domain.getUsuario().getId())
					.addValue("ID_CATEGORIA", domain.getCategoria().getId())
					.addValue("TITULO_NOTICIA", domain.getTituloNoticia())
					.addValue("DESCRIPCION_NOTICIA", domain.getDescripcionNoticia());
			getNamedParameterJdbcTemplate().update(SQL("minoticia/noticia/insert/INSERT_NOTICIA.sql"), parametros);

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
	public List<Noticia> consultarNoticiaPorPatrocinadoresOIdCategoria(Long idPatrocinador, Long idCategoria) throws SQLException {
		try{
			
			Map<String, Object> parametros = new HashMap<String,  Object>();

			
			parametros.put(":ID_PATROCINADOR", !Util.isZero(idPatrocinador) ?  " WHERE PAT.ID_PATROCINADOR = "+idPatrocinador+" " : Constantes.EMPTY);
			
			parametros.put(":ID_CATEGORIA", !Util.isZero(idCategoria) ?  "AND CAT.ID ="+idCategoria : Constantes.EMPTY);
			
			return getJdbcTemplate().query(SQL("minoticia/noticia/select/SELECT_NOTICIA_X_PAT_O_CATEGORIA.sql",parametros), (RowMapper<Noticia>) (rs, rowNum) ->{
				return cargarNoticia(rs);
			});
		}catch(Exception e){
			LOGGER.error("Error al intentar consultar la lista de noticia por patrocinadores o id categoria- {}{}", idCategoria, e);
			throw new SQLException("Error al intentar consultar la lista de noticia por patrocinadores o id categoria- {}{}", e);
		}
	}
	
	@Override
	public List<Noticia> consultarNoticiasPorUsuario(Long idUsuario) throws SQLException {
		try{
		Map<String,Object> parameters= new HashMap<>();
		
		parameters.put(":ID_REFERIDO", idUsuario);
		parameters.put(":ESTADO_SOLICITUD", "'"+TipoEstadoSolicitud.REVISADO.toString()+"'");
		parameters.put(":ESTADO_SOL_CATEGORIA", "'"+TipoEstadoSolicitudPorCategoria.ACEPTADO.toString()+"'");
		
		return getJdbcTemplate().query(SQL("minoticia/noticia/select/SELECT_NOTICIA_POR_USUARIO.sql",parameters), (RowMapper<Noticia>) (rs, rowNum) ->{
			return cargarNoticia(rs);
		});
		
		}catch(Exception e){
			LOGGER.error("Error al obtener la lista de noticias por usuario {}{}", idUsuario, e);
			throw new SQLException("Error al obtener la lista de noticias por usuario {}{}", e);
		}
	}
	
	private Noticia cargarNoticia(ResultSet rs) {
		try {

			Noticia noticia = new Noticia();
			noticia.setId(rs.getLong("ID_NOTICIA"));
			noticia.setTituloNoticia(rs.getString("TITULO_NOTICIA"));
			noticia.setDescripcionNoticia(rs.getString("DESCRIPCION_NOTICIA"));
			noticia.setFechaRegistro(rs.getDate("FECHA_REGISTRO"));
			noticia.setUsuario(new Usuario());
			noticia.getUsuario().setApodo(rs.getString("USERNAME_PATROCINADOR"));
			/*noticia.getPatrocinador().setAvatar(new Avatar(0l, rs.getString("URL_AVATAR")));
			noticia.setCategoria(new Categoria());
			noticia.getCategoria().setId(rs.getLong("ID_CATEGORIA"));
			noticia.getCategoria().setDescripcionCategoria("DESCRIPCION_CATEGORIA");*/
			return noticia;
		} catch (java.sql.SQLException e) {
			LOGGER.error("Error al cargar los datos de la noticia {}{}.", e);
			throw new SQLException("Error al cargar los datos de la noticia {}{}.", e);
		}
	}

}
