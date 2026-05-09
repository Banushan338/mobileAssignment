import { StyleSheet } from "react-native";
import { THEME } from "./theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef3ff",
    paddingHorizontal: 18,
    paddingTop: 24
  },
  scrollContainer: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 20
  },
  screenContent: {
    flexGrow: 1,
    paddingBottom: 40
  },
  heroCard: {
    borderRadius: 26,
    padding: 24,
    marginBottom: 22,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 6,
    overflow: "hidden"
  },
  heroCardLogin: {
    backgroundColor: "#0ea5e9"
  },
  heroCardRegister: {
    backgroundColor: "#7c3aed"
  },
  heroCardRooms: {
    backgroundColor: "#4f46e5"
  },
  heroCardStudent: {
    backgroundColor: "#0ea5e9"
  },
  heroCardAdmin: {
    backgroundColor: "#5b21b6"
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18
  },
  userCircle: {
    width: 68,
    height: 68,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16
  },
  userInitials: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 22
  },
  profileTextContainer: {
    flex: 1
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4
  },
  heroSubtitle: {
    fontSize: 15,
    color: "#e0e7ff",
    marginBottom: 16,
    lineHeight: 22
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  statCard: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 4
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 4
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.88)",
    textTransform: "uppercase",
    letterSpacing: 0.8
  },
  roleBadge: {
    alignSelf: "flex-start",
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 18,
    fontSize: 12,
    fontWeight: "700"
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  badgePill: {
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18
  },
  badgeText: {
    color: "#fff",
    fontWeight: "700"
  },
  profileDetails: {
    marginTop: 18,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)"
  },
  detailLabel: {
    color: "#dbeafe",
    fontSize: 12,
    marginBottom: 6,
    textTransform: "uppercase"
  },
  detailValue: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 12
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    paddingHorizontal: 2
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a"
  },
  sectionActions: {
    flexDirection: "row",
    alignItems: "center"
  },
  actionButton: {
    marginLeft: 8
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 24,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#eef2ff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 3
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 14
  },
  formContent: {
  },
  imageRow: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  previewImage: {
    width: 72,
    height: 72,
    borderRadius: 16
  },
  previewPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc"
  },
  previewPlaceholderText: {
    color: "#64748b",
    fontSize: 11,
    textAlign: "center"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.42)",
    justifyContent: "center",
    padding: 18
  },
  modalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    maxHeight: "92%",
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 22,
    elevation: 8
  },
  bookingCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a"
  },
  bookingMeta: {
    color: "#475569",
    fontSize: 13,
    marginBottom: 10
  },
  bookingStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14
  },
  bookingPending: {
    backgroundColor: "#fde68a"
  },
  bookingApproved: {
    backgroundColor: "#bbf7d0"
  },
  bookingRejected: {
    backgroundColor: "#fecaca"
  },
  bookingStatusText: {
    fontSize: 12,
    fontWeight: "700"
  },
  bookingPendingText: {
    color: "#92400e"
  },
  bookingApprovedText: {
    color: "#166534"
  },
  bookingRejectedText: {
    color: "#991b1b"
  },
  roomCard: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 22,
    marginVertical: 8,
    borderLeftWidth: 5,
    borderLeftColor: THEME.primary,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 2
  },
  roomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  cardImage: {
    width: 56,
    height: 56,
    borderRadius: 16,
    marginLeft: 12
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 6
  },
  roomMeta: {
    color: "#475569",
    fontSize: 14,
    marginBottom: 6
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16
  },
  listContent: {
    paddingBottom: 60
  },
  roomList: {
    flex: 1
  },
  loading: {
    marginTop: 48
  }
});
