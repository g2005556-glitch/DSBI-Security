const fs = require("fs");

module.exports = {
    name: "verify",
    description: "Verifica l'utente",

    async execute(interaction) {
        const db = JSON.parse(fs.readFileSync("./database.json", "utf8"));

        // Se non esiste l'array verified, lo crea
        if (!db.verified) db.verified = [];

        // Se l'utente è già verificato
        if (db.verified.includes(interaction.user.id)) {
            return interaction.reply({
                content: "Sei già verificato!",
                ephemeral: true
            });
        }

        // Aggiunge l'utente
        db.verified.push(interaction.user.id);

        // Salva il file
        fs.writeFileSync("./database.json", JSON.stringify(db, null, 4));

        return interaction.reply({
            content: "✔️ Sei stato verificato!",
            ephemeral: true
        });
    }
};
