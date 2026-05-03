import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Animated,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';

import { getParentChildren } from '../../services/api';

// ─── Bottom Tabs ─────────────────────────────
const TAB_ITEMS = [
    { key: 'home', label: 'HOME', icon: '⌂' },
    { key: 'diary', label: 'DIARY', icon: '📓' },
    { key: 'complaints', label: '⚠ COMPLAINTS', icon: '⚠' },
    { key: 'profile', label: '👤 PROFILE', icon: '👤' },
];

// ─── Main Screen ─────────────────────────────
const ParentDashboard = ({ navigation, route }) => {

    const [activeTab, setActiveTab] = useState('home');

    // Parent Data
    const parent = route?.params?.parent;
    const pid = parent?.pid;

    const pname =
        parent?.pname ||
        parent?.name ||
        parent?.parentName ||
        "User";

    // Children State
    const [children, setChildren] = useState([]);
    const [selectedChild, setSelectedChild] = useState(null);
    const [loadingChildren, setLoadingChildren] = useState(true);

    // Animations
    const headerAnim = useRef(new Animated.Value(0)).current;
    const cardAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        loadChildren();

        Animated.stagger(120, [
            Animated.spring(headerAnim, { toValue: 1, useNativeDriver: true }),
            Animated.spring(cardAnim, { toValue: 1, useNativeDriver: true }),
        ]).start();

    }, []);

    // Fetch Children
    const loadChildren = async () => {
        try {
            setLoadingChildren(true);

            const res = await getParentChildren(pid);

            // ✅ store full object inside dropdown item
            const formatted = res.data.map(item => ({
                label: `${item.sname} (${item.cname})`,
                value: item.sid,
                data: item, // full child object
            }));

            setChildren(formatted);

        } catch (err) {
            console.log(err?.response?.data || err.message);
        } finally {
            setLoadingChildren(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F2F4F8" />

            {/* HEADER */}
            <Animated.View style={[styles.header, { opacity: headerAnim }]}>
                <View style={styles.headerLeft}>
                    <View style={styles.avatar}>
                        <Text style={{ fontSize: 20 }}>👤</Text>
                    </View>

                    <View>
                        <Text style={styles.headerLabel}>DASHBOARD</Text>
                        <Text style={styles.headerName}>
                            Welcome, {pname}
                        </Text>
                    </View>
                </View>
            </Animated.View>

            {/* DROPDOWN */}
            <View style={styles.dropdownCard}>
                <Text style={styles.dropdownLabel}>Select Child</Text>

                {loadingChildren ? (
                    <ActivityIndicator size="small" color="#2979FF" />
                ) : (
                    <Dropdown
                        style={styles.dropdown}
                        data={children}
                        labelField="label"
                        valueField="value"
                        placeholder="Choose your child"
                        value={selectedChild?.value}
                        onChange={item => setSelectedChild(item)} // ✅ full object saved
                    />
                )}
            </View>

            {/* CONTENT */}
            <Animated.View style={[styles.content, { opacity: cardAnim }]}>

                {/* VIEW DIARY CARD */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>📖 View Diary</Text>

                    <TouchableOpacity
                        style={styles.primaryBtn}
                        onPress={() => {
                            if (!selectedChild) {
                                alert("Please select a child first");
                                return;
                            }
                            console.log("Selected Child:", selectedChild);
                            console.log("Selected Child Data:", selectedChild.data);
                            navigation.replace('studentdairy', {
                                child: selectedChild.data,
                            })
                        }}
                    >
                        <Text style={styles.btnText}>
                            Open Digital Diary
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* COMPLAINT CARD */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>⚠ Complaints</Text>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity style={styles.outlineBtn}>
                            <Text>View Status</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.primaryBtn}>
                            <Text style={styles.btnText}>New Report</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Animated.View>

            {/* BOTTOM NAV */}
            <View style={styles.bottomNav}>
                {TAB_ITEMS.map(tab => {
                    const isActive = activeTab === tab.key;

                    return (
                        <TouchableOpacity
                            key={tab.key}
                            style={styles.tabItem}
                            onPress={() => setActiveTab(tab.key)}
                        >
                            <Text style={[styles.tabIcon, isActive && styles.active]}>
                                {tab.icon}
                            </Text>
                            <Text style={[styles.tabText, isActive && styles.active]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

        </SafeAreaView>
    );
};

export default ParentDashboard;

//////////////////// STYLES ////////////////////

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F2F4F8',
    },

    header: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },

    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#FDE68A',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    headerLabel: {
        fontSize: 10,
        color: '#2979FF',
        fontWeight: 'bold',
    },

    headerName: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    dropdownCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        padding: 14,
        borderRadius: 14,
        elevation: 3,
    },

    dropdownLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 6,
        fontWeight: '600',
    },

    dropdown: {
        height: 45,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        paddingHorizontal: 10,
    },

    content: {
        flex: 1,
        padding: 16,
        gap: 15,
    },

    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        elevation: 3,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    primaryBtn: {
        backgroundColor: '#2979FF',
        padding: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 5,
    },

    btnText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    outlineBtn: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 25,
        flex: 1,
        alignItems: 'center',
        marginRight: 5,
    },

    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
    },

    tabItem: {
        flex: 1,
        alignItems: 'center',
    },

    tabIcon: {
        fontSize: 18,
        color: '#888',
    },

    tabText: {
        fontSize: 10,
        color: '#888',
    },

    active: {
        color: '#2979FF',
        fontWeight: 'bold',
    },
});