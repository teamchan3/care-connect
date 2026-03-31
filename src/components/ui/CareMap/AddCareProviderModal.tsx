"use client";

import { useState } from "react";
import {
  CARE_SERVICE_TYPES,
  type CareServiceType,
} from "@/constants/careServices";
import { useGeocode } from "@/hooks/useGeocode";
import {
  getInitialFormData,
  type ValidationErrors,
  validateCareProviderForm,
} from "@/lib/validations/careProvider";
import { createCareProvider } from "@/services/careProviderService";
import { useCareProviderStore } from "@/stores/careProviderStore";
import type { CareProviderData } from "@/types/careProvider";

type AddCareProviderModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddCareProviderModal({
  isOpen,
  onClose,
}: AddCareProviderModalProps) {
  const [formData, setFormData] = useState<Partial<CareProviderData>>(
    getInitialFormData()
  );
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { geocode, isGeocoding } = useGeocode();
  const { addCareProvider } = useCareProviderStore();

  const handleGeocode = async () => {
    if (!formData.address?.trim()) {
      return;
    }

    const position = await geocode(formData.address);

    if (position) {
      setFormData((prev) => ({ ...prev, position }));
      // 緯度経度のエラーをクリア
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.position;
        return newErrors;
      });
    } else {
      setFormData((prev) => ({ ...prev, position: undefined }));
    }
  };

  const handleSaveCareProvider = async () => {
    // バリデーション実行
    const result = validateCareProviderForm(formData);

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    try {
      // バリデーション通過後のデータをCareProviderDataとして扱う
      // (Zodのrefineでは型が絞り込まれないためキャストが必要)
      const validatedData = result.data as CareProviderData;
      // Firestoreに保存し、自動生成されたIDを取得
      const id = await createCareProvider(validatedData);
      // Firestoreのdoc.idとデータを結合してストアに追加
      addCareProvider({ ...validatedData, id });

      // フォームをリセット
      setFormData(getInitialFormData());
      setErrors({});
      onClose();
    } catch (error) {
      console.error("事業所の登録に失敗しました:", error);
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

        <div className="w-full">
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
          {errors.name && (
            <p className="text-xs text-error mt-1">{errors.name}</p>
          )}
        </div>

        <div className="w-full space-y-2">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="input w-full">
                <span className="label">住所</span>
                <input
                  type="text"
                  className="grow"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
              </label>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGeocode}
              disabled={!formData.address?.trim() || isGeocoding}
            >
              取得
            </button>
          </div>
          {errors.address && (
            <p className="text-xs text-error mt-1">{errors.address}</p>
          )}

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
          {errors.position && (
            <p className="text-xs text-error">{errors.position}</p>
          )}
        </div>

        <div className="w-full">
          <label className="input w-full">
            <span className="label">電話番号</span>
            <input
              type="text"
              className="grow"
              placeholder="例: 0312345678"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
            />
          </label>
          {errors.phoneNumber && (
            <p className="text-xs text-error mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="w-full">
          <select
            className="select w-full"
            value={formData.careServiceType}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                careServiceType: e.target.value as CareServiceType,
              }))
            }
          >
            <option value="">サービス種別を選択してください</option>
            {CARE_SERVICE_TYPES.map((serviceType) => (
              <option key={serviceType} value={serviceType}>
                {serviceType}
              </option>
            ))}
          </select>
          {errors.careServiceType && (
            <p className="text-xs text-error mt-1">{errors.careServiceType}</p>
          )}
        </div>

        <button
          type="button"
          className="btn btn-primary w-full"
          onClick={handleSaveCareProvider}
        >
          登録する
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  );
}
