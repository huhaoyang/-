import { routerRedux } from 'dva/router'
import queryString from 'query-string';
import { query } from 'services/message'

export default {
  namespace: 'message',

  state: {
    status: 1,
    text: "显示全部",
    data:[]
  },
  reducers: {
    save(state, { payload: data }) {
      return { ...state, data};
    },
    changeState(state, { payload: {status,text}}) {
      return {...state,status,text};
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(query, payload);
      yield put({
        type: 'save',
        payload: data,
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname === '/front') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },

}
