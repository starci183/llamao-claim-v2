export default function Loading() {
  return (
    <div className="flex flex-row gap-4 items-center justify-center">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
      </div>
      <p className="text-center text-sm text-gray-500">Loading...</p>
    </div>
  );
}
