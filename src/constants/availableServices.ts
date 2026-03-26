export const AVAILABLE_SERVICES = [
  '入浴介助',
  '食事介助',
  '排泄介助',
  '機能訓練',
  'レクリエーション',
  '送迎',
  '夜間対応',
  '緊急時対応',
  '医療的ケア',
  'リハビリテーション',
  '認知症ケア',
  '看取り対応',
  '栄養管理',
  '口腔ケア',
] as const;

// 配列から型を自動生成
export type AvailableService = typeof AVAILABLE_SERVICES[number];