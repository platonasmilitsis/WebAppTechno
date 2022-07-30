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

    @PutMapping("/users/accept")
    public List<Users> acceptUser(@RequestParam("id") Integer[] id){
        return userService.acceptUser(id);
    }

    @DeleteMapping("/users")
    public ResponseEntity<?> deleteUser(@RequestParam("id") Integer[] id){
        return userService.deleteUser(id);
    }


}