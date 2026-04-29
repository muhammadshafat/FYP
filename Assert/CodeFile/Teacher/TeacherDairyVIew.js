import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

// ── Data ─────────────────────────────────────────
const DIARIES = [
  {
    id: 1,
    grade: "GRADE 6-A",
    subject: "MATHEMATICS",
    time: "08:45 AM",
    description: "Chapter 4.Ex#4.3(Q#1 to Q#5) test",
  },
  {
    id: 2,
    grade: "GRADE 6-A",
    subject: "SCIENCE",
    time: "11:15 AM",
    description: "Chapter 4 for test",
  },
  {
    id: 3,
    grade: "GRADE 6-C",
    subject: "ENGLISH",
    time: "Yesterday",
    description: "Chapter 3 full Ex.. for test",
  },
];

const CLASSES = ["Grade 6-A", "Grade 6-B", "Grade 6-C", "Grade 7-A"];
const SUBJECTS = ["Mathematics", "Science", "English", "Urdu", "Islamiyat"];

// ── Component ───────────────────────────────────
const ViewDiaries = () => {
  const [selectedClass, setSelectedClass] = useState("Grade 6-A");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [activeTab, setActiveTab] = useState("Diaries");

  // ── Render Diary Card ──
  const renderDiary = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.accent} />

      <View style={styles.cardBody}>
        <View style={styles.rowBetween}>
          <View style={styles.tagRow}>
            <Text style={styles.tagBlue}>{item.grade}</Text>
            <Text style={styles.tagGrey}>{item.subject}</Text>
          </View>
          <Text style={styles.time}>{item.time}</Text>
        </View>

        <Text style={styles.desc}>{item.description}</Text>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryText}>View Details</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.outlineBtn}>
            <Text style={styles.outlineText}>Update Homework</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // ── UI ──
  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>View Diaries</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>

        {/* Today Button */}
        <TouchableOpacity style={styles.todayBtn}>
          <Text style={styles.todayText}>Today</Text>
        </TouchableOpacity>

        {/* Selectors */}
        <View style={styles.selectorCard}>
          <View style={styles.selector}>
            <Text style={styles.label}>SELECT CLASS</Text>
            <Text style={styles.value}>{selectedClass}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.selector}>
            <Text style={styles.label}>SELECT SUBJECT</Text>
            <Text style={styles.value}>{selectedSubject}</Text>
          </View>
        </View>

        {/* List */}
        <Text style={styles.sectionTitle}>RECENT DIARIES</Text>

        <FlatList
          data={DIARIES}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDiary}
        />
      </View>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        {["Home", "Diaries", "Students", "Profile"].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.navText, activeTab === tab && styles.active]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

    </SafeAreaView>
  );
};

export default ViewDiaries;

// ── Styles ──────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },

  header: {
    padding: 16,
    backgroundColor: '#fff',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
    padding: 16,
  },

  todayBtn: {
    backgroundColor: '#1976D2',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },

  todayText: {
    color: '#fff',
    fontWeight: '600',
  },

  selectorCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },

  selector: {
    flex: 1,
  },

  label: {
    fontSize: 10,
    color: '#999',
  },

  value: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  divider: {
    width: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
  },

  accent: {
    width: 4,
    backgroundColor: '#1976D2',
  },

  cardBody: {
    flex: 1,
    padding: 12,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  tagRow: {
    flexDirection: 'row',
    gap: 5,
  },

  tagBlue: {
    backgroundColor: '#dbeafe',
    padding: 4,
    borderRadius: 10,
    fontSize: 10,
  },

  tagGrey: {
    backgroundColor: '#eee',
    padding: 4,
    borderRadius: 10,
    fontSize: 10,
  },

  time: {
    fontSize: 10,
    color: '#888',
  },

  desc: {
    marginVertical: 8,
  },

  btnRow: {
    flexDirection: 'row',
    gap: 10,
  },

  primaryBtn: {
    backgroundColor: '#1976D2',
    padding: 8,
    borderRadius: 20,
  },

  primaryText: {
    color: '#fff',
    fontSize: 12,
  },

  outlineBtn: {
    borderWidth: 1,
    borderColor: '#1976D2',
    padding: 8,
    borderRadius: 20,
  },

  outlineText: {
    color: '#1976D2',
    fontSize: 12,
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
  },

  navText: {
    color: '#aaa',
  },

  active: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
});