import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { saveNewProduct, productIdGenerator } from '../../Services/ProductService';
import { getUsersByRole } from '../../Services/LoginService';
import { getAllCategories, getSkuIdByCategory } from '../../Services/SKUService';
import '../../DisplayView.css';

/**
 * A styled product entry form with blue accents, matching the provided image layout.
 * Includes fields for caregiver/patient info (as per image) and product details.
 */
const ProductEntry = () => {
  const [product, setProduct] = useState({
    productId: '',
    productName: '',
    skuId: '',
    purchasePrice: 0.0,
    salesPrice: 0.0,
    reorderLevel: 0.0,
    stock: 0.0,
    vendorId: '',
    status: true,
  });

  let [newId, setNewId] = useState('');
  const [vendorList, setVendorList] = useState([]);
  const [skuCategoryList, setSkuCategoryList] = useState([]);
  const [skuCategory, setSkuCategory] = useState('');
  const [skuIdList, setSkuIdList] = useState([]);
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState(false);

  const setNewProductId = () => {
    productIdGenerator().then((response) => {
      setNewId(response.data);
    });
  };

  const setVendors = () => {
    getUsersByRole('Vendor').then((response) => {
      setVendorList(response.data);
    });
  };

  const getSkuCategoryList = () => {
    getAllCategories().then((response) => {
      setSkuCategoryList(response.data);
    });
  };

  useEffect(() => {
    setNewProductId();
    setVendors();
    getSkuCategoryList();
    setFlag(false);
  }, []);

  const saveProduct = (event) => {
    event.preventDefault();
    product.productId = newId;
    product.productName = skuCategory;
    if (parseFloat(product.stock) <= parseFloat(product.reorderLevel))
      product.status = false;
    saveNewProduct(product).then((res) => {
      setFlag(true);
    });
  };

  const onChangeHandler = (event) => {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    setProduct((values) => ({ ...values, [name]: value }));
  };

  const handleStateChange = (event) => {
    let value = event.target.value;
    if (value.trim() && toString(value.trim()) !== '------') {
      setSkuCategory(value);
      getSkuIdByCategory(value).then((response) => {
        setSkuIdList(response.data);
      });
    }
  };

  const clearAll = () => {
    setProduct({
      ...product,
      productName: '',
      skuId: '',
      purchasePrice: 0.0,
      reorderLevel: 0.0,
      stock: 0.0,
      vendorId: '',
    });
    setSkuCategory('');
    setSkuIdList([]);
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!skuCategory.trim()) {
      tempErrors.skuCategory = 'Sku Category is required';
      isValid = false;
    } else if (skuCategory.trim() === '------') {
      tempErrors.skuCategory = 'Please select a valid Sku Category';
      isValid = false;
    }

    if (!product.purchasePrice || product.purchasePrice.toString().trim() === '') {
      tempErrors.purchasePrice = 'Purchase Price is required';
      isValid = false;
    } else if (parseFloat(product.purchasePrice) <= 0) {
      tempErrors.purchasePrice = 'Purchase Price cannot be 0 or negative';
      isValid = false;
    }
    if (!product.stock || product.stock.toString().trim() === '') {
      tempErrors.stock = 'Stock is required';
      isValid = false;
    } else if (parseFloat(product.stock) <= 0) {
      tempErrors.stock = 'Stock cannot be 0 or negative';
      isValid = false;
    }

    if (!product.reorderLevel || product.reorderLevel.toString().trim() === '') {
      tempErrors.reorderLevel = 'Reorder Level of stock is required';
      isValid = false;
    } else if (parseFloat(product.reorderLevel) <= 0) {
      tempErrors.reorderLevel = 'Reorder Level of stock cannot be 0 or negative';
      isValid = false;
    }
    if (!product.skuId || product.skuId.trim() === '') {
      tempErrors.skuId = 'SKU is required';
      isValid = false;
    } else if (product.skuId.trim() === '------') {
      tempErrors.skuId = 'Please select a valid SKU';
      isValid = false;
    }
    if (!product.vendorId || product.vendorId.trim() === '') {
      tempErrors.vendorId = 'Vendor Id is required';
      isValid = false;
    } else if (product.vendorId.trim() === '------') {
      tempErrors.vendorId = 'Please select a valid Vendor Id';
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      saveProduct(event);
    }
  };

  const nextEntry = () => {
    setNewId('');
    setProduct({
      ...product,
      productName: '',
      skuId: '',
      purchasePrice: 0.0,
      reorderLevel: 0.0,
      stock: 0.0,
      vendorId: '',
    });
    setSkuCategory('');
    setSkuIdList([]);
    navigate('/product-entry');
  };

  return (
    <div style={styles.pageContainer}>
      <br />
      <div style={styles.outerCard}>
        {/* Left side with image prompt */}
        <div style={styles.imageSide}>
          <div style={styles.imagePlaceholder}>
            <span style={styles.imageText}>Inventory</span>
            <span style={styles.imageText}>Pro</span>
            <div style={styles.consultationBadge}>Product Entry</div>
          </div>
        </div>

        {/* Right side: form */}
        <div style={styles.formSide}>
          <h2 style={styles.formTitle}>New Product Addition</h2>
          <form>
            
            

            {/* Product fields (from original logic) */}
            <div style={styles.rowFields}>
              <div style={styles.halfField}>
                <label style={styles.label}>Product Id</label>
                <input
                  placeholder="Auto-generated"
                  name="productId"
                  style={styles.input}
                  value={newId}
                  readOnly
                />
              </div>
              <div style={styles.halfField}>
                <label style={styles.label}>Select SKU Category</label>
                <select
                  name="skuCategory"
                  style={styles.input}
                  value={skuCategory}
                  onChange={handleStateChange}
                >
                  <option>------</option>
                  {skuCategoryList.map((skuCat, index) => (
                    <option key={index} value={skuCat}>
                      {skuCat}
                    </option>
                  ))}
                </select>
                {errors.skuCategory && <p style={styles.error}>{errors.skuCategory}</p>}
              </div>
            </div>

            <div style={styles.rowFields}>
              <div style={styles.halfField}>
                <label style={styles.label}>Select SKU Id</label>
                <select
                  name="skuId"
                  style={styles.input}
                  value={product.skuId}
                  onChange={onChangeHandler}
                >
                  <option>------</option>
                  {skuIdList.map((skuNo, index) => (
                    <option key={index} value={skuNo}>
                      {skuNo}
                    </option>
                  ))}
                </select>
                {errors.skuId && <p style={styles.error}>{errors.skuId}</p>}
              </div>
              <div style={styles.halfField}>
                <label style={styles.label}>Purchase Price</label>
                <input
                  placeholder="0.00"
                  name="purchasePrice"
                  style={styles.input}
                  value={product.purchasePrice}
                  onChange={onChangeHandler}
                />
                {errors.purchasePrice && <p style={styles.error}>{errors.purchasePrice}</p>}
              </div>
            </div>

            <div style={styles.rowFields}>
              <div style={styles.halfField}>
                <label style={styles.label}>Stock</label>
                <input
                  placeholder="0"
                  name="stock"
                  style={styles.input}
                  value={product.stock}
                  onChange={onChangeHandler}
                />
                {errors.stock && <p style={styles.error}>{errors.stock}</p>}
              </div>
              <div style={styles.halfField}>
                <label style={styles.label}>Re Order Level</label>
                <input
                  placeholder="0"
                  name="reorderLevel"
                  style={styles.input}
                  value={product.reorderLevel}
                  onChange={onChangeHandler}
                />
                {errors.reorderLevel && <p style={styles.error}>{errors.reorderLevel}</p>}
              </div>
            </div>

            <div style={styles.rowFields}>
              <div style={styles.halfField}>
                <label style={styles.label}>Select Vendor Id</label>
                <select
                  name="vendorId"
                  style={styles.input}
                  value={product.vendorId}
                  onChange={onChangeHandler}
                >
                  <option>------</option>
                  {vendorList.map((userId, index) => (
                    <option key={index} value={userId}>
                      {userId}
                    </option>
                  ))}
                </select>
                {errors.vendorId && <p style={styles.error}>{errors.vendorId}</p>}
              </div>
              <div style={styles.halfField}></div> {/* empty for alignment */}
            </div>

            {/* Buttons */}
            <div style={styles.buttonGroup}>
              <button style={styles.saveBtn} onClick={handleValidation}>
                Save
              </button>
              <button style={styles.resetBtn} type="button" onClick={clearAll}>
                Reset
              </button>
              <Link to="/admin-menu">
                <button style={styles.returnBtn}>Return Back</button>
              </Link>
            </div>
          </form>

          {flag && (
            <div style={styles.successMessage}>
              <p style={{ color: '#2e7d32' }}>✓ New Product Added....</p>
              <button style={styles.nextBtn} onClick={nextEntry}>
                Next Entry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Inline styles for a clean, blue-accented form similar to the image
const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(145deg, #f6f9fc 0%, #e6f0fa 100%)',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    padding: '20px',
  },
  outerCard: {
    display: 'flex',
    width: '1100px',
    maxWidth: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '32px',
    boxShadow: '0 25px 50px -12px rgba(0, 85, 170, 0.25)',
    overflow: 'hidden',
    border: '1px solid rgba(0, 112, 243, 0.15)',
  },
  imageSide: {
    flex: '1',
    background: 'linear-gradient(135deg, #0b3b5c 0%, #1b6b8f 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    position: 'relative',
  },
  imagePlaceholder: {
    textAlign: 'center',
    color: 'white',
  },
  imageText: {
    fontSize: '6rem',
    fontWeight: '800',
    display: 'block',
    lineHeight: '1',
    letterSpacing: '-0.02em',
    textShadow: '2px 4px 10px rgba(0,0,0,0.2)',
    color: '#ffffff',
  },
  consultationBadge: {
    marginTop: '30px',
    backgroundColor: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(4px)',
    padding: '12px 24px',
    borderRadius: '40px',
    fontSize: '1.2rem',
    fontWeight: '500',
    border: '1px solid rgba(255,255,255,0.3)',
    color: 'white',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
  },
  formSide: {
    flex: '1.4',
    padding: '48px 40px',
    backgroundColor: '#ffffff',
  },
  formTitle: {
    fontSize: '1.9rem',
    fontWeight: '600',
    color: '#0a2942',
    marginBottom: '32px',
    letterSpacing: '-0.01em',
    borderLeft: '6px solid #1e6df2',
    paddingLeft: '18px',
  },
  rowFields: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  halfField: {
    flex: '1 1 200px',
    minWidth: '200px',
  },
  label: {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    color: '#1f4a7a',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '0.95rem',
    border: '1px solid #d9e5f0',
    borderRadius: '14px',
    backgroundColor: '#f9fcff',
    transition: 'all 0.2s',
    outline: 'none',
    boxShadow: '0 2px 4px rgba(0, 79, 158, 0.05)',
  },
  divider: {
    margin: '30px 0 25px 0',
    border: 'none',
    borderTop: '2px dashed #bdd3f0',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '32px',
    flexWrap: 'wrap',
  },
  saveBtn: {
    backgroundColor: '#1e6df2',
    color: 'white',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '40px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 8px 18px -6px #1e6df2',
    transition: '0.15s',
    flex: '1 1 auto',
  },
  resetBtn: {
    backgroundColor: '#ffffff',
    color: '#1e3e6e',
    border: '1.5px solid #b0c9e8',
    padding: '14px 28px',
    borderRadius: '40px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    flex: '1 1 auto',
  },
  returnBtn: {
    backgroundColor: '#ffb347',
    color: '#1e3e6e',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '40px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 8px 18px -6px #ffb347',
    flex: '1 1 auto',
  },
  error: {
    color: '#d32f2f',
    fontSize: '0.75rem',
    marginTop: '4px',
    fontWeight: '500',
  },
  successMessage: {
    marginTop: '24px',
    backgroundColor: '#e8f5e9',
    padding: '14px 20px',
    borderRadius: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid #a5d6a7',
  },
  nextBtn: {
    backgroundColor: '#1e6df2',
    color: 'white',
    border: 'none',
    padding: '8px 24px',
    borderRadius: '30px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default ProductEntry;