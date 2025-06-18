import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { useEffect, useState } from 'react';
import api from '../../services/api';

// Custom data provider that wraps the JSON server provider but uses our API
const createDataProvider = () => {
  // Base JSON server provider - we'll customize this to work with our API
  const baseProvider = jsonServerProvider('/api');
  
  // Custom data provider that maps React-Admin requests to our API
  return {
    // Get a list of resources
    getList: async (resource, params) => {
      try {
        let data;
        switch (resource) {
          case 'collections':
            data = await api.getCollections();
            break;
          case 'designs':
            data = await api.getDesigns();
            break;
          case 'tags':
            data = await api.getTags();
            break;
          default:
            return baseProvider.getList(resource, params);
        }
        
        return {
          data,
          total: data.length,
        };
      } catch (error) {
        console.error(`Error fetching ${resource}:`, error);
        throw error;
      }
    },
    
    // Get a single resource
    getOne: async (resource, params) => {
      try {
        let data;
        switch (resource) {
          case 'collections':
            data = await api.getCollection(params.id);
            break;
          case 'designs':
            data = await api.getDesign(params.id);
            break;
          default:
            return baseProvider.getOne(resource, params);
        }
        
        return { data };
      } catch (error) {
        console.error(`Error fetching ${resource}:`, error);
        throw error;
      }
    },
    
    // Create a resource
    create: async (resource, params) => {
      try {
        let data;
        switch (resource) {
          case 'collections':
            data = await api.createCollection(params.data);
            break;
          case 'designs':
            data = await api.createDesign(params.data);
            break;
          default:
            return baseProvider.create(resource, params);
        }
        
        return { data };
      } catch (error) {
        console.error(`Error creating ${resource}:`, error);
        throw error;
      }
    },
    
    // Update a resource
    update: async (resource, params) => {
      try {
        let data;
        switch (resource) {
          case 'collections':
            data = await api.updateCollection(params.id, params.data);
            break;
          case 'designs':
            data = await api.updateDesign(params.id, params.data);
            break;
          default:
            return baseProvider.update(resource, params);
        }
        
        return { data };
      } catch (error) {
        console.error(`Error updating ${resource}:`, error);
        throw error;
      }
    },
    
    // Delete a resource
    delete: async (resource, params) => {
      try {
        let data;
        switch (resource) {
          case 'collections':
            await api.deleteCollection(params.id);
            data = { id: params.id };
            break;
          case 'designs':
            await api.deleteDesign(params.id);
            data = { id: params.id };
            break;
          default:
            return baseProvider.delete(resource, params);
        }
        
        return { data };
      } catch (error) {
        console.error(`Error deleting ${resource}:`, error);
        throw error;
      }
    },
    
    // Other methods from ra-data-json-server
    deleteMany: baseProvider.deleteMany,
    getMany: baseProvider.getMany,
    getManyReference: baseProvider.getManyReference,
    updateMany: baseProvider.updateMany,
  };
};

export default function ReactAdminProvider({ children }) {
  const [dataProvider, setDataProvider] = useState(null);
  
  useEffect(() => {
    // Initialize the data provider
    setDataProvider(createDataProvider());
  }, []);
  
  if (!dataProvider) return <div>Loading Admin...</div>;
  
  return (
    <Admin dataProvider={dataProvider} disableTelemetry>
      {children}
    </Admin>
  );
}