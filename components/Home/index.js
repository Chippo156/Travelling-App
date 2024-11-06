import { ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
function Home() {
  const user = useSelector((state) => state.user);
  console.log(user);
  return <ScrollView>
    <View>
        <View>
            
        </View>
    </View>
  </ScrollView>;
}

export default Home;
