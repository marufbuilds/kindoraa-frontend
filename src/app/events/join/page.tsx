 import { Suspense } from "react";
import JoinEventPage from "./JoinEventPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <p className="py-20 text-center text-gray-600">
          Loading...
        </p>
      }
    >
      <JoinEventPage />
    </Suspense>
  );
}