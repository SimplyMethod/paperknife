export default function Loading() {
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
