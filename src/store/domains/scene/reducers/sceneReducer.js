import * as actionTypes from '../../../actionTypes/ActionTypes';

export default function sceneReducer(state = {}, action){
    switch (action.type){
        case actionTypes.CHANGE_PROJECTION_TYPE:
            break;

        default:
            return state;
    }
};