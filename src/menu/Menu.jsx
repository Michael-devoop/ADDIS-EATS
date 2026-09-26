import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
import { getDishes } from "../api/dishes";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import SearchBar from "./SearchBar";
import MenuSkeleton from "../ui/Skeleton";

export default function Menu() {
  const { data: dishes, loading, error, retry } = useFetch(getDishes);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  const filtered = useMemo(() => {
    if (!dishes) return [];
    return dishes
      .filter((d) => (category ? d.category === category : true))
      .filter((d) => d.name.toLowerCase().includes(debouncedSearch.toLowerCase()));
  }, [dishes, category, debouncedSearch]);

  if (loading) {
    return <MenuSkeleton count={8} />;
  }

  if (error) {
    return (
      <>
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="breadcrumb-item">
              <h1 className="breadcrumb-title">Menu Grid</h1>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container text-center py-5">
            <h3>Something went wrong</h3>
            <p className="text-muted">{error}</p>
            <button onClick={retry} className="btn primary-btn">
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-item">
            <h1 className="breadcrumb-title">Menu Grid</h1>
            <nav aria-label="breadcrumb" className="page-breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-items">
                  <Link to="/">
                    <i className="icon-house me-2"></i>Home
                  </Link>
                </li>
                <li className="breadcrumb-items">
                  <span>
                    <i className="icon-chevron-right"></i>
                  </span>
                </li>
                <li className="breadcrumb-items active" aria-current="page">
                  Menu Grid
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <div className="container">
          {/* Header Card */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card box-shadow position-relative mb-3 mb-lg-5">
                <img
                  src="/assets/img/icons/chilli-icon.svg"
                  className="menu-icon-01 d-xl-block d-none"
                  alt="shape icon"
                  loading="lazy"
                />
                <img
                  src="/assets/img/icons/leaf-icon.svg"
                  className="menu-icon-02 d-xl-block d-none"
                  alt="shape icon"
                  loading="lazy"
                />
                <div className="card-body">
                  <div className="row menu-header-row">
                    <div className="col-lg-6 d-lg-block d-none">
                      <div className="menu-img">
                        <ul>
                          <li>
                            <img src="/images/doro_wote.png" alt="Doro Wat" loading="lazy" />
                          </li>
                          <li>
                            <img src="/images/ktfo.png" alt="Kitfo" loading="lazy" />
                          </li>
                          <li>
                            <img src="/images/shiro.png" alt="Shiro" loading="lazy" />
                          </li>
                          <li>
                            <img src="/images/beyaynet.png" alt="Beyaynetu" loading="lazy" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="menu-contents">
                        <h2>Handcrafted Dishes Made With Love</h2>
                        <p>
                          From classic favorites to chef-inspired specialties, our menu has
                          something for everyone.
                        </p>
                        <ul>
                          <li>
                            <div className="menu-order">
                              <span className="menu-order-contact">
                                <i className="icon-phone"></i>
                              </span>
                              <div>
                                <div className="text-muted">For Order</div>
                                <h3>+251 911 234 567</h3>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="menu-order">
                              <span className="menu-order-location">
                                <i className="icon-map-pin"></i>
                              </span>
                              <div>
                                <div className="text-muted">Location</div>
                                <h3>Bole Road, Addis Ababa, Ethiopia</h3>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Tabs & Search Bar */}
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 mb-4">
            <CategoryBar />
            <SearchBar value={search} onChange={setSearch} />
          </div>

          {/* Dishes */}
          {filtered.length === 0 ? (
            <div className="text-center py-5">
              <i className="icon-search" style={{ fontSize: 60, color: "#ccc" }}></i>
              <h3 className="mt-3">No dishes found</h3>
              <p className="text-muted">Try adjusting your search or filter.</p>
            </div>
          ) : (
            <DishList dishes={filtered} />
          )}
        </div>
      </div>
    </>
  );
}