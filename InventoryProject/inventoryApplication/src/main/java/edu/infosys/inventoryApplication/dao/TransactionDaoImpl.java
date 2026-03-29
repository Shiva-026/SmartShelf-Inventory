package edu.infosys.inventoryApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.inventoryApplication.bean.ProductSale;
import edu.infosys.inventoryApplication.bean.Transaction;

@Service
@Repository
public class TransactionDaoImpl implements TransactionDao{
	
	@Autowired
	private TransactionRepository repository;

	@Override
	public void saveTransaction(Transaction transaction)
	{
		repository.save(transaction);
	}
	
	@Override
	public Transaction getTransactionById(String id)
	{
		return repository.findById(id).get();
	}
	
	@Override
	public void deleteTransactionById(String id)
	{
		repository.deleteById(id);
	}
	
	@Override
	public List<Transaction> getTransactionsByType(String type)
	{
		return repository.getTransactionsByType(type);
	}
	
	@Override
	public String getMaxTransactionByType(String Type)
	{
		return repository.getMaxTransactionByType(Type);
	}
	@Override
	public List<Double> getDemandByProduct(String productId){
		return repository.getDemandByProduct(productId);
	}
	
	@Override
    public List<ProductSale> getProductWiseTotalSale(){
		return repository.getProductWiseTotalSale();
	}
}
