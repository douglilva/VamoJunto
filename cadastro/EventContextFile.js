import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import randomTrips from "./Events";

const TripsContext = createContext({});

const initialState = { trips: [] };

const actions = {

    deleteAll(state, action) {
        deleteTrips();
        return {
            ...state,
            trips: []
        };
    },
    deleteTrip(state, action) {
        const trip = action.payload;
        const updatedTrips = state.trips.filter(t => t.id !== trip.id);
        saveTrips(updatedTrips);
        return {
            ...state,
            trips: updatedTrips
        };
    },
    createTrip(state, action) {
        const trip = action.payload;
        trip.id = Math.random();
        trip.parar=false
        trip.passengers=[];
        trip.avaliadores=[];
        trip.driverID;
        const updatedTrips = [trip, ...state.trips];
        saveTrips(updatedTrips);
        return {
            ...state,
            trips: updatedTrips
        };
    },
    updateTrip(state, action) {
        const updated = action.payload;
        const updatedTrips = state.trips.map(t => t.id === updated.id ? updated : t);
        saveTrips(updatedTrips);
        console.warn(updated)
        return {
            ...state,
            trips: updatedTrips
        };
    },
    loadTrips(state, action) {
        const loadedTrips = action.payload.trips;
        return {
            ...state,
            trips: loadedTrips
        };
    },
    generateRandom(state, action) {
        const loadedTrips = action.payload;
        return {
            ...state,
            trips: loadedTrips,
        }
    },
    addPassenger(state, action) {
        const { tripId, motoristaId } = action.payload;
    
        const updatedTrips = state.trips.map(trip =>
            trip.id === tripId
                ? {
                    ...trip,
                    passengers: [...(trip.passengers || []), motoristaId],
                    availableSeats: trip.availableSeats - 1
                  }
                : trip
                
        );
    
        saveTrips(updatedTrips);
    
        return {
            ...state,
            trips: updatedTrips
        };
    },

    endTrip(state, action) {
        const tripId = action.payload;
        const updatedTrips = state.trips.map(trip =>
            trip.id === tripId
                ? {
                    ...trip,
                   parar:true
                }
                : trip
        );
        saveTrips(updatedTrips);
        return {
            ...state,
            trips: updatedTrips
        };
    },

    removePassenger(state, action) {
        const { tripId, motoristaId } = action.payload;
        const updatedTrips = state.trips.map(trip =>
            trip.id === tripId
                ? {
                    ...trip,
                    availableSeats: trip.availableSeats + 1,
                    passengers: trip.passengers.filter(id => id !== motoristaId)
                }
                : trip
        );
        saveTrips(updatedTrips);
        return {
            ...state,
            trips: updatedTrips
        };
    },
};

export const TripsProvider = (props) => {
    useEffect(() => {
        async function fetchData() {
            const loadedTrips = await loadTrips();
            if (loadedTrips.trips && loadedTrips.trips.length !== 0) {
                dispatch({ type: 'loadTrips', payload: loadedTrips });
            } else {
                dispatch({ type: 'generateRandom', payload: randomTrips });
            }
        }
        fetchData();
    }, []);

    function reducer(state, action) {
        const fn = actions[action.type];
        return fn ? fn(state, action) : state;
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <TripsContext.Provider value={{ state, dispatch }}>
            {props.children}
        </TripsContext.Provider>
    );
};

async function saveTrips(trips) {
    try {
        await AsyncStorage.setItem('trips', JSON.stringify(trips));
    } catch (error) {
        console.error('Erro ao salvar as viagens no AsyncStorage: ', error);
    }
}

async function loadTrips() {
    try {
        const trips = await AsyncStorage.getItem('trips');
        return { trips: trips ? JSON.parse(trips) : [] };
    } catch (error) {
        console.error('Erro ao carregar as viagens do AsyncStorage', error);
        return { trips: [] };
    }
}

async function deleteTrips() {
    try {
        await AsyncStorage.removeItem('trips');
        console.log('Viagens removidas com sucesso');
    } catch (error) {
        console.error('Erro ao remover as viagens do AsyncStorage', error);
    }
}

export default TripsContext;
