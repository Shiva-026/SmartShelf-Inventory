package edu.infosys.inventoryApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.inventoryApplication.bean.SKU;
@Service
@Repository
public class SKUDaoImpl implements SKUDao {
	@Autowired
	private SKURepository repository;

	@Override
	public void saveSKU(SKU sku) {
		// TODO Auto-generated method stub
		repository.save(sku);

	}

	@Override
	public List<SKU> getAllSKUs() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public SKU getSKUById(String id) {
		// TODO Auto-generated method stub
		return repository.findById(id).get();
	}

	@Override
	public void deleteSKUById(String id) {
		// TODO Auto-generated method stub
		repository.deleteById(id);

	}
	
	/*@Override
	public List<String> getAllSkuIds(){
		return repository.getAllSkuIds();
	}*/
	
	@Override
	public List<String> getAllCategories(){
		return repository.getAllCategories();
	}
	
	@Override
	public List<String> getSkuIdByCategory(String category){
		return repository.getSkuIdByCategory(category);
	}

}
