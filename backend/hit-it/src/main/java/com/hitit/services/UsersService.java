package com.hitit.services;

import com.hitit.exceptions.EmailInUseException;
import com.hitit.exceptions.UserInUseException;
import com.hitit.repository.UsersRepository;
import com.hitit.models.Users;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

    private final UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }


    public List<Users> getUsers(){
        return usersRepository.findAll();
    }

    public Optional<Users> getUser(Long id) {
        return usersRepository.findById(id);
    }

    public Users addUsers(@NotNull Users newUser) {
        if(!(newUser.getUsername()!=null
                && newUser.getUsername().length()>0))
            throw new IllegalStateException("Invalid Input");
        if(!(newUser.getPassword()!=null
                && newUser.getPassword().length()>0))
            throw new IllegalStateException("Invalid Input");
        if(!(newUser.getEmail()!=null
                && newUser.getEmail().length()>0))
            throw new IllegalStateException("Invalid Input");
        if(!(newUser.getFirst_name()!=null
                && newUser.getFirst_name().length()>0))
            throw new IllegalStateException("Invalid Input");
        if(!(newUser.getLast_name()!=null
                && newUser.getLast_name().length()>0))
            throw new IllegalStateException("Invalid Input");


        Optional<Users> userByEmail = usersRepository.findUserByEmail(newUser.getEmail());
        if (userByEmail.isPresent())
            throw new EmailInUseException(newUser.getEmail());

        Optional<Users> userByUsername = usersRepository.findByUsername(newUser.getUsername());
        if (userByUsername.isPresent())
            throw new UserInUseException(newUser.getUsername());

        return usersRepository.save(newUser);
    }
}