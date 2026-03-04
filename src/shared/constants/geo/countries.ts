export type City = {
    id: string
    label: string
}

export type Country = {
    id: string
    label: string
    countryCode: string
    cities: City[]
}

export const countries: Country[] = [
    // ===== СНГ =====
    {
        id: 'ru',
        label: 'Russia',
        countryCode: 'RU',
        cities: [
            { id: 'moscow', label: 'Moscow' },
            { id: 'saint-petersburg', label: 'Saint Petersburg' },
            { id: 'kazan', label: 'Kazan' }
        ]
    },
    {
        id: 'ua',
        label: 'Ukraine',
        countryCode: 'UA',
        cities: [
            { id: 'kyiv', label: 'Kyiv' },
            { id: 'lviv', label: 'Lviv' },
            { id: 'odessa', label: 'Odesa' }
        ]
    },
    {
        id: 'kz',
        label: 'Kazakhstan',
        countryCode: 'KZ',
        cities: [
            { id: 'almaty', label: 'Almaty' },
            { id: 'astana', label: 'Astana' },
            { id: 'shymkent', label: 'Shymkent' }
        ]
    },
    {
        id: 'by',
        label: 'Belarus',
        countryCode: 'BY',
        cities: [
            { id: 'minsk', label: 'Minsk' },
            { id: 'gomel', label: 'Gomel' }
        ]
    },

    // ===== Европа =====
    {
        id: 'de',
        label: 'Germany',
        countryCode: 'DE',
        cities: [
            { id: 'berlin', label: 'Berlin' },
            { id: 'munich', label: 'Munich' },
            { id: 'hamburg', label: 'Hamburg' }
        ]
    },
    {
        id: 'fr',
        label: 'France',
        countryCode: 'FR',
        cities: [
            { id: 'paris', label: 'Paris' },
            { id: 'lyon', label: 'Lyon' },
            { id: 'marseille', label: 'Marseille' }
        ]
    },
    {
        id: 'it',
        label: 'Italy',
        countryCode: 'IT',
        cities: [
            { id: 'rome', label: 'Rome' },
            { id: 'milan', label: 'Milan' },
            { id: 'florence', label: 'Florence' }
        ]
    },
    {
        id: 'es',
        label: 'Spain',
        countryCode: 'ES',
        cities: [
            { id: 'madrid', label: 'Madrid' },
            { id: 'barcelona', label: 'Barcelona' },
            { id: 'valencia', label: 'Valencia' }
        ]
    },
    {
        id: 'pl',
        label: 'Poland',
        countryCode: 'PL',
        cities: [
            { id: 'warsaw', label: 'Warsaw' },
            { id: 'krakow', label: 'Krakow' },
            { id: 'gdansk', label: 'Gdansk' }
        ]
    },

    // ===== Северная Америка =====
    {
        id: 'us',
        label: 'United States',
        countryCode: 'US',
        cities: [
            { id: 'new-york', label: 'New York' },
            { id: 'los-angeles', label: 'Los Angeles' },
            { id: 'chicago', label: 'Chicago' }
        ]
    },
    {
        id: 'ca',
        label: 'Canada',
        countryCode: 'CA',
        cities: [
            { id: 'toronto', label: 'Toronto' },
            { id: 'vancouver', label: 'Vancouver' },
            { id: 'montreal', label: 'Montreal' }
        ]
    },
    {
        id: 'mx',
        label: 'Mexico',
        countryCode: 'MX',
        cities: [
            { id: 'mexico-city', label: 'Mexico City' },
            { id: 'guadalajara', label: 'Guadalajara' },
            { id: 'monterrey', label: 'Monterrey' }
        ]
    }
]