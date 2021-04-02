import {combineReducers} from 'redux'

const INITIAL_STATE = true

const adminReducer = (state=INITIAL_STATE , action) =>{

    switch(action.type){
        	case "CHANGE_ADMIN":
                return !state
            default:
                return state
    }
}

export default allReducers = combineReducers({
    admin: adminReducer
});