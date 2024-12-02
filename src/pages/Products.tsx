import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/productService';
import { Product, SortOption, PaginationInfo } from '../types';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductSort } from '../components/products/ProductSort';
import { Pagination } from '../components/products/Pagination';
import { useSearch } from '../hooks/useSearch';

const PAGE_SIZE = 12;

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { searchTerm, debouncedSearchTerm, handleSearch } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    pageSize: PAGE_SIZE,
    totalItems: 0,
  });

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    loadProducts();
  }, [debouncedSearchTerm, selectedCategory, sortBy, pagination.currentPage]);

  async function loadProducts() {
    try {
      setLoading(true);
      const { data, totalCount } = await getProducts({
        page: pagination.currentPage,
        pageSize: PAGE_SIZE,
        sortBy,
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        search: debouncedSearchTerm,
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

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setSearchParams(params => {
      if (category === 'all') {
        params.delete('category');
      } else {
        params.set('category', category);
      }
      return params;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        {selectedCategory === 'all' ? 'All Products' : selectedCategory}
      </h1>
      
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          onCategoryChange={handleCategoryChange}
          onSearchChange={handleSearch}
          loading={loading}
        />
        <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">
          {error}
        </div>
      ) : (
        <>
          <ProductGrid products={products} />
          <Pagination
            {...pagination}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}