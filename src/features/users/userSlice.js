import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://crud-operation-server-ruby.vercel.app',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: '/register',
        method: 'POST',
        body: user,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...user }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: user,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// ✅ Add this export for hooks including deleteUser
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
