package com.notes.notes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class NotesApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotesApplication.class, args);
	}


	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**")  // Adjust the mapping pattern as needed
						.allowedOrigins("*")  // You can specify the allowed origins here
						.allowedMethods("GET", "POST", "PUT", "DELETE")
						.allowedHeaders("Origin", "Content-Type", "Accept")
						.maxAge(3600);
			}
		};
	}
}
