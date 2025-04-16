import { Link } from 'react-router-dom';
import '../errorPage/error.css';
import Logo from '/logo.png';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <img src={Logo} alt="Logo" className="mb-10 max-w-xs mx-auto" />
        <h1>Oops! Something went wrong</h1>
         <p>
          We couldn't find the page you were looking for.<br />
          It may have been moved or deleted. Please try again later.
        </p>
        <Link to="/" className="home-link">Return to Homepage</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
