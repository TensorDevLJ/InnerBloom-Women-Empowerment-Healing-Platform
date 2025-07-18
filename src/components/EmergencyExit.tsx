import { useEffect } from 'react';

const EmergencyExit = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Triple press Escape key for emergency exit
      if (event.key === 'Escape') {
        let escapeCount = parseInt(sessionStorage.getItem('escapeCount') || '0');
        escapeCount++;
        sessionStorage.setItem('escapeCount', escapeCount.toString());
        
        if (escapeCount >= 3) {
          // Clear the count and redirect to Google
          sessionStorage.removeItem('escapeCount');
          window.location.replace('https://www.google.com');
          return;
        }
        
        // Reset count after 2 seconds if not triple-pressed
        setTimeout(() => {
          sessionStorage.removeItem('escapeCount');
        }, 2000);
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Create emergency exit button
    const emergencyBtn = document.createElement('div');
    emergencyBtn.innerHTML = '⚠️';
    emergencyBtn.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      background: #ef4444;
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      opacity: 0.7;
      transition: opacity 0.2s;
    `;
    
    emergencyBtn.onmouseenter = () => emergencyBtn.style.opacity = '1';
    emergencyBtn.onmouseleave = () => emergencyBtn.style.opacity = '0.7';
    emergencyBtn.onclick = () => window.location.replace('https://www.google.com');
    emergencyBtn.title = 'Emergency Exit (or press Escape 3 times quickly)';
    
    document.body.appendChild(emergencyBtn);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (document.body.contains(emergencyBtn)) {
        document.body.removeChild(emergencyBtn);
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default EmergencyExit;