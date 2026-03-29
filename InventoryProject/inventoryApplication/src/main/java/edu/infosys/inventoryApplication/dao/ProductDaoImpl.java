package edu.infosys.inventoryApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.inventoryApplication.bean.Product;
import edu.infosys.inventoryApplication.service.ProductService;

@Service
@Repository
public class ProductDaoImpl implements ProductDao {

	@Autowired
	private ProductRepository repository;

	
	@Override
	public void saveProduct(Product product) {
		// TODO Auto-generated method stub
		repository.save(product);

	}

	@Override
	public List<Product> getAllProducts() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public Product getProductById(String id) {
		// TODO Auto-generated method stub
		return repository.findById(id).get();
	}

	@Override
	public void deleteProductById(String id) {
		// TODO Auto-generated method stub
		repository.deleteById(id);

	}

	@Override
	public String getMaxProductId() {
		return repository.getMaxProductId();

	}
	
	@Override
	public Double getReorderLevelByProductId(String id)
	{
		return repository.getReorderLevelByProductId(id);
	}
	
	@Override
	public List<Product> getProductByVendor(String vendorId)
	{
		return repository.getProductByVendor(vendorId);
	}


}
