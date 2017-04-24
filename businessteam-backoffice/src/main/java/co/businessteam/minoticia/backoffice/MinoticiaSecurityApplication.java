package co.businessteam.minoticia.backoffice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import co.businessteam.core.security.provider.SecurityAuthenticationProvider;

@Configuration
@EnableWebSecurity
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class MinoticiaSecurityApplication extends WebSecurityConfigurerAdapter{
	
	@Autowired
	private SecurityAuthenticationProvider authenticationProvider;

	@Autowired
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(this.authenticationProvider);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().headers().frameOptions().sameOrigin().and()
		        .authorizeRequests()
				.antMatchers("/css/**", "/js/**", "/images/**", "/fonts/**", "/login", "/rest/core/regiones/**","/rest/core/redes/**","/rest/core/terceros/**","/error/**").permitAll()
				.antMatchers("/solicitud/**", "/patrocinador/**","/noticia/**","/notificacion/**").hasAnyAuthority("ADMINISTRADOR","PATROCINADOR").anyRequest().authenticated()
				.and().formLogin().loginPage("/login").loginProcessingUrl("/j_spring_security_check")
				.failureUrl("/login?error=t").usernameParameter("j_username").passwordParameter("j_password")
				.permitAll().and().logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
				.logoutSuccessUrl("/login").permitAll();
	}

}
