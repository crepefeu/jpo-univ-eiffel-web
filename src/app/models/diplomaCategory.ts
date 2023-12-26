export interface DiplomaCategory {
    id: number;
    name: string;
    diplomas: {
        id: number;
        name: string;
        category: [{
            id: number;
            name: string;
        }] | null;
    };
}