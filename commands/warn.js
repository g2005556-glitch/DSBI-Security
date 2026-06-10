const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Aggiunge un warn a un utente")
        .addUserOption(option =>
            option.setName("utente")
                .setDescription("Seleziona l'utente da warnare")
                .setRequired(true)
        ),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
            return interaction.reply({ content: "❌ Non hai i permessi.", ephemeral: true });
        }

        const user = interaction.options.getUser("utente");

        const db = JSON.parse(fs.readFileSync("./database.json", "utf8"));
        if (!db.warns) db.warns = {};

        if (!db.warns[user.id]) db.warns[user.id] = 0;

        db.warns[user.id]++;

        fs.writeFileSync("./database.json", JSON.stringify(db, null, 4));

        const warnCount = db.warns[user.id];

        await interaction.reply(`⚠️ Warn aggiunto a **${user.tag}** (Totale: ${warnCount})`);

        const member = interaction.guild.members.cache.get(user.id);

        if (warnCount === 3 && member) {
            await member.kick("Kick automatico: 3 warn");
            interaction.followUp(`👢 **${user.tag}** è stato kickato (3 warn).`);
        }

        if (warnCount === 5 && member) {
            await member.ban({ reason: "Ban automatico: 5 warn" });
            interaction.followUp(`⛔ **${user.tag}** è stato bannato (5 warn).`);
        }
    }
};

