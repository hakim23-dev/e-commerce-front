import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

export default function PortectedRoutes() {
    const isUser=useSelector(state=>state.user.user);
  return (
    isUser ? <Outlet/>:<Navigate to="/" replace/>
  )
}
