import React, { useState } from "react";
import { Modal, View, Text, Pressable, SafeAreaView } from "react-native";
import { Calendar } from "react-native-calendars";
import { styles } from "../theme/screenStyles";

export default function DateRangeCalendar({
  visible,
  onClose,
  onDateRangeSelected,
  startDate,
  endDate
}) {
  const [localStartDate, setLocalStartDate] = useState(startDate || null);
  const [localEndDate, setLocalEndDate] = useState(endDate || null);
  const [selecting, setSelecting] = useState("start"); // "start" or "end"

  const getMarkedDates = () => {
    const marked = {};
    
    if (localStartDate) {
      marked[localStartDate] = {
        startingDay: true,
        color: "#4f46e5",
        textColor: "#fff"
      };
    }

    if (localEndDate && localStartDate) {
      marked[localEndDate] = {
        endingDay: true,
        color: "#4f46e5",
        textColor: "#fff"
      };

      // Mark all dates between start and end
      const start = new Date(localStartDate);
      const end = new Date(localEndDate);
      const current = new Date(start);

      while (current < end) {
        current.setDate(current.getDate() + 1);
        const dateStr = current.toISOString().split("T")[0];
        if (dateStr !== localEndDate) {
          marked[dateStr] = {
            color: "#e0e7ff",
            textColor: "#4f46e5"
          };
        }
      }
    }

    return marked;
  };

  const handleDayPress = (day) => {
    if (selecting === "start") {
      setLocalStartDate(day.dateString);
      setSelecting("end");
    } else {
      if (new Date(day.dateString) < new Date(localStartDate)) {
        // If end date is before start date, swap them
        setLocalEndDate(localStartDate);
        setLocalStartDate(day.dateString);
      } else {
        setLocalEndDate(day.dateString);
      }
    }
  };

  const handleConfirm = () => {
    if (localStartDate && localEndDate) {
      onDateRangeSelected(localStartDate, localEndDate);
      onClose();
    } else {
      alert("Please select both start and end dates");
    }
  };

  const handleReset = () => {
    setLocalStartDate(null);
    setLocalEndDate(null);
    setSelecting("start");
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Text style={styles.formTitle}>Select Booking Dates</Text>
            <Pressable onPress={handleClose}>
              <Text style={styles.closeButton}>✕</Text>
            </Pressable>
          </View>

          <View style={styles.calendarContainer}>
            <Calendar
              minDate={minDate}
              onDayPress={handleDayPress}
              markedDates={getMarkedDates()}
              markingType="period"
              firstDay={1}
              theme={{
                backgroundColor: "#fff",
                calendarBackground: "#fff",
                textSectionTitleColor: "#6b7280",
                textSectionTitleDisabledColor: "#d1d5db",
                selectedDayBackgroundColor: "#4f46e5",
                selectedDayTextColor: "#fff",
                todayTextColor: "#4f46e5",
                dayTextColor: "#1f2937",
                textDisabledColor: "#d1d5db",
                dotColor: "#4f46e5",
                selectedDotColor: "#fff",
                arrowColor: "#4f46e5",
                disabledArrowColor: "#d1d5db",
                monthTextColor: "#1f2937",
                indicatorColor: "#4f46e5",
                "stylesheet.calendar.header": {
                  week: {
                    marginTop: 5,
                    marginBottom: 5,
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }
                }
              }}
            />
          </View>

          <View style={styles.dateDisplayContainer}>
            <View style={styles.dateDisplay}>
              <Text style={styles.dateLabel}>From:</Text>
              <Text style={styles.dateValue}>
                {localStartDate ? localStartDate : "Not selected"}
              </Text>
            </View>
            <View style={styles.dateDisplay}>
              <Text style={styles.dateLabel}>To:</Text>
              <Text style={styles.dateValue}>
                {localEndDate ? localEndDate : "Not selected"}
              </Text>
            </View>
          </View>

          <Text style={styles.stepIndicator}>
            {selecting === "start" ? "Step 1: Select Start Date" : "Step 2: Select End Date"}
          </Text>

          <View style={styles.modalActions}>
            <Pressable style={styles.buttonReset} onPress={handleReset}>
              <Text style={styles.buttonResetText}>Reset</Text>
            </Pressable>
            <Pressable
              style={[
                styles.buttonConfirm,
                !(localStartDate && localEndDate) && styles.buttonConfirmDisabled
              ]}
              onPress={handleConfirm}
              disabled={!(localStartDate && localEndDate)}
            >
              <Text style={styles.buttonConfirmText}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
