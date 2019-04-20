const discord = require("discord.js")

            module.exports.run = async (bot, message, args) => {

                let spamChannel = message.guild.channels.find(`name`, "spam");
                if(!spamChannel) return message.channel.send("Couldn't find spam channel");
                
                message.delete().catch(O_o=>{});
                if(message.channel !== message.guild.channels.find(`name`, "spam")) {message.channel.send("Check <#259897497554649098> for gilds help");}
                spamChannel.send("Re-Gilding is not recommended before the first transcendence, so you should ignore this feature until you transcend. Until that point level the hero of the Power 5 (Treebeast, Ivan, Brittany, Samurai, Forest Seer) with the most gilds. After transcending, and once you're regularly ascending for 10k+ Hero Souls, move all Gilds to Samurai. After that, if you can get Atlas over lvl 725, move Gilds to Atlas.  If you can get a hero further down the list to over lvl 1000 (happens when your current one is lvl 1500), move gilds to that hero, all the way down to Wepwawet (when Wep's Betty/Midas upgrades become available, move to Betty or Midas, and then move back to Wep when he passes lvl 5000). \n \nFor heroes Tsuchi and beyond, regild as soon as they are affordable. For Cadu and Ceus you will gild Cadu first since he does slightly more damage. As soon as one of them reaches an upgrade you switch gilds to the other, their upgrades buff each other instead of themselves. Yachiyl becomes better than the Maw after her first upgrade. Rose becomes better than Yachiyl after level 9700, and then the 4 new heroes you gild and level each as you unlock them, and then as you get each upgrade. Notable exceptions are Dorothy's first, second, and fourth upgrades which you will skip. \n \nNote: you don't need to ascend to regild and you also don't need to regild every time a ranger reaches 1500. Regilding is only important when instakill stops to enable you to reach higher zones. Until instakill stops you can basically do whatever you'd like. \n \nAlternatively you can view this chart which has the same information in a different format <https://www.reddit.com/r/ClickerHeroes/comments/868uh3/10e11_hero_gilding_chart/>");
            }


            module.exports.help = { 
            name: "gilds"
            }