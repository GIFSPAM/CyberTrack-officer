export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-16 text-[#5a6478]">
      <div className="text-[14px]">{message}</div>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="text-center py-16 text-[#c0392b]">
      <div className="text-[14px]">{message}</div>
    </div>
  );
}
