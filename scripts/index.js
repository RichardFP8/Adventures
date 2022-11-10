"use strict";
let categories = ["Adventures", "Arts & Crafts", "Local Sports", "Museums", "Wine Tastings", "Other"];
let activities = [
    {
        category: "Adventures",
        id: "A101",
        name: "Valley Hot Air Balloons",
        description: "Enjoy a lovely hot air balloon ride over the valley at sunrise.  Call 800-555-1212 to reserve a date/time after you complete your e-ticket purchase.",
        location: "121 S. Main Street",
        price: 265.00
    },
    {
        category: "Adventures",
        id: "A102",
        name: "River Runners: Float Trip",
        description: "A mellow float trip with lovely scenery, great fishing, just a few riffles, and it finishes back at our base. It is a perfect trip for those wishing to take their time, or those on a limited schedule.",
        location: "145 FM 103",
        price: 65.00
    },
    {
        category: "Adventures",
        id: "A103",
        name: "River Runners: Ride the Rapids",
        description: "Experience 3-4 hours of Class II and III whitewater rafting with breathtaking scenery. It is a fun, thrilling, and memorable adventure that everyone from ages 8 and up can enjoy – no experience necessary!",
        location: "145 FM 103",
        price: 145.00
    },
    {
        category: "Arts & Crafts",
        id: "AC101",
        name: "Painting with a Twist : Oils",
        description: "Enjoy 2 hours of creating an oil painting by following along with an experienced artist.  Drinks and snacks are included.",
        location: "1991 Paint Drive",
        price: 40.00
    },
    {
        category: "Arts & Crafts",
        id: "AC102",
        name: "Painting with a Twist : Watercolor",
        description: "Enjoy 2 hours of creating a watercolor painting by following along with an experienced artist.  Drinks and snacks are included.",
        location: "1991 Paint Drive",
        price: 40.00
    },
    {
        category: "Museums",
        id: "M101",
        name: "Bravings Airship Museum",
        description: "Enjoy climbing on and in our collection of small airplanes.  You will find bi-planes, experimental planes and small jets.",
        location: "101 Airfield Drive",
        price: 10.00
    },
    {
        category: "Museums",
        id: "M102",
        name: "Forks and Spoons Museum",
        description: "Enjoy touring our qwerky Forks and Spoons Museum.  It houses the worlds largest collection of, you guessed it, forks and spoons!",
        location: "1056 Lost Knives Court",
        price: 3.00
    },
    {
        category: "Museums",
        id: "M103",
        name: "Steenges Computing Museum",
        description: "Enjoy our the Stengees Computing Museum that illustrates how computing has changed over the last 60 years.",
        location: "103 Technology Way",
        price: 0.00
    },
    {
        category: "Wine Tastings",
        id: "WT-101",
        name: "Hastings Winery Tours and Tastings",
        description: "Hastings Winery is a small, family owned winery in the heart of San Jose, CA. We pride ourselves on producing single vineyard, small-batch, handcrafted premium wines sourced from the finest grapes in our valley.",
        location: "10987 FM 1187",
        price: 12.00
    },
    {
        category: "Wine Tastings",
        id: "WT-102",
        name: "Lone Oak Winery",
        description: "We are a family and friend centered winery that thrives to make each of our guests feel right at home. With a growing wine list of the finest local wines, we offer tours and an incredible experience. We are open for to-go, curbside, and delivery.",
        location: "121 Burleson Court",
        price: 0.00
    },
    {
        category: "Other",
        id: "OTH101",
        name: "Fire Department: Ride Along",
        description: "Spend the day hanging out at one of our local fire stations, visiting with the staff and learning about their jobs.  If they receive a call, you can ride along with them!",
        location: "10 Redline Drive",
        price: 25.00
    },
    {
        category: "Other",
        id: "OTH102",
        name: "Homes For Our Neighbors",
        description: "Yes, you are a visitor!  But what better way to learn about a community than volunteer with the locals to build affordable housing.  Whether it be for an hour or a week, we would love to have you with us!",
        location: "Call (555) 555-5555",
        price: 0.00
    },

];
window.onload = function () {
    setupCategories();
    const getCategories = document.getElementById("main-categories");
    const selectedActivity = document.getElementById("activities");
    //two dropdowns for their on change events; and the form's buttons
    getCategories.onchange = showActivities;
    selectedActivity.onchange = displayInformation;
}
//create the <option>'s array for the main <select>
function setupCategories() {
    const mainCategories = document.getElementById("main-categories");
    categories.forEach(theCategory => {
        let newOption = new Option(theCategory, theCategory.toLowerCase());
        mainCategories.appendChild(newOption);
    });

}
function showActivities() {
    const displayActivities = document.getElementById("activities");
    const category = document.getElementById("main-categories");
    const getTableBody = document.getElementById("loadActivityDetails");
    const getAnyRows = document.querySelectorAll("#loadActivityDetails tr");
    const getWholeTable = document.getElementById("detailsOfActivity");
    const message = document.querySelector("#message");

    let categoryIndex = category.selectedIndex;
    let categoryValue = category.value;
    let mainLength = categories.length;

    getWholeTable.style.display = "none";
    Array.from(getAnyRows).forEach((row) => getTableBody.removeChild(row));
    //when the main dropdown is changed; reset the second dropdown to "Select one" option
    displayActivities.selectedIndex = 0;

    if (categoryValue == "local sports") {
        getWholeTable.style.display = "block";
        message.innerHTML = "There are no matchings for this!"
    }
    else {
        message.innerHTML = "";
        //outer loop; this will test the loop variable with the select' option's array, since they already start at 1
        for (let i = 1; i <= mainLength; i++) {
            if (i === categoryIndex) {
                //make sure the second dropdown only has one element on change event, which is the "Select one" option
                displayActivities.options.length = 1;
                //creating a new array for the objects in activities array related to the category selected
                let activitiesRelated = [];
                //go through each object in activities array and test if it matches
                let innerLength = activities.length;
                let index = 0;
                //if the category property matches the value of the selected category, add that to the new array
                for (let y = 0; y < innerLength; y++) {
                    if (activities[y].category.toLowerCase() === categoryValue) {
                        activitiesRelated[index] = activities[y];
                        index++;
                    }
                }
                //with the new array, we have a smaller set of elements; get the length 
                let newLength = activitiesRelated.length;
                //add each of the name properties to the second dropdown; value is their id property
                for (let x = 0; x < newLength; x++) {
                    let activityOption = new Option(activitiesRelated[x].name, activitiesRelated[x].id.toLowerCase());
                    displayActivities.appendChild(activityOption);
                }
                //display the second dropdown
                displayActivities.style.display = "block";
                break;
            }
        }
    }
}

