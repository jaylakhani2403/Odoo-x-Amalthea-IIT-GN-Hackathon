package com.example.authService.config;

import com.example.authService.entity.userdetailservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
public class security {

    @Autowired
    private userdetailservice userdetailservices;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable()) // disable CSRF for APIs
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // enable CORS
                .formLogin(form -> form.disable()) // disable form login
                .httpBasic(basic -> basic.disable()) // disable HTTP basic
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll() // public auth endpoints
                        .anyRequest().authenticated() // all other endpoints need auth
                );

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userdetailservices);
        return provider;
    }

    // CORS configuration bean
    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(List.of(
                "http://10.232.220.235:8087" // your frontend URL
                // you can still add localhost if needed: "http://localhost:5173"
        ));
        config.setAllowedOrigins(List.of("http://localhost:5173")); // frontend URL
        config.setAllowCredentials(true);
        config.setAllowedOrigins(List.of("*")); // ❌ wildcard not allowed with credentials
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // allow all methods
        config.setExposedHeaders(List.of("Authorization")); // expose JWT header

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public CorsFilter corsFilter() {
        return new CorsFilter(corsConfigurationSource());
    }
}