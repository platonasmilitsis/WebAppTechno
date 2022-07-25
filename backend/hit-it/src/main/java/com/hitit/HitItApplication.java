package com.hitit;

import com.hitit.repository.UsersRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class HitItApplication {

		public static void main(String[] args) {
			try {
				SpringApplication.run(HitItApplication.class, args);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

}
