import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSKU, getSKUById } from "../../Services/SKUService";

const SKUEdit = () => {
  const navigate = useNavigate();
  const [sku, setSku] = useState({
    skuId: '',
    category: '',
    skuDescription: ''
  });
  const [errors, setErrors] = useState({});
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const param = useParams();

  const setSKUData = async () => {
    try {
      setLoading(true);
      const response = await getSKUById(param.skuno);
      setSku(response.data);
      setDescription(response.data.skuDescription || '');
    } catch (error) {
      console.error("Error fetching SKU:", error);
      alert("Error loading SKU data: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (param.skuno) {
      setSKUData();
    }
  }, [param.skuno]);

  const editSKU = async (event) => {
    event.preventDefault();
    
    const updatedSKU = {
      ...sku,
      skuDescription: description
    };
    
    try {
      await updateSKU(updatedSKU);
      alert("SKU Updated Successfully!");
      navigate('/sku-list');
    } catch (error) {
      console.error("Error updating SKU:", error);
      alert("Error updating SKU: " + (error.response?.data?.message || error.message));
    }
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!description || !description.trim()) {
      tempErrors.skuDescription = "SKU Description is required";
      isValid = false;
    } else if (description.length < 3) {
      tempErrors.skuDescription = "SKU Description must be at least 3 characters";
      isValid = false;
    } else if (description.length > 200) {
      tempErrors.skuDescription = "SKU Description must be less than 200 characters";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      editSKU(event);
    }
  };

  const returnBack = () => navigate('/sku-list');

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading SKU details...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerIcon}>✏️</div>
          <h2 style={styles.headerTitle}>Edit SKU</h2>
          <p style={styles.headerSubtitle}>Update stock keeping unit details</p>
        </div>

        {/* Form Body */}
        <div style={styles.body}>
          
          {/* SKU ID - Read Only */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              SKU ID
            </label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>🔖</span>
              <input
                type="text"
                style={styles.inputReadOnly}
                value={sku.skuId || 'N/A'}
                readOnly
              />
            </div>
            <small style={styles.readOnlyText}>🔒 Read only</small>
          </div>

          {/* Category - Read Only */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Category
            </label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>📁</span>
              <input
                type="text"
                style={styles.inputReadOnly}
                value={sku.category || 'N/A'}
                readOnly
              />
            </div>
            <small style={styles.readOnlyText}>🔒 Read only</small>
          </div>

          <hr style={styles.divider} />

          {/* SKU Description - Editable */}
          <div style={styles.formGroup}>
            <label style={styles.labelRequired}>
              SKU Description <span style={styles.requiredStar}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>📝</span>
              <textarea
                style={styles.textarea}
                placeholder="Enter SKU description..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.skuDescription) setErrors({});
                }}
                rows="3"
              />
            </div>
            {errors.skuDescription && (
              <div style={styles.errorMessage}>
                ⚠️ {errors.skuDescription}
              </div>
            )}
            <div style={styles.charCount}>
              {description.length}/200 characters
            </div>
          </div>

          {/* Buttons */}
          <div style={styles.buttonGroup}>
            <button
              style={styles.saveButton}
              onClick={handleValidation}
            >
              ✓ Save Changes
            </button>

            <button
              style={styles.backButton}
              onClick={returnBack}
            >
              ← Back to List
            </button>
          </div>

        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <small style={styles.footerText}>
            🔒 Only description can be modified
          </small>
        </div>

      </div>
    </div>
  );
};

// Styles object for responsive design
const styles = {
  container: {
    minHeight: '100vh',
    background: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif'
  },
  card: {
    maxWidth: '500px',
    width: '100%',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.02)',
    overflow: 'hidden'
  },
  header: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    padding: '32px 24px',
    textAlign: 'center'
  },
  headerIcon: {
    fontSize: '48px',
    marginBottom: '12px'
  },
  headerTitle: {
    margin: '0 0 8px 0',
    fontSize: '24px',
    fontWeight: '600'
  },
  headerSubtitle: {
    margin: 0,
    fontSize: '14px',
    opacity: 0.9
  },
  body: {
    padding: '32px 24px'
  },
  formGroup: {
    marginBottom: '24px'
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  labelRequired: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#6366f1',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  requiredStar: {
    color: '#ef4444'
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'all 0.2s'
  },
  inputIcon: {
    padding: '10px 12px',
    background: '#f9fafb',
    borderRight: '1px solid #e5e7eb',
    color: '#9ca3af'
  },
  inputReadOnly: {
    flex: 1,
    padding: '10px 12px',
    border: 'none',
    background: '#f9fafb',
    color: '#6b7280',
    fontSize: '14px',
    outline: 'none'
  },
  textarea: {
    flex: 1,
    padding: '10px 12px',
    border: 'none',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    outline: 'none'
  },
  readOnlyText: {
    display: 'block',
    marginTop: '6px',
    fontSize: '11px',
    color: '#9ca3af'
  },
  divider: {
    margin: '24px 0',
    border: 'none',
    borderTop: '1px solid #e5e7eb'
  },
  errorMessage: {
    marginTop: '6px',
    fontSize: '12px',
    color: '#ef4444'
  },
  charCount: {
    marginTop: '6px',
    fontSize: '11px',
    color: '#9ca3af',
    textAlign: 'right'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '32px'
  },
  saveButton: {
    flex: 1,
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.1s, opacity 0.2s'
  },
  backButton: {
    flex: 1,
    padding: '12px 24px',
    background: 'white',
    color: '#6b7280',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  footer: {
    padding: '16px 24px',
    background: '#f9fafb',
    borderTop: '1px solid #e5e7eb',
    textAlign: 'center'
  },
  footerText: {
    color: '#9ca3af',
    fontSize: '12px'
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'system-ui, sans-serif'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #e5e7eb',
    borderTopColor: '#6366f1',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }
};

// Add keyframes for spinner animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default SKUEdit;