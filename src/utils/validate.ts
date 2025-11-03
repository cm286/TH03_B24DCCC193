import { Product } from '../context/ProductContext';

export const validateProduct = (product: Omit<Product, 'id'>) => {
  const errors: { [key: string]: string } = {};
  if (!product.ten || product.ten.length < 3) errors.ten = 'Tên sản phẩm phải có ít nhất 3 ký tự';
  if (!product.gia || product.gia <= 0) errors.gia = 'Giá phải là số dương';
  if (!product.soLuong || product.soLuong <= 0 || !Number.isInteger(product.soLuong)) errors.soLuong = 'Số lượng phải là số nguyên dương';
  if (!product.danhMuc) errors.danhMuc = 'Phải chọn danh mục';
  return errors;
};