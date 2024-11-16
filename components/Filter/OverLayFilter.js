import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Slider, Button } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';

const OverLayFilter = () => {
  const [priceRange, setPriceRange] = useState(0);
  const [rating, setRating] = useState('0-3');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Range Price: {priceRange} tệ</Text>
      <Slider
        value={priceRange}
        onValueChange={setPriceRange}
        maximumValue={10}
        minimumValue={0}
        step={0.5}
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
        minimumTrackTintColor="#2E7D32"
        maximumTrackTintColor="#D3D3D3"
      />
      <Text style={styles.label}>Select Option:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={rating}
          onValueChange={(itemValue) => setRating(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="0-3: Tệ" value="0-3" />
          <Picker.Item label="3-5: Trung bình" value="3-5" />
          <Picker.Item label="5-6: Khá" value="5-6" />
          <Picker.Item label="6-8: Tốt" value="6-8" />
          <Picker.Item label="8-10: Tuyệt vời" value="8-10" />
        </Picker>
      </View>
      <Button
        title="Submit"
        buttonStyle={styles.button}
        onPress={() => alert(`Range Price: ${priceRange}, Rating: ${rating}`)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#2E7D32',
  },
  track: {
    height: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C0C0C0',
    overflow: 'hidden',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#2E7D32',
  },
});

export default OverLayFilter;
