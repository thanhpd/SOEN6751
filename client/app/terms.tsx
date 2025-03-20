import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Colors } from '@/constants/Colors';

const termsData = [
  { id: '1', title: 'Introduction', content: 'These Terms and Conditions govern your use of our services. By accessing or using our platform, you agree to these terms.' },
  { id: '2', title: 'User Responsibilities', content: 'Users must provide accurate information, respect copyright laws, and adhere to community guidelines.' },
  { id: '3', title: 'Privacy Policy', content: 'We value your privacy and commit to protecting your personal data. Please refer to our Privacy Policy for more details.' },
  { id: '4', title: 'Payment & Refunds', content: 'All payments are secure and processed via trusted gateways. Refund requests must be submitted within 7 days of purchase.' },
  { id: '5', title: 'Termination of Service', content: 'We reserve the right to suspend or terminate accounts that violate our terms or engage in fraudulent activities.' },
];

export default function TermsPage() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const renderTerm = ({ item }: { item: { id: string; title: string; content: string } }) => (
    <Card style={styles.card}>
      <TouchableOpacity style={styles.cardHeader} onPress={() => toggleExpand(item.id)}>
        <Text style={styles.titleText}>{item.title}</Text>
        <FontAwesome6 name={expanded === item.id ? 'minus' : 'plus'} size={18} color="white" />
      </TouchableOpacity>
      {expanded === item.id && <Text style={styles.contentText}>{item.content}</Text>}
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>Terms & Services</Text>

      
      

      {/* Terms List */}
      <FlatList
        data={termsData}
        renderItem={renderTerm}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: Colors.light.concordiaColor,
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "white",
    flexShrink: 1,
  },
  contentText: {
    marginTop: 10,
    fontSize: 13,
    color: 'white',
  },
});
