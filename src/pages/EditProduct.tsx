import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductForm from '../components/ProductForm';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, dispatch } = useProducts();
  const navigate = useNavigate();

  const product = products.find(p => p.id === parseInt(id!));

  if (!product) {
    return <p>Không tìm thấy sản phẩm để chỉnh sửa</p>;
  }

  const handleSubmit = (updatedProduct: Omit<import('../context/ProductContext').Product, 'id'>) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: { ...updatedProduct, id: product.id } });
    navigate('/');
  };

  return (
    <div className="edit-product">
      <h1>Chỉnh sửa sản phẩm</h1>
      <ProductForm product={product} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditProduct;