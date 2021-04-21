const Author = require("../Schema/AuthorSchema");
const Book = require("../Schema/BookSchema");
const Publisher = require("../Schema/PublisherSchema");

module.exports.getAllAuthors = async (req, res, next) => {
  try{
    Author.find()
      .exec((err, data) => {
        res.json(data);
      });
  }

  catch{
    res.status(500).json({
      error: "There is an error retrieving authors"
    })
  }
};

module.exports.getAuthorById = async (req, res, next) => {
  try {
    Author.findOne({_id: req.params.id})
      .exec((err, data) => {
        res.json(data);
      });
  } catch {
    res.status(500).json({
      error: "There is an error retrieving the author",
    });
  }
};

module.exports.addAuthors = async (req, res, next) => {

  try{
    const author = new Author(req.body);

    const book = await Book.find({
      name: {
        $in: req.body.books.map((item) => item),
      },
    });

    const publisher = await Publisher.find({
      name: {
        $in: req.body.publications.map((item) => item),
      },
    });

    author.books = book.map((item) => {
      return {
        _id: item._id,
        name: item.name,
      };
    });
    author.publications = publisher.map((item) => {
      const obj = {
        _id: item._id,
        name: item.name,
      };
      return obj;
    });
    console.log(author);

    author.save((err) => {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
      } else {
        res.status(200).json({
          data: author,
        });
      }
    });
  }
  catch(err){
    res.status(500).json({
      error: "There is an error adding the author"
    })
  }
}

module.exports.editAuthors = async (req, res, next) => {

  try{
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

    if (inputValue.publications && inputValue.publications.length) {
      const publisher = await Publisher.find({
        name: {
          $in: inputValue.publications.map((item) => item),
        },
      });

      inputValue.publications = publisher.map((item) => {
        const obj = {
          _id: item._id,
          name: item.name,
        };
        return obj;
      });
    }

    const data = await Author.findByIdAndUpdate(req.params.id, inputValue, {
      useFindAndModify: false,
    });

    res.status(200).send({
      data,
    });
  }

  catch(err){
    res.status(500).json({
      error: err.message,
    });
  }  
};

module.exports.deleteAuthors = async (req, res, next) => {
  const data = await Author.findByIdAndDelete(
    req.params.id,
    { useFindAndModify: false },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There is a problem deleting the author",
        });
      } else {
        res.status(200).json({
          message: "Author deleted successfully",
        });
      }
    }
  );
};