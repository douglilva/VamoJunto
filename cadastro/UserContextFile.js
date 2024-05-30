import React, { createContext, useEffect, useReducer, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext({});

const initialState = { usuarios: [] };

const actions = {
    deleteAll(state, action) {
        deleteUsuarios();
        return {
            ...state,
            usuarios: []
        };
    },
    deleteUsuario(state, action) {
        const usuario = action.payload;
        const updatedUsuarios = state.usuarios.filter(u => u.id !== usuario.id);
        saveUsuarios(updatedUsuarios);
        return {
            ...state,
            usuarios: updatedUsuarios
        };
    },
    createUsuario(state, action) {
        const usuario = action.payload;
        usuario.id = Math.random();
        const updatedUsuarios = [usuario, ...state.usuarios];
        saveUsuarios(updatedUsuarios);
        return {
            ...state,
            usuarios: updatedUsuarios
        };
    },
    updateUsuario(state, action) {
        const updated = action.payload;
        const updatedUsuarios = state.usuarios.map(u => u.id === updated.id ? updated : u);
        saveUsuarios(updatedUsuarios);
        return {
            ...state,
            usuarios: updatedUsuarios
        };
    },
    loadUsuarios(state, action) {
        const loadedUsuarios = action.payload.usuarios;
        return {
            ...state,
            usuarios: loadedUsuarios
        };
    }
};

function reducer(state, action) {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
}

export const UserProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function fetchData() {
            const loadedUsuarios = await loadUsuarios();
            if (loadedUsuarios.usuarios && loadedUsuarios.usuarios.length !== 0) {
                dispatch({ type: 'loadUsuarios', payload: loadedUsuarios });
            }
        }
        fetchData();
    }, []);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {props.children}
        </UserContext.Provider>
    );
};

export const getUserById = (state, userId) => {
    return state.usuarios.find(user => user.id === userId);
};

export const useUserContext = () => useContext(UserContext);

async function saveUsuarios(usuarios) {
    try {
        await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
    } catch (error) {
        console.error('Erro ao salvar os usuários no AsyncStorage: ', error);
    }
}

async function loadUsuarios() {
    try {
        const usuarios = await AsyncStorage.getItem('usuarios');
        return { usuarios: usuarios ? JSON.parse(usuarios) : [] };
    } catch (error) {
        console.error('Erro ao carregar os usuários do AsyncStorage', error);
        return { usuarios: [] };
    }
}

async function deleteUsuarios() {
    try {
        await AsyncStorage.removeItem('usuarios');
        console.log('Usuários removidos com sucesso');
    } catch (error) {
        console.error('Erro ao remover os usuários do AsyncStorage', error);
    }
}

export default UserContext;
