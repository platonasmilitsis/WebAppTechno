package com.hitit.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonEncoding;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hitit.models.ApplicationUser;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;


@Slf4j

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;


    public CustomAuthenticationFilter(AuthenticationManager authenticationManager){
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            ApplicationUser creds;

            if (request.getParameter("username") != null  && request.getParameter("password") != null) {
                creds = new ApplicationUser();
                creds.setUsername(request.getParameter("username"));
                creds.setPassword(request.getParameter("password"));
            } else {
                creds = new ObjectMapper()
                        .readValue(request.getInputStream(), ApplicationUser.class);
            }

            log.info("Username is: {}", creds.getUsername());
            log.info("Password is: {}", creds.getPassword());

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(creds.getUsername(),creds.getPassword());

            return authenticationManager.authenticate((authenticationToken));

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException {
        User user = (User) authentication.getPrincipal();
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        String access_token = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                .withIssuer(request.getRequestURL().toString())
                .withClaim("roles",user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
        String refresh_token = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 30L * 24 * 60 * 60 * 1000))
                .withIssuer(request.getRequestURL().toString())
                .sign(algorithm);

        // Map<String, String> tokens = new HashMap<>();


        // Create the JsonGenerator to write to our OutputStream
        JsonFactory factory = new JsonFactory();
        JsonGenerator generator = factory.createGenerator(response.getOutputStream(), JsonEncoding.UTF8);

        generator.writeStartObject();
        generator.writeStringField("username", user.getUsername());
        generator.writeStringField("access_token", access_token);
        generator.writeStringField("refresh_token",refresh_token);        

        generator.writeArrayFieldStart("roles");
        
        for(GrantedAuthority gr : user.getAuthorities())
            generator.writeString(gr.toString());

        generator.flush();  // Flush buffered JSON to the output stream

        generator.writeEndArray();
        generator.writeEndObject();
        generator.close();

        


        // JSONObject tokens = new JSONObject();
        // tokens.put("username",user.getUsername());
        // tokens.put("access_token",access_token);
        // tokens.put("refresh_token",refresh_token);        

        // tokens.put("roles",user.getAuthorities());

        response.setContentType(APPLICATION_JSON_VALUE);
        // new ObjectMapper().writeValue(response.getOutputStream(),tokens.toString());
    }



}


