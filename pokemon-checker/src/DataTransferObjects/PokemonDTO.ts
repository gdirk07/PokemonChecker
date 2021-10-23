/**
 * Pokemon Data Transfer Object
 * 
 * Stores all important information related to a pokemon for in-app retrieval
 */
class PokemonDTO
{
    public name: string;
    public dexId: Number;
    public type1: String; //TODO: Update this to a TypeDTO object when created
    public type2: String | null;
    public moves: String[]; //TODO: Update this to a moveDTO[] object when created
    constructor(name: string, dexId: number, moves: string[], type1: string, type2: string | null = null)
    {
        this.name = name;
        this.dexId = dexId;
        this.moves = moves;
        this.type1 = type1;
        this.type2 = type2;
    }
}

export default PokemonDTO