import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Platform,
} from 'react-native';

// ─── Constants ────────────────────────────────────────────────────────────────
const BLUE = '#2979FF';
const BLUE_DARK = '#1A56CC';
const BLUE_LIGHT = '#E8F0FE';
const BLUE_CARD = '#3D8EFF';
const GRAY_BG = '#F2F4F7';
const GRAY_BORDER = '#E0E4EA';
const TEXT_DARK = '#1A2233';
const TEXT_MID = '#5A6478';
const TEXT_LIGHT = '#9AA3B2';
const WHITE = '#FFFFFF';

// ─── Today's Date ─────────────────────────────────────────────────────────────
const getFormattedDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    });
};

// ─── Management Grid Items ────────────────────────────────────────────────────
const MANAGEMENT_ITEMS = [
    { id: 'create_teacher', label: 'Create Teacher', icon: '👤+', route: 'CreateTeacher' },
    { id: 'manage_classes', label: 'Manage Classes', icon: '🗂️', route: 'ManageClasses' },
    { id: 'assign_teachers', label: 'Assign Teachers', icon: '📋', route: 'AssignTeachers' },
    { id: 'complaints', label: 'Complaints', icon: '💬', route: 'Complaints' },
    { id: 'create_student', label: 'Create Student', icon: '🎓+', route: 'CreateStudent' },
    { id: 'create_Parent', label: 'Create Parent', icon: '👤+', route: 'CreateParent' },

];

// ─── Bottom Tab Config ────────────────────────────────────────────────────────
const TABS = [
    { key: 'Home', icon: '🏠' },
    { key: 'Diary', icon: '📖' },
    { key: 'Complaints', icon: '💬' },
    { key: 'Profile', icon: '👤' },
];

// ─── Management Card ──────────────────────────────────────────────────────────
const ManagementCard = ({ item, onPress }) => (
    <TouchableOpacity
        style={card.wrapper}
        onPress={() => onPress(item)}
        activeOpacity={0.82}
    >
        <View style={card.iconBox}>
            <Text style={card.icon}>{item.icon}</Text>
        </View>
        <Text style={card.label}>{item.label}</Text>
    </TouchableOpacity>
);

const card = StyleSheet.create({
    wrapper: {
        width: '47%',
        backgroundColor: WHITE,
        borderRadius: 16,
        paddingVertical: 22,
        paddingHorizontal: 14,
        alignItems: 'center',
        marginBottom: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 6,
        elevation: 3,
    },
    iconBox: {
        width: 52,
        height: 52,
        borderRadius: 14,
        backgroundColor: BLUE_LIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    icon: { fontSize: 22 },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: TEXT_DARK,
        textAlign: 'center',
        letterSpacing: 0.1,
    },
});

