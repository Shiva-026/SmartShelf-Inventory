import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllProducts, deleteProductById } from '../../Services/ProductService';
import { getRole } from '../../Services/LoginService';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pr-root {
    min-height: 100vh;
    background: #9b98e4;
    font-family: 'DM Sans', sans-serif;
    padding: 32px 28px;
  }

  /* ── Header ── */
  .pr-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 14px;
  }
  .pr-title {
    font-size: 2rem;
    font-weight: 700;
    color: #1a1d2e;
    letter-spacing: -0.5px;
    //background: #afafbe;
  }
  .pr-title span { color: #2e4fe1; }

  /* ── Search ── */
  .pr-search-wrap {
    position: relative;
    flex: 1;
    max-width: 380px;
  }
  .pr-search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #9099b5;
    font-size: 16px;
    pointer-events: none;
  }
  .pr-search {
    width: 100%;
    padding: 11px 16px 11px 42px;
    border: 1.5px solid #dde1f0;
    border-radius: 10px;
    font-size: 1rem;
    font-family: 'DM Sans', sans-serif;
    background: #f8f9fd;
    color: #1a1d2e;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .pr-search:focus {
    border-color: #4f6ef7;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(79,110,247,0.12);
  }

  /* ── Return btn ── */
  .pr-return-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 11px 22px;
    background: #1a1d2e;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .pr-return-btn:hover { background: #2d3250; transform: translateY(-1px); }

  /* ── Card wrapper ── */
  .pr-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 24px rgba(30,35,70,0.10);
    border: 1px solid #eef0f8;
    overflow: hidden;
  }

  /* ── Table ── */
  .pr-table-wrap { overflow-x: auto; }
  .pr-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
  }
  .pr-table thead {
    background: #1a1d2e;
    color: #fff;
  }
  .pr-table thead th {
    padding: 16px 18px;
    text-align: left;
    font-weight: 600;
    font-size: 0.88rem;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .pr-table tbody tr {
    border-bottom: 1px solid #eef0f8;
    transition: background 0.15s;
  }
  .pr-table tbody tr:hover { background: #f7f8fd; }
  .pr-table tbody tr.pr-row-deleting { background: #fff5f5; }
  .pr-table td {
    padding: 15px 18px;
    color: #3a3f5c;
    vertical-align: middle;
    white-space: nowrap;
    font-size: 1rem;
  }

  .pr-sku-highlight {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.88rem;
  font-weight: 700;
  color: #2e4fe1;
  background: #eef1fd;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid #c5cef9;
  display: inline-block;
}

  /* ── Merged Stock + Reorder cell ── */
  .pr-stock-cell { line-height: 1.3; }
  .pr-stock-main {
    font-size: 1.15rem;
    font-weight: 700;
    color: #1a1d2e;
    display: block;
  }
  .pr-stock-min {
    font-size: 0.82rem;
    color: #9099b5;
    font-weight: 500;
    display: block;
    margin-top: 3px;
  }
  .pr-stock-min strong {
    color: #b05f00;
    font-weight: 700;
  }

  /* ── Status badges ── */
  .pr-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.88rem;
    font-weight: 600;
    letter-spacing: 0.3px;
  }
  .pr-badge-green {
    background: #e6f9f0;
    color: #1a8a52;
    border: 1px solid #b3ecd4;
  }
  .pr-badge-red {
    background: #fff0f0;
    color: #d63030;
    border: 1px solid #ffc5c5;
  }
  .pr-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
  }
  .pr-dot-green { background: #1a8a52; }
  .pr-dot-red   { background: #d63030; }

  /* ── Action buttons ── */
  .pr-actions { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }

  .pr-btn {
    padding: 7px 14px;
    border: none;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.15s, transform 0.15s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  .pr-btn:hover:not(:disabled) { opacity: 0.85; transform: translateY(-1px); }
  .pr-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .pr-btn-issue    { background: #fff3cd; color: #7a5800; }
  .pr-btn-purchase { background: #d4edda; color: #145a32; }
  .pr-btn-price    { background: #e2e3e5; color: #383d41; }
  .pr-btn-delete   { background: #ffe0e0; color: #c0392b; }
  .pr-btn-delete:hover:not(:disabled) { background: #ffc5c5; }

  /* ── Inline delete confirm ── */
  .pr-delete-confirm {
    display: flex;
    align-items: center;
    gap: 7px;
    background: #fff5f5;
    border: 1.5px solid #ffc5c5;
    border-radius: 9px;
    padding: 6px 12px;
    animation: pr-pop 0.15s ease;
  }
  @keyframes pr-pop {
    from { transform: scale(0.92); opacity: 0; }
    to   { transform: scale(1);    opacity: 1; }
  }
  .pr-delete-confirm span {
    font-size: 0.92rem;
    color: #c0392b;
    font-weight: 600;
    white-space: nowrap;
  }
  .pr-btn-confirm-yes {
    padding: 5px 12px;
    background: #c0392b;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s;
  }
  .pr-btn-confirm-yes:hover { background: #a93226; }
  .pr-btn-confirm-no {
    padding: 5px 12px;
    background: #eee;
    color: #444;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s;
  }
  .pr-btn-confirm-no:hover { background: #ddd; }

  /* ── Empty state ── */
  .pr-empty {
    text-align: center;
    padding: 56px 24px;
    color: #9099b5;
    font-size: 1.05rem;
  }

  /* ── Footer / Pagination ── */
  .pr-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 22px;
    border-top: 1px solid #eef0f8;
    flex-wrap: wrap;
    gap: 10px;
  }
  .pr-count {
    font-size: 0.95rem;
    color: #9099b5;
  }
  .pr-pages { display: flex; gap: 5px; }
  .pr-page-btn {
    width: 36px;
    height: 36px;
    border: 1.5px solid #dde1f0;
    border-radius: 8px;
    background: #fff;
    color: #3a3f5c;
    font-size: 0.92rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pr-page-btn:hover:not(:disabled) { background: #f0f2f7; }
  .pr-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .pr-page-btn.active {
    background: #4f6ef7;
    border-color: #4f6ef7;
    color: #fff;
  }
`;

const ProductReport = () => {
  const [products, setProducts]               = useState([]);
  const [role, setRole]                       = useState('');
  const [search, setSearch]                   = useState('');
  const [currentPage, setCurrentPage]         = useState(1);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    getRole().then(res => setRole(res.data));
    getAllProducts().then(res => setProducts(res.data));
  }, []);

  const handleDeleteClick  = (id) => setConfirmDeleteId(id);
  const handleDeleteCancel = ()   => setConfirmDeleteId(null);

  const handleDeleteConfirm = (id) => {
    deleteProductById(id)
      .then(() => {
        setProducts(prev => prev.filter(p => p.productId !== id));
        setConfirmDeleteId(null);
      })
      .catch(err => {
        alert('Could not delete product. It might be linked to transactions.');
        console.error(err);
        setConfirmDeleteId(null);
      });
  };

  const returnBack = () => {
    role === 'Admin' ? navigate('/admin-menu') : navigate('/manager-menu');
  };

  const filteredProducts = products.filter(p => {
    const term = search.toLowerCase();
    return (
      (p.productName?.toLowerCase() || '').includes(term) ||
      (p.skuId?.toLowerCase()       || '').includes(term) ||
      (p.vendorId?.toLowerCase()    || '').includes(term)
    );
  });

  const totalPages      = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfFirst    = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfFirst + itemsPerPage);

  const handleSearch = (e) => { setSearch(e.target.value); setCurrentPage(1); };

  return (
    <>
      <style>{styles}</style>
      <div className="pr-root">

        {/* ── Header ── */}
        <div className="pr-header">
          <h2 className="pr-title">
            {role === 'Admin'
              ? <><span>Admin</span> Product List</>
              : <><span>Manager</span> Product List</>}
          </h2>

          <div className="pr-search-wrap">
            <span className="pr-search-icon">🔍</span>
            <input
              className="pr-search"
              type="text"
              placeholder="       Search by name, SKU, vendor…"
              value={search}
              onChange={handleSearch}
            />
          </div>

          <button className="pr-return-btn" onClick={returnBack}>← Return</button>
        </div>

        {/* ── Table Card ── */}
        <div className="pr-card">
          <div className="pr-table-wrap">
            <table className="pr-table">
              <thead>
                <tr>
                  <th style={{textAlign: 'center'}}>Product ID</th>
                  <th style={{textAlign: 'center'}}>SKU</th>
                  <th style={{textAlign: 'center'}}>Product Name</th>
                  <th style={{textAlign: 'center'}}>Vendor</th>
                  <th style={{textAlign: 'center'}}>Purchase Price</th>
                  <th style={{textAlign: 'center'}}>Sales Price</th>
                  <th style={{textAlign: 'center'}}>Stock / Min Level</th>
                  <th style={{textAlign: 'center'}}>Status</th>
                  <th >Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.length === 0 ? (
                  <tr>
                    <td colSpan={9}>
                      <div className="pr-empty">📦 No products found.</div>
                    </td>
                  </tr>
                ) : (
                  currentProducts.map(product => {
                    const isDisabled   = !product.status;
                    const isConfirming = confirmDeleteId === product.productId;

                    return (
                      <tr key={product.productId} className={isConfirming ? 'pr-row-deleting' : ''}>
                        <td className="pr-mono">{product.productId}</td>
                        <td><span className="pr-sku-highlight">{product.skuId}</span></td>
                        <td style={{ fontWeight: 600, color: '#1a1d2e' }}>{product.productName}</td>
                        <td>{product.vendorId}</td>
                        <td>₹{product.purchasePrice}</td>
                        <td>₹{product.salesPrice}</td>

                        {/* ── Merged Stock + Reorder Level ── */}
                        <td>
                          <div className="pr-stock-cell">
                            <span className="pr-stock-main">{product.stock}</span>
                            <span className="pr-stock-min">
                              Min: <strong>{product.reorderLevel}</strong>
                            </span>
                          </div>
                        </td>

                        {/* ── Status ── */}
                        <td>
                          {product.status ? (
                            <span className="pr-badge pr-badge-green">
                              <span className="pr-dot pr-dot-green" /> Permitted
                            </span>
                          ) : (
                            <span className="pr-badge pr-badge-red">
                              <span className="pr-dot pr-dot-red" /> Reorder
                            </span>
                          )}
                        </td>

                        {/* ── Actions ── */}
                        <td>
                          {isConfirming ? (
                            <div className="pr-delete-confirm">
                              <span>Delete #{product.productId}?</span>
                              <button className="pr-btn-confirm-yes" onClick={() => handleDeleteConfirm(product.productId)}>Yes</button>
                              <button className="pr-btn-confirm-no"  onClick={handleDeleteCancel}>No</button>
                            </div>
                          ) : (
                            <div className="pr-actions">
                              <Link to={`/edit-stock/${product.productId}/2`}>
                                <button className="pr-btn pr-btn-issue" disabled={isDisabled}>📤 Issue</button>
                              </Link>
                              <Link to={`/edit-stock/${product.productId}/1`}>
                                <button className="pr-btn pr-btn-purchase">📥 Purchase</button>
                              </Link>
                              {role === 'Admin' && (
                                <>
                                  <Link to={`/edit-price/${product.productId}`}>
                                    <button className="pr-btn pr-btn-price">💲 Price</button>
                                  </Link>
                                  <button
                                    className="pr-btn pr-btn-delete"
                                    onClick={() => handleDeleteClick(product.productId)}
                                  >
                                    🗑 Delete
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* ── Footer / Pagination ── */}
          <div className="pr-footer">
            <span className="pr-count">
              Showing {Math.min(indexOfFirst + 1, filteredProducts.length)}–{Math.min(indexOfFirst + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </span>
            <div className="pr-pages">
              <button className="pr-page-btn" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`pr-page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >{page}</button>
              ))}
              <button className="pr-page-btn" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages || totalPages === 0}>›</button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ProductReport;