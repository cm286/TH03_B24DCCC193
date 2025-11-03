import React, { useState } from 'react';

interface FilterProps {
  onFilter: (filters: { danhMuc?: string; minGia?: number; maxGia?: number }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [danhMuc, setDanhMuc] = useState('');
  const [minGia, setMinGia] = useState('');
  const [maxGia, setMaxGia] = useState('');

  const handleFilter = () => {
    onFilter({
      danhMuc: danhMuc || undefined,
      minGia: minGia ? parseFloat(minGia) : undefined,
      maxGia: maxGia ? parseFloat(maxGia) : undefined,
    });
  };

  return (
    <div className="filter">
      <select value={danhMuc} onChange={e => setDanhMuc(e.target.value)}>
        <option value="">Tất cả danh mục</option>
        <option value="Điện tử">Điện tử</option>
        <option value="Quần áo">Quần áo</option>
        <option value="Đồ ăn">Đồ ăn</option>
        <option value="Sách">Sách</option>
        <option value="Khác">Khác</option>
      </select>
      <input
        type="number"
        placeholder="Giá tối thiểu"
        value={minGia}
        onChange={e => setMinGia(e.target.value)}
      />
      <input
        type="number"
        placeholder="Giá tối đa"
        value={maxGia}
        onChange={e => setMaxGia(e.target.value)}
      />
      <button onClick={handleFilter}>Lọc</button>
    </div>
  );
};

export default Filter;