package co.businessteam.minoticia.backoffice;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAutoConfiguration
@ComponentScan(basePackages = "co.businessteam.minoticia.core.*,co.businessteam.minoticia.backoffice.*,co.businessteam.core.*, co.businessteam.jdbc.*, co.businessteam.util.*")
public class BusinessTeamMvcConfig {
    


}
