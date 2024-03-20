import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { dgApiSlice } from "../dgApiSlice";

const notesAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1),
});

const initialState = notesAdapter.getInitialState();

export const dgV2NotesApiSlice = dgApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/v2/note",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedNotes = responseData.data.map((note) => {
          note.id = note._id;
          return note;
        });
        return notesAdapter.setAll(initialState, loadedNotes);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [{ type: "Note", id: "LIST" }, ...result.ids.map((id) => ({ type: "Note", id }))];
        } else [{ type: "Note", id: "LIST" }];
      },
    }),
    postNote: builder.mutation({
      query: (initialNoteData) => ({ note: "/v2/note", method: "POST", body: { ...initialNoteData } }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),
    updateNote: builder.mutation({
      query: (initialNoteData) => ({ url: "/v2/note", method: "PATCH", body: { ...initialNoteData } }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({ url: "/v2/note", method: "DELETE", body: { id } }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
  }),
});

export const { useGetNotesQuery, usePostNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } = dgV2NotesApiSlice;

export const selectNotesResult = dgV2NotesApiSlice.endpoints.getNotes.select();

const selectNotesData = createSelector(selectNotesResult, (notesResult) => notesResult.data);

export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds,
} = notesAdapter.getSelectors((state) => selectNotesData(state) ?? initialState);
