import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// Development only!!!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration); // ✅ correctly resolves after delay
    });
};

const photosApi = createApi({
    reducerPath: "photos",
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
            removePhoto: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: "Album", id: album.id }];

                    // return [{ type: "Album", id: album.userId }];
                    // Fine-grained approach in order to fetch data only for given ids
                },
                query: (photo) => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: "DELETE"
                    }
                }
            }),
            addPhoto: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{ type: "UsersAlbums", id: user.id }];

                    // return [{ type: "Album", id: user.id }];
                    // Fine-grained approach in order to fetch data only for given ids
                },
                query: (album) => {
                    return {
                        url: "/photos",
                        method: "POST",
                        body: {
                            albumId: album.id,
                            url: faker.image.abstract(150, 150, true)
                        }
                    }
                }
            }),
            fetchPhotos: builder.query({
                providesTags: (result, error, user) => {
                    const tags = result.map(album => {
                        return { type: "Album", id: album.id }
                    })

                    tags.push({ type: "UsersAlbums", id: user.id });

                    return tags;
                    // return [{ type: "Album", id: user.id }];
                    // Fine-grained approach in order to fetch data only for given ids
                },
                query: (album) => {
                    return {
                        url: "/photos",
                        params: {
                            albumId: album.id
                        },
                        method: "GET"
                    }
                }
            })
        }
    }
});

export const {
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation
} = photosApi; // names are automatically generated

export { photosApi };