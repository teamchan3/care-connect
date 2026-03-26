import { useState } from "react";

type GeocodeResult = {
  lat: number;
  lng: number;
};

type UseGeocodeReturn = {
  geocode: (address: string) => Promise<GeocodeResult | null>;
  isGeocoding: boolean;
  error: string | null;
};

/**
 * Google Maps Geocoding APIを使用して住所から緯度経度を取得するカスタムフック
 *
 * @example
 * ```tsx
 * const { geocode, isGeocoding } = useGeocode();
 *
 * const handleSubmit = async () => {
 *   const position = await geocode("東京都渋谷区渋谷1-1-1");
 *   if (position) {
 *     console.log(position.lat, position.lng);
 *   }
 * };
 * ```
 */
export function useGeocode(): UseGeocodeReturn {
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const geocode = async (
    address: string
  ): Promise<GeocodeResult | null> => {
    if (!address.trim()) {
      setError("住所を入力してください");
      return null;
    }

    setIsGeocoding(true);
    setError(null);

    try {
      const geocoder = new google.maps.Geocoder();

      const result = await geocoder.geocode({ address });

      if (result.results?.[0]) {
        const location = result.results[0].geometry.location;
        return { lat: location.lat(), lng: location.lng() };
      }

      setError("住所が見つかりませんでした");
      return null;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "ジオコーディングエラー";
      console.error("Geocoding error:", err);
      setError(errorMessage);
      return null;
    } finally {
      setIsGeocoding(false);
    }
  };

  return { geocode, isGeocoding, error };
}
