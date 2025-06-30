import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet, Button } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const TodoApp = () => {
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);

    const addTask = () => {
        if (task.trim()) {
            setTodos([...todos, { id: Date.now().toString(), text: task }]);
            setTask(''); 
        }
    };

    const deleteTask = (id) => {
        setTodos(todos.filter(item => item.id !== id));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Manage Your To-Do</Text>

            <View style={styles.todoContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter a task"
                    placeholderTextColor="#888"
                    value={task}
                    onChangeText={setTask}
                />
                <Pressable style={styles.addButton} onPress={addTask}>
                    <Text style={styles.addButtonText}>Add</Text>
                </Pressable>
            </View>

            <FlatList
                data={todos}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <Text style={styles.taskText}>{item.text}</Text>
                        <Pressable style={styles.deleteBtn} onPress={() => deleteTask(item.id)}>
                            <Text style={styles.addButtonText}>
                                <AntDesign name="delete" color={"red"} size={24} />
                            </Text>
                        </Pressable>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, marginTop: 30 },
    heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'left' },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 13,
        color: 'black'
    },
    addButton: {
        marginLeft: 10,
        backgroundColor: '#13b913',
        paddingVertical: 13,
        paddingHorizontal: 20,
        borderRadius: 6
    },
    addButtonText: {
        color: 'white',
        fontWeight: '600'
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        paddingVertical: 10
    },
    taskText: {
        flex: 1,
        fontSize: 16,
        color: '#333'
    },
    deleteBtn: {
        marginLeft: 10,
        // backgroundColor: '#e53a3a',
        paddingVertical: 13,
        paddingHorizontal: 20,
        borderRadius: 6
    }
});

export default TodoApp;