import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductWiseTotalSale } from '../../Services/TransactionService';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ppa-root {
    min-height: 100vh;
    background: #eeecf8;
    font-family: 'DM Sans', sans-serif;
    padding: 36px 28px;
  }

  /* ── Header ── */
  .ppa-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
    flex-wrap: wrap;
    gap: 14px;
  }
  .ppa-title-block {}
  .ppa-title {
    font-size: 2rem;
    font-weight: 700;
    color: #1a1d2e;
    letter-spacing: -0.5px;
  }
  .ppa-title span { color: #6c3fe0; }
  .ppa-subtitle { font-size: 0.95rem; color: #9099b5; margin-top: 4px; }

  .ppa-return-btn {
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
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .ppa-return-btn:hover {
    background: #2d3250;
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(0,0,0,0.18);
  }

  /* ── Summary stat strip ── */
  .ppa-stats {
    display: flex;
    gap: 16px;
    margin-bottom: 28px;
    flex-wrap: wrap;
  }
  .ppa-stat {
    background: #fff;
    border: 1px solid #e8e4f8;
    border-radius: 14px;
    padding: 16px 24px;
    min-width: 160px;
    box-shadow: 0 2px 12px rgba(80,60,180,0.07);
  }
  .ppa-stat-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #9099b5;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }
  .ppa-stat-value {
    font-size: 1.45rem;
    font-weight: 700;
    color: #1a1d2e;
  }
  .ppa-stat-value.purple { color: #6c3fe0; }

  /* ── Grid layout ── */
  .ppa-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;
  }
  @media (max-width: 768px) {
    .ppa-grid { grid-template-columns: 1fr; }
  }

  /* ── Card base ── */
  .ppa-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 24px rgba(80,60,180,0.09);
    border: 1px solid #e8e4f8;
    overflow: hidden;
  }
  .ppa-card-header {
    padding: 18px 22px 16px;
    border-bottom: 1px solid #eef0f8;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ppa-card-header-icon {
    width: 36px; height: 36px;
    border-radius: 9px;
    background: linear-gradient(135deg, #6c3fe0, #a855f7);
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
  }
  .ppa-card-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #1a1d2e;
  }

  /* ── Table ── */
  .ppa-table-wrap { overflow-x: auto; }
  .ppa-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
  }
  .ppa-table thead {
    background: #1a1d2e;
    color: #fff;
  }
  .ppa-table thead th {
    padding: 13px 18px;
    text-align: left;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .ppa-table tbody tr {
    border-bottom: 1px solid #eef0f8;
    transition: background 0.15s;
  }
  .ppa-table tbody tr:hover { background: #f7f6fd; }
  .ppa-table td {
    padding: 13px 18px;
    color: #3a3f5c;
    font-size: 1rem;
    vertical-align: middle;
  }
  .ppa-table td:first-child { font-weight: 600; color: #1a1d2e; }
  .ppa-table td:last-child  { font-weight: 700; color: #6c3fe0; font-size: 1rem; }

  /* ── Color dot next to product name ── */
  .ppa-dot-cell { display: flex; align-items: center; gap: 10px; }
  .ppa-dot {
    width: 11px; height: 11px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* ── Rank badge ── */
  .ppa-rank {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px; height: 24px;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 700;
    background: #f0eef8;
    color: #6c3fe0;
    flex-shrink: 0;
  }
  .ppa-rank.top { background: #6c3fe0; color: #fff; }

  /* ── Chart card ── */
  .ppa-chart-body {
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .ppa-chart-wrap {
    width: 100%;
    max-width: 280px;
  }

  /* ── Empty state ── */
  .ppa-empty {
    text-align: center;
    padding: 48px 24px;
    color: #9099b5;
    font-size: 1rem;
  }

  /* ── Error banner ── */
  .ppa-error {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: #fff0f0;
    border: 1.5px solid #ffc5c5;
    border-radius: 12px;
    padding: 16px 20px;
    margin-bottom: 24px;
  }
  .ppa-error-title { font-size: 0.95rem; font-weight: 700; color: #c0392b; }
  .ppa-error-sub   { font-size: 0.85rem; color: #e07070; margin-top: 3px; }

  /* ── Footer card ── */
  .ppa-footer {
    padding: 16px 22px;
    border-top: 1px solid #eef0f8;
    font-size: 0.9rem;
    color: #9099b5;
    text-align: right;
  }
`;

const COLORS = [
  '#6c3fe0', '#a855f7', '#1a8a52', '#34d399',
  '#f59e0b', '#ef4444', '#3b82f6', '#ec4899',
  '#14b8a6', '#f97316',
];

const ProductPieAnalysis = () => {
  const navigate = useNavigate();
  const [productSale, setProductSale] = useState([]);
  const [loadError, setLoadError]     = useState('');

  useEffect(() => {
    getProductWiseTotalSale()
      .then(res => setProductSale(res.data))
      .catch(err => setLoadError('Failed to load sales data. Please try again. ' + err));
  }, []);

  // Sort descending by sale value for ranking
  const sorted = [...productSale].sort((a, b) => b.totalSaleValue - a.totalSaleValue);
  const totalSales = productSale.reduce((s, p) => s + (p.totalSaleValue || 0), 0);

  const chartData = {
    labels: sorted.map(p => p.productName),
    datasets: [{
      data: sorted.map(p => p.totalSaleValue),
      backgroundColor: COLORS,
      borderColor: '#fff',
      borderWidth: 3,
      hoverOffset: 8,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false, // we have the table as legend
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const val = ctx.parsed;
            const pct = totalSales > 0 ? ((val / totalSales) * 100).toFixed(1) : 0;
            return ` ₹${Number(val).toLocaleString()} (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ppa-root">

        {/* ── Header ── */}
        <div className="ppa-header">
          <div className="ppa-title-block">
            <div className="ppa-title">
              <span>Sales</span> Analysis
            </div>
            <div className="ppa-subtitle">Product-wise total sales breakdown</div>
          </div>
          <button className="ppa-return-btn" onClick={() => navigate('/admin-menu')}>
            ← Return to Dashboard
          </button>
        </div>

        {/* ── Error ── */}
        {loadError && (
          <div className="ppa-error">
            <span style={{ fontSize: '1.2rem' }}>❌</span>
            <div>
              <div className="ppa-error-title">Failed to Load Data</div>
              <div className="ppa-error-sub">{loadError}</div>
            </div>
          </div>
        )}

        {/* ── Summary stats ── */}
        <div className="ppa-stats">
          <div className="ppa-stat">
            <div className="ppa-stat-label">Total Products</div>
            <div className="ppa-stat-value">{productSale.length}</div>
          </div>
          <div className="ppa-stat">
            <div className="ppa-stat-label">Total Sales Value</div>
            <div className="ppa-stat-value purple">₹{totalSales.toLocaleString()}</div>
          </div>
          {sorted.length > 0 && (
            <div className="ppa-stat">
              <div className="ppa-stat-label">Top Product</div>
              <div className="ppa-stat-value" style={{ fontSize: '1.1rem' }}>{sorted[0].productName}</div>
            </div>
          )}
        </div>

        {/* ── Main grid ── */}
        <div className="ppa-grid">

          {/* ── Table card ── */}
          <div className="ppa-card">
            <div className="ppa-card-header">
              <div className="ppa-card-header-icon">📊</div>
              <div className="ppa-card-title">Sales Summary</div>
            </div>
            <div className="ppa-table-wrap">
              {sorted.length === 0 ? (
                <div className="ppa-empty">📦 No sales data available.</div>
              ) : (
                <table className="ppa-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Sales Amount</th>
                      <th>Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((p, i) => (
                      <tr key={i}>
                        <td>
                          <span className={`ppa-rank ${i === 0 ? 'top' : ''}`}>{i + 1}</span>
                        </td>
                        <td>
                          <div className="ppa-dot-cell">
                            <span className="ppa-dot" style={{ background: COLORS[i % COLORS.length] }} />
                            {p.productName}
                          </div>
                        </td>
                        <td>₹{Number(p.totalSaleValue).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td style={{ color: '#9099b5', fontWeight: 600, fontSize: '0.9rem' }}>
                          {totalSales > 0 ? ((p.totalSaleValue / totalSales) * 100).toFixed(1) : 0}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="ppa-footer">{sorted.length} product{sorted.length !== 1 ? 's' : ''} · Total ₹{totalSales.toLocaleString()}</div>
          </div>

          {/* ── Chart card ── */}
          <div className="ppa-card">
            <div className="ppa-card-header">
              <div className="ppa-card-header-icon">🥧</div>
              <div className="ppa-card-title">Sales Distribution</div>
            </div>
            <div className="ppa-chart-body">
              {sorted.length === 0 ? (
                <div className="ppa-empty">No data to display.</div>
              ) : (
                <div className="ppa-chart-wrap">
                  <Pie data={chartData} options={chartOptions} />
                </div>
              )}
            </div>
            {/* Custom legend */}
            {sorted.length > 0 && (
              <div style={{ padding: '0 24px 22px', display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
                {sorted.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: '#3a3f5c', fontWeight: 500 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS[i % COLORS.length], display: 'inline-block', flexShrink: 0 }} />
                    {p.productName}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default ProductPieAnalysis;