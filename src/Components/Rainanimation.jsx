
import { useEffect } from "react";
import gsap from "gsap";

const RainAnimation = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".raindrop", {
        y: "100vh",
        opacity: 0,
        duration: 1,
        repeat: -1,
        stagger: {
          amount: 1.5,
          from: "random"
        },
        ease: "linear",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="raindrop absolute top-20px w-2px h-15px bg-blue-300 opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default RainAnimation;
