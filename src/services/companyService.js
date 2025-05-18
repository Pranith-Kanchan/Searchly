import firestore from '@react-native-firebase/firestore';

export const getCompanies = async () => {
  try {
    const snapshot = await firestore().collection('company').get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error getting companies:', error);
    throw error;
  }
};

export const addCompany = async (companyData) => {
  try {
    const docRef = await firestore().collection('company').add({
      ...companyData,
      year: parseInt(companyData.year, 10) || 0
    });
    return { id: docRef.id, ...companyData };
  } catch (error) {
    console.error('Error adding company:', error);
    throw error;
  }
};