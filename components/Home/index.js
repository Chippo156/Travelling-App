import { useSelector, useDispatch } from 'react-redux';
function Home() {
    const user  = useSelector((state) => state.user);
    console.log(user);
    return ( <>Maion</> );
}

export default Home;