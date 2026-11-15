
import { useState, useMemo } from "react";
import "./Store.css";

const PRODUCTS = [
  {
    id: 1,
    name: "Pour-over Kettle",
    price: 62,
    category: "Brewing",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    description: "Precision pouring for perfect coffee.",
    rating: 4.9,
    badge: "BEST SELLER",
  },
  {
    id: 2,
    name: "Premium Burr Grinder",
    price: 118,
    category: "Grinders",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800",
    description: "Freshly ground coffee every morning.",
    rating: 4.8,
    badge: "POPULAR",
  },
  {
    id: 3,
    name: "Glass Coffee Dripper",
    price: 34,
    category: "Brewing",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800",
    description: "Beautifully designed manual brewer.",
    rating: 4.7,
    badge: "",
  },
  {
    id: 4,
    name: "Digital Coffee Scale",
    price: 45,
    category: "Tools",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800",
    description: "Measure every gram with precision.",
    rating: 4.9,
    badge: "NEW",
  },
  {
    id: 5,
    name: "Ceramic Mug Set",
    price: 28,
    category: "Tableware",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800",
    description: "Minimal mugs for your daily ritual.",
    rating: 4.8,
    badge: "",
  },
  {
    id: 6,
    name: "Manual Hand Grinder",
    price: 79,
    category: "Grinders",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800",
    description: "Portable grinding with a premium finish.",
    rating: 4.6,
    badge: "POPULAR",
  },
  {
    id: 7,
    name: "Stainless Milk Pitcher",
    price: 22,
    category: "Tools",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800",
    description: "Create beautiful latte art at home.",
    rating: 4.7,
    badge: "",
  },
  {
    id: 8,
    name: "Coffee Filter Pack",
    price: 9,
    category: "Brewing",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800",
    description: "Premium filters for a cleaner brew.",
    rating: 4.5,
    badge: "",
  },
];

const CATEGORIES = [
  "All",
  "Brewing",
  "Grinders",
  "Tools",
  "Tableware",
];

const money = (n) => `$${n.toFixed(2)}`;

