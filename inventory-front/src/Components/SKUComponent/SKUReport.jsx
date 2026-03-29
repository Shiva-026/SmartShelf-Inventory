import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllSKUs, deleteSKUById } from "../../Services/SKUService";
import { getRole } from '../../Services/LoginService';
import '../../DisplayView.css';

const SKUReport = () => {
  let navigate = useNavigate();
  const [role, setRole] = useState("");
  const [skuList, setSkuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  let count = 1;

  const setRoleData = () => {
    getRole().then((response) => {
      setRole(response.data);
    });
  };

  const setSKURecords = () => {
    setLoading(true);
    getAllSKUs().then((response) => {
      setSkuList(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    setRoleData();
    setSKURecords();
  }, []);

  const returnBack = () => {
    if (role === 'Admin')
      navigate('/admin-menu');
    else if (role === 'Manager')
      navigate('/manager-menu');
  };

  const deleteSKU = (id) => {
    deleteSKUById(id).then(res => {
      let remainSkus = skuList.filter((sku) => (sku.skuId !== id));
      setSkuList(remainSkus);
      setDeleteConfirm(null);
      navigate('/sku-repo');
    });
  };

  const confirmDelete = (id) => {
    setDeleteConfirm(id);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.reportContainer}>
        {/* Header Section */}
        <div style={styles.headerSection}>
          <div style={styles.titleWrapper}>
            <h1 style={styles.title}>
              {role === 'Admin' ? 'Admin SKU List' : 'Manager SKU List'}
            </h1>
            <div style={styles.titleBadge}>
              Total SKUs: {skuList.length}
            </div>
          </div>
          <p style={styles.subtitle}>Manage and view all Stock Keeping Units</p>
        </div>

        {/* Table Section */}
        <div style={styles.tableWrapper}>
          {loading ? (
            <div style={styles.loadingState}>
              <div style={styles.loadingSpinner}></div>
              <p>Loading SKU data...</p>
            </div>
          ) : (
            <table style={styles.table}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.th}>No.</th>
                  <th style={styles.th}>SKU ID</th>
                  <th style={styles.th}>Description</th>
                  <th style={styles.th}>Category</th>
                  {role === 'Admin' && <th style={styles.th}>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {skuList.map((sku, index) => (
                  <tr key={sku.skuId} style={styles.tableRow}>
                    <td style={styles.td}>{index + 1}</td>
                    <td style={styles.td}>
                      <span style={styles.skuId}>{sku.skuId}</span>
                    </td>
                    <td style={styles.td}>{sku.skuDescription}</td>
                    <td style={styles.td}>
                      <span style={styles.categoryBadge}>{sku.category}</span>
                    </td>
                    {role === 'Admin' && (
                      <td style={styles.td}>
                        {deleteConfirm === sku.skuId ? (
                          <div style={styles.confirmBox}>
                            <span style={styles.confirmText}>Delete?</span>
                            <button
                              style={styles.confirmYesBtn}
                              onClick={() => deleteSKU(sku.skuId)}
                            >
                              Yes
                            </button>
                            <button
                              style={styles.confirmNoBtn}
                              onClick={cancelDelete}
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <div style={styles.actionButtons}>
                            <Link to={`/update-sku/${sku.skuId}`}>
                              <button
                                style={styles.updateBtn}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1557b0'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1e6df2'}
                              >
                                Update
                              </button>
                            </Link>
                            <button
                              style={styles.deleteBtn}
                              onClick={() => confirmDelete(sku.skuId)}
                              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
                              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
                {skuList.length === 0 && !loading && (
                  <tr>
                    <td colSpan={role === 'Admin' ? 5 : 4} style={styles.emptyState}>
                      <div style={styles.emptyContent}>
                        <span style={styles.emptyIcon}>📦</span>
                        <p style={styles.emptyText}>No SKU records found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer with Return Button */}
        <div style={styles.footerSection}>
          <button
            style={styles.returnBtn}
            onClick={returnBack}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#1557b0';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#1e6df2';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ← Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles object with blue color scheme
const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(145deg, #f0f7ff 0%, #e6f0fa 100%)',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  reportContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(30, 109, 242, 0.15)',
    overflow: 'hidden',
    border: '1px solid rgba(30, 109, 242, 0.1)',
  },
  headerSection: {
    background: 'linear-gradient(145deg, #1e4b8c 0%, #1e6df2 100%)',
    padding: '40px 40px',
    color: 'white',
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    flexWrap: 'wrap',
    gap: '15px',
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: '700',
    margin: '0',
    letterSpacing: '-0.01em',
  },
  titleBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '8px 20px',
    borderRadius: '30px',
    fontSize: '1rem',
    fontWeight: '600',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.3)',
  },
  subtitle: {
    fontSize: '1.1rem',
    opacity: '0.9',
    margin: '0',
  },
  tableWrapper: {
    padding: '30px',
    backgroundColor: 'white',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 8px',
  },
  tableHead: {
    backgroundColor: '#f8fafc',
  },
  th: {
    padding: '16px 20px',
    textAlign: 'left',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1e3e6e',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '2px solid #1e6df2',
  },
  tableRow: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    transition: 'all 0.3s',
    cursor: 'pointer',
  },
  td: {
    padding: '16px 20px',
    fontSize: '0.95rem',
    color: '#2d3748',
    borderBottom: '1px solid #e2e8f0',
  },
  skuId: {
    fontWeight: '600',
    color: '#1e6df2',
    backgroundColor: '#e6f0ff',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.9rem',
  },
  categoryBadge: {
    backgroundColor: '#e6f7ff',
    color: '#1e6df2',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '500',
    border: '1px solid #b8d9ff',
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  updateBtn: {
    padding: '8px 20px',
    backgroundColor: '#1e6df2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 2px 4px rgba(30, 109, 242, 0.2)',
  },
  deleteBtn: {
    padding: '8px 20px',
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 2px 4px rgba(220, 38, 38, 0.2)',
  },
  confirmBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#fee2e2',
    padding: '6px 12px',
    borderRadius: '8px',
    border: '1px solid #fecaca',
  },
  confirmText: {
    color: '#991b1b',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  confirmYesBtn: {
    padding: '4px 12px',
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  confirmNoBtn: {
    padding: '4px 12px',
    backgroundColor: '#9ca3af',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  loadingState: {
    textAlign: 'center',
    padding: '60px',
    color: '#1e3e6e',
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    margin: '0 auto 20px',
    border: '3px solid #e2e8f0',
    borderTop: '3px solid #1e6df2',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px',
  },
  emptyContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  emptyIcon: {
    fontSize: '3rem',
  },
  emptyText: {
    color: '#718096',
    fontSize: '1.1rem',
    margin: '0',
  },
  footerSection: {
    padding: '30px 40px',
    backgroundColor: '#f8fafc',
    borderTop: '1px solid #e2e8f0',
    textAlign: 'center',
  },
  returnBtn: {
    padding: '14px 40px',
    backgroundColor: '#1e6df2',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 8px 16px -4px rgba(30, 109, 242, 0.3)',
  },
};

// Add keyframes for spinner animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default SKUReport;