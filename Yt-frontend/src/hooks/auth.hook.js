import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  refreshAccessToken,
  setUser,
  clearUser
} from '../features/authSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useLogin = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials) => dispatch(loginUser(credentials)).unwrap(),
    onSuccess: (data) => {
      dispatch(setUser(data));
      queryClient.invalidateQueries('currentUser');
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
    retry: 0,
  });
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => dispatch(logoutUser()).unwrap(),
    onSuccess: () => {
      dispatch(clearUser());
      queryClient.invalidateQueries('currentUser');
    },
    onError: (error) => {
      console.error('Logout error:', error);
    },
  });
};

export const useCurrentUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user]);

  return { user, loading, error };
};

export const useRegisterUser = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData) => dispatch(registerUser(userData)).unwrap(),
    onSuccess: (data) => {
      dispatch(setUser(data));
      queryClient.invalidateQueries('currentUser');
    },
    onError: (error) => {
      console.error('Registration error:', error);
    },
  });
};

export const useChangePassword = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data) => dispatch(changePassword(data)).unwrap(),
    onError: (error) => {
      console.error('Change password error:', error);
    },
  });
};

export const useRefreshAccessToken = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: () => dispatch(refreshAccessToken()).unwrap(),
    onSuccess: (data) => {
      dispatch(setUser(data));
    },
    onError: (error) => {
      console.error('Token refresh error:', error);
    },
  });
};
