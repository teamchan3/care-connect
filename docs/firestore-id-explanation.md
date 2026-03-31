# Firestoreのドキュメント構造

## ドキュメントIDとデータの関係

### Firestoreに保存されているデータ

```
careProviders (コレクション)
├── abc123 (ドキュメントID)
│   └── データ:
│       ├── name: "デイサービスA"
│       ├── address: "東京都渋谷区..."
│       └── phoneNumber: "03-1234-5678"
│
└── xyz789 (ドキュメントID)
    └── データ:
        ├── name: "訪問介護B"
        └── ...
```

### doc.data() の中身（IDは含まれない）

```json
{
  "name": "デイサービスA",
  "address": "東京都渋谷区...",
  "phoneNumber": "03-1234-5678"
  // ⚠️ "id" フィールドは存在しない！
}
```

### doc.id の中身

```
"abc123"
```

### 結合が必要

```typescript
// ❌ これだけでは id が取得できない
const data = doc.data();
console.log(data);
// { name: "...", address: "...", phoneNumber: "..." }
// id がない！

// ✅ 手動で id を追加する必要がある
const careProvider = {
  id: doc.id,        // ← IDを追加
  ...doc.data(),     // ← その他のデータを展開
};
console.log(careProvider);
// { id: "abc123", name: "...", address: "...", phoneNumber: "..." }
```

## なぜこの設計なのか？

1. **柔軟性**: IDをデータの一部として保存する必要がない
2. **一意性の保証**: IDはFirestoreが自動管理
3. **ストレージの節約**: IDを2箇所に保存しない
4. **更新の簡単さ**: データ更新時にIDを気にしなくていい

## 注意点

### ❌ よくある間違い

```typescript
// ❌ これではIDが取得できない
const careProviders = querySnapshot.docs.map(doc => doc.data());
// [{ name: "...", address: "..." }, ...]  ← idがない！
```

### ✅ 正しい方法

```typescript
// ✅ IDを手動で追加
const careProviders = querySnapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data(),
}));
// [{ id: "abc123", name: "...", address: "..." }, ...]
```

## 実装例

### src/services/careProviderService.ts

```typescript
export async function fetchCareProviders(): Promise<CareProvider[]> {
  const querySnapshot = await getDocs(collection(db, COLLECTIONS.CARE_PROVIDERS));

  const careProviders: CareProvider[] = [];
  querySnapshot.forEach((doc) => {
    careProviders.push({
      id: doc.id,        // ← Firestore DocumentID
      ...doc.data(),     // ← その他のフィールド
    } as CareProvider);
  });

  return careProviders;
}
```

### CareProvider型との対応

```typescript
export type CareProvider = {
  id: string;              // ← doc.id から取得
  name: string;            // ← doc.data().name
  address: string;         // ← doc.data().address
  position: { lat, lng };  // ← doc.data().position
  // ...
};
```
