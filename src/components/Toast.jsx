import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast, selectToast } from '../store/slices/toastSlice';

export default function Toast() {
  const dispatch = useDispatch();
  const { message, type } = useSelector(selectToast);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => dispatch(hideToast()), 3200);
    return () => clearTimeout(t);
  }, [message, dispatch]);

  if (!message) return null;
  const ok = type === 'success';

  return (
    <div className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5
      bg-brand-card font-mono text-xs animate-toastIn max-w-xs border
      ${ok ? 'border-l-4 border-l-brand-success border-brand-success/30'
           : 'border-l-4 border-l-brand-danger  border-brand-danger/30'}`}>
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${ok ? 'bg-brand-success' : 'bg-brand-danger'}`} />
      <span className="text-brand-text flex-1">{message}</span>
      <button onClick={() => dispatch(hideToast())} className="text-brand-muted hover:text-brand-text">✕</button>
    </div>
  );
}