"use client";

import { useEffect, useState } from "react";
import { useCountStore } from "@/stores/countStore";

export default function Home() {
  const count = useCountStore((state) => state.count);
  const increment = useCountStore((state) => state.increment);
  // const decrement = useCountStore((state) => state.decrement);
  
  // useEffect(() => {
    
  // }, []);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button className="btn btn-primary" onClick={increment}>Click me</button>
      <p>Count: {count}</p>
    </div>
  );
}
