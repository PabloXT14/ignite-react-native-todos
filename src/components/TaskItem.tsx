import React from 'react';
import trashIcon from '../assets/icons/trash/trash.png';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';

interface TaskItemProps {
  taskId: number;
  onToggTaskDone: (itemId: number) => void;
}


export function TaskItem({ taskId, onToggTaskDone }: TaskItemProps) {
  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${taskId}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => onToggTaskDone}
        >
          <View>

          </View>

          <TextInput />
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Image source={trashIcon} />
      </TouchableOpacity>
    </>
  );
}


const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMaker: {

  }
});