import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  status: "idle",
  error: null,
};

export const getMovies = createAsyncThunk("movies/getMovies", async () => {
  try {
    const response = await fetch(
      "https://api.collectapi.com/watching/moviesComing",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "apikey 32EpzXFk2vaCqX68cl5zqH:5gbldJXVsLR8scK3sUEJnS",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Veriler alınamadı.");
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    throw new Error("Veriler alınamadı.");
  }
});
export const getMoviesByName = createAsyncThunk(
  "movies/getMoviesByName",
  async (name) => {
    try {
      const response = await fetch(
        "https://api.collectapi.com/watching/moviesComing",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "apikey 5hIKIRIQKEwwlRJdwitoxp:1TaUxf2qBe9T3nfPj1wNEr",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Veriler alınamadı.");
      }
      const data = await response.json();
      console.log(data);

      for (let index = 0; index < data.result.length; index++) {
        //tüm movielerla karşılaştırmak için
        const element = data.result[index];

        if (element.name == name) {
          return element;
        }
      }

      return null; // hata durumunda 0 elemanı dön
    } catch (error) {
      throw new Error("Veriler alınamadı.");
    }
  }
);

const moviesComingSlice = createSlice({
  name: "movieComing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default moviesComingSlice.reducer;
