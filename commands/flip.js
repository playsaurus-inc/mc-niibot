const discord = require("discord.js")


var Flip =
            [
                "http://i3.kym-cdn.com/photos/images/facebook/000/162/808/1313440823492.png",
                "http://forum.lowyat.net/uploads//avatars/av-742246-1441782296.png",
                "http://cdn.funcheap.com/wp-content/uploads/2015/03/Screen-Shot-2015-03-02-at-5.33.51-PM-250x202.png",
                "http://orig07.deviantart.net/999a/f/2013/069/8/0/rage_quit_on_tinychat__table_flip_by_tjrainbowlantern-d5xllv0.png",
                "http://media.giphy.com/media/gc1aIXASOjbr2/giphy.gif",
                "http://media3.giphy.com/media/dwpbGUm18BAfm/200_s.gif",
                "http://i.imgur.com/Ny7wUiZ.jpg",
                "http://orig06.deviantart.net/28d2/f/2011/318/d/d/applebloom___table_flip_by_cptofthefriendship-d4g65ki.png",
                "http://boardgametime.files.wordpress.com/2012/04/table_flip.jpg",
                "http://media.giphy.com/media/sIE0hveuiwCNG/giphy.gif",
                "http://i2.kym-cdn.com/photos/images/newsfeed/000/878/067/a54.gif",
                "http://images2.wikia.nocookie.net/__cb20120418045358/shipoffools/images/5/54/Franky!!!!.gif",
                "http://i.giphy.com/cJhhHzImaBXfW.gif",
                "http://i.giphy.com/zOnH0x3nbKS2c.gif",
                "http://i.giphy.com/Pch8FiF08bc1G.gif",
                "http://i.giphy.com/PKMW62Ib6Mm0E.gif",
                "http://i.giphy.com/6lScd4x2D5Oko.gif",
                "http://i.giphy.com/q0FBs96PQmjDi.gif",
                "http://i.giphy.com/vwu9UTwIwFr7G.gif",
                "http://i.giphy.com/IboGSjkXaOre0.gif",
                "http://i.giphy.com/N660CUMQrTIsg.gif",
                "http://i.giphy.com/C4Ksze6QMEDUk.gif",
                "http://i.giphy.com/7qZW39j89jINW.gif",
                "http://i.giphy.com/4t1oWeOAO0wTe.gif",
                "http://i.giphy.com/DGjVAjZrquFSU.gif",
                "http://i.giphy.com/GYF0nHKYgB6U.gif",
                "http://i.giphy.com/5gVgwoD6NE0BW.gif",
                "http://i.giphy.com/6qPQanyQmSSJi.gif",
                "http://i.giphy.com/UWeVRz8ytHW1y.gif",
                "http://i.giphy.com/SrDsJj5i1Chm8.gif",
                "http://i.giphy.com/NbENjdMCZPbVe.gif",
                "http://i.giphy.com/p6xB68dEjGt1K.gif",
                "http://i.giphy.com/pdCBKkLSBRybC.gif",
                "http://i.giphy.com/htKsHr2W6Y6Qg.gif",
                "http://i.giphy.com/5saWnCIJL7nmU.gif",
                "http://i.giphy.com/X83Y7r03T6uty.gif",
                "http://i.giphy.com/w8OOUniai4Gzu.gif",
                "http://i.giphy.com/pj8zUmZogKUGA.gif",
                "http://i.giphy.com/O82d1XlAUIxxu.gif",
                "http://i.giphy.com/hTfhQEfytj80E.gif",
                "http://i.giphy.com/ikccHH7RigYV2.gif",
                "http://i.giphy.com/Aevr67I0q2ZRC.gif",
                "http://i.giphy.com/6PB8Fy9n9ISre.gif",
                "http://i.giphy.com/DzRWAOZUwNOXS.gif",
                "http://i.giphy.com/9UE66dxKahmiQ.gif",
                "http://i.giphy.com/lnJfR2vuLcDo4.gif",
                "http://i.giphy.com/T77LC6oU1C3FC.gif",
                "http://i.giphy.com/Ms6Lf1JgUTNvO.gif",
                "http://i.giphy.com/lU4NQaGyCdZwk.gif",
                "http://i.giphy.com/a405wNTXJM5Ms.gif",
                "http://i.giphy.com/lb7a9W1TuxPkA.gif",
                "http://i.giphy.com/I9MivxkwMYO2s.gif",
                "http://i.giphy.com/PZoYlCw7ap4Nq.gif",
                "http://i.giphy.com/hH8RMVRjdRIjK.gif",
                "http://i.giphy.com/1vTwqc37jJpF6.gif",
                "http://i.giphy.com/8V89ytCUrNuXm.gif",
            ];

            function randomFlip()
            {
                return Math.floor((Math.random() * Flip.length));
            }
            
            module.exports.run = async (bot, message, args) => {

                return message.channel.send(Flip[randomFlip()]);
            }


            module.exports.help = { 
            name: "flip"
            }