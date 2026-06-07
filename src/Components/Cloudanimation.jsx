
import { useEffect } from "react";
import gsap from "gsap";

const CloudAnimation = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".cloud", {
        x: "100vw",
        duration: 30,
        repeat: -1,
        ease: "linear",
        stagger: {
          amount: 5,
          from: "random"
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="cloud absolute w-32 h-16 bg-white/70 rounded-full blur-sm"
          style={{
            left: `-150px`,
            top: `${Math.random() * 40}%`,
          }}
        />
      ))}
    </div>
  );
};

export default CloudAnimation;
