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
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0"
  },
  closeButton: {
    fontSize: 28,
    color: "#64748b",
    fontWeight: "600"
  },
  calendarContainer: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff"
  },
  dateDisplayContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f1f5f9",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16
  },
  dateDisplay: {
    flex: 1,
    alignItems: "center"
  },
  dateLabel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 6,
    fontWeight: "600",
    textTransform: "uppercase"
  },
  dateValue: {
    fontSize: 16,
    color: "#4f46e5",
    fontWeight: "700"
  },
  stepIndicator: {
    textAlign: "center",
    fontSize: 13,
    color: "#64748b",
    marginBottom: 16,
    fontWeight: "500"
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16
  },
  buttonReset: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    alignItems: "center"
  },
  buttonResetText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#64748b"
  },
  buttonConfirm: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#4f46e5",
    alignItems: "center"
  },
  buttonConfirmText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff"
  },
  buttonConfirmDisabled: {
    backgroundColor: "#cbd5e1",
    opacity: 0.6
  },
  datePickerButton: {
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12
  },
  datePickerButtonText: {
    fontSize: 14,
    color: "#4f46e5",
    fontWeight: "600"
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
    fontSize: 14,
    color: "#1f2937",
    backgroundColor: "#f8fafc"
  },
  textInputMultiline: {
    height: 100,
    textAlignVertical: "top"
  },
  bookingSelector: {
    marginBottom: 16,
    marginHorizontal: -20,
    paddingHorizontal: 20
  },
  bookingSelectItem: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    backgroundColor: "#f8fafc"
  },
  bookingSelectItemActive: {
    backgroundColor: "#4f46e5",
    borderColor: "#4f46e5"
  },
  bookingSelectText: {
    color: "#475569",
    fontSize: 13,
    fontWeight: "600"
  },
  bookingSelectTextActive: {
    color: "#fff"
  },
  categoryBadge: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 12
  },
  categoryBadgeActive: {
    backgroundColor: "#e0e7ff",
    borderColor: "#4f46e5"
  },
  categoryBadgeText: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "600"
  },
  categoryBadgeTextActive: {
    color: "#4f46e5"
  },
  priorityBadge: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 12
  },
  priorityBadgeActive: {
    backgroundColor: "#fef2f2",
    borderColor: "#dc2626"
  },
  priorityBadgeText: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "600"
  },
  priorityBadgeTextActive: {
    color: "#dc2626"
  },
  uploadButton: {
    backgroundColor: "#f1f5f9",
    borderWidth: 2,
    borderColor: "#cbd5e1",
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12
  },
  uploadButtonText: {
    fontSize: 14,
    color: "#4f46e5",
    fontWeight: "600"
  },
  complaintCard: {
    backgroundColor: "#f8fafc",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#ef4444",
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  complaintHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8
  },
  complaintTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4
  },
  complaintMeta: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 8
  },
  complaintThumb: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginTop: 8
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff"
  },
  complaintDetails: {
    paddingBottom: 40
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0"
  },
  detailValue: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "600"
  },
  descriptionText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    marginBottom: 16
  },
  fullImage: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    marginVertical: 12
  },
  responseBox: {
    backgroundColor: "#f0fdf4",
    borderLeftWidth: 4,
    borderLeftColor: "#10b981",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
  },
  responseText: {
    fontSize: 13,
    color: "#1f2937",
    lineHeight: 18,
    marginBottom: 8
  },
  responseMeta: {
    fontSize: 11,
    color: "#64748b",
    fontStyle: "italic"
  },
  closeModalButton: {
    alignSelf: "flex-end",
    marginBottom: 12
  },
  closeButton2: {
    backgroundColor: "#e2e8f0",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937"
  },
  emptyText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 14,
    marginVertical: 20
  },
  noBookingsContainer: {
    backgroundColor: "#fef3c7",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
    marginBottom: 16
  },
  noBookingsText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#92400e",
    marginBottom: 8
  },
  noBookingsSubtext: {
    fontSize: 13,
    color: "#b45309",
    lineHeight: 18
  }
});
