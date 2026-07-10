import { Link, NavLink } from 'react-router-dom';

type LayoutProps = {
  children: React.ReactNode;
};

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
  { label: 'Disclaimer', to: '/disclaimer' },
];

function Layout({ children }: LayoutProps) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="DropCode home">
          <span className="brand-mark">D</span>
          <span>DropCode</span>
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="nav-links">
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={item.to}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div>
          <strong>DropCode</strong>
          <p>Anonymous file and text sharing with modern security and streamlined retrieval.</p>
        </div>
        <div className="footer-links">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/disclaimer">Disclaimer</Link>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
