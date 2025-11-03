import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';



const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const product = products.find(p => p.id === parseInt(id!));

  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  return (
    <div className="product-detail">
      {product.anh && <img src={product.anh} alt={product.ten} style={{ width: '100%', maxWidth: '300px', height: 'auto', marginBottom: '20px' }} />}
      <h1>{product.ten}</h1>
      <p>Danh mục: {product.danhMuc}</p>
      <p>Giá: {product.gia.toLocaleString()} VND</p>
      <p>Số lượng: {product.soLuong}</p>
      <p>Mô tả: {product.moTa}</p>
      <Link to={`/edit/${product.id}`}>Chỉnh sửa</Link>
      <Link to="/">Quay lại</Link>
    </div>
  );
};



export default ProductDetail;