import React from 'react'

// Amenity Icon Component
const AmenityIcons = ({ type }) => {
  const icons = {
    gym: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="26" width="8" height="12" rx="1" />
        <rect x="16" y="22" width="6" height="20" rx="1" />
        <rect x="22" y="30" width="20" height="4" />
        <rect x="42" y="22" width="6" height="20" rx="1" />
        <rect x="48" y="26" width="8" height="12" rx="1" />
      </svg>
    ),
    pool: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 44c4-4 8 0 12-4s8 0 12-4 8 0 12-4 8 0 12-4" />
        <path d="M8 52c4-4 8 0 12-4s8 0 12-4 8 0 12-4 8 0 12-4" />
        <circle cx="20" cy="16" r="6" />
        <path d="M20 22v10M12 32h16" />
      </svg>
    ),
    road: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8v48M52 8v48M32 12v8M32 28v8M32 44v8" />
      </svg>
    ),
    parking: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="12" y="8" width="40" height="48" rx="4" />
        <path d="M24 20h10a8 8 0 0 1 0 16H24V20z" />
        <path d="M24 36v8" />
      </svg>
    ),
    window: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="10" width="44" height="44" rx="2" />
        <line x1="32" y1="10" x2="32" y2="54" />
        <line x1="10" y1="32" x2="54" y2="32" />
      </svg>
    ),
    power: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M36 8L24 32h16L28 56" />
      </svg>
    ),
    balcony: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="8" width="48" height="24" />
        <path d="M8 32h48" />
        <path d="M16 32v20M48 32v20" />
        <line x1="16" y1="44" x2="48" y2="44" />
        <line x1="26" y1="32" x2="26" y2="44" />
        <line x1="38" y1="32" x2="38" y2="44" />
      </svg>
    ),
    green: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 56V32" />
        <path d="M32 32c-12-2-20-14-16-24 8 1 16 8 16 16" />
        <path d="M32 40c10-2 18-12 14-22-8 1-14 8-14 14" />
      </svg>
    ),
    elevator: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="12" y="8" width="40" height="48" rx="2" />
        <line x1="32" y1="8" x2="32" y2="56" />
        <path d="M20 28l4-6 4 6" />
        <path d="M36 36l4 6 4-6" />
      </svg>
    ),
    cctv: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="32" r="12" />
        <circle cx="24" cy="32" r="4" />
        <path d="M36 26l16-8v28l-16-8" />
      </svg>
    ),
    waste: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 16h32l-4 40H20L16 16z" />
        <path d="M12 16h40" />
        <path d="M24 8h16v8H24z" />
        <line x1="26" y1="24" x2="24" y2="48" />
        <line x1="32" y1="24" x2="32" y2="48" />
        <line x1="38" y1="24" x2="40" y2="48" />
      </svg>
    ),
    automation: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="16" y="16" width="32" height="32" rx="4" />
        <circle cx="32" cy="32" r="8" />
        <path d="M32 8v8M32 48v8M8 32h8M48 32h8" />
      </svg>
    ),
    study: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="12" y="8" width="40" height="32" rx="2" />
        <path d="M20 16h24M20 24h16M20 32h8" />
        <path d="M24 40v16M40 40v16M16 56h32" />
      </svg>
    ),
    bed: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="28" width="56" height="20" rx="2" />
        <path d="M4 48v8M60 48v8" />
        <rect x="8" y="16" width="12" height="12" rx="6" />
        <rect x="44" y="16" width="12" height="12" rx="6" />
      </svg>
    ),
    closet: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="8" width="48" height="48" rx="2" />
        <line x1="32" y1="8" x2="32" y2="56" />
        <line x1="20" y1="28" x2="20" y2="36" />
        <line x1="44" y1="28" x2="44" y2="36" />
      </svg>
    ),
    bar: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 12h32L32 32v16" />
        <path d="M24 48h16" />
        <circle cx="24" cy="20" r="3" />
        <circle cx="40" cy="20" r="3" />
      </svg>
    ),
    play: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="20" />
        <path d="M26 22v20l16-10z" />
      </svg>
    ),
    cinema: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="16" width="48" height="32" rx="2" />
        <path d="M8 24h4M8 32h4M8 40h4M52 24h4M52 32h4M52 40h4" />
        <path d="M24 56l4-8h8l4 8" />
      </svg>
    ),
    lounge: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 40h48v8H8z" />
        <path d="M12 40V28a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v12" />
        <path d="M8 48v8M56 48v8" />
      </svg>
    ),
    kitchen: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="8" width="48" height="48" rx="2" />
        <line x1="8" y1="32" x2="56" y2="32" />
        <circle cx="20" cy="20" r="4" />
        <circle cx="36" cy="20" r="4" />
        <rect x="16" y="40" width="12" height="8" rx="1" />
        <circle cx="44" cy="44" r="4" />
      </svg>
    ),
  }

  return icons[type] || null
}

export default AmenityIcons
