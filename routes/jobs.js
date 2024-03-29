const Joi = require("joi");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const { Job } = require("../database");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

router.use(cors());

//-------------- LIST -----------------//
router.get("/", async (req, res) => {
  let { search } = req.query;

  let criteria = {
    where: {
      deleted_at: null,
    },
  };

  if (search) {
    criteria = {
      where: {
        deleted_at: null,
        skills: { [Op.like]: "%" + search + "%" },
      },
    };
  }

  const result = await Job.findAll(criteria);
  res.status(200).send(result);
});

//-------------- READ -----------------//
router.get("/:id", async (req, res) => {
  const result = await Job.findByPk(req.params.id);

  if (_.isEmpty(result)) {
    res.status(404).send("MESSAGE DATA NOT EXIST");
    return;
  }

  res.status(200).send(result);
});

//-------------- CREATE -----------------//
router.post("/", async (req, res) => {
  const result = await Job.create({
    title: req.body.title,
    skills: req.body.skills,
    description: req.body.description,
    budget: req.body.budget,
    contact_email: req.body.contact_email,
  });
  res.status(200).send(result);
});

//-------------- UPDATE -----------------//
router.put("/:id", async (req, res) => {
  const result = await Job.findByPk(req.params.id);

  if (_.isEmpty(result)) {
    res.status(404).send("MESSAGE DATA NOT EXIST");
    return;
  }

  const response = await result.update(req.body);

  res.status(200).send(response);
});

//-------------- DELETE -----------------//
router.delete("/:id", async (req, res) => {
  const result = await Job.findByPk(req.params.id);

  if (_.isEmpty(result)) {
    res.status(404).send("MESSAGE DATA NOT EXIST");
    return;
  }

  const response = await result.update({
    deleted_at: new Date(),
  });

  res.status(200).send(response);
});

function validateJob(Job) {
  const schema = {
    text: Joi.string().min(1).required(),
    completed: Joi.boolean().required(),
  };

  return Joi.validate(Job, schema);
}

module.exports = router;
