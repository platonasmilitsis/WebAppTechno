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
        http.cors();
        http.sessionManagement().sessionCreationPolicy(STATELESS);
        http.authorizeRequests().antMatchers("/refresh","/login").permitAll();
        http.authorizeRequests().antMatchers(GET).permitAll();
        http.authorizeRequests().antMatchers(POST).hasAnyAuthority("ADMIN","ACCEPTED");
        http.authorizeRequests().antMatchers(POST,"/users").permitAll();
        http.authorizeRequests().antMatchers(PUT).hasAnyAuthority("ADMIN");
//        http.authorizeRequests().antMatchers(PUT,"")


        //        http.authorizeRequests().anyRequest().permitAll();
        http.addFilter(new CustomAuthenticationFilter(authenticationManager(http.getSharedObject(AuthenticationConfiguration.class))));
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(@NotNull AuthenticationConfiguration auth) throws Exception{
        return auth.getAuthenticationManager();
    }
}
