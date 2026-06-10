const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "deletechannel",
    description: "Pulisce il canale duplicandolo e cancellando l'originale",

    async execute(interaction) {
        const channel = interaction.channel;

        // Controllo permessi utente
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: "❌ Devi essere amministratore.", ephemeral: true });
        }

        await interaction.reply({ content: "🧹 Sto pulendo il canale...", ephemeral: true });

        const parent = channel.parentId;
        const position = channel.position;

        // 1️⃣ Clona il canale
        const clone = await channel.clone({
            name: channel.name,
            reason: "Pulizia canale"
        });

        // 2️⃣ Aspetta che Discord aggiorni la lista
        await new Promise(res => setTimeout(res, 700));

        // 3️⃣ Rimetti nella categoria
        if (parent) {
            try {
                await clone.setParent(parent, { lockPermissions: false });
            } catch (err) {
                console.log("Errore setParent:", err);
            }
        }

        // 4️⃣ Aspetta ancora un attimo
        await new Promise(res => setTimeout(res, 500));

        // 5️⃣ Rimetti nella posizione originale
        try {
            await clone.setPosition(position);
        } catch (err) {
            console.log("Errore setPosition:", err);
        }

        // 6️⃣ Elimina il canale vecchio
        try {
            await channel.delete("Pulizia canale");
        } catch (err) {
            console.log("Errore delete:", err);
        }

        // 7️⃣ Messaggio finale
        clone.send("✅ **Canale pulito!**");
    }
};

