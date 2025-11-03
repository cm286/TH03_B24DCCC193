import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';

const HomePage: React.FC = () => {
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{ danhMuc?: string; minGia?: number; maxGia?: number }>({});
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.ten.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDanhMuc = !filters.danhMuc || product.danhMuc === filters.danhMuc;
    const matchesGia =
      (!filters.minGia || product.gia >= filters.minGia) &&
      (!filters.maxGia || product.gia <= filters.maxGia);
    return matchesSearch && matchesDanhMuc && matchesGia;
  });

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="home-page">
      <h1>Danh sách sản phẩm</h1>
      <Link to="/add">Thêm sản phẩm</Link>
      <SearchBar onSearch={setSearchQuery} />
      <Filter onFilter={setFilters} />
      <ProductList products={paginatedProducts} />
      <Pagination
        total={filteredProducts.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default HomePage;