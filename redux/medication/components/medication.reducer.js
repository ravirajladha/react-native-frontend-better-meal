import {
    ADD_MEDICATION
  } from '../../action.list';

  let defaultState = {
    medicine : [],
    };

    export default medication = (state = defaultState, action) => {
    const {type, payload} = action;
        switch (type) {
          case ADD_MEDICATION:
            return {...state, ...payload};
             default:
            return state;
        }
      };

