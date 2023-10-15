import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { EditorProps } from "@/components/editor-component";

const EditorComp = dynamic<EditorProps>(
  () => import("@/components/editor-component"),
  { ssr: false },
);

function Loading() {
  return (
    <div className="flex flex-col space-y-4 p-8 pt-6">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded" />
            <div className="h-4 bg-gray-300 rounded w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewPostPage() {
  return (
    <div className="container relative h-screen flex flex-col justify-between">
      <Suspense fallback={<Loading />}>
        <EditorComp markdown="" />
        <div className="sticky bottom-0 backdrop bg-white/50 backdrop-blur-sm">
          <div className="flex flex-shrink-0 justify-end px-4 py-4 border-t">
            <button
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
              // onClick={() => setOpen(false)}
              type="button"
            >
              Cancel
            </button>
            <button
              className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
