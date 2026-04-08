import React, { useEffect, useState } from 'react';
import { getProductById, editProductPrice } from '../../Services/ProductService';
import { useParams, useNavigate } from 'react-router-dom';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ppe-root {
    min-height: 100vh;
    background: #eeecf8;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 48px 24px;
  }

  /* ── Card ── */
  .ppe-card {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 32px rgba(80,60,180,0.10);
    border: 1px solid #e8e4f8;
    width: 100%;
    max-width: 620px;
    overflow: hidden;
  }
  .ppe-card-top {
    background: linear-gradient(90deg, #6c3fe0, #a855f7);
    height: 6px;
  }
  .ppe-body { padding: 36px 36px 32px; }

  /* ── Title ── */
  .ppe-title-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 28px;
  }
  .ppe-icon {
    width: 46px;
    height: 46px;
    border-radius: 12px;
    background: linear-gradient(135deg, #6c3fe0, #a855f7);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    flex-shrink: 0;
  }
  .ppe-title {
    font-size: 1.55rem;
    font-weight: 700;
    color: #1a1d2e;
    letter-spacing: -0.4px;
  }
  .ppe-subtitle { font-size: 0.88rem; color: #9099b5; margin-top: 2px; }

  /* ── Info grid ── */
  .ppe-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #f6f4fd;
    border: 1.5px solid #e8e4f8;
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 28px;
  }
  .ppe-info-cell {
    padding: 14px 18px;
    border-right: 1px solid #e8e4f8;
    border-bottom: 1px solid #e8e4f8;
  }
  .ppe-info-cell:nth-child(2n) { border-right: none; }
  .ppe-info-cell.full { grid-column: 1 / -1; border-right: none; }
  .ppe-info-cell:last-child { border-bottom: none; }
  .ppe-info-cell:nth-last-child(2):not(.full) { border-bottom: none; }

  .ppe-info-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #9099b5;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 5px;
  }
  .ppe-info-value { font-size: 1rem; font-weight: 600; color: #1a1d2e; }
  .ppe-info-value.mono {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.88rem;
    color: #6b7399;
    font-weight: 500;
  }
  .ppe-info-value.price { color: #6c3fe0; font-size: 1.05rem; }

  /* ── Divider ── */
  .ppe-divider { height: 1px; background: #eef0f8; margin-bottom: 24px; }

  /* ── Input section ── */
  .ppe-input-label {
    font-size: 0.92rem;
    font-weight: 600;
    color: #1a1d2e;
    margin-bottom: 8px;
    display: block;
  }
  .ppe-input-wrap { position: relative; margin-bottom: 6px; }
  .ppe-input-prefix {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
    font-weight: 700;
    color: #6c3fe0;
    pointer-events: none;
  }
  .ppe-input {
    width: 100%;
    padding: 13px 16px 13px 36px;
    border: 1.5px solid #dde1f0;
    border-radius: 10px;
    font-size: 1.05rem;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    color: #1a1d2e;
    background: #f8f7fd;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }
  .ppe-input:focus {
    border-color: #6c3fe0;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(108,63,224,0.12);
  }
  .ppe-input.ppe-input-error {
    border-color: #e74c3c;
    background: #fff8f8;
    box-shadow: 0 0 0 3px rgba(231,76,60,0.10);
  }
  .ppe-input.ppe-input-error:focus {
    border-color: #e74c3c;
    box-shadow: 0 0 0 3px rgba(231,76,60,0.14);
  }

  /* ── Inline field error ── */
  .ppe-field-error {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 7px;
    margin-bottom: 18px;
    font-size: 0.88rem;
    font-weight: 600;
    color: #c0392b;
    animation: ppe-fadein 0.2s ease;
  }
  .ppe-field-error-icon { font-size: 0.95rem; }

  /* ── API error banner ── */
  .ppe-banner-error {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: #fff0f0;
    border: 1.5px solid #ffc5c5;
    border-radius: 10px;
    padding: 14px 18px;
    margin-bottom: 22px;
    animation: ppe-fadein 0.25s ease;
  }
  .ppe-banner-error-icon { font-size: 1.15rem; margin-top: 1px; }
  .ppe-banner-error-title { font-size: 0.95rem; font-weight: 700; color: #c0392b; }
  .ppe-banner-error-sub   { font-size: 0.82rem; color: #e07070; margin-top: 3px; }

  /* ── Success banner ── */
  .ppe-success {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #e6f9f0;
    border: 1.5px solid #b3ecd4;
    border-radius: 10px;
    padding: 14px 18px;
    margin-bottom: 22px;
    animation: ppe-fadein 0.3s ease;
  }
  @keyframes ppe-fadein {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ppe-success-icon { font-size: 1.2rem; }
  .ppe-success-text { font-size: 0.95rem; font-weight: 600; color: #1a8a52; }
  .ppe-success-sub  { font-size: 0.82rem; color: #3aaa75; margin-top: 2px; }

  /* ── Buttons ── */
  .ppe-btn-row { display: flex; gap: 12px; }
  .ppe-btn-save {
    flex: 1;
    padding: 13px 24px;
    background: linear-gradient(135deg, #6c3fe0, #a855f7);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
    letter-spacing: 0.2px;
  }
  .ppe-btn-save:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(108,63,224,0.30);
  }
  .ppe-btn-return {
    padding: 13px 24px;
    background: #f0eef8;
    color: #6c3fe0;
    border: 1.5px solid #d4c9f8;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .ppe-btn-return:hover {
    background: #e4dff8;
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(108,63,224,0.15);
  }
`;

const ProductPriceEdit = () => {
  const param    = useParams();
  const navigate = useNavigate();

  const [newPrice, setNewPrice]   = useState('');
  const [success, setSuccess]     = useState(false);
  const [fieldError, setFieldError] = useState('');   // inline input error
  const [apiError, setApiError]   = useState('');     // API failure error
  const [product, setProduct]     = useState({
    productId: '', productName: '', skuId: '',
    purchasePrice: 0, salesPrice: 0,
    reorderLevel: 0, stock: 0, vendorId: '', status: true,
  });

  useEffect(() => {
    getProductById(param.pid).then(res => setProduct(res.data));
  }, []);

  // Clear field error as soon as user starts typing
  const handlePriceChange = (e) => {
    setNewPrice(e.target.value);
    if (fieldError) setFieldError('');
    if (apiError)   setApiError('');
  };

  const validate = () => {
    if (newPrice === '' || newPrice === null) {
      setFieldError('Please enter a price before saving.');
      return false;
    }
    if (parseFloat(newPrice) <= 0) {
      setFieldError('Price must be greater than ₹0.');
      return false;
    }
    return true;
  };

  const updatePrice = (e) => {
    e.preventDefault();
    setApiError('');

    if (!validate()) return;   // stop here — show inline error, no alert

    const updatedProduct = { ...product, purchasePrice: parseFloat(newPrice) };
    editProductPrice(updatedProduct)
      .then(() => {
        setSuccess(true);
        setFieldError('');
        setTimeout(() => navigate('/product-repo'), 5000);
      })
      .catch(() => {
        setApiError('Price update failed. Please try again or contact support.');
      });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ppe-root">
        <div className="ppe-card">

          <div className="ppe-card-top" />

          <div className="ppe-body">

            {/* ── Title ── */}
            <div className="ppe-title-row">
              <div className="ppe-icon">💲</div>
              <div>
                <div className="ppe-title">Edit Purchase Price</div>
                <div className="ppe-subtitle">Update the purchase price for this product</div>
              </div>
            </div>

            {/* ── Product info grid ── */}
            <div className="ppe-info-grid">
              <div className="ppe-info-cell">
                <div className="ppe-info-label">Product ID</div>
                <div className="ppe-info-value mono">{product.productId}</div>
              </div>
              <div className="ppe-info-cell">
                <div className="ppe-info-label">SKU ID</div>
                <div className="ppe-info-value mono">{product.skuId}</div>
              </div>
              <div className="ppe-info-cell full">
                <div className="ppe-info-label">Product Name</div>
                <div className="ppe-info-value">{product.productName}</div>
              </div>
              <div className="ppe-info-cell">
                <div className="ppe-info-label">Current Purchase Price</div>
                <div className="ppe-info-value price">₹{product.purchasePrice}</div>
              </div>
              <div className="ppe-info-cell">
                <div className="ppe-info-label">Sales Price</div>
                <div className="ppe-info-value price">₹{product.salesPrice}</div>
              </div>
              <div className="ppe-info-cell">
                <div className="ppe-info-label">Stock</div>
                <div className="ppe-info-value">{product.stock}</div>
              </div>
              <div className="ppe-info-cell">
                <div className="ppe-info-label">Reorder Level</div>
                <div className="ppe-info-value">{product.reorderLevel}</div>
              </div>
              <div className="ppe-info-cell full">
                <div className="ppe-info-label">Vendor</div>
                <div className="ppe-info-value">{product.vendorId}</div>
              </div>
            </div>

            <div className="ppe-divider" />

            {/* ── New price input ── */}
            <label className="ppe-input-label">Enter New Purchase Price</label>
            <div className="ppe-input-wrap">
              <span className="ppe-input-prefix">₹</span>
              <input
                className={`ppe-input ${fieldError ? 'ppe-input-error' : ''}`}
                type="number"
                placeholder="0.00"
                value={newPrice}
                onChange={handlePriceChange}
              />
            </div>

            {/* ── Inline field error ── */}
            {fieldError && (
              <div className="ppe-field-error">
                <span className="ppe-field-error-icon">⚠️</span>
                {fieldError}
              </div>
            )}

            {/* ── API error banner ── */}
            {apiError && (
              <div className="ppe-banner-error">
                <span className="ppe-banner-error-icon">❌</span>
                <div>
                  <div className="ppe-banner-error-title">Update Failed</div>
                  <div className="ppe-banner-error-sub">{apiError}</div>
                </div>
              </div>
            )}

            {/* ── Success banner ── */}
            {success && (
              <div className="ppe-success">
                <span className="ppe-success-icon">✅</span>
                <div>
                  <div className="ppe-success-text">Price updated successfully!</div>
                  <div className="ppe-success-sub">Redirecting to product list in 5 seconds…</div>
                </div>
              </div>
            )}

            {/* ── Buttons ── */}
            <div className="ppe-btn-row">
              <button className="ppe-btn-save" onClick={updatePrice} type="button">
                Save Price
              </button>
              <button className="ppe-btn-return" onClick={() => navigate('/product-repo')} type="button">
                ← Return
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPriceEdit;