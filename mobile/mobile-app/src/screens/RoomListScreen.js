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
  View
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { apiRequest } from "../api/api";
import AppButton from "../components/AppButton";
import FormInput from "../components/FormInput";
import DateRangeCalendar from "../components/DateRangeCalendar";
import { ROOM_ACCENT_COLORS } from "../theme/theme";
import { styles } from "../theme/screenStyles";

export default function RoomListScreen({ auth, setAuth, navigation }) {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [pricePerMonth, setPricePerMonth] = useState("");
  const [roomType, setRoomType] = useState("Single");
  const [roomImage, setRoomImage] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [bookingStartDate, setBookingStartDate] = useState("");
  const [bookingEndDate, setBookingEndDate] = useState("");
  const [showDateCalendar, setShowDateCalendar] = useState(false);
  const userRole = String(auth.user?.role || "").toLowerCase();

  const availableRoomsCount = rooms.filter((room) => room.availabilityStatus === "Available").length;
  const pendingBookingCount = bookings.filter((booking) => booking.status === "Pending").length;
  const approvedBookingCount = bookings.filter((booking) => booking.status === "Approved").length;
  const studentBookingCount = bookings.length;

  const heroSubtitle =
    userRole === "admin"
      ? "Manage rooms, approve student requests, and keep the campus vibrant."
      : "Browse the best student rooms, track bookings, and request a space in seconds.";

  const heroStats =
    userRole === "admin"
      ? [
          { label: "Pending", value: pendingBookingCount, color: "#f472b6" },
          { label: "Rooms", value: rooms.length, color: "#38bdf8" },
          { label: "Open", value: availableRoomsCount, color: "#86efac" }
        ]
      : [
          { label: "Booked", value: studentBookingCount, color: "#fb923c" },
          { label: "Rooms", value: rooms.length, color: "#60a5fa" },
          { label: "Available", value: availableRoomsCount, color: "#c084fc" }
        ];

  const loadRooms = async () => {
    try {
      const data = await apiRequest("/rooms", "GET", auth.token);
      setRooms(data);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const loadBookings = async () => {
    try {
      const data = await apiRequest("/bookings", "GET", auth.token);
      setBookings(data);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    await Promise.all([loadRooms(), loadBookings()]);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");

  const resetForm = () => {
    setRoomNumber("");
    setCapacity("");
    setPricePerMonth("");
    setRoomType("Single");
    setRoomImage(null);
    setEditingRoom(null);
  };

  const handleDateRangeSelected = (startDate, endDate) => {
    setBookingStartDate(startDate);
    setBookingEndDate(endDate);
  };

  const pickImage = async () => {
    try {
      const picker = (ImagePicker && typeof ImagePicker.launchImageLibraryAsync === "function")
        ? ImagePicker
        : (ImagePicker && ImagePicker.default && typeof ImagePicker.default.launchImageLibraryAsync === "function")
          ? ImagePicker.default
          : null;

      if (!picker) {
        return Alert.alert(
          "Image picker unavailable",
          "Image picker is not available in this build. Restart Expo and ensure expo-image-picker is installed."
        );
      }

      let permission = { granted: true };
      if (typeof picker.requestMediaLibraryPermissionsAsync === "function") {
        permission = await picker.requestMediaLibraryPermissionsAsync();
      } else if (typeof picker.requestCameraRollPermissionsAsync === "function") {
        permission = await picker.requestCameraRollPermissionsAsync();
      }

      const granted = Boolean(permission && permission.granted);
      if (!granted) {
        return Alert.alert("Permission denied", "Please allow gallery permission to upload room photos.");
      }

      const pickerMediaType =
        (picker.MediaType && picker.MediaType.Images) ||
        (picker.MediaTypeOptions && picker.MediaTypeOptions.Images);
      const result = await picker.launchImageLibraryAsync({
        ...(pickerMediaType ? { mediaTypes: pickerMediaType } : {}),
        allowsEditing: true,
        quality: 0.7
      });

      const canceled = Boolean(result && (result.canceled ?? result.cancelled));
      if (!canceled && result && Array.isArray(result.assets) && result.assets.length > 0) {
        const pickedUri = result.assets[0] && result.assets[0].uri;
        if (pickedUri) {
          setRoomImage(pickedUri);
        }
      }
    } catch (error) {
      Alert.alert("Image picker error", error?.message || "Could not open gallery.");
    }
  };

  const buildRoomForm = () => {
    const formData = new FormData();
    formData.append("roomNumber", roomNumber);
    formData.append("capacity", capacity);
    formData.append("pricePerMonth", pricePerMonth);
    formData.append("roomType", roomType);
    formData.append("currentOccupancy", editingRoom ? String(editingRoom.currentOccupancy) : "0");
    formData.append("description", editingRoom?.description || "Created via mobile app");

    if (roomImage && !roomImage.startsWith("http")) {
      const uriParts = roomImage.split("/");
      const name = uriParts[uriParts.length - 1] || `room-${Date.now()}.jpg`;
      const extMatch = name.match(/\.(\w+)$/);
      const ext = extMatch ? extMatch[1].toLowerCase() : "jpg";
      const mimeType = ext === "jpg" ? "image/jpeg" : `image/${ext}`;

      formData.append("image", {
        uri: roomImage,
        name,
        type: mimeType
      });
    }

    return formData;
  };

  const saveRoom = async () => {
    if (!roomNumber || !capacity || !pricePerMonth) {
      return Alert.alert("Please fill in all required fields", "Room number, capacity and price are required.");
    }

    try {
      const payload = buildRoomForm();

      if (editingRoom) {
        await apiRequest(`/rooms/${editingRoom._id}`, "PUT", auth.token, payload);
      } else {
        await apiRequest("/rooms", "POST", auth.token, payload);
      }
      resetForm();
      setShowCreateForm(false);
      refreshData();
    } catch (error) {
      Alert.alert(editingRoom ? "Update failed" : "Save failed", error.message);
    }
  };

  const startEdit = (room) => {
    setEditingRoom(room);
    setRoomNumber(room.roomNumber);
    setCapacity(String(room.capacity));
    setPricePerMonth(String(room.pricePerMonth));
    setRoomType(room.roomType);
    setRoomImage(room.image || null);
    setShowCreateForm(true);
  };

  const requestBooking = async (roomId) => {
    if (!bookingStartDate || !bookingEndDate) {
      return Alert.alert("Missing dates", "Please enter start date and end date in YYYY-MM-DD format.");
    }

    try {
      await apiRequest("/bookings", "POST", auth.token, {
        roomId,
        startDate: bookingStartDate,
        endDate: bookingEndDate
      });
      Alert.alert("Request sent", "Your room booking request has been submitted.");
      setBookingStartDate("");
      setBookingEndDate("");
      loadBookings();
    } catch (error) {
      Alert.alert("Request failed", error.message);
    }
  };

  const handleBookingAction = async (bookingId, status) => {
    try {
      await apiRequest(`/bookings/${bookingId}`, "PUT", auth.token, { status });
      refreshData();
    } catch (error) {
      Alert.alert("Action failed", error.message);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await apiRequest(`/bookings/${bookingId}`, "DELETE", auth.token);
      Alert.alert("Cancelled", "Your booking was cancelled.");
      refreshData();
    } catch (error) {
      Alert.alert("Cancel failed", error.message);
    }
  };

  const deleteRoom = async (id) => {
    try {
      await apiRequest(`/rooms/${id}`, "DELETE", auth.token);
      refreshData();
    } catch (error) {
      Alert.alert("Delete failed", error.message);
    }
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["token", "user"]);
    setAuth({ token: "", user: null });
  };

  const hasPendingBooking = (roomId) =>
    bookings.some((booking) => booking.room?._id === roomId && booking.status === "Pending");

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
        <View
          style={[
            styles.heroCard,
            userRole === "admin" ? styles.heroCardAdmin : styles.heroCardStudent
          ]}
        >
          <Pressable style={styles.profileRow} onPress={() => setShowProfile(!showProfile)}>
            <View style={styles.userCircle}>
              <Text style={styles.userInitials}>{getInitials(auth.user?.name)}</Text>
            </View>
            <View style={styles.profileTextContainer}>
              <Text style={styles.heroTitle}>{userRole === "admin" ? "Administrator Portal" : "Student Dashboard"}</Text>
              <Text style={styles.heroSubtitle}>{heroSubtitle}</Text>
            </View>
          </Pressable>

          <View style={styles.actionRow}>
            <View style={styles.badgePill}>
              <Text style={styles.badgeText}>{auth.user?.role.toUpperCase()}</Text>
            </View>
            <AppButton
              title="Complaints"
              variant="info"
              onPress={() => navigation.navigate("Complaints")}
              fullWidth={false}
            />
            <AppButton title="Logout" variant="secondary" onPress={logout} fullWidth={false} />
          </View>

          <View style={styles.statRow}>
            {heroStats.map((stat, index) => (
              <View
                key={stat.label}
                style={[
                  styles.statCard,
                  { backgroundColor: stat.color, marginRight: index < heroStats.length - 1 ? 10 : 0 }
                ]}
              >
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {showProfile && (
            <View style={styles.profileDetails}>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={styles.detailValue}>{auth.user?.email}</Text>
              <Text style={styles.detailLabel}>Role</Text>
              <Text style={styles.detailValue}>{auth.user?.role}</Text>
            </View>
          )}
        </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Bookings</Text>
      </View>

      {userRole === "student" && (
        <View style={styles.card}>
          <Text style={styles.detailLabel}>Select Booking Dates</Text>
          <Pressable
            style={styles.datePickerButton}
            onPress={() => setShowDateCalendar(true)}
          >
            <Text style={styles.datePickerButtonText}>
              📅 {bookingStartDate && bookingEndDate
                ? `${bookingStartDate} to ${bookingEndDate}`
                : "Choose dates..."}
            </Text>
          </Pressable>
          {bookingStartDate && bookingEndDate && (
            <View style={styles.dateDisplayContainer}>
              <View style={styles.dateDisplay}>
                <Text style={styles.dateLabel}>From</Text>
                <Text style={styles.dateValue}>{bookingStartDate}</Text>
              </View>
              <View style={styles.dateDisplay}>
                <Text style={styles.dateLabel}>To</Text>
                <Text style={styles.dateValue}>{bookingEndDate}</Text>
              </View>
            </View>
          )}
        </View>
      )}

      <View style={styles.card}>
        {userRole === "admin" ? (
          bookings.filter((booking) => booking.status === "Pending").length === 0 ? (
            <Text style={styles.emptyText}>No pending booking requests.</Text>
          ) : (
            bookings
              .filter((booking) => booking.status === "Pending")
              .map((booking) => (
                <View key={booking._id} style={styles.bookingCard}>
                  <View style={styles.bookingHeader}>
                    <Text style={styles.bookingTitle}>Room {booking.room?.roomNumber}</Text>
                    <View style={[styles.bookingStatus, styles.bookingPending]}>
                      <Text style={[styles.bookingStatusText, styles.bookingPendingText]}>Pending</Text>
                    </View>
                  </View>
                  <Text style={styles.bookingMeta}>Student: {booking.student?.name}</Text>
                  <Text style={styles.bookingMeta}>Email: {booking.student?.email}</Text>
                  <View style={styles.cardActions}>
                    <AppButton title="Approve" variant="success" onPress={() => handleBookingAction(booking._id, "Approved")} fullWidth={false} />
                    <AppButton title="Reject" variant="danger" onPress={() => handleBookingAction(booking._id, "Rejected")} fullWidth={false} />
                  </View>
                </View>
              ))
          )
        ) : bookings.length === 0 ? (
          <Text style={styles.emptyText}>You have no room requests yet. Request a room below.</Text>
        ) : (
          bookings.map((booking) => (
            <View key={booking._id} style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <Text style={styles.bookingTitle}>{booking.room?.roomNumber}</Text>
                <View style={[
                  styles.bookingStatus,
                  booking.status === "Pending" ? styles.bookingPending : booking.status === "Approved" ? styles.bookingApproved : styles.bookingRejected
                ]}>
                  <Text style={styles.bookingStatusText}>{booking.status}</Text>
                </View>
              </View>
              <Text style={styles.bookingMeta}>{booking.room?.roomType} • LKR {booking.room?.pricePerMonth}</Text>
              <Text style={styles.bookingMeta}>From: {booking.startDate ? String(booking.startDate).slice(0, 10) : "-"}</Text>
              <Text style={styles.bookingMeta}>To: {booking.endDate ? String(booking.endDate).slice(0, 10) : "-"}</Text>
              {["Pending", "Approved"].includes(booking.status) && (
                <AppButton
                  title="Cancel booking"
                  variant="danger"
                  onPress={() => cancelBooking(booking._id)}
                  fullWidth={false}
                />
              )}
            </View>
          ))
        )}
      </View>

      {userRole === "admin" && (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{editingRoom ? "Edit room" : "Room catalog"}</Text>
          <AppButton
            title={showCreateForm ? "Hide form" : editingRoom ? "Cancel edit" : "Create room"}
            variant={showCreateForm ? "secondary" : "success"}
            onPress={() => {
              if (showCreateForm) resetForm();
              setShowCreateForm(!showCreateForm);
            }}
            fullWidth={false}
          />
        </View>
      )}

      {rooms.map((item, index) => {
        const pending = hasPendingBooking(item._id);
        const requestDisabled = item.availabilityStatus !== "Available" || pending || userRole !== "student";

        return (
          <View
            key={item._id}
            style={[
              styles.roomCard,
              { borderLeftColor: ROOM_ACCENT_COLORS[index % ROOM_ACCENT_COLORS.length] }
            ]}
          >
            <View style={styles.roomHeader}>
              <View>
                <Text style={styles.roomTitle}>Room {item.roomNumber}</Text>
                <Text style={styles.roomMeta}>{item.roomType} • LKR {item.pricePerMonth}</Text>
              </View>
              {item.image ? <Image source={{ uri: item.image }} style={styles.cardImage} /> : null}
            </View>
            <Text style={styles.roomMeta}>{item.currentOccupancy}/{item.capacity} • {item.availabilityStatus}</Text>

            <View style={styles.cardActions}>
              {userRole === "student" ? (
                <AppButton
                  title={pending ? "Pending" : item.availabilityStatus === "Available" ? "Request" : "Unavailable"}
                  variant={pending ? "secondary" : "info"}
                  onPress={() => requestBooking(item._id)}
                  fullWidth={false}
                  disabled={requestDisabled}
                />
              ) : (
                <>
                  <AppButton title="Edit" variant="info" onPress={() => startEdit(item)} fullWidth={false} />
                  <AppButton title="Delete" variant="danger" onPress={() => deleteRoom(item._id)} fullWidth={false} />
                </>
              )}
            </View>
          </View>
        );
      })}
      </ScrollView>

      <Modal visible={showCreateForm && userRole === "admin"} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.formTitle}>{editingRoom ? "Edit room" : "Create new room"}</Text>
            <ScrollView contentContainerStyle={styles.formContent} keyboardShouldPersistTaps="handled">
              <FormInput placeholder="Room number" value={roomNumber} onChangeText={setRoomNumber} />
              <FormInput placeholder="Capacity" value={capacity} onChangeText={setCapacity} keyboardType="numeric" />
              <FormInput placeholder="Price per month" value={pricePerMonth} onChangeText={setPricePerMonth} keyboardType="numeric" />
              <FormInput placeholder="Room type" value={roomType} onChangeText={setRoomType} />
              <View style={styles.imageRow}>
                <AppButton title="Upload image" variant="info" onPress={pickImage} fullWidth={false} />
                {roomImage ? (
                  <Image source={{ uri: roomImage }} style={styles.previewImage} />
                ) : (
                  <View style={styles.previewPlaceholder}>
                    <Text style={styles.previewPlaceholderText}>No image selected</Text>
                  </View>
                )}
              </View>
              <AppButton title={editingRoom ? "Save changes" : "Save room"} variant="success" onPress={saveRoom} />
              <AppButton
                title="Close"
                variant="secondary"
                onPress={() => {
                  resetForm();
                  setShowCreateForm(false);
                }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>

      <DateRangeCalendar
        visible={showDateCalendar}
        onClose={() => setShowDateCalendar(false)}
        onDateRangeSelected={handleDateRangeSelected}
        startDate={bookingStartDate}
        endDate={bookingEndDate}
      />
    </SafeAreaView>
  );
}
