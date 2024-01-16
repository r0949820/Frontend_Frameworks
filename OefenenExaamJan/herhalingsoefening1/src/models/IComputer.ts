interface IComputer {
    name: string                        // De naam van de computer.
    price: string                       // De prijs van de computer.
    info: string                        // Korte tekst die info geeft over de schermdiagonaal, CPU en het RAM.
    id: string                          // Het ID van de computer.
    description: string                 // Een beschrijving van de computer.
    options: Record<string, string>     // Key-value paren die een categoryId linken aan de gekozen optie.
}

export default IComputer
