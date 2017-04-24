package co.businessteam.minoticia.backoffice;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;

@Configuration
public class MinoticiaWebSocketSecurityConfig extends AbstractSecurityWebSocketMessageBrokerConfigurer {
	
	
	@Override
    protected void configureInbound(MessageSecurityMetadataSourceRegistry messages) {
	
		messages.simpDestMatchers("/app/**").hasRole("PATROCINADOR")
		.simpSubscribeDestMatchers("/notificacion/**").hasRole("PATROCINADOR")
		.anyMessage().denyAll();
	}

	
	@Override
	protected boolean sameOriginDisabled(){
		return true;
	}
}
