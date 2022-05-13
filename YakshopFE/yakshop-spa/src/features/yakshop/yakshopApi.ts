export interface HerdData {
    id: number;
    yaks: Array<{
        id: number;
        name: string;
        age: number;
        sex: string;
        ageLastShaved: number;
        herdId: number;
    }>;
}

export {};