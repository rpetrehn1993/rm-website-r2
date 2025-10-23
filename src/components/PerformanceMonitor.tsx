'use client';

import { useEffect } from 'react';
import { measurePerformance } from '@/lib/analytics';

export default function PerformanceMonitor() {
  useEffect(() => {
    const handleLoad = () => {
      const metrics = measurePerformance();
      if (metrics) {
        console.log('Performance Metrics:', metrics);
        
        // Send to analytics if needed
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'performance_metrics', {
            dom_content_loaded: metrics.domContentLoaded,
            load_complete: metrics.loadComplete,
            first_byte: metrics.firstByte,
          });
        }
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return null;
}

