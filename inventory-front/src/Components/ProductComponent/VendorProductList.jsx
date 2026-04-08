import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../Services/ProductService';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .vp-root {
    min-height: 100vh;
    background: linear-gradient(135deg, #1a0a00 0%, #3d1f00 50%, #1a0a00 100%);
    font-family: 'DM Sans', sans-serif;
    padding: 32px 28px;
  }

  /* ── Header ── */
  .vp-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 14px;
  }
  .vp-title {
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.5px;
  }
  .vp-title span { color: #f97316; }

  .vp-badge {
    display: inline-block;
    background: rgba(249,115,22,0.15);
    color: #f97316;
    border: 1px solid rgba(249,115,22,0.35);
    border-radius: 20px;
    padding: 5px 16px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-left: 14px;
    vertical-align: middle;
  }

  /* ── Search ── */
  .vp-search-wrap {
    position: relative;
    flex: 1;
    max-width: 380px;
  }
  .vp-search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #f97316;
    pointer-events: none;
  }
  .vp-search {
    width: 100%;
    padding: 11px 16px 11px 42px;
    border: 1.5px solid rgba(249,115,22,0.3);
    border-radius: 10px;
    font-size: 1rem;
    font-family: 'DM Sans', sans-serif;
    background: rgba(255,255,255,0.07);
    color: #fff;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .vp-search::placeholder { color: rgba(255,255,255,0.35); }
  .vp-search:focus {
    border-color: #f97316;
    box-shadow: 0 0 0 3px rgba(249,115,22,0.18);
  }

  /* ── Return btn ── */
  .vp-return-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 11px 22px;
    background: #f97316;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .vp-return-btn:hover { background: #ea6c0a; transform: translateY(-1px); }

  /* ── Card ── */
  .vp-card {
    background: rgba(255,255,255,0.04);
    border-radius: 16px;
    border: 1px solid rgba(249,115,22,0.2);
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }

  /* ── Table ── */
  .vp-table-wrap { overflow-x: auto; }
  .vp-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
  }
  .vp-table thead {
    background: rgba(249,115,22,0.18);
  }
  .vp-table thead th {
    padding: 16px 18px;
    text-align: left;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.7px;
    text-transform: uppercase;
    color: #f97316;
    white-space: nowrap;
    border-bottom: 2px solid rgba(249,115,22,0.3);
  }
  .vp-table tbody tr {
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: background 0.15s;
  }
  .vp-table tbody tr:hover { background: rgba(249,115,22,0.07); }
  .vp-table td {
    padding: 15px 18px;
    color: #e5d5c5;
    vertical-align: middle;
    white-space: nowrap;
    font-size: 1rem;
  }

  /* ── SKU pill ── */
  .vp-sku-pill {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    font-weight: 700;
    color: #fff;
    background: rgba(249,115,22,0.25);
    border: 1px solid rgba(249,115,22,0.5);
    padding: 4px 10px;
    border-radius: 8px;
    display: inline-block;
    letter-spacing: 0.5px;
  }

  /* ── Product info cell ── */
  .vp-product-name {
    font-weight: 700;
    color: #fff;
    font-size: 1rem;
    display: block;
  }
  .vp-vendor-tag {
    font-size: 0.78rem;
    color: rgba(249,115,22,0.8);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin-top: 3px;
    display: block;
  }

  /* ── Price ── */
  .vp-price {
    font-weight: 600;
    color: #fbbf24;
    font-size: 1rem;
  }

  /* ── Stock ── */
  .vp-stock-main {
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    display: block;
  }
  .vp-stock-min {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.4);
    display: block;
    margin-top: 2px;
  }
  .vp-stock-min strong { color: #f97316; }

  /* ── Status badges ── */
  .vp-status-green {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 700;
    background: rgba(26,138,82,0.15);
    color: #4ade80;
    border: 1px solid rgba(74,222,128,0.3);
  }
  .vp-status-red {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 700;
    background: rgba(214,48,48,0.12);
    color: #f87171;
    border: 1px solid rgba(248,113,113,0.3);
  }
  .vp-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
  }
  .vp-dot-green { background: #4ade80; }
  .vp-dot-red   { background: #f87171; }

  /* ── Empty ── */
  .vp-empty {
    text-align: center;
    padding: 56px 24px;
    color: rgba(255,255,255,0.3);
    font-size: 1.05rem;
  }

  /* ── Footer ── */
  .vp-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 22px;
    border-top: 1px solid rgba(249,115,22,0.15);
    flex-wrap: wrap;
    gap: 10px;
  }
  .vp-count { font-size: 0.95rem; color: rgba(255,255,255,0.4); }
  .vp-pages { display: flex; gap: 5px; }
  .vp-page-btn {
    width: 36px; height: 36px;
    border: 1.5px solid rgba(249,115,22,0.3);
    border-radius: 8px;
    background: transparent;
    color: #e5d5c5;
    font-size: 0.92rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.15s;
    display: flex; align-items: center; justify-content: center;
  }
  .vp-page-btn:hover:not(:disabled) { background: rgba(249,115,22,0.15); border-color: #f97316; }
  .vp-page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .vp-page-btn.active { background: #f97316; border-color: #f97316; color: #fff; }
`;

const VendorProductList = () => {
  const [products, setProducts]       = useState([]);
  const [search, setSearch]           = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts().then(res => setProducts(res.data));
  }, []);

  const filtered = products.filter(p => {
    const t = search.toLowerCase();
    return (
      (p.productName?.toLowerCase() || '').includes(t) ||
      (p.skuId?.toLowerCase()       || '').includes(t) ||
      (p.vendorId?.toLowerCase()    || '').includes(t)
    );
  });

  const totalPages   = Math.ceil(filtered.length / itemsPerPage);
  const indexOfFirst = (currentPage - 1) * itemsPerPage;
  const current      = filtered.slice(indexOfFirst, indexOfFirst + itemsPerPage);

  const handleSearch = (e) => { setSearch(e.target.value); setCurrentPage(1); };

  return (
    <>
      <style>{styles}</style>
      <div className="vp-root">

        {/* Header */}
        <div className="vp-header">
          <h2 className="vp-title">
            <span>Vendor</span> Product List
            <span className="vp-badge">{products.length} Products</span>
          </h2>

          <div className="vp-search-wrap">
            <span className="vp-search-icon">🔍</span>
            <input
              className="vp-search"
              type="text"
              placeholder="      Search by name, SKU, vendor…"
              value={search}
              onChange={handleSearch}
            />
          </div>

          <button className="vp-return-btn" onClick={() => navigate('/vendor-menu')}>
            ← Return
          </button>
        </div>

        {/* Table Card */}
        <div className="vp-card">
          <div className="vp-table-wrap">
            <table className="vp-table">
              <thead>
                <tr>
                  <th>SKU ID</th>
                  <th>Product Info</th>
                  <th>Purchase (IN)</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {current.length === 0 ? (
                  <tr>
                    <td colSpan={5}>
                      <div className="vp-empty">📦 No products found.</div>
                    </td>
                  </tr>
                ) : (
                  current.map(product => (
                    <tr key={product.productId}>
                      <td><span className="vp-sku-pill">{product.skuId}</span></td>
                      <td>
                        <span className="vp-product-name">{product.productName}</span>
                        <span className="vp-vendor-tag">Vendor: {product.vendorId}</span>
                      </td>
                      <td><span className="vp-price">₹{product.purchasePrice}</span></td>
                      <td>
                        <span className="vp-stock-main">{product.stock}</span>
                        <span className="vp-stock-min">Min: <strong>{product.reorderLevel}</strong></span>
                      </td>
                      <td>
                        {product.status ? (
                          <span className="vp-status-green">
                            <span className="vp-dot vp-dot-green" /> Permitted
                          </span>
                        ) : (
                          <span className="vp-status-red">
                            <span className="vp-dot vp-dot-red" /> Reorder
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="vp-footer">
            <span className="vp-count">
              Showing {Math.min(indexOfFirst + 1, filtered.length)}–{Math.min(indexOfFirst + itemsPerPage, filtered.length)} of {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </span>
            <div className="vp-pages">
              <button className="vp-page-btn" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`vp-page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >{page}</button>
              ))}
              <button className="vp-page-btn" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages || totalPages === 0}>›</button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default VendorProductList;