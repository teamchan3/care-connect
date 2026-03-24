"use client";

import { useCountStore } from "@/stores/countStore";

export default function Header() {
  const count = useCountStore((state) => state.count);
  return (
    <header className={`bg-base-100/90`}>
      <div className={`navbar`}>
        <h1>Header</h1>
        <p>
          {count}
        </p>
      </div>
    </header>
  );
}