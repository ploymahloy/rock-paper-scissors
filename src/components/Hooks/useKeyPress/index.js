import { useState, useEffect } from 'react';

// Usage
export default function KeyPress() {
  // Call our hook for each key that we'd like to monitor
  const leftArrowPress = useKeyPress(37);
  const upArrowPress = useKeyPress(38);
  const rightArrowPress = useKeyPress(39);
  const downArrowPress = useKeyPress(40);

  // return (
  //   <div>
  //     <div>
  //       {leftArrowPress && 'Left'}
  //       {upArrowPress && 'Up'}
  //       {rightArrowPress && 'Right'}
  //       {downArrowPress && 'Down'}
  //     </div>
  //   </div>
  // );
}

// Hook
function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    console.dir("test");
    if (key === targetKey) {
        setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}