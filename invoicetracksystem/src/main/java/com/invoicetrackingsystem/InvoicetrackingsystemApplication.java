package com.invoicetrackingsystem;

import com.invoicetrackingsystem.model.Role;
import com.invoicetrackingsystem.model.User;
import com.invoicetrackingsystem.model.UserRole;
import com.invoicetrackingsystem.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class InvoicetrackingsystemApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;

//	@Autowired
//	private UserRepository userRepository;
//	Random random = new Random();
//
//	public void createUsers(){
//		User user=new User();
//		Long id = new Long(random.nextInt(100));
//		user.setId(id);
//		user.setEmail("user" + id + "@gmail.com");
//		user.setPassword("user" + id);
//		user.setEnabled(true);
//		user.setRole("Admin");
//		user.setUsername("user" + id);
//		User save = userRepository.save(user);
//		System.out.println(save);
//	}



	public static void main(String[] args) {
		SpringApplication.run(InvoicetrackingsystemApplication.class, args);



	}


	@Override
	public void run(String... args) throws Exception {
		System.out.println("starting code");

//		User user = new User();
//		user.setUsername("khateeb");
//		user.setPassword("123");
//		user.setEmail("a@gmail.com");
//
//		Role role1 = new Role();
//		role1.setRoleId(44L);
//		role1.setRoleName("ADMIN");
//
//		Set<UserRole> userRoleSet=new HashSet<>();
//		UserRole userRole = new UserRole();
//		userRole.setRole(role1);
//		userRole.setUser(user);
//		userRoleSet.add(userRole);
//		User user1 = this.userService.createUser(user, userRoleSet);
//		System.out.println(user1.getUsername());

	}
}