export default function Store() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState({});
  const [open, setOpen] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const visible = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(query.trim().toLowerCase())
    );

    if (sort === "low") {
      list = [...list].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [category, query, sort]);

  const items = PRODUCTS.filter((p) => cart[p.id]).map((p) => ({
    ...p,
    qty: cart[p.id],
  }));

  const count = items.reduce((s, i) => s + i.qty, 0);

  const total = items.reduce(
    (s, i) => s + i.qty * i.price,
    0
  );

  const add = (id) => {
    setCart((c) => ({
      ...c,
      [id]: (c[id] || 0) + 1,
    }));
    setOrdered(false);
  };

  const change = (id, d) => {
    setCart((c) => {
      const next = { ...c, [id]: (c[id] || 0) + d };

      if (next[id] <= 0) {
        delete next[id];
      }

      return next;
    });
  };

  const checkout = () => {
    if (items.length === 0) return;

    setCart({});
    setOrdered(true);
  };

  const subscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  const featured = PRODUCTS.slice(0, 3);

  return (
    <div className="shop">

      {/* TOP ANNOUNCEMENT */}

      <div className="announcement">
        FREE SHIPPING ON ORDERS OVER $100
        <span> | </span>
        DISCOVER YOUR PERFECT BREW
      </div>

      {/* NAVBAR */}

      <header className="navbar">

        <a href="#home" className="logo">
          GRIND<span>STONE.</span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Shop</a>
          <a href="#collections">Collections</a>
          <a href="#about">Our Story</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-actions">

          <button
            className="cart-btn"
            onClick={() => {
              setOpen(true);
              setOrdered(false);
            }}
          >
            BAG ({count})
          </button>

        </div>

      </header>

      {/* HERO SECTION */}

      <section className="hero" id="home">

        <div className="hero-content">

          <p className="eyebrow">
            THE ART OF BETTER COFFEE
          </p>

          <h1>
            Make Every
            <br />
            Morning
            <br />
            <span>Extraordinary.</span>
          </h1>

          <p className="hero-description">
            Discover thoughtfully designed coffee essentials
            that turn your everyday coffee routine into
            something special.
          </p>

          <div className="hero-buttons">

            <a href="#products" className="primary-btn">
              SHOP COLLECTION →
            </a>

            <a href="#about" className="secondary-btn">
              OUR STORY
            </a>

          </div>

          <div className="hero-note">
            <span>✦</span> Designed for coffee lovers
          </div>

        </div>

        <div className="hero-image">

          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400"
            alt="Freshly brewed coffee"
          />

          <div className="hero-image-label">
            <span>01 / 04</span>
            <strong>THE DAILY RITUAL</strong>
          </div>

        </div>

      </section>

      {/* TRUST BAR */}

      <section className="trust-bar">

        <div>
          <span>✦</span>
          <p>PREMIUM QUALITY</p>
        </div>

        <div>
          <span>◇</span>
          <p>THOUGHTFUL DESIGN</p>
        </div>

        <div>
          <span>☕</span>
          <p>MADE FOR COFFEE LOVERS</p>
        </div>

        <div>
          <span>↗</span>
          <p>EVERYDAY ESSENTIALS</p>
        </div>

      </section>

      {/* INTRODUCTION */}

      <section className="intro-section">

        <p className="eyebrow">WELCOME TO GRINDSTONE</p>

        <h2>
          Good coffee is not just a drink.
          <br />
          <span>It's a way of living.</span>
        </h2>

        <p>
          From the first grind to the final sip, every detail
          matters. We bring together beautiful tools,
          timeless materials and carefully selected coffee
          accessories to make your daily ritual better.
        </p>

      </section>

      {/* FEATURED COLLECTION */}

      <section className="collection-section" id="collections">

        <div className="section-heading">

          <div>
            <p className="eyebrow">CURATED FOR YOU</p>
            <h2>Explore Collections</h2>
          </div>

          <a href="#products" className="text-link">
            VIEW ALL PRODUCTS →
          </a>

        </div>

        <div className="collection-grid">

          <a href="#products" className="collection-card large">

            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1000"
              alt="Coffee brewing equipment"
            />

            <div className="collection-overlay">
              <span>01 / BREWING</span>
              <h3>The Perfect Brew</h3>
              <p>Discover brewing essentials →</p>
            </div>

          </a>

          <a href="#products" className="collection-card">

            <img
              src="https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=900"
              alt="Coffee grinder"
            />

            <div className="collection-overlay">
              <span>02 / GRINDERS</span>
              <h3>Freshly Ground</h3>
              <p>Explore grinders →</p>
            </div>

          </a>

          <a href="#products" className="collection-card">

            <img
              src="https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900"
              alt="Coffee tableware"
            />

            <div className="collection-overlay">
              <span>03 / TABLEWARE</span>
              <h3>Slow Mornings</h3>
              <p>Explore tableware →</p>
            </div>

          </a>

        </div>

      </section>

      {/* PRODUCTS */}

      <section className="products-section" id="products">

        <div className="section-heading">

          <div>
            <p className="eyebrow">THE GRINDSTONE EDIT</p>
            <h2>Shop Our Products</h2>
            <p className="section-subtitle">
              Carefully selected essentials for your coffee corner.
            </p>
          </div>

          <span className="product-count">
            {visible.length} PRODUCTS
          </span>

        </div>

        {/* SEARCH AND FILTER */}

        <div className="toolbar">

          <div className="chips">

            {CATEGORIES.map((c) => (

              <button
                key={c}
                className={
                  c === category ? "chip on" : "chip"
                }
                onClick={() => setCategory(c)}
              >
                {c}
              </button>

            ))}

          </div>

          <div className="search-sort">

            <input
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

          </div>

        </div>

        {/* PRODUCT GRID */}

        {visible.length === 0 ? (

          <div className="empty">
            <h3>No products found</h3>
            <p>Try another search or category.</p>

            <button
              className="primary-btn"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              CLEAR FILTERS
            </button>

          </div>

        ) : (

          <main className="product-grid">

            {visible.map((p) => (

              <article className="product-card" key={p.id}>

                <div className="product-image">

                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                  />

                  {p.badge && (
                    <span className="product-badge">
                      {p.badge}
                    </span>
                  )}

                  <button
                    className="quick-add"
                    onClick={() => add(p.id)}
                  >
                    + ADD TO BAG
                  </button>

                </div>

                <div className="product-info">

                  <div className="product-category">
                    {p.category}
                  </div>

                  <h3>{p.name}</h3>

                  <p className="product-description">
                    {p.description}
                  </p>

                  <div className="product-bottom">

                    <strong>{money(p.price)}</strong>

                    <span className="rating">
                      ★ {p.rating}
                    </span>

                  </div>

                  <button
                    className="add-button"
                    onClick={() => add(p.id)}
                  >
                    ADD TO CART
                  </button>

                </div>

              </article>

            ))}

          </main>

        )}

      </section>

      {/* PROMO BANNER */}

      <section className="promo-section">

        <div className="promo-image">

          <img
            src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200"
            alt="Coffee shop interior"
          />

        </div>

        <div className="promo-content">

          <p className="eyebrow">YOUR COFFEE CORNER</p>

          <h2>
            Create a space
            <br />
            worth waking up for.
          </h2>

          <p>
            Beautiful equipment. Better mornings.
            A coffee experience designed around you.
          </p>

          <a href="#products" className="primary-btn">
            EXPLORE THE SHOP →
          </a>

        </div>

      </section>

      {/* FEATURED PRODUCTS */}

      <section className="featured-section">

        <div className="section-heading">

          <div>
            <p className="eyebrow">HANDPICKED FAVORITES</p>
            <h2>Customer Favorites</h2>
          </div>

        </div>

        <div className="featured-grid">

          {featured.map((p) => (

            <div className="featured-card" key={p.id}>

              <img src={p.image} alt={p.name} />

              <div className="featured-info">

                <div>
                  <h3>{p.name}</h3>
                  <p>{money(p.price)}</p>
                </div>

                <button
                  onClick={() => add(p.id)}
                  aria-label={`Add ${p.name} to cart`}
                >
                  +
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ABOUT */}

      <section className="about-section" id="about">

        <div className="about-image">

          <img
            src="https://images.unsplash.com/photo-1498804103079-a6351b050096?w=1200"
            alt="Coffee being prepared"
          />

        </div>

        <div className="about-content">

          <p className="eyebrow">A LITTLE ABOUT US</p>

          <h2>
            We believe
            <br />
            in the beauty
            <br />
            of <span>slow mornings.</span>
          </h2>

          <p>
            Grindstone started with one simple idea:
            make everyday coffee moments more meaningful.
          </p>

          <p>
            We believe the right equipment can change the
            way you experience coffee. That's why we focus
            on practical products, thoughtful design and
            timeless style.
          </p>

          <a href="#products" className="text-link">
            DISCOVER OUR COLLECTION →
          </a>

        </div>

      </section>

      {/* WHY CHOOSE US */}

      <section className="benefits-section">

        <div className="section-heading centered">

          <div>
            <p className="eyebrow">THE GRINDSTONE PROMISE</p>
            <h2>Why Choose Us?</h2>
          </div>

        </div>

        <div className="benefits-grid">

          <div className="benefit-card">
            <span>✦</span>
            <h3>Premium Quality</h3>
            <p>
              Products selected with attention to quality,
              materials and everyday performance.
            </p>
          </div>

          <div className="benefit-card">
            <span>◇</span>
            <h3>Timeless Design</h3>
            <p>
              Minimal and beautiful pieces that look
              great in every coffee corner.
            </p>
          </div>

          <div className="benefit-card">
            <span>☕</span>
            <h3>Coffee First</h3>
            <p>
              Everything we offer is inspired by
              better coffee experiences.
            </p>
          </div>

          <div className="benefit-card">
            <span>♡</span>
            <h3>Made With Care</h3>
            <p>
              We care about the details that make
              your daily routine special.
            </p>
          </div>

        </div>

      </section>

      {/* TESTIMONIALS */}

      <section className="testimonials-section">

        <div className="section-heading centered">

          <div>
            <p className="eyebrow">KIND WORDS</p>
            <h2>What Coffee Lovers Say</h2>
          </div>

        </div>

        <div className="testimonial-grid">

          <div className="testimonial-card">
            <div className="stars">★★★★★</div>

            <p>
              "Beautiful products and a really nice
              shopping experience. My coffee setup
              has never looked better."
            </p>

            <div className="customer">
              <div className="customer-avatar">A</div>
              <div>
                <strong>Alex Morgan</strong>
                <small>Coffee enthusiast</small>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">★★★★★</div>

            <p>
              "I love the simple design and quality.
              The grinder is now part of my everyday
              morning routine."
            </p>

            <div className="customer">
              <div className="customer-avatar">S</div>
              <div>
                <strong>Sarah Williams</strong>
                <small>Home brewer</small>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">★★★★★</div>

            <p>
              "A great collection of coffee essentials.
              Everything looks thoughtfully selected
              and beautifully presented."
            </p>

            <div className="customer">
              <div className="customer-avatar">J</div>
              <div>
                <strong>James Wilson</strong>
                <small>Coffee lover</small>
              </div>
            </div>
          </div>

        </div>

        <p className="demo-note">
          Sample testimonials for website demonstration.
        </p>

      </section>

      {/* NEWSLETTER */}

      <section className="newsletter-section">

        <p className="eyebrow">STAY IN THE LOOP</p>

        <h2>
          A little coffee
          <br />
          inspiration, delivered.
        </h2>

        <p>
          Join our newsletter for product updates,
          brewing inspiration and special offers.
        </p>

        {subscribed ? (

          <p className="subscribe-success">
            Thank you for subscribing!
          </p>

        ) : (

          <form className="newsletter-form" onSubmit={subscribe}>

            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">
              SUBSCRIBE →
            </button>

          </form>

        )}

        <small>Stay inspired. Unsubscribe anytime.</small>

      </section>

      {/* FOOTER */}

      <footer className="footer" id="contact">

        <div className="footer-main">

          <div className="footer-brand">

            <a href="#home" className="logo">
              GRIND<span>STONE.</span>
            </a>

            <p>
              Thoughtfully selected coffee essentials
              for better everyday rituals.
            </p>

            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">IG</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">FB</a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer">PIN</a>
            </div>

          </div>

          <div className="footer-column">
            <h3>EXPLORE</h3>
            <a href="#home">Home</a>
            <a href="#products">Shop</a>
            <a href="#collections">Collections</a>
            <a href="#about">Our Story</a>
          </div>

          <div className="footer-column">
            <h3>SHOP</h3>
            <a href="#products">Brewing</a>
            <a href="#products">Grinders</a>
            <a href="#products">Tools</a>
            <a href="#products">Tableware</a>
          </div>

          <div className="footer-column">
            <h3>HELP</h3>
            <a href="#contact">Contact Us</a>
            <a href="#contact">Shipping Information</a>
            <a href="#contact">Returns</a>
            <a href="#contact">FAQs</a>
          </div>

        </div>

        <div className="footer-bottom">

          <p>© 2026 GRINDSTONE. ALL RIGHTS RESERVED.</p>

          <p>MADE FOR THE LOVE OF COFFEE ☕</p>

        </div>

      </footer>

      {/* CART OVERLAY */}

      {open && (
        <div
          className="overlay"
          onClick={() => setOpen(false)}
        />
      )}

      {/* CART DRAWER */}

      <aside className={open ? "drawer open" : "drawer"}>

        <div className="drawer-head">

          <div>
            <p className="eyebrow">YOUR SELECTION</p>
            <h2>Your Shopping Bag ({count})</h2>
          </div>

          <button
            onClick={() => setOpen(false)}
            aria-label="Close cart"
          >
            ✕
          </button>

        </div>

        {ordered && (
          <div className="order-success">
            <span>✓</span>
            <h3>Thank you!</h3>
            <p>
              Your demo order has been placed successfully.
              No real payment was processed.
            </p>
          </div>
        )}

        {!ordered && items.length === 0 && (

          <div className="cart-empty">
            <span>🛍️</span>
            <h3>Your bag is empty</h3>
            <p>
              Looks like you haven't added anything yet.
            </p>

            <button
              className="primary-btn"
              onClick={() => setOpen(false)}
            >
              CONTINUE SHOPPING
            </button>

          </div>

        )}

        <ul className="cart-items">

          {items.map((i) => (

            <li key={i.id}>

              <img src={i.image} alt={i.name} />

              <div className="li-info">

                <h4>{i.name}</h4>

                <small>{money(i.price)} each</small>

                <div className="qty">

                  <button
                    onClick={() => change(i.id, -1)}
                  >
                    −
                  </button>

                  <span>{i.qty}</span>

                  <button
                    onClick={() => change(i.id, 1)}
                  >
                    +
                  </button>

                </div>

              </div>

              <strong>
                {money(i.price * i.qty)}
              </strong>

            </li>

          ))}

        </ul>

        {!ordered && items.length > 0 && (

          <div className="drawer-foot">

            <div className="subtotal">
              <span>Subtotal</span>
              <strong>{money(total)}</strong>
            </div>

            <div className="shipping">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="subtotal total-row">
              <span>Total</span>
              <strong>{money(total)}</strong>
            </div>

            <button
              className="checkout"
              onClick={checkout}
            >
              PLACE DEMO ORDER →
            </button>

            <p className="checkout-note">
              Demo checkout only. No real payment is taken.
            </p>

          </div>

        )}

      </aside>

    </div>
  );
}
