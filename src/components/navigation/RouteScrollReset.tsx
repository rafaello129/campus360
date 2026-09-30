import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function RouteScrollReset() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const container = document.querySelector<HTMLElement>("[data-route-scroll]");
    if (container) container.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.search]);

  return null;
}
