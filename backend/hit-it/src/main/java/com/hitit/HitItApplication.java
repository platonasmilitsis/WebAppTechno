package com.hitit;

import com.hitit.Repositories.UsersRepository;
import com.hitit.models.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.hitit.Repositories")
public class HitItApplication {

	private final UsersRepository usersRepository;

	public HitItApplication(UsersRepository usersRepository) {
		this.usersRepository = usersRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(HitItApplication.class, args);
	}




	@Bean
	CommandLineRunner commandLineRunner() {
		return args -> {
			Users maria = new Users("maria2", "0000", "Maria", "Maraki", "210000", "sts@gmail.com", "" +
					"adressio 21", "1234", Boolean.FALSE, Boolean.TRUE);
			this.usersRepository.save(maria);
		};
	}
}
