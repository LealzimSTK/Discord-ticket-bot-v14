const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Exibir o avatar de um usuário",
    category: "Utility",
    options: [
        {
            name: "user",
            description: "Mencione o usuário",
            type: 6,
            require: true,
        }
    ],
    run: async (client, interaction) => {

        const usermention = interaction.options.getUser(`user`) || interaction.user;
        let banner = await (await client.users.fetch(usermention.id, { force: true })).bannerURL({ dynamic: true, size: 4096 });

        const cmp = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel(`Avatar`)
            .setCustomId(`avatar`)
            .setDisabled(true)
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setLabel(`Banner`)
            .setCustomId(`banner`)
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setLabel(`Delete`)
            .setCustomId(`delete`)
            .setStyle(ButtonStyle.Danger)
        )

        const cmp2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel(`Avatar`)
            .setCustomId(`avatar`)
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setLabel(`Banner`)
            .setCustomId(`banner`)
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setLabel(`Delete`)
            .setCustomId(`delete`)
            .setStyle(ButtonStyle.Danger)
        )

        const embed = new EmbedBuilder()
        .setColor(`ffffff`)
        .setAuthor({ name: `${usermention.tag}`, iconURL: `${usermention.displayAvatarURL({ dynamic: true, size: 512 })}`})
        .setTitle(`Download`)
        .setURL(usermention.displayAvatarURL({ size: 1024, format: `png`, dynamic: true}))
        .setImage(usermention.displayAvatarURL({ size: 1024, format: "png", dynamic: true }))

        const embed2 = new EmbedBuilder()
        .setColor(`ffffff`)
        .setAuthor({ name: `${usermention.tag}`, iconURL: `${usermention.displayAvatarURL({ dynamic: true, size: 512 })}`})
        .setDescription(banner ? " " : "O usuário não possui um banner")
        .setTitle(`Download`)
        .setURL(banner)
        .setImage(banner)

        const message = await interaction.reply({ embeds: [embed], components: [cmp] });
        const collector = await message.createMessageComponentCollector();

        collector.on(`collect`, async c => {
      
            if (c.customId === 'avatar') {
              
              if (c.user.id !== interaction.user.id) {
                return await c.reply({ content: `Apenas ${interaction.user.tag} pode interagir com os botões!`, ephemeral: true})
              }
              
              await c.update({ embeds: [embed], components: [cmp]})
            }

            if (c.customId === 'banner') {
              
              if (c.user.id !== interaction.user.id) {
                return await c.reply({ content: `Apenas ${interaction.user.tag} pode interagir com os botões!`, ephemeral: true})
              }
                
              await c.update({ embeds: [embed2], components: [cmp2]})
            }

            if (c.customId === 'delete') {
              
              if (c.user.id !== interaction.user.id) {
                return await c.reply({ content: `Apenas ${interaction.user.tag} pode interagir com os botões!`, ephemeral: true})
              }
              
              interaction.deleteReply();
            }
          })

    }
}