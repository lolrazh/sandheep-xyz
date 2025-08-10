import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/Layout";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] text-center">
        <h1 className="font-playfair text-8xl font-medium mb-4">404</h1>
        <p className="text-xl text-foreground/80 mb-8">
          The page you're looking for has been misplaced in time.
        </p>
        <button 
          onClick={() => navigate('/')} 
          className="font-lexend text-sm uppercase tracking-wider text-foreground/70 hover:text-foreground transition-colors"
        >
          ← Return Home
        </button>
      </div>
    </Layout>
  );
};

export default NotFound;
