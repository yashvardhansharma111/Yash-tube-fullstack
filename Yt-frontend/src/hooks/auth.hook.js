import { useEffect} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {
        setUser,
        clearUser,
        getCurrentUser,
        registerUser,
        loginUser,
        logoutUser,
        changePassword,
        refreshAccessToken,
      } from '../features/authSlice'

import {useMutation , useQueries, useQuery , useQueryClient} from '@tanstack/react-query'

//useMutation - perfrom async operations like login and register and on seccess update the redux store
//useQuery - use to fetch data from server with refreshing
//useQueryClient- This method invalidates a query by its key, causing it to refetch. This is useful after mutations to ensure the data is up-to-date.

const user = useSelector((state) => state.auth.user);

export const useLogin = () => {
const dispatch = useDispatch()
const queryClient = useQueryClient()

return useMutation({
    mutationFn: (credentials) => dispatch(loginUser(credentials)).unwrap(),
    onSuccess: (data) => {
        dispatch(setUser(data));
        queryClient.invalidateQueries('currentUser');
    },
    onError : (error) => {
        console.error("login error" , error);
    },
    retry : 0,
});
};

export const useLogout = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: () => dispatch(logoutUser()).unwrap(),
        onSuccess: () => {
            dispatch(clearUser());
            queryClient.invalidateQueries('currentUser');
        },
        onError : (error) => {
            console.error("login error" , error);
        }
    });
    };

export const useCurrentUser = () => {
const dispatch = useDispatch();
const loading = useSelector((state) => state.auth.loading);
const error = useSelector((state) => state.auth.error);

useEffect(() => {
    if (!user) {
        dispatch(getCurrentUser());
    }
}, [dispatch , user])
return { user, loading, error };
}

export const useRegisterUser = () => {
const dispatch = useDispatch()
const queryClient = useQueryClient()

return useMutation({
    mutationFn: (userData) => dispatch(registerUser(userData)).unwrap(),
    onSuccess: (data) => {
        dispatch(setUser(data));
        queryClient.invalidateQueries('currentUser');
    },
    onError : (error) => {
        console.error("login error" , error);
    },
});
};

export const useChangePassword = () => {
const dispatch = useDispatch()

return useMutation({
    mutationFn: (data) => dispatch(changePassword(data)).unwrap(),
    onError : (error) => {
        console.error("login error" , error);
    },
});
};

export const useRefreshAccessToken = () => {
    const dispatch = useDispatch()
    
    return useMutation({
        mutationFn: () => dispatch(refreshAccessToken()).unwrap(),
        onSuccess: (data) => {
            dispatch(setUser(data));
        },
        onError : (error) => {
            console.error("Token refresh error" , error);
        },
    });
    };

