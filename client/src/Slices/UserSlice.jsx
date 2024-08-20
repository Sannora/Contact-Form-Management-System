import { createSlice } from '@reduxjs/toolkit';

// localStorage'dan kullanıcı verilerini al
const storedUser = JSON.parse(localStorage.getItem('user'));

// initialState'i tanımla, eğer storedUser varsa onu kullan, yoksa default değerlere dön
const initialState = storedUser
    ? storedUser
    : {
        id: null,
        username: '',
        role: '',
        base64Photo: '',
    };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Reducer'ları burada tanımla
        setUser(state, action) {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.role = action.payload.role;
            state.base64Photo = action.payload.base64Photo;

            // Kullanıcı verilerini localStorage'a kaydet
            localStorage.setItem('user', JSON.stringify(state));
        },
        logout(state) {
            state.id = null;
            state.username = '';
            state.role = '';
            state.base64Photo = '';

            // localStorage'dan kullanıcı verilerini sil
            localStorage.removeItem('user');
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
