import React, { useState, useEffect } from 'react';
import {
    getTeacherClasses,
    getTeacherSubjects,
    getClassStudents,
    addDiary, addNoteDiary
} from '../../services/api';

import {
    View,
    Text,
    Alert,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const BLUE = '#2979FF';
const BLUE_LIGHT = '#E8F0FE';
const GRAY_BORDER = '#E0E4EA';
const TEXT_DARK = '#1A2233';
const TEXT_MID = '#5A6478';
const TEXT_LIGHT = '#9AA3B2';
const WHITE = '#FFFFFF';

/* ───────── Dropdown Styles ───────── */
const dd = StyleSheet.create({
    wrapper: { marginBottom: 18 },
    label: { fontSize: 13, fontWeight: '600', color: TEXT_DARK, marginBottom: 7 },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: GRAY_BORDER,
        borderRadius: 12,
        paddingHorizontal: 14,
        height: 50,
        backgroundColor: WHITE,
    },
    boxOpen: { borderColor: BLUE },
    value: { fontSize: 14, color: TEXT_DARK },
    placeholder: { color: TEXT_LIGHT },
    chevron: { fontSize: 11, color: TEXT_MID },
    menu: {
        borderWidth: 1.5,
        borderColor: BLUE,
        borderRadius: 12,
        marginTop: 4,
        backgroundColor: WHITE,
    },
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: GRAY_BORDER,
    },
    itemActive: { backgroundColor: BLUE_LIGHT },
    itemText: { color: TEXT_DARK },
});

