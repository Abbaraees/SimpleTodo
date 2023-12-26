import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';


export default function Home() {
    const [taskName, setTaskName] = useState("")
    const [tasks, setTasks] = useState()
    const renderItem = ({item, index}) => {
      return( 
      <View style={styles.row}>
        <Text style={styles.item}>{item}</Text>
        <TouchableOpacity
          style={styles.removeBtn}
        >
  
            <Ionicons name="checkmark" size={24} color="black" />
        </TouchableOpacity>
      </View>)
    }
  
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const tasks = await AsyncStorage.getItem("tasks")
          if (tasks != null) {
            setTasks(JSON.parse(tasks))
          }
        } catch (error) {
          console.error(error)
        }
      }
      
      fetchTasks()
      console.log(tasks)
    }, [])
  
    useEffect(() => {
      const saveTasks = async () => {
        try {
          if (tasks != null)
           await AsyncStorage.setItem("tasks", JSON.stringify(tasks))
           console.log("Tasks saved")
           console.log(tasks)
        } catch (error) {
          
        }
      }
      saveTasks()
    }, [tasks])
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>My TODO List</Text>
        <TextInput 
          style={styles.inputField}
          value={taskName}
          onChangeText={setTaskName}
          placeholder='Enter a task'
        />
        <TouchableOpacity 
          onPress={() => {
            if (taskName !== "") {
              setTasks(prevTasks => [...prevTasks, taskName])
              setTaskName("")
            }
          }}
          style={styles.btn}
        >
          <Text style={styles.btnText}>ADD</Text>
        </TouchableOpacity>
        <FlatList 
          data={tasks} 
          renderItem={renderItem}
          style={styles.tasks}
        />
        <StatusBar style="auto" />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 30,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'top',
    },
    title: {
      fontSize: 30,
      fontStyle: "italic",
      fontWeight: "bold",
      fontVariant: "small-caps",
      marginBottom: 20
    },
    inputField: {
      width: '80%',
      height: 40,
      backgroundColor: '#eee',
      borderColor: '#333',
      borderWidth: 1,
      borderRadius: 5,
      padding: 5
    },
    btn: {
      width: "50%",
      backgroundColor: "#333",
      alignItems: 'center',
      padding: 5,
      marginTop: 15,
      borderRadius: 10
    },
    btnText: {
      color: '#fff'
    },
    tasks: {
      width: "90%",
      marginTop: 15
    },
  
    row: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      borderColor: "#999",
      paddingBottom: 5,
      marginBottom: 15,
      borderBottomWidth: 1,
    }
  });