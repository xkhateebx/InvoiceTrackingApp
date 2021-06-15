package com.invoicetrackingsystem.services;

import com.invoicetrackingsystem.model.User;
import com.invoicetrackingsystem.model.UserRole;

import java.util.Set;

public interface UserService {


    //creating_user
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;


    //get user by username
    public User getUser(String username);

    //delete user by id
    public void deleteUser(Long userId);


    
}
