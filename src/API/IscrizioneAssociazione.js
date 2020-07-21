
class IscrizioneAssociazione{
    
    constructor(nome, cognome, cf, cell, email, files){
        if(files) {
            this.files = files.map(file => file.name )
        }
        this.nome = nome;
        this.cognome = cognome;
        this.cf = cf;
        this.cell = cell;
        this.email = email || '';
    }

    static from(values) {
        const i = Object.assign(new IscrizioneAssociazione(), values);
        return i;
    }
}

export default IscrizioneAssociazione;