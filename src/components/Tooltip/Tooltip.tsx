import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  triggerClassName?: string;
  triggerStyle?: React.CSSProperties;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, triggerClassName = 'inline-block', triggerStyle }) => {
  const [visible, setVisible] = useState(false);
  const [tooltipStyles, setTooltipStyles] = useState({ top: 0, left: 0 });
  const [triggerHovered, setTriggerHovered] = useState(false);
  const [tooltipHovered, setTooltipHovered] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // const updateTooltipPosition = () => {
  //   if (triggerRef.current && tooltipRef.current) {
  //     const triggerRect = triggerRef.current.getBoundingClientRect();
  //     const tooltipRect = tooltipRef.current.getBoundingClientRect();

  //     let top = triggerRect.bottom; // Remove gap for immediate appearance
  //     let left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;

  //     // Prevent overflow right
  //     if (left + tooltipRect.width > window.innerWidth) {
  //       left = window.innerWidth - tooltipRect.width - 8;
  //     }

  //     // Prevent overflow left
  //     if (left < 0) {
  //       left = 8;
  //     }

  //     // Prevent overflow bottom
  //     if (top + tooltipRect.height > window.innerHeight) {
  //       top = triggerRect.top - tooltipRect.height - 8; // Show above
  //     }

  //     setTooltipStyles({ top, left });
  //   }
  // };

  const updateTooltipPosition = () => {
    if (triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
  
      // Center the tooltip horizontally below the trigger (job tile)
      let top = triggerRect.bottom; // Directly below the job, no gap
      let left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
  
      // Prevent overflow right
      if (left + tooltipRect.width > window.innerWidth) {
        left = window.innerWidth - tooltipRect.width - 8;
      }
  
      // Prevent overflow left
      if (left < 0) {
        left = 8;
      }
  
      // Prevent overflow bottom
      if (top + tooltipRect.height > window.innerHeight) {
        top = triggerRect.top - tooltipRect.height - 8; // Show above if not enough space
      }
  
      setTooltipStyles({ top, left });
    }
  };

  const handleTriggerEnter = () => {
    updateTooltipPosition();
    setTriggerHovered(true);
  };

  const handleTriggerLeave = () => {
    setTriggerHovered(false);
  };

  const handleTooltipEnter = () => setTooltipHovered(true);
  const handleTooltipLeave = () => setTooltipHovered(false);

  useEffect(() => {
    setVisible(triggerHovered || tooltipHovered);
  }, [triggerHovered, tooltipHovered]);

  useEffect(() => {
    if (visible) {
      window.addEventListener('scroll', updateTooltipPosition, true);
      window.addEventListener('resize', updateTooltipPosition);
    }

    return () => {
      window.removeEventListener('scroll', updateTooltipPosition, true);
      window.removeEventListener('resize', updateTooltipPosition);
    };
  }, [visible]);

  return (
    <>
      <div
        ref={triggerRef}
        className={triggerClassName}
        style={triggerStyle}
        onMouseEnter={handleTriggerEnter}
        onMouseLeave={handleTriggerLeave}
      >
        {children}
      </div>

      {/* Tooltip is always rendered */}
      <div
        ref={tooltipRef}
        onMouseEnter={handleTooltipEnter}
        onMouseLeave={handleTooltipLeave}
        className={`fixed z-50 bg-gray-800 text-white text-xs rounded px-3 py-2 shadow-lg max-w-xs transition-opacity duration-150 ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ top: tooltipStyles.top, left: tooltipStyles.left, marginTop: 0 }}
      >
        {content}
      </div>
    </>
  );
};

export default Tooltip;