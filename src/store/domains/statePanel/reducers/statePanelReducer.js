import * as actionTypes from '../../../actionTypes/ActionTypes';

export default function statePanelReducer(state = {}, action){
    switch (action.type){
        case actionTypes.CHANGE_PROJECTION_TYPE:
            break;

        default:
            return state;
    }
};