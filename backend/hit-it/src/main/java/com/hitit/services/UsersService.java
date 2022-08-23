package com.hitit.services;

import com.hitit.exceptions.EmailAndUserInUseException;
import com.hitit.exceptions.EmailInUseException;
import com.hitit.exceptions.UserInUseException;
import com.hitit.exceptions.UserNotFoundException;
import com.hitit.repository.UsersRepository;
import com.hitit.models.Users;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
@Slf4j
public class UsersService implements UserDetailsService {

    private final UsersRepository usersRepository;


    private final PasswordEncoder passwordEncoder;



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Mpika edw oxi?");

        Optional<Users> users = usersRepository.findByUsername(username);
        if(users.isEmpty())
           throw new UsernameNotFoundException("User not found in database");


        Collection<SimpleGrantedAuthority> authorities = this.getAuthorities(users.get());
        User user = new User(users.get().getUsername(),users.get().getPassword(),authorities);
        log.info(user.toString());

        return user;
    }

    public Collection<SimpleGrantedAuthority> getAuthorities(Users user){

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        if(user.getAdmin())
            authorities.add(new SimpleGrantedAuthority("ADMIN"));
        if(user.getAccepted())
            authorities.add(new SimpleGrantedAuthority("ACCEPTED"));
        if(!user.getAccepted())
            authorities.add(new SimpleGrantedAuthority("USER"));
        return authorities;
    }

    public UsersService(UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Users getUser(String username) {
        Optional<Users> user = usersRepository.findByUsername(username);
        if(user.isPresent())
            return user.get();
        else
            throw new RuntimeException("Something went wrong!!!");
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
        Optional<Users> userByUsername = usersRepository.findByUsername(newUser.getUsername());

        if (userByEmail.isPresent() && userByUsername.isPresent())
            throw new EmailAndUserInUseException(newUser.getEmail(), newUser.getUsername());


        if (userByEmail.isPresent())
            throw new EmailInUseException(newUser.getEmail());

        if (userByUsername.isPresent())
            throw new UserInUseException(newUser.getUsername());

        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
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

        return ResponseEntity.ok("OK");
    }

}