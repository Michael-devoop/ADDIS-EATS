import { useSearchParams } from "react-router-dom";

const categories = [
  { slug: "", label: "All Items", icon: "/assets/img/icons/tab-01.svg" },
  { slug: "ethiopian", label: "Ethiopian", icon: "/assets/img/icons/tab-03.svg" },
  { slug: "pizza", label: "Pizza", icon: "/assets/img/icons/tab-04.svg" },
  { slug: "burgers", label: "Burgers", icon: "/assets/img/icons/tab-02.svg" },
  { slug: "drinks", label: "Drinks", icon: "/assets/img/icons/tab-05.svg" },
];

export default function CategoryBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get("category") || "";

  function select(slug) {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  }

  return (
    <div className="signature-tab">
      <ul className="nav menu-tab-nav">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <button
              type="button"
              className={active === cat.slug ? "active" : ""}
              onClick={() => select(cat.slug)}
            >
              <span>
                <img src={cat.icon} alt={cat.label} />
              </span>
              {cat.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}