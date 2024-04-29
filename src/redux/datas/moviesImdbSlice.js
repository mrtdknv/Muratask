import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  status: "idle",
  error: null,
};

export const getMovies = createAsyncThunk("movies/getMovies", async () => {
  try {
    const response = await fetch(
      "https://api.collectapi.com/watching/moviesImdb",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "apikey 6UdRoL7rf85pUcid9WXcKa:3Ztx8t6BdQNbyBwMuoBHpU",
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
        "https://api.collectapi.com/watching/moviesImdb",
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

const moviesImdbSlice = createSlice({
  name: "moviesImdb",
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
export default moviesImdbSlice.reducer;
