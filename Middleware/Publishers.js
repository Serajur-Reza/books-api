const Publisher = require("../Schema/PublisherSchema");
const Book = require("../Schema/BookSchema");
const Author = require("../Schema/AuthorSchema");

module.exports.getAllPublishers = async (req, res, next) => {
  try {
    Publisher.find()
      .exec((err, data) => {
        res.json(data);
      });
  } catch {
    res.status(500).json({
      error: "There is an error retrieving authors",
    });
  }
};

module.exports.getPublisherById = async (req, res, next) => {
  try {
    Publisher.findOne({ _id: req.params.id })
      .exec((err, data) => {
        res.json(data);
      });
  } catch {
    res.status(500).json({
      error: "There is an error retrieving the author",
    });
  }
};

module.exports.addPublishers = async (req, res, next) => {
  try {
    const publisher = new Publisher(req.body);

    const book = await Book.find({
      name: {
        $in: req.body.books.map((item) => item),
      },
    });

    const author = await Author.find({
      name: {
        $in: req.body.writer.map((item) => item),
      },
    });

    publisher.books = book.map((item) => {
      return {
        _id: item._id,
        name: item.name,
      };
    });
    publisher.writer = author.map((item) => {
      const obj = {
        _id: item._id,
        name: item.name,
      };
      return obj;
    });
    console.log(publisher);

    publisher.save((err) => {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
      } else {
        res.status(200).json({
          data: publisher,
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      error: "There is an error adding the publisher",
    });
  }
};

module.exports.editPublishers = async (req, res, next) => {
  try {
    const inputValue = req.body;

    if (inputValue.books && inputValue.books.length) {
      const book = await Book.find({
        name: {
          $in: inputValue.books.map((item) => item),
        },
      });

      inputValue.books = book.map((item) => {
        return {
          _id: item._id,
          name: item.name,
        };
      });
    }

    if (inputValue.writer && inputValue.writer.length) {
      const author = await Author.find({
        name: {
          $in: inputValue.writer.map((item) => item),
        },
      });

      inputValue.writer = author.map((item) => {
        const obj = {
          _id: item._id,
          name: item.name,
        };
        return obj;
      });
    }

    const data = await Publisher.findByIdAndUpdate(req.params.id, inputValue, {
      useFindAndModify: false,
    });

    res.status(200).send({
      data,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }  
};

module.exports.deletePublishers = async (req, res, next) => {
  const data = await Publisher.findByIdAndDelete(
    req.params.id,
    { useFindAndModify: false },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There is a problem deleting the publisher",
        });
      } else {
        res.status(200).json({
          message: "Publisher deleted successfully",
        });
      }
    }
  );
};