// ─── Main Screen ──────────────────────────────────────────────────────────────
const PrincipalDashboardScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('Home');

    const handleCardPress = (item) => {
        // navigation.navigate(item.route);
        alert(`Navigate to: ${item.label}`);
    };

    // Split items into rows: first row = 2, second row = 2, third row = 1 (centred)
    const rows = [];
    for (let i = 0; i < MANAGEMENT_ITEMS.length; i += 2) {
        rows.push(MANAGEMENT_ITEMS.slice(i, i + 2));
    }

    return (
        <SafeAreaView style={s.safe}>
            <StatusBar barStyle="dark-content" backgroundColor={WHITE} />

            {/* ── Top App Bar ── */}
            <View style={s.appBar}>
                <View style={s.appBarLeft}>
                    <View style={s.avatar}>
                        <Text style={s.avatarText}>P</Text>
                    </View>
                    <Text style={s.appBarTitle}>Principal Dashboard</Text>
                </View>
                <TouchableOpacity style={s.notifBtn}>
                    <Text style={s.notifIcon}>🔔</Text>
                    <View style={s.notifDot} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={s.scroll}
                contentContainerStyle={s.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* ── Welcome Banner ── */}
                <View style={s.banner}>
                    <View style={s.bannerLeft}>
                        <Text style={s.bannerTitle}>Welcome, Principal</Text>
                        <View style={s.bannerDateRow}>
                            <Text style={s.bannerDateIcon}>📅</Text>
                            <Text style={s.bannerDate}>{getFormattedDate()}</Text>
                        </View>
                    </View>
                    <View style={s.bannerIllustration}>
                        <Text style={s.bannerIllustrationIcon}>🏫</Text>
                    </View>
                </View>

                {/* ── Quick Actions strip ── */}
                <View style={s.quickActionsRow}>
                    <Text style={s.quickActionsLabel}>Section - Quick Actions</Text>
                    <Text style={s.quickActionsEllipsis}>…</Text>
                </View>

                {/* ── Management Section ── */}
                <Text style={s.sectionTitle}>Management</Text>

                <View style={s.grid}>
                    {rows.map((row, rowIdx) => (
                        <View
                            key={rowIdx}
                            style={[
                                s.gridRow,
                                row.length === 1 && s.gridRowCentered,
                            ]}
                        >
                            {row.map((item) => (
                                <ManagementCard
                                    key={item.id}
                                    item={item}
                                    onPress={handleCardPress}
                                />
                            ))}
                        </View>
                    ))}
                </View>

                {/* ── Bottom Nav Label ── */}
                <Text style={s.bottomNavLabel}>Bottom Navigation Bar</Text>

                <View style={{ height: 16 }} />
            </ScrollView>

            {/* ── Bottom Tab Bar ── */}
            <View style={s.tabBar}>
                {TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab.key}
                        style={s.tabItem}
                        onPress={() => setActiveTab(tab.key)}
                        activeOpacity={0.7}
                    >
                        <Text style={[s.tabIcon, activeTab === tab.key && s.tabIconActive]}>
                            {tab.icon}
                        </Text>
                        <Text style={[s.tabLabel, activeTab === tab.key && s.tabLabelActive]}>
                            {tab.key}
                        </Text>
                        {activeTab === tab.key && <View style={s.tabIndicator} />}
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: GRAY_BG,
    },

    // App Bar
    appBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: WHITE,
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: GRAY_BORDER,
    },
    appBarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: BLUE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: WHITE,
        fontWeight: '800',
        fontSize: 16,
    },
    appBarTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: TEXT_DARK,
        letterSpacing: 0.1,
    },
    notifBtn: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notifIcon: { fontSize: 20 },
    notifDot: {
        position: 'absolute',
        top: 4,
        right: 4,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF3B30',
        borderWidth: 1.5,
        borderColor: WHITE,
    },

    // Scroll
    scroll: { flex: 1 },
    scrollContent: { paddingHorizontal: 18, paddingTop: 18 },

    // Welcome Banner
    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: BLUE,
        borderRadius: 18,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 6,
        shadowColor: BLUE,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 14,
        elevation: 6,
    },
    bannerLeft: { flex: 1 },
    bannerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: WHITE,
        marginBottom: 6,
        letterSpacing: 0.2,
    },
    bannerDateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    bannerDateIcon: { fontSize: 13 },
    bannerDate: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '500',
    },
    bannerIllustration: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerIllustrationIcon: { fontSize: 30 },

    // Quick Actions
    quickActionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 18,
        marginBottom: 18,
    },
    quickActionsLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: TEXT_MID,
        letterSpacing: 0.1,
    },
    quickActionsEllipsis: {
        fontSize: 18,
        color: TEXT_LIGHT,
        fontWeight: '700',
    },

    // Section Title
    sectionTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: TEXT_DARK,
        letterSpacing: 0.2,
        marginBottom: 14,
    },

    // Grid
    grid: { width: '100%' },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gridRowCentered: {
        justifyContent: 'center',
    },

    // Bottom Nav Label
    bottomNavLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: TEXT_LIGHT,
        textAlign: 'center',
        letterSpacing: 0.3,
        marginTop: 8,
    },

    // Tab Bar
    tabBar: {
        flexDirection: 'row',
        backgroundColor: WHITE,
        borderTopWidth: 1,
        borderTopColor: GRAY_BORDER,
        paddingBottom: Platform.OS === 'ios' ? 20 : 8,
        paddingTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 8,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        position: 'relative',
    },
    tabIcon: {
        fontSize: 20,
        opacity: 0.4,
    },
    tabIconActive: { opacity: 1 },
    tabLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: TEXT_LIGHT,
        letterSpacing: 0.3,
    },
    tabLabelActive: { color: BLUE },
    tabIndicator: {
        position: 'absolute',
        top: -8,
        width: 20,
        height: 3,
        borderRadius: 2,
        backgroundColor: BLUE,
    },
});

export default PrincipalDashboardScreen;
