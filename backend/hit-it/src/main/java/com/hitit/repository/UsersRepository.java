package com.hitit.repository;

import com.hitit.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    @Query("select u from Users u where u.email = ?1")
    Optional<Users> findUserByEmail(String email);

    @Query("select u from Users  u where u.username = ?1")
    Optional<Users> findByUsername(String username);
}
