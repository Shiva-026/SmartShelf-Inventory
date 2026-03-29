import React, { useEffect, useState } from 'react';
import { getProductById, editProductPrice } from '../../Services/ProductService';
import { useParams, useNavigate } from "react-router-dom";
import '../../DisplayView.css';

const ProductPriceEdit=()=>{
   const param = useParams();
   let navigate = useNavigate();
   const [newPrice, setNewPrice] = useState(0.0);
   const [product,setProduct] = useState({
   productId:"",
   productName: "",
   skuId:"",
   purchasePrice: 0.0,
   salesPrice:0.0,
   reorderLevel:0.0,
   stock:0.0,
   vendorId:"",
   status:true,
   });

   const [flag,setFlag]=useState(false);

   const setProductData=()=>{
   getProductById(param.pid).then((response)=>{
   setProduct(response.data);
   });
   }

useEffect(() => {
   setFlag(false);
   setProductData();
},[]
);

const returnBack=()=>{
   navigate('/product-repo')
}

const onChangeHandler = (event) =>{
   setNewPrice(event.target.value);
}

/*const updatePrice = (event) => {
   event.preventDefault();
   product.purchasePrice=newPrice;
   editProductPrice(product).then(response=>{
   setFlag(true);
   })
}*/

const updatePrice = (event) => {
    event.preventDefault();
    
    // We update the local object reference
    const updatedProduct = { ...product, purchasePrice: newPrice };
    
    editProductPrice(updatedProduct).then(response => {
        setFlag(true);
        // Optional: navigate back after 2 seconds so user sees the success msg
        setTimeout(() => navigate('/product-repo'), 2000);
    }).catch(err => alert("Price update failed."));
}

return(
<div className="form-background">

  <div className="form-card">

    <h2 className="form-title">Edit Product Price</h2>

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
          <p style={{fontSize: '12px', color: '#95a5a6', marginBottom: '4px'}}>Current Purchase Price</p>
          <p style={{fontWeight: '600', color: '#2c3e50'}}>₹{product.purchasePrice}</p>
        </div>
        <div>
          <p style={{fontSize: '12px', color: '#95a5a6', marginBottom: '4px'}}>Sales Price</p>
          <p style={{fontWeight: '600', color: '#2c3e50'}}>₹{product.salesPrice}</p>
        </div>
        <div>
          <p style={{fontSize: '12px', color: '#95a5a6', marginBottom: '4px'}}>Stock</p>
          <p style={{fontWeight: '600', color: '#2c3e50'}}>{product.stock}</p>
        </div>
        <div>
          <p style={{fontSize: '12px', color: '#95a5a6', marginBottom: '4px'}}>Re-Order Level</p>
          <p style={{fontWeight: '600', color: '#2c3e50'}}>{product.reorderLevel}</p>
        </div>
        <div>
          <p style={{fontSize: '12px', color: '#95a5a6', marginBottom: '4px'}}>Vendor</p>
          <p style={{fontWeight: '600', color: '#2c3e50'}}>{product.vendorId}</p>
        </div>
      </div>
    </div>

    <div className="form-group">

      <label>Enter New Purchase Price</label>

      <input
        placeholder="Enter new price"
        name="newPrice"
        className="form-control"
        type="number"
        value={newPrice}
        onChange={onChangeHandler}
      />

    </div>

    {flag && <div style={{background: '#d5f4e6', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', borderLeft: '4px solid #27ae60'}}><p style={{color: '#27ae60', fontWeight: '600', margin: 0}}>Product Price Updated Successfully! ✓</p></div>}

    <div className="form-buttons">

      <button className="primary-btn" onClick={updatePrice} type="button">
        Save
      </button>

      <button className="secondary-btn" onClick={returnBack} type="button">
        Return
      </button>

    </div>

  </div>

</div>
);
}

export default ProductPriceEdit;