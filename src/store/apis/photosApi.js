import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// Development only!!!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
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
    tagTypes: ["AlbumPhotos"],
    endpoints(builder) {
        return {
            removePhoto: builder.mutation({
                invalidatesTags: (result, error, photo) => {
                    return [{ type: "AlbumPhotos", id: photo.albumId }];
                },
                query: (photo) => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: "DELETE"
                    };
                }
            }),
            addPhoto: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: "AlbumPhotos", id: album.id }];
                },
                query: (album) => {
                    return {
                        url: "/photos",
                        method: "POST",
                        body: {
                            albumId: album.id,
                            url: faker.image.abstract(150, 150, true)
                        }
                    };
                }
            }),
            fetchPhotos: builder.query({
                providesTags: (result, error, album) => {
                    return [{ type: "AlbumPhotos", id: album.id }];
                },
                query: (album) => {
                    return {
                        url: "/photos",
                        params: {
                            albumId: album.id
                        },
                        method: "GET"
                    };
                }
            })
        };
    }
});

// names are automatically generated based on the endpoint function name and the type (query or mutation).
export const {
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation
} = photosApi;

export { photosApi };
