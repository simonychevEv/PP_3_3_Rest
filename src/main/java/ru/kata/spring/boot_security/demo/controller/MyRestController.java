package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MyRestController {

    private final UserService userService;

    @Autowired
    public MyRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public ResponseEntity<List<User>> showAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<User> showUser(Principal principal) {
        return new ResponseEntity<>(userService.findByUsername(principal.getName()), HttpStatus.OK);
    }

    @PostMapping("/admin/new")
    public ResponseEntity<User> addNewUser(@RequestBody User user) {
        userService.addUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<User> findUserById(@PathVariable int id) {
        User user = userService.findUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/admin/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User user) {
        user.setId(id);
        userService.addUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return new ResponseEntity<>("User deleted", HttpStatus.OK);
    }
}
