const getUnreadCount = (mids, messageData) => {
  if (!mids || !messageData) return 0;
  let unreads = 0;
  mids.forEach((id) => {
    if (!messageData[id].read) {
      unreads++;
    }
  });
  return unreads;
};

export default getUnreadCount;
