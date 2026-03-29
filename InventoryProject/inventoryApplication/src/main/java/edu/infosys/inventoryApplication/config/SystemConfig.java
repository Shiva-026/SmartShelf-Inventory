package edu.infosys.inventoryApplication.config;

import org.springframework.security.config.Customizer;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableMethodSecurity
public class SystemConfig {
	
	@Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
	  return configuration.getAuthenticationManager();
    }
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http
	      .cors(Customizer.withDefaults())
	      .csrf(csrf -> csrf.disable())
	      .authorizeHttpRequests(auth -> auth
	            .requestMatchers("/invent/login/**").permitAll()
	            .requestMatchers("/invent/logout").permitAll()
	            .requestMatchers("/invent/**").permitAll()
	            .anyRequest().authenticated()
	      )
	      .logout(logout -> logout
	            .logoutUrl("/invent/logout")
	            .invalidateHttpSession(true)
	            .deleteCookies("JSESSIONID")
	            .logoutSuccessHandler((request, response, authentication) -> {
	                response.setStatus(200);
	                response.getWriter().write("Logout success");
	            })
	      );
	    return http.build();
	}

	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // 1. Explicitly allow your React Frontend
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3131"));
        
        // 2. Allow all common HTTP Methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // 3. Allow all headers (Content-Type, Authorization, etc.)
        configuration.setAllowedHeaders(Arrays.asList("*"));
        
        // 4. CRITICAL: Allow credentials (cookies/sessions)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
