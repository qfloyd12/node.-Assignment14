const express = require("express");
const path = require("path");
const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/crafts", (req, res) => {
    console.log("Requesting crafts API");

    const crafts = [];
    crafts[0] = {
        name: "Beaded JellyFish",
        description: "Create a hanging jellyfish using eggcartons and multicolored beads",
        supplies: ["string", "egg cartons", "beads"],
        img: "images/bead-jellyfish.jpg"
    };
    crafts[1] = {
        name: "Character Bookmarks",
        description: "Create a little birdy bookmark to always remind you where you were",
        supplies: ["yellow construction paper", "orange construction paper", "black construction paper"],
        img: "images/bookmarks.jpeg"
    };
    crafts[2] = {
        name: "Button Flowers",
        description: "Create a fun bouquet of flowers with your favorite buttons",
        supplies: ["multicolored buttons", "multicolored felt", "green straws", "ribbon"],
        img: "images/button-flowers.jpeg"
    };
    crafts[3] = {
        name: "Cheerio Necklaces",
        description: "Create a fun and edible necklace",
        supplies: ["Cheerios or Fruit Loops", "Elastic string"],
        img: "images/cheerio-necklace.webp"
    };
    crafts[4] = {
        name: "Cotton Ball Cupcakes",
        description: "Decorate your fun filled cupcake however you want.",
        supplies: ["Construction Paper", "Cotton Balls", "Black Sharpie", "Glitter"],
        img: "images/cotton-ball-cupcakes.webp"
    };

    crafts[5] = {
        name: "School Themed Mason Jars",
        description: "Let's make mason jars to",
        supplies: ["Construction Paper", "Cotton Balls", "Black Sharpie", "Glitter"],
        img: "images/decorated-jars.jpeg"
    };
    crafts[6] = {
        name: "Egg Carton Flowers",
        description: "Make a beautiful bouquet with egg cartons and other items you can find around the house",
        supplies: ["Egg Cartons", "Buttons", "Green Pipe Cleaner", "Ribbon", "Canvas"],
        img: "images/egg-carton-flowers.jpg"
    };
    crafts[7] = {
        name: "Finger Puppets",
        description: "These little critters are easy to make, and will entertain your little one while they make a show.",
        supplies: ["Pom-poms", "Googly Eyes", "Pipe Cleaner"],
        img: "images/finger-puppets.jpeg"
    };
    crafts[8] = {
        name: "Ribbon Flower Headbands",
        description: "Let your little one show off her new style with these pretty and customizable headbands",
        supplies: ["Plain headband", "Ribbon", "Buttons", "Gems"],
        img: "images/flower-headbands.jpg"
    };
    crafts[9] = {
        name: "Hand Print Fish Puppets",
        description: "We all need to take every opportunity we can to remember those tiny hands, and what better way to do it, then to make fish puppets!",
        supplies: ["Popsicle sticks", "Cardstock", "Gems", "Googly Eyes"],
        img: "images/handprint-fish.jpg"
    };
    crafts[10] = {
        name: "Hand Print Tree",
        description: "This is a fun way to get your little one into finger painting.",
        supplies: ["Watercolor Paper", "Finger paint"],
        img: "images/hand-print-tree.jpeg"
    };
    crafts[11] = {
        name: "Melted Bead Bowl",
        description: "All they need to do is shape their favorite design, warm it up and they have a brand new bowl.",
        supplies: ["Beads", "Bowl", "Parchment paper"],
        img: "images/melted-bead-bowl.jpeg"
    };
    crafts[12] = {
        name: "Monster Kites",
        description: "Let's make those scary toilet paper rolls fly!",
        supplies: ["Toilet paper rolls", "Paint", "Tissue Paper", "String"],
        img: "images/monster-rolls.jpg"
    };
    crafts[13] = {
        name: "Pool Noodle Boats",
        description: "Let's make a boat that will actually float, due to the floating bottom of a pool noodle.",
        supplies: ["Pool Noodle", "Straw", "Plastic Paper"],
        img: "images/noodle-boats.png"
    };
    crafts[14] = {
        name: "Paper Plate Bees",
        description: "Let's have fun with making cute little bees, or big bees actually.",
        supplies: ["Paper Plate", "Googly Eyes", "Close Pins", "Black pom poms", "Yellow Paint", "Black Paint"],
        img: "images/paper-plate-bees.jpeg"
    };
    crafts[15] = {
        name: "Paper Plate Dinosaurs",
        description: "Who would have thought that half a paper plate would be the base of a dinosaur.",
        supplies: ["Paper Plate", "Paint", "Close Pins", "Construction Paper"],
        img: "images/paper-plate-dinosaurs.jpg"
    };
    crafts[16] = {
        name: "Porcupine Leafs",
        description: "Let's turn an ordinary paper plate into a fun filled mask.",
        supplies: ["Leafs", "Berries", "Acorns", "Construction Paper"],
        img: "images/porcupine-leaf.webp"
    };
    crafts[17] = {
        name: "Rainbow Cloud",
        description: "Some cotton and color and you'll have a beautiful rainbow.",
        supplies: ["Paper Plate", "Cotton Balls", "Construction Paper"],
        img: "images/rainbow-cloud.webp"
    };
    crafts[18] = {
        name: "Fun Shaped Crayons",
        description: "Let's melt some crayons together and let them harden into fun shapes.",
        supplies: ["Broken Crayons", "Mold"],
        img: "images/shaped-crayons.jpg"
    };

    crafts[19] = {
        name: "Straw Ferris Wheel",
        description: "It might be too small to ride, but this ferris wheel is the most colorful of all.",
        supplies: ["Multicolored straws", "Platform"],
        img: "images/straw-faris-wheel.jpg"
    };
    crafts[20] = {
        name: "Sunny String",
        description: "Let's practice our fine motor skills while we weave the string into a fun sun.",
        supplies: ["Yellow String", "Paper Plate", "Yellow construction paper", "Yellow and Orange beads"],
        img: "images/sun-string.jpg"
    };
    crafts[21] = {
        name: "Tissue Ballerinas",
        description: "These beautiful dancers will look great on display",
        supplies: ["Pipe cleaner", "Tissue Paper", "Elastics"],
        img: "images/tisue-dancer.jpeg"
    };
    crafts[22] = {
        name: "Toilet Paper Roll Animals",
        description: "These beautiful dancers will look great on display",
        supplies: ["Toilet Paper Rolls", "Construction Paper", "Googly Eyes"],
        img: "images/toilet-paper-animals.jpeg"
    };
    crafts[23] = {
        name: "Toilet Paper Butterfly",
        description: "Such a sweet little flyer",
        supplies: ["Toilet Paper Rolls", "Construction Paper", "Googly Eyes", "Buttons"],
        img: "images/toilet-paper-butterfly.jpg"
    };
    crafts[24] = {
        name: "Valentines Jar",
        description: "So much heart all in one",
        supplies: ["Clay", "Glitter"],
        img: "images/valentines-jar.webp"
    };

    console.log(crafts);
    res.json(crafts);
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});