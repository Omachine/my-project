import React from 'react';
import "fireBall.css";

const FireBall = () => {
    const ballRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
  
    useEffect(() => {
      const ball = ballRef.current;
  
      const moveBall = () => {
        const { x, y } = position;
        ball.style.transform = `translate(${x}px, ${y}px)`;
      };
  
      window.addEventListener('mousemove', handleMouseMove);
  
      const update = () => {
        moveBall();
        requestAnimationFrame(update);
      };
  
      update();
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, [position]);
  
    return <div ref={ballRef} className="fire-ball" />;
  };
  
  export default FireBall;