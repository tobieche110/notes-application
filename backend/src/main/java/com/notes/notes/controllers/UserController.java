package com.notes.notes.controllers;

import com.notes.notes.models.User;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

    @RequestMapping(value = "user/{id}")
    public User getUser(@PathVariable Long id) {
        User user = new User();
        user.setName("sadas");
        user.setPassword("asdasf");
        user.setId(id);
        return user;
    }

    @RequestMapping(value = "users")
    public List<User> getUsers() {
        List<User> users = new ArrayList<>();
        User user = new User();
        user.setName("sadas");
        user.setPassword("asdasf");
        user.setId(232L);

        users.add(user);
        return users;
    }

    @RequestMapping(value = "prueba232")
    public User update() {
        User user = new User();
        user.setName("sadas");
        return user;
    }

    @RequestMapping(value = "prueba23323")
    public User delete() {
        User user = new User();
        user.setName("sadas");
        return user;
    }

    @RequestMapping(value = "prueba2332")
    public User search() {
        User user = new User();
        user.setName("sadas");
        return user;
    }

}
