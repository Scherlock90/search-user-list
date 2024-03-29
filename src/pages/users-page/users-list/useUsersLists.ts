import { useCallback, useEffect, useState } from 'react';

import { ERROR_MESSAGE } from '@api/users-services/constants';
import { ServiceFactory } from '@api/ServiceFactory';

import { TUsersDataList } from 'core/typings/Users';
import { TUseUsersList } from './types';

import { USERS } from './constants';

//Take proper service
const ALL_USERS = ServiceFactory.get(USERS);

export const useUsersList: TUseUsersList = ({ findUserPhrease }) => {
  //useStates
  const [usersList, setUsersList] = useState<{ list: TUsersDataList[] | []; filtredList: TUsersDataList[] | [] }>({
    list: [],
    filtredList: []
  });

  //handlers
  /**
   * @function takeAllUsers
   * @description This function takes all available users from API.
   */
  const takeAllUsers = useCallback(async (): Promise<void> => {
    const response = await ALL_USERS.getUsers();

    if (response === ERROR_MESSAGE) {
      //if response is undefined - means some error occured then return empty arrays
      setUsersList(() => ({ list: [], filtredList: [] }));

      return;
    }

    if (response && response.data) setUsersList({ list: response.data, filtredList: response.data });
  }, []);

  /**
   * @function filterData
   * @description This function filters the data from API, when user typing in search bar. If the searchbar is empty then return previous list.
   */
  const filterData = useCallback((): void | '' | null => {
    if (findUserPhrease) {
      //if user type in searchbar value different than null or ''
      setUsersList((prevState) => ({
        ...prevState,
        filtredList: prevState.list.filter(({ name }) =>
          name.toLowerCase().trim().includes(findUserPhrease.toLowerCase().trim())
        )
      }));

      return;
    }

    //if user remove all letters then restore previous list
    setUsersList((prevState) => ({ ...prevState, filtredList: prevState.list }));
  }, [findUserPhrease]);

  //useEffects
  useEffect(() => {
    usersList.list.length === 0 && (async () => await takeAllUsers())();
    filterData();
  }, [findUserPhrease]);

  return { usersList };
};
