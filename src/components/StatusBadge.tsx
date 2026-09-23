const styles: Record<string, { bg: string; color: string }> = {
  Paid:     { bg: '#dcfce7', color: '#15803d' },
  Pending:  { bg: '#fef9c3', color: '#92400e' },
  Overdue:  { bg: '#fee2e2', color: '#b91c1c' },
  Approved: { bg: '#dcfce7', color: '#15803d' },
  Rejected: { bg: '#fee2e2', color: '#b91c1c' },
  Active:   { bg: '#dbeafe', color: '#1d4ed8' },
};

export default function StatusBadge({ status }: { status: string }) {
  const s = styles[status] ?? { bg: '#f1f5f9', color: '#475569' };
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: s.bg, color: s.color }}
    >
      {status}
    </span>
  );
}
