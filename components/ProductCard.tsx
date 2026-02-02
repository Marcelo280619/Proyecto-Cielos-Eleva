import React from 'react';
import './ProductCard.css';

interface ProductCardProps {
  name: string;
  price: number;
  unit: string;
  image: string;
  inStock: boolean;
  stock?: number;
}

export default function ProductCard({ 
  name, 
  price, 
  unit, 
  image, 
  inStock, 
  stock 
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={image} 
          alt={name} 
          className="product-image"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23999" font-size="18" font-family="Arial"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
          }}
        />
        {!inStock && (
          <div className="out-of-stock-badge">Agotado</div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        
        <div className="product-pricing">
          <span className="product-price">{formatPrice(price)}</span>
          <span className="product-unit">/{unit}</span>
        </div>
        
        {inStock && stock !== undefined && (
          <div className="product-stock">
            <span className="stock-badge">En Stock</span>
            <span className="stock-count">{stock} un</span>
          </div>
        )}
        
        <button 
          className={`add-to-cart-btn ${!inStock ? 'disabled' : ''}`}
          disabled={!inStock}
        >
          {inStock ? 'Agregar al carrito' : 'Próximamente'}
        </button>
      </div>
    </div>
  );
}
