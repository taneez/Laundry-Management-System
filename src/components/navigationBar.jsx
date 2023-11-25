import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <Link className="navbar-brand" to="/">
          <img
            src="assets/laundry-machine.png"
            alt="logo"
            width={40}
            style={{ marginLeft: 20 }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav" style={{ fontSize: "17.5px" }}>
            <li className="nav-item2">
              <Link className="nav-link" to="/portal">
                Laundry
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/lostfound">
                Lost & Found
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/adminAnnouncements">
                Messages for Students
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/studentComplaints">
                Messages for Admin
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav"></ul>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
