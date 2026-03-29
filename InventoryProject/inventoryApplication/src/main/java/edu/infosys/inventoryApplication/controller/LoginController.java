package edu.infosys.inventoryApplication.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import edu.infosys.inventoryApplication.bean.inventoryUser;
import edu.infosys.inventoryApplication.config.EncoderConfig;
import edu.infosys.inventoryApplication.service.InventoryUserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/invent/")
@CrossOrigin(origins = "http://localhost:3131", allowCredentials = "true")
public class LoginController {
	
	@Autowired
	private InventoryUserService service;
	
	@Autowired
	private EncoderConfig econfig;
	
	@Autowired
    private AuthenticationManager authenticationManager;
	
	@PostMapping("/login")
	public void registerNewUser(@RequestBody inventoryUser user) {
		PasswordEncoder bCrypt=econfig.passwordEncoding();
		String encodedPassword=bCrypt.encode(user.getPassword());
		user.setPassword(encodedPassword);
		service.saveUser(user);
	}
	
	@GetMapping("/login/{userId}/{password}")
	public String validateUser(@PathVariable String userId,@PathVariable String password) {
		String role="false";
		try {
			 Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userId, password));
		 	    role=service.getRole();
		 	     SecurityContextHolder.getContext().setAuthentication(authentication);
			}catch(Exception ex) {}
		return role;
	}
	
	@GetMapping("/login")
	public inventoryUser getUserDetails() {
		return service.getUser();
	}
	@GetMapping("/role")
	public String getRole() {
		return service.getRole();
	}

	// @GetMapping("/role/{role}")
	//  public List<String> getUsersByRole(@PathVariable String role) {
	// 	 return service.getUsersByRole(role);
	//  }
	
	@GetMapping("/user")
	 public String getUserId() {
		 return service.getUserId();
	 }
	
	@PostMapping("/logout")
	 public ResponseEntity<String> logout(HttpServletRequest request,HttpServletResponse response) {
	        // Clear Spring Security Context
	        SecurityContextHolder.clearContext();
	        // Invalidate session
	        HttpSession session = request.getSession(false);
	        if (session != null) {
	            session.invalidate();
	        }
	        // Delete cookie
	        Cookie cookie = new Cookie("JSESSIONID", null);
	        cookie.setPath("/");
	        cookie.setMaxAge(0);
	        response.addCookie(cookie);
	        return ResponseEntity.ok("Logout successful");
	    }
	@GetMapping("/vendor-list")
	public List<String> getVendorList() {
	    // Calling the repository query: "Select username from inventoryUser where role='Vendor'"
	    return service.getUsersByRole("Vendor"); 
	}
	

}
