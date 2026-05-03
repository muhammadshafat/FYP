import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── Bottom Tab Items ───────────────────────
const TABS = [
    { id: 'home', label: 'HOME', icon: '🏠' },
    { id: 'diary', label: 'DIARY', icon: '📖' },
    { id: 'students', label: 'STUDENTS', icon: '👥' },
    { id: 'profile', label: 'PROFILE', icon: '👤' },
];

// ─── Action Cards ───────────────────────────
const ACTIONS = [
    {
        id: 'add',
        icon: '⊕',
        title: 'Add Diary',
        description: 'Create new entry for your subjects',
    },
    {
        id: 'view',
        icon: '📄',
        title: 'View Diary',
        description: 'Review and manage existing entries',
    },
];

export default function TeacherPanelScreen({ navigation, route }) {
    const { teacher } = route.params;
    const [activeTab, setActiveTab] = useState('diary');

    const handleAction = (id) => {
        if (id === 'add') {
            navigation.navigate('addnewdairy', { teacher })
        } else {
            navigation.replace('teacherdiaryview', { teacher })
        }
    };

    const handleTabPress = (id) => {
        setActiveTab(id);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#EAF4FD" />

            {/* ── Header ── */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation?.goBack()}
                >
                    <Text style={styles.backIcon}>‹</Text>
                    <Text style={styles.backText}> Teacher Panel</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.bellIcon}>🔔</Text>
                </TouchableOpacity>
            </View>

            {/* ── Pink divider ── */}
            <View style={styles.headerDivider} />

            {/* ── Welcome ── */}
            <View style={styles.welcomeSection}>
                <Text style={styles.welcomeTitle}> Welcome {teacher?.tname}</Text>
                <Text style={styles.welcomeSub}>
                    Manage your classroom activities
                </Text>
            </View>

            {/* ── Action Cards ── */}
            <View style={styles.cardsContainer}>
                {ACTIONS.map((action) => (
                    <TouchableOpacity
                        key={action.id}
                        style={styles.card}
                        onPress={() => handleAction(action.id)}
                    >
                        <View style={styles.cardIconCircle}>
                            <Text style={styles.cardIconText}>{action.icon}</Text>
                        </View>
                        <Text style={styles.cardTitle}>{action.title}</Text>
                        <Text style={styles.cardDesc}>{action.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* ── Bottom Nav ── */}
            <View style={styles.bottomNav}>
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <TouchableOpacity
                            key={tab.id}
                            style={styles.tabItem}
                            onPress={() => handleTabPress(tab.id)}
                        >
                            <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
                                {tab.icon}
                            </Text>
                            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                                {tab.label}
                            </Text>
                            {isActive && <View style={styles.tabIndicator} />}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </SafeAreaView>
    );
}

// ─── Theme ───────────────────────────────────
const BLUE = '#3B82C4';
const LIGHT_BG = '#EAF4FD';
const WHITE = '#FFFFFF';
const DARK_TEXT = '#1C2D3E';
const GREY_TEXT = '#7E9BB5';
const BORDER = '#D5E6F3';
const PINK = '#E91E8C';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: LIGHT_BG,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingVertical: 12,
        backgroundColor: WHITE,
    },

    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    backIcon: {
        fontSize: 28,
        color: DARK_TEXT,
        marginRight: 4,
    },

    backText: {
        fontSize: 15,
        fontWeight: '700',
        color: DARK_TEXT,
    },

    bellIcon: {
        fontSize: 20,
    },

    headerDivider: {
        height: 3,
        width: 36,
        backgroundColor: PINK,
        borderRadius: 2,
        alignSelf: 'center',
        marginVertical: 6,
    },

    welcomeSection: {
        alignItems: 'center',
        paddingVertical: 20,
    },

    welcomeTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: DARK_TEXT,
    },

    welcomeSub: {
        fontSize: 13,
        color: GREY_TEXT,
        marginTop: 4,
    },

    cardsContainer: {
        flex: 1,
        paddingHorizontal: 22,
        gap: 16,
    },

    card: {
        backgroundColor: WHITE,
        borderRadius: 18,
        borderWidth: 1.5,
        borderColor: BORDER,
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        elevation: 3,
    },

    cardIconCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#EAF4FB',
        borderWidth: 2,
        borderColor: BORDER,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },

    cardIconText: {
        fontSize: 32,
        color: BLUE,
    },

    cardTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: DARK_TEXT,
        marginBottom: 6,
    },

    cardDesc: {
        fontSize: 12,
        color: GREY_TEXT,
        textAlign: 'center',
    },

    bottomNav: {
        flexDirection: 'row',
        backgroundColor: WHITE,
        paddingVertical: 10,
    },

    tabItem: {
        flex: 1,
        alignItems: 'center',
    },

    tabIcon: {
        fontSize: 20,
        opacity: 0.4,
    },

    tabIconActive: {
        opacity: 1,
    },

    tabLabel: {
        fontSize: 10,
        color: GREY_TEXT,
    },

    tabLabelActive: {
        color: BLUE,
    },

    tabIndicator: {
        marginTop: 4,
        width: 20,
        height: 3,
        backgroundColor: PINK,
        borderRadius: 2,
    },
});