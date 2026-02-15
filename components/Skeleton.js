import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const ProductSkeleton = () => {
  return (
    <div className="product-skeleton-card">
      <div className="product-skeleton-image">
        <Skeleton height={250} borderRadius="0" />
      </div>
      <div className="product-skeleton-body">
        <Skeleton height={24} width="80%" style={{ marginBottom: '8px' }} />
        <Skeleton height={16} width="60%" style={{ marginBottom: '12px' }} />
        <div className="product-skeleton-price">
          <Skeleton height={28} width={80} />
        </div>
        <div className="product-skeleton-stock">
          <Skeleton height={20} width={100} />
        </div>
        <Skeleton height={60} style={{ marginTop: '12px' }} />
        <div className="product-skeleton-buttons">
          <Skeleton height={40} width="45%" />
          <Skeleton height={40} width="45%" />
        </div>
      </div>
      <style jsx>{`
        .product-skeleton-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }
        .product-skeleton-body {
          padding: 16px;
        }
        .product-skeleton-price {
          margin-top: 12px;
        }
        .product-skeleton-stock {
          margin-top: 8px;
        }
        .product-skeleton-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
          gap: 10px;
        }
      `}</style>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="products-grid-skeleton">
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
      <style jsx>{`
        .products-grid-skeleton {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 24px;
          margin: 20px 0;
        }
      `}</style>
    </div>
  );
};

export const CartItemSkeleton = () => {
  return (
    <div className="cart-item-skeleton">
      <div className="cart-item-skeleton-image">
        <Skeleton height={100} width={100} />
      </div>
      <div className="cart-item-skeleton-details">
        <Skeleton height={20} width="70%" style={{ marginBottom: '8px' }} />
        <Skeleton height={16} width="40%" style={{ marginBottom: '12px' }} />
        <Skeleton height={32} width={120} />
      </div>
      <style jsx>{`
        .cart-item-skeleton {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          background: white;
          border-radius: 12px;
          margin-bottom: 16px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .cart-item-skeleton-image {
          flex-shrink: 0;
        }
        .cart-item-skeleton-details {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export const CategorySkeleton = () => {
  return (
    <div className="category-skeleton">
      <Skeleton height={120} borderRadius="12px" />
      <Skeleton height={20} width="60%" style={{ marginTop: '12px' }} />
      <style jsx>{`
        .category-skeleton {
          padding: 16px;
        }
      `}</style>
    </div>
  );
};

export const TableRowSkeleton = ({ columns = 5 }) => {
  return (
    <tr className="table-row-skeleton">
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index}>
          <Skeleton height={20} />
        </td>
      ))}
      <style jsx>{`
        .table-row-skeleton td {
          padding: 16px;
          vertical-align: middle;
        }
      `}</style>
    </tr>
  );
};

export const DetailPageSkeleton = () => {
  return (
    <div className="detail-page-skeleton">
      <div className="detail-skeleton-images">
        <Skeleton height={500} borderRadius="12px" />
        <div className="detail-skeleton-thumbnails">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} height={100} borderRadius="8px" />
          ))}
        </div>
      </div>
      <div className="detail-skeleton-info">
        <Skeleton height={40} width="80%" style={{ marginBottom: '16px' }} />
        <Skeleton height={24} width="30%" style={{ marginBottom: '24px' }} />
        <Skeleton height={100} style={{ marginBottom: '24px' }} />
        <Skeleton height={48} width={200} style={{ marginBottom: '24px' }} />
        <Skeleton height={48} width="100%" />
      </div>
      <style jsx>{`
        .detail-page-skeleton {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 32px;
        }
        .detail-skeleton-images {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .detail-skeleton-thumbnails {
          display: flex;
          gap: 12px;
        }
        .detail-skeleton-info {
          padding: 16px;
        }
        @media (max-width: 768px) {
          .detail-page-skeleton {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductSkeleton;
