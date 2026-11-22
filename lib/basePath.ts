/**
 * Submap waarin de site draait. Leeg op het eigen domein (totaalprojecten-mhd.be).
 * Voor de voorbeeldlink op GitHub Pages (…github.io/mhd-website/) zet de publicatie
 * NEXT_PUBLIC_BASE_PATH=/mhd-website. Links via next/link krijgen dit automatisch;
 * gewone paden (foto's) gebruiken deze constante.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
