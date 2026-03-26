"use client";

import { useState } from "react";
import type { MapEntity } from "@/types/mapEntity";

interface AddCareProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCareProviderModal({
  isOpen,
  onClose,
}: AddCareProviderModalProps) {
  const [formData, setFormData] = useState<Partial<MapEntity>>({
    name: "",
    address: "",
    position: undefined,
  });
  const [isGeocoding, setIsGeocoding] = useState(false);

  const handleGeocode = async () => {
    if (!formData.address?.trim()) {
      return;
    }

    setIsGeocoding(true);

    try {
      const geocoder = new google.maps.Geocoder();

      const result = await geocoder.geocode({
        address: formData.address,
      });

      if (result.results?.[0]) {
        const location = result.results[0].geometry.location;
        setFormData((prev) => ({
          ...prev,
          position: { lat: location.lat(), lng: location.lng() },
        }));
      } else {
        setFormData((prev) => ({ ...prev, position: undefined }));
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      setFormData((prev) => ({ ...prev, position: undefined }));
    } finally {
      setIsGeocoding(false);
    }
  };

  return (
    <dialog
      id="add-care-provider-modal"
      className="modal"
      open={isOpen}
      onClose={onClose}
    >
      <div className="modal-box space-y-4">
        <h3 className="font-bold text-lg">事業所を登録</h3>

        <label className="input w-full">
          <span className="label">事業所名</span>
          <input
            type="text"
            className="grow"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </label>

        <div className="w-full space-y-2">
          <div className="flex gap-2">
            <label className="input flex-1">
              <span className="label">住所</span>
              <input
                type="text"
                className="grow"
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
              />
            </label>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGeocode}
              disabled={!formData.address?.trim() || isGeocoding}
            >
              取得
            </button>
          </div>

          {(() => {
            if (isGeocoding) {
              return (
                <p className="text-xs text-gray-500">緯度経度を取得中...</p>
              );
            }
            const lat = formData?.position?.lat.toFixed(6) ?? "-";
            const lng = formData?.position?.lng.toFixed(6) ?? "-";
            return (
              <p className="text-xs text-gray-500">
                緯度: {lat}, 経度: {lng}
              </p>
            );
          })()}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  );
}
