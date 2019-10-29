//Created by koko#0012
// >_>
// Have a nice day need any help dm me



'use strict';
const { RichEmbed } = require("discord.js")
const { purple } = require("../../json/colours.json") //colour

const util = require('util');

function clean (text) {
  if (typeof text === 'string') {
    return text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
  }
  return text;
}
module.exports = { 
  config: {
      name: "eval",
  },
run: async (bot, message, args, connection) => { //command handler
  message.delete();
  
  let user = message.author; // user

  connection.query(`SELECT * FROM owner WHERE id = '${user.id}'`, function (err, rows) { 

    if(err) throw err;
  

    if(rows.length < 1) {
      const noperm = new RichEmbed()
      .setColor(purple)
      .setDescription(":x: You require the permission ``Owner`` bot permissions")
      .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)    
      
     //database or do  if (user.id !== 'yourid') return
     // & remove from if(rows.length < 1) { to  connection.query 
     // remove connection from handler
     
    message.channel.send(noperm).then(m => m.delete(10000))
    } else {
     let uid = rows[0].id;
     if(message.author.id != uid);

  if (!args[0]) return message.reply(':x: You must provide code for me to evaluate!');
  let msg = args.join(" ");
  try {
    let evaled = eval(msg);
    if (typeof evaled !== 'string') evaled = util.inspect(evaled);
    let hrStart = process.hrtime()
    let hrDiff;
    hrDiff = process.hrtime(hrStart)
    console.log(`${message.author.username} | Input - ${msg}`)
    const embed = new RichEmbed()
      .setAuthor('Evaluation')
      .setDescription(`**Input**\n\`\`\`${msg}\`\`\`\n**Output**\n\`\`\`xl\n${clean(evaled).length <= 2048 ? clean(evaled) : 'Over 2048 Characters'}\n\`\`\`\n*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms`)
      .setColor(purple)
      .setTimestamp();
    return message.channel.send(embed);
  } catch (e) {
    const msg2 = new RichEmbed()
    .setAuthor(`ERROR`)
    .setDescription(`xl\n${clean(e)}`)
    .setColor(purple)
    return message.channel.send(msg2);
  }
}})}}
