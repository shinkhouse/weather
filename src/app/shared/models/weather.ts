export interface Weather {
    latitude: number;
    longitude: number;
    timezone: string;
    currently: object;
    minutely: object;
    hourly: object;
    daily: object;
    flags: object;
    offest: number;
}
