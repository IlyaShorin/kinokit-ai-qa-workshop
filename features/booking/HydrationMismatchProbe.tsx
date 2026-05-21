'use client';

type HydrationMismatchProbeProps = {
  enabled: boolean;
};

export function HydrationMismatchProbe({ enabled }: HydrationMismatchProbeProps) {
  if (!enabled) {
    return null;
  }

  const label =
    typeof window === 'undefined'
      ? 'SSR и клиент согласованы: A2'
      : 'Клиентская бронь пересчитана: B1';

  return (
    <p aria-label="SSR client state" className="hydration-probe" data-testid="hydration-probe">
      {label}
    </p>
  );
}
