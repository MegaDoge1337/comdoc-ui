import Menu from '../components/common/Menu';
import { Outlet } from 'react-router-dom';

function DefaultLayout() {
    return (
        <div>  
            <header>
                <Menu/>
            </header>  
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default DefaultLayout