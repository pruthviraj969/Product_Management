import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts, fetchCategories, setSearch, setCategory, clearNewId,
  selectAllProducts, selectCategories, selectStatus,
  selectSearch, selectCategory, selectNewIds, selectFilteredProducts,
} from '../store/slices/productsSlice';
import ProductCard   from '../components/ProductCard';
import ProductModal  from '../components/ProductModal';
import ProductDetailsModal from '../components/ProductDetailsModal';
import ConfirmDelete from '../components/ConfirmDelete';
import StatCard      from '../components/StatCard';
import Toast         from '../components/Toast';
import Footer from '../components/Footer';

export default function Dashboard() {
  const dispatch         = useDispatch();
  const allProducts      = useSelector(selectAllProducts);
  const categories       = useSelector(selectCategories);
  const status           = useSelector(selectStatus);
  const search           = useSelector(selectSearch);
  const selectedCategory = useSelector(selectCategory);
  const newIds           = useSelector(selectNewIds);
  const filteredProducts = useSelector(selectFilteredProducts);

  const [modal, setModal]               = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    newIds.forEach(id => {
      setTimeout(() => dispatch(clearNewId(id)), 6000);
    });
  }, [newIds, dispatch]);

  const avgPrice = allProducts.length
    ? '$' + (allProducts.reduce((s, p) => s + +p.price, 0) / allProducts.length).toFixed(2)
    : '$0.00';

  return (
    <> 
    <div className="min-h-screen bg-brand-bg">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-brand-lime/[0.03] rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 py-8">

        {/* Header */}
        <header className="flex items-start justify-between mb-8 pb-6 border-b border-brand-border gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-5xl md:text-6xl tracking-[0.06em] leading-none">
              PRODUCT<span className="text-brand-lime">HUB</span>
            </h1>
            <p className="font-mono text-[11px] text-brand-muted mt-1.5 tracking-[0.2em]">
              // MANAGEMENT DASHBOARD — REDUX TOOLKIT + TAILWIND CSS
            </p>
          </div>
          <button onClick={() => setModal({ mode: 'add', product: null })}
            className="btn-lime px-6 py-3 text-xl flex-shrink-0">
            + ADD PRODUCT
          </button>
        </header>

        {/* Stats */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <StatCard label="Total Products" value={allProducts.length}     accentClass="bg-brand-lime" />
          <StatCard label="Filtered"       value={filteredProducts.length} accentClass="bg-cyan-400" />
          <StatCard label="Categories"     value={categories.length}       accentClass="bg-violet-400" />
          <StatCard label="Avg Price"      value={avgPrice}                accentClass="bg-amber-400" />
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-5 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted select-none">⌕</span>
            <input className="input-field pl-9" placeholder="Search by title or category…"
              value={search} onChange={e => dispatch(setSearch(e.target.value))} />
          </div>
          <select className="input-field min-w-[190px] w-auto flex-shrink-0"
            value={selectedCategory} onChange={e => dispatch(setCategory(e.target.value))}>
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {(search || selectedCategory !== 'all') && (
            <button onClick={() => { dispatch(setSearch('')); dispatch(setCategory('all')); }}
              className="btn-ghost px-4 text-xs">✕ CLEAR</button>
          )}
        </div>

        {/* Redux status badge */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <span className="font-mono text-[10px] text-brand-muted tracking-[0.14em] uppercase">Redux State:</span>
          <span className={`font-mono text-[10px] px-2.5 py-0.5 tracking-[0.12em] border
            ${status === 'loading'   ? 'bg-amber-400/10 text-amber-400 border-amber-400/25' :
              status === 'succeeded' ? 'bg-brand-success/10 text-brand-success border-brand-success/25' :
              status === 'failed'    ? 'bg-brand-danger/10 text-brand-danger border-brand-danger/25' :
                                      'bg-brand-muted/10 text-brand-muted border-brand-muted/25'}`}>
            {status.toUpperCase()}
          </span>
          <span className="font-mono text-[10px] text-brand-muted">
            {filteredProducts.length} of {allProducts.length} products
          </span>
        </div>

        {/* Products Grid */}
        {status === 'loading' ? (
          <div className="flex flex-col items-center justify-center py-32 gap-5">
            <div className="w-10 h-10 border-2 border-brand-border border-t-brand-lime rounded-full animate-spin2" />
            <p className="font-mono text-xs text-brand-muted tracking-[0.2em] animate-pulse2">FETCHING FROM REDUX STORE…</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-6xl mb-5 opacity-10 select-none">◫</div>
            <p className="font-mono text-sm text-brand-muted">No products match your criteria.</p>
            <button onClick={() => { dispatch(setSearch('')); dispatch(setCategory('all')); }}
              className="mt-4 font-mono text-xs text-brand-lime hover:underline">Clear all filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} isNew={newIds.includes(p.id)}
                onView={prod => setModal({ mode: 'view', product: prod })}
                onEdit={prod => setModal({ mode: 'edit', product: prod })}
                onDelete={setDeleteTarget} />
            ))}
          </div>
        )}
      </div>

      {modal?.mode === 'view' && (
        <ProductDetailsModal
          product={modal.product}
          onClose={() => setModal(null)}
          onEdit={prod => setModal({ mode: 'edit', product: prod })}
        />
      )}
      {modal && modal.mode !== 'view' && (
        <ProductModal product={modal.product} onClose={() => setModal(null)} />
      )}
      {deleteTarget && <ConfirmDelete product={deleteTarget} onClose={() => setDeleteTarget(null)} />}
      <Toast />
    </div>
    <Footer />
    </>
  );
}
