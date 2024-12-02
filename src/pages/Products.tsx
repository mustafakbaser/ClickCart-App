import { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../services/productService';
import { Product, SortOption, PaginationInfo } from '../types';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductSort } from '../components/products/ProductSort';
import { Pagination } from '../components/products/Pagination';

const PAGE_SIZE = 12;

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    pageSize: PAGE_SIZE,
    totalItems: 0,
  });

  useEffect(() => {
    loadProducts();
  }, [searchTerm, selectedCategory, sortBy, pagination.currentPage]);

  async function loadProducts() {
    try {
      setLoading(true);
      const { data, totalCount } = await getProducts({
        page: pagination.currentPage,
        pageSize: PAGE_SIZE,
        sortBy,
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        search: searchTerm,
      });

      setProducts(data);
      setPagination(prev => ({
        ...prev,
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / PAGE_SIZE),
      }));
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map((p) => p.category));
    return Array.from(uniqueCategories);
  }, [products]);

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Products</h1>
      
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          onCategoryChange={setSelectedCategory}
          onSearchChange={setSearchTerm}
        />
        <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      <ProductGrid products={products} />
      
      <Pagination
        {...pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}