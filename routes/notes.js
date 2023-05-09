const express = require("express");
const Router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchusre");
const { body, validationResult } = require("express-validator");

// Router 1 : fetch all notes of user
Router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("SOme error is ouured");
  }
});

// Router 2 :  add notes of user
Router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("description", "enter description ").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      //is thare are errors then this is send error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description } = req.body;

      const Note = new Notes({
        title,
        description,
        user: req.user.id,
      });
      const sendnote = await Note.save();

      res.json(sendnote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("SOme error is ouured");
    }
  }
);

//Router 3 : update note of user
Router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }

    //now we find the perticuler note to be update..
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("SOme error is ouured");
  }
});

//Router 4 : delete  note of user
Router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //now we find the perticuler note to be update..
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);

    res.json({ " success ": " Note has been deleted " });
  } catch (error) {
    console.error(error.message);
    // res.status(500).send("some error is ouured");
  }
});
module.exports = Router;
