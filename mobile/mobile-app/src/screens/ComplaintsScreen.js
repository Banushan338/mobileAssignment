import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { apiRequest } from "../api/api";
import AppButton from "../components/AppButton";
import { styles } from "../theme/screenStyles";

export default function ComplaintsScreen({ auth, navigation }) {
  const [complaints, setComplaints] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [complaintTitle, setComplaintTitle] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Other");
  const [selectedPriority, setSelectedPriority] = useState("Medium");
  const [complaintImage, setComplaintImage] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const categories = ["Maintenance", "Cleanliness", "Facilities", "Other"];
  const priorities = ["Low", "Medium", "High"];
  const userRole = String(auth.user?.role || "").toLowerCase();

  const loadComplaints = async () => {
    try {
      const data = await apiRequest("/complaints", "GET", auth.token);
      setComplaints(data);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const loadBookings = async () => {
    try {
      const data = await apiRequest("/bookings", "GET", auth.token);
      setBookings(data.filter((b) => b.status === "Approved"));
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    await Promise.all([loadComplaints(), loadBookings()]);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    // Auto-select booking if only one available
    if (bookings.length === 1 && !selectedBooking) {
      setSelectedBooking(bookings[0]);
    }
  }, [bookings]);

  const pickImage = async () => {
    try {
      const picker = ImagePicker && typeof ImagePicker.launchImageLibraryAsync === "function"
        ? ImagePicker
        : ImagePicker?.default;

      if (!picker) {
        return Alert.alert("Image picker unavailable", "Image picker is not available.");
      }

      let permission = { granted: true };
      if (typeof picker.requestMediaLibraryPermissionsAsync === "function") {
        permission = await picker.requestMediaLibraryPermissionsAsync();
      }

      if (!permission.granted) {
        return Alert.alert("Permission denied", "Please allow gallery permission.");
      }

      const result = await picker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.7
      });

      if (!result.canceled && result.assets?.length > 0) {
        setComplaintImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Image picker error", error?.message || "Could not open gallery.");
    }
  };

  const submitComplaint = async () => {
    if (!selectedBooking) {
      return Alert.alert("Select Booking", "Please select a booking to file a complaint against.");
    }
    if (!complaintTitle || !complaintTitle.trim()) {
      return Alert.alert("Missing Title", "Please enter a complaint title.");
    }
    if (!complaintDescription || !complaintDescription.trim()) {
      return Alert.alert("Missing Description", "Please enter a detailed description of the issue.");
    }

    try {
      const formData = new FormData();
      formData.append("bookingId", selectedBooking._id);
      formData.append("title", complaintTitle.trim());
      formData.append("description", complaintDescription.trim());
      formData.append("category", selectedCategory);
      formData.append("priority", selectedPriority);

      if (complaintImage && !complaintImage.startsWith("http")) {
        const uriParts = complaintImage.split("/");
        const name = uriParts[uriParts.length - 1] || `complaint-${Date.now()}.jpg`;
        const extMatch = name.match(/\.(\w+)$/);
        const ext = extMatch ? extMatch[1].toLowerCase() : "jpg";
        const mimeType = ext === "jpg" ? "image/jpeg" : `image/${ext}`;

        formData.append("image", {
          uri: complaintImage,
          name,
          type: mimeType
        });
      }

      await apiRequest("/complaints", "POST", auth.token, formData);
      Alert.alert("Success", "Complaint submitted successfully!");
      resetForm();
      setShowComplaintForm(false);
      refreshData();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const resetForm = () => {
    setComplaintTitle("");
    setComplaintDescription("");
    setSelectedBooking(null);
    setSelectedCategory("Other");
    setSelectedPriority("Medium");
    setComplaintImage(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "#ef4444";
      case "In Progress":
        return "#f59e0b";
      case "Resolved":
        return "#10b981";
      case "Closed":
        return "#6b7280";
      default:
        return "#3b82f6";
    }
  };

  if (loading) {
    return <ActivityIndicator style={styles.loading} size="large" color="#4f46e5" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.profileRow}>
            <View style={styles.userCircle}>
              <Text style={styles.userInitials}>
                {auth.user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </Text>
            </View>
            <View style={styles.profileTextContainer}>
              <Text style={styles.heroTitle}>Complaints</Text>
              <Text style={styles.heroSubtitle}>
                {userRole === "admin"
                  ? "Review and respond to student complaints"
                  : "Report issues with your booked rooms"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {userRole === "admin" ? "All Complaints" : "My Complaints"}
          </Text>
          {userRole === "student" && (
            <AppButton
              title={showComplaintForm ? "Cancel" : "New Complaint"}
              variant={showComplaintForm ? "secondary" : "success"}
              onPress={() => {
                if (showComplaintForm) resetForm();
                setShowComplaintForm(!showComplaintForm);
              }}
              fullWidth={false}
            />
          )}
        </View>

        {userRole === "student" && showComplaintForm && (
          <View style={styles.card}>
            <Text style={styles.formTitle}>File a Complaint</Text>

            {bookings.length === 0 ? (
              <View style={styles.noBookingsContainer}>
                <Text style={styles.noBookingsText}>
                  📚 You need an approved booking to file a complaint.
                </Text>
                <Text style={styles.noBookingsSubtext}>
                  First, request and get approval for a room booking.
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.detailLabel}>
                  Select Booking * {selectedBooking && "✓"}
                </Text>
                <ScrollView
                  style={styles.bookingSelector}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  {bookings.map((booking) => (
                    <Pressable
                      key={booking._id}
                      style={[
                        styles.bookingSelectItem,
                        selectedBooking?._id === booking._id && styles.bookingSelectItemActive
                      ]}
                      onPress={() => setSelectedBooking(booking)}
                    >
                      <Text
                        style={[
                          styles.bookingSelectText,
                          selectedBooking?._id === booking._id &&
                            styles.bookingSelectTextActive
                        ]}
                      >
                        Room {booking.room?.roomNumber}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>

                <Text style={styles.detailLabel}>Title *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Brief title of the issue"
                  value={complaintTitle}
                  onChangeText={setComplaintTitle}
                  placeholderTextColor="#cbd5e1"
                />

                <Text style={styles.detailLabel}>Description *</Text>
                <TextInput
                  style={[styles.textInput, styles.textInputMultiline]}
                  placeholder="Detailed description of the issue"
                  value={complaintDescription}
                  onChangeText={setComplaintDescription}
                  multiline
                  numberOfLines={4}
                  placeholderTextColor="#cbd5e1"
                />

                <Text style={styles.detailLabel}>Category</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {categories.map((cat) => (
                    <Pressable
                      key={cat}
                      style={[
                        styles.categoryBadge,
                        selectedCategory === cat && styles.categoryBadgeActive
                      ]}
                      onPress={() => setSelectedCategory(cat)}
                    >
                      <Text
                        style={[
                          styles.categoryBadgeText,
                          selectedCategory === cat && styles.categoryBadgeTextActive
                        ]}
                      >
                        {cat}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>

                <Text style={styles.detailLabel}>Priority</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {priorities.map((pri) => (
                    <Pressable
                      key={pri}
                      style={[
                        styles.priorityBadge,
                        selectedPriority === pri && styles.priorityBadgeActive
                      ]}
                      onPress={() => setSelectedPriority(pri)}
                    >
                      <Text
                        style={[
                          styles.priorityBadgeText,
                          selectedPriority === pri && styles.priorityBadgeTextActive
                        ]}
                      >
                        {pri}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>

                <Text style={styles.detailLabel}>Upload Image (Optional)</Text>
                <Pressable style={styles.uploadButton} onPress={pickImage}>
                  <Text style={styles.uploadButtonText}>📸 {complaintImage ? "Change Image" : "Upload Image"}</Text>
                </Pressable>

                {complaintImage && (
                  <Image source={{ uri: complaintImage }} style={styles.previewImage} />
                )}

                <AppButton
                  title="Submit Complaint"
                  variant="success"
                  onPress={submitComplaint}
                />
              </>
            )}
          </View>
        )}

        <View style={styles.card}>
          {complaints.length === 0 ? (
            <Text style={styles.emptyText}>
              {userRole === "admin"
                ? "No complaints yet."
                : "You haven't filed any complaints yet."}
            </Text>
          ) : (
            complaints.map((complaint) => (
              <Pressable
                key={complaint._id}
                style={styles.complaintCard}
                onPress={() => {
                  setSelectedComplaint(complaint);
                  setShowDetails(true);
                }}
              >
                <View style={styles.complaintHeader}>
                  <View>
                    <Text style={styles.complaintTitle}>{complaint.title}</Text>
                    <Text style={styles.complaintMeta}>
                      Room {complaint.room?.roomNumber} • {complaint.category}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(complaint.status) }
                    ]}
                  >
                    <Text style={styles.statusBadgeText}>{complaint.status}</Text>
                  </View>
                </View>
                <Text style={styles.complaintMeta} numberOfLines={2}>
                  {complaint.description}
                </Text>
                {complaint.image && (
                  <Image
                    source={{ uri: complaint.image }}
                    style={styles.complaintThumb}
                  />
                )}
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>

      <Modal visible={showDetails} animationType="slide" transparent>
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Pressable
              style={styles.closeModalButton}
              onPress={() => setShowDetails(false)}
            >
              <Text style={styles.closeButton}>✕</Text>
            </Pressable>

            {selectedComplaint && (
              <ScrollView contentContainerStyle={styles.complaintDetails}>
                <Text style={styles.formTitle}>{selectedComplaint.title}</Text>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Room</Text>
                  <Text style={styles.detailValue}>
                    {selectedComplaint.room?.roomNumber} ({selectedComplaint.room?.roomType})
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Category</Text>
                  <Text style={styles.detailValue}>{selectedComplaint.category}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Priority</Text>
                  <Text style={styles.detailValue}>{selectedComplaint.priority}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Status</Text>
                  <Text
                    style={[
                      styles.detailValue,
                      { color: getStatusColor(selectedComplaint.status) }
                    ]}
                  >
                    {selectedComplaint.status}
                  </Text>
                </View>

                <Text style={styles.detailLabel}>Description</Text>
                <Text style={styles.descriptionText}>
                  {selectedComplaint.description}
                </Text>

                {selectedComplaint.image && (
                  <>
                    <Text style={styles.detailLabel}>Attached Image</Text>
                    <Image
                      source={{ uri: selectedComplaint.image }}
                      style={styles.fullImage}
                    />
                  </>
                )}

                {selectedComplaint.response && (
                  <>
                    <Text style={styles.detailLabel}>Admin Response</Text>
                    <View style={styles.responseBox}>
                      <Text style={styles.responseText}>
                        {selectedComplaint.response}
                      </Text>
                      <Text style={styles.responseMeta}>
                        By: {selectedComplaint.respondedBy?.name} •{" "}
                        {selectedComplaint.respondedAt
                          ? new Date(selectedComplaint.respondedAt).toLocaleDateString()
                          : ""}
                      </Text>
                    </View>
                  </>
                )}

                <Pressable
                  style={styles.closeButton2}
                  onPress={() => setShowDetails(false)}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </Pressable>
              </ScrollView>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
