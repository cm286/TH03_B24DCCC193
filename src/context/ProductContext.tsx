import React, { createContext, useContext, useReducer } from 'react';

export interface Product {
  id: number;
  ten: string;
  danhMuc: 'Điện tử' | 'Quần áo' | 'Đồ ăn' | 'Sách' | 'Khác';
  gia: number;
  soLuong: number;
  moTa: string;
}
// ... (phần import và Action giữ nguyên)

export interface Product {
  id: number;
  ten: string;
  danhMuc: 'Điện tử' | 'Quần áo' | 'Đồ ăn' | 'Sách' | 'Khác';
  gia: number;
  soLuong: number;
  moTa: string;
  anh?: string;  
}





type Action =
  | { type: 'ADD_PRODUCT'; payload: Omit<Product, 'id'> }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: number }
  | { type: 'SET_PRODUCTS'; payload: Product[] };

const productReducer = (state: Product[], action: Action): Product[] => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      const newId = Math.max(...state.map(p => p.id), 0) + 1;
      return [...state, { ...action.payload, id: newId }];
    case 'UPDATE_PRODUCT':
      return state.map(p => (p.id === action.payload.id ? action.payload : p));
    case 'DELETE_PRODUCT':
      return state.filter(p => p.id !== action.payload);
    case 'SET_PRODUCTS':
      return action.payload;
    default:
      return state;
  }
};

const initialProducts: Product[] = [
  { id: 1, ten: 'iPhone 15 Pro', danhMuc: 'Điện tử', gia: 25000000, soLuong: 10, moTa: 'Điện thoại cao cấp Apple', anh: 'https://product.hstatic.net/1000359786/product/23_1b585f2cf35341589b587dae9c2002ff_master.jpg' },
  { id: 2, ten: 'Áo Thun Nam', danhMuc: 'Quần áo', gia: 150000, soLuong: 50, moTa: 'Áo thun cotton', anh: 'https://thoitrangbigsize.vn/wp-content/uploads/2024/05/5-44.jpg' },
  { id: 3, ten: 'Laptop Dell', danhMuc: 'Điện tử', gia: 20000000, soLuong: 5, moTa: 'Laptop gaming', anh: 'https://xlap.vn/wp-content/uploads/2025/10/HP-omnibook-5-Flip-6-510x510.png' },
  { id: 4, ten: 'Bánh Mì', danhMuc: 'Đồ ăn', gia: 30000, soLuong: 100, moTa: 'Bánh mì tươi ngon', anh: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/B%C3%A1nh_m%C3%AC_th%E1%BB%8Bt_n%C6%B0%E1%BB%9Bng.png/250px-B%C3%A1nh_m%C3%AC_th%E1%BB%8Bt_n%C6%B0%E1%BB%9Bng.png' },
  { id: 5, ten: 'Sách Toán', danhMuc: 'Sách', gia: 50000, soLuong: 20, moTa: 'Sách giáo khoa', anh: 'https://sachcanhdieu.vn/wp-content/uploads/2024/04/Bia-Toan-5-1-page-00001.jpg' },
  { id: 6, ten: 'Váy Dạ Tiệc', danhMuc: 'Quần áo', gia: 500000, soLuong: 15, moTa: 'Váy đẹp cho dạ tiệc', anh: 'https://images2.thanhnien.vn/528068263637045248/2023/11/18/anh-2-1-17002950487341121486672.jpg' },
  { id: 7, ten: 'Tai Nghe Sony', danhMuc: 'Điện tử', gia: 2000000, soLuong: 30, moTa: 'Tai nghe không dây', anh: 'https://via.placeholder.com/150' },
  { id: 8, ten: 'Pizza', danhMuc: 'Đồ ăn', gia: 150000, soLuong: 25, moTa: 'Pizza hải sản', anh: 'https://via.placeholder.com/150' },
  { id: 9, ten: 'Sách Văn Học', danhMuc: 'Sách', gia: 80000, soLuong: 40, moTa: 'Tập truyện ngắn', anh: 'https://via.placeholder.com/150' },
  { id: 10, ten: 'Đồ Chơi Lego', danhMuc: 'Khác', gia: 300000, soLuong: 60, moTa: 'Lego xây dựng', anh: 'https://via.placeholder.com/150' },
];


const ProductContext = createContext<{
  products: Product[];
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, dispatch] = useReducer(productReducer, initialProducts);
  return (
    <ProductContext.Provider value={{ products, dispatch }}>
      { children }
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
};