// screens/EnterComplaintScreen.js
import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    SafeAreaView, ScrollView,
} from 'react-native';
import { COLORS, RADIUS, SHADOW } from '../theme';

const TO_OPTIONS = ['Teacher', 'Principal', 'Admin'];
const TEACHER_OPTIONS = ['Mis Sadaf', 'Mis Alisha', 'Sir Ali', 'Mis Nadia'];

export default function EnterComplaintScreen({ navigation }) {
    const [toValue, setToValue] = useState('Teacher');
    const [teacherValue, setTeacherValue] = useState('Mis Sadaf');
    const [category, setCategory] = useState('');
    const [incidentDate, setIncidentDate] = useState('');
    const [description, setDescription] = useState('');
    const [showToDropdown, setShowToDropdown] = useState(false);
    const [showTeacherDropdown, setShowTeacherDropdown] = useState(false);

    const handleSubmit = () => {
        console.log({ toValue, teacherValue, category, incidentDate, description });
    };

    return (
        <SafeAreaView style={styles.safe}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Enter Complaint</Text>
                <View style={{ width: 32 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {/* Filter Records Card */}
                <View style={styles.filterCard}>
                    <View style={styles.filterTitleRow}>
                        <Text style={styles.filterIcon}>≡</Text>
                        <Text style={styles.filterTitle}>FILTER RECORDS</Text>
                    </View>
                    <View style={styles.twoDropdownRow}>
                        {/* To Dropdown */}
                        <View style={styles.dropdownGroup}>
                            <Text style={styles.dropdownGroupLabel}>To</Text>
                            <TouchableOpacity
                                style={styles.dropdown}
                                onPress={() => { setShowToDropdown(!showToDropdown); setShowTeacherDropdown(false); }}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.dropdownValue}>{toValue}</Text>
                                <Text style={styles.dropdownArrow}>⌄</Text>
                            </TouchableOpacity>
                            {showToDropdown && (
                                <View style={styles.dropdownMenu}>
                                    {TO_OPTIONS.map((opt) => (
                                        <TouchableOpacity key={opt} style={styles.dropdownMenuItem} onPress={() => { setToValue(opt); setShowToDropdown(false); }}>
                                            <Text style={[styles.dropdownMenuText, opt === toValue && { color: COLORS.blue }]}>{opt}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        {/* Select Teacher Dropdown */}
                        <View style={styles.dropdownGroup}>
                            <Text style={styles.dropdownGroupLabel}>SelectTeacher</Text>
                            <TouchableOpacity
                                style={styles.dropdown}
                                onPress={() => { setShowTeacherDropdown(!showTeacherDropdown); setShowToDropdown(false); }}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.dropdownValue}>{teacherValue}</Text>
                                <Text style={styles.dropdownArrow}>⌄</Text>
                            </TouchableOpacity>
                            {showTeacherDropdown && (
                                <View style={styles.dropdownMenu}>
                                    {TEACHER_OPTIONS.map((opt) => (
                                        <TouchableOpacity key={opt} style={styles.dropdownMenuItem} onPress={() => { setTeacherValue(opt); setShowTeacherDropdown(false); }}>
                                            <Text style={[styles.dropdownMenuText, opt === teacherValue && { color: COLORS.blue }]}>{opt}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                {/* Category */}
                <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>Category</Text>
                    <View style={styles.inputRow}>
                        <TextInput
                            style={styles.inputFlex}
                            placeholder="Select category"
                            placeholderTextColor={COLORS.textMuted}
                            value={category}
                            onChangeText={setCategory}
                        />
                        <Text style={{ fontSize: 18 }}>⛶</Text>
                    </View>
                </View>

                {/* Date of Incident */}
                <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>Date of Incident</Text>
                    <View style={styles.inputRow}>
                        <TextInput
                            style={styles.inputFlex}
                            placeholder="mm/dd/yyyy"
                            placeholderTextColor={COLORS.textMuted}
                            value={incidentDate}
                            onChangeText={setIncidentDate}
                        />
                        <Text style={{ fontSize: 18 }}>📅</Text>
                    </View>
                </View>

                {/* Detailed Description */}
                <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>Detailed Description</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Please provide specific details about the incident..."
                        placeholderTextColor={COLORS.textMuted}
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={5}
                        textAlignVertical="top"
                    />
                </View>

                <View style={{ height: 20 }} />
            </ScrollView>

            {/* Submit Button */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
                    <Text style={styles.submitBtnText}>Submit Complaint </Text>
                    <Text style={{ color: COLORS.white, fontSize: 16 }}>▷</Text>
                </TouchableOpacity>
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
    scroll: { padding: 16, gap: 18 },
    filterCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 16, ...SHADOW.sm },
    filterTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, gap: 6 },
    filterIcon: { fontSize: 16, color: COLORS.blue },
    filterTitle: { fontSize: 11, fontWeight: '700', color: COLORS.blue, letterSpacing: 1 },
    twoDropdownRow: { flexDirection: 'row', gap: 12 },
    dropdownGroup: { flex: 1, zIndex: 10 },
    dropdownGroupLabel: { fontSize: 11, fontWeight: '600', color: COLORS.textSecondary, marginBottom: 6 },
    dropdown: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingHorizontal: 10, paddingVertical: 9 },
    dropdownValue: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
    dropdownArrow: { fontSize: 16, color: COLORS.textSecondary },
    dropdownMenu: { position: 'absolute', top: 62, left: 0, right: 0, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, zIndex: 100, ...SHADOW.md },
    dropdownMenuItem: { paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.divider },
    dropdownMenuText: { fontSize: 13, color: COLORS.textPrimary },
    fieldGroup: { gap: 8 },
    fieldLabel: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
    inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingHorizontal: 14, paddingVertical: 12, backgroundColor: COLORS.white, gap: 8 },
    inputFlex: { flex: 1, fontSize: 14, color: COLORS.textPrimary },
    textArea: { borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: COLORS.textPrimary, backgroundColor: COLORS.white, minHeight: 120 },
    footer: { padding: 16, borderTopWidth: 1, borderTopColor: COLORS.border, backgroundColor: COLORS.white },
    submitBtn: { flexDirection: 'row', backgroundColor: COLORS.blue, borderRadius: RADIUS.full, paddingVertical: 15, alignItems: 'center', justifyContent: 'center' },
    submitBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 15 },
});
