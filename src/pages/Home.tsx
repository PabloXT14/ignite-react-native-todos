import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  //TODO - add new task
  function handleAddTask(newTaskTitle: string) {
    const taksAlreadyExists = tasks.find(task => task.title === newTaskTitle);

    if(taksAlreadyExists) return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks([...tasks, newTask]);
  }

  //TODO - toggle task done if exists
  function handleToggleTaskDone(id: number) {
   
    const updatedTasks = tasks.map(task => {
      if(task.id === id) {
        task.done = !task.done;
      }
      return task
    });

    setTasks(updatedTasks);

  }

  //TODO - remove task from state
  function handleRemoveTask(id: number) {
    let canRemoveTask;

    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      { text: 'Não', onPress: () => canRemoveTask = false },
      { text: 'Sim', onPress: () => canRemoveTask = true }
    ]);

    if(!canRemoveTask) return;

    const taksFiltered = tasks.filter(task => task.id !== id);

    setTasks(taksFiltered);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})