const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kicka un utente")
        .addUserOption(option =>
            option.setName("utente")
                .setDescription("Seleziona l'utente da kickare")
                .setRequired(true)
        ),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
            return interaction.reply({ content: "❌ Non hai i permessi.", ephemeral: true });
        }

        const user = interaction.options.getUser("utente");
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) return interaction.reply("❌ Utente non trovato nel server.");

        await member.kick("Kick manuale");
        interaction.reply(`👢 **${user.tag}** è stato kickato.`);
    }
};
