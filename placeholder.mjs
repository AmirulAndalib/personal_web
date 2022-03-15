"use strict";

import * as dotenv from 'dotenv';
dotenv.config({ path: ".env.local" });

import mongoose from 'mongoose';

const MongoURI = process.env.MONGODB_URI;
if (!MongoURI){
    throw new Error("Please define a MONGODB_URI environment variable on .env.local");
}

async function connect(){
    return await mongoose.connect(MongoURI);
}

async function insert(schema){
    try{
        await schema.save();
        console.log('Done inserting');
    } catch (err) {
        console.log(err);
    }
}

connect();

// Main Page Schema
const main = mongoose.model("Main" ,new mongoose.Schema({
    _id: Number,
    image: String,
    about: String
}));

// About me Schema
const about = mongoose.model("About", new mongoose.Schema({
    _id: Number,
    content: [String]
}));

const project = mongoose.model("Project", new mongoose.Schema({
    name: String,
    description: String,
    link: {
        type: String,
        required: false
    },
    photo: String
}));


let mainContent = new main({  // This is for the index page
    _id: 1,  // _id is mandatory to be 1
    image: "https://via.placeholder.com/300/09f/fff.png",
    about: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae ab, debitis exercitationem totam voluptatibus nemo error voluptates natus aspernatur accusamus."
});

insert(mainContent)

let aboutContent = new about({  // About me page
    _id: 1,  // _id is mandatory to be 1
    content: [
        "Hello there! Greetings everyone",
        "Thank you for visiting my website! seems like you're curious about me huh?😁",
        "Ok bring it up.",
        "You all can call me Gaung.",
        "I'm a student majoring Computer Science from Indonesia. I love to code and I love to learn new things. just so you know, this is my first website using React and Tailwind.",
    ]
});

insert(aboutContent);


let projectContent = [
    new project({
        name: "Example",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        link: "https://example.com", // Don't forget 'https://' also this is optional field
        photo: "https://via.placeholder.com/300/09f/fff.png"
    }),  // Duplicate this for every project you have
]

projectContent.forEach((project) => {
    insert(project);
})