"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUI } from "@/lib/ui-context";

// The cart now lives in a slide-in drawer (available from any page via the
// header) rather than its own page - this route just redirects bookmarked
// or shared /cart links to the homepage and opens that drawer.
export default function CartPage() {
  const router = useRouter();
  const { openCartDrawer } = useUI();

  useEffect(() => {
    openCartDrawer();
    router.replace("/");
  }, [router, openCartDrawer]);

  return null;
}
