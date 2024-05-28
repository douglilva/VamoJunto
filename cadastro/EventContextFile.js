import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import randomevents from "./Events"

const EventsContext = createContext({});

const initialState = { events: [] };

const actions = {

    deleteAll(state, action) {
        deleteEvents();
        return {
            ...state,
            events: []
        };
    },
    deleteEvent(state, action) {
        const event = action.payload;
        const updatedEvents = state.events.filter(e => e.id !== event.id);
        saveEvents(updatedEvents);
        return {
            ...state,
            events: updatedEvents
        };
    },
    createEvent(state, action) {
        const event = action.payload;
        event.id = Math.random();
        event.reservations = []; 
        const updatedEvents = [event, ...state.events];
        saveEvents(updatedEvents);
        return {
            ...state,
            events: updatedEvents
        };
    },
    updateEvent(state, action) {
        const updated = action.payload;
        const updatedEvents = state.events.map(e => e.id === updated.id ? updated : e);
        saveEvents(updatedEvents);
        return {
            ...state,
            events: updatedEvents
        };
    },
    loadEvents(state, action) {
        const loadedEvents = action.payload.events;
        return {
            ...state,
            events: loadedEvents
        };
    },
    gerarRandom(state, action) {
        const loadedEvents = action.payload;
        return{
            ...state,
            events: loadedEvents,
        }
    },

    addReservation(state, action) {
        const { eventId, reservation } = action.payload;
    
        const updatedEvents = state.events.map(event =>
            event.id === eventId
                ? {
                    ...event,
                    reservations: [...(event.reservations || []), reservation],
                    tickets: event.tickets - reservation.numberOfTickets 
                  }
                : event
        );
    
        saveEvents(updatedEvents);
    
        return {
            ...state,
            events: updatedEvents
        };
    },

    removeReservation(state, action) {
        const { eventId, reservationId } = action.payload;
        const updatedEvents = state.events.map(event =>
            event.id === eventId
                ? {
                    ...event,
                    tickets: event.tickets + state.events.find(event => event.id === eventId).reservations.find(reservation => reservation.id === reservationId).numberOfTickets,
                    reservations: event.reservations.filter(reservation => reservation.id !== reservationId)
                }
                : event
        );
        saveEvents(updatedEvents);
        return {
            ...state,
            events: updatedEvents
        };
    },

    updateReservation(state, action) {
        const { eventId, updatedReservation } = action.payload;
    
        const updatedEvents = state.events.map(event => {
            if (event.id === eventId) {
                const originalReservation = event.reservations.find(reservation => reservation.id === updatedReservation.id);

                const difference = updatedReservation.numberOfTickets - originalReservation.numberOfTickets;
    
                if (difference > 0) {
                    return {
                        ...event,
                        reservations: event.reservations.map(reservation =>
                            reservation.id === updatedReservation.id ? updatedReservation : reservation
                        ),
                        tickets: event.tickets - difference 
                    };
                } else if (difference < 0) { 
                    return {
                        ...event,
                        reservations: event.reservations.map(reservation =>
                            reservation.id === updatedReservation.id ? updatedReservation : reservation
                        ),
                        tickets: event.tickets - difference 
                    };
                }
            }
            return event;
        });
    
        saveEvents(updatedEvents);
    
        return {
            ...state,
            events: updatedEvents
        };
    },
    
    toggleFavorite(state, action) {
        const eventId = action.payload;
        const updatedEvents = state.events.map(event =>
            event.id === eventId
                ? { ...event, favorite: !event.favorite }
                : event
        );
        saveEvents(updatedEvents);
        return {
            ...state,
            events: updatedEvents
        };
    },
    
    
};

export const EventsProvider = (props) => {
    useEffect(() => {
      async function fetchData() {
        const loadedEvents = await loadEvents();
        if (loadedEvents.events && loadedEvents.events.length !== 0) {
          dispatch({ type: 'loadEvents', payload: loadedEvents });
        } else {
          dispatch({ type: 'gerarRandom', payload: randomevents });
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
      <EventsContext.Provider value={{ state, dispatch }}>
        {props.children}
      </EventsContext.Provider>
    );
  };
  

async function saveEvents(events) {
    try {
        await AsyncStorage.setItem('events', JSON.stringify(events));
    } catch (error) {
        console.error('Erro ao salvar os eventos no AsyncStorage: ', error);
    }
}

async function loadEvents() {
    try {
        const events = await AsyncStorage.getItem('events');
        return { events: events ? JSON.parse(events) : [] };
    } catch (error) {
        console.error('Erro ao carregar os eventos do AsyncStorage', error);
        return { events: [] };
    }
}

async function deleteEvents() {
    try {
        await AsyncStorage.removeItem('events');
        console.log('Eventos removidos com sucesso');
    } catch (error) {
        console.error('Erro ao remover os eventos do AsyncStorage', error);
    }
}

export default EventsContext;
