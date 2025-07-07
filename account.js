/** @format */
let animals;
let panel_class;

const setUp = () => {
  console.log("in setup");
  // Create a different border around the login box
  $(".access").css({ border: "2px solid green" });
  console.log($("nav ul li"));
  $("nav ul li").hide();
  // Add event handler for login
  $("#login").on("click", login);
};
const authOK = (userName, userPasscode) => {
  if (userName == "dog" && userPasscode == "goofy") return true;
  else return false;
};
const login = () => {
  console.log("Logging in");
  let userName = $("#id_Name").val();
  let userPasscode = $("#id_Passcode").val();
  console.log(userName, userPasscode);
  let ret = authOK(userName, userPasscode);
  console.log("ret ", ret);
  if (authOK(userName, userPasscode)) {
    console.log($("nav ul li"));
    $("nav ul li").show();
  }
  $(".access").hide();
  // !!! Display user name below h1 tag, APPEND
  // !!! Create the content using the $ function, and then append
  // !!! Examine using the console - check the location
  let nameStr = $(`<h3>Welcome, ${userName} account handler!</h3>`);
  $("header").append(nameStr);
  // Add a click hander for the dogs button
  $("#dog").on("click", createPanel);
};

const createPanel = (event) => {
  // !!! Display the correct panel (just in case there is a different style for the cats!)
  // !!! Use .html to create the content
  // !!! Examine using the console - check the location
  console.log("createpanel -- event --", event);
  panel_class = event.target.id;
  console.log("panel_class : ", panel_class);
  $(".animals").html(`<div class=${panel_class}></div>`);
  let area = $(`.animals .${panel_class}`);

  console.log("AREA:", area);
  // !!! Add the animals to the div of class described by panel_class, inside the element of class animals
  animals = panel_class == "dog" ? getAllDogsAPI() : getAllCatsAPI();
  console.log(animals);
  animals.forEach((animal) => {
    let animalLine = $(
      `<div class="displayLine">
          <div class = "info">${animal.animal_name} the ${animal.breed} <img src="${animal.animal_name}.png"/> </div>
          <div class = "crud_buttons"><button class="view">View</button><button class="update">Update</button><button class="remove">Remove</button></div>
          <div class="showInfo"></div>
       </div>`
    );
    area.append(animalLine);
  });

  // Add the Create button - a single button, with click handler createhandler
  let createPara =
    $(`<span>Use the CREATE button below to register a new ${panel_class} for the shelter.</span>
    <div class="crud_buttons"><button class="create">Create</button></div>`);
  $(`.animals`).prepend(createPara);
  $(".crud_buttons .create").on("click", createHandler);

  // This is an example of the use of the target object, a special object in jQuery
  // The target object identifies the element receiving the event.
  $(".displayLine button").on("click", (e) => {
    const target = $(e.target);
    // Examine the target object - this will give the class of the item
    console.log(target["0"]);
    handler(target["0"]);
  });
};

const handler = (element) => {
  console.log("in handler - see element ", element);
  let elementClass = element.className;
  console.log("element class ", elementClass);
  console.log(
    `All buttons of class ${elementClass}`,
    $(`button.${elementClass}`)
  );
  let indexOfAnimal = $(`button.${elementClass}`).index(element);
  console.log("index of animal ", indexOfAnimal);
  console.log(animals[indexOfAnimal]);

  if (indexOfAnimal >= 0)
    if (elementClass == "view") {
      viewHandler(indexOfAnimal);
    } else if (elementClass == "update") {
      updateHandler(indexOfAnimal);
    } else if (elementClass == "remove") {
      console.log("Removing!!!!", indexOfAnimal);
      removeHandler(indexOfAnimal);
    }
};

const viewHandler = (index) => {
  console.log("viewhandler", index);
  let info = $(".showInfo:eq(" + index + ")");
  console.log("INFO", info);
  info.html(
    `${animals[index].animal_name} is ${animals[index].age} years old. This ${animals[index].breed} is fed at these hours: ${animals[index].feed_times}, with ${animals[index].scoops} scoops of ${animals[index].food}. Careful! ${animals[index].warning}!!<button class="close">X</button>`
  );
  info.find(".close").on("click", () => {
    setTimeout(function () {
      // !!! Use .html to reset the content
      info.html("");
    }, 1000);
  });
};


