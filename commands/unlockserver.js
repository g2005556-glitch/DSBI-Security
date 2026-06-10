module.exports = {
    name: "unlockserver",
    description: "Sblocca il server dal cooldown anti-raid",

    async execute(interaction) {
        if (interaction.user.id !== interaction.guild.ownerId) {
            return interaction.reply({ content: "Solo il proprietario può usare questo comando.", ephemeral: true });
        }

        serverLocked = false;

        interaction.guild.channels.cache.forEach(ch => {
            ch.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                SendMessages: null,
                CreatePublicThreads: null,
                CreatePrivateThreads: null
            }).catch(() => {});
        });

        return interaction.reply("🔓 Il server è stato sbloccato manualmente.");
    }
};
