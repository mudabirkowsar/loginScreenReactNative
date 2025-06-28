import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList, Linking } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
  const API_KEY = "9b5086e7124c4efe8c8faa3066b961ab";
  const url = `https://newsapi.org/v2/everything?q=tesla&from=2025-05-28&sortBy=publishedAt&apiKey=${API_KEY}`;

  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getNewsData = async () => {
    try {
      const res = await axios.get(url);
      setData(res.data.articles);
    } catch (error) {
      console.log("Error fetching news:", error);
    }
  };

  useEffect(() => {
    getNewsData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getNewsData();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <Pressable>
      <View style={styles.newsContainer}>

        <Image
          source={{ uri: item.urlToImage || 'https://reactnative.dev/img/tiny_logo.png' }}
          style={styles.newsImage}
        />
        <Text style={styles.name}>Source: {item.source.name || "Unknown"}</Text>
        <Text style={styles.title} onPress={() => Linking.openURL(item.url)}>
          {item.title}
        </Text>
        <Text style={styles.descr}>{item.description}</Text>
        <View style={styles.authorAndDate}>
          <Text style={styles.name}>{item.author || "Unknown"}</Text>
          <Text style={styles.name}>{item.publishedAt}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  newsContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
    elevation: 1,
  },
  newsImage: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    marginBottom:7
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 10,
  },
  descr: {
    fontSize: 15,
    marginTop: 5,
  },
  authorAndDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  name: {
    color: "#0000006e"
  }
});
