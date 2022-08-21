export interface IContextData {
  user: {
    username: string;
  };
  logged: boolean;
}

export interface IDefaultState {
  contextData: IContextData;
  handleContextData: (data: IContextData) => void;
}
