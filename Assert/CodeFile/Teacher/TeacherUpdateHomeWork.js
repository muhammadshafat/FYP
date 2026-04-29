import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Modal,
    FlatList,
    SafeAreaView,
    StatusBar,
} from 'react-native';

const CLASSES = ['Grade 6-A', 'Grade 6-B', 'Grade 6-C', 'Grade 7-A'];
const SUBJECTS = ['Mathematics', 'Science', 'English', 'Urdu', 'Islamiyat'];

// ── Picker Modal ─────────────────────────────────────────────
const PickerModal = ({ visible, items, selected, onSelect, onClose, title }) => (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
            <View style={styles.modalSheet}>
                <View style={styles.modalHandle} />
                <Text style={styles.modalTitle}>{title}</Text>
                <FlatList
                    data={items}
                    keyExtractor={(item) => item}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.modalItem, item === selected && styles.modalItemActive]}
                            onPress={() => onSelect(item)}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.modalItemText, item === selected && styles.modalItemTextActive]}>
                                {item}
                            </Text>
                            {item === selected && <Text style={styles.modalItemCheck}>✓</Text>}
                        </TouchableOpacity>
                    )}
                />
            </View>
        </TouchableOpacity>
    </Modal>
);

// ── Main Screen ──────────────────────────────────────────────
const UpdateHomework = ({ navigation }) => {
    const [selectedClass, setSelectedClass] = useState('Grade 6-A');
    const [selectedSubject, setSelectedSubject] = useState('Mathematics');
    const [description, setDescription] = useState('Chapter 4.Ex#4.3(Q#1 to Q#8) test.');
    const [classModal, setClassModal] = useState(false);
    const [subjectModal, setSubjectModal] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleUpdate = () => {
        if (!description.trim()) return;
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
    };

    const handleCancel = () => {
        setSelectedClass('Grade 6-A');
        setSelectedSubject('Mathematics');
        setDescription('Chapter 4.Ex#4.3(Q#1 to Q#8) test.');
        setSuccess(false);
        if (navigation) navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* ── Header ── */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation && navigation.goBack()}
                    activeOpacity={0.7}
                >
                    <Text style={styles.backArrow}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Update Homework</Text>
                <View style={{ width: 36 }} />
            </View>

            {/* ── Scrollable Form ── */}
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Success Banner */}
                {success && (
                    <View style={styles.successBanner}>
                        <View style={styles.successIcon}>
                            <Text style={styles.successCheck}>✓</Text>
                        </View>
                        <Text style={styles.successText}>Homework updated successfully!</Text>
                    </View>
                )}

                {/* Select Class */}
                <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Select Class</Text>
                    <TouchableOpacity
                        style={styles.dropdownBtn}
                        onPress={() => setClassModal(true)}
                        activeOpacity={0.75}
                    >
                        <Text style={styles.dropdownText}>{selectedClass}</Text>
                        <Text style={styles.chevron}>⌄</Text>
                    </TouchableOpacity>
                </View>

                {/* Select Subject */}
                <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Select Subject</Text>
                    <TouchableOpacity
                        style={styles.dropdownBtn}
                        onPress={() => setSubjectModal(true)}
                        activeOpacity={0.75}
                    >
                        <Text style={styles.dropdownText}>{selectedSubject}</Text>
                        <Text style={styles.chevron}>⌄</Text>
                    </TouchableOpacity>
                </View>

                {/* Homework Description */}
                <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Homework Description</Text>
                    <View style={styles.textareaWrapper}>
                        <TextInput
                            style={styles.textarea}
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Enter homework description..."
                            placeholderTextColor="#aab4c4"
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>
                </View>
            </ScrollView>

            {/* ── Bottom Actions ── */}
            <View style={styles.actions}>
                <TouchableOpacity style={styles.btnPrimary} onPress={handleUpdate} activeOpacity={0.85}>
                    <Text style={styles.btnPrimaryText}>Update Homework</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnCancel} onPress={handleCancel} activeOpacity={0.7}>
                    <Text style={styles.btnCancelText}>Cancel</Text>
                </TouchableOpacity>

                <View style={styles.homeBar} />
            </View>

            {/* ── Modals ── */}
            <PickerModal
                visible={classModal}
                items={CLASSES}
                selected={selectedClass}
                title="Select Class"
                onSelect={(val) => { setSelectedClass(val); setClassModal(false); }}
                onClose={() => setClassModal(false)}
            />
            <PickerModal
                visible={subjectModal}
                items={SUBJECTS}
                selected={selectedSubject}
                title="Select Subject"
                onSelect={(val) => { setSelectedSubject(val); setSubjectModal(false); }}
                onClose={() => setSubjectModal(false)}
            />
        </SafeAreaView>
    );
};

// ── StyleSheet ───────────────────────────────────────────────
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    backBtn: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backArrow: {
        fontSize: 34,
        color: '#1a1a2e',
        lineHeight: 38,
        marginTop: -6,
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a2e',
        textAlign: 'center',
        letterSpacing: -0.3,
    },

    // Scroll
    scroll: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 16,
        gap: 20,
    },

    // Success Banner
    successBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dcfce7',
        borderWidth: 1.5,
        borderColor: '#86efac',
        borderRadius: 12,
        padding: 12,
        gap: 10,
    },
    successIcon: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#22c55e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    successCheck: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
    },
    successText: {
        flex: 1,
        fontSize: 13.5,
        fontWeight: '600',
        color: '#166534',
    },

    // Field
    field: {
        gap: 8,
    },
    fieldLabel: {
        fontSize: 13.5,
        fontWeight: '500',
        color: '#5a6272',
    },

    // Dropdown
    dropdownBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f7fa',
        borderWidth: 1.5,
        borderColor: '#e8ecf0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    dropdownText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: '#1a1a2e',
    },
    chevron: {
        fontSize: 20,
        color: '#888',
    },

    // Textarea
    textareaWrapper: {
        backgroundColor: '#f5f7fa',
        borderWidth: 1.5,
        borderColor: '#e8ecf0',
        borderRadius: 12,
        overflow: 'hidden',
    },
    textarea: {
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 14,
        fontSize: 14,
        color: '#2a2a3e',
        minHeight: 110,
        lineHeight: 22,
    },

    // Actions
    actions: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 36,
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
        backgroundColor: '#fff',
        gap: 12,
    },
    btnPrimary: {
        backgroundColor: '#1976D2',
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: '#1976D2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    btnPrimaryText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 0.2,
    },
    btnCancel: {
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 15,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#e5e7eb',
    },
    btnCancelText: {
        color: '#6b7280',
        fontSize: 15,
        fontWeight: '600',
    },
    homeBar: {
        width: 120,
        height: 5,
        backgroundColor: '#d1d5db',
        borderRadius: 3,
        alignSelf: 'center',
        marginTop: 4,
    },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    modalSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 12,
        paddingBottom: 36,
        maxHeight: '60%',
    },
    modalHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#d1d5db',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a2e',
        paddingHorizontal: 20,
        marginBottom: 8,
    },
    modalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    modalItemActive: {
        backgroundColor: '#eff6ff',
    },
    modalItemText: {
        flex: 1,
        fontSize: 15,
        color: '#333',
        fontWeight: '400',
    },
    modalItemTextActive: {
        color: '#1976D2',
        fontWeight: '600',
    },
    modalItemCheck: {
        fontSize: 16,
        color: '#1976D2',
        fontWeight: '700',
    },
});

export default UpdateHomework;