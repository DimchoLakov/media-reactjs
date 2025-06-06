import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// Development only!!!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration); // ✅ correctly resolves after delay
    });
};

const albumsApi = createApi({
    reducerPath: "albums",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3016",
        // fetchFn: async (...args) => {
        //     // For Development only!!!
        //     await pause(1000);
        //     return fetch(...args);
        // }
    }),
    endpoints(builder) {
        return {
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: "Album", id: album.id }];

                    // return [{ type: "Album", id: album.userId }];
                    // Fine-grained approach in order to fetch data only for given ids
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: "DELETE"
                    }
                }
            }),
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{ type: "UsersAlbums", id: user.id }];

                    // return [{ type: "Album", id: user.id }];
                    // Fine-grained approach in order to fetch data only for given ids
                },
                query: (user) => {
                    return {
                        url: "/albums",
                        method: "POST",
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
                        }
                    }
                }
            }),
            fetchAlbums: builder.query({
                providesTags: (result, error, user) => {
                    const tags = result.map(album => {
                        return { type: "Album", id: album.id }
                    })

                    tags.push({ type: "UsersAlbums", id: user.id });

                    return tags;
                    // return [{ type: "Album", id: user.id }];
                    // Fine-grained approach in order to fetch data only for given ids
                },
                query: (user) => {
                    return {
                        url: "/albums",
                        params: {
                            userId: user.id
                        },
                        method: "GET"
                    }
                }
            })
        }
    }
});

export const {
    useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation
} = albumsApi; // names are automatically generated
export { albumsApi };