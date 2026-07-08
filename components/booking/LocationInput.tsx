"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { PlaceSnapshot } from "@/lib/pricing/types";

declare global {
  interface Window {
    google?: {
      maps?: {
        places?: {
          Autocomplete: new (input: HTMLInputElement, options?: Record<string, unknown>) => {
            addListener: (eventName: string, handler: () => void) => void;
            getPlace: () => {
              address_components?: Array<{ long_name: string; short_name: string; types: string[] }>;
              formatted_address?: string;
              geometry?: { location?: { lat: () => number; lng: () => number } };
              name?: string;
              place_id?: string;
            };
          };
        };
      };
    };
    __vipGooglePlacesLoading?: Promise<void>;
  }
}

const suggestions = [
  "ICN - Incheon Intl T1",
  "ICN - Incheon Intl T2",
  "GMP - Gimpo Domestic",
  "GMP - Gimpo International",
  "Four Seasons Hotel Seoul",
  "Lotte Hotel Seoul",
  "The Shilla Seoul",
  "Grand Hyatt Seoul",
  "Conrad Seoul",
  "COEX",
  "Paradise City Incheon",
  "Pangyo",
  "Bundang",
  "Nami Island"
];

export function LocationInput({
  label,
  value,
  onChange,
  onPlaceSelect,
  placeholder,
  variant = "default",
  marker = "pickup"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect?: (place: PlaceSnapshot | undefined) => void;
  placeholder?: string;
  variant?: "default" | "route";
  marker?: "pickup" | "dropoff";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeRef = useRef(onChange);
  const onPlaceSelectRef = useRef(onPlaceSelect);
  const listId = useId();
  const [placesReady, setPlacesReady] = useState(false);

  useEffect(() => {
    onChangeRef.current = onChange;
    onPlaceSelectRef.current = onPlaceSelect;
  }, [onChange, onPlaceSelect]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey || !inputRef.current) return;

    loadGooglePlaces(apiKey)
      .then(() => {
        if (!inputRef.current || !window.google?.maps?.places?.Autocomplete) return;
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: "kr" },
          fields: ["address_components", "formatted_address", "geometry", "name", "place_id"]
        });
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          onPlaceSelectRef.current?.(toPlaceSnapshot(place));
          onChangeRef.current(place.formatted_address || place.name || inputRef.current?.value || "");
        });
        setPlacesReady(true);
      })
      .catch(() => setPlacesReady(false));
  }, []);

  const input = (
    <>
      <input
        ref={inputRef}
        className={variant === "route" ? "w-full border-0 bg-transparent p-0 text-[15px] font-semibold leading-6 text-ink outline-none placeholder:text-neutral-400 md:text-base" : "field"}
        list={placesReady ? undefined : listId}
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          onPlaceSelect?.(undefined);
          onChange(event.target.value);
        }}
      />
      {!placesReady ? (
        <datalist id={listId}>
          {suggestions.map((suggestion) => (
            <option key={suggestion} value={suggestion} />
          ))}
        </datalist>
      ) : null}
    </>
  );

  if (variant === "route") {
    return (
      <label className="grid grid-cols-[22px_1fr] gap-3 py-3">
        <span className="relative mt-1 flex justify-center">
          <span className={`h-2.5 w-2.5 rounded-full ${marker === "pickup" ? "bg-ink" : "border-2 border-ink bg-white"}`} />
        </span>
        <span className="grid min-w-0 gap-1">
          <span className="text-[10px] font-black uppercase tracking-[0.14em] text-neutral-400">{label}</span>
          {input}
        </span>
      </label>
    );
  }

  return (
    <label className="col-span-2 grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
      <span className="flex items-center justify-between gap-3">
        {label}
        <span className="hidden text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-400 sm:inline">{placesReady ? "Google Places" : "Suggested places"}</span>
      </span>
      {input}
    </label>
  );
}

function toPlaceSnapshot(place: {
  address_components?: Array<{ long_name: string; short_name: string; types: string[] }>;
  formatted_address?: string;
  geometry?: { location?: { lat: () => number; lng: () => number } };
  name?: string;
  place_id?: string;
}): PlaceSnapshot {
  return {
    placeId: place.place_id,
    name: place.name,
    formattedAddress: place.formatted_address,
    lat: place.geometry?.location?.lat(),
    lng: place.geometry?.location?.lng(),
    addressComponents: place.address_components?.map((component) => ({
      longName: component.long_name,
      shortName: component.short_name,
      types: component.types
    }))
  };
}

function loadGooglePlaces(apiKey: string) {
  if (window.google?.maps?.places) return Promise.resolve();
  if (window.__vipGooglePlacesLoading) return window.__vipGooglePlacesLoading;

  window.__vipGooglePlacesLoading = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-vip-google-places]");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Google Places could not be loaded.")));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&language=en&region=KR`;
    script.async = true;
    script.defer = true;
    script.dataset.vipGooglePlaces = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Places could not be loaded."));
    document.head.appendChild(script);
  });

  return window.__vipGooglePlacesLoading;
}
