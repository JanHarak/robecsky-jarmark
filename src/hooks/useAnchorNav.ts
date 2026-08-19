/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToId } from '../lib/scroll';

/**
 * Returns a handler that scrolls to a homepage section by id. If the user is
 * not on the homepage, it first navigates there and passes the target section
 * via router state (HomePage performs the scroll on arrival).
 */
export function useAnchorNav(): (id: string) => void {
  const navigate = useNavigate();
  const location = useLocation();

  return (id: string) => {
    const clean = id.replace(/^#/, '');
    if (location.pathname === '/') {
      scrollToId(clean);
    } else {
      navigate('/', { state: { scrollTo: clean } });
    }
  };
}
