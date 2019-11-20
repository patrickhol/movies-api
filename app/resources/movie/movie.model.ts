import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    }
  },
  { collection: 'movieDetails' }
);

export const Movie = mongoose.model('movie', movieSchema);
