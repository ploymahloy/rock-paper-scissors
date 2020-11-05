import { useEffect, useState } from 'react';

import utils from '../utils';

export default function useViewportDimensions() {
  const [windowDimensions, setViewportDimensions] = useState({
    width  : utils.getViewportWidth()  || 0,
    height : utils.getViewportHeight() || 0,
  });

  useEffect(() => {
    function setDimensions () {
      setViewportDimensions({
        width  : utils.getViewportWidth(),
        height : utils.getViewportHeight(),
      });
    }

    window.addEventListener('resize', setDimensions);

    return () => window.removeEventListener('resize', setDimensions);
  }, []);

  return windowDimensions;
}
