package com.hitit.security;


import com.hitit.filter.CustomAuthenticationFilter;
import com.hitit.filter.CustomAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;





@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig
{



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.cors().configurationSource(request-> {
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowedOrigins(List.of("*"));
            configuration.setAllowedMethods(List.of("GET","POST","PUT","DELETE"));
            configuration.setAllowedHeaders(List.of("*"));
            return configuration;
        });
        http.sessionManagement().sessionCreationPolicy(STATELESS);
        http.authorizeRequests().antMatchers("/refresh","/login").permitAll();
        http.authorizeRequests().antMatchers("/items/recommendation/*","/items/recommendation").permitAll();
        http.authorizeRequests().antMatchers("/download/*").hasAnyAuthority("ADMIN");
        http.authorizeRequests().antMatchers(GET).permitAll();
        http.authorizeRequests().antMatchers(POST,"/users").permitAll();
        http.authorizeRequests().antMatchers(PUT,"/users/accept").hasAnyAuthority("ADMIN");
        http.authorizeRequests().antMatchers(PUT).hasAnyAuthority("ADMIN","ACCEPTED");
        http.authorizeRequests().antMatchers(POST).hasAnyAuthority("ADMIN","ACCEPTED");
        http.authorizeRequests().antMatchers(DELETE).hasAnyAuthority("ADMIN","ACCEPTED");
        http.addFilter(new CustomAuthenticationFilter(authenticationManager(http.getSharedObject(AuthenticationConfiguration.class))));
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(@NotNull AuthenticationConfiguration auth) throws Exception{
        return auth.getAuthenticationManager();
    }
}
