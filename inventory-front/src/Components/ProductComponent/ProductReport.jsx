import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllProducts, deleteProductById } from '../../Services/ProductService';
import { getRole } from '../../Services/LoginService';
import '../../DisplayView.css';

const ProductReport = () => {

  const [products, setProducts] = useState([]);
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  let navigate = useNavigate();

  useEffect(() => {
    getRole().then(res => setRole(res.data));
    getAllProducts().then(res => setProducts(res.data));
  }, []);

  /*const removeProduct = (id) => {
    deleteProductById(id).then(() => {
      setProducts(products.filter(p => p.productId !== id));
    });
  };*/

  const removeProduct = (id) => {
    if (window.confirm(`Are you sure you want to delete product ${id}?`)) {
        deleteProductById(id)
            .then(() => {
                // Update local state so the row disappears immediately
                setProducts(products.filter(p => p.productId !== id));
            })
            .catch(err => {
                alert("Could not delete product. It might be linked to transactions.");
                console.error(err);
            });
    }
};

  const returnBack = () => {
    role === "Admin" ? navigate('/admin-menu') : navigate('/manager-menu');
  };

  // Replace your filteredProducts logic with this:
const filteredProducts = products.filter(p => {
    const name = p.productName?.toLowerCase() || "";
    const sku = p.skuId?.toLowerCase() || "";
    const vendor = p.vendorId?.toLowerCase() || "";
    const term = search.toLowerCase();

    return name.includes(term) || sku.includes(term) || vendor.includes(term);
});

  // 📄 PAGINATION
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (

    <div className="product-list-container text-center">

      <h2 className="product-list-title">
        {role === 'Admin' ? 'Admin Product List' : 'Manager Product List'}
      </h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by name, SKU, vendor..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">

        <table className="custom-table table table-striped table-bordered">

          <thead>
            <tr>
              <th>Product Id</th>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Vendor Id</th>
              <th>Purchase Price</th>
              <th>Sales Price</th>
              <th>Stock</th>
              <th>Reorder Level</th>
              <th>Stock Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              currentProducts.map((product) => {

                const isDisabled = !product.status;

                return (
                  <tr key={product.productId}>

                    <td>{product.productId}</td>
                    <td>{product.skuId}</td>
                    <td>{product.productName}</td>
                    <td>{product.vendorId}</td>
                    <td>{product.purchasePrice}</td>
                    <td>{product.salesPrice}</td>
                    <td>{product.stock}</td>
                    <td>{product.reorderLevel}</td>

                    <td>
                      {
                        product.status
                          ? <span className="status-blue">Permitted</span>
                          : <span className="status-red">Reorder</span>
                      }
                    </td>

                    <td>

                      <Link to={`/edit-stock/${product.productId}/2`}>
                        <button className="issue-btn btn btn-warning" disabled={isDisabled}>
                          Issue
                        </button>
                      </Link>

                      <Link to={`/edit-stock/${product.productId}/1`}>
                        <button className="purchase-btn btn btn-success">
                          Purchase
                        </button>
                      </Link>

                      {
                        role === 'Admin' &&
                        <>
                          <Link to={`/edit-price/${product.productId}`}>
                            <button className="btn btn-secondary">Price</button>
                          </Link>

                          <button
                            onClick={() => removeProduct(product.productId)}
                            className="delete-btn btn btn-danger"
                          >
                            Delete
                          </button>
                        </>
                      }

                    </td>

                  </tr>
                );
              })
            }
          </tbody>

        </table>

        

        {/* RETURN */}
        <button onClick={returnBack} className="return-btn btn btn-danger">
          Return
        </button>

      </div>

    </div>
  );
};

export default ProductReport;







