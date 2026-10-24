import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export interface AdSenseNoticeProps {
  /**
   * Your Google AdSense publisher ID (e.g., 'ca-pub-1234567890123456').
   * When empty or placeholder, displays the clear, unobtrusive notice.
   */
  adClient?: string;

  /**
   * Your Google AdSense ad unit slot ID (e.g., '9876543210').
   */
  adSlot?: string;

  /**
   * The ad layout format (defaults to 'auto').
   */
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';

  /**
   * Responsive full-width behavior (defaults to true).
   */
  fullWidthResponsive?: boolean;

  /**
   * Descriptive location label for this ad placement (e.g. 'Content Responsive Banner').
   */
  slotName?: string;

  /**
   * Optional custom CSS class name.
   */
  className?: string;

  /**
   * Minimum height to avoid layout shift (CLS).
   */
  minHeight?: number;
}

/**
 * AdSenseNotice component:
 * 1. Displays a clear, unobtrusive notice where ads will appear adhering to Google AdSense publisher policies.
 * 2. Has the 'data-ad-client' and 'data-ad-slot' structure ready for when the user adds their Google AdSense code.
 * 3. Automatically activates the live AdSense unit when valid publisher credentials are supplied.
 */
export const AdSenseNotice: React.FC<AdSenseNoticeProps> = ({
  adClient = '',
  adSlot = '',
  adFormat = 'auto',
  fullWidthResponsive = true,
  slotName = 'Responsive Content Banner',
  className = '',
  minHeight = 90,
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const isLiveAd = Boolean(
    adClient &&
      adSlot &&
      adClient.startsWith('ca-pub-') &&
      !adClient.includes('XXXX') &&
      !adSlot.includes('XXXX')
  );

  useEffect(() => {
    if (isLiveAd && typeof window !== 'undefined') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        // Ignored if adblocker is active or script is still loading
      }
    }
  }, [isLiveAd]);

  return (
    <div
      className={`my-6 w-full flex flex-col items-center justify-center text-center ${className}`}
      aria-label="Advertisement Placement"
    >
      {/* Top policy-compliant label */}
      <div className="w-full max-w-4xl flex items-center justify-between px-2 mb-1.5 text-[10px] uppercase tracking-wider text-slate-400 font-medium select-none">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block" />
          <span>Advertisement</span>
        </span>
        <span className="text-slate-400 font-mono text-[9px]">{slotName}</span>
      </div>

      {isLiveAd ? (
        /* Real Google AdSense unit once approved & configured */
        <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-slate-200/80 bg-white p-2">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', minHeight: `${minHeight}px` }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
          />
        </div>
      ) : (
        /* Unobtrusive, policy-compliant placeholder notice ready with data-ad-client and data-ad-slot structure */
        <div
          className="w-full max-w-4xl rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4 sm:p-5 text-slate-500 transition-all select-none"
          style={{ minHeight: `${minHeight}px` }}
          data-ad-client={adClient || 'ca-pub-XXXXXXXXXXXXXXXX'}
          data-ad-slot={adSlot || 'XXXXXXXXXX'}
          data-ad-format={adFormat}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-left space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700 text-xs">Google AdSense Placement</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-600 font-mono text-[10px]">
                  Pending Publisher Code
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed max-w-lg">
                This space is reserved for a responsive ad unit. Advertisements will appear here once your Google AdSense publisher code is added to the HTML head.
              </p>
            </div>

            {/* Structure info tag */}
            <div className="shrink-0 flex items-center gap-1.5 font-mono text-[10px] text-slate-400 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200">
              <span>slot:</span>
              <span className="text-slate-600 font-bold">{adSlot || 'data-ad-slot'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Backward compatibility alias for AdContainer
 */
export const AdContainer = AdSenseNotice;
