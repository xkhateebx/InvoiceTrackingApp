package com.invoicetrackingsystem.controller;


import com.invoicetrackingsystem.model.Role;
import com.invoicetrackingsystem.model.User;
import com.invoicetrackingsystem.model.UserRole;
import com.invoicetrackingsystem.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {


    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    //creating user
    @PostMapping("/create")
    public User createUser(@RequestBody @Valid User user) throws Exception {



        //encoding password with bcrypt

        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));


        Set<UserRole> roles = new HashSet<>();

        Role role = new Role();
        role.setRoleId(45L);
        role.setRoleName("NORMAL");

        UserRole userRole = new UserRole() ;
        userRole.setUser(user);
        userRole.setRole(role);


        roles.add(userRole);

        return this.userService.createUser(user, roles);



    }

    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username)
    {

        return this.userService.getUser(username);



    }

    //delete the user by id
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId)
    {
        this.userService.deleteUser(userId);
    }
    {

    }


}
