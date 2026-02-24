import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct, selectCategories } from '../store/slices/productsSlice';
import { showToast } from '../store/slices/toastSlice';

export default function ProductModal({ product, onClose }) {
  const dispatch   = useDispatch();
  const categories = useSelector(selectCategories);
  const isEdit     = !!product?.id;

  const [form, setForm] = useState({
    title:       product?.title       || '',
    price:       product?.price       || '',
    description: product?.description || '',
    category:    product?.category    || categories[0] || '',
    image:       product?.image       || 'https://via.placeholder.com/150',
  });
  const [loading, setLoading] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, price: parseFloat(form.price) };
      if (isEdit) {
        await dispatch(updateProduct({ id: product.id, ...payload })).unwrap();
        dispatch(showToast({ message: '✓ Product updated successfully', type: 'success' }));
      } else {
        await dispatch(addProduct(payload)).unwrap();
        dispatch(showToast({ message: '✓ Product added to list', type: 'success' }));
      }
      onClose();
    } catch (err) {
      dispatch(showToast({ message: `✗ ${err || 'Operation failed'}`, type: 'error' }));
    } finally { setLoading(false); }
  };

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-lg bg-brand-surface border border-brand-border animate-fadeUp flex flex-col max-h-[90vh]">

        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
          <h2 className="font-display text-2xl tracking-widest">
            {isEdit ? <><span className="text-brand-lime">EDIT</span> PRODUCT</>
                    : <><span className="text-brand-lime">ADD</span> PRODUCT</>}
          </h2>
          <button onClick={onClose}
            className="w-8 h-8 border border-brand-border text-brand-muted flex items-center
                       justify-center hover:border-brand-danger hover:text-brand-danger transition-colors">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

            <div className="space-y-1">
              <label className="block text-[10px] text-brand-muted tracking-[0.14em] uppercase">Title *</label>
              <input className="input-field" value={form.title} onChange={set('title')} required placeholder="Product title…" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] text-brand-muted tracking-[0.14em] uppercase">Price ($) *</label>
                <input className="input-field" type="number" step="0.01" min="0"
                  value={form.price} onChange={set('price')} required placeholder="0.00" />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] text-brand-muted tracking-[0.14em] uppercase">Category *</label>
                <select className="input-field" value={form.category} onChange={set('category')} required>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] text-brand-muted tracking-[0.14em] uppercase">Description</label>
              <textarea className="input-field resize-none h-20"
                value={form.description} onChange={set('description')} placeholder="Product description…" />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] text-brand-muted tracking-[0.14em] uppercase">Image URL</label>
              <input className="input-field" value={form.image} onChange={set('image')} placeholder="https://…" />
            </div>

            {form.image && (
              <div className="bg-white/5 border border-brand-border p-3 flex items-center justify-center h-28">
                <img src={form.image} alt="preview" className="max-h-full object-contain"
                  onError={e => e.target.style.display = 'none'} />
              </div>
            )}
          </div>

          <div className="flex gap-3 px-6 py-4 border-t border-brand-border">
            <button type="button" onClick={onClose} className="btn-ghost flex-1 py-2.5">CANCEL</button>
            <button type="submit" disabled={loading} className="btn-lime flex-1 py-2.5 text-base">
              {loading ? 'SAVING…' : isEdit ? 'UPDATE' : 'ADD PRODUCT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}