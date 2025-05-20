import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ] 
});

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.GuildMemberUpdate, async (oldMember, newMember) => {
  const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
  
  const targetRoleId = process.env.TARGET_ROLE_ID;
  const roleToRemoveId = process.env.ROLE_TO_REMOVE_ID;
  
  if (addedRoles.has(targetRoleId)) {
    try {
      await newMember.roles.remove(roleToRemoveId);
    } catch (error) {
      const logChannel = newMember.guild.channels.cache.get(process.env.LOG_CHANNEL_ID);
      if (logChannel) {
        await logChannel.send(`CONTACT IAN ${error} THIS IS A BUG OR FIX IT IF ITS DISCORD`);
      }
    }
  }
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('wats up bejing');
  }
});

client.login(process.env.DISCORD_TOKEN);
