package edu.infosys.inventoryApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.inventoryApplication.bean.*;

public interface inventoryUserRepository extends JpaRepository<inventoryUser, String> {

    @Query ("SELECT username FROM inventoryUser WHERE role =?1")
    public List<String> getUsersByRole(String role);
	
}	
