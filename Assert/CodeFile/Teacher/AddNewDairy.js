import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    TextInput,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';

// ─── Constants ────────────────────────────────────────────────────────────────
const CLASSES = ['Grade 6-A', 'Grade 6-B', 'Grade 6-C', 'Grade 7-A', 'Grade 7-B'];
const SUBJECTS = ['Mathematics', 'Science', 'English', 'Urdu', 'Islamiat', 'Computer'];

const BLUE = '#2979FF';
const BLUE_LIGHT = '#E8F0FE';
const GRAY_BG = '#F5F6FA';
const GRAY_BORDER = '#E0E4EA';
const TEXT_DARK = '#1A2233';
const TEXT_MID = '#5A6478';
const TEXT_LIGHT = '#9AA3B2';
const WHITE = '#FFFFFF';

// ─── Dropdown Component ───────────────────────────────────────────────────────
const Dropdown = ({ label, placeholder, value, options, onSelect }) => {
    const [open, setOpen] = useState(false);

    return (
        <View style={dd.wrapper}>
            <Text style={dd.label}>{label}</Text>
            <TouchableOpacity
                style={[dd.box, open && dd.boxOpen]}
                onPress={() => setOpen(!open)}
                activeOpacity={0.85}
            >
                <Text style={[dd.value, !value && dd.placeholder]}>
                    {value || placeholder}
                </Text>
                <Text style={dd.chevron}>{open ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {open && (
                <View style={dd.menu}>
                    {options.map((opt) => (
                        <TouchableOpacity
                            key={opt}
                            style={[dd.item, opt === value && dd.itemActive]}
                            onPress={() => { onSelect(opt); setOpen(false); }}
                        >
                            <Text style={[dd.itemText, opt === value && dd.itemTextActive]}>
                                {opt}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const dd = StyleSheet.create({
    wrapper: { marginBottom: 16, zIndex: 20 },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: TEXT_MID,
        marginBottom: 7,
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: WHITE,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: GRAY_BORDER,
        paddingHorizontal: 14,
        paddingVertical: 13,
    },
    boxOpen: {
        borderColor: BLUE,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    value: { fontSize: 14, fontWeight: '600', color: TEXT_DARK, flex: 1 },
    placeholder: { color: TEXT_LIGHT, fontWeight: '400' },
    chevron: { fontSize: 10, color: TEXT_MID },
    menu: {
        backgroundColor: WHITE,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: BLUE,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 6,
    },
    item: {
        paddingHorizontal: 14,
        paddingVertical: 11,
        borderBottomWidth: 1,
        borderBottomColor: GRAY_BORDER,
    },
    itemActive: { backgroundColor: BLUE_LIGHT },
    itemText: { fontSize: 14, color: TEXT_MID, fontWeight: '500' },
    itemTextActive: { color: BLUE, fontWeight: '700' },
});

// ─── Main Screen ──────────────────────────────────────────────────────────────
const AddNewDiaryScreen = ({ navigation }) => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [entryType, setEntryType] = useState('HomeWork'); // 'HomeWork' | 'Note'
    const [description, setDescription] = useState('');

    const isFormValid = selectedClass && selectedSubject && description.trim().length > 0;

    const handleSubmit = () => {
        if (!isFormValid) return;
        const diary = { selectedClass, selectedSubject, entryType, description };
        console.log('Submitting diary:', diary);
        // navigation.goBack();  ← uncomment when wired to navigator
        alert(`Diary submitted!\nClass: ${selectedClass}\nSubject: ${selectedSubject}\nType: ${entryType}`);
    };

    return (
        <SafeAreaView style={s.safe}>
            <StatusBar barStyle="dark-content" backgroundColor={WHITE} />

            {/* ── Header ── */}
            <View style={s.header}>
                <TouchableOpacity style={s.backBtn} onPress={() => navigation?.goBack()}>
                    <Text style={s.backIcon}>‹</Text>
                </TouchableOpacity>
                <Text style={s.headerTitle}>Add New Diary</Text>
                <View style={{ width: 36 }} />
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView
                    style={s.scroll}
                    contentContainerStyle={s.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* ── Section Label ── */}
                    <Text style={s.sectionLabel}>Main</Text>

                    {/* ── Class Dropdown ── */}
                    <Dropdown
                        label="Select Class"
                        placeholder="Choose a class"
                        value={selectedClass}
                        options={CLASSES}
                        onSelect={setSelectedClass}
                    />

                    {/* ── Subject Dropdown ── */}
                    <View style={{ zIndex: 10 }}>
                        <Dropdown
                            label="Select Subject"
                            placeholder="Choose a subject"
                            value={selectedSubject}
                            options={SUBJECTS}
                            onSelect={setSelectedSubject}
                        />
                    </View>

                    {/* ── Entry Type Toggle ── */}
                    <View style={s.toggleRow}>
                        {['HomeWork', 'Note'].map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    s.toggleBtn,
                                    entryType === type && s.toggleBtnActive,
                                ]}
                                onPress={() => setEntryType(type)}
                                activeOpacity={0.8}
                            >
                                <Text
                                    style={[
                                        s.toggleText,
                                        entryType === type && s.toggleTextActive,
                                    ]}
                                >
                                    {type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* ── Description ── */}
                    <View style={s.descWrapper}>
                        <Text style={s.descLabel}>Description</Text>
                        <TextInput
                            style={s.descInput}
                            placeholder="Write the diary details or homework instructions here..."
                            placeholderTextColor={TEXT_LIGHT}
                            multiline
                            textAlignVertical="top"
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>
                </ScrollView>

                {/* ── Submit Button ── */}
                <View style={s.footer}>
                    <TouchableOpacity
                        style={[s.submitBtn, !isFormValid && s.submitBtnDisabled]}
                        onPress={handleSubmit}
                        activeOpacity={isFormValid ? 0.85 : 1}
                    >
                        <Text style={s.submitText}>Submit Diary  ➤</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: WHITE,
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 13,
        backgroundColor: WHITE,
        borderBottomWidth: 1,
        borderBottomColor: GRAY_BORDER,
    },
    backBtn: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        fontSize: 30,
        color: BLUE,
        marginTop: -2,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: TEXT_DARK,
        letterSpacing: 0.2,
    },

    // Scroll
    scroll: { flex: 1, backgroundColor: GRAY_BG },
    scrollContent: {
        padding: 20,
        paddingBottom: 10,
    },

    // Section label
    sectionLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: TEXT_LIGHT,
        marginBottom: 16,
        letterSpacing: 0.3,
    },

    // Toggle (HomeWork / Note)
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10,
    },
    toggleBtn: {
        paddingHorizontal: 22,
        paddingVertical: 9,
        borderRadius: 24,
        backgroundColor: WHITE,
        borderWidth: 1.5,
        borderColor: GRAY_BORDER,
    },
    toggleBtnActive: {
        backgroundColor: BLUE,
        borderColor: BLUE,
        shadowColor: BLUE,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    toggleText: {
        fontSize: 13,
        fontWeight: '600',
        color: TEXT_MID,
    },
    toggleTextActive: {
        color: WHITE,
    },

    // Description
    descWrapper: { marginBottom: 20 },
    descLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: TEXT_MID,
        marginBottom: 7,
    },
    descInput: {
        backgroundColor: WHITE,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: GRAY_BORDER,
        paddingHorizontal: 14,
        paddingVertical: 13,
        fontSize: 14,
        color: TEXT_DARK,
        minHeight: 120,
        lineHeight: 22,
    },

    // Footer / Submit
    footer: {
        backgroundColor: WHITE,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 28 : 16,
        borderTopWidth: 1,
        borderTopColor: GRAY_BORDER,
    },
    submitBtn: {
        backgroundColor: BLUE,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: BLUE,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6,
    },
    submitBtnDisabled: {
        backgroundColor: '#A8C4FF',
        shadowOpacity: 0,
        elevation: 0,
    },
    submitText: {
        color: WHITE,
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 0.4,
    },
});

export default AddNewDiaryScreen;
