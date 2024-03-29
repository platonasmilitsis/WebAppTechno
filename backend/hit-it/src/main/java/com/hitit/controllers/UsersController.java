package com.hitit.controllers;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hitit.MyUtilityClass;
import com.hitit.models.Users;
import com.hitit.services.UsersService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;
import com.fasterxml.jackson.core.JsonEncoding;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@CrossOrigin
@Slf4j
public class UsersController {

    private final UsersService userService;

    public UsersController(UsersService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<Users> getUsers(){
        return userService.getUsers();
    }


    @GetMapping("/users/{id}")
    public Optional<Users> getUser(@PathVariable Long id){
        return userService.getUser(id);
    }

    @GetMapping("/users/username={username}")
    public Users getUser(@PathVariable String username){
        return userService.getUser(username);
    }


    @PostMapping("/users")
    public Users newUser(@RequestBody Users newUser){
        return userService.addUsers(newUser);
    }

    @PutMapping("/users/{id}")
    public Users updateUsers(@RequestBody Users newUser,@PathVariable Long id){
        return userService.updateUsers(newUser,id);
    }

    @PutMapping("/users/accept")
    public List<Users> acceptUser(@RequestParam("id") Integer[] id){
        return userService.acceptUser(id);
    }

    @DeleteMapping("/users")
    public ResponseEntity<?> deleteUser(@RequestParam("id") Integer[] id){
        return userService.deleteUser(id);
    }


    @GetMapping("/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
            try{

                String username = MyUtilityClass.JWTgetUsername(authorizationHeader);
                Users user = userService.getUser(username);
                Collection<SimpleGrantedAuthority> authorities = userService.getAuthorities(user);


                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                String refresh_token = authorizationHeader.substring("Bearer ".length());



                String access_token = JWT.create()
                        .withSubject(username)
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles",authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                        .sign(algorithm);




                // Create the JsonGenerator to write to our OutputStream
                JsonFactory factory = new JsonFactory();
                JsonGenerator generator = factory.createGenerator(response.getOutputStream(), JsonEncoding.UTF8);

                generator.writeStartObject();
                generator.writeStringField("username", user.getUsername());
                generator.writeStringField("access_token", access_token);
                generator.writeStringField("refresh_token",refresh_token);        

                generator.writeArrayFieldStart("roles");
                

                if(user.getAdmin())
                    generator.writeString("ADMIN");

                if(user.getAccepted())
                    generator.writeString("ACCEPTED");
                else
                    generator.writeString("USER");

                generator.flush();  // Flush buffered JSON to the output stream

                generator.writeEndArray();
                generator.writeEndObject();
                generator.close();

                

                response.setContentType(APPLICATION_JSON_VALUE);

            }catch (Exception e) {
                MyUtilityClass.forbiddenError(e, response);
            }
        }
        else{
            throw new RuntimeException("Refresh Token is missing");
        }
    }


}