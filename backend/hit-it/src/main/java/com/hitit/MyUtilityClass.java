package com.hitit;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import static java.util.Arrays.stream;
import static javax.servlet.http.HttpServletResponse.SC_FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@UtilityClass
@Slf4j
public class MyUtilityClass {


    public DecodedJWT myDecodedJWT(String authorizationHeader){
        String token = authorizationHeader.substring("Bearer ".length());
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        return verifier.verify(token);

    }

    public String JWTgetUsername(String authorizationHeader){
        DecodedJWT decodedJWT = myDecodedJWT(authorizationHeader);
        return decodedJWT.getSubject();
    }

    public Collection<SimpleGrantedAuthority> JWTgetAuthorities(String authorizationHeader){
        DecodedJWT decodedJWT = myDecodedJWT(authorizationHeader);
        String[] roles = decodedJWT.getClaim("roles").asArray(String.class);

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        stream(roles).forEach(role -> authorities.add(new SimpleGrantedAuthority(role)));

        return authorities;
    }


    public void forbiddenError(Exception e, HttpServletResponse response) throws IOException {
        log.error("Error logging in: {}", e.getMessage());
        response.setHeader("error", e.getMessage());
        response.setStatus(SC_FORBIDDEN);
        Map<String, String> error = new HashMap<>();
        error.put("error_message", e.getMessage());
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(),error);

    }
}
