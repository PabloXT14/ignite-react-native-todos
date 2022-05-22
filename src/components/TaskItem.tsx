import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import penIcon from '../assets/icons/pen/pen.png';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import { Task } from './TasksList';


type TaskItemProps = {
  indexTask: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: { taskId: number, taskNewTitle: string }) => void;
}


export function TaskItem({ indexTask, task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditingTask(true);
  }

  function handleCancelEditing() {
    setTaskNewTitleValue(task.title);
    setIsEditingTask(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: taskNewTitleValue });
    setIsEditingTask(false);
  }


  useEffect(() => {
    if (textInputRef.current) {
      if (isEditingTask) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }

  }, [isEditingTask]);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          testID={`button-${indexTask}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${indexTask}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name='check'
                size={12}
                color='#FFF'
              />
            )}

          </View>
          <TextInput
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={taskNewTitleValue}
            onChangeText={setTaskNewTitleValue}
            editable={isEditingTask}
            onSubmitEditing={handleSubmitEditing}
          />

        </TouchableOpacity>
      </View>
      <View style={styles.iconsContainer}>
        {isEditingTask ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon name='x' size={24} color='#B2B2B2' />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />
        <TouchableOpacity
          onPress={() => removeTask(task.id)}
          disabled={isEditingTask}
          activeOpacity={isEditingTask ? 0.2 : 1}
        >
          <Image source={trashIcon} style={{ opacity: isEditingTask ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 24
  }
})