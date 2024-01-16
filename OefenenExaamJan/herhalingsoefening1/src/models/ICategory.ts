import IOption from './IOption.ts'

interface ICategory {
    name: string            // De naam van de categorie.
    id: string              // Het ID van de categorie.
    options: IOption[]      // Lijst van opties binnen deze categorie.
}

export default ICategory
