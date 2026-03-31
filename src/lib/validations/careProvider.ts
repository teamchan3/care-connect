import { z } from "zod";
import { CARE_SERVICE_TYPES } from "@/constants/careServices";
import type { CareProviderData } from "@/types/careProvider";

// 型安全なincludes チェック用のヘルパー
function isValidCareServiceType(value: string): boolean {
  return CARE_SERVICE_TYPES.some((type) => type === value);
}

export const careProviderFormSchema = z.object({
  name: z.string().min(1, "事業所名は必須です"),

  address: z.string().min(1, "住所は必須です"),

  position: z
    .object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    })
    .nullish()
    .refine((val) => val !== null && val !== undefined, {
      message: "住所から緯度経度を取得してください",
    }),

  phoneNumber: z
    .string()
    .regex(/^0\d{9,10}$/, "正しい電話番号を入力してください（例: 0312345678）")
    .optional()
    .or(z.literal("")),

  careServiceType: z
    .string()
    .nullish()
    .refine((val) => val !== undefined && val !== null && val.length > 0, {
      message: "サービス種別を選択してください",
    })
    .refine((val) => val && isValidCareServiceType(val), {
      message: "正しいサービス種別を選択してください",
    }),

  availableServices: z.array(z.string()).optional().default([]),

  capacity: z
    .number()
    .int("定員は整数で入力してください")
    .min(1, "定員は1以上で入力してください")
    .optional(),

  businessHoursStart: z.string().optional(),

  businessHoursEnd: z.string().optional(),
});

//フォームデータの型
export type CareProviderFormData = z.infer<typeof careProviderFormSchema>;

//バリデーションエラーの型
export type ValidationErrors = Partial<
  Record<keyof CareProviderFormData, string>
>;

//バリデーション
export function validateCareProviderForm(
  data: unknown
):
  | { success: true; data: CareProviderFormData }
  | { success: false; errors: ValidationErrors } {
  const result = careProviderFormSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  // Zodのエラーをフラットな形式に変換
  const errors: ValidationErrors = {};
  for (const issue of result.error.issues) {
    const path = issue.path.join(".");
    errors[path as keyof CareProviderFormData] = issue.message;
  }

  return { success: false, errors };
}

/**
 * フォームの初期値を取得する関数
 * ここにあるのが正しいのか・・？
 */
export function getInitialFormData(): Partial<CareProviderData> {
  return {
    name: "",
    address: "",
    position: undefined,
    phoneNumber: "",
    careServiceType: undefined,
    availableServices: [],
    capacity: undefined,
    businessHoursStart: "",
    businessHoursEnd: "",
  };
}
