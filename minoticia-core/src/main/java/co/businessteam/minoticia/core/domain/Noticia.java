package co.businessteam.minoticia.core.domain;

import java.io.Serializable;

import co.businessteam.core.domain.Categoria;
import co.businessteam.core.domain.Entidad;
import co.businessteam.core.domain.Usuario;

public class Noticia extends Entidad implements Serializable{

	private static final long serialVersionUID = -3455882620726245526L;
	
	private Usuario usuario;
	
	private Categoria categoria;
	
	private String tituloNoticia;
	
	private String descripcionNoticia;
	
	public Noticia(){
		
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	public String getTituloNoticia() {
		return tituloNoticia;
	}

	public void setTituloNoticia(String tituloNoticia) {
		this.tituloNoticia = tituloNoticia;
	}

	public String getDescripcionNoticia() {
		return descripcionNoticia;
	}

	public void setDescripcionNoticia(String descripcionNoticia) {
		this.descripcionNoticia = descripcionNoticia;
	}
	
}
