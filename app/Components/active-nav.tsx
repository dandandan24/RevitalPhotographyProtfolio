'use client';

import { useEffect } from "react";

interface ActiveNavProps {
  href: string;
}

export default function ActiveNav({ href }: ActiveNavProps) {
  useEffect(() => {
    // Set active navigation state for current page
    const currentLink = document.querySelector(`a[href="${href}"]`);
    if (currentLink) {
      currentLink.setAttribute('aria-current', 'page');
    }

    // Cleanup function to remove the attribute when leaving the page
    return () => {
      if (currentLink) {
        currentLink.removeAttribute('aria-current');
      }
    };
  }, [href]);

  return null; // This component doesn't render anything
} 