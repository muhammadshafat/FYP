import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import { getTeacherDiaries } from '../../services/api';

const TeacherDiaryView = ({ navigation, route }) => {

  // ✅ RECEIVE FROM REPLACE
  const { teacher } = route.params;

  const tid = teacher?.tid;
  const tname = teacher?.tname;

  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Diaries');

  // ─── LOAD DATA FROM BACKEND ─────────────────
  useEffect(() => {
    fetchDiaries();
  }, []);

  const fetchDiaries = async () => {
    try {
      setLoading(true);

      const res = await getTeacherDiaries(tid); // ✅ send tid
      setDiaries(res.data);

    } catch (err) {
      console.log(err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── CARD UI ───────────────────────────────
  const renderDiary = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.accent} />

      <View style={styles.cardBody}>

        {/* TOP */}
        <View style={styles.rowBetween}>
          <View style={styles.tagRow}>
            <Text style={styles.tagBlue}>{item.cname}</Text>
            <Text style={styles.tagGrey}>{item.sname}</Text>
          </View>

          <Text style={styles.time}>
            {new Date(item.ddate).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>

        {/* DESCRIPTION */}
        <Text style={styles.desc}>{item.description}</Text>

        {/* CATEGORY */}
        <Text style={styles.category}>{item.category}</Text>

      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          📖 {tname}'s Diaries
        </Text>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>

        <Text style={styles.sectionTitle}>ALL DIARIES</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#1976D2" />
        ) : (
          <FlatList
            data={diaries}
            keyExtractor={(item) => item.did.toString()}
            renderItem={renderDiary}
          />
        )}

      </View>

      {/* BOTTOM NAV */}
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

export default TeacherDiaryView;
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