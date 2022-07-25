package com.hitit.controllers;

import com.hitit.models.Users;
import com.hitit.services.UsersService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/users")
public class UsersController {

    private final UsersService userService;

    public UsersController(UsersService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<Users> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    public Optional<Users> getUser(@PathVariable Long id){
        return userService.getUser(id);
    }

    @PostMapping
    Users newUser(@RequestBody Users newUser){
        return userService.addUsers(newUser);
    }


}