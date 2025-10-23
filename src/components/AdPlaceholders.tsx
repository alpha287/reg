import React from 'react';

export const TopAdPlaceholder: React.FC = () => (
  <div className="ad-placeholder h-24 mb-4">
    <div className="text-xs">Advertisement Space - Top Banner</div>
    <div className="text-xs text-muted-foreground mt-1">728x90 or responsive</div>
  </div>
);

export const SidebarAdPlaceholder: React.FC = () => (
  <div className="ad-placeholder h-64">
    <div className="text-xs">Advertisement Space</div>
    <div className="text-xs text-muted-foreground mt-1">300x250 or responsive</div>
  </div>
);

export const MiddleAdPlaceholder: React.FC = () => (
  <div className="ad-placeholder h-24 mt-4">
    <div className="text-xs">Advertisement Space - Middle Banner</div>
    <div className="text-xs text-muted-foreground mt-1">728x90 or responsive</div>
  </div>
);

export const BottomAdPlaceholder: React.FC = () => (
  <div className="ad-placeholder h-24 mt-4">
    <div className="text-xs">Advertisement Space - Bottom Banner</div>
    <div className="text-xs text-muted-foreground mt-1">728x90 or responsive</div>
  </div>
);

export const FloatingAdPlaceholder: React.FC = () => (
  <div className="floating-ad">
    <div className="text-xs">Floating Ad</div>
    <div className="text-xs text-muted-foreground mt-1">300x120</div>
  </div>
);

export const ContentAdPlaceholder: React.FC = () => (
  <div className="ad-placeholder h-24 my-4">
    <div className="text-xs">Advertisement Space - Content Banner</div>
    <div className="text-xs text-muted-foreground mt-1">728x90 or responsive</div>
  </div>
);

export const BannerAdPlaceholder: React.FC = () => (
  <div className="ad-placeholder h-32 mx-auto max-w-4xl">
    <div className="text-sm font-medium">Advertisement Space - Footer Banner</div>
    <div className="text-xs text-muted-foreground mt-1">970x250 or responsive banner</div>
    <div className="text-xs text-muted-foreground mt-1">Prime placement above footer</div>
  </div>
);