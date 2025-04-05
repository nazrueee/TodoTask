import {
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  Switch,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WrapperContainer} from '../../components/atoms';
import {CustomTextInput, HeaderComp} from '../../components/molecules';
import actions from '../../redux/actions';
import {moderateScale, scale, verticalScale} from '../../utils/scaling';
import {lightTheme} from '../../styles/themes';
import fontFamily from '../../constants/fontFamily';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import imagePath from '../../constants/imagePath';
import {apiDelete} from '../../utils/utils';
import {DELETE} from '../../utils/urls';
import {deleteTodoTask} from '../../redux/actions/productActions';
import Modal from 'react-native-modal';
import { showSuccess } from '../../utils/helperFunctions';
const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? verticalScale(0) : verticalScale(6),
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: lightTheme.colors.white,
    padding: moderateScale(12),
    marginHorizontal: moderateScale(16),
    marginVertical: verticalScale(6),
    borderRadius: 10,
    elevation: 2,
    shadowColor: lightTheme.colors.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
  },
  itemText: {
    fontSize: scale(14),
    fontFamily: fontFamily.medium,
    color: lightTheme.colors.black,
    flex: 1,
    width: '40%',
  },
  statusText: {
    width: '25%',
    fontSize: scale(12),
    fontFamily: fontFamily.semiBold,
    color: lightTheme.colors.primary,
    marginLeft: moderateScale(12),
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: verticalScale(30),
    fontSize: scale(16),
    fontFamily: fontFamily.semiBold,
    color: lightTheme.colors.black,
  },
  modalContent: {
    width: '90%',
    height: '50%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  dropdownItem: {
    padding: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.colors.opacity50,
  },
  productItem: {
    flexDirection: 'row',
    paddingBottom: verticalScale(20),
    alignItems: 'center',
    backgroundColor: lightTheme.colors.white,
    borderRadius: 8,
    marginVertical: moderateScale(6),
  },
}));

const DashboardScreen = () => {
  const {styles} = useStyles(stylesheet);
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState<any[]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [taskInput, setTaskInput] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(false);

  const getTodoList = async () => {
    setIsLoading(true);
    try {
      const data = await actions.fetchTodoList();
      console.log(data,'sssssss');
      
      setProductList(data);
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const deletedItems = await deleteTodoTask(id);
    console.log('Deleted items:', deletedItems);
    getTodoList(); // Refresh list after deletion
  };

  const addToDoItem = async () => {
    if (!taskInput.trim()) {
      console.log('Task input is empty');
      return;
    }
    const data = {title: taskInput, completed: isCompleted};
    try {
      const res = await actions.addTodo(data);
      console.log(res, 'ress');
      getTodoList(); // Refresh list
    } catch (error) {
      console.log(error, 'error');
    }
  };


  const updateToCompleteTask = async (id: number) => {


    const completed =true
    try {
      const res = await actions.updateTodo(id,completed); // Use the PUT method here
      console.log(res, 'Updated Task Response');
      showSuccess(`Task ${res?.id} Updated`)
      getTodoList(); // Refresh list after update
    } catch (error) {
      console.log(error, 'Update Task Error');
    }
  };
  


  useEffect(() => {
    getTodoList();
  }, []);

  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity 
    onLongPress={()=>updateToCompleteTask(item.id)}
    style={styles.itemContainer}>
      <Text numberOfLines={1} style={styles.itemText}>
        {item?.title}
      </Text>
      <Text
        style={[styles.statusText, {color: item.completed ? 'green' : 'red'}]}>
        {item.completed ? 'Completed' : 'Pending'}
      </Text>
      <TouchableOpacity
        onPress={() => handleDelete(item?.id)}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
        }}>
        <Image source={imagePath.icClose} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const CategoriesList = () => (
    <Modal
      isVisible={isDropdownVisible}
      onBackdropPress={() => setDropdownVisible(false)}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.5}
      style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.modalContent}>
        <CustomTextInput
          onChangeText={setTaskInput}
          value={taskInput}
          placeholder="Enter your task"
          label="Add Your Task"
        />

        {/* ✅ Toggle Switch */}
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Text style={{marginRight: 10, fontFamily: fontFamily.medium}}>
            {isCompleted ? 'Completed' : 'Pending'}
          </Text>
          <Switch
            value={isCompleted}
            onValueChange={setIsCompleted}
            thumbColor={isCompleted ? 'green' : 'red'}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            addToDoItem();
            setDropdownVisible(false);
            setTaskInput('');
            setIsCompleted(false);
          }}
          style={{
            backgroundColor: lightTheme.colors.black,
            padding: 12,
            marginTop: 20,
            borderRadius: 8,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: lightTheme.colors.white,
              fontFamily: fontFamily.bold,
            }}>
            Add Task
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  return (
    <WrapperContainer>
      <HeaderComp
        rightImage={imagePath.add}
        onPressRight={() => setDropdownVisible(true)} // <== ADD THIS
        categoryText="Add Action"
        centerText="To-Do List"
      />
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={lightTheme.colors.primary} />
        </View>
      ) : productList.length > 0 ? (
        <FlatList
          data={productList}
          renderItem={renderItem}
          keyExtractor={item => item.id?.toString()}
          contentContainerStyle={{paddingVertical: verticalScale(12)}}
        />
      ) : (
        <Text style={styles.noItemsText}>No To-Do Items Found</Text>
      )}
      {CategoriesList()}
    </WrapperContainer>
  );
};

export default DashboardScreen;
