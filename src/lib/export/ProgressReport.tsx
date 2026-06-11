import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { PersonalRecord } from "@/lib/analytics";

export interface ProgressReportData {
  email: string;
  generatedAt: string;
  totalSets: number;
  totalVolume: number;
  bodyweightStart: number | null;
  bodyweightLatest: number | null;
  records: PersonalRecord[];
}

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, color: "#1a1a1a" },
  title: { fontSize: 22, marginBottom: 4 },
  subtitle: { fontSize: 10, color: "#666", marginBottom: 16 },
  section: { marginBottom: 16 },
  heading: { fontSize: 14, marginBottom: 6 },
  statRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  tableHeader: { flexDirection: "row", borderBottom: 1, borderColor: "#999", paddingBottom: 3, marginBottom: 3 },
  row: { flexDirection: "row", paddingVertical: 2 },
  cellName: { width: "40%" },
  cell: { width: "20%", textAlign: "right" },
});

/** Builds the progress-report PDF document element. Called by the export route. */
export function ProgressReport(data: ProgressReportData) {
  const bwDelta =
    data.bodyweightStart !== null && data.bodyweightLatest !== null
      ? (data.bodyweightLatest - data.bodyweightStart).toFixed(1)
      : "—";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>LockedIn Progress Report</Text>
        <Text style={styles.subtitle}>
          {data.email} · generated {data.generatedAt}
        </Text>

        <View style={styles.section}>
          <Text style={styles.heading}>Summary</Text>
          <View style={styles.statRow}>
            <Text>Total sets logged</Text>
            <Text>{data.totalSets}</Text>
          </View>
          <View style={styles.statRow}>
            <Text>Total volume lifted</Text>
            <Text>{data.totalVolume.toLocaleString()} kg</Text>
          </View>
          <View style={styles.statRow}>
            <Text>Bodyweight change</Text>
            <Text>
              {bwDelta === "—"
                ? "—"
                : `${bwDelta} kg (${data.bodyweightStart} → ${data.bodyweightLatest})`}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Personal Records</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.cellName}>Exercise</Text>
            <Text style={styles.cell}>Weight</Text>
            <Text style={styles.cell}>Est. 1RM</Text>
            <Text style={styles.cell}>Volume</Text>
          </View>
          {data.records.length === 0 ? (
            <Text>No personal records yet.</Text>
          ) : (
            data.records.map((r) => (
              <View style={styles.row} key={r.exerciseId}>
                <Text style={styles.cellName}>{r.exerciseName}</Text>
                <Text style={styles.cell}>{r.bestWeight} kg</Text>
                <Text style={styles.cell}>{r.bestOneRepMax} kg</Text>
                <Text style={styles.cell}>{r.bestVolume} kg</Text>
              </View>
            ))
          )}
        </View>
      </Page>
    </Document>
  );
}
