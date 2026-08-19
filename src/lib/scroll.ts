/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/** Smooth-scroll to an element by id, accounting for the sticky header height. */
export function scrollToId(id: string, navOffset = 88): void {
  const selector = id.startsWith('#') ? id : `#${id}`;
  const el = document.querySelector(selector);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
  window.scrollTo({ top, behavior: 'smooth' });
}
