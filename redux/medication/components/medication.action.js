import BetterMeal, {addmedications,fetchmedication,removeMedicine} from '../../../api/better-meal';

import {
    ADD_MEDICATION
} from '../../action.list';

export const addMedicineInRedux = (userId,medicineText) => async (dispatch) => {
    // const {userId, medicineText} = val;
    console.log('[inside add medicine in Redux]',userId, medicineText)
    BetterMeal.post(addmedications , {id : userId ,medication:[medicineText]})
    .then(async(response)=>{
        console.log('[response in addMedicine]',response.data.value.medication )
        await dispatch({
            type: ADD_MEDICATION,
            payload: {medicine : response.data.value.medication},
          });
    })
    .catch((err)=>{
        console.log('[err in addMedicine]',err)
    })
}

export const fetchMedicineINRedux = (val) => async (dispatch) => {
    console.log('[inside fetch medicine in Redux]',val)
    BetterMeal.post(fetchmedication , {id : val})
    .then(async(response)=>{
        console.log('[response in fetchMedicine]',response.data.medication)
        await dispatch({
            type: ADD_MEDICATION,
            payload: {medicine : response.data.medication},
          });
    })
    .catch((err)=>{
        console.log('[err in fetch Medicine]',err)
    })
}


export const removeMedicineINRedux = (userId,medicineText) => async (dispatch) => {
    console.log('[inside remove medicine in Redux]',userId, medicineText)
    BetterMeal.post(removeMedicine , {id : userId ,medication:medicineText})
    .then(async(response)=>{
        console.log('[response in removeMedicine]',response.data.value.medication )
        await dispatch({
            type: ADD_MEDICATION,
            payload: {medicine : response.data.value.medication},
          });
    })
    .catch((err)=>{
        console.log('[err in remove Medicine]',err)
    })
}