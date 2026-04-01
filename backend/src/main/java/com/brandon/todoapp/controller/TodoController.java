package com.brandon.todoapp.controller;

import com.brandon.todoapp.model.Todo;
import com.brandon.todoapp.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService){
        this.todoService = todoService;
    }

    @GetMapping
    public ResponseEntity<List<Todo>> getAlltodos(){
        List<Todo> todos = todoService.getAllTodos();

        return ResponseEntity.ok(todos);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id){
        Optional<Todo> result = todoService.getTodoById(id);

        if(result.isPresent()){
            return ResponseEntity.ok(result.get());
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@Valid @RequestBody Todo todo){
        Todo savedTodo = todoService.createTodo(todo);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTodo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @Valid @RequestBody Todo todoDetails){
        Todo updatedTodo = todoService.updateTodo(id, todoDetails);

        if(updatedTodo != null){
            return ResponseEntity.ok(updatedTodo);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id){
        boolean deletedTodo = todoService.deleteTodo(id);

        if(deletedTodo){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

}