//Update Handler
// - Get the displayline for the chosen animal
// - Create element that shows the inputs
// - Add click handler for save button
// - Update the content of the animal
// - Add click handler again
//Update Handler
// - Get the displayline for the chosen animal
// - Create element that shows the inputs
// - Add click handler for save button
// - Update the content of the animal
// - Add click handler again
const updateHandler = (index) => {
  console.log("updatehandler", index);

  //Get the display line of the animal to update
  let displayLine = $(".dog .displayLine").eq(index);

  // Save the current image before updating
  const currentImg = $(".dog .displayLine img").eq(index).attr("src");

  // Create a form with inputs pre-filled with current animal data
  let updatePara = $(`
    <div class="updateForm">
      <input type="text" id="update_name" value='${animals[index].animal_name}' size="6"/>
      is a
      <input type="text" id="update_breed" value='${animals[index].breed}' size="8" />,
      and is
      <input type="text" id="update_age" value='${animals[index].age}' size="1" />
      years old. Feed her at
      <input type="text" id="update_feed_times" value='${animals[index].feed_times}' size="16">
      with
      <input type="text" id="update_scoops" value='${animals[index].scoops}' size="1">
      scoops of
      <input type="text" id="update_food" value='${animals[index].food}' size="11">.
      <input type="text" id="update_warning" value='${animals[index].warning}' size="30">.
      <button class="save_update">Save</button>
    </div>
  `);

  //replace the current animal info line with the editable form
  displayLine.html(updatePara);

  // When user clicks save, update the animal object in memory
  $(".save_update").on("click", function () {
    // Update the animal object with new data
    animals[index] = {
      animal_name: $("#update_name").val(),
      breed: $("#update_breed").val(),
      age: $("#update_age").val(),
      feed_times: $("#update_feed_times").val(),
      scoops: $("#update_scoops").val(),
      food: $("#update_food").val(),
      warning: $("#update_warning").val(),
    };

    // re-render the updated display with new info and buttons
    displayLine.html(`
      <div class="info">${animals[index].animal_name} the ${animals[index].breed} 
        <img src="${currentImg}" /> 
      </div>
      <div class="crud_buttons">
        <button class="view">View</button>
        <button class="update">Update</button>
        <button class="remove">Remove</button>
      </div>
      <div class="showInfo"></div>
    `);

    // re-attach event handlers to the newly added buttons
    $(".displayLine button").on("click", (e) => {
      const target = $(e.target);
      handler(target["0"]);
    });
  });
};



const removeHandler = (index) => {
  console.log("Removing ... ", index);
  // Delete the item from the list ...
  // by using the index (parameter)
  // Find the classes you need to remove the exact item (check inspector)
  let item = $(".dog .displayLine").eq(index);
  console.log("Removing ... ", item);
  item.remove();
  // Splice the item from the data array
  // by using the index (parameter)
  animals.splice(index, 1);
  console.log(animals);
};

const createHandler = () => {
  // Disable the create button
  $("button.create").prop("disabled", true);
  console.log("Creating a new animal for shelter");

  // Create an element showing the text fields with sample values
  let createPara =
    $(`<input type="text" id="new_name" value = 'name' size="6"/> 
    is a 
    <input type="text" id="new_breed" value = 'breed' size="8" />, 
    and is 
    <input type="text" id="new_age" value = age size="1" /> 
    years old. Feed her at 
    <input type="text" id="new_feed_times" value = 'feed_times' size="16">
    with 
    <input type="text" id="new_scoops" value = 'x' size="1">
    scoops of 
    <input type="text" id="new_food" value = 'food' size="11">. 
    <input type="text" id="new_warning" value = 'warning' size="30">.<button class="save_new">Save</button>`);
  // Add this AFTER the create button
  $(".crud_buttons .create").after(createPara);

  // Add a click handler for the save new animal button
  $(".save_new").on("click", function () {
    let newAnimal = {
      breed: $("input#new_breed").val(),
      animal_name: $("input#new_name").val(),
      age: $("input#new_age").val(),
      feed_times: $("#new_feed_times").val(),
      food: $("#new_food").val(),
      scoops: $("#new_scoops").val(),
      warning: $("#new_warning").val(),
    };

    console.log("------->>>>", newAnimal);
    animals.push(newAnimal);
    console.log(animals);

    // area, below - this is the element with the list of animals
    // ... need to add new animal descriptive elements to this
    let area = $(`.animals .${panel_class}`);
    console.log("AREA, in create for adding new animal:", area);

    // !!! Add the new animal to the div of class described by panel_class,
    // inside the element of class animals
    let animalLine = $(
      `<div class="displayLine">
          <div class = "info">${newAnimal.animal_name} the ${newAnimal.breed} <img src="./images/genericdog.jpg"/> </div>
          <div class = "crud_buttons"><button class="view">View</button><button class="update">Update</button><button class="remove">Remove</button></div>
          <div class="showInfo"></div>
       </div>`
    );

    area.append(animalLine);

    // Now, there are no click handlers associated with the buttons for the new animal.
    // Have to add the click handlers here
    $(".displayLine button").on("click", (e) => {
      const target = $(e.target);
      // Examine the target object - this will give the class of the item
      console.log(target);
      console.log(target["0"]);
      handler(target["0"]);
    });

    // Enable the create button
    $("button.create").prop("disabled", false);

    // Remove the create para
    createPara.remove();
  });
};

$(document).ready(setUp);
