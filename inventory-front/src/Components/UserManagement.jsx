import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../Services/LoginService';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .um-root {
    min-height: 100vh;
    background: #eeecf8;
    font-family: 'DM Sans', sans-serif;
    padding: 36px 28px;
  }

  /* ── Header ── */
  .um-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 14px;
  }
  .um-title {
    font-size: 2rem;
    font-weight: 700;
    color: #1a1d2e;
    letter-spacing: -0.5px;
  }
  .um-title span { color: #4f6ef7; }
  .um-subtitle { font-size: 0.95rem; color: #9099b5; margin-top: 4px; }

  /* ── Search ── */
  .um-search-wrap {
    position: relative;
    flex: 1;
    max-width: 360px;
  }
  .um-search-icon {
    position: absolute;
    left: 14px; top: 50%;
    transform: translateY(-50%);
    color: #9099b5; font-size: 16px;
    pointer-events: none;
  }
  .um-search {
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
  .um-search:focus {
    border-color: #4f6ef7;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(79,110,247,0.12);
  }

  /* ── Return btn ── */
  .um-return-btn {
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
  .um-return-btn:hover {
    background: #2d3250;
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(0,0,0,0.18);
  }

  /* ── Stat strip ── */
  .um-stats {
    display: flex;
    gap: 14px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }
  .um-stat {
    background: #fff;
    border: 1px solid #e8e4f8;
    border-radius: 12px;
    padding: 14px 22px;
    min-width: 140px;
    box-shadow: 0 2px 10px rgba(80,60,180,0.06);
  }
  .um-stat-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #9099b5;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 5px;
  }
  .um-stat-value {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1a1d2e;
  }
  .um-stat-value.blue   { color: #4f6ef7; }
  .um-stat-value.green  { color: #1a8a52; }
  .um-stat-value.orange { color: #d97706; }
  .um-stat-value.purple { color: #7c3aed; }

  /* ── Filter tabs ── */
  .um-filters {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  .um-filter-btn {
    padding: 7px 16px;
    border-radius: 20px;
    border: 1.5px solid #dde1f0;
    background: #fff;
    color: #6b7399;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
  }
  .um-filter-btn:hover { background: #f0eef8; border-color: #b8aeee; }
  .um-filter-btn.active {
    background: #4f6ef7;
    border-color: #4f6ef7;
    color: #fff;
  }

  /* ── Card ── */
  .um-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 24px rgba(30,35,70,0.09);
    border: 1px solid #eef0f8;
    overflow: hidden;
  }

  /* ── Table ── */
  .um-table-wrap { overflow-x: auto; }
  .um-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
  }
  .um-table thead {
    background: #1a1d2e;
    color: #fff;
  }
  .um-table thead th {
    padding: 16px 18px;
    text-align: left;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .um-table tbody tr {
    border-bottom: 1px solid #eef0f8;
    transition: background 0.15s;
  }
  .um-table tbody tr:hover { background: #f7f8fd; }
  .um-table td {
    padding: 15px 18px;
    color: #3a3f5c;
    font-size: 1rem;
    vertical-align: middle;
    white-space: nowrap;
  }

  /* ── Avatar ── */
  .um-avatar {
    width: 38px; height: 38px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem; font-weight: 700;
    flex-shrink: 0;
    color: #fff;
  }

  /* ── User cell ── */
  .um-user-cell {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .um-user-name {
    font-weight: 600;
    color: #1a1d2e;
    font-size: 1rem;
  }
  .um-user-id {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    color: #9099b5;
    margin-top: 2px;
  }

  /* ── Email cell ── */
  .um-email {
    font-size: 0.95rem;
    color: #6b7399;
  }

  /* ── Role badge ── */
  .um-role-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    white-space: nowrap;
  }
  .um-role-admin   { background: #ede9fe; color: #6d28d9; border: 1px solid #c4b5fd; }
  .um-role-manager { background: #dbeafe; color: #1d4ed8; border: 1px solid #93c5fd; }
  .um-role-vendor  { background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; }
  .um-role-default { background: #f3f4f6; color: #4b5563; border: 1px solid #d1d5db; }

  /* ── Empty state ── */
  .um-empty {
    text-align: center;
    padding: 56px 24px;
    color: #9099b5;
    font-size: 1rem;
  }
  .um-empty-icon { font-size: 2.5rem; margin-bottom: 12px; }

  /* ── Error banner ── */
  .um-error {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: #fff0f0;
    border: 1.5px solid #ffc5c5;
    border-radius: 12px;
    padding: 16px 20px;
    margin-bottom: 22px;
    animation: um-fadein 0.25s ease;
  }
  .um-error-title { font-size: 0.95rem; font-weight: 700; color: #c0392b; }
  .um-error-sub   { font-size: 0.85rem; color: #e07070; margin-top: 3px; }

  /* ── Loading skeleton ── */
  .um-skeleton-row td { padding: 18px; }
  .um-skeleton-bar {
    height: 16px;
    border-radius: 6px;
    background: linear-gradient(90deg, #f0eef8 25%, #e4e0f4 50%, #f0eef8 75%);
    background-size: 200% 100%;
    animation: um-shimmer 1.4s infinite;
  }

  @keyframes um-shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ── Footer / Pagination ── */
  .um-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 22px;
    border-top: 1px solid #eef0f8;
    flex-wrap: wrap;
    gap: 10px;
  }
  .um-count { font-size: 0.95rem; color: #9099b5; }
  .um-pages { display: flex; gap: 5px; }
  .um-page-btn {
    width: 36px; height: 36px;
    border: 1.5px solid #dde1f0;
    border-radius: 8px;
    background: #fff;
    color: #3a3f5c;
    font-size: 0.92rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.15s;
    display: flex; align-items: center; justify-content: center;
  }
  .um-page-btn:hover:not(:disabled) { background: #f0f2f7; }
  .um-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .um-page-btn.active { background: #4f6ef7; border-color: #4f6ef7; color: #fff; }

  @keyframes um-fadein {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

// Avatar bg color per role
const ROLE_COLORS = {
  Admin:   '#6d28d9',
  Manager: '#1d4ed8',
  Vendor:  '#d97706',
};

const getRoleColor   = (role) => ROLE_COLORS[role] || '#4b5563';
const getInitials    = (name) => name ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : '?';
const getRoleBadgeClass = (role) => {
  if (role === 'Admin')   return 'um-role-admin';
  if (role === 'Manager') return 'um-role-manager';
  if (role === 'Vendor')  return 'um-role-vendor';
  return 'um-role-default';
};
const ROLE_ICONS = { Admin: '🛡️', Manager: '📋', Vendor: '🏪' };

const ITEMS_PER_PAGE = 10;

const UserManagement = () => {
  const navigate = useNavigate();

  const [users, setUsers]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [apiError, setApiError]     = useState('');
  const [search, setSearch]         = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllUsers()
      .then(res => { setUsers(res.data); setLoading(false); })
      .catch(err => {
        setApiError('Failed to load users. Please check your connection. ' + err);
        setLoading(false);
      });
  }, []);

  // Unique roles for filter tabs
  const roles = ['All', ...Array.from(new Set(users.map(u => u.role).filter(Boolean)))];

  // Filtered list
  const filtered = users.filter(u => {
    const term = search.toLowerCase();
    const matchSearch =
      (u.username?.toLowerCase()    || '').includes(term) ||
      (u.personalName?.toLowerCase()|| '').includes(term) ||
      (u.email?.toLowerCase()       || '').includes(term) ||
      (u.role?.toLowerCase()        || '').includes(term);
    const matchRole = roleFilter === 'All' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleSearch = (e) => { setSearch(e.target.value); setCurrentPage(1); };
  const handleRoleFilter = (r) => { setRoleFilter(r); setCurrentPage(1); };

  // Pagination
  const totalPages   = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const indexOfFirst = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = filtered.slice(indexOfFirst, indexOfFirst + ITEMS_PER_PAGE);

  // Stats
  const countByRole = (r) => users.filter(u => u.role === r).length;

  return (
    <>
      <style>{styles}</style>
      <div className="um-root">

        {/* ── Header ── */}
        <div className="um-header">
          <div>
            <div className="um-title"><span>User</span> Management</div>
            <div className="um-subtitle">View and manage all registered system users</div>
          </div>

          <div className="um-search-wrap">
            <span className="um-search-icon">🔍</span>
            <input
              className="um-search"
              type="text"
              placeholder="       Search by name, username, email, role…"
              value={search}
              onChange={handleSearch}
            />
          </div>

          <button className="um-return-btn" onClick={() => navigate('/admin-menu')}>
            ← Return
          </button>
        </div>

        {/* ── Error ── */}
        {apiError && (
          <div className="um-error">
            <span style={{ fontSize: '1.2rem' }}>❌</span>
            <div>
              <div className="um-error-title">Failed to Load Users</div>
              <div className="um-error-sub">{apiError}</div>
            </div>
          </div>
        )}

        {/* ── Stat strip ── */}
        {!loading && !apiError && (
          <div className="um-stats">
            <div className="um-stat">
              <div  className="um-stat-label">Total Users</div>
              <div className="um-stat-value blue">{users.length}</div>
            </div>
            <div className="um-stat">
              <div className="um-stat-label">Admins</div>
              <div className="um-stat-value purple">{countByRole('Admin')}</div>
            </div>
            <div className="um-stat">
              <div className="um-stat-label">Managers</div>
              <div className="um-stat-value" style={{ color: '#1d4ed8' }}>{countByRole('Manager')}</div>
            </div>
            <div className="um-stat">
              <div className="um-stat-label">Vendors</div>
              <div className="um-stat-value orange">{countByRole('Vendor')}</div>
            </div>
          </div>
        )}

        {/* ── Role filter tabs ── */}
        {!loading && !apiError && (
          <div className="um-filters">
            {roles.map(r => (
              <button
                key={r}
                className={`um-filter-btn ${roleFilter === r ? 'active' : ''}`}
                onClick={() => handleRoleFilter(r)}
              >
                {ROLE_ICONS[r] || '👥'} {r}
              </button>
            ))}
          </div>
        )}

        {/* ── Table card ── */}
        <div className="um-card">
          <div className="um-table-wrap">
            <table className="um-table">
              <thead>
                <tr>
                  <th >User</th>
                  <th style={{textAlign: 'center'}}>Username</th>
                  <th style={{textAlign: 'center'}}>Email</th>
                  <th style={{textAlign: 'center'}}>Role</th>
                </tr>
              </thead>
              <tbody>

                {/* Loading skeleton */}
                {loading && Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="um-skeleton-row">
                    <td><div className="um-skeleton-bar" style={{ width: '160px' }} /></td>
                    <td><div className="um-skeleton-bar" style={{ width: '100px' }} /></td>
                    <td><div className="um-skeleton-bar" style={{ width: '180px' }} /></td>
                    <td><div className="um-skeleton-bar" style={{ width: '80px' }} /></td>
                  </tr>
                ))}

                {/* Empty state */}
                {!loading && currentUsers.length === 0 && (
                  <tr>
                    <td colSpan={4}>
                      <div className="um-empty">
                        <div className="um-empty-icon">👤</div>
                        {search || roleFilter !== 'All'
                          ? 'No users match your search or filter.'
                          : 'No users found in the system.'}
                      </div>
                    </td>
                  </tr>
                )}

                {/* Data rows */}
                {!loading && currentUsers.map((user, i) => (
                  <tr key={user.username || i}>

                    {/* User (avatar + name) */}
                    <td>
                      <div className="um-user-cell">
                        <div
                          className="um-avatar"
                          style={{ background: getRoleColor(user.role) }}
                        >
                          {getInitials(user.personalName || user.username)}
                        </div>
                        <div>
                          <div className="um-user-name">{user.personalName || '—'}</div>
                          <div className="um-user-id">{user.username}</div>
                        </div>
                      </div>
                    </td>

                    {/* Username */}
                    <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem', color: '#6b7399' }}>
                      {user.username}
                    </td>

                    {/* Email */}
                    <td className="um-email">{user.email || '—'}</td>

                    {/* Role badge */}
                    <td>
                      <span className={`um-role-badge ${getRoleBadgeClass(user.role)}`}>
                        {ROLE_ICONS[user.role] || '👤'} {user.role || 'Unknown'}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Footer / Pagination ── */}
          {!loading && filtered.length > 0 && (
            <div className="um-footer">
              <span className="um-count">
                Showing {Math.min(indexOfFirst + 1, filtered.length)}–{Math.min(indexOfFirst + ITEMS_PER_PAGE, filtered.length)} of {filtered.length} user{filtered.length !== 1 ? 's' : ''}
              </span>
              <div className="um-pages">
                <button className="um-page-btn" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`um-page-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >{page}</button>
                ))}
                <button className="um-page-btn" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages || totalPages === 0}>›</button>
              </div>
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default UserManagement;