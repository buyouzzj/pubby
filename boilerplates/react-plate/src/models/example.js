import { fetch } from '@alipay/cube-util';
import { QUERY } from '../constants';

// 请求列表
const queryDemo = payload => fetch.get(QUERY.DEMO, { data: payload });

export default {
  namespace: 'Example',
  state: {
    keyword: '暂无参数',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/business') {
          setTimeout(() => {
            dispatch({
              type: 'query',
              keyword: '首次测试',
            });
          }, 2000);
        }
      });
    },
  },
  effects: {
    * query(payload, { put, call }) {
      console.log('start query');
      const data = yield call(queryDemo, payload); // 有需要的话接data，没需要直接yield
      console.log('received data', data);
      yield put({
        type: 'querySuccess',
        payload,
      });
    },
  },
  reducers: {
    querySuccess(state, { payload }) {
      console.log('query success: ', payload);
      return { ...state, keyword: payload.keyword };
    },
  },
};
