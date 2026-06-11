/** Download links for exporting the user's data. Plain anchors hit the export route handlers. */
export default function ExportButtons() {
  const linkClass =
    "bg-sleek_gray hover:bg-atlantis_blue rounded-md px-4 py-2 text-white text-sm transition-colors";
  return (
    <div className="flex flex-wrap gap-3 justify-center py-4">
      <a className={linkClass} href="/api/export/csv?type=logs">Logs CSV</a>
      <a className={linkClass} href="/api/export/csv?type=bodyweight">Bodyweight CSV</a>
      <a className={linkClass} href="/api/export/csv?type=nutrition">Nutrition CSV</a>
      <a className={linkClass} href="/api/export/pdf">Progress report (PDF)</a>
    </div>
  );
}
