import { Text, View } from "react-native";
import {
  getDestinationById,
  getRoomById,
} from "../controller/DetailsController";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

export default function Deserve({ route, navigation }) {
  const destinationId = route.params.desId;
  const roomId = route.params.roomId;

  const [destination, setDestination] = useState({});
  const fetchDestination = async () => {
    try {
      let res = await getDestinationById(destinationId);
      setDestination(res);
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const [room, setRoom] = useState({});
  const fetchRoom = async () => {
    try {
      let res = await getRoomById(roomId);
      setRoom(res);
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  useEffect(() => {
    fetchDestination();
  }, []);

  return (
    <View>
      <Text>{destination.name}</Text>
      <Text>{destination.location}</Text>
      <Text>{destination.description}</Text>
    </View>
  );
}
