import { Expose } from 'class-transformer';

export class movieListDTO {
    @Expose()
    readonly Title!: string;
    @Expose()
    readonly imdbID!: string;
};

export class movieDTO {
    @Expose()
    readonly Title!: string;
    @Expose()
    readonly imdbID!: string;
    @Expose()
    readonly Plot!: string;
    @Expose()
    readonly imdbRating!: string;
    @Expose()
    readonly Poster!: string;
    @Expose()
    readonly Actors!: string;
};
