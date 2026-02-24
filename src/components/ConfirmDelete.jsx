import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../store/slices/productsSlice';
import { showToast } from '../store/slices/toastSlice';

export default function ConfirmDelete({ product, onClose }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await dispatch(deleteProduct(product.id)).unwrap();
      dispatch(showToast({ message: '✓ Product removed from list', type: 'success' }));
      onClose();
    } catch (err) {
      dispatch(showToast({ message: `✗ Delete failed: ${err}`, type: 'error' }));
      setLoading(false);
    }
  };

  const preview = product.title.length > 50 ? product.title.slice(0, 50) + '…' : product.title;

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-sm bg-brand-surface border border-brand-border border-l-4 border-l-brand-danger p-6 animate-fadeUp">
        <h3 className="font-display text-2xl tracking-widest mb-2">DELETE PRODUCT?</h3>
        <p className="text-xs text-brand-muted leading-relaxed mb-6 font-mono">
          You're about to permanently remove{' '}
          <span className="text-brand-text font-medium">"{preview}"</span>.
          This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="btn-ghost flex-1 py-2.5 text-sm">CANCEL</button>
          <button onClick={handleDelete} disabled={loading}
            className="flex-1 py-2.5 bg-brand-danger text-white font-display text-xl tracking-widest
                       hover:bg-red-400 transition-colors disabled:opacity-50">
            {loading ? 'REMOVING…' : 'DELETE'}
          </button>
        </div>
      </div>
    </div>
  );
}