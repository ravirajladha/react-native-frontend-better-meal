import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ListItem,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {Button, Avatar, Badge, Icon} from 'react-native-elements';
import {images, theme} from '../../../constants';
import MedicationIcon from '../../../assets/icons/MedicationIcon.png';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  addMedicineInRedux,
  fetchMedicineINRedux,
  removeMedicineINRedux,
} from '../../../redux/medication/components/medication.action';

const Medications = ({
  addMedicineInRedux,
  user,
  medicine,
  fetchMedicineINRedux,
  removeMedicineINRedux,
}) => {
  const [text, setText] = useState(null);
  const [open, setOpen] = useState(false);
  const [medicines, setMedicine] = useState('');
  const {COLORS, FONTS, SIZES} = theme;

  useEffect(() => {
    fetchMedicineINRedux(user&&user.id ? user.id : null);
  }, []);

  const sendingMedicineToRedux = () => {
    let medicine = new Object();
    medicine.userId = user.id;
    medicine.medicineText = text;
    addMedicineInRedux(user&&user.id ? user.id : null, text);
  };

  const sendingRemovingMedicineToRedux = (val) => {
    setOpen(true);
    setMedicine(val);
  };

  console.log('[user Id]', user && user.id ? user.id : null);

  const handelClose = () => {
    console.log('inside handelClose');
    setOpen(false);
    removeMedicineINRedux(user&&user.id ? user.id : null, medicines);
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <Modal animationType="slide" transparent={true} visible={open}>
        <View style={styles.centeredViewInConfirmation}>
          <View style={styles.modalViewInConfirmation}>
            <Text style={styles.textStyle}>
              Are you sure you want to remove {medicines}
            </Text>

            <View style={styles.actionButton}>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <View style={styles.CancelView}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handelClose}>
                <View style={styles.OKView}>
                  <Text style={styles.textStyle}>OK</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.parentView}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30,
            borderBottomWidth: 1,
            borderBottomColor: '#a1a1a1',
          }}>
          <View style={{}}>
            <TextInput
              style={styles.input}
              onChangeText={(e) => setText(e)}
              placeholder="Name of medicine/ suppliement"
              keyboardType="default"
            />
          </View>

          <TouchableOpacity onPress={sendingMedicineToRedux}>
            <View style={{marginTop: 10}}>
              <Text style={styles.input}>+</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{paddingVertical: 30}}>
          <View>
            {medicine &&
              medicine.map((item) => {
                return (
                  <SwipeRow
                    leftOpenValue={75}
                    rightOpenValue={0}
                    stopLeftSwipe={75}
                    // stopRightSwipe={1}
                    disableLeftSwipe = {true}
                    closeOnRowPress={true}
                                        
                    >
                      
                    <View style={styles.standaloneRowBack}>
                      <TouchableOpacity
                        onPress={() => sendingRemovingMedicineToRedux(item)}
                      >                          
                        <View
                          style={{
                            backgroundColor : 'red'
                            
                          }}>

                            <View style = {{marginTop : 10}}>
                            <Icon
                      name="remove-circle-outline"
                      type="ionicon"
                      color="#fff"
                      size={30}
                            
                    />
                            </View>
                            <View>

                          <Text style={styles.backTextWhite1}>Remove</Text>
                            </View>


                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.standaloneRowFront}>
                      <View>
                        <Text
                          style={{
                            textAlign: 'left',
                            color: '#6d6d6d',
                            fontWeight: 'bold',
                            fontSize: 20,
                            paddingLeft: 20,
                          }}>
                          {item}
                        </Text>
                      </View>
                      <View>
                        <Image source={MedicationIcon}></Image>
                      </View>
                    </View>
                  </SwipeRow>
                );
              })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parentView: {
    marginLeft: 30,
    marginRight: 30,
  },
  section1: {
    backgroundColor: '#01b8c6',
  },

  Icon: {
    fontSize: 20,
    paddingRight: 20,
    fontWeight: 'bold',
    color: '#6d6d6d',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  standalone: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  standaloneRowFront: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    height: 75,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#eeeeee',
    // borderBottomWidth: 2,
    paddingVertical: 10,
    marginBottom: 15,
  },
  standaloneRowBack: {
    // alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // padding: 15,
    borderRadius: 20,
    //   height: SIZES.height / 5,
    overflow: 'hidden',
    marginBottom: 15,
    // paddingVertical : 10,
  },
  backTextWhite1: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 10,
    // paddingHorizontal: 20,
    paddingRight : 20,
    paddingLeft : 10,
  },
  backTextWhite2: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'right',
  },
  input: {
    borderStyle: 'solid',
    borderBottomColor: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#02b9c6',
  },
  centeredViewInConfirmation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalViewInConfirmation: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
  actionButton: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
  },
  OKView: {
    paddingLeft: 30,
  },
  CancelView: {
    paddingRight: 30,
  },
});

const mapStateToProps = (store) => {
  console.log('[inside store -->]', store.user.user.id);
  return {user: store.user.user, medicine: store.medication.medicine};
};

export default connect(mapStateToProps, {
  addMedicineInRedux,
  fetchMedicineINRedux,
  removeMedicineINRedux,
})(Medications);
