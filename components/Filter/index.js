import { useEffect } from "react";
import { getFilterDestination } from "../controller/filterController";

function FilterPage({route, navigation}) {
    const { city } = route.params;
    const handleGetFilterDestination = async (city) => {
        console.log(city);
        let res = await getFilterDestination(city);
        console.log(res);
        if (res && res.code === 200) {
        }
    }

    useEffect(() => {
        handleGetFilterDestination(city)
    }, []);
    return ( <>Filter</> );
}

export default FilterPage;