/* ───────── Dropdown Component ───────── */
const Dropdown = ({ label, placeholder, value, options = [], onSelect, labelKey, valueKey }) => {
    const [open, setOpen] = useState(false);

    return (
        <View style={dd.wrapper}>
            <Text style={dd.label}>{label}</Text>

            <TouchableOpacity
                style={[dd.box, open && dd.boxOpen]}
                onPress={() => setOpen(!open)}
            >
                <Text style={!value ? dd.placeholder : dd.value}>
                    {value ? value?.[labelKey] : placeholder}
                </Text>
                <Text style={dd.chevron}>{open ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {open && (
                <View style={dd.menu}>
                    {options.length === 0 ? (
                        <Text style={{ padding: 10, color: TEXT_LIGHT }}>No data found</Text>
                    ) : (
                        options.map((opt) => (
                            <TouchableOpacity
                                key={String(opt?.[valueKey])}
                                style={[
                                    dd.item,
                                    value?.[valueKey] === opt?.[valueKey] && dd.itemActive
                                ]}
                                onPress={() => {
                                    onSelect(opt);
                                    setOpen(false);
                                }}
                            >
                                <Text style={dd.itemText}>{opt?.[labelKey]}</Text>
                            </TouchableOpacity>
                        ))
                    )}
                </View>
            )}
        </View>
    );
};

const AddNewDiaryScreen = ({ navigation, route }) => {

    const teacher = route?.params?.teacher;
    const tid = Number(teacher?.tid);

    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);

    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const [category, setCategory] = useState('HomeWork');
    const [description, setDescription] = useState('');

    /* ───── LOAD CLASSES ───── */
    useEffect(() => {
        const loadClasses = async () => {
            try {
                const res = await getTeacherClasses(tid);

                setClasses(
                    (res?.data || []).map(c => ({
                        cid: c.cid,
                        cname: c.cname
                    }))
                );
            } catch {
                Alert.alert("Error", "Failed to load classes");
            }
        };

        if (tid) loadClasses();
    }, [tid]);

    /* ───── CLASS SELECT ───── */
    const handleClassSelect = async (cls) => {
        setSelectedClass(cls);
        setSelectedSubject(null);
        setSelectedStudent(null);

        setSubjects([]);
        setStudents([]);

        try {
            // Subjects
            const subRes = await getTeacherSubjects(tid, cls.cid);

            setSubjects(
                (subRes?.data || []).map(s => ({
                    sid: s.sid,
                    sname: s.sname
                }))
            );

            // Students
            const stuRes = await getClassStudents(cls.cid);

            setStudents(
                (stuRes?.data || []).map(s => ({
                    sid: s.sid,
                    sname: s.sname
                }))
            );

        } catch {
            Alert.alert("Error", "Failed to load class data");
        }
    };

    /* ───── VALIDATION ───── */
    const isValid =
        selectedClass &&
        selectedSubject &&
        description.trim().length > 0 &&
        category &&
        (category === "HomeWork" || selectedStudent);

    /* ───── SUBMIT ───── */
    const handleSubmit = async () => {
        if (!isValid) {
            Alert.alert("Error", "Fill all fields");
            return;
        }

        try {

            // ───────── HOMEWORK API ─────────
            if (category === "HomeWork") {

                const res = await addDiary({
                    tid,
                    cid: selectedClass.cid,
                    sid: selectedSubject.sid,
                    description: description.trim(),
                    category: "Homework"
                });

                Alert.alert("Success", "Homework added successfully!");
            }

            // ───────── NOTE API ─────────
            if (category === "Note") {

                if (!selectedStudent) {
                    Alert.alert("Error", "Select a student");
                    return;
                }

                const res = await addNoteDiary({
                    tid,
                    cid: selectedClass.cid,
                    sid: selectedSubject.sid,
                    sid_Student: selectedStudent.sid,   // 🔥 FIXED
                    description: description.trim(),
                    category: "Note"
                });

                Alert.alert("Success", "Note added successfully!");
            }

            navigation.goBack();

        } catch (e) {
            console.log(e?.response?.data || e.message);
            Alert.alert("Error", "Submit failed");
        }
    };

    return (
        <SafeAreaView style={s.safe}>
            <StatusBar barStyle="dark-content" />

            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={s.scrollContent}>

                    {/* CLASS */}
                    <Dropdown
                        label="Select Class"
                        placeholder="Choose Class"
                        value={selectedClass}
                        options={classes}
                        onSelect={handleClassSelect}
                        labelKey="cname"
                        valueKey="cid"
                    />

                    {/* SUBJECT */}
                    <Dropdown
                        label="Select Subject"
                        placeholder="Choose Subject"
                        value={selectedSubject}
                        options={subjects}
                        onSelect={setSelectedSubject}
                        labelKey="sname"
                        valueKey="sid"
                    />

                    {/* STUDENT ONLY FOR NOTE */}
                    {category === 'Note' && (
                        <Dropdown
                            label="Select Student"
                            placeholder="Choose Student"
                            value={selectedStudent}
                            options={students}
                            onSelect={setSelectedStudent}
                            labelKey="sname"
                            valueKey="sid"
                        />
                    )}

                    {/* SWITCH */}
                    <View style={ui.switchContainer}>
                        {['HomeWork', 'Note'].map(type => (
                            <TouchableOpacity
                                key={type}
                                style={[ui.switchBtn, category === type && ui.switchActive]}
                                onPress={() => setCategory(type)}
                            >
                                <Text style={[ui.switchText, category === type && ui.switchTextActive]}>
                                    {type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* DESCRIPTION */}
                    <TextInput
                        style={ui.input}
                        placeholder="Write diary description..."
                        multiline
                        value={description}
                        onChangeText={setDescription}
                    />

                </ScrollView>

                {/* SUBMIT */}
                <TouchableOpacity
                    style={[s.btn, !isValid && s.btnDisabled]}
                    onPress={handleSubmit}
                    disabled={!isValid}
                >
                    <Text style={s.btnText}>Submit</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default AddNewDiaryScreen;

/* ───────── STYLES ───────── */
const ui = StyleSheet.create({
    switchContainer: {
        flexDirection: 'row',
        marginVertical: 15
    },
    switchBtn: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: GRAY_BORDER
    },
    switchActive: {
        backgroundColor: WHITE
    },
    switchText: {
        fontWeight: '600',
        color: TEXT_MID
    },
    switchTextActive: {
        color: BLUE
    },
    input: {
        backgroundColor: WHITE,
        borderWidth: 1,
        borderColor: GRAY_BORDER,
        borderRadius: 10,
        padding: 12,
        minHeight: 100,
        textAlignVertical: 'top'
    }
});

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#F5F7FA' },
    scrollContent: { padding: 20 },
    btn: {
        backgroundColor: BLUE,
        padding: 15,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    btnDisabled: {
        backgroundColor: '#A8C4FF'
    },
    btnText: {
        color: WHITE,
        fontWeight: '700'
    }
});