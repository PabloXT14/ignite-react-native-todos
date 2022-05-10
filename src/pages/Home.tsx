import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  //TODO - add new task
  function handleAddTask(newTaskTitle: string) {
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