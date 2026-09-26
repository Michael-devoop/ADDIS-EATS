import "./Skeleton.css";

/**
 * A single animated skeleton placeholder block.
 * Usage: <Skeleton width="100%" height="200px" borderRadius="12px" />
 */
export function Skeleton({ width = "100%", height = "16px", borderRadius = "6px", className = "" }) {
  return (
    <div
      className={`skeleton-pulse ${className}`}
      style={{ width, height, borderRadius }}
      aria-hidden="true"
    />
  );
}

/**
 * Skeleton card that mimics a DishCard while data is loading.
 */
export function DishCardSkeleton() {
  return (
    <div className="menu-item-two w-100 mb-0 skeleton-card">
      {/* Image placeholder */}
      <div className="menu-img">
        <Skeleton width="100%" height="200px" borderRadius="12px 12px 0 0" />
      </div>
      {/* Content placeholders */}
      <div className="menu-content p-3">
        <Skeleton width="70%" height="18px" className="mb-2" />
        <Skeleton width="100%" height="12px" className="mb-1" />
        <Skeleton width="85%" height="12px" className="mb-3" />
        <div className="d-flex justify-content-between align-items-center">
          <Skeleton width="35%" height="20px" />
          <Skeleton width="90px" height="30px" borderRadius="50px" />
        </div>
      </div>
    </div>
  );
}

/**
 * Full menu page skeleton — header card + category bar + grid of dish cards.
 * @param {number} count - Number of skeleton dish cards to render (default 8)
 */
export default function MenuSkeleton({ count = 8 }) {
  return (
    <>
      {/* Breadcrumb skeleton */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-item">
            <Skeleton width="160px" height="28px" className="mb-2" />
            <Skeleton width="200px" height="14px" />
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container">
          {/* Header card skeleton */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card box-shadow position-relative mb-3 mb-lg-5">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6 d-lg-block d-none">
                      <div className="d-flex gap-2">
                        <Skeleton width="120px" height="120px" borderRadius="12px" />
                        <Skeleton width="120px" height="120px" borderRadius="12px" />
                        <Skeleton width="120px" height="120px" borderRadius="12px" />
                        <Skeleton width="120px" height="120px" borderRadius="12px" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <Skeleton width="80%" height="24px" className="mb-3" />
                      <Skeleton width="100%" height="14px" className="mb-2" />
                      <Skeleton width="90%" height="14px" className="mb-4" />
                      <Skeleton width="50%" height="16px" className="mb-2" />
                      <Skeleton width="60%" height="16px" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category bar + search skeleton */}
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 mb-4">
            <div className="d-flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} width="80px" height="36px" borderRadius="20px" />
              ))}
            </div>
            <Skeleton width="250px" height="40px" borderRadius="8px" />
          </div>

          {/* Dish cards grid skeleton */}
          <div className="row g-4">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="col-xl-3 col-lg-4 col-md-6">
                <DishCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
