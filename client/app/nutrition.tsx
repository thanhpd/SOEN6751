import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
 import HeroBanner from '@/components/HeroBanner';
import SearchBar from '@/components/SearchBar';
import { InPersonActivityList } from '@/components/ui/InPersonActivityList';
import { Colors } from '@/constants/Colors';
import { Button } from 'react-native-paper';

const { width } = Dimensions.get('window');

export default function OnlinePage() {
  return (
    <View style={styles.container}>
     <HeroBanner title="Nutrition Consultancy Spring 2025"
        description="Keep track of your macros."
        date="From April 10 to June 30"
        image={require('../assets/images/nutrition.jpg')}
/>

<Text style = {styles.cardText}>Dietitian Jessy Cheung</Text>

<View style = {styles.card}>
    <View style = {styles.cardTextContainer}>
        
    <Text style ={styles.cardText}>Assess where you are in your nutrition journey
         and discover how we can work together to build
          sustainable habits that help you reach your goals.</Text>
        <Text style ={styles.cardText}>Tuesdays and Thursdays - 4-7 p.m.</Text>
        <Text style ={styles.cardText}>Saturdays - 9-11 a.m.</Text>
        <Text style ={styles.cardText}>Each Session $90</Text>
        <View style = {styles.button}> 
            <Text style ={styles.cardText2}>Register Now</Text>
        </View>



    </View>

<View style = {styles.imageSection}>
<Image style ={styles.image} source={require('../assets/images/jessy.png')}></Image>
</View>
</View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#f5f5f5',
    
  },
  card: {
    flexDirection: 'row',
    marginLeft : 20,
    
    
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width : width -40,
    
    
  },
  cardText: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
    justifyContent:'space-between'
  },

  cardText2: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    justifyContent:'space-between'
  },
  image: {
    width: 120,
    height: 150,
    
  },

  cardTextContainer :{

    flexDirection : 'column',
    
    alignItems: 'flex-start',
    flex :1,
  },

  button: {

borderRadius : 20,
backgroundColor : Colors.light.concordiaColor,
alignItems:'center',
justifyContent :'center',
padding: 10,
width:100,

marginBottom : 0,
  },

  imageSection :{

    flexDirection :'column',
    
  }
});
