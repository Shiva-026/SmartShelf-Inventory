import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveSKU } from "../../Services/SKUService";
import '../../DisplayView.css';

const SKUEntry = () => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState(false);

  const [skuData, setSkuData] = useState({
    skuId: "",
    skuDescription: "",
    category: "",
  });

  useEffect(() => {
    setFlag(false);
  }, []);

  const createNewSKU = (event) => {
    event.preventDefault();
    saveSKU(skuData).then((response) => {
      setFlag(true);
    });
  };

  const onChangeHandler = (event) => {
    event.persist();
    setFlag(false);
    const name = event.target.name;
    const value = event.target.value;
    setSkuData(values => ({ ...values, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!skuData.skuId.trim()) {
      tempErrors.skuId = "SKU Id is required";
      isValid = false;
    }

    if (!skuData.skuDescription.trim()) {
      tempErrors.skuDescription = "SKU description is required";
      isValid = false;
    }

    if (!skuData.category.trim()) {
      tempErrors.category = "SKU Category is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      createNewSKU(event);
    }
  };

  const returnBack = () => {
    navigate('/admin-menu');
  };
  
  const nextEntry = () => {
    setSkuData({
      skuId: "",
      skuDescription: "",
      category: "",
    });
    setErrors({});
    setFlag(false);
    navigate('/sku-entry');
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* Left decorative panel */}
        <div style={styles.leftPanel}>
          <div style={styles.leftContent}>
            <h1 style={styles.leftTitle}>SKU</h1>
            <h1 style={styles.leftSubtitle}>Management</h1>
            <div style={styles.badge}>New Entry</div>
            <p style={styles.leftText}>
              Create and manage your Stock Keeping Units efficiently
            </p>
          </div>
        </div>

        {/* Right form panel */}
        <div style={styles.rightPanel}>
          <div style={styles.formContainer}>
            <h2 style={styles.formTitle}>New SKU Entry</h2>
            <p style={styles.formSubtitle}>Fill in the details below to create a new SKU</p>
            
            <form>
              <div style={styles.formGroup}>
                <label style={styles.label}>SKU ID</label>
                <input
                  type="text"
                  placeholder="e.g., SKU-001"
                  name="skuId"
                  style={styles.input}
                  value={skuData.skuId}
                  onChange={onChangeHandler}
                />
                {errors.skuId && <p style={styles.error}>{errors.skuId}</p>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>SKU Description</label>
                <input
                  type="text"
                  placeholder="Enter detailed description"
                  name="skuDescription"
                  style={styles.input}
                  value={skuData.skuDescription}
                  onChange={onChangeHandler}
                />
                {errors.skuDescription && <p style={styles.error}>{errors.skuDescription}</p>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>SKU Category</label>
                <input
                  type="text"
                  placeholder="e.g., Electronics, Clothing, etc."
                  name="category"
                  style={styles.input}
                  value={skuData.category}
                  onChange={onChangeHandler}
                />
                {errors.category && <p style={styles.error}>{errors.category}</p>}
              </div>

              <div style={styles.buttonGroup}>
                <button
                  type="button"
                  style={styles.submitButton}
                  onClick={handleValidation}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1557b0'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1e6df2'}
                >
                  Submit
                </button>
                <button
                  type="button"
                  style={styles.returnButton}
                  onClick={returnBack}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#1e6df2';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#1e3e6e';
                  }}
                >
                  Return
                </button>
              </div>
            </form>

            {flag && (
              <div style={styles.successMessage}>
                <span style={styles.successIcon}>✓</span>
                <span style={styles.successText}>New SKU Added Successfully!</span>
                <button
                  style={styles.nextButton}
                  onClick={nextEntry}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1557b0'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1e6df2'}
                >
                  Next Entry →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles object with blue color scheme
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  container: {
    display: 'flex',
    width: '1000px',
    maxWidth: '100%',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    overflow: 'hidden',
    minHeight: '600px',
  },
  leftPanel: {
    flex: '1',
    background: 'linear-gradient(145deg, #1e4b8c 0%, #1e6df2 100%)',
    padding: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  leftContent: {
    color: 'white',
    textAlign: 'left',
    zIndex: 1,
  },
  leftTitle: {
    fontSize: '3.5rem',
    fontWeight: '800',
    margin: '0',
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
    textShadow: '2px 4px 10px rgba(0,0,0,0.2)',
  },
  leftSubtitle: {
    fontSize: '2.5rem',
    fontWeight: '600',
    margin: '0 0 20px 0',
    opacity: '0.9',
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    padding: '8px 20px',
    borderRadius: '30px',
    display: 'inline-block',
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '20px',
    border: '1px solid rgba(255,255,255,0.3)',
  },
  leftText: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    opacity: '0.9',
    margin: '0',
    maxWidth: '300px',
  },
  rightPanel: {
    flex: '1.2',
    padding: '40px',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  },
  formTitle: {
    fontSize: '2rem',
    color: '#1e3e6e',
    marginBottom: '10px',
    fontWeight: '600',
  },
  formSubtitle: {
    fontSize: '0.95rem',
    color: '#718096',
    marginBottom: '30px',
  },
  formGroup: {
    marginBottom: '25px',
  },
  label: {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1e3e6e',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    transition: 'all 0.3s',
    outline: 'none',
    backgroundColor: '#f8fafc',
  },
  error: {
    color: '#e53e3e',
    fontSize: '0.85rem',
    marginTop: '5px',
    fontWeight: '500',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    marginTop: '35px',
  },
  submitButton: {
    flex: '1',
    padding: '14px 24px',
    backgroundColor: '#1e6df2',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    boxShadow: '0 4px 6px rgba(30, 109, 242, 0.25)',
  },
  returnButton: {
    flex: '1',
    padding: '14px 24px',
    backgroundColor: 'transparent',
    color: '#1e3e6e',
    border: '2px solid #1e6df2',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  successMessage: {
    marginTop: '30px',
    padding: '16px 20px',
    backgroundColor: '#f0fff4',
    border: '2px solid #1e6df2',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  successIcon: {
    width: '24px',
    height: '24px',
    backgroundColor: '#1e6df2',
    color: 'white',
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  successText: {
    color: '#1e3e6e',
    fontWeight: '500',
    flex: '1',
  },
  nextButton: {
    padding: '8px 16px',
    backgroundColor: '#1e6df2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginLeft: 'auto',
  },
};

export default SKUEntry;