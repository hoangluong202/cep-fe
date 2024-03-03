type UserReturnValue = {
  id: string;
  username: string;
};

type UserStore = {
  userStatus: StoreStatus;
  userData: UserReturnValue;
  getUserData: () => Promise<void>;
  logout: () => void;
};
