// store.js
import { createStore } from 'redux';

// 초기 상태
const initialState = {
    loginState: '비회원',
};

// 리듀서
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGIN_STATE':
            return {
                ...state,
                loginState: action.payload,
            };
        case 'SET_SEARCH_VALUE': // 상품검색을 위한 값
            return {
                ...state,
                searchValue: action.payload,
            };
        default:
            return state;
    }
};

// 스토어 생성
const store = createStore(reducer);

export default store;
