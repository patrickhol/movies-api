export const getMany = model => async (req, res) => {
  try {
    const docs = await model
      .find()
      .limit(5)
      .lean()
      .exec();

    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getOne = model => async (req, res) => {
  try {
    const doc = await model
      .findById(req.params.id)
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const crudControllers = model => ({
  getOne: getOne(model),
  getMany: getMany(model)
});
