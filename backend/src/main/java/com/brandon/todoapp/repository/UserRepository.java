package com.brandon.todoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.brandon.todoapp.model.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
