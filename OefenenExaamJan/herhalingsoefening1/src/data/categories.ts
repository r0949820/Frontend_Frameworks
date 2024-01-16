import {faker} from '@faker-js/faker'
import ICategory from '../models/ICategory.ts'

const categoriesData: ICategory[] = [
    {
        name: 'Schermdiagonaal',
        id: faker.string.uuid(),
        options: [
            {
                name: '10 inch',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: '11 inch',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: '12 inch',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: '13 inch',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: '14 inch',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: '15 inch',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: true,
            },
            {
                name: '16 inch',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: '17 inch',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
        ],
    },
    {
        name: 'Processor',
        id: faker.string.uuid(),
        options: [
            {
                name: 'AMD Ryzen 3',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'AMD Ryzen 5',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'AMD Ryzen 7',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'AMD Ryzen 9',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'Intel Celeron',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'Intel Core i3',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'Intel Core i5',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: true,
            },
            {
                name: 'Intel Core i7',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'Intel Core i9',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
        ],
    },
    {
        name: 'Merk',
        id: faker.string.uuid(),
        options: [
            {
                name: 'Acer',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'Apple',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'Asus',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'HP',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'Lenovo',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'MSI',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'Microsoft',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
        ],
    },
    {
        name: 'Werkgeheugen',
        id: faker.string.uuid(),
        options: [
            {
                name: '4 GB',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: '8 GB',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: true,
            },
            {
                name: '16 GB',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: '32 GB',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: '64 GB',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
        ],
    },
    {
        name: 'Opslagcapaciteit',
        id: faker.string.uuid(),
        options: [
            {
                name: '128 GB',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: '256 GB',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: '512 GB',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: true,
            },
            {
                name: '1024 GB',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: '1128 GB',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: '1256 GB',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
        ],
    },
    {
        name: 'Type opslag',
        id: faker.string.uuid(),
        options: [
            {
                name: 'SSD (Sata)',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'HDD',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'SSD (Sata) + HDD',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'NVMe SSD',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: true,
            },
        ],
    },
    {
        name: 'Grafische kaart',
        id: faker.string.uuid(),
        options: [
            {
                name: 'NVIDIA GTX 1050',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'NVIDIA GTX 1050 Ti',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'NVIDIA GTX 1650',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'NVIDIA GTX 1650 Ti',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'NVIDIA GTX 1660',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'NVIDIA GTX 1660 Ti',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'NVIDIA GTX 1650',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'NVIDIA GTX 1650 Ti',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'NVIDIA RTX 2060',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'NVIDIA RTX 2070',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'NVIDIA RTX 3080',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
        ],
    },
    {
        name: 'Besturingssysteem',
        id: faker.string.uuid(),
        options: [
            {
                name: 'Windows',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: true,
            },
            {
                name: 'macOS',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'Ubuntu',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
        ],
    },
    {
        name: 'Resolutie',
        id: faker.string.uuid(),
        options: [
            {
                name: 'Full HD (1080p)',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'HD Ready (720p)',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
            {
                name: 'Quad HD (1440p)',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: true,
            },
            {
                name: '4K (UHD, 2160p)',
                id: faker.string.uuid(),
                isChecked: false,
                isRecommended: false,
            },
        ],
    },
]

export default categoriesData
