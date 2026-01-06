import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const petDatabase = [
  {
    "name": "Tiger",
    "type": "Dog",
    "breed": "Indian Pariah",
    "birthDate": "2019-05-15",
    "gender": "Male",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 20.0, "currentWeightKg": 21.5, "sterilizationStatus": "Neutered" },
    "behavioralProfile": { "energyLevel": "High", "separationAnxietyScore": 2, "trainabilityIndex": 4.0, "socialCompatibility": { "dogs": "Friendly", "cats": "Alert", "children": "Protective" } },
    "environmentalContext": { "dwellingType": "House", "outdoorAccessHours": 5.0, "noiseExposureLevel": "Medium", "climateZone": "Warm" },
    "medicalHistory": { "geneticMarkers": [], "chronicConditions": [], "medications": ["Tick Prevention"] },
    "dietaryPreferences": { "foodType": "Home Cooked (Chicken & Rice)", "caloricIntakeDaily": 1100, "allergies": ["None"] },
    "owner": { "id": 101, "firstName": "Arun", "lastName": "Rao", "city": "Bangalore" }
  },
  {
    "name": "Kitty",
    "type": "Cat",
    "breed": "Persian",
    "birthDate": "2021-08-20",
    "gender": "Female",
    "biometrics": { "bodyConditionScore": 6, "idealWeightKg": 4.0, "currentWeightKg": 4.5, "sterilizationStatus": "Spayed" },
    "behavioralProfile": { "energyLevel": "Low", "separationAnxietyScore": 1, "trainabilityIndex": 2.5, "socialCompatibility": { "dogs": "Fearful", "cats": "Neutral", "children": "Calm" } },
    "environmentalContext": { "dwellingType": "Apartment", "outdoorAccessHours": 0.0, "noiseExposureLevel": "Low", "climateZone": "Moderate" },
    "medicalHistory": { "geneticMarkers": ["PKD Risk"], "chronicConditions": [], "medications": ["Hairball Gel"] },
    "dietaryPreferences": { "foodType": "Wet Food", "caloricIntakeDaily": 250, "allergies": ["Fish"] },
    "owner": { "id": 101, "firstName": "Arun", "lastName": "Rao", "city": "Bangalore" }
  },
  {
    "name": "Bruno",
    "type": "Dog",
    "breed": "Labrador Retriever",
    "birthDate": "2020-01-10",
    "gender": "Male",
    "biometrics": { "bodyConditionScore": 7, "idealWeightKg": 30.0, "currentWeightKg": 34.0, "sterilizationStatus": "Neutered" },
    "behavioralProfile": { "energyLevel": "Medium", "separationAnxietyScore": 4, "trainabilityIndex": 4.8, "socialCompatibility": { "dogs": "Friendly", "cats": "Friendly", "children": "Very Friendly" } },
    "environmentalContext": { "dwellingType": "House", "outdoorAccessHours": 2.0, "noiseExposureLevel": "Medium", "climateZone": "Warm" },
    "medicalHistory": { "geneticMarkers": ["Obesity Prone"], "chronicConditions": ["Mild Arthritis"], "medications": ["Joint Supplement"] },
    "dietaryPreferences": { "foodType": "Diet Dry Food", "caloricIntakeDaily": 900, "allergies": ["Wheat"] },
    "owner": { "id": 101, "firstName": "Arun", "lastName": "Rao", "city": "Bangalore" }
  },
  {
    "name": "Ganga",
    "type": "Cow",
    "breed": "Gir",
    "birthDate": "2016-04-12",
    "gender": "Female",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 400.0, "currentWeightKg": 410.0, "sterilizationStatus": "Not Applicable" },
    "behavioralProfile": { "energyLevel": "Medium", "separationAnxietyScore": 1, "trainabilityIndex": 3.0, "socialCompatibility": { "dogs": "Calm", "cats": "Indifferent", "children": "Gentle" } },
    "environmentalContext": { "dwellingType": "Farm", "outdoorAccessHours": 10.0, "noiseExposureLevel": "Low", "climateZone": "Hot" },
    "medicalHistory": { "geneticMarkers": ["High Milk Yield"], "chronicConditions": [], "medications": ["Calcium Supplement"] },
    "dietaryPreferences": { "foodType": "Green Fodder & Oil Cake", "caloricIntakeDaily": 15000, "allergies": ["None"] },
    "owner": { "id": 102, "firstName": "Sunita", "lastName": "Patil", "city": "Pune" }
  },
  {
    "name": "Yamuna",
    "type": "Cow",
    "breed": "Red Sindhi",
    "birthDate": "2018-09-09",
    "gender": "Female",
    "biometrics": { "bodyConditionScore": 6, "idealWeightKg": 350.0, "currentWeightKg": 365.0, "sterilizationStatus": "Not Applicable" },
    "behavioralProfile": { "energyLevel": "Medium", "separationAnxietyScore": 1, "trainabilityIndex": 2.8 },
    "medicalHistory": { "geneticMarkers": [], "chronicConditions": ["Mastitis History"], "medications": [] },
    "dietaryPreferences": { "foodType": "Dry Fodder", "caloricIntakeDaily": 14000, "allergies": ["None"] },
    "owner": { "id": 102, "firstName": "Sunita", "lastName": "Patil", "city": "Pune" }
  },
  {
    "name": "Raju",
    "type": "Goat",
    "breed": "Osmanabadi",
    "birthDate": "2022-01-15",
    "gender": "Male",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 35.0, "currentWeightKg": 36.5, "sterilizationStatus": "Not Applicable" },
    "behavioralProfile": { "energyLevel": "High", "separationAnxietyScore": 2, "trainabilityIndex": 3.5, "socialCompatibility": { "dogs": "Alert", "cats": "Neutral", "children": "Playful" } },
    "medicalHistory": { "geneticMarkers": [], "chronicConditions": [], "medications": ["Dewormer"] },
    "dietaryPreferences": { "foodType": "Leaves and Grains", "caloricIntakeDaily": 2500, "allergies": ["None"] },
    "owner": { "id": 102, "firstName": "Sunita", "lastName": "Patil", "city": "Pune" }
  },
  {
    "name": "Mithu",
    "type": "Parrot",
    "breed": "Indian Ringneck",
    "birthDate": "2020-03-22",
    "gender": "Male",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 0.12, "currentWeightKg": 0.13, "sterilizationStatus": "Not Applicable" },
    "behavioralProfile": { "energyLevel": "High", "separationAnxietyScore": 4, "trainabilityIndex": 4.5 },
    "medicalHistory": { "geneticMarkers": ["Vocal mimicry"], "chronicConditions": [], "medications": [] },
    "dietaryPreferences": { "foodType": "Seeds & Chilies", "caloricIntakeDaily": 80, "allergies": ["Avocado"] },
    "owner": { "id": 103, "firstName": "Vikram", "lastName": "Malhotra", "city": "Delhi" }
  },
  {
    "name": "Chiku",
    "type": "Rabbit",
    "breed": "Dutch",
    "birthDate": "2022-11-05",
    "gender": "Male",
    "biometrics": { "bodyConditionScore": 4, "idealWeightKg": 2.0, "currentWeightKg": 2.1, "sterilizationStatus": "Neutered" },
    "behavioralProfile": { "energyLevel": "Medium", "separationAnxietyScore": 2, "trainabilityIndex": 3.0 },
    "dietaryPreferences": { "foodType": "Hay & Carrots", "caloricIntakeDaily": 180, "allergies": ["Iceberg Lettuce"] },
    "owner": { "id": 103, "firstName": "Vikram", "lastName": "Malhotra", "city": "Delhi" }
  },
  {
    "name": "Rocky",
    "type": "Dog",
    "breed": "German Shepherd",
    "birthDate": "2019-06-18",
    "gender": "Male",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 35.0, "currentWeightKg": 36.0, "sterilizationStatus": "Neutered" },
    "behavioralProfile": { "energyLevel": "High", "separationAnxietyScore": 3, "trainabilityIndex": 5.0, "socialCompatibility": { "dogs": "Dominant", "cats": "Aggressive", "children": "Protective" } },
    "medicalHistory": { "geneticMarkers": ["Hip Dysplasia Risk"], "chronicConditions": [], "medications": ["Joint Supplement"] },
    "dietaryPreferences": { "foodType": "High Protein Kibble", "caloricIntakeDaily": 1600, "allergies": ["Chicken"] },
    "owner": { "id": 103, "firstName": "Vikram", "lastName": "Malhotra", "city": "Delhi" }
  },
  {
    "name": "Simba",
    "type": "Cat",
    "breed": "Maine Coon",
    "birthDate": "2020-02-14",
    "gender": "Male",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 8.0, "currentWeightKg": 8.2, "sterilizationStatus": "Neutered" },
    "behavioralProfile": { "energyLevel": "Medium", "separationAnxietyScore": 2, "trainabilityIndex": 3.5 },
    "dietaryPreferences": { "foodType": "Raw Meat Diet", "caloricIntakeDaily": 400, "allergies": ["Grains"] },
    "owner": { "id": 103, "firstName": "Vikram", "lastName": "Malhotra", "city": "Delhi" }
  },
  {
    "name": "Luna",
    "type": "Cat",
    "breed": "Siamese",
    "birthDate": "2021-09-09",
    "gender": "Female",
    "biometrics": { "bodyConditionScore": 4, "idealWeightKg": 3.5, "currentWeightKg": 3.2, "sterilizationStatus": "Spayed" },
    "behavioralProfile": { "energyLevel": "High", "separationAnxietyScore": 5, "trainabilityIndex": 4.0 },
    "medicalHistory": { "geneticMarkers": [], "chronicConditions": ["Asthma"], "medications": ["Inhaler"] },
    "dietaryPreferences": { "foodType": "Wet Food", "caloricIntakeDaily": 220, "allergies": ["Dairy"] },
    "owner": { "id": 104, "firstName": "Meera", "lastName": "Nair", "city": "Kochi" }
  },
  {
    "name": "Bella",
    "type": "Cat",
    "breed": "Ragdoll",
    "birthDate": "2019-12-01",
    "gender": "Female",
    "biometrics": { "bodyConditionScore": 6, "idealWeightKg": 5.0, "currentWeightKg": 5.8, "sterilizationStatus": "Spayed" },
    "behavioralProfile": { "energyLevel": "Low", "separationAnxietyScore": 1, "trainabilityIndex": 2.0 },
    "medicalHistory": { "chronicConditions": [], "medications": ["Weight Management Supplement"] },
    "dietaryPreferences": { "foodType": "Diet Wet Food", "caloricIntakeDaily": 200, "allergies": ["None"] },
    "owner": { "id": 104, "firstName": "Meera", "lastName": "Nair", "city": "Kochi" }
  },
  {
    "name": "Nandini",
    "type": "Cow",
    "breed": "Tharparkar",
    "birthDate": "2017-06-15",
    "gender": "Female",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 400.0, "currentWeightKg": 420.0, "sterilizationStatus": "Not Applicable" },
    "medicalHistory": { "geneticMarkers": ["Heat Resistant"], "chronicConditions": [], "medications": [] },
    "dietaryPreferences": { "foodType": "Dry Fodder & Grains", "caloricIntakeDaily": 13000, "allergies": ["None"] },
    "owner": { "id": 105, "firstName": "Rajesh", "lastName": "Gupta", "city": "Jaipur" }
  },
  {
    "name": "Sheru",
    "type": "Goat",
    "breed": "Jamunapari",
    "birthDate": "2021-04-20",
    "gender": "Male",
    "biometrics": { "bodyConditionScore": 6, "idealWeightKg": 60.0, "currentWeightKg": 65.0, "sterilizationStatus": "Not Applicable" },
    "behavioralProfile": { "energyLevel": "High", "separationAnxietyScore": 1, "trainabilityIndex": 3.0 },
    "dietaryPreferences": { "foodType": "Leaves & Shrubs", "caloricIntakeDaily": 2800, "allergies": ["None"] },
    "owner": { "id": 105, "firstName": "Rajesh", "lastName": "Gupta", "city": "Jaipur" }
  },
  {
    "name": "Babli",
    "type": "Goat",
    "breed": "Barbari",
    "birthDate": "2022-08-10",
    "gender": "Female",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 25.0, "currentWeightKg": 26.0, "sterilizationStatus": "Not Applicable" },
    "medicalHistory": { "medications": ["Vitamin Syrup"] },
    "dietaryPreferences": { "foodType": "Green Grass", "caloricIntakeDaily": 1500, "allergies": ["None"] },
    "owner": { "id": 105, "firstName": "Rajesh", "lastName": "Gupta", "city": "Jaipur" }
  },
  {
    "name": "Radha",
    "type": "Cow",
    "breed": "Kankrej",
    "birthDate": "2019-01-25",
    "gender": "Female",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 450.0, "currentWeightKg": 445.0, "sterilizationStatus": "Not Applicable" },
    "medicalHistory": { "geneticMarkers": ["Draft Power"], "chronicConditions": [], "medications": [] },
    "dietaryPreferences": { "foodType": "Hay & Cottonseed Cake", "caloricIntakeDaily": 14500, "allergies": ["None"] },
    "owner": { "id": 105, "firstName": "Rajesh", "lastName": "Gupta", "city": "Jaipur" }
  },
  {
    "name": "Charlie",
    "type": "Dog",
    "breed": "Golden Retriever",
    "birthDate": "2021-03-30",
    "gender": "Male",
    "biometrics": { "bodyConditionScore": 6, "idealWeightKg": 32.0, "currentWeightKg": 33.5, "sterilizationStatus": "Neutered" },
    "behavioralProfile": { "energyLevel": "High", "separationAnxietyScore": 4, "trainabilityIndex": 4.5 },
    "medicalHistory": { "chronicConditions": ["Skin Allergy"], "medications": ["Antihistamines"] },
    "dietaryPreferences": { "foodType": "Hypoallergenic Kibble", "caloricIntakeDaily": 1400, "allergies": ["Chicken", "Beef"] },
    "owner": { "id": 106, "firstName": "Sana", "lastName": "Khan", "city": "Mumbai" }
  },
  {
    "name": "Snowy",
    "type": "Rabbit",
    "breed": "Angora",
    "birthDate": "2023-02-14",
    "gender": "Female",
    "biometrics": { "bodyConditionScore": 4, "idealWeightKg": 3.0, "currentWeightKg": 2.8, "sterilizationStatus": "Spayed" },
    "medicalHistory": { "medications": ["Hairball Paste"] },
    "dietaryPreferences": { "foodType": "Timothy Hay", "caloricIntakeDaily": 200, "allergies": ["Kale"] },
    "owner": { "id": 106, "firstName": "Sana", "lastName": "Khan", "city": "Mumbai" }
  },
  {
    "name": "Rio",
    "type": "Parrot",
    "breed": "Macaw",
    "birthDate": "2018-07-07",
    "gender": "Male",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 1.0, "currentWeightKg": 1.1, "sterilizationStatus": "Not Applicable" },
    "behavioralProfile": { "energyLevel": "High", "separationAnxietyScore": 5, "trainabilityIndex": 5.0 },
    "medicalHistory": { "geneticMarkers": ["Loud Caller"] },
    "dietaryPreferences": { "foodType": "Nuts & Fruits", "caloricIntakeDaily": 250, "allergies": ["Chocolate"] },
    "owner": { "id": 106, "firstName": "Sana", "lastName": "Khan", "city": "Mumbai" }
  },
  {
    "name": "Max",
    "type": "Dog",
    "breed": "Rottweiler",
    "birthDate": "2019-11-22",
    "gender": "Male",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 50.0, "currentWeightKg": 52.0, "sterilizationStatus": "Neutered" },
    "behavioralProfile": { "energyLevel": "Medium", "separationAnxietyScore": 2, "trainabilityIndex": 4.5, "socialCompatibility": { "dogs": "Dominant", "cats": "Aggressive", "children": "Protective" } },
    "dietaryPreferences": { "foodType": "Raw Meat", "caloricIntakeDaily": 2200, "allergies": ["Grains"] },
    "owner": { "id": 107, "firstName": "Amitabh", "lastName": "Singh", "city": "Allahabad" }
  },
  {
    "name": "Cooper",
    "type": "Dog",
    "breed": "Beagle",
    "birthDate": "2021-06-12",
    "gender": "Male",
    "biometrics": { "bodyConditionScore": 7, "idealWeightKg": 10.0, "currentWeightKg": 13.0, "sterilizationStatus": "Neutered" },
    "behavioralProfile": { "energyLevel": "High", "separationAnxietyScore": 4, "trainabilityIndex": 3.0 },
    "medicalHistory": { "geneticMarkers": ["Obesity Prone"] },
    "dietaryPreferences": { "foodType": "Diet Kibble", "caloricIntakeDaily": 800, "allergies": ["Soy"] },
    "owner": { "id": 107, "firstName": "Amitabh", "lastName": "Singh", "city": "Allahabad" }
  },
  {
    "name": "Ruby",
    "type": "Dog",
    "breed": "Doberman",
    "birthDate": "2020-05-05",
    "gender": "Female",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 32.0, "currentWeightKg": 31.0, "sterilizationStatus": "Spayed" },
    "behavioralProfile": { "energyLevel": "High", "separationAnxietyScore": 3, "trainabilityIndex": 5.0 },
    "medicalHistory": { "geneticMarkers": ["Cardiac Risk"], "medications": ["Heart Supplements"] },
    "dietaryPreferences": { "foodType": "Premium Kibble", "caloricIntakeDaily": 1500, "allergies": ["None"] },
    "owner": { "id": 107, "firstName": "Amitabh", "lastName": "Singh", "city": "Allahabad" }
  },
  {
    "name": "Daisy",
    "type": "Dog",
    "breed": "Pomeranian",
    "birthDate": "2022-09-01",
    "gender": "Female",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 2.5, "currentWeightKg": 2.6, "sterilizationStatus": "Spayed" },
    "behavioralProfile": { "energyLevel": "High", "separationAnxietyScore": 5, "trainabilityIndex": 3.0 },
    "dietaryPreferences": { "foodType": "Small Breed Kibble", "caloricIntakeDaily": 300, "allergies": ["None"] },
    "owner": { "id": 107, "firstName": "Amitabh", "lastName": "Singh", "city": "Allahabad" }
  },
  {
    "name": "Oreo",
    "type": "Cat",
    "breed": "British Shorthair",
    "birthDate": "2019-10-10",
    "gender": "Male",
    "biometrics": { "bodyConditionScore": 7, "idealWeightKg": 5.0, "currentWeightKg": 6.5, "sterilizationStatus": "Neutered" },
    "behavioralProfile": { "energyLevel": "Low", "separationAnxietyScore": 1, "trainabilityIndex": 2.5 },
    "medicalHistory": { "chronicConditions": ["Obesity"], "medications": ["Diet Supplements"] },
    "dietaryPreferences": { "foodType": "Metabolic Diet", "caloricIntakeDaily": 230, "allergies": ["Tuna"] },
    "owner": { "id": 108, "firstName": "Divya", "lastName": "Desai", "city": "Kolkata" }
  },
  {
    "name": "Bunny",
    "type": "Rabbit",
    "breed": "Lionhead",
    "birthDate": "2022-04-04",
    "gender": "Female",
    "biometrics": { "bodyConditionScore": 4, "idealWeightKg": 1.5, "currentWeightKg": 1.6, "sterilizationStatus": "Spayed" },
    "dietaryPreferences": { "foodType": "Pellets & Greens", "caloricIntakeDaily": 150, "allergies": ["None"] },
    "owner": { "id": 108, "firstName": "Divya", "lastName": "Desai", "city": "Kolkata" }
  },
  {
    "name": "Kiwi",
    "type": "Parrot",
    "breed": "Lovebird",
    "birthDate": "2023-01-20",
    "gender": "Male",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 0.05, "currentWeightKg": 0.05, "sterilizationStatus": "Not Applicable" },
    "dietaryPreferences": { "foodType": "Millet & Fruit", "caloricIntakeDaily": 40, "allergies": ["Apple Seeds"] },
    "owner": { "id": 108, "firstName": "Divya", "lastName": "Desai", "city": "Kolkata" }
  },
  {
    "name": "Kamadhenu",
    "type": "Cow",
    "breed": "Ongole",
    "birthDate": "2015-12-12",
    "gender": "Female",
    "biometrics": { "bodyConditionScore": 6, "idealWeightKg": 500.0, "currentWeightKg": 520.0, "sterilizationStatus": "Not Applicable" },
    "medicalHistory": { "geneticMarkers": ["Disease Resistance"] },
    "dietaryPreferences": { "foodType": "Grazing & Hay", "caloricIntakeDaily": 16000, "allergies": ["None"] },
    "owner": { "id": 109, "firstName": "Karthik", "lastName": "Iyer", "city": "Coimbatore" }
  },
  {
    "name": "Bhoomi",
    "type": "Cow",
    "breed": "Jersey Cross",
    "birthDate": "2018-05-30",
    "gender": "Female",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 400.0, "currentWeightKg": 390.0, "sterilizationStatus": "Not Applicable" },
    "medicalHistory": { "geneticMarkers": ["High Milk Fat"], "medications": ["Mineral Mix"] },
    "dietaryPreferences": { "foodType": "Concentrate Feed", "caloricIntakeDaily": 15000, "allergies": ["None"] },
    "owner": { "id": 109, "firstName": "Karthik", "lastName": "Iyer", "city": "Coimbatore" }
  },
  {
    "name": "Moti",
    "type": "Goat",
    "breed": "Black Bengal",
    "birthDate": "2021-11-11",
    "gender": "Male",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 25.0, "currentWeightKg": 24.0, "sterilizationStatus": "Not Applicable" },
    "behavioralProfile": { "energyLevel": "High", "trainabilityIndex": 3.2 },
    "medicalHistory": { "geneticMarkers": ["Prolific Breeder"] },
    "dietaryPreferences": { "foodType": "Jackfruit Leaves", "caloricIntakeDaily": 1800, "allergies": ["None"] },
    "owner": { "id": 109, "firstName": "Karthik", "lastName": "Iyer", "city": "Coimbatore" }
  },
  {
    "name": "Coco",
    "type": "Dog",
    "breed": "Shih Tzu",
    "birthDate": "2020-08-08",
    "gender": "Female",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 6.0, "currentWeightKg": 6.2, "sterilizationStatus": "Spayed" },
    "behavioralProfile": { "energyLevel": "Medium", "separationAnxietyScore": 5, "trainabilityIndex": 3.5 },
    "medicalHistory": { "medications": ["Eye Drops"] },
    "dietaryPreferences": { "foodType": "Wet Food", "caloricIntakeDaily": 450, "allergies": ["Poultry"] },
    "owner": { "id": 110, "firstName": "Neha", "lastName": "Kapoor", "city": "Lucknow" }
  },
  {
    "name": "Ginger",
    "type": "Cat",
    "breed": "Indian Billi (Mau)",
    "birthDate": "2021-02-14",
    "gender": "Female",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 4.0, "currentWeightKg": 3.8, "sterilizationStatus": "Spayed" },
    "behavioralProfile": { "energyLevel": "High", "separationAnxietyScore": 1, "trainabilityIndex": 3.0 },
    "medicalHistory": { "geneticMarkers": ["Resilient"] },
    "dietaryPreferences": { "foodType": "Fish and Rice", "caloricIntakeDaily": 280, "allergies": ["None"] },
    "owner": { "id": 110, "firstName": "Neha", "lastName": "Kapoor", "city": "Lucknow" }
  },
  {
    "name": "Polly",
    "type": "Parrot",
    "breed": "Cockatiel",
    "birthDate": "2022-06-20",
    "gender": "Female",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 0.09, "currentWeightKg": 0.09, "sterilizationStatus": "Not Applicable" },
    "dietaryPreferences": { "foodType": "Seed Mix", "caloricIntakeDaily": 50, "allergies": ["None"] },
    "owner": { "id": 110, "firstName": "Neha", "lastName": "Kapoor", "city": "Lucknow" }
  },
  {
    "name": "Fluffy",
    "type": "Rabbit",
    "breed": "Rex",
    "birthDate": "2023-05-15",
    "gender": "Male",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 3.5, "currentWeightKg": 3.4, "sterilizationStatus": "Neutered" },
    "behavioralProfile": { "energyLevel": "High", "trainabilityIndex": 2.8 },
    "medicalHistory": { "geneticMarkers": ["Soft Fur"] },
    "dietaryPreferences": { "foodType": "Hay", "caloricIntakeDaily": 210, "allergies": ["Spinach"] },
    "owner": { "id": 110, "firstName": "Neha", "lastName": "Kapoor", "city": "Lucknow" }
  },
  {
    "name": "Sultan",
    "type": "Dog",
    "breed": "Great Dane",
    "birthDate": "2019-01-01",
    "gender": "Male",
    "biometrics": { "bodyConditionScore": 5, "idealWeightKg": 70.0, "currentWeightKg": 72.0, "sterilizationStatus": "Neutered" },
    "behavioralProfile": { "energyLevel": "Low", "separationAnxietyScore": 3, "trainabilityIndex": 3.8, "socialCompatibility": { "children": "Gentle Giant" } },
    "medicalHistory": { "geneticMarkers": ["Bloat Risk"], "medications": ["Joint Support"] },
    "dietaryPreferences": { "foodType": "Large Breed Kibble", "caloricIntakeDaily": 3500, "allergies": ["None"] },
    "owner": { "id": 111, "firstName": "Rahul", "lastName": "Verma", "city": "Chandigarh" }
  },
  {
    "name": "Shera",
    "type": "Dog",
    "breed": "German Shepherd",
    "birthDate": "2020-07-20",
    "gender": "Male",
    "biometrics": { "bodyConditionScore": 6, "idealWeightKg": 38.0, "currentWeightKg": 40.0, "sterilizationStatus": "Neutered" },
    "behavioralProfile": { "energyLevel": "High", "separationAnxietyScore": 3, "trainabilityIndex": 5.0, "socialCompatibility": { "dogs": "Dominant", "cats": "Aggressive", "children": "Protective" } },
    "dietaryPreferences": { "foodType": "High Energy Food", "caloricIntakeDaily": 1800, "allergies": ["None"] },
    "owner": { "id": 111, "firstName": "Rahul", "lastName": "Verma", "city": "Chandigarh" }
  }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
    
    if (!OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY is not configured');
      throw new Error('OPENROUTER_API_KEY is not configured');
    }

    const systemPrompt = `You are a helpful, knowledgeable pet care assistant with access to a comprehensive database of pets and their owners. You can answer questions about specific pets, their health, diet, behavior, and provide personalized care recommendations.

Here is the pet database you have access to:
${JSON.stringify(petDatabase, null, 2)}

When users ask about pets:
- Reference specific pet data when relevant
- Provide personalized recommendations based on the pet's breed, age, health conditions, and behavioral profile
- You can look up pets by name, type, breed, owner name, or city
- Calculate ages from birth dates (current date is January 2026)
- Provide health insights based on body condition scores and medical history
- Suggest dietary adjustments based on allergies and current weight vs ideal weight
- Give behavioral advice based on energy levels and social compatibility scores

Be friendly, professional, and thorough in your responses. If asked about a pet not in the database, let the user know and offer general advice instead.`;

    console.log('Sending request to OpenRouter with messages:', JSON.stringify(messages));

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://lovable.dev',
        'X-Title': 'Pet Care Assistant',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      return new Response(JSON.stringify({ error: 'AI service error. Please try again.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('OpenRouter response received, streaming...');

    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });
  } catch (error) {
    console.error('Chat function error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
