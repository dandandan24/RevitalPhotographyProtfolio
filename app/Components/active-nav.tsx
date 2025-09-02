'use client';

import { useEffect } from "react";

interface ActiveNavProps {
  href: string;
}

export default function ActiveNav({ href }: ActiveNavProps) {
  useEffect(() => {
    // Set active navigation state for current page
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const selector = `a[href="${href}"] , a[href="${basePath}${href}"]`;
    const currentLink = document.querySelector(selector);
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