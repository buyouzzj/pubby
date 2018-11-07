export default {
  namespace: 'User',
  state: {
    username: 'shangshu-user',
    routeTime: 0,
  },
  reducers: {
    changeTime(state, { timeStr }) {
      return { ...state, routeTime: timeStr };
    },
  },
};
