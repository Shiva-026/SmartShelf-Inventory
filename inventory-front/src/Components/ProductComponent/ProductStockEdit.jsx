import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, editProductStock } from '../../Services/ProductService';
import { getUserId } from '../../Services/LoginService';
import { transactionIdGenerate, saveTransaction } from '../../Services/TransactionService';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pse-root {
    min-height: 100vh;
    background: #eeecf8;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 48px 24px;
  }

  /* ── Card ── */
  .pse-card {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 32px rgba(80,60,180,0.10);
    border: 1px solid #e8e4f8;
    width: 100%;
    max-width: 640px;
    overflow: hidden;
  }

  /* ── Top accent bar — green for IN, red for OUT ── */
  .pse-card-top-in  { height: 6px; background: linear-gradient(90deg, #1a8a52, #34d399); }
  .pse-card-top-out { height: 6px; background: linear-gradient(90deg, #c0392b, #e74c3c); }

  .pse-body { padding: 36px 36px 32px; }

  /* ── Title ── */
  .pse-title-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 28px;
  }
  .pse-icon-in {
    width: 46px; height: 46px;
    border-radius: 12px;
    background: linear-gradient(135deg, #1a8a52, #34d399);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.3rem; flex-shrink: 0;
  }
  .pse-icon-out {
    width: 46px; height: 46px;
    border-radius: 12px;
    background: linear-gradient(135deg, #c0392b, #e74c3c);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.3rem; flex-shrink: 0;
  }
  .pse-title { font-size: 1.55rem; font-weight: 700; color: #1a1d2e; letter-spacing: -0.4px; }
  .pse-subtitle { font-size: 0.88rem; color: #9099b5; margin-top: 2px; }

  /* ── Info grid ── */
  .pse-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #f6f4fd;
    border: 1.5px solid #e8e4f8;
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 28px;
  }
  .pse-info-cell {
    padding: 13px 18px;
    border-right: 1px solid #e8e4f8;
    border-bottom: 1px solid #e8e4f8;
  }
  .pse-info-cell:nth-child(2n) { border-right: none; }
  .pse-info-cell.full { grid-column: 1 / -1; border-right: none; }
  .pse-info-cell:last-child { border-bottom: none; }
  .pse-info-cell:nth-last-child(2):not(.full) { border-bottom: none; }

  .pse-info-label {
    font-size: 0.75rem; font-weight: 600;
    color: #9099b5; text-transform: uppercase;
    letter-spacing: 0.5px; margin-bottom: 5px;
  }
  .pse-info-value { font-size: 1rem; font-weight: 600; color: #1a1d2e; }
  .pse-info-value.mono {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.88rem; color: #6b7399; font-weight: 500;
  }
  .pse-info-value.green { color: #1a8a52; font-size: 1.05rem; }
  .pse-info-value.red   { color: #c0392b; font-size: 1.05rem; }

  /* ── Divider ── */
  .pse-divider { height: 1px; background: #eef0f8; margin-bottom: 24px; }

  /* ── Form fields ── */
  .pse-field { margin-bottom: 20px; }
  .pse-label {
    display: block;
    font-size: 0.92rem; font-weight: 600;
    color: #1a1d2e; margin-bottom: 8px;
  }
  .pse-input {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid #dde1f0;
    border-radius: 10px;
    font-size: 1rem;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    color: #1a1d2e;
    background: #f8f7fd;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }
  .pse-input:focus {
    border-color: #6c3fe0;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(108,63,224,0.12);
  }
  .pse-input:read-only {
    background: #f0eef8;
    color: #6b7399;
    cursor: not-allowed;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
  }
  .pse-input.pse-input-error {
    border-color: #e74c3c;
    background: #fff8f8;
    box-shadow: 0 0 0 3px rgba(231,76,60,0.10);
  }

  /* ── Inline field error ── */
  .pse-field-error {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 7px;
    font-size: 0.88rem;
    font-weight: 600;
    color: #c0392b;
    animation: pse-fadein 0.2s ease;
  }

  /* ── Transaction value banner ── */
  .pse-trans-value {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #f0eef8;
    border: 1.5px solid #d4c9f8;
    border-radius: 10px;
    padding: 14px 18px;
    margin-bottom: 18px;
    animation: pse-fadein 0.3s ease;
  }
  .pse-trans-value-icon { font-size: 1.15rem; }
  .pse-trans-value-label { font-size: 0.82rem; color: #9099b5; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; }
  .pse-trans-value-amount { font-size: 1.2rem; font-weight: 700; color: #6c3fe0; margin-top: 2px; }

  /* ── Reorder warning ── */
  .pse-warn {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: #fff8e6;
    border: 1.5px solid #f7c948;
    border-radius: 10px;
    padding: 13px 18px;
    margin-bottom: 18px;
    animation: pse-fadein 0.25s ease;
  }
  .pse-warn-icon { font-size: 1.1rem; margin-top: 1px; }
  .pse-warn-title { font-size: 0.95rem; font-weight: 700; color: #a05c00; }
  .pse-warn-sub   { font-size: 0.82rem; color: #c07800; margin-top: 2px; }

  /* ── API error banner ── */
  .pse-banner-error {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: #fff0f0;
    border: 1.5px solid #ffc5c5;
    border-radius: 10px;
    padding: 14px 18px;
    margin-bottom: 18px;
    animation: pse-fadein 0.25s ease;
  }
  .pse-banner-error-icon  { font-size: 1.15rem; margin-top: 1px; }
  .pse-banner-error-title { font-size: 0.95rem; font-weight: 700; color: #c0392b; }
  .pse-banner-error-sub   { font-size: 0.82rem; color: #e07070; margin-top: 3px; }

  /* ── Success banner ── */
  .pse-success {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #e6f9f0;
    border: 1.5px solid #b3ecd4;
    border-radius: 10px;
    padding: 14px 18px;
    margin-bottom: 18px;
    animation: pse-fadein 0.3s ease;
  }
  .pse-success-icon { font-size: 1.2rem; }
  .pse-success-text { font-size: 0.95rem; font-weight: 600; color: #1a8a52; }
  .pse-success-sub  { font-size: 0.82rem; color: #3aaa75; margin-top: 2px; }

  @keyframes pse-fadein {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Buttons ── */
  .pse-btn-row { display: flex; gap: 10px; flex-wrap: wrap; }

  .pse-btn-save-in {
    flex: 1;
    padding: 13px 20px;
    background: linear-gradient(135deg, #1a8a52, #34d399);
    color: #fff;
    border: none; border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem; font-weight: 700;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .pse-btn-save-in:hover {
    opacity: 0.9; transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(26,138,82,0.28);
  }

  .pse-btn-save-out {
    flex: 1;
    padding: 13px 20px;
    background: linear-gradient(135deg, #c0392b, #e74c3c);
    color: #fff;
    border: none; border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem; font-weight: 700;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .pse-btn-save-out:hover {
    opacity: 0.9; transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(192,57,43,0.28);
  }

  .pse-btn-reset {
    padding: 13px 20px;
    background: #f0eef8; color: #6c3fe0;
    border: 1.5px solid #d4c9f8; border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem; font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .pse-btn-reset:hover {
    background: #e4dff8; transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(108,63,224,0.15);
  }

  .pse-btn-return {
    padding: 13px 20px;
    background: #f4f5f7; color: #3a3f5c;
    border: 1.5px solid #dde1f0; border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem; font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .pse-btn-return:hover {
    background: #e8eaf0; transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(0,0,0,0.08);
  }
`;

const ProductStockEdit = () => {
  const param    = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productId: '', productName: '', skuId: '',
    purchasePrice: 0, salesPrice: 0,
    reorderLevel: 0, stock: 0, vendorId: '', status: true,
  });
  const [newId, setNewId]       = useState(0);
  const [flag, setFlag]         = useState('');
  const [userId, setUserId]     = useState('');
  const [tdate, setTdate]       = useState(new Date().toISOString().split('T')[0]);
  const [quantity, setQuantity] = useState('');
  const [transValue, setTransValue] = useState(null);
  const [warns, setWarns]       = useState(null);
  const [fieldError, setFieldError] = useState('');
  const [apiError, setApiError]     = useState('');
  const [success, setSuccess]       = useState(false);

  const [transaction] = useState({
    transactionId: 0, transactionType: '', productId: '',
    rate: 0, quantity: 0, transactionValue: 0, userId: '', transactionDate: new Date(),
  });

  useEffect(() => {
    getProductById(param.pid).then(res => { setProduct(res.data); setFlag(param.no); });
    getUserId().then(res => setUserId(res.data));
    transactionIdGenerate(param.no).then(res => setNewId(res.data));
  }, []);

  const isPurchase = parseInt(flag) === 1;

  // Clear errors as user types
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    if (fieldError) setFieldError('');
    if (apiError)   setApiError('');
  };

  const validate = () => {
    if (quantity === '' || quantity === null) {
      setFieldError('Quantity is required.');
      return false;
    }
    if (parseFloat(quantity) <= 0) {
      setFieldError('Quantity must be greater than 0.');
      return false;
    }
    if (!isPurchase && parseFloat(quantity) > product.stock) {
      setFieldError(`Issued quantity cannot exceed current stock (${product.stock}).`);
      return false;
    }
    return true;
  };

  const stockEdit = (e) => {
    e.preventDefault();
    setApiError('');
    setWarns(null);
    setTransValue(null);

    if (!validate()) return;

    const currentTransaction = {
      ...transaction,
      transactionId: newId,
      productId: product.productId,
      quantity: parseFloat(quantity),
      userId,
      transactionDate: tdate,
      transactionType: isPurchase ? 'IN' : 'OUT',
      rate: isPurchase ? product.purchasePrice : product.salesPrice,
    };
    currentTransaction.transactionValue = parseFloat(currentTransaction.rate) * parseFloat(quantity);
    setTransValue(currentTransaction.transactionValue);

    if (!isPurchase) {
      const balance = product.stock - parseFloat(quantity);
      if (balance <= product.reorderLevel) {
        setWarns(`After this issue, stock (${balance}) will be at or below reorder level (${product.reorderLevel}).`);
      }
    }

    saveTransaction(currentTransaction)
      .then(() => editProductStock(product, quantity, flag))
      .then(() => {
        setSuccess(true);
        setTimeout(() => navigate('/product-repo'), 4000);
      })
      .catch(err => {
        console.error('Update Error:', err);
        setApiError('Failed to update stock. Please check your connection and try again.');
      });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="pse-root">
        <div className="pse-card">

          {/* ── Accent bar ── */}
          <div className={isPurchase ? 'pse-card-top-in' : 'pse-card-top-out'} />

          <div className="pse-body">

            {/* ── Title ── */}
            <div className="pse-title-row">
              <div className={isPurchase ? 'pse-icon-in' : 'pse-icon-out'}>
                {isPurchase ? '📥' : '📤'}
              </div>
              <div>
                <div className="pse-title">
                  {isPurchase ? 'Stock Purchase Entry' : 'Stock Issue Entry'}
                </div>
                <div className="pse-subtitle">
                  {isPurchase ? 'Record incoming stock for this product' : 'Record outgoing stock for this product'}
                </div>
              </div>
            </div>

            {/* ── Product info grid ── */}
            <div className="pse-info-grid">
              <div className="pse-info-cell">
                <div className="pse-info-label">Product ID</div>
                <div className="pse-info-value mono">{product.productId}</div>
              </div>
              <div className="pse-info-cell">
                <div className="pse-info-label">SKU ID</div>
                <div className="pse-info-value mono">{product.skuId}</div>
              </div>
              <div className="pse-info-cell full">
                <div className="pse-info-label">Product Name</div>
                <div className="pse-info-value">{product.productName}</div>
              </div>
              <div className="pse-info-cell">
                <div className="pse-info-label">{isPurchase ? 'Purchase Price' : 'Sales Price'}</div>
                <div className={`pse-info-value ${isPurchase ? 'green' : 'red'}`}>
                  ₹{isPurchase ? product.purchasePrice : product.salesPrice}
                </div>
              </div>
              <div className="pse-info-cell">
                <div className="pse-info-label">Current Stock</div>
                <div className="pse-info-value" style={{ fontWeight: 700 }}>{product.stock}</div>
              </div>
              <div className="pse-info-cell full">
                <div className="pse-info-label">Reorder Level</div>
                <div className="pse-info-value">{product.reorderLevel}</div>
              </div>
            </div>

            <div className="pse-divider" />

            {/* ── Transaction ID ── */}
            <div className="pse-field">
              <label className="pse-label">Transaction ID</label>
              <input className="pse-input" value={newId} readOnly />
            </div>

            {/* ── Date ── */}
            <div className="pse-field">
              <label className="pse-label">Transaction Date</label>
              <input
                className="pse-input"
                type="date"
                value={tdate}
                onChange={e => setTdate(e.target.value)}
              />
            </div>

            {/* ── Quantity ── */}
            <div className="pse-field">
              <label className="pse-label">
                {isPurchase ? 'Enter Purchased Quantity' : 'Enter Issued Quantity'}
              </label>
              <input
                className={`pse-input ${fieldError ? 'pse-input-error' : ''}`}
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={handleQuantityChange}
              />
              {fieldError && (
                <div className="pse-field-error">
                  ⚠️ {fieldError}
                </div>
              )}
            </div>

            {/* ── Transaction value ── */}
            {transValue !== null && (
              <div className="pse-trans-value">
                <span className="pse-trans-value-icon">🧾</span>
                <div>
                  <div className="pse-trans-value-label">Transaction Value</div>
                  <div className="pse-trans-value-amount">₹{transValue.toLocaleString()}</div>
                </div>
              </div>
            )}

            {/* ── Reorder warning ── */}
            {warns && (
              <div className="pse-warn">
                <span className="pse-warn-icon">⚠️</span>
                <div>
                  <div className="pse-warn-title">Reorder Level Reached</div>
                  <div className="pse-warn-sub">{warns}</div>
                </div>
              </div>
            )}

            {/* ── API error ── */}
            {apiError && (
              <div className="pse-banner-error">
                <span className="pse-banner-error-icon">❌</span>
                <div>
                  <div className="pse-banner-error-title">Update Failed</div>
                  <div className="pse-banner-error-sub">{apiError}</div>
                </div>
              </div>
            )}

            {/* ── Success ── */}
            {success && (
              <div className="pse-success">
                <span className="pse-success-icon">✅</span>
                <div>
                  <div className="pse-success-text">Inventory updated successfully!</div>
                  <div className="pse-success-sub">Redirecting to product list in 4 seconds…</div>
                </div>
              </div>
            )}

            {/* ── Buttons ── */}
            <div className="pse-btn-row">
              <button
                className={isPurchase ? 'pse-btn-save-in' : 'pse-btn-save-out'}
                onClick={stockEdit}
                type="button"
              >
                {isPurchase ? '📥 Save Purchase' : '📤 Save Issue'}
              </button>
              <button className="pse-btn-reset" onClick={() => { setQuantity(''); setFieldError(''); setApiError(''); setTransValue(null); setWarns(null); }} type="button">
                Reset
              </button>
              <button className="pse-btn-return" onClick={() => navigate('/product-repo')} type="button">
                ← Return
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProductStockEdit;