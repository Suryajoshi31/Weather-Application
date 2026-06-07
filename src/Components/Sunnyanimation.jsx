import { useEffect } from "react";
import gsap from "gsap";

const SunAnimation = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rotate sun
      gsap.to(".sun", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "linear",
        transformOrigin: "50% 50%",
      });

      // Glow pulse
      gsap.to(".sun-glow", {
        scale: 1.4,
        opacity: 0.6,
        yoyo: true,
        repeat: -1,
        duration: 2,
        ease: "power1.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-25 right-5 pointer-events-none z-50">
      <div className="sun relative w-16 h-16 rounded-full bg-yellow-400 shadow-[0_0_40px_rgba(253,224,71,0.9)]">
        <div className="sun-glow absolute inset-0 rounded-full bg-yellow-300 blur-xl"></div>
      </div>
    </div>
  );
};

export default SunAnimation;
