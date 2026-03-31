import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { COLLECTIONS } from "@/constants/collections";
import { db } from "@/lib/firebase";
import { sanitizeForFirestore } from "@/lib/firestore";
import type { CareProvider, CareProviderData } from "@/types/careProvider";

export async function fetchCareProviders(): Promise<CareProvider[]> {
  try {
    const querySnapshot = await getDocs(
      collection(db, COLLECTIONS.CARE_PROVIDERS)
    );

    const careProviders: CareProvider[] = [];
    querySnapshot.forEach((doc) => {
      careProviders.push({
        id: doc.id,
        ...doc.data(),
      } as CareProvider);
    });

    return careProviders;
  } catch (error) {
    console.error("事業所データの取得に失敗しました:", error);
    throw error;
  }
}

export async function createCareProvider(
  data: CareProviderData
): Promise<string> {
  try {
    const docRef = await addDoc(
      collection(db, COLLECTIONS.CARE_PROVIDERS),
      sanitizeForFirestore(data)
    );
    return docRef.id;
  } catch (error) {
    console.error("事業所の登録に失敗しました:", error);
    throw error;
  }
}

export async function updateCareProvider(
  id: string,
  data: Partial<CareProviderData>
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.CARE_PROVIDERS, id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("事業所の更新に失敗しました:", error);
    throw error;
  }
}

export async function deleteCareProvider(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.CARE_PROVIDERS, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("事業所の削除に失敗しました:", error);
    throw error;
  }
}
