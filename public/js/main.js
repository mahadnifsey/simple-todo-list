// Declaring our variables
// ========================
const deleteBtn = document.querySelectorAll('.fa-trash')                // Assigning variables to class for deleting
const item = document.querySelectorAll('.item span')                    // Assigning variable to span tags with the class 'item'
const itemCompleted = document.querySelectorAll('.item span.completed') // Assigning variable to specific span tags with the class 'item'

// =========================================================================================================================================================================
// Add event listeners to start our functions
// ===========================================
// Adding event listener to all delete buttons
Array.from(deleteBtn).forEach((element)=>{              // Create array - iterate through each element
    element.addEventListener('click', deleteItem)       // Add event listener on 'click' - calls function 'deleteItem'
})

// Adding event listener to all items - (our list)
Array.from(item).forEach((element)=>{                   // Create array - iterate through each element
    element.addEventListener('click', markComplete)     // Add event listener on 'click' -  calls function 'markComplete'
})

// Adding event listener to all 'completed' items
Array.from(itemCompleted).forEach((element)=>{          // Create array - iterate through each element
    element.addEventListener('click', markUnComplete)   // Add event listener on 'click' -  calls function 'markUnComplete'
})

// =========================================================================================================================================================================
// App Functions
// ===========================================
// ===========================================
// Delete Button function
// ===========================================
async function deleteItem(){                                    // declare an asynchronous function
    const itemText = this.parentNode.childNodes[1].innerText    // Looks inside list item and only grabs the inner text inside the list span
    try{                                                        // start try block - to do something
        const response = await fetch('deleteItem', {            // create response variable that waits for fetch data from 'deleteItem' route
            method: 'delete',                                   // set the CRUD method for the route - 'delete'
            headers: {'Content-Type': 'application/json'},      // specify the content type - JSON
            body: JSON.stringify({                              // stringify allows us to read JSON data for the message content being passed
              'itemFromJS': itemText                            // naming the content of the body to the inner text of list item - 'itemFromJS'
            })
          })
        const data = await response.json()                      // waiting on JSON from the response to be converted and assigning to variable 'data'
        console.log(data)                                       // log the result to the console
        location.reload()                                       // reload the page to update what is displayed

    }catch(err){                                                // if an error occurs, pass the error into the catch block
        console.log(err)                                        // log the error to the console
    }
}

// Mark Complete function
// ===========================================
async function markComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

// Mark Un-Complete function
// ===========================================
async function markUnComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markUnComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}