package co.businessteam.minoticia.backoffice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "co.businessteam.minoticia.backoffice.*,co.businessteam.core.*, co.businessteam.jdbc.*, co.businessteam.util.*")
@SpringBootApplication
public class BusinessteamBackofficeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BusinessteamBackofficeApplication.class, args);
	}
}
