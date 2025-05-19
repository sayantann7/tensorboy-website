import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  // Create ref for cursor element
  const cursorDotRef = useRef(null);
  // Track cursor visibility and interaction states
  const isVisible = useRef(true);
  const isClicked = useRef(false);
  const isLinkHovered = useRef(false);
  
  useEffect(() => {
    // Get the cursor element
    const cursorDot = cursorDotRef.current;
    
    if (!cursorDot) return;
    
    // Track actual mouse position but don't rotate
    const updatePosition = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Update dot position immediately - no delay
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
      
      // No rotation calculation - cursor remains fixed
    };
    
    // Show/hide cursor based on mouse entering/leaving window
    const handleMouseEnter = () => {
      isVisible.current = true;
      cursorDot.style.opacity = '1';
    };
    
    const handleMouseLeave = () => {
      isVisible.current = false;
      cursorDot.style.opacity = '0';
    };
    
    // Handle mouse down/up for click effect
    const handleMouseDown = () => {
      isClicked.current = true;
      cursorDot.style.transform = 'scale(0.8)';
    };
    
    const handleMouseUp = () => {
      isClicked.current = false;
      cursorDot.style.transform = 'scale(1)';
    };
    
    // Handle hover effects on links and buttons
    const handleLinkHoverStart = () => {
      isLinkHovered.current = true;
      cursorDot.style.filter = 'drop-shadow(0 0 8px white)';
      cursorDot.style.transform = 'scale(1.5)';
    };
    
    const handleLinkHoverEnd = () => {
      isLinkHovered.current = false;
      cursorDot.style.filter = 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.6))';
      cursorDot.style.transform = 'scale(1)';
    };
    
    // Add event listeners
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Apply hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkHoverStart);
      el.addEventListener('mouseleave', handleLinkHoverEnd);
    });
    
    // Clean up event listeners
    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHoverStart);
        el.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, []);
  
  return <div ref={cursorDotRef} className="cursor-dot"></div>;
};

export default CustomCursor;