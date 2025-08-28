import { Link, useParams } from "react-router-dom";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";

const NotFoundIllustration = () => (
  <svg viewBox="0 0 180 180" fill="none" className="mx-auto mb-6 w-40 sm:w-48 md:w-56 h-auto" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
    <circle cx="90" cy="90" r="90" fill="#f3f4f6" />
    <text x="50%" y="54%" textAnchor="middle" fill="#d1d5db" fontSize="64" fontWeight="bold" dy=".3em">404</text>
    <circle cx="65" cy="110" r="7" fill="#d1d5db" />
    <circle cx="115" cy="110" r="7" fill="#d1d5db" />
    <rect x="70" y="130" width="40" height="8" rx="4" fill="#e5e7eb" />
  </svg>
);

function NotFoundPage() {

  const [paramText, setParamText] = useState(null)
  const params = useParams();
  

  function getParamText() 
  {
    if (params['*'] === "post-not-found") {
      setParamText("Post not found")
    }
  }

  useEffect(
    () => {
      getParamText();
    }, []
  )
  
  return (
    <div className="w-full max-w-2xl backdrop-blur-md rounded-xl sm:p-6 p-4 space-y-4 relative bg-white/10 dark:bg-black/20 border border-white/10 shadow-xl">
      <div className="flex flex-col items-center text-center">
        <NotFoundIllustration />
        <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow">{paramText ? paramText : "Page Not Found"}</h1>
        <p className="text-white/80 max-w-md">The page you are looking for doesn’t exist or has been moved.</p>
        <div className="mt-6">
          <Button as={Link} to="/" viewTransition="true" color="primary" radius="sm" variant="solid">
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage