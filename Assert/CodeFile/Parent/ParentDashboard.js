import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Animated,
    Image,
    Platform,
} from 'react-native';

// ─── Bottom Tab Bar ───────────────────────────────────────────────────────────
const TAB_ITEMS = [
    { key: 'home', label: 'HOME', icon: '⌂' },
    { key: 'diary', label: 'DIARY', icon: '📓' },
    { key: 'complaints', label: 'COMPLAINTS', icon: '⚠' },
    { key: 'profile', label: 'PROFILE', icon: '👤' },
];

const BottomTabBar = ({ activeTab, onTabPress }) => (
    <View style={styles.tabBar}>
        {TAB_ITEMS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
                <TouchableOpacity
                    key={tab.key}
                    style={styles.tabItem}
                    onPress={() => onTabPress(tab.key)}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
                        {tab.icon}
                    </Text>
                    <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                        {tab.label}
                    </Text>
                </TouchableOpacity>
            );
        })}
    </View>
);

// ─── Card: View Diary ─────────────────────────────────────────────────────────
const DiaryCard = ({ onPress, animValue }) => (
    <Animated.View
        style={[
            styles.card,
            {
                opacity: animValue,
                transform: [
                    {
                        translateY: animValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [30, 0],
                        }),
                    },
                ],
            },
        ]}
    >
        <View style={styles.diaryIconWrapper}>
            <Text style={styles.diaryIconText}>📖</Text>
        </View>
        <Text style={styles.cardTitle}>View Diary</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={onPress} activeOpacity={0.85}>
            <Text style={styles.primaryButtonText}>Open Digital Diary</Text>
        </TouchableOpacity>
    </Animated.View>
);

// ─── Card: Manage Complaint ───────────────────────────────────────────────────
const ComplaintCard = ({ onViewStatus, onNewReport, animValue }) => (
    <Animated.View
        style={[
            styles.card,
            {
                opacity: animValue,
                transform: [
                    {
                        translateY: animValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [40, 0],
                        }),
                    },
                ],
            },
        ]}
    >
        <Text style={styles.cardTitle}>Manage complaint</Text>
        <Text style={styles.cardSubtitle}>
            Submit new feedback or track the current status of your existing inquiries.
        </Text>
        <View style={styles.buttonRow}>
            <TouchableOpacity
                style={styles.outlineButton}
                onPress={onViewStatus}
                activeOpacity={0.8}
            >
                <Text style={styles.outlineButtonText}>View Status</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.primaryButton}
                onPress={onNewReport}
                activeOpacity={0.85}
            >
                <Text style={styles.primaryButtonText}>New Report</Text>
            </TouchableOpacity>
        </View>
    </Animated.View>
);

// ─── Main Dashboard Screen ────────────────────────────────────────────────────
const DashboardScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = React.useState('home');

    const headerAnim = useRef(new Animated.Value(0)).current;
    const diaryAnim = useRef(new Animated.Value(0)).current;
    const complaintAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.stagger(120, [
            Animated.spring(headerAnim, {
                toValue: 1,
                friction: 8,
                tension: 60,
                useNativeDriver: true,
            }),
            Animated.spring(diaryAnim, {
                toValue: 1,
                friction: 8,
                tension: 60,
                useNativeDriver: true,
            }),
            Animated.spring(complaintAnim, {
                toValue: 1,
                friction: 8,
                tension: 60,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F2F4F8" />

            {/* ── Header ── */}
            <Animated.View
                style={[
                    styles.header,
                    {
                        opacity: headerAnim,
                        transform: [
                            {
                                translateY: headerAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-16, 0],
                                }),
                            },
                        ],
                    },
                ]}
            >
                <View style={styles.headerLeft}>
                    <View style={styles.avatarWrapper}>
                        <Text style={styles.avatarEmoji}>🔑</Text>
                    </View>
                    <View>
                        <Text style={styles.headerLabel}>DASHBOARD</Text>
                        <Text style={styles.headerName}>Welcome, Sarah</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
                    <Text style={styles.bellIcon}>🔔</Text>
                    <View style={styles.bellBadge} />
                </TouchableOpacity>
            </Animated.View>

            {/* ── Content ── */}
            <View style={styles.scrollContent}>
                <DiaryCard
                    animValue={diaryAnim}
                    onPress={() => navigation.replace('studentdairy')
                    }
                />
                <ComplaintCard
                    animValue={complaintAnim}
                    onViewStatus={() => console.log('View Status')}
                    onNewReport={() => console.log('New Report')}
                />
            </View>

            {/* ── Bottom Tab Bar ── */}
            <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
        </SafeAreaView>
    );
};

export default DashboardScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────
const BLUE = '#2979FF';
const BLUE_LIGHT = '#EBF1FF';
const WHITE = '#FFFFFF';
const TEXT_PRIMARY = '#111827';
const TEXT_SECONDARY = '#6B7280';
const BG = '#F2F4F8';
const BORDER = '#E5E7EB';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: BG,
    },

    // ── Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: BG,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FDE68A',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    avatarEmoji: { fontSize: 20 },
    headerLabel: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.2,
        color: BLUE,
        textTransform: 'uppercase',
    },
    headerName: {
        fontSize: 18,
        fontWeight: '700',
        color: TEXT_PRIMARY,
        marginTop: 1,
    },
    bellButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 3,
    },
    bellIcon: { fontSize: 18 },
    bellBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#EF4444',
        borderWidth: 1.5,
        borderColor: WHITE,
    },

    // ── Scroll content
    scrollContent: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 8,
        gap: 14,
    },

    // ── Card base
    card: {
        backgroundColor: WHITE,
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 12,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: TEXT_PRIMARY,
        marginBottom: 6,
    },
    cardSubtitle: {
        fontSize: 13,
        color: TEXT_SECONDARY,
        lineHeight: 19,
        marginBottom: 18,
    },

    // ── Diary card specifics
    diaryIconWrapper: {
        width: 56,
        height: 56,
        borderRadius: 14,
        backgroundColor: BLUE_LIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 16,
    },
    diaryIconText: { fontSize: 28 },

    // ── Buttons
    primaryButton: {
        backgroundColor: BLUE,
        borderRadius: 50,
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6,
    },
    primaryButtonText: {
        color: WHITE,
        fontWeight: '700',
        fontSize: 15,
        letterSpacing: 0.3,
    },
    outlineButton: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: BORDER,
        borderRadius: 50,
        paddingVertical: 13,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    outlineButtonText: {
        color: TEXT_PRIMARY,
        fontWeight: '600',
        fontSize: 14,
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // ── Bottom tab bar
    tabBar: {
        flexDirection: 'row',
        backgroundColor: WHITE,
        borderTopWidth: 1,
        borderTopColor: BORDER,
        paddingBottom: Platform.OS === 'ios' ? 20 : 8,
        paddingTop: 10,
        paddingHorizontal: 8,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
    },
    tabIcon: {
        fontSize: 20,
        color: TEXT_SECONDARY,
    },
    tabIconActive: {
        color: BLUE,
    },
    tabLabel: {
        fontSize: 9,
        fontWeight: '600',
        letterSpacing: 0.8,
        color: TEXT_SECONDARY,
        textTransform: 'uppercase',
    },
    tabLabelActive: {
        color: BLUE,
    },
});
