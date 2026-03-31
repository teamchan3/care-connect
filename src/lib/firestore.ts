/**
 * Firestoreに送信可能な形式にデータを整形する
 * - undefinedフィールドを除去（Firestoreはundefinedを受け付けない）
 */
export function sanitizeForFirestore<T extends Record<string, unknown>>(
  data: T
): T {
  return Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== undefined)
  ) as T;
}
