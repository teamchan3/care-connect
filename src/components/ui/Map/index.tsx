"use client";

import { useState } from "react";
import {
  APIProvider,
  Map as GoogleMap,
  Marker,
} from "@vis.gl/react-google-maps";
import { useCareProviderStore } from "@/stores/careProviderStore";

export default function Map() {
  const [isAddCareProviderModalOpen, setIsAddCareProviderModalOpen] =
    useState(false);
  const careProviders = useCareProviderStore((state) => state.careProviders);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error("Google Maps API key is not defined");
  }

  const center = { lat: 35.6762, lng: 139.6503 }; // 東京
  const zoom = 13;

  return (
    <div className="h-full w-full">
      <div className="h-full w-full">
        <APIProvider apiKey={apiKey}>
          <GoogleMap
            defaultCenter={center}
            defaultZoom={zoom}
            mapTypeId="roadmap"
            disableDefaultUI={true}
            gestureHandling="greedy"
            style={{ width: "100%", height: "100%" }}
          >
            {careProviders.map((provider) => (
              <Marker
                key={provider.id}
                position={provider.position}
                title={provider.name}
              />
            ))}
          </GoogleMap>
        </APIProvider>
      </div>
      <div className="absolute bottom-10 right-10">
        <button
          type="button"
          className="btn btn-lg btn-circle btn-primary"
          onClick={() => setIsAddCareProviderModalOpen(true)}
        >
          <svg
            aria-label="New"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>

      <dialog
        id="add-care-provider-modal"
        className="modal"
        open={isAddCareProviderModalOpen}
        onClose={() => setIsAddCareProviderModalOpen(false)}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
