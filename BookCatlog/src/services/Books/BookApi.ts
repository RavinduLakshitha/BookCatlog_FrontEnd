import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Api_Base_URL } from "../../config.ts";

export interface BookDto {
    id: number
    name: string;
    description: string;
    author: string;
    quantity: number;
    price: number;
}

const baseQueryWithRetry = fetchBaseQuery({
  baseUrl: Api_Base_URL,
  prepareHeaders: (headers) => { 
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const BookApi = createApi({
  reducerPath: "BookApi",
  baseQuery: baseQueryWithRetry,
    tagTypes: ["Books"],
    endpoints: (builder) => ({

        getAllBooks: builder.query<BookDto[], void>({
            query: () => "Books",
            providesTags: ["Books"],
        }),


        getBookById: builder.query<BookDto, number>({
            query: (id) => `Books/${id}`,
            providesTags: ["Books"],
        }),

        createBook: builder.mutation<number, Omit<BookDto, "id">>({
            query: (book) => ({
                url: "Books",
                method: "POST",
                body: book,
            }),
            invalidatesTags: ["Books"],
        }),

        updateBook: builder.mutation<void, { id: number; book: Omit<BookDto, "id"> }>({
            query: ({ id, book }) => ({
                url: `Books/${id}`,
                method: "PUT",
                body: book,
            }),
            invalidatesTags: ["Books"],
        }),

        deleteBook: builder.mutation<void, number>({
            query: (id) => ({
                url: `Books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Books"],
        }),
    }),
});

export const {
    useGetAllBooksQuery,
    useGetBookByIdQuery,
    useCreateBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = BookApi;