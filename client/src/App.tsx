import { FC, useContext, useEffect, useState } from "react";
import LoginForm  from "./components/LoginForm";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";


const App: FC = () => {
  const {store} = useContext(Context);
  const [ users, setUsers ] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [])

  async function getUsers() {
    try {
      const res = await UserService.fetchUsers();
      setUsers(res.data)
    } catch(e) {
      console.log(e)
    }
  }

  if (!store.isAuth) {
    return (
      <div>
        <LoginForm />
        <div>
          <button onClick={getUsers}>
            Получить пользователей
          </button>
        </div>
      </div>
      
    )
  }

  return (
    <div className="App">
      <h1>
        {store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'Не авторизован'}
      </h1>
      <button onClick={() => store.logout()}> выйти </button>
      <div>
        <button onClick={getUsers}>
          Получить пользователей
        </button>
      </div>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
}

export default observer(App);
