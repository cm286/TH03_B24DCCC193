import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductForm from '../components/ProductForm';

const AddProduct: React.FC = () => {
  const { dispatch } = useProducts();
  const navigate = useNavigate();

  const handleSubmit = (product: Omit<import('../context/ProductContext').Product, 'id'>) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
    navigate('/');
  };

  return (
    <div className="add-product">
      <h1>Thêm sản phẩm mới</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProduct;