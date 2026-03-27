"use client";

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Property } from "@/hooks/use-properties";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface PropertyMapProps {
  properties: Property[];
  onPinClick?: (id: string) => void;
  highlightedId?: string;
}

export function PropertyMap({
  properties,
  onPinClick,
  highlightedId,
}: PropertyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<Record<string, mapboxgl.Marker>>({});

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [55.2708, 25.2048],
      zoom: 11,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear old markers
    Object.values(markers.current).forEach((m) => m.remove());
    markers.current = {};

    properties.forEach((property) => {
      const el = document.createElement("div");
      el.className = "property-pin";
      el.innerHTML = `
        <div style="
          background: ${property.is_featured ? "#D4A02A" : "#1A1F2E"};
          color: ${property.is_featured ? "#1A1F2E" : "#fff"};
          padding: 4px 8px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          border: 2px solid white;
          transition: transform 0.15s;
          font-family: DM Sans, sans-serif;
        ">
          AED ${(property.price / 1000).toFixed(0)}K
        </div>
      `;

      el.addEventListener("mouseenter", () => {
        el.firstElementChild!.setAttribute(
          "style",
          el.firstElementChild!.getAttribute("style")! +
            "transform: scale(1.1);",
        );
      });

      el.addEventListener("click", () => onPinClick?.(property.id));

      const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([property.longitude, property.latitude])
        .addTo(map.current!);

      markers.current[property.id] = marker;
    });
  }, [properties, onPinClick]);

  // Highlight selected pin
  useEffect(() => {
    Object.entries(markers.current).forEach(([id, marker]) => {
      const el = marker.getElement().firstElementChild as HTMLElement;
      if (!el) return;
      el.style.transform = id === highlightedId ? "scale(1.2)" : "scale(1)";
      el.style.zIndex = id === highlightedId ? "10" : "1";
    });
  }, [highlightedId]);

  return (
    <div
      ref={mapContainer}
      className="h-full w-full rounded-2xl overflow-hidden"
      style={{ minHeight: "500px" }}
    />
  );
}
