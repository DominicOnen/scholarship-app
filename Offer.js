import React from 'react';
import { Text, View, StyleSheet, Pressable, ScrollView } from 'react-native';

export default function Offer({ navigation }) {
  // 1. Data array for scholarship items
   
  const scholarships = [
   
    { id: 1, name: 'INES-Ruhengeri',
     field: 'Software Engineering',
     benefit: '100% Tuition Cover',
     timeline: 'Closes: October 31, 2026, Intake: Sept 2026',  
     eligibility: 'Minimum Grade: 2 Principal Passes in STEM subjects',
    campusLogistics: "Learning Mode: On-Campus, Location: Musanze, Rwanda, Duration: 4-Year Bachelor's",
     remainingSlots: ' 🔥 Only 5 Slots Left! ',
     },


    { id: 2, name: 'CMU Africa', 
    field: 'Information Technology', 
    benefit: 'Full Ride + Stipend',
    timeline: "Closes: December 15, 2026, Intake: Jan 2027",
    eligibility: "Minimum Grade: Bachelor’s Degree with GPA 3.5+ or equivalent",
    campusLogistics: "Learning Mode: On-Campus, Location: Kigali, Rwanda, Duration: 2-Year Master's",
    remainingSlots: "⚠️ Limited Quota – 3 Slots Left ",
    
     },


    { id: 3, name: 'University of Rwanda',
      field: 'Data Science',
      benefit: '50% Tuition Waive',
      timeline: 'Closes: November 10, 2026, Intake: Feb 2027',
      eligibility: 'Minimum Grade: Grade B or higher in Mathematics/Statistics',
      campusLogistics: "Learning Mode: Hybrid (Online & On-Campus), Location: Kigali, Rwanda, Duration: 3-Year Bachelor's",
      remainingSlots: "⏳ 12 Slots Left"
    
     },


    { id: 4, name: 'Ashesi University', 
    field: 'Computer Science',  
    benefit: 'Full Housing & Tuition',
    timeline: 'Closes: October 28, 2026, Intake: Sept 2026',
    eligibility: 'Minimum Grade: High School Diploma with Top 10% Class Rank',
    campusLogistics: "Learning Mode: On-Campus, Location: Berekuso, Ghana, Duration: 4-Year Bachelor's",
    remainingSlots: "🔥 High Competition – 2 Slots Left"
    
     },
    { id: 5, name: 'African Leadership University',
     field: 'Engineering', 
     benefit: '80% Gran',
     timeline: 'Closes: November 30, 2026, Intake: Jan 2027',
      Eligibility: 'Minimum Grade: Leadership portfolio entry + High School Transcript',
      campusLogistics: "Learning Mode: Hybrid, Location: Kigali, Rwanda, Duration: 3-Year Bachelor's",
      remainingSlots: "✨ 8 Slots Left"


    
    },
    { id: 6, name: 'Üsküdar University', 
    field: 'Software Engineering & Neuroscience', 
    benefit: '2500 USD Cover',
    timeline: 'Closes: January 15, 2027, Intake: Spring Semester 2026-2027',
    eligibility: 'Minimum Grade: International Diploma / Pass Merit Criteria',
    campusLogistics: "Learning Mode: On-Campus, Location: Istanbul, Turkey, Duration: 4-Year Bachelor's",
    remainingSlots: "⏳ 4 Slots Left"

    
    
     },
     
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Browse Scholarship Offers</Text>

        {scholarships.map((item) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => navigation.navigate('Details', { scholarship: item })}
          >
            <Text style={styles.institution}>{item.name}</Text>
            <Text style={styles.field}>Field: {item.field}</Text>
          </Pressable>
        ))}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android Shadow
    elevation: 3,
  },
  cardPressed: {
    backgroundColor: '#e6f0ff',
    opacity: 0.9,
  },
  institution: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  field: {
    fontSize: 14,
    color: '#555555',
    marginTop: 4,
  },
});