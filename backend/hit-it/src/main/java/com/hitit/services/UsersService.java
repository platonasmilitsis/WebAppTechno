package com.hitit.services;

import com.hitit.exceptions.EmailInUseException;
import com.hitit.exceptions.UserInUseException;
import com.hitit.exceptions.UserNotFoundException;
import com.hitit.repository.UsersRepository;
import com.hitit.models.Users;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UsersService {

    private final UsersRepository usersRepository;
    private final ReviewsService reviewsService;

    public UsersService(UsersRepository usersRepository, ReviewsService reviewsService) {
        this.usersRepository = usersRepository;
        this.reviewsService = reviewsService;
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

    public Users updateUsers(Users newUser, Long id) {
        return usersRepository.findById(id)
                .map(user -> {
                    this.checkSetUsername(user, newUser.getUsername());
                    this.checkSetPassword(user, newUser.getPassword());
                    this.checkSetFirstName(user, newUser.getFirst_name());
                    this.checkSetLastName(user, newUser.getLast_name());
                    this.checkSetTelephone(user, newUser.getTelephone());
                    this.checkSetEmail(user, newUser.getEmail());
                    this.checkSetAddress(user, newUser.getAddress());
                    this.checkSetTin(user, newUser.getTIN());
                    return usersRepository.save(user);
                }).orElseGet(() -> {
                    newUser.setId(id);
                    return usersRepository.save(newUser);
                });
    }

    private void checkSetTin(Users user, String tin) {
        if(tin!=null) user.setTIN(tin);
    }

    private void checkSetAddress(Users user, String address) {
        if(address!=null) user.setAddress(address);
    }

    private void checkSetEmail(Users user, String email) {
        if(email!=null){
            Optional<Users> opt_user = usersRepository.findUserByEmail(email);
            if(opt_user.isPresent()) throw new EmailInUseException(email);
            user.setEmail(email);
        }
    }

    private void checkSetTelephone(Users user, String telephone) {
        if(telephone!=null) user.setTelephone(telephone);
    }

    private void checkSetLastName(Users user, String last_name) {
        if(last_name!=null) user.setLast_name(last_name);
    }

    private void checkSetFirstName(Users user, String first_name) {
        if(first_name!=null) user.setFirst_name(first_name);
    }

    private void checkSetPassword(Users user, String password) {
        if(password!=null) user.setPassword(password);
    }

    private void checkSetUsername(Users user, String username) {
        if(username!=null){
            Optional<Users> opt_user = usersRepository.findByUsername(username);
            if(opt_user.isPresent()) throw new UserInUseException(username);
            user.setUsername(username);
        }
    }

    public List<Users> acceptUser(Integer @NotNull [] id) {
        List<Users> list = new ArrayList<>();
        for (Integer i : id) {
            Optional<Users> user = usersRepository.findById(i.longValue());
            user.ifPresent(Users::setAccepted);
            if (user.isEmpty()) throw new UserNotFoundException();
            list.add(usersRepository.save(user.get()));
        }
        return list;
    }

    public ResponseEntity<?> deleteUser(Integer @NotNull [] id) {
        for(Integer i: id)
            usersRepository.deleteById(i.longValue());

        reviewsService.updateRatings();
        return ResponseEntity.ok("OK");
    }
}