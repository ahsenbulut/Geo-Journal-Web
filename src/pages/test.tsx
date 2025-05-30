import { useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";

export default function Test() {
  useEffect(() => {
    const refMem = ref(db, "memories/");
    onValue(refMem, (snap) => {
      console.log("📦 Firebase'den gelen veri:", snap.val());
    });
  }, []);

  return <h1>Test Sayfası</h1>;
}
