package com.hitit.security;


import com.hitit.filter.CustomAuthFilter;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;





@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig
{

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(STATELESS);
//        http.authorizeRequests().antMatchers(GET,"/categories").permitAll();
//        http.authorizeRequests().antMatchers(GET,"/categories/**").hasAnyAuthority("ADMIN");
        http.authorizeRequests().anyRequest().permitAll();
        http.addFilter(new CustomAuthFilter(authenticationManager(http.getSharedObject(AuthenticationConfiguration.class))));
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(@NotNull AuthenticationConfiguration auth) throws Exception{
        return auth.getAuthenticationManager();
    }
}
