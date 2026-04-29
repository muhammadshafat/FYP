// screens/StudentDiaryScreen.js
import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    FlatList, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, RADIUS, SHADOW } from './theme';

const HOMEWORK = [
    { id: '1', subject: 'MATHEMATICS', subjectColor: '#2979FF', icon: 'Σ', task: 'Complete exercises 1-10 from the textbook Chapter 4. Show all steps clearly for full credit.' },
    { id: '2', subject: 'BIOLOGY', subjectColor: '#16A34A', icon: '🔬', task: 'Draw and label a detailed diagram of a chloroplast and the Calvin cycle on an A4 sheet.' },
    { id: '3', subject: 'ENGLISH', subjectColor: '#D97706', icon: '📝', task: 'Write a 500-word essay on the causes of the French Revolution. References must be cited.' },
];

const TEACHER_NOTES = [
    {
        id: '1', subject: 'MATHEMATICS', subjectColor: '#2979FF', title: 'Behavioral Update', icon: '🎯',
        note: 'Shehryar Ali showed great improvement in focusing during today\'s Mathematics class. He helped a peer solve a complex integration problem, demonstrating leadership skills.',
        teacher: 'MIS ALISHA',
    },
    {
        id: '2', subject: 'ENGLISH', subjectColor: '#D97706', title: 'Participation', icon: '🗣',
        note: "Excellent contribution during the debate on literature. His analysis of Shakespearean themes was quite mature for his grade level.",
        teacher: 'MIS ALIYA',
    },
];

const subjectColors = { MATHEMATICS: '#2979FF', BIOLOGY: '#16A34A', ENGLISH: '#D97706', PHYSICS: '#7C3AED' };

export default function StudentDiaryScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('homework');
    const [bottomTab, setBottomTab] = useState('diary');

    const BOTTOM_TABS = [
        { key: 'home', label: 'Home', icon: '⌂' },
        { key: 'diary', label: 'Diary', icon: '📓' },
        { key: 'complaints', label: 'Complaints', icon: '⚠' },
        { key: 'profile', label: 'Profile', icon: '👤' },
    ];

    const renderHomeworkItem = ({ item }) => (
        <View style={styles.hwCard}>
            <View style={styles.hwCardHeader}>
                <View style={[styles.subjectBadge, { borderColor: subjectColors[item.subject] || COLORS.blue }]}>
                    <Text style={[styles.subjectText, { color: subjectColors[item.subject] || COLORS.blue }]}>{item.subject}</Text>
                </View>
                <Text style={{ fontSize: 20 }}>{item.icon}</Text>
            </View>
            <Text style={styles.hwTask}>{item.task}</Text>
        </View>
    );

    const renderNoteItem = ({ item }) => (
        <TouchableOpacity
            style={styles.noteCard}
            onPress={() => navigation?.navigate('TeacherNote', { note: item })}
            activeOpacity={0.9}
        >
            <View style={styles.hwCardHeader}>
                <View style={[styles.subjectBadge, { borderColor: subjectColors[item.subject] || COLORS.blue }]}>
                    <Text style={[styles.subjectText, { color: subjectColors[item.subject] || COLORS.blue }]}>{item.subject}</Text>
                </View>
                <Text style={{ fontSize: 18 }}>{item.icon}</Text>
            </View>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteText}>{item.note}</Text>
            <View style={styles.noteTeacherRow}>
                <Text style={{ fontSize: 14, marginRight: 6 }}>👤</Text>
                <View>
                    <Text style={styles.noteTeacherLabel}>TEACHER</Text>
                    <Text style={styles.noteTeacherName}>{item.teacher}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderListHeader = () => (
        <>
            <View style={styles.studentRow}>
                <View style={styles.studentAvatar}>
                    <Text style={{ fontSize: 22 }}>👨‍💼</Text>
                </View>
                <View>
                    <Text style={styles.studentName}>Shehryar Ali</Text>
                    <Text style={styles.studentMeta}>Class 10-B • Roll No: 24</Text>
                </View>
            </View>

            <View style={styles.tabRow}>
                {[
                    { key: 'homework', label: '📖 Homework' },
                    { key: 'teacher', label: '📋 Teacher Note' },
                ].map((t) => (
                    <TouchableOpacity
                        key={t.key}
                        style={[styles.tabBtn, activeTab === t.key && styles.tabBtnActive]}
                        onPress={() => setActiveTab(t.key)}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.tabBtnText, activeTab === t.key && styles.tabBtnTextActive]}>{t.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.dateDivider}>
                <View style={styles.dateLine} />
                <Text style={styles.dateLabel}>TODAY, 24 OCT</Text>
                <View style={styles.dateLine} />
            </View>
        </>
    );

    return (
        <SafeAreaView style={styles.safe}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Student Diary</Text>
                <TouchableOpacity><Text style={{ fontSize: 20 }}>🔍</Text></TouchableOpacity>
            </View>

            {/* List Wrapper */}
            <View style={styles.listWrapper}>
                <FlatList
                    data={activeTab === 'homework' ? HOMEWORK : TEACHER_NOTES}
                    keyExtractor={(item) => item.id}
                    renderItem={activeTab === 'homework' ? renderHomeworkItem : renderNoteItem}
                    ListHeaderComponent={renderListHeader}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                    ListFooterComponent={() => <View style={{ height: 24 }} />}
                />
            </View>

            {/* Bottom Tabs */}
            <View style={styles.bottomTabBar}>
                {BOTTOM_TABS.map((tab) => {
                    const active = bottomTab === tab.key;
                    return (
                        <TouchableOpacity
                            key={tab.key}
                            style={styles.bottomTabItem}
                            onPress={() => setBottomTab(tab.key)}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.bottomTabIcon, active && styles.bottomTabIconActive]}>{tab.icon}</Text>
                            <Text style={[styles.bottomTabLabel, active && styles.bottomTabLabelActive]}>{tab.label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
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