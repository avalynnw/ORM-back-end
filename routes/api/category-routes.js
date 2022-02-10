const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories, include its associated Products
  try {
    let categories_data = await Category.findAll({
      include: [{model: Product, as: 'products' }],
    });
    res.status(200).json(categories_data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value, include its associated Products
  try {
    let categories_data = await Category.findByPk(req.params.id, {
      include: [{model: Product, as: 'products' }],
    });
    res.status(200).json(categories_data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  /*
  Expects to recieve: 
  {
		"category_name": "example category"
  }
  */
  try {
    let categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    let categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'no category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // TODO: delete a category by its `id` value

  try {

    let categoryData = await Category.destroy({
      where: { id: req.params.id }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'no category with this id' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
