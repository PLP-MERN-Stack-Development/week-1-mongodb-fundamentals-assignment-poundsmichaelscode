//1. Find all books in a specific genre

db.books.find({ genre: "Fiction" })

//2. Find books published after a certain year (e.g., 1950)

db.books.find({ published_year: { $gt: 1950 } })

//3.Find books by a specific author (e.g., George Orwell)
db.books.find({ author: "George Orwell" })



//4. Update the price of a specific book (e.g., "1984")
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 13.99 } }
)


//5. Delete a book by its title (e.g., "Moby Dick")
db.books.deleteOne({ title: "Moby Dick" })


//Task 3: Advanced Queries
//1. Find books that are both in stock and published after 2010

db.books.find({
  $and: [
    { in_stock: true },
    { published_year: { $gt: 2010 } }
  ]
})

//2. Projection: return only title, author, and price

db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
)



//3. Sorting books by price (ascending)
db.books.find().sort({ price: 1 })


//4. Sorting books by price (descending)

db.books.find().sort({ price: -1 })


//5. Pagination: 5 books per page
//p1
db.books.find().skip(0).limit(5)

//p2
db.books.find().skip(5).limit(5)

//Task 4: Aggregation Pipeline
//1. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])


//2. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])


//3. Group books by publication decade and count them

db.books.aggregate([
  {
    $group: {
      _id: { $concat: [ { $toString: { $subtract: [ "$published_year", { $mod: [ "$published_year", 10 ] } ] } }, "s" ] },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])



//Task 5: Indexing


//1. Create an index on the title field
db.books.createIndex({ title: 1 })

//2. Create a compound index on author and published_year


db.books.createIndex({ author: 1, published_year: -1 })

//3. Use explain() to demonstrate performance

db.books.find({ title: "1984" }).explain("executionStats")



