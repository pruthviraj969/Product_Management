export default function ProductCard({ product, onEdit, onDelete, isNew }) {
  return (
    <div className={`bg-brand-card border flex flex-col card-shine animate-fadeUp relative overflow-hidden
      ${isNew ? 'border-brand-lime/50' : 'border-brand-border'}`}>

      {isNew && (
        <span className="absolute top-2 right-2 bg-brand-lime text-brand-bg font-mono
                         text-[9px] font-bold px-2 py-0.5 tracking-[0.18em] z-10">NEW</span>
      )}

      <div className="bg-white h-44 flex items-center justify-center p-4 relative flex-shrink-0">
        <img src={product.image} alt={product.title}
          className="max-h-36 max-w-full object-contain transition-transform duration-300 hover:scale-105"
          onError={e => e.target.src = 'https://via.placeholder.com/150'} />
        <span className="absolute bottom-2 left-2 bg-brand-bg/90 text-brand-muted
                         font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider">
          {product.category}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="font-mono text-sm text-brand-text leading-snug line-clamp-2 font-medium">{product.title}</p>
        <p className="font-mono text-xs text-brand-muted leading-relaxed line-clamp-2 flex-1">{product.description}</p>
        <div className="flex items-center justify-between pt-3 mt-1 border-t border-brand-border">
          <span className="font-display text-2xl tracking-wider text-brand-lime">
            ${parseFloat(product.price).toFixed(2)}
          </span>
          {product.rating && (
            <div className="text-xs font-mono text-brand-muted flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              {product.rating.rate}
              <span className="text-brand-muted/40">({product.rating.count})</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex border-t border-brand-border">
        <button onClick={() => onEdit(product)}
          className="flex-1 py-2.5 text-[11px] font-mono tracking-wider text-cyan-400
                     border-r border-brand-border hover:bg-cyan-400/10 transition-colors">
          ✏ EDIT
        </button>
        <button onClick={() => onDelete(product)}
          className="flex-1 py-2.5 text-[11px] font-mono tracking-wider text-brand-danger
                     hover:bg-brand-danger/10 transition-colors">
          ✕ DELETE
        </button>
      </div>
    </div>
  );
}