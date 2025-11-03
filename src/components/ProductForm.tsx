import React, { useState } from 'react';
import { Product } from '../context/ProductContext';
import { validateProduct } from '../utils/validate';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Omit<Product, 'id'>) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
  const [form, setForm] = useState<Omit<Product, 'id'>>(
    product || { ten: '', danhMuc: 'Điện tử', gia: 0, soLuong: 0, moTa: '' }
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateProduct(form);
    if (Object.keys(errs).length === 0) {
      onSubmit(form);
    } else {
      setErrors(errs);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div>
        <label>Tên sản phẩm:</label>
        <input
          type="text"
          value={form.ten}
          onChange={e => setForm({ ...form, ten: e.target.value })}
        />
        {errors.ten && <p className="error">{errors.ten}</p>}
      </div>
      <div>
        <label>Danh mục:</label>
        <select
          value={form.danhMuc}
          onChange={e => setForm({ ...form, danhMuc: e.target.value as Product['danhMuc'] })}
        >
          <option value="Điện tử">Điện tử</option>
          <option value="Quần áo">Quần áo</option>
          <option value="Đồ ăn">Đồ ăn</option>
          <option value="Sách">Sách</option>
          <option value="Khác">Khác</option>
        </select>
        {errors.danhMuc && <p className="error">{errors.danhMuc}</p>}
      </div>
      <div>
        <label>Giá:</label>
        <input
          type="number"
          value={form.gia}
          onChange={e => setForm({ ...form, gia: parseFloat(e.target.value) || 0 })}
        />
        {errors.gia && <p className="error">{errors.gia}</p>}
      </div>
      <div>
        <label>Số lượng:</label>
        <input
          type="number"
          value={form.soLuong}
          onChange={e => setForm({ ...form, soLuong: parseInt(e.target.value) || 0 })}
        />
        {errors.soLuong && <p className="error">{errors.soLuong}</p>}
      </div>
      <div>
        <label>Mô tả:</label>
        <textarea
          value={form.moTa}
          onChange={e => setForm({ ...form, moTa: e.target.value })}
        />
      </div>
      <button type="submit">{product ? 'Cập nhật' : 'Thêm'}</button>
    </form>
  );
};

export default ProductForm;