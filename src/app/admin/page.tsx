import { getEmails } from "@/lib/emails";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const entries = getEmails();

  return (
    <div className="min-h-screen bg-t-bg font-mono p-6 text-t-text">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b border-t-border pb-3 mb-6">
          <p className="text-[10px] text-t-dim tracking-widest">
            VANTAGERIG / ADMIN / EMAIL LIST
          </p>
          <h1 className="text-t-amber text-lg font-bold mt-1">
            WAITLIST ENTRIES
          </h1>
        </div>

        {/* Stats row */}
        <div className="flex gap-6 mb-6">
          <div className="border border-t-border p-3 min-w-[120px]">
            <p className="text-[10px] text-t-dim tracking-widest mb-1">
              TOTAL
            </p>
            <p className="text-t-amber text-2xl font-bold">
              {entries.length}
            </p>
          </div>
          <div className="border border-t-border p-3 min-w-[120px]">
            <p className="text-[10px] text-t-dim tracking-widest mb-1">
              LATEST
            </p>
            <p className="text-t-amber text-xs pt-1">
              {entries.length > 0
                ? new Date(
                    entries[entries.length - 1].ts
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "—"}
            </p>
          </div>
        </div>

        {/* Export hint */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[10px] text-t-dim tracking-widest">
            ENTRIES — {entries.length} RECORDS
          </p>
          <a
            href="/api/admin/emails"
            className="text-[10px] text-t-amber hover:text-t-amber tracking-widest border border-t-border px-3 py-1 transition-colors"
          >
            EXPORT JSON
          </a>
        </div>

        {/* Table */}
        {entries.length === 0 ? (
          <div className="border border-t-border p-8 text-center text-t-dim text-xs tracking-widest">
            NO ENTRIES YET
          </div>
        ) : (
          <div className="border border-t-border overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-t-border bg-t-surface">
                  <th className="text-left px-4 py-2 text-t-dim tracking-widest font-normal">
                    #
                  </th>
                  <th className="text-left px-4 py-2 text-t-dim tracking-widest font-normal">
                    EMAIL
                  </th>
                  <th className="text-left px-4 py-2 text-t-dim tracking-widest font-normal">
                    TIMESTAMP
                  </th>
                  <th className="text-left px-4 py-2 text-t-dim tracking-widest font-normal">
                    IP
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...entries].reverse().map((entry, i) => (
                  <tr
                    key={entry.email}
                    className="border-b border-t-border last:border-0 hover:bg-t-surface transition-colors"
                  >
                    <td className="px-4 py-2 text-t-dim">
                      {entries.length - i}
                    </td>
                    <td className="px-4 py-2 text-t-amber">
                      {entry.email}
                    </td>
                    <td className="px-4 py-2 text-t-text">
                      {new Date(entry.ts).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-2 text-t-dim">{entry.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
