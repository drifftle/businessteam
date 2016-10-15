package co.businessteam.minoticia.domain;

import java.io.Serializable;

import co.businessteam.core.domain.Entidad;
import co.businessteam.core.domain.Referido;

public class Comentario extends Entidad  implements Serializable{

	private static final long serialVersionUID = 4386809045146287787L;
	
	private Noticia noticia;
	
	private Referido referido;
	
	private String descripcionComentario;
	
	public Comentario(){
		
	}

	public Noticia getNoticia() {
		return noticia;
	}

	public void setNoticia(Noticia noticia) {
		this.noticia = noticia;
	}

	public Referido getReferido() {
		return referido;
	}

	public void setReferido(Referido referido) {
		this.referido = referido;
	}

	public String getDescripcionComentario() {
		return descripcionComentario;
	}

	public void setDescripcionComentario(String descripcionComentario) {
		this.descripcionComentario = descripcionComentario;
	}
}
