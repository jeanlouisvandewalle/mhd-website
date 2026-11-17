"use client";

import { useSyncExternalStore } from "react";

const BUILD_YEAR = new Date().getFullYear();
const subscribe = () => () => {};

/** Huidig jaartal: bij de build ingevuld en in de browser automatisch geactualiseerd. */
export function Year() {
  const year = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => BUILD_YEAR);
  return <>{year}</>;
}
