import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { getCompanies, addCompany } from '../services/companyService';
import { debounce } from '../utils/debounce';
import CompanyCard from '../components/CompanyCard';
import CompanyForm from '../components/CompanyForm';
import SearchBar from '../components/SearchBar';
import SuggestionsList from '../components/SuggestionsList';
import { globalStyles } from '../styles/globalStyles';

const CompaniesScreen = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [newCompany, setNewCompany] = useState({
    name: '',
    address: '',
    year: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.length > 0) {
        const filtered = companies.filter(company =>
          company.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCompanies(filtered);
        setShowSuggestions(true);
      } else {
        setFilteredCompanies(companies);
        setShowSuggestions(false);
      }
    }, 300),
    [companies]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data);
        setFilteredCompanies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (field, value) => {
    setNewCompany(prev => ({ ...prev, [field]: value }));
  };

  const handleAddCompany = async () => {
    if (!newCompany.name || !newCompany.address || !newCompany.year) {
      setError('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      const addedCompany = await addCompany(newCompany);
      
      setCompanies(prev => [...prev, addedCompany]);
      setFilteredCompanies(prev => [...prev, addedCompany]);

      setNewCompany({ name: '', address: '', year: '' });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    debouncedSearch(text);
  };

  const selectSuggestion = (companyName) => {
    setSearchQuery(companyName);
    setShowSuggestions(false);
  };

  if (loading && companies.length === 0) {
    return (
      <View style={globalStyles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading companies...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.title}>Company Collection</Text>
      
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />
      
      <SuggestionsList
        suggestions={filteredCompanies}
        onSelect={selectSuggestion}
        visible={showSuggestions}
      />

      <CompanyForm
        company={newCompany}
        onChange={handleInputChange}
        onSubmit={handleAddCompany}
        error={error}
        loading={loading}
      />

      <Text style={globalStyles.subtitle}>All Companies</Text>
      {companies.length > 0 ? (
        <FlatList
          data={companies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CompanyCard company={item} />}
          scrollEnabled={false}
        />
      ) : (
        <Text>No companies found.</Text>
      )}
    </ScrollView>
  );
};

export default CompaniesScreen;