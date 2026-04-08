package edu.infosys.inventoryApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.inventoryApplication.bean.Product;
import edu.infosys.inventoryApplication.dao.ProductDao;
import edu.infosys.inventoryApplication.service.InventoryUserService;
import edu.infosys.inventoryApplication.service.ProductService;


@RestController
@RequestMapping("/invent/")
@CrossOrigin(origins = "http://localhost:3131", allowCredentials = "true")
public class ProductController {

	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private ProductService service;
	
	@Autowired
	private InventoryUserService userservice;
	
	@PostMapping("/product")
	public void saveProduct(@RequestBody Product product) {
		// TODO Auto-generated method stub
		Product finalProduct=service.setSalesPrice(product);
		productDao.saveProduct(finalProduct);

	}

	@GetMapping("/product")
	public List<Product> getAllProducts() {
		// TODO Auto-generated method stub
		List<Product> productList= productDao.getAllProducts();
		return productList;
	}


	  @GetMapping("/product/{id}")
    public Product getProductById(@PathVariable String id) {
    	Product product =productDao.getProductById(id);
    	return product;
    }
	
	@DeleteMapping("/product/{id}")
	public void deleteProductById(@PathVariable String id) {
		productDao.deleteProductById(id);

	}

	@PutMapping("/product/{qty}/{flag}")
	public void editProductStock(@RequestBody Product product, @PathVariable double qty,@PathVariable int flag)
	{
		Product updatedProduct=service.stockEdit(product, qty, flag);
		productDao.saveProduct(updatedProduct);
	}

	@PutMapping("/product")
	public void editProductPrice(@RequestBody Product product)
	{
		Product updatedProduct=service.setSalesPrice(product);
		productDao.saveProduct(updatedProduct);
	}

	  @GetMapping("/id-gen")
    public String ProductIdGenerator() {
    	return service.generateProductId();
    }
    
    @GetMapping("/vendor")
    public List<Product> getProductByVendor(){
    	String vendorId=userservice.getUserId();
    	return productDao.getProductByVendor(vendorId);
    }
    
    @GetMapping("/vendor/{id}")
    public List<Product> getProductByVendor(@PathVariable String id){
    	return productDao.getProductByVendor(id);
    }

	@GetMapping("/users/role/{role}")
	public List<String> getUsersByRole(@PathVariable String role) {
		// This calls your repository: Select username from inventoryUser where role=?1
		return userservice.getUsersByRole(role); 
	}
	
	@PutMapping("/product/fix-prices")
	public void fixExistingPrices() {
	    List<Product> products = productDao.getAllProducts();
	    for(Product p : products) {
	        service.setSalesPrice(p); // This now sets the price correctly
	        productDao.saveProduct(p);
	    }
	}
}
