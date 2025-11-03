import React from 'react';
import { Link } from 'react-router-dom';
import { Product, useProducts } from '../context/ProductContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useProducts();

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      dispatch({ type: 'DELETE_PRODUCT', payload: product.id });
    }
  };

  return (
    <div className="product-card">
      {product.anh && <img src={product.anh} alt={product.ten} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />}
      <h3>{product.ten}</h3>
      <p>Danh mục: {product.danhMuc}</p>
      <p>Giá: {product.gia.toLocaleString()} VND</p>
      <Link to={`/products/${product.id}`}>Xem chi tiết</Link>
      <button onClick={handleDelete}>Xóa</button>
    </div>
  );
};

export default ProductCard;