interface UserAvatarProps {
  name: string;
  subtitle?: string;
  compact?: boolean;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase() ?? "")
    .join("");
}

export function UserAvatar({ name, subtitle, compact = false }: UserAvatarProps) {
  const initials = getInitials(name);

  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-petrol-700 text-sm font-bold text-white">
        {initials}
      </span>
      {!compact ? (
        <span className="hidden text-left sm:block">
          <strong className="block text-sm text-slate-900">{name}</strong>
          {subtitle ? <small className="text-xs text-slate-500">{subtitle}</small> : null}
        </span>
      ) : null}
    </div>
  );
}

