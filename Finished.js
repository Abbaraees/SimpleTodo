import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Ionicons} from "@expo/vector-icons"

export default function FinishedScreen() {
  const [finishedTasks, setFinishedTasks] = useState()
  const renderItem = ({item, index}) => {
    return( 
    <View style={styles.row}>
      <Text style={styles.item}>{item}</Text>
      <TouchableOpacity
        style={styles.removeBtn}
      >

          <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
    </View>)
  }

  
  useEffect(() => {
    (async () => {
      try {
        const finishedTasks = await AsyncStorage.getItem("tasks")
        setFinishedTasks(JSON.parse(finishedTasks))
      } catch (error) {
        console.error(error)
      }
    })()
  }, )
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My TODO List</Text>
      <Text style={{fontSize: 18, marginTop: -15}}>Finished</Text>

      {finishedTasks && 
        <FlatList 
          style={styles.tasks} 
          data={finishedTasks} 
          renderItem={renderItem} 
        />
      }
      
    </View>
  )
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
})