function displayInformation() {
    const getWholeTable = document.getElementById("detailsOfActivity");
    const activitySelected = document.getElementById("activities").value;
    const getTableBody = document.getElementById("loadActivityDetails");
    const getAnyRows = document.querySelectorAll("#loadActivityDetails tr");
    // const test = document.querySelector("#test");
    getWholeTable.style.display = "table";

    //deleta any rows(which should be just a row but oh well) that could already be there
    Array.from(getAnyRows).forEach((row) => getTableBody.removeChild(row));

    //start to add the row to table
    activities.forEach((activity) => {
        // if the value of the second dropdown matcheds with the id property of one of the activitie's elements(objects)
        if (activity.id.toLowerCase() === activitySelected) {
            //call function to create rows and cells
            loadDetailsInTable(getTableBody, activity);
        }

    });
    //    test.innerHTML = activitySelected;
}
function loadDetailsInTable(tbody, activity) {
    //create the row
    let newRow = tbody.insertRow(-1);
    //create the cells in order from how it'll be displayed; left to right
    let cellID = newRow.insertCell(0);
    let cellName = newRow.insertCell(1);
    let cellDescription = newRow.insertCell(2);
    let cellLocation = newRow.insertCell(3);
    let cellPrice = newRow.insertCell(4);

    //add corresponding content to each cell
    cellID.innerHTML = activity.id;
    cellName.innerHTML = activity.name;
    cellDescription.innerHTML = activity.description;
    cellLocation.innerHTML = activity.location;
    cellPrice.innerHTML = activity.price;
}

/* Obesrvations:
1)The .innerTHML of the dropdowns are the text contents of all its option children
*/
