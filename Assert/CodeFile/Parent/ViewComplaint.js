// screens/ViewComplaintScreen.js
import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    SafeAreaView, ScrollView, Platform,
} from 'react-native';
import { COLORS, RADIUS, SHADOW } from '../theme';

const COMPLAINTS = [
    { id: '1', date: '24 Oct 2023', title: 'Inadequate playground supervision', against: 'Suleman Ali', classGrade: '4-B', time: '10:45 AM' },
    { id: '2', date: '20 Oct 2023', title: 'Heavy School Bag Issue', against: 'Muhammad Ahsan', classGrade: '4-B', time: '02:30 PM' },
    { id: '3', date: '12 Oct 2023', title: 'School Bus Delay (Route 42)', against: 'Transport Coordinator', classGrade: '4-B', time: '08:15 AM' },
];

const FILTER_TABS = ['All', 'Pending', 'Resolved'];

const BOTTOM_TABS = [
    { key: 'home', label: 'Home', icon: '⌂' },
    { key: 'diary', label: 'Diary', icon: '📓' },
    { key: 'complaints', label: 'Complaints', icon: '⚠' },
    { key: 'profile', label: 'Profile', icon: '👤' },
];

export default function ViewComplaintScreen({ navigation }) {
    const [filterTab, setFilterTab] = useState('All');
    const [bottomTab, setBottomTab] = useState('complaints');

    return (
        <SafeAreaView style={styles.safe}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>View Complaint</Text>
                <View style={{ width: 32 }} />
            </View>

            {/* Filter Tabs */}
            <View style={styles.filterTabs}>
                {FILTER_TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={styles.filterTabBtn}
                        onPress={() => setFilterTab(tab)}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.filterTabText, filterTab === tab && styles.filterTabTextActive]}>{tab}</Text>
                        {filterTab === tab && <View style={styles.filterTabUnderline} />}
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {COMPLAINTS.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <View style={styles.cardAccent} />
                        <View style={styles.cardBody}>
                            <Text style={styles.cardDate}>{item.date}</Text>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <View style={styles.cardMeta}>
                                <Text style={styles.metaItem}>👤 Against: {item.against}</Text>
                                <Text style={styles.metaItem}>🎓 Class: {item.classGrade}</Text>
                            </View>
                            <View style={styles.cardFooter}>
                                <Text style={styles.submittedText}>Submitted: {item.time}</Text>
                                <TouchableOpacity
                                    style={styles.viewDetailsBtn}
                                    onPress={() => navigation?.navigate('ComplaintDetails', { complaint: item })}
                                    activeOpacity={0.85}
                                >
                                    <Text style={styles.viewDetailsBtnText}>View Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
                <View style={{ height: 80 }} />
            </ScrollView>

            {/* FAB */}
            <TouchableOpacity style={styles.fab} onPress={() => navigation?.navigate('EnterComplaint')} activeOpacity={0.85}>
                <Text style={{ color: COLORS.white, fontSize: 24, fontWeight: '300' }}>+</Text>
            </TouchableOpacity>

            {/* Bottom Tabs */}
            <View style={styles.tabBar}>
                {BOTTOM_TABS.map((tab) => {
                    const active = bottomTab === tab.key;
                    return (
                        <TouchableOpacity key={tab.key} style={styles.tabItem} onPress={() => setBottomTab(tab.key)} activeOpacity={0.7}>
                            <Text style={[styles.tabIcon, active && styles.tabIconActive]}>{tab.icon}</Text>
                            <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: COLORS.bg },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    backBtn: { padding: 4 },
    backArrow: { fontSize: 22, color: COLORS.textPrimary },
    headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
    filterTabs: { flexDirection: 'row', backgroundColor: COLORS.white, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    filterTabBtn: { paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center' },
    filterTabText: { fontSize: 14, fontWeight: '500', color: COLORS.textSecondary },
    filterTabTextActive: { color: COLORS.blue, fontWeight: '700' },
    filterTabUnderline: { position: 'absolute', bottom: 0, left: 8, right: 8, height: 2.5, backgroundColor: COLORS.blue, borderRadius: 2 },
    scroll: { padding: 16, gap: 14 },
    card: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, overflow: 'hidden', ...SHADOW.sm },
    cardAccent: { width: 4, backgroundColor: COLORS.blue },
    cardBody: { flex: 1, padding: 14 },
    cardDate: { fontSize: 11, color: COLORS.textMuted, fontWeight: '500', marginBottom: 6 },
    cardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 8 },
    cardMeta: { gap: 4, marginBottom: 12 },
    metaItem: { fontSize: 12, color: COLORS.textSecondary },
    cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTopWidth: 1, borderTopColor: COLORS.divider },
    submittedText: { fontSize: 11, color: COLORS.textMuted, fontWeight: '500' },
    viewDetailsBtn: { backgroundColor: COLORS.blue, borderRadius: RADIUS.full, paddingHorizontal: 14, paddingVertical: 7 },
    viewDetailsBtnText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
    fab: { position: 'absolute', bottom: 80, right: 20, width: 52, height: 52, borderRadius: 26, backgroundColor: COLORS.blue, alignItems: 'center', justifyContent: 'center', ...SHADOW.md },
    tabBar: { flexDirection: 'row', backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.border, paddingBottom: Platform.OS === 'ios' ? 20 : 8, paddingTop: 10 },
    tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3 },
    tabIcon: { fontSize: 18, color: COLORS.textSecondary },
    tabIconActive: { color: COLORS.blue },
    tabLabel: { fontSize: 10, fontWeight: '500', color: COLORS.textSecondary },
    tabLabelActive: { color: COLORS.blue, fontWeight: '700' },
});
