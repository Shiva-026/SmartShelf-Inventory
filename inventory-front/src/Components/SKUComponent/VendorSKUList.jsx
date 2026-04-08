import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSKUs } from '../../Services/SKUService';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .vs-root {
    min-height: 100vh;
    background: linear-gradient(135deg, #1a0a00 0%, #3d1f00 50%, #1a0a00 100%);
    font-family: 'DM Sans', sans-serif;
    padding: 32px 28px;
  }

  /* ── Header ── */
  .vs-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 14px;
  }
  .vs-title {
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.5px;
  }
  .vs-title span { color: #f97316; }

  .vs-badge {
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
  .vs-search-wrap {
    position: relative;
    flex: 1;
    max-width: 380px;
  }
  .vs-search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #f97316;
    font-size: 16px;
    pointer-events: none;
  }
  .vs-search {
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
  .vs-search::placeholder { color: rgba(255,255,255,0.35); }
  .vs-search:focus {
    border-color: #f97316;
    box-shadow: 0 0 0 3px rgba(249,115,22,0.18);
  }

  /* ── Return btn ── */
  .vs-return-btn {
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
  .vs-return-btn:hover { background: #ea6c0a; transform: translateY(-1px); }

  /* ── Card ── */
  .vs-card {
    background: rgba(255,255,255,0.04);
    border-radius: 16px;
    border: 1px solid rgba(249,115,22,0.2);
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }

  /* ── Table ── */
  .vs-table-wrap { overflow-x: auto; }
  .vs-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
  }
  .vs-table thead {
    background: rgba(249,115,22,0.18);
  }
  .vs-table thead th {
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
  .vs-table tbody tr {
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: background 0.15s;
  }
  .vs-table tbody tr:hover { background: rgba(249,115,22,0.07); }
  .vs-table td {
    padding: 15px 18px;
    color: #e5d5c5;
    vertical-align: middle;
    white-space: nowrap;
    font-size: 1rem;
  }

  /* ── Serial number ── */
  .vs-serial {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.35);
    font-weight: 500;
  }

  /* ── SKU ID pill ── */
  .vs-sku-pill {
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

  /* ── Category pill ── */
  .vs-cat-pill {
    font-size: 0.85rem;
    font-weight: 600;
    color: #f97316;
    background: rgba(249,115,22,0.12);
    border: 1px solid rgba(249,115,22,0.3);
    padding: 4px 12px;
    border-radius: 20px;
    display: inline-block;
  }

  /* ── Description ── */
  .vs-desc {
    color: #c9b8a8;
    font-size: 0.95rem;
  }

  /* ── Empty ── */
  .vs-empty {
    text-align: center;
    padding: 56px 24px;
    color: rgba(255,255,255,0.3);
    font-size: 1.05rem;
  }

  /* ── Footer ── */
  .vs-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 22px;
    border-top: 1px solid rgba(249,115,22,0.15);
    flex-wrap: wrap;
    gap: 10px;
  }
  .vs-count {
    font-size: 0.95rem;
    color: rgba(255,255,255,0.4);
  }
  .vs-pages { display: flex; gap: 5px; }
  .vs-page-btn {
    width: 36px;
    height: 36px;
    border: 1.5px solid rgba(249,115,22,0.3);
    border-radius: 8px;
    background: transparent;
    color: #e5d5c5;
    font-size: 0.92rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .vs-page-btn:hover:not(:disabled) { background: rgba(249,115,22,0.15); border-color: #f97316; }
  .vs-page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .vs-page-btn.active {
    background: #f97316;
    border-color: #f97316;
    color: #fff;
  }
`;

const VendorSKUList = () => {
  const [skuList, setSkuList]     = useState([]);
  const [search, setSearch]       = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    getAllSKUs().then(res => setSkuList(res.data));
  }, []);

  const filtered = skuList.filter(s => {
    const t = search.toLowerCase();
    return (
      (s.skuId?.toLowerCase()          || '').includes(t) ||
      (s.category?.toLowerCase()       || '').includes(t) ||
      (s.skuDescription?.toLowerCase() || '').includes(t)
    );
  });

  const totalPages   = Math.ceil(filtered.length / itemsPerPage);
  const indexOfFirst = (currentPage - 1) * itemsPerPage;
  const current      = filtered.slice(indexOfFirst, indexOfFirst + itemsPerPage);

  const handleSearch = (e) => { setSearch(e.target.value); setCurrentPage(1); };

  return (
    <>
      <style>{styles}</style>
      <div className="vs-root">

        {/* Header */}
        <div className="vs-header">
          <h2 className="vs-title">
            <span>Vendor</span> SKU List
            <span className="vs-badge">{skuList.length} SKUs</span>
          </h2>

          <div className="vs-search-wrap">
            <span className="vs-search-icon">🔍</span>
            <input
              className="vs-search"
              type="text"
              placeholder="     Search by SKU, category, description…"
              value={search}
              onChange={handleSearch}
            />
          </div>

          <button className="vs-return-btn" onClick={() => navigate('/vendor-menu')}>
            ← Return
          </button>
        </div>

        {/* Table Card */}
        <div className="vs-card">
          <div className="vs-table-wrap">
            <table className="vs-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>SKU ID</th>
                  <th>Category</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {current.length === 0 ? (
                  <tr>
                    <td colSpan={4}>
                      <div className="vs-empty">🏷️ No SKUs found.</div>
                    </td>
                  </tr>
                ) : (
                  current.map((sku, idx) => (
                    <tr key={sku.skuId}>
                      <td><span className="vs-serial">{indexOfFirst + idx + 1}</span></td>
                      <td><span className="vs-sku-pill">{sku.skuId}</span></td>
                      <td><span className="vs-cat-pill">{sku.category}</span></td>
                      <td><span className="vs-desc">{sku.skuDescription}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="vs-footer">
            <span className="vs-count">
              Showing {Math.min(indexOfFirst + 1, filtered.length)}–{Math.min(indexOfFirst + itemsPerPage, filtered.length)} of {filtered.length} SKU{filtered.length !== 1 ? 's' : ''}
            </span>
            <div className="vs-pages">
              <button className="vs-page-btn" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`vs-page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >{page}</button>
              ))}
              <button className="vs-page-btn" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages || totalPages === 0}>›</button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default VendorSKUList;