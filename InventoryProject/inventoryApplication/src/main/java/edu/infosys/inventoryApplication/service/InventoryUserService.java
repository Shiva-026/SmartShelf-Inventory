package edu.infosys.inventoryApplication.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.infosys.inventoryApplication.bean.inventoryUser;
import edu.infosys.inventoryApplication.dao.inventoryUserRepository;

@Service
public class InventoryUserService implements UserDetailsService{
	
	@Autowired
	private inventoryUserRepository repository;
	
	private String role;
	private inventoryUser user;
	private String email;
	private String userId;
	
	public String getRole() {
		return role;
	}
	public inventoryUser getUser() {
		return user;
	}
	public String getEmail() {
		return email;
	}
	public String getUserId() {
		return userId;
	}

	public List<String> getUsersByRole(String role) {
		return repository.getUsersByRole(role);
	}
	// To save a new user in database
	public void saveUser(inventoryUser user) {
			repository.save(user);
	}
	
	// Validate an existing user
	    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	this.user=repository.findById(username).get();
	this.userId=user.getUsername();
	this.role=user.getRole();
	return this.user;
}
	

}
