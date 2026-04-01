package com.brandon.todoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.brandon.todoapp.model.Todo;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {


}
