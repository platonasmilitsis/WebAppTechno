package com.hitit.controllers;

import com.hitit.models.Users;
import com.hitit.services.UsersService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
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


    @PostMapping("/users")
    public Users newUser(@RequestBody Users newUser){
        return userService.addUsers(newUser);
    }

    @PutMapping("/users/{id}")
    public Users updateUsers(@RequestBody Users newUser,@PathVariable Long id){
        return userService.updateUsers(newUser,id);
    }

    @PutMapping("/users/accept/{id}")
    public Users acceptUser(@PathVariable Long id){
        return userService.acceptUser(id);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        return userService.deleteUser(id);
    }


}