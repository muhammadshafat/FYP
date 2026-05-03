import React, { useEffect, useState } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    FlatList, Platform, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, RADIUS, SHADOW } from './theme';
import { getStudentDiary } from '../../services/api';

export default function StudentDiaryScreen({ navigation, route }) {

    const child = route?.params?.child;

    const sid = child?.sid;

    const [activeTab, setActiveTab] = useState('Homework');
    const [loading, setLoading] = useState(true);
    const [homework, setHomework] = useState([]);
    const [notes, setNotes] = useState([]);

    const fetchDiary = async (category) => {
        try {
            setLoading(true);

            if (!sid) return;

            const res = await getStudentDiary(sid, category);
            const data = res?.data || [];

            if (category === 'Homework') {
                setHomework(data);
            } else {
                setNotes(data);
            }

            if (data.length === 0) {
                alert(`No ${category} today`);
            }

        } catch (err) {
            console.log(err?.response?.data || err.message);
            alert("API Error");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchDiary(activeTab);
    }, [activeTab]);

    const renderItem = ({ item }) => (
        <View style={styles.hwCard}>
            <Text style={styles.studentNameSmall}>{item.sname}</Text>
            <Text style={styles.hwTask}>{item.description}</Text>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.safe}>
                <ActivityIndicator size="large" color={COLORS.blue} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 22 }}>←</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Student Diary</Text>

                <Text>🔍</Text>
            </View>

            <View style={styles.tabRow}>
                {['Homework', 'Note'].map((t) => (
                    <TouchableOpacity
                        key={t}
                        style={[styles.tabBtn, activeTab === t && styles.tabBtnActive]}
                        onPress={() => setActiveTab(t)}
                    >
                        <Text style={[styles.tabBtnText, activeTab === t && styles.tabBtnTextActive]}>
                            {t}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={activeTab === 'Homework' ? homework : notes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            />

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backBtn: {
        padding: 4,
    },
    backArrow: {
        fontSize: 22,
        color: COLORS.textPrimary,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    listWrapper: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 16,
    },
    studentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.divider,
    },
    studentAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.blueLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    studentName: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    studentMeta: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    tabRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 10,
    },
    tabBtn: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: RADIUS.full,
        paddingVertical: 10,
        alignItems: 'center',
    },
    tabBtnActive: {
        backgroundColor: COLORS.blue,
        borderColor: COLORS.blue,
    },
    tabBtnText: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.textSecondary,
    },
    tabBtnTextActive: {
        color: COLORS.white,
    },
    dateDivider: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    dateLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.divider,
    },
    dateLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: COLORS.textMuted,
        marginHorizontal: 10,
        letterSpacing: 0.5,
    },
    hwCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.lg,
        padding: 14,
        ...SHADOW.sm,
        borderWidth: 1,
        borderColor: COLORS.divider,
    },
    hwCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    subjectBadge: {
        borderWidth: 1.5,
        borderRadius: RADIUS.full,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    subjectText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    hwTask: {
        fontSize: 13,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },
    noteCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.lg,
        padding: 14,
        ...SHADOW.sm,
        borderWidth: 1,
        borderColor: COLORS.divider,
    },
    noteTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 8,
    },
    noteText: {
        fontSize: 13,
        color: COLORS.textSecondary,
        lineHeight: 20,
        marginBottom: 12,
    },
    noteTeacherRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    noteTeacherLabel: {
        fontSize: 9,
        fontWeight: '600',
        color: COLORS.textMuted,
        letterSpacing: 0.8,
    },
    noteTeacherName: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    bottomTabBar: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingBottom: Platform.OS === 'ios' ? 20 : 8,
        paddingTop: 10,
    },
    bottomTabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
    },
    bottomTabIcon: {
        fontSize: 18,
        color: COLORS.textSecondary,
    },
    bottomTabIconActive: {
        color: COLORS.blue,
    },
    bottomTabLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: COLORS.textSecondary,
    },
    bottomTabLabelActive: {
        color: COLORS.blue,
        fontWeight: '700',
    },
});