import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    review: {},
    reviews: [],
  }

    const reviewSlice = createSlice({
        name: "review",
    initialState,
    reducers: {
        setReview: (state, action) => {
        state.review = action.payload
        },
        setReviews: (state, action) => {
        state.reviews = action.payload
        },
    }
    })
  const { reducer: reviewReducer, actions } = reviewSlice

export const { setReview, setReviews } = actions
export default reviewReducer