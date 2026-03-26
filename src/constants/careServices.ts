export const CARE_SERVICE_TYPES = [
  'デイサービス',
  '訪問介護',
  '訪問看護',
  '居宅介護支援',
  '特別養護老人ホーム',
  '介護老人保健施設',
  'グループホーム',
  '有料老人ホーム',
  'サービス付き高齢者向け住宅',
  '小規模多機能型居宅介護',
  'その他',
] as const;

// 配列から型を自動生成
export type CareServiceType = typeof CARE_SERVICE_TYPES[number];