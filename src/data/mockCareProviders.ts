import { CareProvider } from "@/types/careProvider";

/**
 * 開発・テスト用のダミーデータ
 * 本番環境では使用されません
 */
export const MOCK_CARE_PROVIDERS: CareProvider[] = [
  {
    id: "mock-1",
    name: "介護事業所サンプルA（デイサービス）",
    position: { lat: 35.6762, lng: 139.6503 }, // 東京駅
    address: "東京都千代田区丸の内1-1-1",
    phoneNumber: "03-1234-5678",
    careServiceTypes: ["デイサービス"],
    availableServices: ["入浴介助", "食事介助", "レクリエーション", "送迎"],
  },
  {
    id: "mock-2",
    name: "介護事業所サンプルB（訪問介護）",
    position: { lat: 35.6895, lng: 139.6917 }, // 新宿
    address: "東京都新宿区西新宿2-8-1",
    phoneNumber: "03-2345-6789",
    careServiceTypes: ["訪問介護", "訪問看護"],
    availableServices: ["入浴介助", "食事介助", "排泄介助", "医療的ケア"],
  },
  {
    id: "mock-3",
    name: "介護事業所サンプルC（グループホーム）",
    position: { lat: 35.6585, lng: 139.7454 }, // 渋谷
    address: "東京都渋谷区渋谷2-21-1",
    phoneNumber: "03-3456-7890",
    careServiceTypes: ["グループホーム"],
    availableServices: [
      "入浴介助",
      "食事介助",
      "排泄介助",
      "機能訓練",
      "認知症ケア",
      "夜間対応",
    ],
  },
  {
    id: "mock-4",
    name: "介護事業所サンプルD（特別養護老人ホーム）",
    position: { lat: 35.7090, lng: 139.8107 }, // 上野
    address: "東京都台東区上野7-1-1",
    phoneNumber: "03-4567-8901",
    careServiceTypes: ["特別養護老人ホーム"],
    availableServices: [
      "入浴介助",
      "食事介助",
      "排泄介助",
      "機能訓練",
      "リハビリテーション",
      "医療的ケア",
      "看取り対応",
      "栄養管理",
    ],
  },
  {
    id: "mock-5",
    name: "介護事業所サンプルE（複合型）",
    position: { lat: 35.6284, lng: 139.7386 }, // 品川
    address: "東京都港区港南2-16-1",
    phoneNumber: "03-5678-9012",
    careServiceTypes: ["小規模多機能型居宅介護"],
    availableServices: [
      "入浴介助",
      "食事介助",
      "排泄介助",
      "機能訓練",
      "レクリエーション",
      "送迎",
      "夜間対応",
      "緊急時対応",
    ],
  },
];
