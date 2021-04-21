const Book = require("../Schema/BookSchema");

module.exports.getAllBooks = async (req, res, next) => {
  try{
    const data = await Book.find();
    res.status(200).json({
      data
    });
  }
  
  catch{
    res.status(500).json({
      error: "Error collecting data"
    });
  }
};

module.exports.getBookById = async (req, res, next) => {
  try {
    const data = await Book.find({ _id: req.params.id });
    console.log(req.params.id);
    res.status(200).json({
      data,
    });
  } catch {
    res.status(500).json({
      error: "Error collecting data",
    });
  }
};

module.exports.addBooks= async (req, res, next) =>{
  const book = new Book(req.body);
  console.log(book)
  book.save((err)=>{
    if(err){
      res.status(500).json({
        error: "There is a problem adding the book"
      })
    }

    else{
      res.status(200).json({
        message: "Book added successfully",
      });
    }
  })
}


module.exports.editBooks = async (req, res, next) => {
  const modify = req.body;

  try{
    const data = await Book.findByIdAndUpdate(req.params.id, modify, {
      useFindAndModify: false,
    });

    res.status(200).json({
      data
    });
    console.log(data);
  }

  catch{
    res.status(500).json({
      error: "There is a problem editing the book"
    })
  }
};

module.exports.deleteBooks = async (req, res, next) => {
  const data = await Book.findByIdAndDelete(
    req.params.id,
    { useFindAndModify: false },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There is a problem deleting the book",
        });
      } else {
        res.status(200).json({
          message: "Book deleted successfully",
        });
      }
    }
  );
};
