import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import DraggableList, { Positions } from '../DraggableList';

const data = [
  {
    name: 'Parrot',
    uri: 'https://www.randomlists.com/img/animals/parakeet.webp',
  },
  {
    name: 'Argali',
    uri: 'https://www.randomlists.com/img/animals/argali.webp',
  },
  {
    name: 'GrizzlyBear',
    uri: 'https://www.randomlists.com/img/animals/grizzly_bear.webp',
  },
  {
    name: 'Hare',
    uri: 'https://www.randomlists.com/img/animals/hare.webp',
  },
  {
    name: 'Wolf',
    uri: 'https://www.randomlists.com/img/animals/wolf.webp',
  },
  {
    name: 'Giraffe',
    uri: 'https://www.randomlists.com/img/animals/giraffe.webp',
  },
  {
    name: 'Weasel',
    uri: 'https://www.randomlists.com/img/animals/weasel.webp',
  },
  {
    name: 'Porcupine',
    uri: 'https://www.randomlists.com/img/animals/porcupine.webp',
  },
  {
    name: 'PolarBear',
    uri: 'https://www.randomlists.com/img/animals/polar_bear.webp',
  },
  {
    name: 'Porpoise',
    uri: 'https://www.randomlists.com/img/animals/porpoise.webp',
  },
  {
    name: 'Hyena',
    uri: 'https://www.randomlists.com/img/animals/hyena.webp',
  },
  {
    name: 'Lion',
    uri: 'https://www.randomlists.com/img/animals/lion.webp',
  },
  {
    name: 'MuskDeer',
    uri: 'https://www.randomlists.com/img/animals/musk_deer.webp',
  },
  {
    name: 'Bunny',
    uri: 'https://www.randomlists.com/img/animals/bunny.webp',
  },
  {
    name: 'Dormouse',
    uri: 'https://www.randomlists.com/img/animals/dormouse.webp',
  },
  {
    name: 'Walrus',
    uri: 'https://www.randomlists.com/img/animals/walrus.webp',
  },
  {
    name: 'Toad',
    uri: 'https://www.randomlists.com/img/animals/toad.webp',
  },
  {
    name: 'Wombat',
    uri: 'https://www.randomlists.com/img/animals/wombat.webp',
  },
  {
    name: 'Gorilla',
    uri: 'https://www.randomlists.com/img/animals/gorilla.webp',
  },
  {
    name: 'Seal',
    uri: 'https://www.randomlists.com/img/animals/seal.webp',
  },
];

interface RowItemProps {
  id: string | number;
  name: string;
  uri: string;
}

const RowItem: React.FC<RowItemProps> = ({ name, uri }) => {
  return (
    <View style={styles.rowContainer}>
      <Image
        style={styles.animalImage}
        source={{
          uri,
        }}
      />
      <Text style={styles.animalName}>{name}</Text>
    </View>
  );
};

const ExampleList: React.FC = () => {
  const onDragEnd = (positions: Positions) => {
    console.log(`updated Positions, ${JSON.stringify(positions)}`);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.introText}>Touch and hold to begin sorting</Text>

      <DraggableList onDragEnd={onDragEnd}>
        {data.map(({ name, uri }) => {
          return <RowItem id={name} key={name} name={name} uri={uri} />;
        })}
      </DraggableList>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
  },
  introText: {
    color: 'black',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  rowContainer: {
    width: 200,
    height: 140,
  },
  animalImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  animalName: {
    fontSize: 16,
  },
  test: {
    height: 100,
    width: 100,
    backgroundColor: 'grey',
  },
});

export default ExampleList;
