import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import SearchBar from '@/components/SearchBar';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

// Sample FAQ Data
const faqs = [
  { id: '1', question: 'How do I book an appointment?', answer: 'You can book an appointment through our app or website by selecting your preferred time slot.' },
  { id: '2', question: 'What payment methods do you accept?', answer: 'We accept credit/debit cards, PayPal, and bank transfers.' },
  { id: '3', question: 'Can I reschedule my appointment?', answer: 'Yes, you can reschedule your appointment up to 24 hours before the scheduled time.' },
  { id: '4', question: 'Is there a cancellation fee?', answer: 'There is no cancellation fee if you cancel at least 24 hours before your appointment.' },
];

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null); // Track which question is expanded

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id); // Toggle expand/collapse
  };

  const renderFAQ = ({ item }: { item: { id: string; question: string; answer: string } }) => (
    <Card style={styles.card}>
      <TouchableOpacity style={styles.cardHeader} onPress={() => toggleExpand(item.id)}>
        <Text style={styles.questionText}>{item.question}</Text>
        <FontAwesome6 name={expanded === item.id ? 'minus' : 'plus'} size={16} color={Colors.light.concordiaColor} />
      </TouchableOpacity>
      {expanded === item.id && <Text style={styles.answerText}>{item.answer}</Text>}
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>How can we help you?</Text>

      {/* Search Bar */}
      <SearchBar />

      {/* Top Questions Section */}
      <Text style={styles.subHeaderText}>Top Questions</Text>

      {/* FAQ List */}
      <FlatList
        data={faqs}
        renderItem={renderFAQ}
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
  subHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#444',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
   borderColor: 'black',
   borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1, // Prevents text from overflowing
  },
  answerText: {
    marginTop: 10,
    fontSize: 12,
    color: '#555',
  },
});

