import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/actions";

const Header: React.FC = () => {
  const [isLogged, setIsLogged] = React.useState(useSelector((state: any) => state?.token ? true : false))
  const dispatch = useDispatch();
  const router = useRouter();
  // if isLogged is false, redirect to "/" using router
  React.useEffect(() => {
    if (!isLogged) {
      router.push("/");
    }
  }, [isLogged]);

  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;


  const handleLogout = async () => {
    dispatch(login(null));
    setIsLogged(false);
  }

  let left = (
    <div className="left">
      <Link href="/home">
        <a className="bold" data-active={isActive("/home")}>
          Posts App
        </a>
      </Link>
    </div>
  );

  let right = (
    <div className="right">
      {isLogged ? (
        <button onClick={handleLogout} className="btn btn-primary">Sign out</button>
      ) : (
        <Link href="/login">
          <a className="nav-link" data-active={isActive("/login")}>
            Login
          </a>
        </Link>
      )}
    </div>
  );

  return (
    <nav>
      {left}
      {right}
    </nav>
  );
};

export default Header;