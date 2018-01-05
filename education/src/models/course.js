import { routerRedux } from 'dva/router'
import queryString from 'query-string';
import { query,del,state } from 'services/course'

export default {
  namespace: 'course',

  state: {
    data:{
      "page": 1,
      "size": 6
    },
    selected: [],
    btnGroup: {
      delete : true,
      active : true,
      inactive : true,
    }
  },
  reducers: {
    list(state, { payload: data }) {
      return { ...state, data};
    },
    updateBtnGroup(state, { payload: btnGroup }) {
      return { ...state, btnGroup};
    },
    selected(state, { payload: selected }) {
      return {...state,selected};
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const data = yield call(query, payload);
      yield put({
        type: 'list',
        payload: data.data,
      });
    },
    *delete({ payload }, { call, put }) {
      const data = yield call(del, payload);
      yield put({
        type: 'fetch',
        payload: {page:1,size:6},
      });
    },
    *updateState({ payload }, { call, put }) {
      const data = yield call(state, payload);
      yield put({
        type: 'fetch',
        payload: {page:1,size:6},
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/application/course') {
          dispatch({ type: 'fetch', payload: {page:1,size:6} });
        }
      });
    },
  },

}
