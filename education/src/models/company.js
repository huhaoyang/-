import { routerRedux } from 'dva/router'
import queryString from 'query-string';

export default {
  namespace: 'company',

  state: {
    name: "启明谐鸿",
    member: {
      total: 50,
      disabled: 20
    },
    department: {
      total: 20
    }
  },
  reducers: {
    list(state) {
      return { ...state};
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'list'
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
