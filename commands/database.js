const fs = require("fs");

module.exports = {
    name: "database",
    description: "Mostra tutti gli utenti verificati",

    async execute(interaction) {
        const db = JSON.parse(fs.readFileSync("./database.json", "utf8"));

        if (db.verified.length === 0) {
            return interaction.reply("📭 Nessun utente verificato nel database.");
        }

        let list = db.verified
            .map(id => `<@${id}>`)
            .join("\n");

        return interaction.reply({
            content: `📌 **Utenti verificati:**\n\n${list}`,
            ephemeral: false
        });
    }
};
