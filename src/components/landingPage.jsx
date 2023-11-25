import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="container">
      <header>
        {/* Blank header */}
        <div style={{ height: "100px" }}></div>
      </header>
      <h1 className="display-4">Welcome to our Laundry Service!</h1>
      <p className="lead">
        We provide easy access to laundry management on campus. Made by the
        students. For the students.
      </p>
      <div>
        <Link to="/login">
          <button className="btn btn-primary mr-2" style={{ margin: 5 }}>
            Sign In
          </button>
        </Link>
        <Link to="/register">
          <button className="btn btn-secondary" style={{ margin: 5 }}>
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
