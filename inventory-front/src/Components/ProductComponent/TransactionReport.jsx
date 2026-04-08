import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTransactionsByType } from '../../Services/TransactionService';
import { getRole } from '../../Services/LoginService';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .tr-root {
    min-height: 100vh;
    background: #8775e1;
    font-family: 'DM Sans', sans-serif;
    padding: 32px 28px;
  }

  /* ── Header ── */
  .tr-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 14px;
  }
  .tr-title {
    font-size: 2rem;
    font-weight: 700;
    color: #1a1d2e;
    letter-spacing: -0.5px;
  }
  .tr-title span.in  { color: #213c2e; }
  .tr-title span.out { color: #240303; }

  /* ── Badge next to title ── */
  .tr-type-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 14px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.4px;
    margin-left: 14px;
    vertical-align: middle;
  }
  .tr-type-badge.in  { background: #e6f9f0; color: #1a8a52; border: 1px solid #b3ecd4; }
  .tr-type-badge.out { background: #fff0f0; color: #d63030; border: 1px solid #ffc5c5; }

  /* ── Return btn ── */
  .tr-return-btn {
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
  .tr-return-btn:hover {
    background: #2d3250;
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(0,0,0,0.18);
  }

  /* ── Summary strip ── */
  .tr-summary {
    display: flex;
    gap: 16px;
    margin-bottom: 22px;
    flex-wrap: wrap;
  }
  .tr-stat {
    background: #f8f9fd;
    border: 1px solid #eef0f8;
    border-radius: 12px;
    padding: 14px 22px;
    min-width: 140px;
  }
  .tr-stat-label {
    font-size: 0.78rem;
    color: #9099b5;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }
  .tr-stat-value {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1a1d2e;
  }

  /* ── Card ── */
  .tr-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 24px rgba(30,35,70,0.10);
    border: 1px solid #eef0f8;
    overflow: hidden;
  }

  /* ── Table ── */
  .tr-table-wrap { overflow-x: auto; }
  .tr-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
  }
  .tr-table thead {
    background: #1a1d2e;
    color: #fff;
  }
  .tr-table thead th {
    padding: 16px 18px;
    text-align: left;
    font-weight: 600;
    font-size: 0.88rem;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .tr-table tbody tr {
    border-bottom: 1px solid #eef0f8;
    transition: background 0.15s;
  }
  .tr-table tbody tr:hover { background: #f7f8fd; }
  .tr-table td {
    padding: 15px 18px;
    color: #3a3f5c;
    vertical-align: middle;
    white-space: nowrap;
    font-size: 1rem;
  }
  .tr-mono {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.88rem;
    color: #6b7399;
  }
  .tr-value {
    font-weight: 700;
    color: #1a1d2e;
  }
  .tr-date {
    font-size: 0.9rem;
    color: #6b7399;
  }

  /* ── Field highlight classes ── */
.tr-id-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82rem;
  font-weight: 700;
  color: #4f6ef7;
  background: #eef1fd;
  padding: 3px 9px;
  border-radius: 6px;
  border: 1px solid #c5cef9;
  display: inline-block;
}

.tr-product-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82rem;
  font-weight: 700;
  color: #7c3aed;
  background: #f3f0ff;
  padding: 3px 9px;
  border-radius: 6px;
  border: 1px solid #d4bbfc;
  display: inline-block;
}

.tr-rate-cell {
  font-weight: 600;
  color: #b05f00;
  background: #fff8ec;
  padding: 3px 9px;
  border-radius: 6px;
  border: 1px solid #fde8b0;
  display: inline-block;
}

.tr-qty-cell {
  font-size: 1.05rem;
  font-weight: 700;
  color: #1a8a52;
  background: #e6f9f0;
  padding: 3px 10px;
  border-radius: 6px;
  border: 1px solid #b3ecd4;
  display: inline-block;
}

.tr-value-cell {
  font-size: 1rem;
  font-weight: 700;
  color: #145a32;
  background: #d4edda;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid #a3d9b1;
  display: inline-block;
}

.tr-user-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82rem;
  font-weight: 600;
  color: #0d6e8a;
  background: #e0f7fc;
  padding: 3px 9px;
  border-radius: 6px;
  border: 1px solid #b2ebf2;
  display: inline-block;
}

.tr-date-cell {
  font-size: 0.88rem;
  font-weight: 600;
  color: #5a4a8a;
  background: #f0ecff;
  padding: 3px 9px;
  border-radius: 6px;
  border: 1px solid #d4bbfc;
  display: inline-block;
}

  /* ── Empty state ── */
  .tr-empty {
    text-align: center;
    padding: 56px 24px;
    color: #9099b5;
    font-size: 1.05rem;
  }

  /* ── Footer ── */
  .tr-footer {
    padding: 16px 22px;
    border-top: 1px solid #eef0f8;
    font-size: 0.95rem;
    color: #9099b5;
  }
`;

const TransactionReport = () => {
  const [transactions, setTransactions] = useState([]);
  const [role, setRole]                 = useState('');
  const [flag, setFlag]                 = useState('');

  const navigate = useNavigate();
  const param    = useParams();

  useEffect(() => {
    getRole().then(res => setRole(res.data));
    getTransactionsByType(param.pid).then(res => {
      setTransactions(res.data);
      setFlag(param.pid);
    });
  }, []);

  const returnBack = () => {
    role === 'Admin' ? navigate('/admin-menu') : navigate('/manager-menu');
  };

  const isPurchase = flag === 'IN';

  // Summary stats
  const totalQty   = transactions.reduce((sum, t) => sum + (t.quantity || 0), 0);
  const totalValue = transactions.reduce((sum, t) => sum + (t.transactionValue || 0), 0);

  return (
    <>
      <style>{styles}</style>
      <div className="tr-root">

        {/* ── Header ── */}
        <div className="tr-header">
          <h2 className="tr-title">
            {isPurchase ? (
              <><span className="in">Purchase</span> Report</>
            ) : (
              <><span className="out">Issue</span> Report</>
            )}
            <span className={`tr-type-badge ${isPurchase ? 'in' : 'out'}`}>
              {isPurchase ? '📥 Stock IN' : '📤 Stock OUT'}
            </span>
          </h2>

          <button className="tr-return-btn" onClick={returnBack}>← Return</button>
        </div>

        {/* ── Summary strip ── */}
        <div className="tr-summary">
          <div className="tr-stat">
            <div className="tr-stat-label">Total Transactions</div>
            <div className="tr-stat-value">{transactions.length}</div>
          </div>
          <div className="tr-stat">
            <div className="tr-stat-label">Total Quantity</div>
            <div className="tr-stat-value">{totalQty.toLocaleString()}</div>
          </div>
          <div className="tr-stat">
            <div className="tr-stat-label">Total Value</div>
            <div className="tr-stat-value">₹{totalValue.toLocaleString()}</div>
          </div>
        </div>

        {/* ── Table Card ── */}
        <div className="tr-card">
          <div className="tr-table-wrap">
            <table className="tr-table">
              <thead>
                <tr>
                  <th style={{textAlign: 'center'}}>Transaction ID</th>
                  <th style={{textAlign: 'center'}}>Product ID</th>
                  <th style={{textAlign: 'center'}}>Rate</th>
                  <th style={{textAlign: 'center'}}>Quantity</th>
                  <th style={{textAlign: 'center'}}>Transaction Value</th>
                  <th style={{textAlign: 'center'}}>User ID</th>
                  <th style={{textAlign: 'center'}}>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="tr-empty">📋 No transactions found.</div>
                    </td>
                  </tr>
                ) : (
                  transactions.map(transaction => (
                    <tr key={transaction.transactionId}>
  <td><span className="tr-id-badge">{transaction.transactionId}</span></td>
  <td><span className="tr-product-badge">{transaction.productId}</span></td>
  <td><span className="tr-rate-cell">₹{transaction.rate}</span></td>
  <td><span className="tr-qty-cell">{transaction.quantity}</span></td>
  <td><span className="tr-value-cell">₹{transaction.transactionValue?.toLocaleString()}</span></td>
  <td><span className="tr-user-badge">{transaction.userId}</span></td>
  <td><span className="tr-date-cell">{transaction.transactionDate}</span></td>
</tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="tr-footer">
            {transactions.length} record{transactions.length !== 1 ? 's' : ''} found
          </div>
        </div>

      </div>
    </>
  );
};

export default TransactionReport;