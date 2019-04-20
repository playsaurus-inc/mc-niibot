const discord = require("discord.js")


var Topics =
            [
                "your favorite dog breed",
                "your favorite classic car",
                "Catapults",
                "your favorite movie",
                "the most recent movie you've watched",
                "your favorite TV show",
                "the most recent TV show you've watched",
                "your favorite book",
                "the most recent book you read",
                "your last meal",
                "your favorite meal",
                "your favorite song",
                "your favorite genre of music",
                "that one concert you went to that one time",
                "that one time you got pulled over by a cop",
                "that one thing you've always wanted",
                "your favorite pizza toppings",
                "the amount of money it would take to make you eat a bowl of spiders",
                "your favorite super hero and why they are your favorite",
                "Hobbies \n Personally, I like plotting how I'm going to take over the world",
                "Music \n bee boo boo bop boo boo beep",
                "your favorite game",
                "the last game you've played(other than Clicker Heroes)",
                "Clicker Heroes lore",
                "other idle games",
                "whether unicorns exist or not and if so where do they come from",
                "how incapable you are of creating your own topic because you are too socially awkward",
                "that one cringy thing you did 10 years ago that still keeps you up at night",
                "that one idiot on the subreddit(in the event that there some how isn't one, try again)",
                "that one weird dream you had",
                "your shitty video game idea",
                "WWI",
                "WWII",
                "those crazy Mongolians",
                "'MURICA",
                "the craziest thing you've ever witnessed",
                "that one thing you've always wanted to do",
                "whether or not we are alone in the universe",
                "whether or not there is other universes",
                "time travel",
                "where/when you would go if you could time travel",
                "Einstein's Theory of General Relativity",
                "whether or not humans are better at creation or destruction",
                "the 3 words you would choose to describe all humans",
                "the number of years you would sell of your life and for how much",
                "what you would be remembered for if you died today",
                "that one things the devs need to hurry up and fucking implement already",
                "that one thing you've always wanted to cosplay as",
                "Polytopes",
                "Prime number density",
                "Aliquot Sequences",
                "why you haven't done that chore you are supposed to do and instead are looking for a bot to give you something to talk about",
                "why you don't have a minute to talk about jesus",
                "whether you would rather own a man in a dog body or a dog in a mans body",
                "what discord theme you are using",
                "what your favorite hero is",
                "why borb isn't your favorite outsider",
                "why solomon should be buffed",
                "why you math nerds haven't solved the greatest math problem of our time \n https://en.wikipedia.org/wiki/Moving_sofa_problem",
                "whether you are more of a fantasy or sci fi kind of person?",
                "how long do you think it would take the monkeys with type writers to write a shakespeare play?",
                "wether you have any tattoos? If yes of what? where? why? when? and would you get another?",
                "the weirdest thing you've ever eaten",
                "whether you would rather have everything come easy to you or have to struggle to get what you want?  (One Punch Man vs Dragonball)",
                "the one game you would choose to play for the rest of your life",
                "your favorite board game",
                "your favorite outdoor activity",
                "that one place you'd be at right now if you could",
                "your favorite ice cream flavor",
                "your favorite fast food restaurant",
                "what your favorite subreddit is and why",
                "your favorite actor/actress and what is the best movie(s) they are in",
                "the role you would like to play if you could act",
                "your favorite villain",
                "what the ugliest name you can think of is?",
                "what you would do if you were a monarch/dictator",
                "what your favorite podcast is?",
                "what you would like to be famous for? And in what way?",
                "If you were able to live to the age of 90 and retain either the mind or body of a 30-year-old for the last 60 years of your life, which would you want?",
                "that one weird history fact you know",
                "what ability or quality you wish you could wake up with tomorrow and why",
                "that one thing that it is to serious to be joked about \n (that someone is going to now make a joke about)",
                "what your favorite type of cheese is",
                "what your dream job would be",
                "what a good topic would be and why you haven't suggested it to McNiiby",
                "that one thing that shouldnt exist in CH(besides solomon)",
                "what your gang name would be"
            ];

            function randomTopic()
            {
                return Math.floor((Math.random() * Topics.length));
            }

            module.exports.run = async (bot, message, args) => {

                return message.channel.send("We shall now talk about " + Topics[randomTopic()]);
            }


            module.exports.help = { 
            name: "newtopic"
            }