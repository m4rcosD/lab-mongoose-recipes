const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    let newRecipe = {
      title: "Curry Rice",
      level: "Easy Peasy",
      ingredients: ["Curry", "Rice"],
      cuisine: "homekitchen",
      dishType: "main_course",
      image:
        "https://www.recipetineats.com/wp-content/uploads/2019/02/Curried-Rice_9.jpg?resize=650,910",
      duration: 25,
      creator: "MR ACOS",
    };

    return Recipe.create(newRecipe);
  })
  .then((dataCreate) => {
    console.log(dataCreate.title);

    return Recipe.insertMany(
      data.map((element) => {
        return {
          title: element.title,
          level: element.level,
          ingredients: element.ingredients,
          cuisine: element.cuisine,
          dishType: element.dishType,
          image: element.image,
          duration: element.duration,
          creator: element.creator,
        };
      })
    );
  })

  .then((data) => {
    console.log(data);

    return Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { runValidators: true }
    );
  })
  .then((updateData) => {
    console.log("Success of Updating");
    //console.log(updateData.title);

    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((deleteData) => {
    console.log("Success of Delete");

    // close connection
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
