import { useEffect, useState } from "react";

const VISIBILITY_SCROLL_OFFSET = 320;
const BOTTOM_HIDE_OFFSET = 24;

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportBottom = window.innerHeight + scrollTop;
      const documentHeight = document.documentElement.scrollHeight;
      const isNearBottom =
        viewportBottom >= documentHeight - BOTTOM_HIDE_OFFSET;

      setIsVisible(
        scrollTop > VISIBILITY_SCROLL_OFFSET && !isNearBottom,
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      className="scroll-to-top-btn"
      aria-label="Volver arriba"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <img className="scroll-to-top-icon" src="/src/assets/icons/flecha-izquierda.webp" alt="" />
    </button>
  );
};
