export default function ProductDetailsModal({ product, onClose, onEdit }) {
  if (!product) return null;

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-3xl bg-brand-surface border border-brand-border animate-fadeUp flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
          <h2 className="font-display text-2xl tracking-widest">
            <span className="text-brand-lime">PRODUCT</span> DETAILS
          </h2>
          <button onClick={onClose}
            className="w-8 h-8 border border-brand-border text-brand-muted flex items-center justify-center hover:border-brand-danger hover:text-brand-danger transition-colors">
            CLOSE
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-brand-border min-h-[280px] p-4 flex items-center justify-center">
              <img src={product.image} alt={product.title}
                className="max-h-64 max-w-full object-contain"
                onError={e => e.target.src = 'https://via.placeholder.com/300'} />
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-mono text-brand-muted tracking-[0.14em] uppercase mb-1">Title</p>
                <p className="font-mono text-brand-text text-base leading-relaxed">{product.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-mono text-brand-muted tracking-[0.14em] uppercase mb-1">Price</p>
                  <p className="font-display text-3xl tracking-wider text-brand-lime">${parseFloat(product.price).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-brand-muted tracking-[0.14em] uppercase mb-1">Category</p>
                  <p className="font-mono text-brand-text">{product.category}</p>
                </div>
              </div>

              {product.rating && (
                <div>
                  <p className="text-[10px] font-mono text-brand-muted tracking-[0.14em] uppercase mb-1">Rating</p>
                  <p className="font-mono text-brand-text">
                    {product.rating.rate} / 5 ({product.rating.count} reviews)
                  </p>
                </div>
              )}

              <div>
                <p className="text-[10px] font-mono text-brand-muted tracking-[0.14em] uppercase mb-1">Description</p>
                <p className="font-mono text-sm text-brand-muted leading-relaxed">{product.description || 'No description available.'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-brand-border">
          <button type="button" onClick={onClose} className="btn-ghost flex-1 py-2.5">CLOSE</button>
          <button type="button" onClick={() => onEdit(product)} className="btn-lime flex-1 py-2.5 text-base">EDIT PRODUCT</button>
        </div>
      </div>
    </div>
  );
}
