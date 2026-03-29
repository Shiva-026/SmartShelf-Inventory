import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, editProductStock } from '../../Services/ProductService';
import { getUserId } from '../../Services/LoginService';
import { transactionIdGenerate, saveTransaction } from '../../Services/TransactionService';


const ProductStockEdit = () => {
    const [product, setProduct] = useState({
        productId: "",
        productName: "",
        skuId: "",
        purchasePrice: 0.0,
        salesPrice: 0.0,
        reorderLevel: 0.0,
        stock: 0.0,
        vendorId: "",
        status: true,
    });
    const [newId, setNewId] = useState(0);
    const [errors, setErrors] = useState({});
    const [flag, setFlag] = useState("");
    const [userId, setUserId] = useState("");
    const [tdate, setTdate] = useState(new Date());
    const [transaction, setTransaction] = useState({
        transactionId: 0,
        transactionType: "",
        productId: "",
        rate: 0.0,
        quantity: 0.0,
        transactionValue: 0.0,
        userId: "",
        transactionDate: new Date(),
    });
    let navigate = useNavigate();
    let param = useParams();
    const [quantity, setQuantity] = useState(0.0);
    const [transValue, setTransValue] = useState(null);
    const [warns, setWarns] = useState(null);

    const setProductData = () => {
        getProductById(param.pid).then(response => {
            setProduct(response.data);
            setFlag(param.no);
        });
    }

    const setUserData = () => {
        getUserId().then(response => {
            setUserId(response.data);
        });
    }

    const setTransactionId = () => {
        transactionIdGenerate(param.no).then(response => {
            setNewId(response.data);
        })
    }

    useEffect(() => {
        setProductData();
        setUserData();
        setTransactionId();
    }, []);

    const returnBack = () => {
        navigate('/product-list');
    }

    const clearAll = () => {
        setQuantity(0.0);
    }

    /*const stockEdit = (event) => {
        event.preventDefault();
        transaction.transactionId = newId;
        transaction.productId = product.productId;
        transaction.quantity = quantity;
        transaction.userId = userId;
        transaction.transactionDate = tdate;
        if (flag === "1") {
            transaction.transactionType = "IN";
            transaction.rate = product.purchasePrice;
        }
        else if (flag === "2") {
            transaction.transactionType = "OUT";
            transaction.rate = product.salesPrice;
        }
        transaction.transactionValue = parseFloat(transaction.rate) * parseFloat(quantity);
        setTransValue(transaction.transactionValue);
        if (flag === "2") {
            let balance = product.stock - quantity;
            if (balance <= product.reorderLevel)
                setWarns("Stock reached to Re-Order Level.....")
        }
        saveTransaction(transaction).then(response => {
        });
        editProductStock(product, quantity, flag).then(response => {
});
    }*/

const stockEdit = (event) => {
    event.preventDefault();

    // Create a local copy of the transaction to avoid state-delay issues
    const currentTransaction = {
        ...transaction,
        transactionId: newId,
        productId: product.productId,
        quantity: quantity,
        userId: userId,
        transactionDate: tdate,
        transactionType: flag === "1" ? "IN" : "OUT",
        rate: flag === "1" ? product.purchasePrice : product.salesPrice
    };

    currentTransaction.transactionValue = parseFloat(currentTransaction.rate) * parseFloat(quantity);
    setTransValue(currentTransaction.transactionValue);

    if (flag === "2") {
        let balance = product.stock - quantity;
        if (balance <= product.reorderLevel) {
            setWarns("Stock reached to Re-Order Level...");
        }
    }

    // --- CHAINED API CALLS ---
    saveTransaction(currentTransaction)
        .then(() => {
            // Only update stock if transaction saved successfully
            return editProductStock(product, quantity, flag);
        })
        .then(() => {
            alert("Inventory Updated Successfully!");
            navigate('/product-list'); // Return to list to see updated numbers
        })
        .catch(error => {
            console.error("Update Error:", error);
            alert("Failed to update stock. Check network tab.");
        });
};


    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;

        if (!toString(quantity).trim()) {
            tempErrors.quantity = "Transaction Quantity is required";
            isValid = false;
        }
        else if (parseFloat(quantity) <= 0) {
            tempErrors.quantity = "Transaction Quantity cannot be 0 or negetive";
            isValid = false;
        }

        if (flag === "2") {
            if (parseFloat(quantity) > product.stock) {
                tempErrors.quantity = "Issued Quantity cannot be more than stock";
                isValid = false;
            }
        }

        setErrors(tempErrors);
        if (isValid) {
            stockEdit(event);
        }
    };

    return (
  <div className="form-background">
    <div style={{width: '100%', maxWidth: '600px'}}>
      <div className="form-card">
        <h2 className="form-title">
          {parseInt(flag)===1 ? "Stock Purchase Entry" : "Stock Issue Entry"}
        </h2>

        <div style={{background: '#f8fafb', padding: '20px', borderRadius: '8px', marginBottom: '25px', border: '1px solid #e0e6ed'}}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
            <div>
              <p style={{fontSize: '12px', color: '#95a5a6', marginBottom: '4px'}}>Product ID</p>
              <p style={{fontWeight: '600', color: '#2c3e50'}}>{product.productId}</p>
            </div>
            <div>
              <p style={{fontSize: '12px', color: '#95a5a6', marginBottom: '4px'}}>SKU ID</p>
              <p style={{fontWeight: '600', color: '#2c3e50'}}>{product.skuId}</p>
            </div>
            <div style={{gridColumn: '1 / -1'}}>
              <p style={{fontSize: '12px', color: '#95a5a6', marginBottom: '4px'}}>Product Name</p>
              <p style={{fontWeight: '600', color: '#2c3e50'}}>{product.productName}</p>
            </div>
            <div>
              <p style={{fontSize: '12px', color: '#95a5a6', marginBottom: '4px'}}>
                {parseInt(flag)===1 ? "Purchase Price" : "Sales Price"}
              </p>
              <p style={{fontWeight: '600', color: '#2c3e50'}}>
                ₹{parseInt(flag)===1 ? product.purchasePrice : product.salesPrice}
              </p>
            </div>
            <div>
              <p style={{fontSize: '12px', color: '#95a5a6', marginBottom: '4px'}}>Current Stock</p>
              <p style={{fontWeight: '600', color: '#2c3e50'}}>{product.stock}</p>
            </div>
            <div>
              <p style={{fontSize: '12px', color: '#95a5a6', marginBottom: '4px'}}>Re-Order Level</p>
              <p style={{fontWeight: '600', color: '#2c3e50'}}>{product.reorderLevel}</p>
            </div>
            <div style={{gridColumn: '1 / -1'}}>
              <p style={{fontSize: '12px', color: '#95a5a6', marginBottom: '4px'}}>Vendor</p>
              <p style={{fontWeight: '600', color: '#2c3e50'}}>{product.vendorId}</p>
            </div>
          </div>
        </div>

        <form>
          <div className="form-group">
            <label>Transaction ID</label>
            <input name="transactionId" className="form-control" value={newId} readOnly/>
          </div>
          <div className="form-group">
            <label>Transaction Date</label>
            <input type="date" className="form-control" value={tdate} onChange={(event)=>setTdate(event.target.value)}/>
          </div>
          <div className="form-group">
            <label>
              {parseInt(flag)===1 ? "Enter Purchased Quantity" : "Enter Issued Quantity"}
            </label>
            <input placeholder="Quantity" name="quantity" className="form-control" value={quantity} onChange={(event)=>setQuantity(event.target.value)}/>
            {errors.quantity && <p className="error">{errors.quantity}</p>}
          </div>

          {transValue !== null && (
            <div style={{background: '#ecf0f7', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', borderLeft: '4px solid #667eea'}}>
              <p style={{color: '#667eea', fontWeight: '600', margin: 0}}>Transaction Value: ₹{transValue}</p>
            </div>
          )}

          {warns !== null && (
            <div style={{background: '#fadbd8', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', borderLeft: '4px solid #e74c3c'}}>
              <p style={{color: '#e74c3c', fontWeight: '600', margin: 0}}>{warns}</p>
            </div>
          )}

          <div className="form-buttons">
            <button className="primary-btn" onClick={handleValidation} type="button">Save</button>
            <button className="secondary-btn" onClick={clearAll} type="button">Reset</button>
            <button style={{background: '#e0e6ed', color: '#2c3e50', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.3s ease'}}
                    onClick={returnBack} type="button">Return</button>
          </div>
        </form>
      </div>
    </div>
  </div>
);





}

export default ProductStockEdit;