package edu.infosys.inventoryApplication.dao;

import java.util.List;

import edu.infosys.inventoryApplication.bean.ProductSale;
import edu.infosys.inventoryApplication.bean.Transaction;

public interface TransactionDao {

	public void saveTransaction(Transaction transaction);
	//public List<Transaction> getAllTransactions();
	public Transaction getTransactionById(String id);
	public void deleteTransactionById(String id);
	public List<Transaction> getTransactionsByType(String type);
	public String getMaxTransactionByType(String Type);
	public List<Double> getDemandByProduct(String productId);
    public List<ProductSale> getProductWiseTotalSale();
    
	}

