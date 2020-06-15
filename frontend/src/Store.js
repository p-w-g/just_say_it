// this SetState call when log in, save name
// this state read when pushing post

export const useStore = (() => {

  let storeInstance;

  const createStoreInstance = () => {

    let store = 'MyGlobalStore'

    // function to save stuff??
    const getstore = () => {
      return store;
    }

    const setstore = (newStore) => {
      store = newStore;
      return store;
    }


    return [getstore, setstore]
  }

  return () => {

    if (!storeInstance) storeInstance = createStoreInstance()


    return storeInstance

  }
})()